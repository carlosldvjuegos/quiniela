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
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);
        const [resNombres, resOficiales, resTodasPred] = await Promise.all([
            fetch(`${API_URL}/registros`, { signal: controller.signal }),
            fetch(`${API_URL}/obtener-resultados-db`, { signal: controller.signal }),
            fetch(`${API_URL}/obtener-todas-predicciones`, { signal: controller.signal })
        ]);
        clearTimeout(timeoutId);
        const usuarios = await resNombres.json();
        const oficiales = await resOficiales.json();
        const todasPred = await resTodasPred.json();
        const predPorUser = todasPred.reduce((acc, p) => {
            if (!acc[p.nombre_usuario]) acc[p.nombre_usuario] = [];
            acc[p.nombre_usuario].push(p);
            return acc;
        }, {});
        let ranking = usuarios.map(user => {
            let pts = 0;
            const susPreds = predPorUser[user.nombre_usuario] || [];
            susPreds.forEach(pred => {
                const ofi = oficiales.find(o => o.id === pred.partido_id);
                if (ofi) pts += calcularLogicaPuntos(pred.goles_local, pred.goles_visita, ofi.gl, ofi.gv);
            });
            return { nombre: user.nombre_usuario, puntos: pts };
        });
        ranking.sort((a, b) => b.puntos - a.puntos);
        container.innerHTML = "";
        ranking.forEach((u, i) => {
            const med = i === 0 ? "🥇" : (i === 1 ? "🥈" : (i === 2 ? "🥉" : "•"));
            const btn = document.createElement('button');
            btn.className = "btn-link";
            btn.setAttribute('data-nombre-real', u.nombre.toLowerCase().trim());
            btn.innerHTML = `<div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                <span>${med} <b>${u.nombre}</b></span>
                <span class="badge-puntos">${u.puntos} pts</span>
            </div>`;
            btn.onclick = () => cargarDesdeDB(u.nombre);
            container.appendChild(btn);
        });
    } catch (e) { container.innerHTML = "<p style='color:red;'>Error al cargar ranking.</p>"; }
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
            predicciones.push({ id: p.id, gl: parseInt(gl), gv: parseInt(gv), dl: dl ? parseInt(dl) : null, dv: dv ? parseInt(dv) : null });
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

