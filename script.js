// 0. CONFIGURACIÓN DE URL
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? window.location.origin
    : "https://quiniela-pcas.onrender.com";

// 1. LISTA DE PARTIDOS (Mundial 2026) - CORREGIDA
const partidosData = [
    // GRUPO A
    { id: 1, fase: "Grupos", grupo: "A", fecha: "Jueves 11/06/2026", local: "México", visita: "Sudáfrica" },
    { id: 2, fase: "Grupos", grupo: "A", fecha: "Viernes 12/06/2026", local: "Rep. Corea", visita: "Rep. Checa" },
    { id: 3, fase: "Grupos", grupo: "A", fecha: "Jueves 18/06/2026", local: "Rep. Checa", visita: "Sudáfrica" },
    { id: 4, fase: "Grupos", grupo: "A", fecha: "Viernes 19/06/2026", local: "México", visita: "Rep. Corea" },
    { id: 5, fase: "Grupos", grupo: "A", fecha: "Jueves 25/06/2026", local: "Rep. Checa", visita: "México" },
    { id: 6, fase: "Grupos", grupo: "A", fecha: "Jueves 25/06/2026", local: "Sudáfrica", visita: "Rep. Corea" },

    // --- GRUPO B ---
    { id: 7, fase: "Grupos", grupo: "B", fecha: "Viernes 12/06/2026", local: "Canadá", visita: "Bosnia y Herzegovina" },
    { id: 8, fase: "Grupos", grupo: "B", fecha: "Sábado 13/06/2026", local: "Catar", visita: "Suiza" },
    { id: 9, fase: "Grupos", grupo: "B", fecha: "Jueves 18/06/2026", local: "Suiza", visita: "Bosnia y Herzegovina" },
    { id: 10, fase: "Grupos", grupo: "B", fecha: "Viernes 19/06/2026", local: "Canadá", visita: "Catar" },
    { id: 11, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Suiza", visita: "Canadá" },
    { id: 12, fase: "Grupos", grupo: "B", fecha: "Miércoles 24/06/2026", local: "Bosnia y Herzegovina", visita: "Catar" },

    // --- GRUPO C ---
    { id: 13, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Brasil", visita: "Marruecos" },
    { id: 14, fase: "Grupos", grupo: "C", fecha: "Domingo 14/06/2026", local: "Haití", visita: "Escocia" },
    { id: 15, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Escocia", visita: "Marruecos" },
    { id: 16, fase: "Grupos", grupo: "C", fecha: "Sábado 20/06/2026", local: "Brasil", visita: "Haití" },
    { id: 17, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Escocia", visita: "Brasil" },
    { id: 18, fase: "Grupos", grupo: "C", fecha: "Jueves 25/06/2026", local: "Marruecos", visita: "Haití" },

    // --- GRUPO D ---
    { id: 19, fase: "Grupos", grupo: "D", fecha: "Sábado 13/06/2026", local: "EE. UU.", visita: "Paraguay" },
    { id: 20, fase: "Grupos", grupo: "D", fecha: "Domingo 14/06/2026", local: "Australia", visita: "Turquia" },
    { id: 21, fase: "Grupos", grupo: "D", fecha: "Sábado 20/06/2026", local: "Turquia", visita: "Paraguay" },
    { id: 22, fase: "Grupos", grupo: "D", fecha: "Viernes 19/06/2026", local: "EE. UU.", visita: "Australia" },
    { id: 23, fase: "Grupos", grupo: "D", fecha: "Viernes 26/06/2026", local: "Turquia", visita: "EE. UU." },
    { id: 24, fase: "Grupos", grupo: "D", fecha: "Viernes 26/06/2026", local: "Paraguay", visita: "Australia" },

    // --- GRUPO E ---
    { id: 25, fase: "Grupos", grupo: "E", fecha: "Domingo 14/06/2026", local: "Alemania", visita: "Curazao" },
    { id: 26, fase: "Grupos", grupo: "E", fecha: "Lunes 15/06/2026", local: "Costa de Marfil", visita: "Ecuador" },
    { id: 27, fase: "Grupos", grupo: "E", fecha: "Sábado 20/06/2026", local: "Alemania", visita: "Costa de Marfil" },
    { id: 28, fase: "Grupos", grupo: "E", fecha: "Domingo 21/06/2026", local: "Ecuador", visita: "Curazao" },
    { id: 29, fase: "Grupos", grupo: "E", fecha: "Jueves 25/06/2026", local: "Curazao", visita: "Costa de Marfil" },
    { id: 30, fase: "Grupos", grupo: "E", fecha: "Jueves 25/06/2026", local: "Ecuador", visita: "Alemania" },

    // --- GRUPO F ---
    { id: 31, fase: "Grupos", grupo: "F", fecha: "Domingo 14/06/2026", local: "Países Bajos", visita: "Japón" },
    { id: 32, fase: "Grupos", grupo: "F", fecha: "Lunes 15/06/2026", local: "Suecia", visita: "Túnez" },
    { id: 33, fase: "Grupos", grupo: "F", fecha: "Sábado 20/06/2026", local: "Países Bajos", visita: "Suecia" },
    { id: 34, fase: "Grupos", grupo: "F", fecha: "Domingo 21/06/2026", local: "Túnez", visita: "Japón" },
    { id: 35, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Japón", visita: "Suecia" },
    { id: 36, fase: "Grupos", grupo: "F", fecha: "Viernes 26/06/2026", local: "Túnez", visita: "Países Bajos" },

    // --- GRUPO G ---
    { id: 37, fase: "Grupos", grupo: "G", fecha: "Lunes 15/06/2026", local: "Bélgica", visita: "Egipto" },
    { id: 38, fase: "Grupos", grupo: "G", fecha: "Martes 16/06/2026", local: "RI de Irán", visita: "Nueva Zelanda" },
    { id: 39, fase: "Grupos", grupo: "G", fecha: "Domingo 21/06/2026", local: "Bélgica", visita: "RI de Irán" },
    { id: 40, fase: "Grupos", grupo: "G", fecha: "Lunes 22/06/2026", local: "Nueva Zelanda", visita: "Egipto" },
    { id: 41, fase: "Grupos", grupo: "G", fecha: "Sábado 27/06/2026", local: "Egipto", visita: "RI de Irán" },
    { id: 42, fase: "Grupos", grupo: "G", fecha: "Sábado 27/06/2026", local: "Nueva Zelanda", visita: "Bélgica" },

    // --- GRUPO H ---
    { id: 43, fase: "Grupos", grupo: "H", fecha: "Lunes 15/06/2026", local: "España", visita: "Islas de Cabo Verde" },
    { id: 44, fase: "Grupos", grupo: "H", fecha: "Martes 16/06/2026", local: "Arabia Saudita", visita: "Uruguay" },
    { id: 45, fase: "Grupos", grupo: "H", fecha: "Domingo 21/06/2026", local: "España", visita: "Arabia Saudita" },
    { id: 46, fase: "Grupos", grupo: "H", fecha: "Lunes 22/06/2026", local: "Uruguay", visita: "Islas de Cabo Verde" },
    { id: 47, fase: "Grupos", grupo: "H", fecha: "Sábado 27/06/2026", local: "Islas de Cabo Verde", visita: "Arabia Saudita" },
    { id: 48, fase: "Grupos", grupo: "H", fecha: "Sábado 27/06/2026", local: "Uruguay", visita: "España" },

    // --- GRUPO I ---
    { id: 49, fase: "Grupos", grupo: "I", fecha: "Martes 16/06/2026", local: "Francia", visita: "Senegal" },
    { id: 50, fase: "Grupos", grupo: "I", fecha: "Miércoles 17/06/2026", local: "Irak", visita: "Noruega" },
    { id: 51, fase: "Grupos", grupo: "I", fecha: "Lunes 22/06/2026", local: "Francia", visita: "Irak" },
    { id: 52, fase: "Grupos", grupo: "I", fecha: "Martes 23/06/2026", local: "Noruega", visita: "Senegal" },
    { id: 53, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Noruega", visita: "Francia" },
    { id: 54, fase: "Grupos", grupo: "I", fecha: "Viernes 26/06/2026", local: "Senegal", visita: "Irak" },

    // --- GRUPO J ---
    { id: 55, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Argentina", visita: "Argelia" },
    { id: 56, fase: "Grupos", grupo: "J", fecha: "Miércoles 17/06/2026", local: "Austria", visita: "Jordania" },
    { id: 57, fase: "Grupos", grupo: "J", fecha: "Lunes 22/06/2026", local: "Argentina", visita: "Austria" },
    { id: 58, fase: "Grupos", grupo: "J", fecha: "Martes 23/06/2026", local: "Jordania", visita: "Argelia" },
    { id: 59, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Argelia", visita: "Austria" },
    { id: 60, fase: "Grupos", grupo: "J", fecha: "Domingo 28/06/2026", local: "Jordania", visita: "Argentina" },

    // --- GRUPO K ---
    { id: 61, fase: "Grupos", grupo: "K", fecha: "Miércoles 17/06/2026", local: "Portugal", visita: "Congo" },
    { id: 62, fase: "Grupos", grupo: "K", fecha: "Jueves 18/06/2026", local: "Uzbekistán", visita: "Colombia" },
    { id: 63, fase: "Grupos", grupo: "K", fecha: "Martes 23/06/2026", local: "Portugal", visita: "Uzbekistán" },
    { id: 64, fase: "Grupos", grupo: "K", fecha: "Miércoles 24/06/2026", local: "Colombia", visita: "Congo" },
    { id: 65, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Colombia", visita: "Portugal" },
    { id: 66, fase: "Grupos", grupo: "K", fecha: "Domingo 28/06/2026", local: "Congo", visita: "Uzbekistán" },

    // --- GRUPO L ---
    { id: 67, fase: "Grupos", grupo: "L", fecha: "Miércoles 17/06/2026", local: "Inglaterra", visita: "Croacia" },
    { id: 68, fase: "Grupos", grupo: "L", fecha: "Jueves 18/06/2026", local: "Ghana", visita: "Panamá" },
    { id: 69, fase: "Grupos", grupo: "L", fecha: "Martes 23/06/2026", local: "Inglaterra", visita: "Ghana" },
    { id: 70, fase: "Grupos", grupo: "L", fecha: "Miércoles 24/06/2026", local: "Panamá", visita: "Croacia" },
    { id: 71, fase: "Grupos", grupo: "L", fecha: "Sábado 27/06/2026", local: "Panamá", visita: "Inglaterra" },
    { id: 72, fase: "Grupos", grupo: "L", fecha: "Sábado 27/06/2026", local: "Croacia", visita: "Ghana" },

    // --- DIECISEISAVOS (Limpios de nombres fijos) ---
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

    // --- OCTAVOS ---
    { id: 89, fase: "8vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "G73", visita: "G75" },
    { id: 90, fase: "8vos", grupo: "Eliminatoria", fecha: "Sábado 04/07/2026", local: "G74", visita: "G77" },
    { id: 91, fase: "8vos", grupo: "Eliminatoria", fecha: "Domingo 05/07/2026", local: "G76", visita: "G78" },
    { id: 92, fase: "8vos", grupo: "Eliminatoria", fecha: "Lunes 06/07/2026", local: "G79", visita: "G80" },
    { id: 93, fase: "8vos", grupo: "Eliminatoria", fecha: "Lunes 06/07/2026", local: "G83", visita: "G84" },
    { id: 94, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "G81", visita: "G82" },
    { id: 95, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "G86", visita: "G88" },
    { id: 96, fase: "8vos", grupo: "Eliminatoria", fecha: "Martes 07/07/2026", local: "G85", visita: "G87" },

    // --- CUARTOS ---
    { id: 97, fase: "4tos", grupo: "Eliminatoria", fecha: "Jueves 09/07/2026", local: "G89", visita: "G90" },
    { id: 98, fase: "4tos", grupo: "Eliminatoria", fecha: "Viernes 10/07/2026", local: "G93", visita: "G94" },
    { id: 99, fase: "4tos", grupo: "Eliminatoria", fecha: "Sábado 11/07/2026", local: "G91", visita: "G92" },
    { id: 100, fase: "4tos", grupo: "Eliminatoria", fecha: "Domingo 12/07/2026", local: "G95", visita: "G96" },

    // --- SEMIS ---
    { id: 101, fase: "Semis", grupo: "Eliminatoria", fecha: "Martes 14/07/2026", local: "G97", visita: "G98" },
    { id: 102, fase: "Semis", grupo: "Eliminatoria", fecha: "Miércoles 15/07/2026", local: "G99", visita: "G100" },

    // --- FINALES ---
    { id: 103, fase: "3er Puesto", grupo: "Eliminatoria", fecha: "Sábado 18/07/2026", local: "P101", visita: "P102" },
    { id: 104, fase: "Final", grupo: "Eliminatoria", fecha: "Domingo 19/07/2026", local: "G101", visita: "G102" }
];



// Lógica para cerrar el modal informativo
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal-informativo');
    const btnCerrar = document.getElementById('btn-cerrar-modal');

    if (btnCerrar) {
        btnCerrar.onclick = () => {
            modal.style.display = 'none';
        };
    }

    // Opcional: Cerrar si hacen clic fuera del cuadro blanco
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
});



// 2. LÓGICA DE PUNTOS
function calcularLogicaPuntos(pL, pV, rL, rV) {
    // 1. Marcador Exacto (5 Puntos)
    if (pL === rL && pV === rV) {
        return 5;
    }

    // 2. Lógica para Empates Reales
    if (rL === rV) {
        if (pL === pV) return 2; // Acertó empate pero no marcador
        // Si no puso empate, verificamos si al menos acertó la cantidad de goles (ej. 1-1 vs 2-1)
        if (pL === rL || pV === rV) return 1; 
        return 0;
    }

    // Determinamos tendencia
    const tendenciaPredicha = Math.sign(pL - pV);
    const tendenciaReal = Math.sign(rL - rV);

    // 3. Lógica si ACERTÓ la tendencia (Ganador/Perdedor)
    if (tendenciaPredicha === tendenciaReal) {
        if (pL === rL || pV === rV) {
            return 3; // Tendencia + Goles de uno
        }
        return 2; // Solo tendencia
    }

    // 4. Lógica si NO ACERTÓ la tendencia
    // Solo damos 1 punto si al menos acertó los goles de uno (ej. 1-1 vs 2-1 del ejemplo)
    if (pL === rL || pV === rV) {
        return 1;
    }

    // 5. No acertó nada
    return 0;
}

// 3. RENDERIZAR LA TABLA (MEJORADA CON DESEMPATE)
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
        
        // Determinar si es fase de eliminación para el desempate
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
            </div>
        `; 
        fixtureCont.appendChild(card);
    });
}

// FUNCIÓN NUEVA: Muestra/Oculta el marcador de desempate si hay empate
function gestionarDesempate(id) {
    const gl = document.getElementById(`L-${id}`).value;
    const gv = document.getElementById(`V-${id}`).value;
    const panelExtra = document.getElementById(`extra-${id}`);
    
    if (panelExtra) {
        if (gl !== "" && gv !== "" && parseInt(gl) === parseInt(gv)) {
            panelExtra.style.display = "block";
        } else {
            panelExtra.style.display = "none";
            // Limpiar valores si se oculta
            document.getElementById(`DL-${id}`).value = "";
            document.getElementById(`DV-${id}`).value = "";
        }
    }
}

// 4. RANKING (OPTIMIZADO PARA EVITAR ERROR 502)
async function actualizarListaLinks() {
    const container = document.getElementById('links-container');
    if (!container) return;

    try {
        // Añadimos un timeout para que la petición no se quede colgada eternamente
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos máximo

        const [resNombres, resOficiales, resTodasPred] = await Promise.all([
            fetch(`${API_URL}/registros`, { signal: controller.signal }),
            fetch(`${API_URL}/obtener-resultados-db`, { signal: controller.signal }),
            fetch(`${API_URL}/obtener-todas-predicciones`, { signal: controller.signal })
        ]);

        clearTimeout(timeoutId);

        const usuarios = await resNombres.json();
        const oficiales = await resOficiales.json();
        const todasLasPredicciones = await resTodasPred.json();

        // Agrupamos predicciones por usuario de forma eficiente
        const predPorUsuario = todasLasPredicciones.reduce((acc, p) => {
            if (!acc[p.nombre_usuario]) acc[p.nombre_usuario] = [];
            acc[p.nombre_usuario].push(p);
            return acc;
        }, {});

        let listaRanking = usuarios.map(user => {
            let ptsTotales = 0;
            const susPredicciones = predPorUsuario[user.nombre_usuario] || [];
            susPredicciones.forEach(pred => {
                const oficial = oficiales.find(o => o.id === pred.partido_id);
                if (oficial) {
                    ptsTotales += calcularLogicaPuntos(
                        parseInt(pred.goles_local), 
                        parseInt(pred.goles_visita), 
                        parseInt(oficial.gl), 
                        parseInt(oficial.gv)
                    );
                }
            });
            return { nombre: user.nombre_usuario, puntos: ptsTotales };
        });

        listaRanking.sort((a, b) => b.puntos - a.puntos);

        container.innerHTML = ""; // Limpiamos el "Cargando ranking..."
        
        if (listaRanking.length === 0) {
            container.innerHTML = "<p style='color:gray; font-size:12px; padding:10px;'>No hay quinielas registradas.</p>";
            return;
        }

        listaRanking.forEach((u, index) => {
            const medallita = index === 0 ? "🥇" : (index === 1 ? "🥈" : (index === 2 ? "🥉" : "•"));
            const btn = document.createElement('button');
            btn.className = "btn-link";
            btn.setAttribute('data-nombre-real', u.nombre.toLowerCase().trim());
            btn.innerHTML = `
                <div style="display:flex; justify-content:space-between; width:100%; align-items:center;">
                    <span>${medallita} <b>${u.nombre}</b></span>
                    <span class="badge-puntos">${u.puntos} pts</span>
                </div>
            `;
            btn.onclick = () => cargarDesdeDB(u.nombre);
            container.appendChild(btn);
        });

    } catch (err) {
        console.error("Error en ranking:", err);
        container.innerHTML = "<p style='color:red; font-size:11px; padding:10px;'>Error al conectar con el servidor. Reintenta en unos instantes.</p>";
    }
}


// 5. CALCULAR PUNTOS MANUAL (Sin cambios)
async function calcularPuntos() {
    try {
        const response = await fetch(`${API_URL}/obtener-resultados-db`);
        const oficiales = await response.json();
        let sumaPuntos = 0;
        partidosData.forEach(p => {
            const gl = document.getElementById(`L-${p.id}`).value;
            const gv = document.getElementById(`V-${p.id}`).value;
            const oficial = oficiales.find(r => r.id === p.id);
            if (gl !== "" && gv !== "" && oficial) {
                sumaPuntos += calcularLogicaPuntos(parseInt(gl), parseInt(gv), oficial.gl, oficial.gv);
            }
        });
        alert(`Tu puntaje actual es de: ${sumaPuntos} puntos.`);
        actualizarListaLinks();
    } catch (e) { alert("Error al obtener resultados oficiales."); }
}



// 6. GUARDAR (CORREGIDO CON CONFIRMACIÓN Y FILTROS)
async function guardarQuinielaCompleta() {
    const inputNombre = document.getElementById('nombre-usuario');
    const nombre = inputNombre.value.trim();
    const btnGuardar = document.querySelector('.btn-save');

    // 1. CONDICIÓN: Nombre obligatorio
    if (!nombre) {
        alert("¡Atención! Debes escribir un nombre para tu quiniela.");
        inputNombre.focus();
        return;
    }

    // 2. RECOPILAR PREDICCIONES Y VALIDAR QUE HAYA AL MENOS UNA
    const predicciones = [];
    partidosData.forEach(p => {
        const gl = document.getElementById(`L-${p.id}`).value;
        const gv = document.getElementById(`V-${p.id}`).value;
        const dl = document.getElementById(`DL-${p.id}`)?.value || null;
        const dv = document.getElementById(`DV-${p.id}`)?.value || null;

        if (gl !== "" && gv !== "") {
            
            // --- INICIO VALIDACIÓN DESEMPATE (SOLO ELIMINATORIAS) ---
            if (p.fase !== "Grupos" && parseInt(gl) === parseInt(gv)) {
                const inputDL = document.getElementById(`DL-${p.id}`);
                const inputDV = document.getElementById(`DV-${p.id}`);
                
                // Obtenemos los nombres reales de los equipos desde el DOM (lo que ve el usuario)
                const nombreRealLocal = document.querySelector(`#L-${p.id}`).closest('.card-body').querySelector('.equipo-col.local').innerText.trim();
                const nombreRealVisita = document.querySelector(`#V-${p.id}`).closest('.card-body').querySelector('.equipo-col.visita').innerText.trim();

                // Validar que no estén vacíos
                if (dl === null || dv === null || dl === "" || dv === "") {
                    alert(`El partido ${nombreRealLocal} vs ${nombreRealVisita} terminó en empate. Debes indicar quién clasifica en los campos de desempate.`);
                    inputDL.focus();
                    throw new Error("Validación fallida: campos de desempate vacíos");
                }
                
                // Validar que no haya empate en el desempate
                if (parseInt(dl) === parseInt(dv)) {
                    // AQUÍ ESTÁ LA LÍNEA CORREGIDA
                    alert(`En el desempate de ${nombreRealLocal} vs ${nombreRealVisita}, los marcadores no pueden ser iguales. Alguien debe ganar para clasificar.`);
                    inputDL.focus();
                    throw new Error("Validación fallida: empate en campos de desempate");
                }
            }
            // --- FIN VALIDACIÓN DESEMPATE ---

            predicciones.push({ 
                id: p.id, 
                gl: parseInt(gl), 
                gv: parseInt(gv),
                dl: dl !== "" && dl !== null ? parseInt(dl) : null,
                dv: dv !== "" && dv !== null ? parseInt(dv) : null
            });
        }
    });

    if (predicciones.length === 0) {
        alert("La quiniela está vacía. Debes anotar al menos un resultado antes de guardar.");
        return;
    }

    try {
        const resCheck = await fetch(`${API_URL}/registros`);
        const usuariosExistentes = await resCheck.json();
        const existe = usuariosExistentes.some(u => u.nombre_usuario.toLowerCase() === nombre.toLowerCase());

        if (existe) {
            alert(`Ya existe una quiniela con el nombre "${nombre}". Por favor, elija otro nombre.`);
            inputNombre.focus();
            inputNombre.select();
            return;
        }

        const inputsGoles = Array.from(document.querySelectorAll('.marcador-col input')).filter(input => {
            return input.offsetParent !== null;
        });
        
        let primerVacio = null;
        for (let input of inputsGoles) {
            if (input.value.trim() === "") {
                primerVacio = input; 
                break; 
            }
        }
        
        if (primerVacio) {
            alert("Todavía hay campos vacíos en la quiniela. Por favor, completa todos los resultados visibles.");
            primerVacio.focus();
            primerVacio.style.borderColor = "red";
            return;
        }

        const mensajeConfirmacion = "¿Estás seguro que los datos están correctos? Una vez los datos se han guardado, no se pueden modificar.";
        if (!confirm(mensajeConfirmacion)) {
            return;
        }
        
        if (btnGuardar) {
            btnGuardar.style.display = 'none';
        }

        // Bloqueo de campos tras guardar
        inputNombre.readOnly = true;
        document.querySelectorAll('.marcador-col input').forEach(input => {
            input.disabled = true;
       //     input.style.cursor = "not-allowed";
        });

       // Guardamos 
        const res = await fetch(`${API_URL}/guardar`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre, predicciones })
        });
        
        const data = await res.json();
        alert("¡Quiniela guardada con éxito!");

        if (typeof actualizarListaLinks === 'function') {
            actualizarListaLinks();
        }

    } catch (e) { 
        if (e.message.includes("Validación fallida")) return;
        console.error(e);
        alert("Hubo un error al guardar. Revisa tu conexión."); 
    }
}


