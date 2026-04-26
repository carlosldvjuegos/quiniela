// 0. CONFIGURACIÓN DE URL Y RANKING AUXILIAR
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? window.location.origin
    : "https://quiniela-pcas.onrender.com";

const rankingFIFA = {
    "México": 15, "Sudáfrica": 60, "Rep. Corea": 22, "Rep. Checa": 30,
    "Canadá": 40, "Bosnia y Herzegovina": 55, "Catar": 35, "Suiza": 12,
    "Brasil": 5, "Marruecos": 13, "Haití": 80, "Escocia": 38,
    "EE. UU.": 11, "Paraguay": 56, "Australia": 24, "Turquia": 26,
    "Alemania": 16, "Curazao": 90, "Costa de Marfil": 39, "Ecuador": 31,
    "Países Bajos": 7, "Japón": 18, "Suecia": 25, "Túnez": 41,
    "Bélgica": 4, "Egipto": 36, "RI de Irán": 20, "Nueva Zelanda": 100,
    "España": 3, "Islas de Cabo Verde": 65, "Arabia Saudita": 53, "Uruguay": 14,
    "Francia": 2, "Senegal": 17, "Irak": 58, "Noruega": 44,
    "Argentina": 1, "Argelia": 43, "Austria": 23, "Jordania": 70,
    "Portugal": 6, "Congo": 75, "Uzbekistán": 68, "Colombia": 10,
    "Inglaterra": 8, "Croacia": 9, "Ghana": 61, "Panamá": 45
};

