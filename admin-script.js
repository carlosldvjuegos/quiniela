// --- CONFIGURACIÓN INICIAL ---
console.log("El script de Admin Pro con Lógica de Torneo cargado.");

const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? window.location.origin 
    : "https://quiniela-pcas.onrender.com";

const rankingFIFA = {
    "México": 15, "Sudáfrica": 59, "Rep. Corea": 22, "Rep. Checa": 40,
    "Canadá": 35, "Bosnia y Herzegovina": 74, "Catar": 34, "Suiza": 19,
    "Brasil": 5, "Marruecos": 13, "Haití": 90, "Escocia": 51,
    "EE. UU.": 11, "Paraguay": 56, "Australia": 24, "Turquia": 26,
    "Alemania": 16, "Curazao": 91, "Costa de Marfil": 38, "Ecuador": 30,
    "Países Bajos": 7, "Japón": 18, "Suecia": 28, "Túnez": 41,
    "Bélgica": 3, "Egipto": 36, "RI de Irán": 20, "Nueva Zelanda": 107,
    "España": 8, "Islas de Cabo Verde": 65, "Arabia Saudita": 53, "Uruguay": 14,
    "Francia": 2, "Senegal": 17, "Irak": 58, "Noruega": 47,
    "Argentina": 1, "Argelia": 43, "Austria": 25, "Jordania": 71,
    "Portugal": 6, "Congo": 84, "Uzbekistán": 64, "Colombia": 12,
    "Inglaterra": 4, "Croacia": 10, "Ghana": 68, "Panamá": 45
};