// 7. CARGAR DESDE DB (VERSION FINAL CON FILTRO DE EQUIPOS)
async function cargarDesdeDB(nombre) {
    try {
        const inputNombrePrincipal = document.getElementById('nombre-usuario');
        if (inputNombrePrincipal) {
            inputNombrePrincipal.value = nombre;
            inputNombrePrincipal.readOnly = true;
        }
        
        document.querySelectorAll('.marcador-col input').forEach(input => {
            input.value = "";
            input.disabled = false; 
        });
        document.querySelectorAll('.puntos-obtenidos').forEach(div => div.remove());

        const [resOficiales, resUsuario] = await Promise.all([
            fetch(`${API_URL}/obtener-resultados-db`).then(r => r.json()),
            fetch(`${API_URL}/cargar/${nombre}`).then(r => r.json())
        ]).catch(err => {
            console.error("Fallo en la conexión con el servidor", err);
            return [[], []];
        });

        if (resUsuario.length === 0) return;

        resUsuario.forEach(partido => {
            const inL = document.getElementById(`L-${partido.id}`);
            const inV = document.getElementById(`V-${partido.id}`);
            const inDL = document.getElementById(`DL-${partido.id}`);
            const inDV = document.getElementById(`DV-${partido.id}`);

            if (inL) inL.value = partido.gl;
            if (inV) inV.value = partido.gv;
            if (inDL && partido.dl !== null) inDL.value = partido.dl;
            if (inDV && partido.dv !== null) inDV.value = partido.dv;
            
            gestionarDesempate(partido.id);
        });

        document.querySelectorAll('.marcador-col input').forEach(input => {
            input.disabled = true;
        });

        // 1. Ejecutamos la lógica de torneo primero
        actualizarTorneo();

        // 2. ESPERAMOS UN MOMENTO para que el HTML se actualice con los nombres de los equipos
        setTimeout(() => {
            const limpiarTotal = (txt) => {
                if (!txt) return "";
                // MEJORA: Eliminación de acentos, espacios y caracteres especiales para comparación exacta
                return txt.toString().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
            };

            resUsuario.forEach(partido => {
                const inL = document.getElementById(`L-${partido.id}`);
                const oficial = resOficiales.find(o => o.id === partido.id);

                if (oficial && inL && partido.gl !== null && partido.gv !== null) {
                    const cardBody = inL.closest('.card-body');
                    
                    // Ahora que esperamos, estos nombres ya no estarán vacíos
                    const nombreLocalUsuario = limpiarTotal(cardBody.querySelector('.equipo-col.local').innerText);
                    const nombreVisitaUsuario = limpiarTotal(cardBody.querySelector('.equipo-col.visita').innerText);
                    const nombreLocalOficial = limpiarTotal(oficial.local);
                    const nombreVisitaOficial = limpiarTotal(oficial.visita);
                    
                    const infoPartido = partidosData.find(p => p.id === partido.id);
                    const esFaseGrupos = infoPartido && infoPartido.fase === "Grupos";

                    const equiposCoinciden = esFaseGrupos || 
                        (nombreLocalOficial === nombreLocalUsuario && nombreVisitaOficial === nombreVisitaUsuario);

                    let ptsGanados = 0;
                    if (equiposCoinciden) {
                        ptsGanados = calcularLogicaPuntos(
                            parseInt(partido.gl), 
                            parseInt(partido.gv), 
                            parseInt(oficial.gl), 
                            parseInt(oficial.gv)
                        );
                    }

                    const marcadorCol = inL.closest('.marcador-col');
                    if (marcadorCol) {
                        const divPuntos = document.createElement('div');
                        divPuntos.className = 'puntos-obtenidos';
                        divPuntos.style = "color: #003366; font-weight: bold; font-size: 13px; margin-top: 5px; text-align: center; width: 100%; line-height: 1.2;";
                        
                        if (!equiposCoinciden) {
                            divPuntos.innerHTML = `<span style="color: #888; font-size: 10px; font-weight: normal;">Equipos no coinciden</span><br>Puntos: <span style="color: #ff0000;">0</span>`;
                        } else {
                            divPuntos.innerHTML = `Puntos obtenidos: <span style="color: #ff0000;">${ptsGanados}</span>`;
                        }
                        marcadorCol.appendChild(divPuntos);
                    }
                }
            });
        }, 1500); // Se mantiene el tiempo suficiente para procesar los nombres generados por actualizarTorneo()

        // Resto de la lógica de filtrado de botones
        const botones = document.querySelectorAll('.btn-link');
        const nombreBuscado = nombre.toLowerCase().trim();
        botones.forEach(btn => {
            const nombreEnBoton = btn.getAttribute('data-nombre-real');
            if (nombreEnBoton === nombreBuscado) {
                btn.style.setProperty('display', 'flex', 'important');
                btn.classList.add('quiniela-activa');
            } else {
                if (btn.id !== 'btn-volver-lista') btn.style.setProperty('display', 'none', 'important');
            }
        });

        const btnSave = document.querySelector('.btn-save');
        if (btnSave) btnSave.style.display = 'none';

        if (!document.getElementById('btn-volver-lista')) {
            const btnReset = document.createElement('button');
            btnReset.id = 'btn-volver-lista';
            btnReset.innerText = "✕ Cambiar Usuario";
            btnReset.className = "btn-link";
            btnReset.style.backgroundColor = "#ff4444";
            btnReset.style.color = "white";
            btnReset.onclick = () => {
                window.location.href = window.location.origin + window.location.pathname + "?nomodal=1";
            };
            document.getElementById('links-container').appendChild(btnReset);
        }
    } catch (error) { 
        console.error("Error crítico en cargarDesdeDB:", error); 
    }
}

        
function actualizarTorneo() {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    let clasificados = {}; 
    let datosGrupos = {};
    let hayDatosEfectivos = false;

    // 1. CÁLCULO DE TABLAS POR GRUPO (CRITERIOS FIFA)
    grupos.forEach(letra => {
        let tabla = {};
        const partidosGrupo = partidosData.filter(p => p.grupo === letra);
        
        partidosGrupo.forEach(p => {
            const inputL = document.getElementById(`L-${p.id}`) || document.getElementById(`R-L-${p.id}`);
            const inputV = document.getElementById(`V-${p.id}`) || document.getElementById(`R-V-${p.id}`);
            
            if (inputL && inputV && inputL.value !== "" && inputV.value !== "") {
                hayDatosEfectivos = true; 
                const gL = parseInt(inputL.value);
                const gV = parseInt(inputV.value);
                
                if (!tabla[p.local]) tabla[p.local] = { nombre: p.local, pts: 0, dg: 0, gf: 0 };
                if (!tabla[p.visita]) tabla[p.visita] = { nombre: p.visita, pts: 0, dg: 0, gf: 0 };
                
                tabla[p.local].gf += gL; tabla[p.visita].gf += gV;
                tabla[p.local].dg += (gL - gV); tabla[p.visita].dg += (gV - gL);
                
                if (gL > gV) tabla[p.local].pts += 3;
                else if (gV > gL) tabla[p.visita].pts += 3;
                else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
            }
        });

        // Ordenar Grupo: 1. Puntos, 2. Dif Goles, 3. Goles Favor
        let ranking = Object.values(tabla).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        datosGrupos[letra] = ranking;
        
        if (ranking.length >= 1) clasificados[`1${letra}`] = ranking[0].nombre;
        if (ranking.length >= 2) clasificados[`2${letra}`] = ranking[1].nombre;
    });

    if (!hayDatosEfectivos) {
        if (typeof limpiarLlavesDinamicas === 'function') limpiarLlavesDinamicas();
        return; 
    }

    // 2. RANKING DE MEJORES TERCEROS
    let listaTerceros = [];
    grupos.forEach(l => {
        if (datosGrupos[l] && datosGrupos[l][2]) {
            listaTerceros.push(datosGrupos[l][2]);
        }
    });

    // Ordenar terceros con criterio FIFA
    listaTerceros.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);

    // Tomamos los mejores 8 y los asignamos por ID (3T1, 3T2, etc.)
    // NOTA: Para máxima precisión FIFA, estos deberían ir a posiciones específicas 
    // según los grupos de origen, pero para tu quiniela, esto asegura que los 8 mejores pasen.
    listaTerceros.slice(0, 8).forEach((t, i) => {
        clasificados[`3T${i+1}`] = t.nombre;
    });

    // 3. ENVIAR A FASES ELIMINATORIAS
    actualizarFasesEliminatorias(clasificados);
}

