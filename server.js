const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// --- CONFIGURACIÓN DE MIDDLEWARE ---
app.use(cors());
app.use(bodyParser.json());

// --- 1. CONEXIÓN / CREACIÓN DE LA BASE DE DATOS ---
const db = new sqlite3.Database('./quiniela.db', (err) => {
    if (err) console.error("Error al abrir base de datos:", err.message);
    else console.log("Conectado a la base de datos SQLite.");
});

// --- 2. CREACIÓN DE LA TABLA ---
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS predicciones (
        id_registro INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre_usuario TEXT,
        partido_id INTEGER,
        goles_local INTEGER,
        goles_visita INTEGER
    )`);
});

// --- 3. RUTA PARA GUARDAR (POST) ---
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

// --- 4. RUTA PARA CARGAR UNA QUINIELA ESPECÍFICA (GET) ---
app.get('/cargar/:nombre', (req, res) => {
    const nombre = req.params.nombre;
    const query = `SELECT partido_id as id, goles_local as gl, goles_visita as gv FROM predicciones WHERE nombre_usuario = ?`;

    db.all(query, [nombre], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- 5. RUTA PARA LISTAR TODOS LOS USUARIOS (GET) ---
app.get('/registros', (req, res) => {
    db.all(`SELECT DISTINCT nombre_usuario FROM predicciones`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- 6. RUTA PARA BORRAR TODA LA BASE DE DATOS (DELETE) ---
app.delete('/reset-db', (req, res) => {
    db.run(`DELETE FROM predicciones`, [], (err) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        console.log("Base de datos reseteada.");
        res.json({ mensaje: "Base de datos limpiada por completo." });
    });
});

const fs = require('fs'); // Añade esto al inicio del archivo server.js

// RUTA PARA QUE EL ADMIN GUARDE LOS RESULTADOS REALES
app.post('/actualizar-resultados', (req, res) => {
    const resultados = req.body;
    
    // Guardamos los datos en un archivo físico llamado resultados.json
    fs.writeFile('./resultados.json', JSON.stringify(resultados, null, 2), (err) => {
        if (err) {
            return res.status(500).json({ error: "No se pudo guardar el archivo de resultados" });
        }
        res.json({ mensaje: "¡Resultados oficiales actualizados y publicados!" });
    });
});

// 1. Crear la tabla de resultados oficiales si no existe
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS resultados_oficiales (
        partido_id INTEGER PRIMARY KEY,
        goles_local INTEGER,
        goles_visita INTEGER
    )`);
});

// 2. Ruta para guardar resultados oficiales en la DB
app.post('/guardar-resultados-db', (req, res) => {
    const resultados = req.body; // Array de {id, realL, realV}

    const stmt = db.prepare(`INSERT OR REPLACE INTO resultados_oficiales (partido_id, goles_local, goles_visita) VALUES (?, ?, ?)`);
    
    db.serialize(() => {
        db.run("BEGIN TRANSACTION");
        resultados.forEach(r => {
            stmt.run(r.id, r.realL, r.realV);
        });
        db.run("COMMIT", (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ mensaje: "Resultados oficiales guardados en la Base de Datos con éxito" });
        });
    });
    stmt.finalize();
});

// RUTA PARA OBTENER LOS RESULTADOS OFICIALES GUARDADOS
app.get('/obtener-resultados-db', (req, res) => {
    const query = `SELECT partido_id as id, goles_local as gl, goles_visita as gv FROM resultados_oficiales`;

    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

app.get('/obtener-todas-predicciones', (req, res) => {
    const query = `SELECT * FROM predicciones ORDER BY nombre_usuario, partido_id`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- INICIAR EL SERVIDOR ---
app.listen(PORT, () => {
    console.log(`==========================================`);
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Presiona Ctrl + C para apagar el servidor`);
    console.log(`==========================================`);

});