// 6. CARGAR DESDE DB (OCULTA BOTÓN GUARDAR)
async function cargarDesdeDB(nombre) {
    try {
        const inputN = document.getElementById('nombre-usuario');
        if (inputN) { inputN.value = nombre; inputN.readOnly = true; }
        
        // OCULTAR BOTÓN GUARDAR AL VER UNA QUINIELA EXISTENTE
        const btnSave = document.querySelector(".btn-save");
        if (btnSave) btnSave.style.display = "none";

        document.querySelectorAll('.marcador-col input').forEach(i => { i.value = ""; i.disabled = false; });
        document.querySelectorAll('.puntos-obtenidos').forEach(d => d.remove());

        const [resOficiales, resUser] = await Promise.all([
            fetch(`${API_URL}/obtener-resultados-db`).then(r => r.json()),
            fetch(`${API_URL}/cargar/${nombre}`).then(r => r.json())
        ]);

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
        setTimeout(() => {
            resUser.forEach(p => {
                const iL = document.getElementById(`L-${p.id}`);
                const ofi = resOficiales.find(o => o.id === p.id);
                if (ofi && iL) {
                    const pts = calcularLogicaPuntos(p.gl, p.gv, ofi.gl, ofi.gv);
                    const div = document.createElement('div');
                    div.className = 'puntos-obtenidos';
                    div.style = "color: #003366; font-weight: bold; font-size: 13px; margin-top: 5px; text-align: center;";
                    div.innerHTML = `Puntos: <span style="color:red;">${pts}</span>`;
                    iL.closest('.marcador-col').appendChild(div);
                }
            });
            document.querySelectorAll('.marcador-col input').forEach(i => i.disabled = true);
        }, 1200);

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
            br.id = 'btn-volver-lista'; br.innerText = "✕ Cambiar Usuario";
            br.className = "btn-link"; br.style.backgroundColor = "#ff4444"; br.style.color = "white";
            br.onclick = () => window.location.href = window.location.origin + window.location.pathname + "?nomodal=1";
            document.getElementById('links-container').appendChild(br);
        }
    } catch(e) { console.error(e); }
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
        if (!datos.length) return alert("No hay datos para generar el reporte.");
        
        const agrupado = datos.reduce((acc, r) => { 
            (acc[r.nombre_usuario] = acc[r.nombre_usuario] || []).push(r); 
            return acc; 
        }, {});

        let html = `<html><head><title>Reporte Maestro</title><style>
            @page { size: A4; margin: 0; }
            body { font-family: 'Segoe UI', Arial, sans-serif; background-color: #f0f0f0; margin: 0; padding: 0; }
            .report-container { 
                background: white; width: 210mm; height: 297mm; margin: 0 auto;
                padding: 10mm; box-sizing: border-box; page-break-after: always;
                display: flex; flex-direction: column;
            }
            h2 { border-bottom: 2px solid #01215b; text-align: center; color: #01215b; margin: 0 0 8px 0; font-size: 16px; text-transform: uppercase; }
            .grid-wrapper { display: flex; justify-content: center; gap: 8mm; flex-grow: 1; }
            table { border-collapse: collapse; table-layout: fixed; width: 92mm; }
            th, td { 
                border: 0.5px solid #333; padding: 1px 2px; text-align: center; 
                font-size: 7.5px; height: 4.5mm; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; 
            }
            th { background: #01215b; color: white; font-weight: bold; }
            .col-id { width: 6mm; }
            .col-equipo { width: 28mm; text-align: left; font-weight: bold; }
            .col-gol { width: 7mm; background-color: #f5f5f5; }
            .col-pals { width: 10mm; font-size: 6.5px; color: #555; }
            .no-print { text-align: center; padding: 15px; background: #333; }
            button { padding: 10px 25px; cursor: pointer; font-weight: bold; background: #28a745; color: white; border: none; border-radius: 5px; }
            @media print { body { background: none; } .no-print { display: none; } .report-container { margin: 0; border: none; } }
        </style></head><body>
        <div class="no-print"><button onclick="window.print()">🖨️ IMPRIMIR REPORTE A4</button></div>`;

        for (const user in agrupado) {
            html += `<div class="report-container"><h2>Quiniela: ${user}</h2><div class="grid-wrapper">`;
            const preds = agrupado[user];
            preds.sort((a, b) => a.partido_id - b.partido_id);
            
            // --- NUEVA LÓGICA DE TRADUCCIÓN ---
            // Si r.nombre_local no existe, intentamos usar lo que esté en r.equipo_local o similar
            // Para asegurar que no salgan códigos como "1A"
            const obtenerNombreReal = (partidoId, labelTecnico, esLocal, predActual) => {
                // 1. Si la predicción ya trae un nombre de equipo real, lo usamos
                if (esLocal && predActual.nombre_local) return predActual.nombre_local;
                if (!esLocal && predActual.nombre_visita) return predActual.nombre_visita;
                
                // 2. Si es fase de grupos (ID 1 al 72), el nombre suele estar en partidosData
                const pBase = partidosData.find(item => item.id === partidoId);
                if (partidoId <= 72 && pBase) {
                    return esLocal ? pBase.local : pBase.visita;
                }
                
                // 3. Si sigue saliendo el código (como 1A o G73), devolvemos el código original 
                // para no dejar la celda vacía, pero esto indica que la DB no guardó los nombres.
                return labelTecnico;
            };

            const mitad = Math.ceil(preds.length / 2);
            for (let i = 0; i < 2; i++) {
                html += `<table><thead><tr>
                    <th class="col-id">#</th><th class="col-equipo">Local</th><th class="col-gol">L</th>
                    <th class="col-gol">V</th><th class="col-equipo">Visita</th><th class="col-pals">Pals</th>
                </tr></thead><tbody>`;
                
                preds.slice(i * mitad, (i + 1) * mitad).forEach(r => {
                    const p = partidosData.find(item => item.id === r.partido_id) || { local: '---', visita: '---' };
                    
                    // Aplicamos la mejora aquí:
                    const localAMostrar = obtenerNombreReal(r.partido_id, p.local, true, r);
                    const visitaAMostrar = obtenerNombreReal(r.partido_id, p.visita, false, r);

                    const des = (r.goles_desempate_local !== null) ? `${r.goles_desempate_local}-${r.goles_desempate_visita}` : "-";
                    html += `<tr>
                        <td>${r.partido_id}</td>
                        <td class="col-equipo">${localAMostrar}</td>
                        <td class="col-gol">${r.goles_local}</td>
                        <td class="col-gol">${r.goles_visita}</td>
                        <td class="col-equipo">${visitaAMostrar}</td>
                        <td class="col-pals">${des}</td>
                    </tr>`;
                });
                html += `</tbody></table>`;
            }
            html += `</div></div>`;
        }
        html += `</body></html>`;
        const v = window.open('', '_blank'); v.document.write(html); v.document.close();
    } catch(e) { console.error(e); alert("Error al generar el reporte."); }
}

function cerrarMiModal() {
    const modal = document.getElementById('modal-informativo');
    if (modal) modal.style.display = 'none';
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