// NUEVA FUNCIÓN: Limpiar nombres de países cuando la quiniela está vacía
function limpiarLlavesDinamicas() {
    partidosData.forEach(p => {
        // Solo actuamos sobre los partidos que NO son de grupos
        if (p.fase !== "Grupos") {
            // Reestablecemos el texto original del equipo local y visitante (ej: "1A", "2B", "G73")
            ponerNombreEnCard(p.id, 'L', p.local);
            ponerNombreEnCard(p.id, 'V', p.visita);
        }
    });
}

function actualizarFasesEliminatorias(clasificados) {
    const mapeo16vos = [
        { id: 73, L: "2A", V: "2B" }, { id: 74, L: "1C", V: "2F" },
        { id: 75, L: "1E", V: "3T1" }, { id: 76, L: "1F", V: "2C" },
        { id: 77, L: "2E", V: "2I" }, { id: 78, L: "1I", V: "3T2" },
        { id: 79, L: "1A", V: "3T3" }, { id: 80, L: "1L", V: "3T4" },
        { id: 81, L: "1G", V: "3T5" }, { id: 82, L: "1D", V: "3T6" },
        { id: 83, L: "1H", V: "2J" }, { id: 84, L: "2K", V: "2L" },
        { id: 85, L: "1B", V: "3T7" }, { id: 86, L: "2D", V: "2G" },
        { id: 87, L: "1J", V: "2H" }, { id: 88, L: "1K", V: "3T8" }
    ];

    mapeo16vos.forEach(m => {
        ponerNombreEnCard(m.id, 'L', clasificados[m.L] || m.L);
        ponerNombreEnCard(m.id, 'V', clasificados[m.V] || m.V);
    });

    const avance = [
        { de: 73, a: 89, pos: 'L', tipo: 'ganador' }, { de: 74, a: 89, pos: 'V', tipo: 'ganador' },
        { de: 75, a: 90, pos: 'L', tipo: 'ganador' }, { de: 76, a: 90, pos: 'V', tipo: 'ganador' },
        { de: 77, a: 91, pos: 'L', tipo: 'ganador' }, { de: 78, a: 91, pos: 'V', tipo: 'ganador' },
        { de: 79, a: 92, pos: 'L', tipo: 'ganador' }, { de: 80, a: 92, pos: 'V', tipo: 'ganador' },
        { de: 81, a: 93, pos: 'L', tipo: 'ganador' }, { de: 82, a: 93, pos: 'V', tipo: 'ganador' },
        { de: 83, a: 94, pos: 'L', tipo: 'ganador' }, { de: 84, a: 94, pos: 'V', tipo: 'ganador' },
        { de: 85, a: 95, pos: 'L', tipo: 'ganador' }, { de: 86, a: 95, pos: 'V', tipo: 'ganador' },
        { de: 87, a: 96, pos: 'L', tipo: 'ganador' }, { de: 88, a: 96, pos: 'V', tipo: 'ganador' },
        { de: 89, a: 97, pos: 'L', tipo: 'ganador' }, { de: 90, a: 97, pos: 'V', tipo: 'ganador' },
        { de: 91, a: 98, pos: 'L', tipo: 'ganador' }, { de: 92, a: 98, pos: 'V', tipo: 'ganador' },
        { de: 93, a: 99, pos: 'L', tipo: 'ganador' }, { de: 94, a: 99, pos: 'V', tipo: 'ganador' },
        { de: 95, a: 100, pos: 'L', tipo: 'ganador' }, { de: 96, a: 100, pos: 'V', tipo: 'ganador' },
        { de: 97, a: 101, pos: 'L', tipo: 'ganador' }, { de: 98, a: 101, pos: 'V', tipo: 'ganador' },
        { de: 99, a: 102, pos: 'L', tipo: 'ganador' }, { de: 100, a: 102, pos: 'V', tipo: 'ganador' },
        { de: 101, a: 104, pos: 'L', tipo: 'ganador' }, { de: 102, a: 104, pos: 'V', tipo: 'ganador' },
        { de: 101, a: 103, pos: 'L', tipo: 'perdedor' }, { de: 102, a: 103, pos: 'V', tipo: 'perdedor' }
    ];
    procesarAvanceFutbol(avance);
}

