// Prueba de conexión inmediata
console.log("El script de Admin se ha cargado correctamente.");

const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? window.location.origin 
    : "https://quiniela-pcas.onrender.com";

// LISTA DE PARTIDOS NECESARIA PARA DIBUJAR LA TABLA
const partidosData = [
    // GRUPO A
    { id: 1, fase: "Grupos", grupo: "A", fecha: "11/06/2026", local: "México", visita: "Sudáfrica" },
    { id: 2, fase: "Grupos", grupo: "A", fecha: "12/06/2026", local: "Rep. Corea", visita: "DEN/MKD/CZE/IRL" },
    { id: 3, fase: "Grupos", grupo: "A", fecha: "18/06/2026", local: "DEN/MKD/CZE/IRL", visita: "Sudáfrica" },
    { id: 4, fase: "Grupos", grupo: "A", fecha: "19/06/2026", local: "México", visita: "Rep. Corea" },
    { id: 5, fase: "Grupos", grupo: "A", fecha: "24/06/2026", local: "DEN/MKD/CZE/IRL", visita: "México" },
    { id: 6, fase: "Grupos", grupo: "A", fecha: "24/06/2026", local: "Sudáfrica", visita: "Rep. Corea" },

    // --- GRUPO B (IDs 7-12) ---
    { id: 7, fase: "Grupos", grupo: "B", fecha: "Viernes 12/06/2026", local: "Canadá", visita: "ITA/NIR/WAL/BIH" },
    { id: 8, fase: "Grupos", grupo: "B", fecha: "Sábado 13/06/2026", local: "Catar", visita: "Suiza" },
    { id: 9, fase: "Grupos", grupo: "B", fecha: "Jueves 18/06/2026", local: "Suiza", visita: "ITA/NIR/WAL/BIH" },
    { id: 10, fase: "Grupos", grupo: "B", fecha: "Viernes 19/06/2026", local: "Canadá", visita: "Catar" },
    { id: 11, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Suiza", visita: "Canadá" },
    { id: 12, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "ITA/NIR/WAL/BIH", visita: "Catar" },

    // --- GRUPO C (IDs 13-18) ---
    { id: 13, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Brasil", visita: "Marruecos" },
    { id: 14, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Haití", visita: "Escocia" },
    { id: 15, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Escocia", visita: "Marruecos" },
    { id: 16, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Brasil", visita: "Haití" },
    { id: 17, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Escocia", visita: "Brasil" },
    { id: 18, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Marruecos", visita: "Haití" },

    // --- GRUPO D (IDs 19-24) ---
    { id: 19, fase: "Grupos", grupo: "D", fecha: "Sábado 13/06/2026", local: "EE. UU.", visita: "Paraguay" },
    { id: 20, fase: "Grupos", grupo: "D", fecha: "Domingo 14/06/2026", local: "Australia", visita: "TUR/RU/SVK/KOS" },
    { id: 21, fase: "Grupos", grupo: "D", fecha: "Sábado 20/06/2026", local: "TUR/RU/SVK/KOS", visita: "Paraguay" },
    { id: 22, fase: "Grupos", grupo: "D", fecha: "Viernes 19/06/2026", local: "EE. UU.", visita: "Australia" },
    { id: 23, fase: "Grupos", grupo: "D", fecha: "Viernes 26/06/2026", local: "TUR/RU/SVK/KOS", visita: "EE. UU." },
    { id: 24, fase: "Grupos", grupo: "D", fecha: "Viernes 26/06/2026", local: "Paraguay", visita: "Australia" },

    // --- GRUPO E (IDs 25-30) ---
    { id: 25, fase: "Grupos", grupo: "E", fecha: "Domingo 14/06/2026", local: "Alemania", visita: "Curazao" },
    { id: 26, fase: "Grupos", grupo: "E", fecha: "Lunes 15/06/2026", local: "Costa de Marfil", visita: "Ecuador" },
    { id: 27, fase: "Grupos", grupo: "E", fecha: "Sábado 20/06/2026", local: "Alemania", visita: "Costa de Marfil" },
    { id: 28, fase: "Grupos", grupo: "E", fecha: "Domingo 21/06/2026", local: "Ecuador", visita: "Curazao" },
    { id: 29, fase: "Grupos", grupo: "E", fecha: "Jueves 25/06/2026", local: "Curazao", visita: "Costa de Marfil" },
    { id: 30, fase: "Grupos", grupo: "E", fecha: "Jueves 25/06/2026", local: "Ecuador", visita: "Alemania" },

    // --- GRUPO F (IDs 31-36) ---
    { id: 31, fase: "Grupos", grupo: "F", fecha: "Domingo 14/06/2026", local: "Países Bajos", visita: "Japón" },
    { id: 32, fase: "Grupos", grupo: "F", fecha: "Lunes 15/06/2026", local: "UKR/SWE/POL/ALB", visita: "Túnez" },
    { id: 33, fase: "Grupos", grupo: "F", fecha: "Sábado 20/06/2026", local: "Países Bajos", visita: "UKR/SWE/POL/ALB" },
    { id: 34, fase: "Grupos", grupo: "F", fecha: "Domingo 21/06/2026", local: "Túnez", visita: "Japón" },
    { id: 35, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Japón", visita: "UKR/SWE/POL/ALB" },
    { id: 36, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Túnez", visita: "Países Bajos" },

    // --- GRUPO G (IDs 37-42) ---
    { id: 37, fase: "Grupos", grupo: "G", fecha: "Lunes 15/06/2026", local: "Bélgica", visita: "Egipto" },
    { id: 38, fase: "Grupos", grupo: "G", fecha: "Martes 16/06/2026", local: "RI de Irán", visita: "Nueva Zelanda" },
    { id: 39, fase: "Grupos", grupo: "G", fecha: "Domingo 21/06/2026", local: "Bélgica", visita: "RI de Irán" },
    { id: 40, fase: "Grupos", grupo: "G", fecha: "Lunes 22/06/2026", local: "Nueva Zelanda", visita: "Egipto" },
    { id: 41, fase: "Grupos", grupo: "G", fecha: "Sábado 27/06/2026", local: "Egipto", visita: "RI de Irán" },
    { id: 42, fase: "Grupos", grupo: "G", fecha: "Sábado 27/06/2026", local: "Nueva Zelanda", visita: "Bélgica" },

    // --- GRUPO H (IDs 43-48) ---
    { id: 43, fase: "Grupos", grupo: "H", fecha: "Lunes 15/06/2026", local: "España", visita: "Islas de Cabo Verde" },
    { id: 44, fase: "Grupos", grupo: "H", fecha: "Martes 16/06/2026", local: "Arabia Saudita", visita: "Uruguay" },
    { id: 45, fase: "Grupos", grupo: "H", fecha: "Domingo 21/06/2026", local: "España", visita: "Arabia Saudita" },
    { id: 46, fase: "Grupos", grupo: "H", fecha: "Lunes 22/06/2026", local: "Uruguay", visita: "Islas de Cabo Verde" },
    { id: 47, fase: "Grupos", grupo: "H", fecha: "Sábado 27/06/2026", local: "Islas de Cabo Verde", visita: "Arabia Saudita" },
    { id: 48, fase: "Grupos", grupo: "H", fecha: "Sábado 27/06/2026", local: "Uruguay", visita: "España" },

    // --- GRUPO I (IDs 49-54) ---
    { id: 49, fase: "Grupos", grupo: "I", fecha: "Martes 16/06/2026", local: "Francia", visita: "Senegal" },
    { id: 50, fase: "Grupos", grupo: "I", fecha: "Miércoles 17/06/2026", local: "BOL/SUR/IRQ", visita: "Noruega" },
    { id: 51, fase: "Grupos", grupo: "I", fecha: "Lunes 22/06/2026", local: "Francia", visita: "BOL/SUR/IRQ" },
    { id: 52, fase: "Grupos", grupo: "I", fecha: "Martes 23/06/2026", local: "Noruega", visita: "Senegal" },
    { id: 53, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Noruega", visita: "Francia" },
    { id: 54, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Senegal", visita: "BOL/SUR/IRQ" },

    // --- GRUPO J (IDs 55-60) ---
    { id: 55, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Argentina", visita: "Argelia" },
    { id: 56, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Austria", visita: "Jordania" },
    { id: 57, fase: "Grupos", grupo: "J", fecha: "Lunes 22/06/2026", local: "Argentina", visita: "Austria" },
    { id: 58, fase: "Grupos", grupo: "J", fecha: "Martes 23/06/2026", local: "Jordania", visita: "Argelia" },
    { id: 59, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Argelia", visita: "Austria" },
    { id: 60, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Jordania", visita: "Argentina" },

    // --- GRUPO K (IDs 61-66) ---
    { id: 61, fase: "Grupos", grupo: "K", fecha: "Miércoles 17/06/2026", local: "Portugal", visita: "NCL/JAM/COD" },
    { id: 62, fase: "Grupos", grupo: "K", fecha: "Jueves 18/06/2026", local: "Uzbekistán", visita: "Colombia" },
    { id: 63, fase: "Grupos", grupo: "K", fecha: "Martes 23/06/2026", local: "Portugal", visita: "Uzbekistán" },
    { id: 64, fase: "Grupos", grupo: "K", fecha: "Miércoles 24/06/2026", local: "Colombia", visita: "NCL/JAM/COD" },
    { id: 65, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Colombia", visita: "Portugal" },
    { id: 66, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "NCL/JAM/COD", visita: "Uzbekistán" },

    // --- GRUPO L (IDs 67-72) ---
    { id: 67, fase: "Grupos", grupo: "L", fecha: "Miércoles 17/06/2026", local: "Inglaterra", visita: "Croacia" },
    { id: 68, fase: "Grupos", grupo: "L", fecha: "Jueves 18/06/2026", local: "Ghana", visita: "Panamá" },
    { id: 69, fase: "Grupos", grupo: "L", fecha: "Martes 23/06/2026", local: "Inglaterra", visita: "Ghana" },
    { id: 70, fase: "Grupos", grupo: "L", fecha: "Miércoles 24/06/2026", local: "Panamá", visita: "Croacia" },
    { id: 71, fase: "Grupos", grupo: "L", fecha: "Sábado 27/06/2026", local: "Panamá", visita: "Inglaterra" },
    { id: 72, fase: "Grupos", grupo: "L", fecha: "Sábado 27/06/2026", local: "Croacia", visita: "Ghana" },

    // --- DIECISEISAVOS (IDs 73-88) ---
    { id: 73, fase: "16vos", grupo: "Eliminatoria", fecha: "Domingo 28/06/2026", local: "2A", visita: "2B" },
    { id: 74, fase: "16vos", grupo: "Eliminatoria", fecha: "Lunes 29/06/2026", local: "1C", visita: "2F" },
    { id: 75, fase: "16vos", grupo: "Eliminatoria", fecha: "Lunes 29/06/2026", local: "1E", visita: "3ABCDF" },
    { id: 76, fase: "16vos", grupo: "Eliminatoria", fecha: "Martes 30/06/2026", local: "1F", visita: "2C" },
    { id: 77, fase: "16vos", grupo: "Eliminatoria", fecha: "Martes 30/06/2026", local: "2E", visita: "2I" },
    { id: 78, fase: "16vos", grupo: "Eliminatoria", fecha: "Martes 30/06/2026", local: "1I", visita: "3CDFGH" },
    { id: 79, fase: "16vos", grupo: "Eliminatoria", fecha: "Miércoles 01/07/2026", local: "1A", visita: "3CEFHI" },
    { id: 80, fase: "16vos", grupo: "Eliminatoria", fecha: "Miércoles 01/07/2026", local: "1L", visita: "3EHIJK" },
    { id: 81, fase: "16vos", grupo: "Eliminatoria", fecha: "Miércoles 01/07/2026", local: "1G", visita: "3AEHIJ" },
    { id: 82, fase: "16vos", grupo: "Eliminatoria", fecha: "Jueves 02/07/2026", local: "1D", visita: "3BEFIJ" },
    { id: 83, fase: "16vos", grupo: "Eliminatoria", fecha: "Jueves 02/07/2026", local: "1H", visita: "2J" },
    { id: 84, fase: "16vos", grupo: "Eliminatoria", fecha: "Viernes 03/07/2026", local: "2K", visita: "2L" },
    { id: 85, fase: "16vos", grupo: "Eliminatoria", fecha: "Viernes 03/07/2026", local: "1B", visita: "3EFGIJ" },
    { id: 86, fase: "16vos", grupo: "Eliminatoria", fecha: "Viernes 03/07/2026", local: "2D", visita: "2G" },
    { id: 87, fase: "16vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "1J", visita: "2H" },
    { id: 88, fase: "16vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "1K", visita: "3DEIJL" },

    // --- OCTAVOS (IDs 89-96) ---
    { id: 89, fase: "8vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "W73", visita: "W75" },
    { id: 90, fase: "8vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "W74", visita: "W77" },
    { id: 91, fase: "8vos", grupo: "Eliminatoria", fecha: "Domingo 05/07/2026", local: "W76", visita: "W78" },
    { id: 92, fase: "8vos", grupo: "Eliminatoria", fecha: "Lunes 06/07/2026", local: "W79", visita: "W80" },
    { id: 93, fase: "8vos", grupo: "Eliminatoria", fecha: "Lunes 06/07/2026", local: "W83", visita: "W84" },
    { id: 94, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "W81", visita: "W82" },
    { id: 95, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "W86", visita: "W88" },
    { id: 96, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "W85", visita: "W87" },

    // --- CUARTOS (IDs 97-100) ---
    { id: 97, fase: "4tos", grupo: "Eliminatoria", fecha: "Jueves 09/07/2026", local: "W89", visita: "W90" },
    { id: 98, fase: "4tos", grupo: "Eliminatoria", fecha: "Viernes 10/07/2026", local: "W93", visita: "W94" },
    { id: 99, fase: "4tos", grupo: "Eliminatoria", fecha: "Sábado 11/07/2026", local: "W91", visita: "W92" },
    { id: 100, fase: "4tos", grupo: "Eliminatoria", fecha: "Domingo 12/07/2026", local: "W95", visita: "W96" },

    // --- SEMIS (IDs 101-102) ---
    { id: 101, fase: "Semis", grupo: "Eliminatoria", fecha: "Martes 14/07/2026", local: "W97", visita: "W98" },
    { id: 102, fase: "Semis", grupo: "Eliminatoria", fecha: "Miércoles 15/07/2026", local: "W99", visita: "W100" },

    // --- FINALES (IDs 103-104) ---
    { id: 103, fase: "3er Puesto", grupo: "Eliminatoria", fecha: "Sábado 18/07/2026", local: "L101", visita: "L102" },
    { id: 104, fase: "Final", grupo: "Eliminatoria", fecha: "Domingo 19/07/2026", local: "W101", visita: "W102" }
];

function renderizarPartidosAdmin() {
    const container = document.getElementById('fixture-container');
    if (!container) {
        console.error("No se encontró el contenedor fixture-container");
        return;
    }
    
    container.innerHTML = "";
    partidosData.forEach(p => {
        const card = document.createElement('div');
        card.className = "card";
        card.innerHTML = `
            <span class="col-fase">${p.fase}</span>
            <span class="col-fecha">${p.fecha}</span>
            <span class="txt-right">${p.local}</span>
            <div class="marcador">
                <input type="number" id="R-L-${p.id}" placeholder="0">
                <span>-</span>
                <input type="number" id="R-V-${p.id}" placeholder="0">
            </div>
            <span class="txt-left">${p.visita}</span>
        `;
        container.appendChild(card);
    });
    console.log("Partidos dibujados en pantalla.");
}

// Función para cargar datos desde la DB al abrir la página
async function cargarResultadosExistentes() {
    try {
        const response = await fetch(`${API_URL}/obtener-resultados-db`);
        const datos = await response.json();

        if (datos && datos.length > 0) {
            datos.forEach(d => {
                const inputL = document.getElementById(`R-L-${d.id}`);
                const inputV = document.getElementById(`R-V-${d.id}`);
                if (inputL) inputL.value = d.gl;
                if (inputV) inputV.value = d.gv;
            });
            console.log("Resultados previos cargados en la tabla.");
        }
    } catch (error) {
        console.error("Error al recuperar resultados previos:", error);
    }
}

// NUEVO INICIO: Renderiza y luego Carga
document.addEventListener("DOMContentLoaded", async () => {
    renderizarPartidosAdmin();    // Primero dibuja la tabla vacía
    await cargarResultadosExistentes(); // Luego la rellena con lo guardado
});

async function guardarResultadosOficiales() {
    const resultados = [];
    partidosData.forEach(p => {
        const gl = document.getElementById(`R-L-${p.id}`).value;
        const gv = document.getElementById(`R-V-${p.id}`).value;
        
        // Solo guardamos si ambos campos tienen números
        if (gl !== "" && gv !== "") {
            resultados.push({ 
                id: p.id, 
                realL: parseInt(gl), 
                realV: parseInt(gv) 
            });
        }
    });

    if (resultados.length === 0) return alert("Ingresa al menos un resultado oficial.");

    try {
        const response = await fetch(`${API_URL}/guardar-resultados-db`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultados)
        });

        const resData = await response.json();
        if (response.ok) {
            alert("✅ " + resData.mensaje);
        } else {
            alert("❌ Error: " + resData.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert("No se pudo conectar con el servidor.");
    }
}

// ESTO ASEGURA QUE SE DIBUJE AL CARGAR

document.addEventListener("DOMContentLoaded", renderizarPartidosAdmin);

