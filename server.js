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

// --- CONEXIÓN A SUPABASE (PostgreSQL) ---
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// --- INICIALIZACIÓN AUTOMÁTICA DE TABLAS ---
// Esto crea las tablas y columnas necesarias si no existen en Neon Tech
const inicializarDB = async () => {
    const client = await pool.connect();
    try {
        console.log("Verificando base de datos en Neon Tech...");
        
        // Crear tabla de predicciones si no existe
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

        // Crear tabla de resultados oficiales si no existe
        await client.query(`
            CREATE TABLE IF NOT EXISTS resultados_oficiales (
                partido_id INTEGER PRIMARY KEY,
                goles_local INTEGER NOT NULL,
                goles_visita INTEGER NOT NULL,
                fecha_registro TIMESTAMP WITH TIME ZONE DEFAULT now()
            );
        `);

        // Asegurar que existan las columnas de desempate por si la tabla ya existía de antes
        await client.query(`
            ALTER TABLE predicciones ADD COLUMN IF NOT EXISTS goles_desempate_local INTEGER;
            ALTER TABLE predicciones ADD COLUMN IF NOT EXISTS goles_desempate_visita INTEGER;
        `);

        console.log("Base de datos lista.");
    } catch (err) {
        console.error("Error inicializando DB:", err);
    } finally {
        client.release();
    }
};
inicializarDB();




// --- RUTA INICIAL ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// --- GUARDAR PREDICCIONES DE USUARIO ---
app.post('/guardar', async (req, res) => {
    const { nombre, predicciones } = req.body;
    if (!nombre || !predicciones) return res.status(400).json({ error: "Faltan datos" });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        // Limpiamos predicciones anteriores del usuario
        await client.query('DELETE FROM predicciones WHERE nombre_usuario = $1', [nombre]);

        for (let p of predicciones) {
            await client.query(
                `INSERT INTO predicciones 
                (nombre_usuario, partido_id, goles_local, goles_visita, goles_desempate_local, goles_desempate_visita) 
                VALUES ($1, $2, $3, $4, $5, $6)`,
                [nombre, p.id, p.gl, p.gv, p.dl, p.dv] // Aquí usamos los valores dl y dv enviados
            );
        }
        await client.query('COMMIT');
        res.json({ mensaje: "¡Quiniela guardada con éxito!" });
    } catch (e) {
        await client.query('ROLLBACK');
        console.error(e);
        res.status(500).json({ error: "Error en la base de datos: " + e.message });
    } finally {
        client.release();
    }
});

// --- OBTENER NOMBRES REGISTRADOS ---
app.get('/registros', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT nombre_usuario FROM predicciones ORDER BY nombre_usuario');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- CARGAR QUINIELA DE UN USUARIO (CORREGIDA) ---
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
        console.error(err);
        res.status(500).json({ error: "Error al obtener datos" });
    }
});

// --- GUARDAR RESULTADOS REALES (ADMIN) ---
// Busca la ruta /guardar-resultados-db y déjala exactamente así:
app.post('/guardar-resultados-db', async (req, res) => {
    const resultados = req.body;
    try {
        for (const r of resultados) {
            await pool.query(
                'INSERT INTO resultados_oficiales (partido_id, goles_local, goles_visita) VALUES ($1, $2, $3) ON CONFLICT (partido_id) DO UPDATE SET goles_local = $2, goles_visita = $3',
                [r.id, r.realL, r.realV]
            );
        }
        res.json({ mensaje: "Resultados oficiales publicados correctamente" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
});

// --- OBTENER RESULTADOS REALES ---
app.get('/obtener-resultados-db', async (req, res) => {
    try {
        const result = await pool.query('SELECT partido_id as id, goles_local as gl, goles_visita as gv FROM resultados_oficiales');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- OBTENER TODO PARA REPORTE MAESTRO ---
app.get('/obtener-todas-predicciones', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM predicciones ORDER BY nombre_usuario, partido_id');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RESETEAR BASE DE DATOS ---
app.delete('/reset-db', async (req, res) => {
    try {
        await pool.query('TRUNCATE TABLE predicciones, resultados_oficiales');
        res.json({ mensaje: "Base de datos limpiada por completo" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor activo en: http://localhost:${PORT}`);

});