// FUNCIÓN MODIFICADA: Ahora decide por desempate si hay igualdad
function procesarAvanceFutbol(llaves) {
    llaves.forEach(llave => {
        const inputL = document.getElementById(`L-${llave.de}`);
        const inputV = document.getElementById(`V-${llave.de}`);
        if (!inputL || !inputV) return;
        
        const gL = parseInt(inputL.value);
        const gV = parseInt(inputV.value);
        
        if (!isNaN(gL) && !isNaN(gV)) {
            const card = inputL.closest('.partido-card');
            const nombreL = card.querySelector('.local').innerText;
            const nombreV = card.querySelector('.visita').innerText;
            
            let equipoGanador = "---";
            let equipoPerdedor = "---";

            if (gL > gV) {
                equipoGanador = nombreL;
                equipoPerdedor = nombreV;
            } else if (gV > gL) {
                equipoGanador = nombreV;
                equipoPerdedor = nombreL;
            } else {
                // Hay empate, mirar marcador de clasificación
                const dL = parseInt(document.getElementById(`DL-${llave.de}`)?.value || 0);
                const dV = parseInt(document.getElementById(`DV-${llave.de}`)?.value || 0);
                if (dL > dV) {
                    equipoGanador = nombreL; equipoPerdedor = nombreV;
                } else if (dV > dL) {
                    equipoGanador = nombreV; equipoPerdedor = nombreL;
                } else {
                    equipoGanador = "Empate"; equipoPerdedor = "Empate";
                }
            }

            const equipoFinal = (llave.tipo === 'ganador') ? equipoGanador : equipoPerdedor;
            ponerNombreEnCard(llave.a, llave.pos, equipoFinal);
        }
    });
}