// 1. LISTA DE PARTIDOS
const partidosData = [
    // GRUPO A
    { id: 1, fase: "Grupos", grupo: "A", fecha: "Jueves 11/06/2026", local: "México", visita: "Sudáfrica" },
    { id: 2, fase: "Grupos", grupo: "A", fecha: "Viernes 12/06/2026", local: "Rep. Corea", visita: "Rep. Checa" },
    { id: 3, fase: "Grupos", grupo: "A", fecha: "Jueves 18/06/2026", local: "Rep. Checa", visita: "Sudáfrica" },
    { id: 4, fase: "Grupos", grupo: "A", fecha: "Viernes 19/06/2026", local: "México", visita: "Rep. Corea" },
    { id: 5, fase: "Grupos", grupo: "A", fecha: "Jueves 25/06/2026", local: "Rep. Checa", visita: "México" },
    { id: 6, fase: "Grupos", grupo: "A", fecha: "Jueves 25/06/2026", local: "Sudáfrica", visita: "Rep. Corea" },
    // GRUPO B
    { id: 7, fase: "Grupos", grupo: "B", fecha: "Viernes 12/06/2026", local: "Canadá", visita: "Bosnia y Herzegovina" },
    { id: 8, fase: "Grupos", grupo: "B", fecha: "Sábado 13/06/2026", local: "Catar", visita: "Suiza" },
    { id: 9, fase: "Grupos", grupo: "B", fecha: "Jueves 18/06/2026", local: "Suiza", visita: "Bosnia y Herzegovina" },
    { id: 10, fase: "Grupos", grupo: "B", fecha: "Viernes 19/06/2026", local: "Canadá", visita: "Catar" },
    { id: 11, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Suiza", visita: "Canadá" },
    { id: 12, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Bosnia y Herzegovina", visita: "Catar" },
    // GRUPO C
    { id: 13, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Brasil", visita: "Marruecos" },
    { id: 14, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Haití", visita: "Escocia" },
    { id: 15, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Escocia", visita: "Marruecos" },
    { id: 16, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Brasil", visita: "Haití" },
    { id: 17, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Escocia", visita: "Brasil" },
    { id: 18, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Marruecos", visita: "Haití" },
    // GRUPO D
    { id: 19, fase: "Grupos", grupo: "D", fecha: "Sábado 13/06/2026", local: "EE. UU.", visita: "Paraguay" },
    { id: 20, fase: "Grupos", grupo: "D", fecha: "Domingo 14/06/2026", local: "Australia", visita: "Turquia" },
    { id: 21, fase: "Grupos", grupo: "D", fecha: "Sábado 20/06/2026", local: "Turquia", visita: "Paraguay" },
    { id: 22, fase: "Grupos", grupo: "D", fecha: "Viernes 19/06/2026", local: "EE. UU.", visita: "Australia" },
    { id: 23, fase: "Grupos", grupo: "D", fecha: "Viernes 26/06/2026", local: "Turquia", visita: "EE. UU." },
    { id: 24, fase: "Grupos", grupo: "D", fecha: "Jueves 26/06/2026",  local: "Paraguay", visita: "Australia" },
    // GRUPO E
    { id: 25, fase: "Grupos", grupo: "E", fecha: "Domingo 14/06/2026", local: "Alemania", visita: "Curazao" },
    { id: 26, fase: "Grupos", grupo: "E", fecha: "Lunes 15/06/2026", local: "Costa de Marfil", visita: "Ecuador" },
    { id: 27, fase: "Grupos", grupo: "E", fecha: "Sábado 20/06/2026", local: "Alemania", visita: "Costa de Marfil" },
    { id: 28, fase: "Grupos", grupo: "E", fecha: "Domingo 21/06/2026", local: "Ecuador", visita: "Curazao" },
    { id: 29, fase: "Grupos", grupo: "E", fecha: "Jueves 25/06/2026", local: "Curazao", visita: "Costa de Marfil" },
    { id: 30, fase: "Grupos", grupo: "E", fecha: "Jueves 25/06/2026", local: "Ecuador", visita: "Alemania" },
    // GRUPO F
    { id: 31, fase: "Grupos", grupo: "F", fecha: "Domingo 14/06/2026", local: "Países Bajos", visita: "Japón" },
    { id: 32, fase: "Grupos", grupo: "F", fecha: "Lunes 15/06/2026", local: "Suecia", visita: "Túnez" },
    { id: 33, fase: "Grupos", grupo: "F", fecha: "Sábado 20/06/2026", local: "Países Bajos", visita: "Suecia" },
    { id: 34, fase: "Grupos", grupo: "F", fecha: "Domingo 21/06/2026", local: "Túnez", visita: "Japón" },
    { id: 35, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Japón", visita: "Suecia" },
    { id: 36, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Túnez", visita: "Países Bajos" },
    // GRUPO G
    { id: 37, fase: "Grupos", grupo: "G", fecha: "Lunes 15/06/2026", local: "Bélgica", visita: "Egipto" },
    { id: 38, fase: "Grupos", grupo: "G", fecha: "Martes 16/06/2026", local: "RI de Irán", visita: "Nueva Zelanda" },
    { id: 39, fase: "Grupos", grupo: "G", fecha: "Domingo 21/06/2026", local: "Bélgica", visita: "RI de Irán" },
    { id: 40, fase: "Grupos", grupo: "G", fecha: "Lunes 22/06/2026", local: "Nueva Zelanda", visita: "Egipto" },
    { id: 41, fase: "Grupos", grupo: "G", fecha: "Sábado 27/06/2026", local: "Egipto", visita: "RI de Irán" },
    { id: 42, fase: "Grupos", grupo: "G", fecha: "Sábado 27/06/2026", local: "Nueva Zelanda", visita: "Bélgica" },
    // GRUPO H
    { id: 43, fase: "Grupos", grupo: "H", fecha: "Lunes 15/06/2026", local: "España", visita: "Islas de Cabo Verde" },
    { id: 44, fase: "Grupos", grupo: "H", fecha: "Martes 16/06/2026", local: "Arabia Saudita", visita: "Uruguay" },
    { id: 45, fase: "Grupos", grupo: "H", fecha: "Domingo 21/06/2026", local: "España", visita: "Arabia Saudita" },
    { id: 46, fase: "Grupos", grupo: "H", fecha: "Lunes 22/06/2026", local: "Uruguay", visita: "Islas de Cabo Verde" },
    { id: 47, fase: "Grupos", grupo: "H", fecha: "Sábado 27/06/2026", local: "Islas de Cabo Verde", visita: "Arabia Saudita" },
    { id: 48, fase: "Grupos", grupo: "H", fecha: "Sábado 27/06/2026", local: "Uruguay", visita: "España" },
    // GRUPO I
    { id: 49, fase: "Grupos", grupo: "I", fecha: "Martes 16/06/2026", local: "Francia", visita: "Senegal" },
    { id: 50, fase: "Grupos", grupo: "I", fecha: "Miércoles 17/06/2026", local: "Irak", visita: "Noruega" },
    { id: 51, fase: "Grupos", grupo: "I", fecha: "Lunes 22/06/2026", local: "Francia", visita: "Irak" },
    { id: 52, fase: "Grupos", grupo: "I", fecha: "Martes 23/06/2026", local: "Noruega", visita: "Senegal" },
    { id: 53, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Noruega", visita: "Francia" },
    { id: 54, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Senegal", visita: "Irak" },
    // GRUPO J
    { id: 55, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Argentina", visita: "Argelia" },
    { id: 56, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Austria", visita: "Jordania" },
    { id: 57, fase: "Grupos", grupo: "J", fecha: "Lunes 22/06/2026", local: "Argentina", visita: "Austria" },
    { id: 58, fase: "Grupos", grupo: "J", fecha: "Martes 23/06/2026", local: "Jordania", visita: "Argelia" },
    { id: 59, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Argelia", visita: "Austria" },
    { id: 60, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Jordania", visita: "Argentina" },
    // GRUPO K
    { id: 61, fase: "Grupos", grupo: "K", fecha: "Miércoles 17/06/2026", local: "Portugal", visita: "Congo" },
    { id: 62, fase: "Grupos", grupo: "K", fecha: "Jueves 18/06/2026", local: "Uzbekistán", visita: "Colombia" },
    { id: 63, fase: "Grupos", grupo: "K", fecha: "Martes 23/06/2026", local: "Portugal", visita: "Uzbekistán" },
    { id: 64, fase: "Grupos", grupo: "K", fecha: "Miércoles 24/06/2026", local: "Colombia", visita: "Congo" },
    { id: 65, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Colombia", visita: "Portugal" },
    { id: 66, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Congo", visita: "Uzbekistán" },
    // GRUPO L
    { id: 67, fase: "Grupos", grupo: "L", fecha: "Miércoles 17/06/2026", local: "Inglaterra", visita: "Croacia" },
    { id: 68, fase: "Grupos", grupo: "L", fecha: "Jueves 18/06/2026", local: "Ghana", visita: "Panamá" },
    { id: 69, fase: "Grupos", grupo: "L", fecha: "Martes 23/06/2026", local: "Inglaterra", visita: "Ghana" },
    { id: 70, fase: "Grupos", grupo: "L", fecha: "Miércoles 24/06/2026", local: "Panamá", visita: "Croacia" },
    { id: 71, fase: "Grupos", grupo: "L", fecha: "Sábado 27/06/2026", local: "Panamá", visita: "Inglaterra" },
    { id: 72, fase: "Grupos", grupo: "L", fecha: "Sábado 27/06/2026", local: "Croacia", visita: "Ghana" },

    // DIECISEISAVOS
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

    // OCTAVOS
    { id: 89, fase: "8vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "G73", visita: "G75" },
    { id: 90, fase: "8vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "G74", visita: "G77" },
    { id: 91, fase: "8vos", grupo: "Eliminatoria", fecha: "Domingo 05/07/2026", local: "G76", visita: "G78" },
    { id: 92, fase: "8vos", grupo: "Eliminatoria", fecha: "Lunes 06/07/2026", local: "G79", visita: "G80" },
    { id: 93, fase: "8vos", grupo: "Eliminatoria", fecha: "Lunes 06/07/2026", local: "G83", visita: "G84" },
    { id: 94, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "G81", visita: "G82" },
    { id: 95, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "G86", visita: "G88" },
    { id: 96, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "G85", visita: "G87" },

    // CUARTOS
    { id: 97, fase: "4tos", grupo: "Eliminatoria", fecha: "Jueves 09/07/2026", local: "G89", visita: "G90" },
    { id: 98, fase: "4tos", grupo: "Eliminatoria", fecha: "Viernes 10/07/2026", local: "G93", visita: "G94" },
    { id: 99, fase: "4tos", grupo: "Eliminatoria", fecha: "Sábado 11/07/2026", local: "G91", visita: "G92" },
    { id: 100, fase: "4tos", grupo: "Eliminatoria", fecha: "Domingo 12/07/2026", local: "G95", visita: "G96" },

    // SEMIS
    { id: 101, fase: "Semis", grupo: "Eliminatoria", fecha: "Martes 14/07/2026", local: "G97", visita: "G98" },
    { id: 102, fase: "Semis", grupo: "Eliminatoria", fecha: "Miércoles 15/07/2026", local: "G99", visita: "G100" },

    // FINALES
    { id: 103, fase: "3er Puesto", grupo: "Eliminatoria", fecha: "Sábado 18/07/2026", local: "P101", visita: "P102" },
    { id: 104, fase: "Final", grupo: "Eliminatoria", fecha: "Domingo 19/07/2026", local: "G101", visita: "G102" }
];

// 2. LÓGICA DE PUNTOS UNIFICADA
function calcularLogicaPuntos(pL, pV, rL, rV) {
    pL = parseInt(pL); pV = parseInt(pV);
    rL = parseInt(rL); rV = parseInt(rV);
    if (isNaN(rL) || isNaN(rV)) return 0; // Si no hay resultado real, 0 puntos
    
    if (pL === rL && pV === rV) return 5;
    if (rL === rV) {
        if (pL === pV) return 2;
        if (pL === rL || pV === rV) return 1;
        return 0;
    }
    const tP = Math.sign(pL - pV);
    const tR = Math.sign(rL - rV);
    if (tP === tR) {
        if (pL === rL || pV === rV) return 3;
        return 2;
    }
    if (pL === rL || pV === rV) return 1;
    return 0;
}

// 3. RENDERIZAR FIXTURE
async function renderizarFixture() {
    const fixtureCont = document.getElementById("fixture-container");
    if (!fixtureCont) return;
    fixtureCont.innerHTML = "";

    let resultadosDB = [];
    try {
        const resp = await fetch(`${API_URL}/obtener-resultados-db`);
        resultadosDB = await resp.json();
    } catch (e) { console.log("Error al cargar reales"); }

    partidosData.forEach(p => {
        const r = resultadosDB.find(res => res.id === p.id);
        const textoReal = r ? `${r.gl} - ${r.gv}` : "-";
        const esEliminatoria = p.fase !== "Grupos";

        const card = document.createElement("div");
        card.className = "partido-card";
        card.innerHTML = `
            <div class="card-header">
                <span class="txt-fase">${p.fase} ${p.grupo ? '- Grupo ' + p.grupo : ''}</span>
                <span class="txt-fecha">${p.fecha}</span>
            </div>
            <div class="card-body">
                <div class="equipo-col local">${p.local}</div>
                <div class="marcador-col" style="flex-direction: column;">
                    <div style="display:flex; align-items:center; gap:5px;">
                        <input type="number" id="L-${p.id}" min="0" oninput="gestionarDesempate(${p.id}); actualizarTorneo()">
                        <span class="separador">-</span>
                        <input type="number" id="V-${p.id}" min="0" oninput="gestionarDesempate(${p.id}); actualizarTorneo()">
                    </div>
                    ${esEliminatoria ? `
                    <div id="extra-${p.id}" class="marcador-desempate" style="display: none;">
                        <span class="etiqueta-desempate">Solo para Clasificación</span>
                        <div class="inputs-desempate">
                            <input type="number" id="DL-${p.id}" class="in-desempate" oninput="actualizarTorneo()">
                            <span class="sep">:</span>
                            <input type="number" id="DV-${p.id}" class="in-desempate" oninput="actualizarTorneo()">
                        </div>
                    </div>` : ''}
                </div>
                <div class="equipo-col visita">${p.visita}</div>
                <div class="real-col">
                    <div class="etiqueta-real">Resultados Reales</div>
                    <div class="cuadro-real">${textoReal}</div>
                </div>
            </div>`;
        fixtureCont.appendChild(card);
    });
}

function gestionarDesempate(id) {
    const gl = document.getElementById(`L-${id}`).value;
    const gv = document.getElementById(`V-${id}`).value;
    const panelExtra = document.getElementById(`extra-${id}`);
    if (panelExtra) {
        if (gl !== "" && gv !== "" && parseInt(gl) === parseInt(gv)) {
            panelExtra.style.display = "block";
        } else {
            panelExtra.style.display = "none";
            const idDL = document.getElementById(`DL-${id}`);
            const idDV = document.getElementById(`DV-${id}`);
            if(idDL) idDL.value = "";
            if(idDV) idDV.value = "";
        }
    }
}

// 4. RANKING
async function actualizarListaLinks() {
    const container = document.getElementById('links-container');
    if (!container) return;
    try {
        const [resNombres, resOficiales, resTodasPred] = await Promise.all([
            fetch(`${API_URL}/registros`),
            fetch(`${API_URL}/obtener-resultados-db`),
            fetch(`${API_URL}/obtener-todas-predicciones`)
        ]);
        const usuarios = await resNombres.json();
        const oficiales = await resOficiales.json();
        const todasPred = await resTodasPred.json();

        const predPorUser = todasPred.reduce((acc, p) => {
            if (!acc[p.nombre_usuario]) acc[p.nombre_usuario] = [];
            acc[p.nombre_usuario].push(p);
            return acc;
        }, {});

        // Función de normalización interna para comparar sin errores
        const norm = (t) => (t || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();

        let ranking = usuarios.map(user => {
            let pts = 0;
            const susPreds = predPorUser[user.nombre_usuario] || [];
            
            susPreds.forEach(pred => {
                const ofi = oficiales.find(o => parseInt(o.id) === parseInt(pred.partido_id));
                const datosP = partidosData.find(dp => dp.id === pred.partido_id);
                
                if (ofi) {
                    let coincide = true;
                
                    // En eliminatorias, validamos que los equipos sean los mismos
                    if (datosP && datosP.fase !== "Grupos") {
                        const nL_user = norm(pred.nombre_local); // De tabla predicciones
                        const nV_user = norm(pred.nombre_visita);
                        const nL_ofi = norm(ofi.nombre_local);  // Ahora viene así desde el servidor
                        const nV_ofi = norm(ofi.nombre_visita);
                
                        // Si el resultado oficial ya tiene equipos (no está vacío o con ---)
                        if (nL_ofi !== "" && nL_ofi !== "---") {
                            if (nL_user !== nL_ofi || nV_user !== nV_ofi) {
                                coincide = false; // Si no coinciden los nombres, 0 puntos
                            }
                        }
                    }
                
                    if (coincide) {
                        pts += calcularLogicaPuntos(pred.goles_local, pred.goles_visita, ofi.gl, ofi.gv);
                    }
                }
            });
            
            return { nombre: user.nombre_usuario, puntos: pts };
        });

        ranking.sort((a, b) => b.puntos - a.puntos);
        
        container.innerHTML = "";
        ranking.forEach((u, i) => {
            const med = i === 0 ? "🥇" : (i === 1 ? "🥈" : (i === 2 ? "🥉" : "•"));
            const btn = document.createElement('button');
            btn.className = "btn-link";
            btn.innerHTML = `
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                    <span>${med} <b>${u.nombre}</b></span>
                    <span class="badge-puntos">${u.puntos} pts</span>
                </div>`;
            btn.onclick = () => cargarDesdeDB(u.nombre);
            container.appendChild(btn);
        });
    } catch (e) { 
        console.error("Error en ranking:", e);
        container.innerHTML = "<p>Error ranking</p>"; 
    }
}

// 5. GUARDAR (CON VALIDACIONES RESTAURADAS)
async function guardarQuinielaCompleta() {
    const inputNombre = document.getElementById('nombre-usuario');
    const nombre = inputNombre.value.trim();
    if (!nombre) return alert("Por favor, ingresa tu nombre.");

    // VALIDACIÓN DE CAMPOS VACÍOS RESTAURADA
    let todosLlenos = true;
    partidosData.forEach(p => {
        const gl = document.getElementById(`L-${p.id}`).value;
        const gv = document.getElementById(`V-${p.id}`).value;
        if (gl === "" || gv === "") todosLlenos = false;
    });

    if (!todosLlenos) {
        alert("Debes completar todos los pronósticos antes de guardar.");
        return;
    }

    const predicciones = [];
    try {
        partidosData.forEach(p => {
            const gl = document.getElementById(`L-${p.id}`).value;
            const gv = document.getElementById(`V-${p.id}`).value;
            const dl = document.getElementById(`DL-${p.id}`)?.value || null;
            const dv = document.getElementById(`DV-${p.id}`)?.value || null;

            if (p.fase !== "Grupos" && parseInt(gl) === parseInt(gv)) {
                if (!dl || !dv || dl === "" || dv === "" || parseInt(dl) === parseInt(dv)) {
                    alert(`Revisa el desempate en el partido: ${p.local} vs ${p.visita}. No pueden empatar en penales.`);
                    throw new Error("Validación desempate");
                }
            }
            // Capturamos los nombres reales de la tarjeta HTML
            const card = document.getElementById(`L-${p.id}`).closest('.partido-card');
            // MEJORA: Si es grupos, usamos el nombre estático del archivo. Si es eliminatoria, el del HTML.
            const nL = (p.fase === "Grupos") ? p.local : card.querySelector('.local').innerText.trim();
            const nV = (p.fase === "Grupos") ? p.visita : card.querySelector('.visita').innerText.trim();
            
            predicciones.push({ 
                id: p.id, 
                gl: parseInt(gl), 
                gv: parseInt(gv), 
                dl: dl ? parseInt(dl) : null, 
                dv: dv ? parseInt(dv) : null,
                nL: nL, 
                nV: nV  
            });
        });
    } catch(e) { return; }

    // BLOQUEO DE BOTÓN RESTAURADO
    const btnSave = document.querySelector(".btn-save");
    btnSave.disabled = true;
    btnSave.innerText = "Guardando...";

    try {
        const resCheck = await fetch(`${API_URL}/registros`);
        const existentes = await resCheck.json();
        if (existentes.some(u => u.nombre_usuario.toLowerCase() === nombre.toLowerCase())) {
            alert("Este nombre ya existe. Por favor usa otro.");
            btnSave.disabled = false;
            btnSave.innerText = "💾 Guardar";
            return;
        }

        if (!confirm("¿Deseas guardar tu quiniela? No podrás editarla después.")) {
            btnSave.disabled = false;
            btnSave.innerText = "💾 Guardar";
            return;
        }

        await fetch(`${API_URL}/guardar`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre, predicciones })
        });
        alert("¡Tu quiniela ha sido guardada con éxito!");
        location.reload();
    } catch (e) { 
        alert("Error al guardar en el servidor."); 
        btnSave.disabled = false;
        btnSave.innerText = "💾 Guardar";
    }
}

// FUNCION CARGAR DESDE BD
async function cargarDesdeDB(nombre) {
    try {
        const inputN = document.getElementById('nombre-usuario');
        if (inputN) { inputN.value = nombre; inputN.readOnly = true; }
        
        const btnSave = document.querySelector(".btn-save");
        if (btnSave) btnSave.style.display = "none";

        document.querySelectorAll('.marcador-col input').forEach(i => { i.value = ""; i.disabled = false; });
        document.querySelectorAll('.puntos-obtenidos').forEach(d => d.remove());

        const [resOficiales, resUser] = await Promise.all([
            fetch(`${API_URL}/obtener-resultados-db`).then(r => r.json()),
            fetch(`${API_URL}/cargar/${nombre}`).then(r => r.json())
        ]);

        // 1. Cargar datos en los inputs (Tu lógica original)
        resUser.forEach(p => {
            const iL = document.getElementById(`L-${p.id}`);
            const iV = document.getElementById(`V-${p.id}`);
            const iDL = document.getElementById(`DL-${p.id}`);
            const iDV = document.getElementById(`DV-${p.id}`);
            if (iL) iL.value = p.gl;
            if (iV) iV.value = p.gv;
            if (iDL && p.dl !== null) iDL.value = p.dl;
            if (iDV && p.dv !== null) iDV.value = p.dv;
            gestionarDesempate(p.id);
        });

        actualizarTorneo();

        // 2. Mostrar puntos y validaciones
        setTimeout(() => {
            let totalPuntos = 0;
            resUser.forEach(p => {
                const iL = document.getElementById(`L-${p.id}`);
                const ofi = resOficiales.find(o => parseInt(o.id) === parseInt(p.id));
                const datosPart = partidosData.find(pd => pd.id === p.id);
            
                if (ofi && iL) {
                    const div = document.createElement('div');
                    div.className = 'puntos-obtenidos';
                    div.style = "font-weight: bold; font-size: 13px; margin-top: 5px; text-align: center;";
            
                    let coincide = true;
                    const norm = (t) => (t || "").toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase();
            
                    if (datosPart && datosPart.fase !== "Grupos") {
                        const nL_user = norm(p.nombre_local);
                        const nV_user = norm(p.nombre_visita);
                        const nL_ofi = norm(ofi.nombreLocal);
                        const nV_ofi = norm(ofi.nombreVisita);
                        
                        if (nL_ofi !== "" && nL_ofi !== "---") {
                            if (nL_user !== nL_ofi || nV_user !== nV_ofi) {
                                coincide = false;
                            }
                        }
                    }
            
                    if (!coincide) {
                        div.style.color = "#ff4444";
                        div.innerHTML = `Equipos incorrectos <br> <span style="font-size:10px;">0 Puntos</span>`;
                    } else {
                        const puntosFinales = calcularLogicaPuntos(p.gl, p.gv, ofi.gl, ofi.gv);
                        totalPuntos += puntosFinales;
                        div.style.color = "#003366"; 
                        div.innerHTML = `Puntos: <span style="color:red; font-size:16px;">${puntosFinales}</span>`;
                    }
                    iL.closest('.marcador-col').appendChild(div);
                }
            });
            
            // 3. Restaurar el nombre de la quiniela arriba del botón (Como estaba antes)
            const container = document.getElementById('links-container');
            if (container) {
                // Buscamos si ya existe el título para no duplicarlo
                let titulo = document.getElementById('titulo-quiniela-activa');
                if (!titulo) {
                    titulo = document.createElement('div');
                    titulo.id = 'titulo-quiniela-activa';
                    titulo.style = "background: #003366; color: white; padding: 10px; border-radius: 8px; margin-bottom: 10px; text-align: center; font-weight: bold; display: flex; justify-content: space-between; align-items: center;";
                    container.prepend(titulo);
                }
                titulo.innerHTML = `<span>🏆 ${nombre.toUpperCase()}</span> <span style="background: white; color: #003366; padding: 2px 8px; border-radius: 4px;">${totalPuntos} PTS</span>`;
            }

            document.querySelectorAll('.marcador-col input').forEach(i => i.disabled = true);
        }, 500);

        // 4. Lógica de navegación (Tu lógica original)
        const btns = document.querySelectorAll('.btn-link');
        btns.forEach(b => {
            if (b.getAttribute('data-nombre-real') === nombre.toLowerCase().trim()) {
                b.style.display = 'flex';
                b.classList.add('quiniela-activa');
            } else if (b.id !== 'btn-volver-lista') {
                b.style.display = 'none';
            }
        });

        if (!document.getElementById('btn-volver-lista')) {
            const br = document.createElement('button');
            br.id = 'btn-volver-lista'; 
            br.innerText = "✕ Cambiar de Quiniela";
            br.className = "btn-link"; 
            br.style.backgroundColor = "#ff4444"; 
            br.style.color = "white";
            br.style.marginTop = "20px";
            br.onclick = () => window.location.href = window.location.origin + window.location.pathname + "?nomodal=1";
            document.getElementById('links-container').appendChild(br);
        }
    } catch(e) { console.error("Error al cargar:", e); }
}

// 7. LÓGICA DE TORNEO (TERCER PUESTO ARREGLADO)
function actualizarTorneo() {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    let clasificados = {}; let datosGrupos = {}; let hayDatos = false;

    grupos.forEach(l => {
        let tabla = {};
        partidosData.filter(p => p.grupo === l).forEach(p => {
            const iL = document.getElementById(`L-${p.id}`);
            const iV = document.getElementById(`V-${p.id}`);
            if (iL?.value !== "" && iV?.value !== "") {
                hayDatos = true;
                const gL = parseInt(iL.value), gV = parseInt(iV.value);
                if (!tabla[p.local]) tabla[p.local] = { nombre: p.local, pts: 0, dg: 0, gf: 0, rank: rankingFIFA[p.local] || 200 };
                if (!tabla[p.visita]) tabla[p.visita] = { nombre: p.visita, pts: 0, dg: 0, gf: 0, rank: rankingFIFA[p.visita] || 200 };
                tabla[p.local].gf += gL; tabla[p.visita].gf += gV;
                tabla[p.local].dg += (gL - gV); tabla[p.visita].dg += (gV - gL);
                if (gL > gV) tabla[p.local].pts += 3; else if (gV > gL) tabla[p.visita].pts += 3; else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
            }
        });
        let rk = Object.values(tabla).sort((a,b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.rank - b.rank);
        datosGrupos[l] = rk;
        if (rk[0]) clasificados[`1${l}`] = rk[0].nombre;
        if (rk[1]) clasificados[`2${l}`] = rk[1].nombre;
    });

    if (!hayDatos) return;

    let terceros = [];
    grupos.forEach(l => { if (datosGrupos[l]?.[2]) terceros.push({ ...datosGrupos[l][2], grupo: l }); });
    terceros.sort((a,b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf || a.rank - b.rank);
    terceros.slice(0, 8).forEach((t, i) => clasificados[`3T${i+1}`] = t.nombre);

        actualizarFasesEliminatorias(clasificados);
}

function actualizarFasesEliminatorias(clasificados) {
    const mapeo = [
        { id: 73, L: "2A", V: "2B" }, { id: 74, L: "1C", V: "2F" }, { id: 75, L: "1E", V: "3T1" }, { id: 76, L: "1F", V: "2C" },
        { id: 77, L: "2E", V: "2I" }, { id: 78, L: "1I", V: "3T2" }, { id: 79, L: "1A", V: "3T3" }, { id: 80, L: "1L", V: "3T4" },
        { id: 81, L: "1G", V: "3T5" }, { id: 82, L: "1D", V: "3T6" }, { id: 83, L: "1H", V: "2J" }, { id: 84, L: "2K", V: "2L" },
        { id: 85, L: "1B", V: "3T7" }, { id: 86, L: "2D", V: "2G" }, { id: 87, L: "1J", V: "2H" }, { id: 88, L: "1K", V: "3T8" }
    ];
    mapeo.forEach(m => { 
        ponerNombreEnCard(m.id, 'L', clasificados[m.L] || m.L); 
        ponerNombreEnCard(m.id, 'V', clasificados[m.V] || m.V); 
    });

    const avance = [
        { de: 73, a: 89, pos: 'L', tipo: 'ganador' }, { de: 75, a: 89, pos: 'V', tipo: 'ganador' },
        { de: 74, a: 90, pos: 'L', tipo: 'ganador' }, { de: 77, a: 90, pos: 'V', tipo: 'ganador' },
        { de: 76, a: 91, pos: 'L', tipo: 'ganador' }, { de: 78, a: 91, pos: 'V', tipo: 'ganador' },
        { de: 79, a: 92, pos: 'L', tipo: 'ganador' }, { de: 80, a: 92, pos: 'V', tipo: 'ganador' },
        
        // CORRECCIÓN IDS 93 Y 94 (Ruta Admin)
        { de: 83, a: 93, pos: 'L', tipo: 'ganador' }, { de: 84, a: 93, pos: 'V', tipo: 'ganador' },
        { de: 81, a: 94, pos: 'L', tipo: 'ganador' }, { de: 82, a: 94, pos: 'V', tipo: 'ganador' },
        
        { de: 86, a: 95, pos: 'L', tipo: 'ganador' }, { de: 88, a: 95, pos: 'V', tipo: 'ganador' },
        { de: 85, a: 96, pos: 'L', tipo: 'ganador' }, { de: 87, a: 96, pos: 'V', tipo: 'ganador' },
        
        { de: 89, a: 97, pos: 'L', tipo: 'ganador' }, { de: 90, a: 97, pos: 'V', tipo: 'ganador' },
        { de: 93, a: 98, pos: 'L', tipo: 'ganador' }, { de: 94, a: 98, pos: 'V', tipo: 'ganador' },
        { de: 91, a: 99, pos: 'L', tipo: 'ganador' }, { de: 92, a: 99, pos: 'V', tipo: 'ganador' },
        { de: 95, a: 100, pos: 'L', tipo: 'ganador' }, { de: 96, a: 100, pos: 'V', tipo: 'ganador' },
        { de: 97, a: 101, pos: 'L', tipo: 'ganador' }, { de: 98, a: 101, pos: 'V', tipo: 'ganador' },
        { de: 99, a: 102, pos: 'L', tipo: 'ganador' }, { de: 100, a: 102, pos: 'V', tipo: 'ganador' },
        { de: 101, a: 104, pos: 'L', tipo: 'ganador' }, { de: 102, a: 104, pos: 'V', tipo: 'ganador' },
        
        // TERCER PUESTO (ARREGLADO PARA MOSTRAR PERDEDORES)
        { de: 101, a: 103, pos: 'L', tipo: 'perdedor' }, { de: 102, a: 103, pos: 'V', tipo: 'perdedor' }
    ];
    procesarAvanceFutbol(avance);
}

function procesarAvanceFutbol(llaves) {
    llaves.forEach(llave => {
        const iL = document.getElementById(`L-${llave.de}`);
        const iV = document.getElementById(`V-${llave.de}`);
        if (!iL || !iV || iL.value === "" || iV.value === "") return;
        const gL = parseInt(iL.value), gV = parseInt(iV.value);
        const card = iL.closest('.partido-card');
        const nL = card.querySelector('.local').innerText, nV = card.querySelector('.visita').innerText;
        let gdr = "---", pdr = "---";
        if (gL > gV) { gdr = nL; pdr = nV; } else if (gV > gL) { gdr = nV; pdr = nL; }
        else {
            const dL = parseInt(document.getElementById(`DL-${llave.de}`)?.value || 0);
            const dV = parseInt(document.getElementById(`DV-${llave.de}`)?.value || 0);
            if (dL > dV) { gdr = nL; pdr = nV; } else { gdr = nV; pdr = nL; }
        }
        ponerNombreEnCard(llave.a, llave.pos, (llave.tipo === 'ganador' ? gdr : pdr));
    });
}

function ponerNombreEnCard(id, lado, nombre) {
    const el = document.getElementById(`${lado === 'L' ? 'L' : 'V'}-${id}`);
    if (el) { el.closest('.partido-card').querySelector(lado === 'L' ? '.local' : '.visita').innerText = nombre; }
}

// 8. REPORTE MAESTRO (FORMATO A4 + IMPRESIÓN)
async function generarReporteMaestro() {
    try {
        const res = await fetch(`${API_URL}/obtener-todas-predicciones`);
        const datos = await res.json();
        
        if (!datos || datos.length === 0) return alert("No hay datos disponibles.");

        // Agrupamos por usuario
        const agrupado = datos.reduce((acc, r) => { 
            (acc[r.nombre_usuario] = acc[r.nombre_usuario] || []).push(r); 
            return acc; 
        }, {});

        let html = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
            <style>
                * { box-sizing: border-box; }
                @page { size: A4; margin: 0; }
                body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f0f0f0; }
                
                /* BOTÓN FIJO ARRIBA */
                .header-fijo { 
                    position: fixed; top: 0; left: 0; width: 100%; 
                    background: #333; padding: 10px; text-align: center; z-index: 1000; 
                }
                .header-fijo button { 
                    padding: 10px 20px; background: #28a745; color: white; 
                    border: none; border-radius: 5px; cursor: pointer; font-weight: bold; 
                }

                .hoja-a4 { 
                    background: white; width: 210mm; min-height: 297mm; 
                    margin: 60px auto 20px auto; padding: 10mm; 
                    box-sizing: border-box; page-break-after: always; 
                }
                
                .titulo-quiniela { 
                    text-align: center; font-size: 18px; font-weight: bold; 
                    margin-bottom: 10px; border-bottom: 2px solid #000; 
                }
                
                /* CONTENEDOR PARA LAS DOS COLUMNAS */
                .columnas-container { display: flex; justify-content: space-between; gap: 5mm; }
                
                table { border-collapse: collapse; width: 48%; table-layout: fixed; border: 1px solid #000; }
                th, td { 
                    border: 1px solid #000; text-align: center; 
                    font-size: 8px; height: 5.5mm; padding: 0; color: #000 !important;
                }
                th { background: #eee; font-weight: bold; }
                
                .col-id { width: 6mm; }
                .col-team { width: 26mm; text-align: left; padding-left: 2px; font-weight: bold; overflow: hidden; }
                .col-score { width: 7mm; background: #fafafa; }
                /* Columna de desempate en azul para que se vea el 0 */
                .col-des { width: 7mm; font-weight: bold; color: blue !important; background: #fffde7; }

                @media print {
                    .header-fijo { display: none; }
                    body { background: none; }
                    .hoja-a4 { margin: 0; border: none; }
                }
            </style>
        </head><body>
            <div class="header-fijo"><button onclick="window.print()">🖨️ IMPRIMIR TODO (A4)</button></div>`;

        for (const user in agrupado) {
            html += `<div class="hoja-a4">
                <div class="titulo-quiniela">Quiniela: ${user}</div>
                <div class="columnas-container">`;
            
            // Ordenamos por partido_id y dividimos en dos para las columnas
            const p = agrupado[user].sort((a, b) => a.partido_id - b.partido_id);
            const mitad = Math.ceil(p.length / 2);

            for (let i = 0; i < 2; i++) {
                html += `<table>
                    <thead>
                        <tr>
                            <th class="col-id">#</th>
                            <th class="col-team">Local</th>
                            <th class="col-score">L</th>
                            <th class="col-score">V</th>
                            <th class="col-team">Visita</th>
                            <th class="col-des">DL</th>
                            <th class="col-des">DV</th>
                        </tr>
                    </thead>
                    <tbody>`;
                
                const bloque = p.slice(i * mitad, (i + 1) * mitad);
                bloque.forEach(r => {
                    // Ahora que el servidor manda los datos, usamos ?? para que el 0 sea visible
                    const valDL = r.goles_desempate_local ?? "";
                    const valDV = r.goles_desempate_visita ?? "";
                    
                    html += `<tr>
                        <td>${r.partido_id}</td>
                        <td class="col-team">${r.nombre_local || '---'}</td>
                        <td>${r.goles_local}</td>
                        <td>${r.goles_visita}</td>
                        <td class="col-team">${r.nombre_visita || '---'}</td>
                        <td class="col-des">${valDL}</td>
                        <td class="col-des">${valDV}</td>
                    </tr>`;
                });
                html += `</tbody></table>`;
            }
            html += `</div></div>`;
        }
        
        html += `</body></html>`;
        const v = window.open('', '_blank');
        v.document.write(html);
        v.document.close();
        
    } catch(e) {
        alert("Error al generar reporte. Asegúrate de que el servidor esté activo.");
    }
}

function cerrarMiModal() {
    const modal = document.getElementById('modal-informativo');
    if (modal) {
        // Esta línea es la que "rompe" el bloqueo y permite que tu botón cierre la ventana
        modal.style.setProperty('display', 'none', 'important');
    }
}

// 9. INICIO
window.onload = async () => {
    await renderizarFixture();
    await actualizarListaLinks();
    actualizarTorneo();
    const urlParams = new URLSearchParams(window.location.search);
    const modal = document.getElementById('modal-informativo');
    if (modal) modal.style.display = urlParams.has('nomodal') ? 'none' : 'block';
};