const partidosData = [
    // GRUPO A
    { id: 1, fase: "Grupos", grupo: "A", fecha: "Jueves 11/06/2026", local: "México", visita: "Sudáfrica" },
    { id: 2, fase: "Grupos", grupo: "A", fecha: "Viernes 12/06/2026", local: "Rep. Corea", visita: "Rep. Checa" },
    { id: 3, fase: "Grupos", grupo: "A", fecha: "Jueves 18/06/2026", local: "Rep. Checa", visita: "Sudáfrica" },
    { id: 4, fase: "Grupos", grupo: "A", fecha: "Viernes 19/06/2026", local: "México", visita: "Rep. Corea" },
    { id: 5, fase: "Grupos", grupo: "A", fecha: "Jueves 25/06/2026", local: "Rep. Checa", visita: "México" },
    { id: 6, fase: "Grupos", grupo: "A", fecha: "Jueves 25/06/2026", local: "Sudáfrica", visita: "Rep. Corea" },

    // --- GRUPO B (IDs 7-12) ---
    { id: 7, fase: "Grupos", grupo: "B", fecha: "Viernes 12/06/2026", local: "Canadá", visita: "Bosnia y Herzegovina" },
    { id: 8, fase: "Grupos", grupo: "B", fecha: "Sábado 13/06/2026", local: "Catar", visita: "Suiza" },
    { id: 9, fase: "Grupos", grupo: "B", fecha: "Jueves 18/06/2026", local: "Suiza", visita: "Bosnia y Herzegovina" },
    { id: 10, fase: "Grupos", grupo: "B", fecha: "Viernes 19/06/2026", local: "Canadá", visita: "Catar" },
    { id: 11, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Suiza", visita: "Canadá" },
    { id: 12, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Bosnia y Herzegovina", visita: "Catar" },

    // --- GRUPO C (IDs 13-18) ---
    { id: 13, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Brasil", visita: "Marruecos" },
    { id: 14, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Haití", visita: "Escocia" },
    { id: 15, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Escocia", visita: "Marruecos" },
    { id: 16, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Brasil", visita: "Haití" },
    { id: 17, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Escocia", visita: "Brasil" },
    { id: 18, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Marruecos", visita: "Haití" },

    // --- GRUPO D (IDs 19-24) ---
    { id: 19, fase: "Grupos", grupo: "D", fecha: "Sábado 13/06/2026", local: "EE. UU.", visita: "Paraguay" },
    { id: 20, fase: "Grupos", grupo: "D", fecha: "Domingo 14/06/2026", local: "Australia", visita: "Turquia" },
    { id: 21, fase: "Grupos", grupo: "D", fecha: "Sábado 20/06/2026", local: "Turquia", visita: "Paraguay" },
    { id: 22, fase: "Grupos", grupo: "D", fecha: "Viernes 19/06/2026", local: "EE. UU.", visita: "Australia" },
    { id: 23, fase: "Grupos", grupo: "D", fecha: "Viernes 26/06/2026", local: "Turquia", visita: "EE. UU." },
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
    { id: 32, fase: "Grupos", grupo: "F", fecha: "Lunes 15/06/2026", local: "Suecia", visita: "Túnez" },
    { id: 33, fase: "Grupos", grupo: "F", fecha: "Sábado 20/06/2026", local: "Países Bajos", visita: "Suecia" },
    { id: 34, fase: "Grupos", grupo: "F", fecha: "Domingo 21/06/2026", local: "Túnez", visita: "Japón" },
    { id: 35, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Japón", visita: "Suecia" },
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
    { id: 50, fase: "Grupos", grupo: "I", fecha: "Miércoles 17/06/2026", local: "Irak", visita: "Noruega" },
    { id: 51, fase: "Grupos", grupo: "I", fecha: "Lunes 22/06/2026", local: "Francia", visita: "Irak" },
    { id: 52, fase: "Grupos", grupo: "I", fecha: "Martes 23/06/2026", local: "Noruega", visita: "Senegal" },
    { id: 53, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Noruega", visita: "Francia" },
    { id: 54, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Senegal", visita: "Irak" },

    // --- GRUPO J (IDs 55-60) ---
    { id: 55, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Argentina", visita: "Argelia" },
    { id: 56, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Austria", visita: "Jordania" },
    { id: 57, fase: "Grupos", grupo: "J", fecha: "Lunes 22/06/2026", local: "Argentina", visita: "Austria" },
    { id: 58, fase: "Grupos", grupo: "J", fecha: "Martes 23/06/2026", local: "Jordania", visita: "Argelia" },
    { id: 59, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Argelia", visita: "Austria" },
    { id: 60, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Jordania", visita: "Argentina" },

    // --- GRUPO K (IDs 61-66) ---
    { id: 61, fase: "Grupos", grupo: "K", fecha: "Miércoles 17/06/2026", local: "Portugal", visita: "Congo" },
    { id: 62, fase: "Grupos", grupo: "K", fecha: "Jueves 18/06/2026", local: "Uzbekistán", visita: "Colombia" },
    { id: 63, fase: "Grupos", grupo: "K", fecha: "Martes 23/06/2026", local: "Portugal", visita: "Uzbekistán" },
    { id: 64, fase: "Grupos", grupo: "K", fecha: "Miércoles 24/06/2026", local: "Colombia", visita: "Congo" },
    { id: 65, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Colombia", visita: "Portugal" },
    { id: 66, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Congo", visita: "Uzbekistán" },

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
    { id: 75, fase: "16vos", grupo: "Eliminatoria", fecha: "Lunes 29/06/2026", local: "1E", visita: "3T1" },
    { id: 76, fase: "16vos", grupo: "Eliminatoria", fecha: "Martes 30/06/2026", local: "1F", visita: "2C" },
    { id: 77, fase: "16vos", grupo: "Eliminatoria", fecha: "Martes 30/06/2026", local: "2E", visita: "2I" },
    { id: 78, fase: "16vos", grupo: "Eliminatoria", fecha: "Martes 30/06/2026", local: "1I", visita: "3T2" },
    { id: 79, fase: "16vos", grupo: "Eliminatoria", fecha: "Miércoles 01/07/2026", local: "1A", visita: "3T3" },
    { id: 80, fase: "16vos", grupo: "Eliminatoria", fecha: "Miércoles 01/07/2026", local: "1L", visita: "3T4" },
    { id: 81, fase: "16vos", grupo: "Eliminatoria", fecha: "Miércoles 01/07/2026", local: "1G", visita: "3T5" },
    { id: 82, fase: "16vos", grupo: "Eliminatoria", fecha: "Jueves 02/07/2026", local: "1D", visita: "3T6" },
    { id: 83, fase: "16vos", grupo: "Eliminatoria", fecha: "Jueves 02/07/2026", local: "1H", visita: "2J" },
    { id: 84, fase: "16vos", grupo: "Eliminatoria", fecha: "Viernes 03/07/2026", local: "2K", visita: "2L" },
    { id: 85, fase: "16vos", grupo: "Eliminatoria", fecha: "Viernes 03/07/2026", local: "1B", visita: "3T7" },
    { id: 86, fase: "16vos", grupo: "Eliminatoria", fecha: "Viernes 03/07/2026", local: "2D", visita: "2G" },
    { id: 87, fase: "16vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "1J", visita: "2H" },
    { id: 88, fase: "16vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "1K", visita: "3T8" },

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
    const container = document.getElementById('admin-fixture-container'); 
    if (!container) return;
    
    container.innerHTML = "";
    partidosData.forEach(p => {
        const card = document.createElement('div');
        card.className = "partido-card"; 
        card.id = `card-${p.id}`;
        
        card.innerHTML = `
            <div class="partido-info">
                <span class="grupo-label">${p.fase} ${p.grupo !== 'Eliminatoria' ? '- Grupo '+p.grupo : ''}</span>
                <span class="fecha-label">${p.fecha}</span>
            </div>
            <div class="card-body">
                <div class="equipo-col left">
                    <span class="nombre-equipo" id="N-L-${p.id}">${p.local}</span>
                </div>
                <div class="marcador-col">
                    <input type="number" id="R-L-${p.id}" class="input-gol" oninput="actualizarLogicaAdmin()">
                    <span class="separador">-</span>
                    <input type="number" id="R-V-${p.id}" class="input-gol" oninput="actualizarLogicaAdmin()">
                </div>
                <div class="equipo-col right">
                    <span class="nombre-equipo" id="N-V-${p.id}">${p.visita}</span>
                </div>
            </div>
            <div style="text-align: center; font-size: 0.7rem; color: #0066B2; font-weight: bold; margin-top: 5px;">
                RESULTADO OFICIAL
            </div>
        `;


        

// --- CÓDIGO DE RESALTE PARA PARTIDOS DE HOY Y MAÑANA ---
        try {
            // 1. Obtener las fechas de Hoy y Mañana formateadas como "DD/MM/2026"
            const hoyObj = new Date();
            const mananaObj = new Date();
            mananaObj.setDate(hoyObj.getDate() + 1);

            const pad = (n) => n.toString().padStart(2, '0');
            
            const textoHoy = `${pad(hoyObj.getDate())}/${pad(hoyObj.getMonth() + 1)}/2026`;
            const textoManana = `${pad(mananaObj.getDate())}/${pad(mananaObj.getMonth() + 1)}/2026`;

            // 2. Comprobar si la fecha del partido contiene "hoy" o "mañana"
            if (p.fecha && (p.fecha.includes(textoHoy) || p.fecha.includes(textoManana))) {
                // Color rosado claro estético que mantiene la legibilidad del texto
                card.style.backgroundColor = "#ffe4e1"; 
                card.style.border = "1px solid #ffb6c1";
            }
        } catch (e) {
            console.error("Error al resaltar fecha:", e);
        }
        // --- FIN DEL CÓDIGO DE RESALTE ---






        
        container.appendChild(card);
    });
}

function actualizarLogicaAdmin() {
    // 1. Datos manuales correctos de la FIFA que quieres mostrar
    const oficiales = {
        "1A": "México", "1B": "Canadá", "1C": "Brasil", "1D": "EE. UU.", 
        "1E": "Alemania", "1F": "Países Bajos", "1G": "Bélgica", "1H": "España", 
        "1I": "Francia", "1J": "Argentina", "1K": "Portugal", "1L": "Inglaterra",
        "2A": "Rep. Corea", "2B": "Suiza", "2C": "Marruecos", "2D": "Australia", 
        "2E": "Ecuador", "2F": "Japón", "2G": "RI de Irán", "2H": "Uruguay", 
        "2I": "Noruega", "2J": "Austria", "2K": "Colombia", "2L": "Croacia",
        "3T_P75": "Congo", "3T_P78": "Costa de Marfil", "3T_P79": "Sudáfrica", 
        "3T_P80": "Ghana", "3T_P81": "Bosnia y Herzegovina", "3T_P82": "Rep. Checa", 
        "3T_P85": "Suecia", "3T_P88": "Turquia"
    };

    // 2. Mapeo directo a los elementos de la interfaz para 16vos
    const mapa16vos = [
        { id: 73, l: oficiales['2A'], v: oficiales['2B'] },
        { id: 74, l: oficiales['1C'], v: oficiales['2F'] },
        { id: 75, l: oficiales['1E'], v: oficiales['3T_P75'] },
        { id: 76, l: oficiales['1F'], v: oficiales['2C'] },
        { id: 77, l: oficiales['2E'], v: oficiales['2I'] },
        { id: 78, l: oficiales['1I'], v: oficiales['3T_P78'] },
        { id: 79, l: oficiales['1A'], v: oficiales['3T_P79'] },
        { id: 80, l: oficiales['1L'], v: oficiales['3T_P80'] },
        { id: 81, l: oficiales['1G'], v: oficiales['3T_P81'] },
        { id: 82, l: oficiales['1D'], v: oficiales['3T_P82'] },
        { id: 83, l: oficiales['1H'], v: oficiales['2J'] },
        { id: 84, l: oficiales['2K'], v: oficiales['2L'] },
        { id: 85, l: oficiales['1B'], v: oficiales['3T_P85'] },
        { id: 86, l: oficiales['2D'], v: oficiales['2G'] },
        { id: 87, l: oficiales['1J'], v: oficiales['2H'] },
        { id: 88, l: oficiales['1K'], v: oficiales['3T_P88'] }
    ];

    // 3. Imprimir los nombres en las etiquetas HTML correspondientes
    mapa16vos.forEach(partido => {
        const etiquetaLocal = document.getElementById(`N-L-${partido.id}`);
        const etiquetaVisita = document.getElementById(`N-V-${partido.id}`);
        
        if (etiquetaLocal) etiquetaLocal.innerText = partido.l;
        if (etiquetaVisita) etiquetaVisita.innerText = partido.v;
    });

    console.log("Lógica de administración actualizada con los cruces estáticos.");
} // <--- AQUÍ CERRÉ LA FUNCIÓN actualizarLogicaAdmin

// --- 5. CARGAR RESULTADOS DESDE LA DB ---
async function cargarResultadosExistentes() {
    try {
        console.log("Cargando resultados oficiales desde la DB...");
        const response = await fetch(`${API_URL}/obtener-resultados-db`);
        if (!response.ok) throw new Error("Error en la petición");
        
        const resultadosDB = await response.json();

        if (resultadosDB && resultadosDB.length > 0) {
            // --- FUNCIÓN DE LIMPIEZA INTERNA ---
            const limpiar = (txt) => txt ? txt.trim().toLowerCase().replace(/\s+/g, ' ') : "";
            // -----------------------------------

            resultadosDB.forEach(res => {
                const inputL = document.getElementById(`R-L-${res.id}`);
                const inputV = document.getElementById(`R-V-${res.id}`);
                
                if (inputL && inputV) {
                    // Soporta de forma segura tanto si la DB devuelve 'gl'/'gv' como si devuelve 'realL'/'realV'
                    const golLocal = res.gl !== undefined && res.gl !== null ? res.gl : res.realL;
                    const golVisita = res.gv !== undefined && res.gv !== null ? res.gv : res.realV;

                    inputL.value = golLocal !== undefined && golLocal !== null ? golLocal : "";
                    inputV.value = golVisita !== undefined && golVisita !== null ? golVisita : "";
                }
            });
            
            // Forzamos el cálculo de la tabla de grupos y la distribución de las llaves
            actualizarLogicaAdmin();
            console.log("Resultados cargados y llaves actualizadas con éxito.");
        }
    } catch (error) {
        console.error("Error al cargar resultados:", error);
    }
}


async function guardarResultadosOficiales() {
    // 1. Forzamos que se calculen los nombres (Marruecos, Colombia, etc.) antes de leerlos
    actualizarLogicaAdmin();

    const resultadosEnvio = [];
    
    partidosData.forEach(p => {
        const inputL = document.getElementById(`R-L-${p.id}`);
        const inputV = document.getElementById(`R-V-${p.id}`);
        
        // Elementos donde el script escribe los nombres calculados
        const elNombreL = document.getElementById(`N-L-${p.id}`);
        const elNombreV = document.getElementById(`N-V-${p.id}`);

        if (inputL && inputV) {
            const gl = inputL.value.trim();
            const gv = inputV.value.trim();

            // Solo enviamos si el admin puso goles
            if (gl !== "" && gv !== "") {
                // Capturamos el texto visible (aquí ya dirá "Marruecos" en vez de "L101")
                const nombreLocal = elNombreL ? elNombreL.innerText.trim() : "";
                const nombreVisita = elNombreV ? elNombreV.innerText.trim() : "";

                resultadosEnvio.push({
                    id: p.id,
                    realL: parseInt(gl),
                    realV: parseInt(gv),
                    nombreLocal: nombreLocal,
                    nombreVisita: nombreVisita
                });
            }
        }
    });

    if (resultadosEnvio.length === 0) return alert("No hay marcadores completos para guardar.");

    try {
        const response = await fetch(`${API_URL}/guardar-resultados-db`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultadosEnvio)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert("¡Éxito!: Resultados guardados con nombres reales.");
        } else {
            alert("Error: " + (data.error || "No se pudo guardar."));
        }
    } catch (e) {
        console.error("Error:", e);
        alert("Error de conexión.");
    }
}




function fijarCrucesOficiales16vos() {
    // 1. Define aquí EXACTAMENTE qué equipo quedó en cada posición según tus cálculos de la FIFA
    const oficiales = {
        // Líderes de Grupo (1)
        "1A": "México", "1B": "Canadá", "1C": "Brasil", "1D": "EE. UU.", 
        "1E": "Alemania", "1F": "Países Bajos", "1G": "Bélgica", "1H": "España", 
        "1I": "Francia", "1J": "Argentina", "1K": "Portugal", "1L": "Inglaterra",

        // Segundos de Grupo (2)
        "2A": "Rep. Corea", "2B": "Suiza", "2C": "Marruecos", "2D": "Australia", 
        "2E": "Ecuador", "2F": "Japón", "2G": "RI de Irán", "2H": "Uruguay", 
        "2I": "Noruega", "2J": "Austria", "2K": "Colombia", "2L": "Croacia",

        // Los 8 Mejores Terceros oficiales asignados a sus respectivos partidos
        "3T_P75": "Congo",              // Va al partido 75 contra 1E
        "3T_P78": "Costa de Marfil",    // Va al partido 78 contra 1I
        "3T_P79": "Sudáfrica",          // Va al partido 79 contra 1A
        "3T_P80": "Ghana",              // Va al partido 80 contra 1L
        "3T_P81": "Bosnia y Herzegovina",// Va al partido 81 contra 1G
        "3T_P82": "Rep. Checa",         // Va al partido 82 contra 1D
        "3T_P85": "Suecia",             // Va al partido 85 contra 1B
        "3T_P88": "Turquia"             // Va al partido 88 contra 1K
    };

    // 2. Mapeo estructural de los partidos de 16vos (IDs 73 al 88)
    const mapa16vos = [
        { id: 73, l: oficiales['2A'], v: oficiales['2B'] },
        { id: 74, l: oficiales['1C'], v: oficiales['2F'] },
        { id: 75, l: oficiales['1E'], v: oficiales['3T_P75'] },
        { id: 76, l: oficiales['1F'], v: oficiales['2C'] },
        { id: 77, l: oficiales['2E'], v: oficiales['2I'] },
        { id: 78, l: oficiales['1I'], v: oficiales['3T_P78'] },
        { id: 79, l: oficiales['1A'], v: oficiales['3T_P79'] },
        { id: 80, l: oficiales['1L'], v: oficiales['3T_P80'] },
        { id: 81, l: oficiales['1G'], v: oficiales['3T_P81'] },
        { id: 82, l: oficiales['1D'], v: oficiales['3T_P82'] },
        { id: 83, l: oficiales['1H'], v: oficiales['2J'] },
        { id: 84, l: oficiales['2K'], v: oficiales['2L'] },
        { id: 85, l: oficiales['1B'], v: oficiales['3T_P85'] },
        { id: 86, l: oficiales['2D'], v: oficiales['2G'] },
        { id: 87, l: oficiales['1J'], v: oficiales['2H'] },
        { id: 88, l: oficiales['1K'], v: oficiales['3T_P88'] }
    ];

    // 3. Renderizar directamente en las etiquetas del HTML
    mapa16vos.forEach(partido => {
        const etiquetaLocal = document.getElementById(`N-L-${partido.id}`);
        const etiquetaVisita = document.getElementById(`N-V-${partido.id}`);
        
        if (etiquetaLocal) etiquetaLocal.innerText = partido.l;
        if (etiquetaVisita) etiquetaVisita.innerText = partido.v;
    });

    console.log("Llaves de 16vos forzadas con la clasificación correcta.");
}





// ARRANQUE COMPLETO Y CORREGIDO
document.addEventListener("DOMContentLoaded", async () => {
    // 1. Dibuja los partidos en blanco
    renderizarPartidosAdmin(); 
    
    // 2. Trae los goles guardados de la base de datos
    await cargarResultadosExistentes(); 
    
    // 3. RETRASO DE SEGURIDAD (Espera 500ms a que terminen otros scripts)
    setTimeout(() => {
        console.log("Forzando asignación definitiva de 16vos...");
        
        const oficiales = {
            "1A": "México", "1B": "Canadá", "1C": "Brasil", "1D": "EE. UU.", 
            "1E": "Alemania", "1F": "Países Bajos", "1G": "Bélgica", "1H": "España", 
            "1I": "Francia", "1J": "Argentina", "1K": "Portugal", "1L": "Inglaterra",
            "2A": "Rep. Corea", "2B": "Suiza", "2C": "Marruecos", "2D": "Australia", 
            "2E": "Ecuador", "2F": "Japón", "2G": "RI de Irán", "2H": "Uruguay", 
            "2I": "Noruega", "2J": "Austria", "2K": "Colombia", "2L": "Croacia",
            "3T_P75": "Congo", "3T_P78": "Costa de Marfil", "3T_P79": "Sudáfrica", 
            "3T_P80": "Ghana", "3T_P81": "Bosnia y Herzegovina", "3T_P82": "Rep. Checa", 
            "3T_P85": "Suecia", "3T_P88": "Turquia"
        };

        const mapa16vos = [
            { id: 73, l: oficiales['2A'], v: oficiales['2B'] },
            { id: 74, l: oficiales['1C'], v: oficiales['2F'] },
            { id: 75, l: oficiales['1E'], v: oficiales['3T_P75'] },
            { id: 76, l: oficiales['1F'], v: oficiales['2C'] },
            { id: 77, l: oficiales['2E'], v: oficiales['2I'] },
            { id: 78, l: oficiales['1I'], v: oficiales['3T_P78'] },
            { id: 79, l: oficiales['1A'], v: oficiales['3T_P79'] },
            { id: 80, l: oficiales['1L'], v: oficiales['3T_P80'] },
            { id: 81, l: oficiales['1G'], v: oficiales['3T_P81'] },
            { id: 82, l: oficiales['1D'], v: oficiales['3T_P82'] },
            { id: 83, l: oficiales['1H'], v: oficiales['2J'] },
            { id: 84, l: oficiales['2K'], v: oficiales['2L'] },
            { id: 85, l: oficiales['1B'], v: oficiales['3T_P85'] },
            { id: 86, l: oficiales['2D'], v: oficiales['2G'] },
            { id: 87, l: oficiales['1J'], v: oficiales['2H'] },
            { id: 88, l: oficiales['1K'], v: oficiales['3T_P88'] }
        ];

        mapa16vos.forEach(partido => {
            const etiquetaLocal = document.getElementById(`N-L-${partido.id}`);
            const etiquetaVisita = document.getElementById(`N-V-${partido.id}`);
            
            if (etiquetaLocal) etiquetaLocal.innerText = partido.l;
            if (etiquetaVisita) etiquetaVisita.innerText = partido.v;
        });
        
    }, 500); // 500 milisegundos de espera
});