function ponerNombreEnCard(id, lado, nombre) {
    const el = document.getElementById(`${lado}-${id}`);
    if (el) {
        const card = el.closest('.partido-card');
        const span = lado === 'L' ? card.querySelector('.local') : card.querySelector('.visita');
        if (span) span.innerText = nombre;
    }
}



// 9. REPORTE MAESTRO CORREGIDO (Incluye Mejores Terceros y 2 Columnas A4)
async function generarReporteMaestro() {
    try {
        const response = await fetch(`${API_URL}/obtener-todas-predicciones`);
        const datos = await response.json();
        if (!datos || datos.length === 0) return alert("No hay datos.");

        const agrupado = datos.reduce((acc, row) => {
            if (!acc[row.nombre_usuario]) acc[row.nombre_usuario] = [];
            acc[row.nombre_usuario].push(row);
            return acc;
        }, {});

        let htmlReporte = `<html><head>
            <title>Reporte Maestro</title>
            <style>
                @page { size: A4; margin: 8mm; }
                @media print {
                    .no-print { display: none; }
                    .page-break { page-break-after: always; border: none !important; box-shadow: none !important; margin: 0 !important; }
                    body { background: white; padding: 0; }
                }
                body { font-family: 'Segoe UI', Arial, sans-serif; padding: 10px; background: #f0f0f0; color: #1a1a1a; }
                .report-container { 
                    background: white; padding: 8mm; width: 194mm; margin: 0 auto 15px auto;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                }
                h2 { color: #01215b; text-align: center; border-bottom: 2px solid #01215b; margin: 0 0 10px 0; font-size: 20px; text-transform: uppercase; }
                .grid-container { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
                table { width: 100%; border-collapse: collapse; font-size: 9px; }
                th { background: #01215b; color: white; padding: 4px 2px; border: 1px solid #01215b; }
                td { border: 1px solid #eee; padding: 1.5px 3px; text-align: center; line-height: 1; }
                .col-id { background: #f8f8f8; font-weight: bold; width: 22px; color: #777; font-size: 8px; }
                .equipo-txt { text-align: left; font-weight: 600; width: 40%; }
                .marcador-col { width: 22px; font-weight: bold; background-color: #fffde7; border: 1px solid #ffd600; }
                .col-desempate { color: #d32f2f; font-size: 8px; width: 25px; background: #fafafa; }
                .btn-print { display: block; width: 280px; margin: 10px auto; padding: 12px; background: #2c3e50; color: white; border: none; border-radius: 6px; cursor: pointer; font-weight: bold; }
            </style>
        </head><body>
            <button class="btn-print no-print" onclick="window.print()">📥 IMPRIMIR REPORTE</button>`;

        for (const usuario in agrupado) {
            const prediccionesUser = agrupado[usuario];
            let nombresDinamicos = {}; 
            let tercerosCandidatos = []; // Nueva lista para guardar los 3ros de cada grupo

            // --- 1. LÓGICA DE GRUPOS ACTUALIZADA ---
            const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
            grupos.forEach(letra => {
                let tabla = {};
                partidosData.filter(p => p.grupo === letra).forEach(p => {
                    const pred = prediccionesUser.find(pr => pr.partido_id === p.id);
                    if (pred) {
                        const gL = pred.goles_local, gV = pred.goles_visita;
                        if (!tabla[p.local]) tabla[p.local] = { nombre: p.local, pts: 0, dg: 0, gf: 0 };
                        if (!tabla[p.visita]) tabla[p.visita] = { nombre: p.visita, pts: 0, dg: 0, gf: 0 };
                        tabla[p.local].gf += gL; tabla[p.visita].gf += gV;
                        tabla[p.local].dg += (gL - gV); tabla[p.visita].dg += (gV - gL);
                        if (gL > gV) tabla[p.local].pts += 3;
                        else if (gV > gL) tabla[p.visita].pts += 3;
                        else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
                    }
                });
                let ranking = Object.values(tabla).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
                if (ranking[0]) nombresDinamicos[`1${letra}`] = ranking[0].nombre;
                if (ranking[1]) nombresDinamicos[`2${letra}`] = ranking[1].nombre;
                // Guardamos el tercero para el ranking global de terceros
                if (ranking[2]) tercerosCandidatos.push(ranking[2]);
            });

            // --- 2. NUEVA LÓGICA: RANKING DE MEJORES TERCEROS ---
            tercerosCandidatos.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
            tercerosCandidatos.forEach((t, index) => {
                nombresDinamicos[`3T${index + 1}`] = t.nombre;
            });

            // --- 3. TU LÓGICA DE AVANCES (Se mantiene intacta) ---
            const llavesAvance = [
                { de: 73, a: 89 }, { de: 74, a: 89 }, { de: 75, a: 90 }, { de: 76, a: 90 },
                { de: 77, a: 91 }, { de: 78, a: 91 }, { de: 79, a: 92 }, { de: 80, a: 92 },
                { de: 81, a: 93 }, { de: 82, a: 93 }, { de: 83, a: 94 }, { de: 84, a: 94 },
                { de: 85, a: 95 }, { de: 86, a: 95 }, { de: 87, a: 96 }, { de: 88, a: 96 },
                { de: 89, a: 97 }, { de: 90, a: 97 }, { de: 91, a: 98 }, { de: 92, a: 98 },
                { de: 93, a: 99 }, { de: 94, a: 99 }, { de: 95, a: 100 }, { de: 96, a: 100 },
                { de: 97, a: 101 }, { de: 98, a: 101 }, { de: 99, a: 102 }, { de: 100, a: 102 },
                { de: 101, a: 104 }, { de: 102, a: 104 }, { de: 101, a: 103 }, { de: 102, a: 103 }
            ];

            llavesAvance.forEach(llave => {
                const pred = prediccionesUser.find(pr => pr.partido_id === llave.de);
                if (pred) {
                    const pInfo = partidosData.find(p => p.id === llave.de);
                    if(!pInfo) return;
                    let nL = nombresDinamicos[pInfo.local] || pInfo.local;
                    let nV = nombresDinamicos[pInfo.visita] || pInfo.visita;
                    let gL = pred.goles_local, gV = pred.goles_visita;
                    let dL = pred.goles_desempate_local || 0, dV = pred.goles_desempate_visita || 0;
                    let ganador, perdedor;
                    if (gL > gV) { ganador = nL; perdedor = nV; }
                    else if (gV > gL) { ganador = nV; perdedor = nL; }
                    else { ganador = (dL > dV) ? nL : nV; perdedor = (dL > dV) ? nV : nL; }
                    nombresDinamicos[`G${llave.de}`] = ganador;
                    nombresDinamicos[`P${llave.de}`] = perdedor;
                }
            });

            // --- 4. GENERACIÓN DE HTML (Mantenemos tus 2 columnas intactas) ---
            htmlReporte += `<div class="report-container page-break">
                <h2>Quiniela: ${usuario}</h2>
                <div class="grid-container">`;

            const mitad = Math.ceil(prediccionesUser.length / 2);
            for (let i = 0; i < 2; i++) {
                htmlReporte += `<div><table><thead><tr><th class="col-id">#</th><th>Equipo Local</th><th>L</th><th>V</th><th>Equipo Visita</th><th>Des.</th></tr></thead><tbody>`;
                const chunk = prediccionesUser.slice(i * mitad, (i + 1) * mitad);
                chunk.forEach(row => {
                    const p = partidosData.find(item => item.id === row.partido_id) || {};
                    let nombreL = nombresDinamicos[p.local] || p.local;
                    let nombreV = nombresDinamicos[p.visita] || p.visita;
                    const dL = row.goles_desempate_local ?? "";
                    const dV = row.goles_desempate_visita ?? "";
                    const desTxt = (dL !== "" || dV !== "") ? `${dL}-${dV}` : "-";
                    htmlReporte += `<tr>
                        <td class="col-id">${row.partido_id}</td>
                        <td class="equipo-txt">${nombreL}</td>
                        <td class="marcador-col">${row.goles_local}</td>
                        <td class="marcador-col">${row.goles_visita}</td>
                        <td class="equipo-txt">${nombreV}</td>
                        <td class="col-desempate">${desTxt}</td>
                    </tr>`;
                });
                htmlReporte += `</tbody></table></div>`;
            }
            htmlReporte += `</div></div>`;
        }

        htmlReporte += `</body></html>`;
        const v = window.open('', '_blank');
        v.document.write(htmlReporte);
        v.document.close();
    } catch (e) { 
        console.error(e);
        alert("Error al generar el reporte detallado."); 
    }
}




