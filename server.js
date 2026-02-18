const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuración de middleware
app.use(cors());
app.use(bodyParser.json());

// 1. CONEXIÓN / CREACIÓN DE LA BASE DE DATOS
// Se creará un archivo llamado 'quiniela.db' en tu carpeta
const { Pool } = require('pg');

// Usamos la URL que copiaste de Supabase
const pool = new Pool({
  connectionString: 'postgresql://postgres:[YOUR-PASSWORD]@db.hewrkhydtveaygkmlzhb.supabase.co:5432/postgres',
});

// Ejemplo de cómo cambiar una ruta (el resto es muy similar):
app.get('/registros', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT nombre_usuario FROM predicciones');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
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
app.use(express.static('public')); // Esto sirve tus archivos HTML/JS desde una carpeta llamada 'public'

// --- CONEXIÓN A SUPABASE (PostgreSQL) ---
const pool = new Pool({
    connectionString: 'TU_CONEXION_URI_AQUÍ', // <--- PEGA AQUÍ TU URI DE SUPABASE
    ssl: { rejectUnauthorized: false } // Requerido para conexiones externas seguras
});

// --- RUTA PARA GUARDAR ---
app.post('/guardar', async (req, res) => {
    const { nombre, predicciones } = req.body;
    if (!nombre || !predicciones) return res.status(400).json({ error: "Faltan datos" });

    try {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');
            // Borrar antiguas
            await client.query('DELETE FROM predicciones WHERE nombre_usuario = $1', [nombre]);
            // Insertar nuevas
            for (let p of predicciones) {
                await client.query(
                    'INSERT INTO predicciones (nombre_usuario, partido_id, goles_local, goles_visita) VALUES ($1, $2, $3, $4)',
                    [nombre, p.id, p.gl, p.gv]
                );
            }
            await client.query('COMMIT');
            res.json({ mensaje: "Quiniela guardada correctamente en Supabase" });
        } catch (e) {
            await client.query('ROLLBACK');
            throw e;
        } finally {
            client.release();
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RUTA PARA CARGAR LOS NOMBRES REGISTRADOS ---
app.get('/registros', async (req, res) => {
    try {
        const result = await pool.query('SELECT DISTINCT nombre_usuario FROM predicciones');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- RUTA PARA CARGAR UNA QUINIELA ESPECÍFICA ---
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

// --- RUTA PARA BORRAR TODO (CUIDADO) ---
app.delete('/reset-db', async (req, res) => {
    try {
        await pool.query('DELETE FROM predicciones');
        await pool.query('DELETE FROM resultados_oficiales');
        res.json({ mensaje: "Base de datos reseteada con éxito" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Rutas de Admin y Reportes... (Siguen la misma lógica de pool.query)

app.listen(PORT, () => {
    console.log(`Servidor activo en puerto ${PORT}`);
});


