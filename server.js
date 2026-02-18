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
// 2. CREACIÓN DE LA TABLA
// Guardamos el nombre del usuario, el ID del partido y los goles
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS predicciones (
        id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_usuario TEXT,
        partido_id INTEGER,
        goles_local INTEGER,
        goles_visita INTEGER
    )`);
});

// 3. RUTA PARA GUARDAR (POST)
app.post('/guardar', (req, res) => {
    const { nombre, predicciones } = req.body;

    if (!nombre || !predicciones) {
        return res.status(400).json({ error: "Faltan datos (nombre o predicciones)" });
    }

    // Eliminamos registros antiguos del mismo nombre para no duplicar
    db.run(`DELETE FROM predicciones WHERE nombre_usuario = ?`, [nombre], (err) => {
        if (err) return res.status(500).json({ error: err.message });

        const stmt = db.prepare(`INSERT INTO predicciones (nombre_usuario, partido_id, goles_local, goles_visita) VALUES (?, ?, ?, ?)`);
        
        predicciones.forEach(p => {
            stmt.run(nombre, p.id, p.gl, p.gv);
        });

        stmt.finalize();
        console.log(`Quiniela de ${nombre} guardada.`);
        res.json({ mensaje: `¡Quiniela de ${nombre} guardada con éxito!` });
    });
});

// 4. RUTA PARA CARGAR UNA QUINIELA ESPECÍFICA (GET)
app.get('/cargar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const query = `SELECT partido_id as id, goles_local as gl, goles_visita as gv FROM predicciones WHERE nombre_usuario = ?`;

    db.all(query, [nombre], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// 5. RUTA PARA LISTAR TODOS LOS USUARIOS (GET)
app.get('/registros', (req, res) => {
    db.all(`SELECT DISTINCT nombre_usuario FROM predicciones`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Presiona Ctrl + C para apagar el servidor`);
    console.log(`==========================================`);

});