async function resetearBaseDeDatos() {
    if (!confirm("⚠️ ¿Borrar todo?")) return;
    try {
        const res = await fetch(`${API_URL}/reset-db`, { method: 'DELETE' });
        const data = await res.json();
        alert(data.mensaje);
        location.reload();
    } catch (e) { alert("Error reset."); }
}



// Esta función cierra el modal y te deja ver el index
function cerrarMiModal() {
    const modal = document.getElementById('modal-informativo');
    if (modal) {
        modal.style.display = 'none';
        console.log("Modal cerrado por el usuario");
    }
}

// Por si acaso el usuario hace clic en el fondo oscuro también se cierre
window.onclick = function(event) {
    const modal = document.getElementById('modal-informativo');
    if (event.target == modal) {
        cerrarMiModal();
    }
}



// 10. INICIO AL CARGAR (CONTROL DE MODAL)
window.onload = async () => {
    // 1. Cargamos los datos primero
    await renderizarFixture();
    await actualizarListaLinks();
    if (typeof actualizarTorneo === "function") actualizarTorneo();

    // 2. Control del modal
    const urlParams = new URLSearchParams(window.location.search);
    const modal = document.getElementById('modal-informativo');

    // Si la URL NO tiene "nomodal", entonces lo mostramos
    if (!urlParams.has('nomodal')) {
        if (modal) {
            modal.style.setProperty('display', 'block', 'important');
        }
    } else {
        // Si tiene "nomodal", nos aseguramos de que esté escondido
        if (modal) {
            modal.style.setProperty('display', 'none', 'important');
        }
    }
};







