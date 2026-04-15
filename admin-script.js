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
        container.appendChild(card);
    });
}

function actualizarLogicaAdmin() {
    const resultados = {};
    partidosData.forEach(p => {
        const inputL = document.getElementById(`R-L-${p.id}`);
        const inputV = document.getElementById(`R-V-${p.id}`);
        const gl = inputL ? inputL.value : "";
        const gv = inputV ? inputV.value : "";
        resultados[p.id] = {
            gl: gl !== "" ? parseInt(gl) : null,
            gv: gv !== "" ? parseInt(gv) : null
        };
    });

    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    let clasificados = {};

    grupos.forEach(g => {
        let tabla = {};
        const partidosGrupo = partidosData.filter(p => p.fase === "Grupos" && p.grupo === g);
        
        partidosGrupo.forEach(p => {
            if (!tabla[p.local]) tabla[p.local] = { nombre: p.local, pts: 0, dg: 0, gf: 0, ranking: rankingFIFA[p.local] || 200 };
            if (!tabla[p.visita]) tabla[p.visita] = { nombre: p.visita, pts: 0, dg: 0, gf: 0, ranking: rankingFIFA[p.visita] || 200 };
            
            const res = resultados[p.id];
            if (res && res.gl !== null && res.gv !== null) {
                tabla[p.local].gf += res.gl;
                tabla[p.visita].gf += res.gv;
                tabla[p.local].dg += (res.gl - res.gv);
                tabla[p.visita].dg += (res.gv - res.gl);
                if (res.gl > res.gv) tabla[p.local].pts += 3;
                else if (res.gl < res.gv) tabla[p.visita].pts += 3;
                else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
            }
        });

        let ordenados = Object.values(tabla).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.ranking - b.ranking);
        clasificados[`1${g}`] = ordenados[0]?.nombre || `1${g}`;
        clasificados[`2${g}`] = ordenados[1]?.nombre || `2${g}`;
        clasificados[`3${g}`] = ordenados[2]?.nombre || `3${g}`;
    });

    const mapeo16vos = [
        { id: 73, l: clasificados['2A'], v: clasificados['2B'] },
        { id: 74, l: clasificados['1C'], v: clasificados['2F'] },
        { id: 75, l: clasificados['1E'], v: clasificados['3A'] || "3A" },
        { id: 76, l: clasificados['1F'], v: clasificados['2C'] },
        { id: 77, l: clasificados['2E'], v: clasificados['2I'] },
        { id: 78, l: clasificados['1I'], v: clasificados['3C'] || "3C" },
        { id: 79, l: clasificados['1A'], v: clasificados['3E'] || "3E" },
        { id: 80, l: clasificados['1L'], v: clasificados['3H'] || "3H" },
        { id: 81, l: clasificados['1G'], v: clasificados['3I'] || "3I" },
        { id: 82, l: clasificados['1D'], v: clasificados['3B'] || "3B" },
        { id: 83, l: clasificados['1H'], v: clasificados['2J'] },
        { id: 84, l: clasificados['2K'], v: clasificados['2L'] },
        { id: 85, l: clasificados['1B'], v: clasificados['3F'] || "3F" },
        { id: 86, l: clasificados['2D'], v: clasificados['2G'] },
        { id: 87, l: clasificados['1J'], v: clasificados['2H'] },
        { id: 88, l: clasificados['1K'], v: clasificados['3D'] || "3D" }
    ];

    mapeo16vos.forEach(m => {
        const lbL = document.getElementById(`N-L-${m.id}`);
        const lbV = document.getElementById(`N-V-${m.id}`);
        if (lbL) lbL.innerText = m.l;
        if (lbV) lbV.innerText = m.v;
    });

    const getGanador = (id) => {
        const res = resultados[id];
        if (!res || res.gl === null || res.gv === null) return `Ganador ${id}`;
        const txtL = document.getElementById(`N-L-${id}`)?.innerText || `Local ${id}`;
        const txtV = document.getElementById(`N-V-${id}`)?.innerText || `Visita ${id}`;
        if (res.gl > res.gv) return txtL;
        if (res.gv > res.gl) return txtV;
        return txtL; 
    };

    const mapeo8vos = [
        { id: 89, l: getGanador(73), v: getGanador(75) },
        { id: 90, l: getGanador(74), v: getGanador(77) },
        { id: 91, l: getGanador(76), v: getGanador(78) },
        { id: 92, l: getGanador(79), v: getGanador(80) },
        { id: 93, l: getGanador(83), v: getGanador(84) },
        { id: 94, l: getGanador(81), v: getGanador(82) },
        { id: 95, l: getGanador(86), v: getGanador(88) },
        { id: 96, l: getGanador(85), v: getGanador(87) }
    ];

    mapeo8vos.forEach(m => {
        if (document.getElementById(`N-L-${m.id}`)) document.getElementById(`N-L-${m.id}`).innerText = m.l;
        if (document.getElementById(`N-V-${m.id}`)) document.getElementById(`N-V-${m.id}`).innerText = m.v;
    });

    const mapeo4tos = [
        { id: 97, l: getGanador(89), v: getGanador(90) },
        { id: 98, l: getGanador(93), v: getGanador(94) },
        { id: 99, l: getGanador(91), v: getGanador(92) },
        { id: 100, l: getGanador(95), v: getGanador(96) }
    ];

    mapeo4tos.forEach(m => {
        if (document.getElementById(`N-L-${m.id}`)) document.getElementById(`N-L-${m.id}`).innerText = m.l;
        if (document.getElementById(`N-V-${m.id}`)) document.getElementById(`N-V-${m.id}`).innerText = m.v;
    });

    const mapeoSemis = [
        { id: 101, l: getGanador(97), v: getGanador(98) },
        { id: 102, l: getGanador(99), v: getGanador(100) }
    ];

    mapeoSemis.forEach(m => {
        if (document.getElementById(`N-L-${m.id}`)) document.getElementById(`N-L-${m.id}`).innerText = m.l;
        if (document.getElementById(`N-V-${m.id}`)) document.getElementById(`N-V-${m.id}`).innerText = m.v;
    });

    const getPerdedor = (id) => {
        const res = resultados[id];
        if (!res || res.gl === null || res.gv === null) return `Perdedor ${id}`;
        const txtL = document.getElementById(`N-L-${id}`)?.innerText;
        const txtV = document.getElementById(`N-V-${id}`)?.innerText;
        return (res.gl > res.gv) ? txtV : txtL;
    };

    if (document.getElementById(`N-L-104`)) document.getElementById(`N-L-104`).innerText = getGanador(101);
    if (document.getElementById(`N-V-104`)) document.getElementById(`N-V-104`).innerText = getGanador(102);
    if (document.getElementById(`N-L-103`)) document.getElementById(`N-L-103`).innerText = getPerdedor(101);
    if (document.getElementById(`N-V-103`)) document.getElementById(`N-V-103`).innerText = getPerdedor(102);
} // <--- AQUÍ CERRÉ LA FUNCIÓN actualizarLogicaAdmin


