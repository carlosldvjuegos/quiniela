// 0. CONFIGURACIÓN DE URL
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? window.location.origin 
    : "https://quiniela-pcas.onrender.com"; 

// 1. LISTA DE PARTIDOS
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

// 2. LÓGICA DE PUNTOS
function calcularLogicaPuntos(pL, pV, rL, rV) {
    if (pL === rL && pV === rV) return 5;
    let puntos = 0;
    const tendenciaPredicha = Math.sign(pL - pV);
    const tendenciaReal = Math.sign(rL - rV);
    if (tendenciaPredicha === tendenciaReal) puntos = 2;
    if (pL === rL) puntos += 1;
    if (pV === rV) puntos += 1;
    return puntos;
}

// 3. RENDERIZAR LA TABLA
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

        const card = document.createElement("div");
        card.className = "partido-card";
        card.innerHTML = `
            <div class="card-header">
                <span class="txt-fase">${p.fase} ${p.grupo ? '- Grupo ' + p.grupo : ''}</span>
                <span class="txt-fecha">${p.fecha}</span>
            </div>
            <div class="card-body">
                <div class="equipo-col local">${p.local}</div>
                <div class="marcador-col">
                    <input type="number" id="L-${p.id}" min="0" oninput="actualizarTorneo()">
                    <span class="separador">-</span>
                    <input type="number" id="V-${p.id}" min="0" oninput="actualizarTorneo()">
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

// 4. RANKING
async function actualizarListaLinks() {
    const container = document.getElementById('links-container');
    if (!container) return;

    try {
        const [resNombres, resOficiales] = await Promise.all([
            fetch(`${API_URL}/registros`),
            fetch(`${API_URL}/obtener-resultados-db`)
        ]);

        const usuarios = await resNombres.json();
        const resultadosOficiales = await resOficiales.json();
        let listaRanking = [];

        for (const user of usuarios) {
            const resPred = await fetch(`${API_URL}/cargar/${user.nombre_usuario}`);
            const predicciones = await resPred.json();
            let ptsTotales = 0;
            predicciones.forEach(pred => {
                const oficial = resultadosOficiales.find(r => r.id === pred.id);
                if (oficial) ptsTotales += calcularLogicaPuntos(pred.gl, pred.gv, oficial.gl, oficial.gv);
            });
            listaRanking.push({ nombre: user.nombre_usuario, puntos: ptsTotales });
        }

        listaRanking.sort((a, b) => b.puntos - a.puntos);
        container.innerHTML = "";
        listaRanking.forEach((u, index) => {
            const icono = index === 0 ? "🥇" : (index === 1 ? "🥈" : (index === 2 ? "🥉" : "•"));
            const btn = document.createElement('button');
            btn.className = "btn-link";
            btn.innerHTML = `<span>${icono} ${u.nombre}</span><span class="badge-puntos">${u.puntos} pts</span>`;
            btn.onclick = () => cargarDesdeDB(u.nombre);
            container.appendChild(btn);
        });
    } catch (err) { console.error("Error ranking:", err); }
}

// 5. CALCULAR PUNTOS MANUAL
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

// 6. GUARDAR
async function guardarQuinielaCompleta() {
    const nombre = document.getElementById('nombre-usuario').value;
    if (!nombre) return alert("Escribe tu nombre.");
    const predicciones = [];
    partidosData.forEach(p => {
        const gl = document.getElementById(`L-${p.id}`).value;
        const gv = document.getElementById(`V-${p.id}`).value;
        if (gl !== "" && gv !== "") predicciones.push({ id: p.id, gl: parseInt(gl), gv: parseInt(gv) });
    });
    try {
        const res = await fetch(`${API_URL}/guardar`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nombre, predicciones })
        });
        const data = await res.json();
        alert(data.mensaje);
        actualizarListaLinks();
    } catch (e) { alert("Error al guardar."); }
}

// 7. CARGAR DESDE DB
async function cargarDesdeDB(nombre) {
    try {
        const inputNombrePrincipal = document.getElementById('nombre-usuario');
        if (inputNombrePrincipal) inputNombrePrincipal.value = nombre;
        document.querySelectorAll('.marcador-col input').forEach(input => input.value = "");

        const respuesta = await fetch(`${API_URL}/cargar/${nombre}`);
        const datos = await respuesta.json();
        datos.forEach(partido => {
            const inL = document.getElementById(`L-${partido.id}`);
            const inV = document.getElementById(`V-${partido.id}`);
            if (inL) inL.value = partido.gl;
            if (inV) inV.value = partido.gv;
        });

        actualizarTorneo();
        
        const botones = document.querySelectorAll('.btn-link');
        botones.forEach(btn => {
            if (btn.innerText.toLowerCase().includes(nombre.toLowerCase())) {
                btn.style.setProperty('display', 'flex', 'important');
                btn.classList.add('quiniela-activa');
            } else {
                btn.style.setProperty('display', 'none', 'important');
            }
        });

        if (!document.getElementById('btn-volver-lista')) {
            const btnReset = document.createElement('button');
            btnReset.id = 'btn-volver-lista';
            btnReset.innerText = "✕ Cambiar Usuario";
            btnReset.className = "btn-link";
            btnReset.style.backgroundColor = "#ff4444";
            btnReset.style.color = "white";
            btnReset.onclick = () => location.reload();
            document.getElementById('links-container').appendChild(btnReset);
        }
    } catch (error) { console.error("Error al cargar:", error); }
}

// 8. LÓGICA DE TORNEO Y AVANCES
function actualizarTorneo() {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    let clasificados = {}; 
    let datosGrupos = {};

    grupos.forEach(letra => {
        let tabla = {};
        const partidosGrupo = partidosData.filter(p => p.grupo === letra);
        partidosGrupo.forEach(p => {
            const inputL = document.getElementById(`L-${p.id}`);
            const inputV = document.getElementById(`V-${p.id}`);
            if (inputL && inputV) {
                const gL = parseInt(inputL.value);
                const gV = parseInt(inputV.value);
                if (!tabla[p.local]) tabla[p.local] = { nombre: p.local, pts: 0, dg: 0, gf: 0 };
                if (!tabla[p.visita]) tabla[p.visita] = { nombre: p.visita, pts: 0, dg: 0, gf: 0 };
                if (!isNaN(gL) && !isNaN(gV)) {
                    tabla[p.local].gf += gL; tabla[p.visita].gf += gV;
                    tabla[p.local].dg += (gL - gV); tabla[p.visita].dg += (gV - gL);
                    if (gL > gV) tabla[p.local].pts += 3;
                    else if (gV > gL) tabla[p.visita].pts += 3;
                    else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
                }
            }
        });
        let ranking = Object.values(tabla).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        datosGrupos[letra] = { ranking };
        if (ranking.length >= 1) clasificados[`1${letra}`] = ranking[0].nombre;
        if (ranking.length >= 2) clasificados[`2${letra}`] = ranking[1].nombre;
        if (ranking.length >= 3) clasificados[`3${letra}`] = ranking[2].nombre;
    });

    const mejoresTerceros = [];
    Object.keys(datosGrupos).forEach(l => {
        if (datosGrupos[l].ranking[2]) mejoresTerceros.push(datosGrupos[l].ranking[2]);
    });
    mejoresTerceros.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
    mejoresTerceros.slice(0, 8).forEach((t, i) => clasificados[`3T${i+1}`] = t.nombre);

    actualizarFasesEliminatorias(clasificados);
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
            let equipo = "---";
            if (llave.tipo === 'ganador') {
                if (gL > gV) equipo = nombreL; else if (gV > gL) equipo = nombreV; else equipo = "Empate";
            } else {
                if (gL < gV) equipo = nombreL; else if (gV < gL) equipo = nombreV; else equipo = "Empate";
            }
            ponerNombreEnCard(llave.a, llave.pos, equipo);
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






// 9. REPORTES Y ADMIN
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

        // --- INICIO DEL HTML PARA LA NUEVA VENTANA ---
        let htmlReporte = `<html><head>
            <title>Reporte Maestro</title>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.25/jspdf.plugin.autotable.min.js"></script>
            
            <style>
                body { font-family: sans-serif; padding: 20px; background: #f4f4f4; }
                .header-actions { 
                    position: sticky; top: 0; background: white; padding: 15px; 
                    border-bottom: 2px solid #01215b; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;
                }
                .btn-pdf { 
                    background: #d32f2f; color: white; border: none; padding: 10px 20px; 
                    cursor: pointer; font-weight: bold; border-radius: 5px; font-size: 14px;
                }
                .btn-pdf:hover { background: #b71c1c; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 30px; background: white; }
                th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                th { background: #01215b; color: white; }
                .marcador { font-weight: bold; text-align: center; }
                h2 { color: #01215b; border-bottom: 1px solid #ccc; padding-bottom: 5px; }
            </style>
        </head><body>
            
            <div class="header-actions">
                <h1>Reporte Maestro de Quinielas</h1>
                <button class="btn-pdf" onclick="ventanaImprimirPDF()">📥 Descargar en PDF (2 Columnas)</button>
            </div>`;

        for (const usuario in agrupado) {
            htmlReporte += `<h2>Quiniela de: ${usuario}</h2>
                <table id="tabla-${usuario}">
                    <thead><tr><th>ID</th><th>Local</th><th>GL</th><th>GV</th><th>Visita</th></tr></thead>
                    <tbody>`;
            
            agrupado[usuario].forEach(row => {
                const p = partidosData.find(item => item.id === row.partido_id) || {};
                htmlReporte += `<tr>
                    <td>${row.partido_id}</td>
                    <td>${p.local || '---'}</td>
                    <td class="marcador">${row.goles_local}</td>
                    <td class="marcador">${row.goles_visita}</td>
                    <td>${p.visita || '---'}</td>
                </tr>`;
            });
            htmlReporte += `</tbody></table>`;
        }

        // --- INYECTAMOS LA LÓGICA DEL PDF DENTRO DE LA VENTANA NUEVA ---
        htmlReporte += `
        <script>
            function ventanaImprimirPDF() {
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF('p', 'mm', 'a4');
                const tablas = document.querySelectorAll('table');
                const titulos = document.querySelectorAll('h2');
                
                let y = 20;
                let columna = 0;
                const anchoCol = 90;
                const xDerecha = 105;

                doc.setFontSize(16);
                doc.text("REPORTE MAESTRO - 2 COLUMNAS", 105, 10, { align: "center" });

                tablas.forEach((tabla, index) => {
                    const nombreUsuario = titulos[index].innerText;
                    const xPos = (columna === 0) ? 10 : xDerecha;

                    doc.setFontSize(10);
                    doc.text(nombreUsuario, xPos, y);

                    doc.autoTable({
                        html: tabla,
                        startY: y + 2,
                        margin: { left: xPos },
                        tableWidth: anchoCol,
                        theme: 'grid',
                        styles: { fontSize: 7, cellPadding: 1 },
                        headStyles: { fillColor: [1, 33, 91] }
                    });

                    if (columna === 0) {
                        columna = 1;
                    } else {
                        columna = 0;
                        y = doc.lastAutoTable.finalY + 15;
                    }

                    if (y > 270) { doc.addPage(); y = 20; columna = 0; }
                });

                doc.save("Reporte_Quinielas.pdf");
            }
        </script>
        </body></html>`;

        const v = window.open('', '_blank');
        v.document.write(htmlReporte);
        v.document.close();
        
    } catch (e) { 
        console.error(e);
        alert("Error al generar el reporte."); 
    }
}

        



function imprimirReporteDosColumnas() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');

    // --- INTENTO DE OBTENER DATOS ---
    // 1. Intentar desde una variable global común (ajusta 'quinielas' si tu variable se llama distinto)
    // 2. Intentar desde el almacenamiento local
    let datos = (typeof quinielas !== 'undefined') ? quinielas : [];
    
    if (datos.length === 0) {
        const localData = localStorage.getItem('quinielas');
        if (localData) datos = JSON.parse(localData);
    }

    // SI SIGUE VACÍO, DAMOS UN AVISO MÁS DETALLADO
    if (!datos || datos.length === 0) {
        alert("Error: No encontré la lista de quinielas. Asegúrate de haber guardado al menos una.");
        return;
    }

    doc.setFontSize(14);
    doc.text("REPORTE MAESTRO DE QUINIELAS", 105, 15, { align: "center" });

    let y = 25;
    let columna = 0;
    const anchoColumna = 90; 
    const separacion = 105; 

    datos.forEach((quiniela) => {
        const posX = (columna === 0) ? 10 : separacion;

        doc.setFontSize(9);
        doc.setFont(undefined, 'bold');
        doc.text(`Usuario: ${quiniela.usuario || quiniela.nombre}`, posX, y);

        // Ajustamos los nombres de las propiedades (local, golesLocal, etc.)
        // según lo que vi en tus capturas anteriores
        const filas = (quiniela.pronosticos || []).map(p => [
            (p.local || p.equipo1 || "").substring(0, 12),
            p.golesLocal ?? p.gl ?? "-",
            p.golesVisita ?? p.gv ?? "-",
            (p.visita || p.equipo2 || "").substring(0, 12)
        ]);

        doc.autoTable({
            startY: y + 2,
            margin: { left: posX },
            tableWidth: anchoColumna,
            styles: { fontSize: 7, cellPadding: 0.5 },
            headStyles: { fillColor: [1, 33, 91] },
            head: [['Local', 'GL', 'GV', 'Visita']],
            body: filas,
            theme: 'grid'
        });

        if (columna === 0) {
            columna = 1;
        } else {
            columna = 0;
            y = doc.lastAutoTable.finalY + 10;
        }

        if (y > 270) {
            doc.addPage();
            y = 20;
            columna = 0;
        }
    });

    doc.save("Reporte_Doble_Columna.pdf");
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

// 10. INICIO AL CARGAR
window.onload = async () => {
    await renderizarFixture();
    await actualizarListaLinks();
    actualizarTorneo();
};










