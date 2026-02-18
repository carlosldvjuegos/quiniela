const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// --- CONFIGURACIÓN DE MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

// --- CONEXIÓN A SUPABASE (PostgreSQL) ---
const pool = new Pool({
    connectionString: 'postgresql://postgres:[YOUR-PASSWORD]@db.hewrkhydtveaygkmlzhb.supabase.co:5432/postgres', // <--- PEGA TU URI AQUÍ
    ssl: { rejectUnauthorized: false } 
});

// --- RUTA INICIAL ---
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- GUARDAR PREDICCIONES DE USUARIO ---
app.post('/guardar', async (req, res) => {
    const { nombre, predicciones } = req.body;
    if (!nombre || !predicciones) return res.status(400).json({ error: "Faltan datos" });

    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        await client.query('DELETE FROM predicciones WHERE nombre_usuario = $1', [nombre]);
        for (let p of predicciones) {
            await client.query(
                'INSERT INTO predicciones (nombre_usuario, partido_id, goles_local, goles_visita) VALUES ($1, $2, $3, $4)',
                [nombre, p.id, p.gl, p.gv]
            );
        }
        await client.query('COMMIT');
        res.json({ mensaje: "Quiniela guardada correctamente" });
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: e.message });
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

// --- CARGAR QUINIELA DE UN USUARIO ---
app.get('/cargar/:nombre', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT partido_id as id, goles_local as gl, goles_visita as gv FROM predicciones WHERE nombre_usuario = $1',
            [req.params.nombre]
        );
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- GUARDAR RESULTADOS REALES (ADMIN) ---
app.post('/guardar-resultados-db', async (req, res) => {
    const resultados = req.body; // Array de resultados
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        for (let r of resultados) {
            await client.query(
                'INSERT INTO resultados_oficiales (partido_id, goles_local, goles_visita) VALUES ($1, $2, $3) ON CONFLICT (partido_id) DO UPDATE SET goles_local = $2, goles_visita = $3',
                [r.id, r.realL, r.realV]
            );
        }
        await client.query('COMMIT');
        res.json({ mensaje: "Resultados oficiales actualizados" });
    } catch (e) {
        await client.query('ROLLBACK');
        res.status(500).json({ error: e.message });
    } finally {
        client.release();
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