// --- 5. CARGAR RESULTADOS DESDE LA DB ---
async function cargarResultadosExistentes() {
    try {
        console.log("Cargando resultados oficiales desde la DB...");
        const response = await fetch(`${API_URL}/obtener-resultados-db`);
        if (!response.ok) throw new Error("Error en la petición");
        
        const resultadosDB = await response.json();

        if (resultadosDB && resultadosDB.length > 0) {
            resultadosDB.forEach(res => {
                // IMPORTANTE: res.gl y res.gv son los nombres que vienen de tu servidor
                const inputL = document.getElementById(`R-L-${res.id}`);
                const inputV = document.getElementById(`R-V-${res.id}`);
                
                if (inputL && inputV) {
                    inputL.value = res.gl; // Cambiado de realL a gl
                    inputV.value = res.gv; // Cambiado de realV a gv
                }
            });
            
            // Ejecutamos la lógica para que se muevan los equipos en las llaves
            actualizarLogicaAdmin();
            console.log("Resultados cargados y llaves actualizadas.");
        }
    } catch (error) {
        console.error("Error al cargar resultados:", error);
    }
}


async function guardarResultadosOficiales() {
    const resultadosEnvio = [];
    partidosData.forEach(p => {
        const inputL = document.getElementById(`R-L-${p.id}`);
        const inputV = document.getElementById(`R-V-${p.id}`);
        if (inputL && inputV) {
            const gl = inputL.value;
            const gv = inputV.value;
            const nombreLocal = document.getElementById(`N-L-${p.id}`).innerText;
            const nombreVisita = document.getElementById(`N-V-${p.id}`).innerText;

            if (gl !== "" && gv !== "") {
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

    if (resultadosEnvio.length === 0) return alert("Nada que guardar.");

    try {
        const response = await fetch(`${API_URL}/guardar-resultados-db`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(resultadosEnvio)
        });
        const data = await response.json();
        alert(data.mensaje);
    } catch (e) {
        alert("Error al guardar.");
    }
}
// ARRANQUE
document.addEventListener("DOMContentLoaded", async () => {
    renderizarPartidosAdmin(); // Dibuja la estructura
    await cargarResultadosExistentes(); // Trae los datos de Neon y llena los huecos
});
