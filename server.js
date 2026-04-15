const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 10000;

// --- CONFIGURACIÓN DE MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- CONEXIÓN A NEON (Optimizado para evitar 502) ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    max: 10, // Máximo de conexiones simultáneas
    idleTimeoutMillis: 30000, // Cerrar conexiones inactivas
    connectionTimeoutMillis: 2000, // Tiempo de espera para conectar
});

// --- INICIALIZACIÓN DE TABLAS ---
const inicializarDB = async () => {
    const client = await pool.connect();
    try {
        console.log("Verificando base de datos en Neon Tech...");
        
        // Tabla de Predicciones
        await client.query(`
            CREATE TABLE IF NOT EXISTS predicciones (
                id_fila SERIAL PRIMARY KEY,
                nombre_usuario TEXT NOT NULL,
                partido_id INTEGER NOT NULL,
                goles_local INTEGER NOT NULL,
                goles_visita INTEGER NOT NULL,
                goles_desempate_local INTEGER,
                goles_desempate_visita INTEGER,
                fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
        `);

        // Tabla de Resultados Oficiales (CON COLUMNAS DE NOMBRES)
        await client.query(`
            CREATE TABLE IF NOT EXISTS resultados_oficiales (
                partido_id INTEGER PRIMARY KEY,
                goles_local INTEGER NOT NULL,
                goles_visita INTEGER NOT NULL,
                equipo_local TEXT,
                equipo_visitante TEXT,
                fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
        `);

        // Aseguramos que existan las columnas de nombres por si la tabla es vieja
        await client.query(`
            ALTER TABLE resultados_oficiales ADD COLUMN IF NOT EXISTS equipo_local TEXT;
            ALTER TABLE resultados_oficiales ADD COLUMN IF NOT EXISTS equipo_visitante TEXT;
        `);

        console.log("Base de datos lista.");
    } catch (err) {
        console.error("Error inicializando DB:", err);
    } finally {
        client.release();
    }
};
inicializarDB();

// --- RUTAS ---

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// GUARDAR PREDICCIONES
app.post('/guardar', async (req, res) => {
    const { nombre, predicciones } = req.body;
    if (!nombre || !predicciones) return res.status(400).json({ error: "Faltan datos" });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM predicciones WHERE nombre_usuario = $1', [nombre]);
        for (let p of predicciones) {
            await client.query(
                `INSERT INTO predicciones 
                (nombre_usuario, partido_id, goles_local, goles_visita, goles_desempate_local, goles_desempate_visita) 
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [nombre, p.id, p.gl, p.gv, p.dl, p.dv]
            );
        }
        await client.query('COMMIT');
        res.json({ mensaje: "¡Quiniela guardada!" });
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: e.message });
    } finally {
        client.release();
    }
});

// OBTENER RESULTADOS REALES (Modificado para incluir nombres)
app.get('/obtener-resultados-db', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT partido_id as id, goles_local as gl, goles_visita as gv, 
            equipo_local as local, equipo_visitante as visita 
            FROM resultados_oficiales
        `);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GUARDAR RESULTADOS REALES - ADMIN (Vital para la validación de fases)
app.post('/guardar-resultados-db', async (req, res) => {
    const resultados = req.body;
    try {
        for (const r of resultados) {
            await pool.query(
                `INSERT INTO resultados_oficiales (partido_id, goles_local, goles_visita, equipo_local, equipo_visitante) 
                 VALUES ($1, $2, $3, $4, $5) 
                 ON CONFLICT (partido_id) DO UPDATE SET 
                 goles_local = $2, goles_visita = $3, equipo_local = $4, equipo_visitante = $5`,
                [r.id, r.realL, r.realV, r.nombreLocal, r.nombreVisita] 
            );
        }
        res.json({ mensaje: "Resultados actualizados con nombres de equipos" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// CARGAR QUINIELA USUARIO
app.get('/cargar/:nombre', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT partido_id as id, goles_local as gl, goles_visita as gv, 
             goles_desempate_local as dl, goles_desempate_visita as dv 
             FROM predicciones WHERE nombre_usuario = $1`,
            [req.params.nombre]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: "Error al cargar" });
    }
});

// RESTO DE RUTAS (Registros, Reporte Maestro, Reset)
app.get('/registros', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT nombre_usuario FROM predicciones ORDER BY nombre_usuario');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/obtener-todas-predicciones', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM predicciones ORDER BY nombre_usuario, partido_id');
        res.json(result.rows);
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.delete('/reset-db', async (req, res) => {
    try {
        await pool.query('TRUNCATE TABLE predicciones, resultados_oficiales');
        res.json({ mensaje: "DB Limpia" });
    } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto: ${PORT}`);
});
