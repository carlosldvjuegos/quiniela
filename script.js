// Cambia tu variable API_URL por esta línea inteligente:
const API_URL = (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")
    ? window.location.origin 
    : "https://quiniela-pcas.onrender.com"; // Aquí pones la URL que te dé Render

// 1. LISTA DE PARTIDOS (Asegúrate de que coincida con admin-script.js)
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

// 2. LÓGICA DE PUNTOS SEGÚN TU IMAGEN
function calcularLogicaPuntos(pL, pV, rL, rV) {
    // REGLA: Acierto del ganador y resultado exacto (5 puntos)
    if (pL === rL && pV === rV) return 5;

    let puntos = 0;
    const tendenciaPredicha = Math.sign(pL - pV); // 1 gana local, -1 visita, 0 empate
    const tendenciaReal = Math.sign(rL - rV);

    // REGLA: Acierto del equipo ganador o empate (2 puntos)
    if (tendenciaPredicha === tendenciaReal) {
        puntos = 2;
    }

    // REGLA: Acierto de un marcador individual (1 punto adicional por cada uno)
    // Ejemplo de tu imagen: Predicho 2-1, Real 2-0 -> 2 (tendencia) + 1 (goles local) = 3 pts.
    if (pL === rL) puntos += 1;
    if (pV === rV) puntos += 1;

    return puntos;
}

// 3. RENDERIZAR LA TABLA PARA EL USUARIO
async function renderizarFixture() {
    const fixtureCont = document.getElementById("fixture-container");
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


// 4. ACTUALIZAR LISTA DE REGISTRADAS CON RANKING (DE MAYOR A MENOR)
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

        // Calculamos puntos para cada usuario
        let listaRanking = [];

        for (const user of usuarios) {
            const resPred = await fetch(`${API_URL}/cargar/${user.nombre_usuario}`);
            const predicciones = await resPred.json();

            let ptsTotales = 0;
            predicciones.forEach(pred => {
                const oficial = resultadosOficiales.find(r => r.id === pred.id);
                if (oficial) {
                    ptsTotales += calcularLogicaPuntos(pred.gl, pred.gv, oficial.gl, oficial.gv);
                }
            });
            listaRanking.push({ nombre: user.nombre_usuario, puntos: ptsTotales });
        }

        // ORDENAR: Mayor puntaje primero
        listaRanking.sort((a, b) => b.puntos - a.puntos);

        // Dibujar en el sidebar
        container.innerHTML = "";
        listaRanking.forEach((u, index) => {
            const icono = index === 0 ? "🥇" : (index === 1 ? "🥈" : (index === 2 ? "🥉" : "•"));
            const btn = document.createElement('button');
            btn.className = "btn-link";
            btn.innerHTML = `
                <span>${icono} ${u.nombre}</span>
                <span class="badge-puntos">${u.puntos} pts</span>
            `;
            btn.onclick = () => cargarDesdeDB(u.nombre);
            container.appendChild(btn);
        });

    } catch (err) {
        console.error("Error al cargar ranking:", err);
    }
}

// 5. BOTÓN CALCULAR (Puntos actuales en pantalla)
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
        actualizarListaLinks(); // Refrescar el ranking lateral
    } catch (e) {
        alert("Error al obtener resultados oficiales.");
    }
}

// 6. GUARDAR QUINIELA
async function guardarQuinielaCompleta() {
    const nombre = document.getElementById('nombre-usuario').value;
    if (!nombre) return alert("Escribe tu nombre.");

    const predicciones = [];
    partidosData.forEach(p => {
        const gl = document.getElementById(`L-${p.id}`).value;
        const gv = document.getElementById(`V-${p.id}`).value;
        if (gl !== "" && gv !== "") {
            predicciones.push({ id: p.id, gl: parseInt(gl), gv: parseInt(gv) });
        }
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
    } catch (e) {
        alert("Error al guardar.");
    }
}





// 7. CARGAR UNA QUINIELA AL HACER CLIC EN EL NOMBRE
async function cargarDesdeDB(nombre) {
    try {
        // 1. LIMPIEZA TOTAL: Vaciar inputs para que no se mezclen datos
        const inputNombrePrincipal = document.getElementById('nombre-usuario');
        if (inputNombrePrincipal) inputNombrePrincipal.value = nombre;

        const todosLosInputs = document.querySelectorAll('.marcador-col input');
        todosLosInputs.forEach(input => {
            input.value = ""; // Borramos lo que sea que estuviera escrito antes
        });

        // 2. PETICIÓN AL SERVIDOR (Ajusta la URL si es necesario)
        const respuesta = await fetch(`${API_URL}/cargar/${nombre}`);
        if (!respuesta.ok) throw new Error("Error en servidor");
        const datos = await respuesta.json();

        // 3. CARGAR GOLES NUEVOS
        datos.forEach(partido => {
            const inL = document.getElementById(`L-${partido.id}`);
            const inV = document.getElementById(`V-${partido.id}`);
            if (inL) inL.value = partido.gl;
            if (inV) inV.value = partido.gv;
        });

        if (typeof actualizarTorneo === 'function') actualizarTorneo();

        // 4. FOCO TOTAL: Solo mostrar al seleccionado y ocultar al resto
        const botones = document.querySelectorAll('.btn-link');
        
        botones.forEach(btn => {
            // Buscamos si el nombre está dentro del texto del botón
            const esElSeleccionado = btn.innerText.toLowerCase().includes(nombre.toLowerCase());

            if (esElSeleccionado) {
                btn.style.setProperty('display', 'flex', 'important'); // Se queda
                btn.classList.add('quiniela-activa');
            } else {
                btn.style.setProperty('display', 'none', 'important'); // ¡DESAPARECE!
            }
        });

        // 5. BOTÓN PARA "CAMBIAR USUARIO" (Para que aparezcan todos otra vez)
        let btnReset = document.getElementById('btn-volver-lista');
        if (!btnReset) {
            btnReset = document.createElement('button');
            btnReset.id = 'btn-volver-lista';
            btnReset.innerText = "✕ Cambiar Usuario";
            btnReset.className = "btn-link"; // Para que herede el estilo
            btnReset.style.backgroundColor = "#ff4444";
            btnReset.style.color = "white";
            btnReset.style.marginTop = "10px";
            
            btnReset.onclick = () => {
                // Al hacer clic, recargamos para que aparezcan todos
                location.reload();
            };
            document.getElementById('links-container').appendChild(btnReset);
        }

    } catch (error) {
        console.error("Error al cargar:", error);
    }
}







async function calcularClasificados() {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    const clasificados = {}; // Guardará { "1A": "México", "2A": "Sudáfrica"... }

    grupos.forEach(letra => {
        let tabla = {};
        // Filtrar partidos de este grupo
        const partidosGrupo = partidosData.filter(p => p.grupo === letra);
        
        partidosGrupo.forEach(p => {
            const gL = parseInt(document.getElementById(`L-${p.id}`).value) || 0;
            const gV = parseInt(document.getElementById(`V-${p.id}`).value) || 0;
            const hayGoles = document.getElementById(`L-${p.id}`).value !== "";

            if (!tabla[p.local]) tabla[p.local] = { nombre: p.local, pts: 0, gf: 0, gc: 0 };
            if (!tabla[p.visita]) tabla[p.visita] = { nombre: p.visita, pts: 0, gf: 0, gc: 0 };

            if (hayGoles) {
                tabla[p.local].gf += gL;
                tabla[p.local].gc += gV;
                tabla[p.visita].gf += gV;
                tabla[p.visita].gc += gL;
                if (gL > gV) tabla[p.local].pts += 3;
                else if (gV > gL) tabla[p.visita].pts += 3;
                else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
            }
        });

        // Ordenar por puntos y diferencia de goles (Criterio FIFA básico)
        let ranking = Object.values(tabla).sort((a, b) => b.pts - a.pts || (b.gf - b.gc) - (a.gf - a.gc));
        
        if (ranking.length > 0) {
            clasificados[`1${letra}`] = ranking[0].nombre;
            clasificados[`2${letra}`] = ranking[1] ? ranking[1].nombre : `2${letra}`;
        }
    });

    actualizarNombresEliminatorias(clasificados);
}


function actualizarTorneo() {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    let clasificados = {}; 
    let datosGrupos = {};

    // 1. PROCESAR GRUPOS
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
                    tabla[p.local].gf += gL;
                    tabla[p.visita].gf += gV;
                    tabla[p.local].dg += (gL - gV);
                    tabla[p.visita].dg += (gV - gL);
                    if (gL > gV) tabla[p.local].pts += 3;
                    else if (gV > gL) tabla[p.visita].pts += 3;
                    else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
                }
            }
        });

        // Orden FIFA: Puntos > DG > GF
        let ranking = Object.values(tabla).sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
        datosGrupos[letra] = { ranking };
        
        if (ranking.length >= 1) clasificados[`1${letra}`] = ranking[0].nombre;
        if (ranking.length >= 2) clasificados[`2${letra}`] = ranking[1].nombre;
        if (ranking.length >= 3) clasificados[`3${letra}`] = ranking[2].nombre;
    });

    // 2. CALCULAR 8 MEJORES TERCEROS
    const mejoresTerceros = [];
    Object.keys(datosGrupos).forEach(l => {
        if (datosGrupos[l].ranking[2]) mejoresTerceros.push(datosGrupos[l].ranking[2]);
    });
    mejoresTerceros.sort((a, b) => b.pts - a.pts || b.dg - a.dg || b.gf - a.gf);
    
    mejoresTerceros.slice(0, 8).forEach((t, i) => {
        clasificados[`3T${i+1}`] = t.nombre;
    });

    // 3. EJECUTAR EL AVANCE DE FASES
    actualizarFasesEliminatorias(clasificados);
}

function actualizarFasesEliminatorias(clasificados) {
    // MAPEO DE 16vos (Basado en esquema FIFA 48 equipos)
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

    // LISTA UNIFICADA DE AVANCE (Desde 16vos hasta la Final y 3er Puesto)
    const avance = [
        // De 16vos a Octavos
        { de: 73, a: 89, pos: 'L', tipo: 'ganador' }, { de: 74, a: 89, pos: 'V', tipo: 'ganador' },
        { de: 75, a: 90, pos: 'L', tipo: 'ganador' }, { de: 76, a: 90, pos: 'V', tipo: 'ganador' },
        { de: 77, a: 91, pos: 'L', tipo: 'ganador' }, { de: 78, a: 91, pos: 'V', tipo: 'ganador' },
        { de: 79, a: 92, pos: 'L', tipo: 'ganador' }, { de: 80, a: 92, pos: 'V', tipo: 'ganador' },
        { de: 81, a: 93, pos: 'L', tipo: 'ganador' }, { de: 82, a: 93, pos: 'V', tipo: 'ganador' },
        { de: 83, a: 94, pos: 'L', tipo: 'ganador' }, { de: 84, a: 94, pos: 'V', tipo: 'ganador' },
        { de: 85, a: 95, pos: 'L', tipo: 'ganador' }, { de: 86, a: 95, pos: 'V', tipo: 'ganador' },
        { de: 87, a: 96, pos: 'L', tipo: 'ganador' }, { de: 88, a: 96, pos: 'V', tipo: 'ganador' },

        // De Octavos a Cuartos
        { de: 89, a: 97, pos: 'L', tipo: 'ganador' }, { de: 90, a: 97, pos: 'V', tipo: 'ganador' },
        { de: 91, a: 98, pos: 'L', tipo: 'ganador' }, { de: 92, a: 98, pos: 'V', tipo: 'ganador' },
        { de: 93, a: 99, pos: 'L', tipo: 'ganador' }, { de: 94, a: 99, pos: 'V', tipo: 'ganador' },
        { de: 95, a: 100, pos: 'L', tipo: 'ganador' }, { de: 96, a: 100, pos: 'V', tipo: 'ganador' },

        // De Cuartos a Semis
        { de: 97, a: 101, pos: 'L', tipo: 'ganador' }, { de: 98, a: 101, pos: 'V', tipo: 'ganador' },
        { de: 99, a: 102, pos: 'L', tipo: 'ganador' }, { de: 100, a: 102, pos: 'V', tipo: 'ganador' },

        // DE SEMIS A LA GRAN FINAL (Ganadores)
        { de: 101, a: 104, pos: 'L', tipo: 'ganador' }, { de: 102, a: 104, pos: 'V', tipo: 'ganador' },

        // DE SEMIS AL TERCER PUESTO (Perdedores)
        { de: 101, a: 103, pos: 'L', tipo: 'perdedor' }, { de: 102, a: 103, pos: 'V', tipo: 'perdedor' }
    ];

    // Llamamos a la nueva función que procesa ambos casos
    procesarAvanceFútbol(avance);
}

function procesarAvanceFútbol(llaves) {
    llaves.forEach(llave => {
        const inputL = document.getElementById(`L-${llave.de}`);
        const inputV = document.getElementById(`V-${llave.de}`);
        
        if (!inputL || !inputV) return;

        const gL = parseInt(inputL.value);
        const gV = parseInt(inputV.value);

        if (!isNaN(gL) && !isNaN(gV)) {
            const card = inputL.closest('.card');
            const nombreL = card.querySelector('.txt-right').innerText;
            const nombreV = card.querySelector('.txt-left').innerText;
            
            let equipoSeleccionado = "---";

            if (llave.tipo === 'ganador') {
                if (gL > gV) equipoSeleccionado = nombreL;
                else if (gV > gL) equipoSeleccionado = nombreV;
                else equipoSeleccionado = "Empate (Penales)";
            } else if (llave.tipo === 'perdedor') {
                if (gL < gV) equipoSeleccionado = nombreL;
                else if (gV < gL) equipoSeleccionado = nombreV;
                else equipoSeleccionado = "Empate (Penales)";
            }

            ponerNombreEnCard(llave.a, llave.pos, equipoSeleccionado);
        }
    });
}

function ponerNombreEnCard(id, lado, nombre) {
    const el = document.getElementById(`${lado}-${id}`);
    if (el) {
        const span = lado === 'L' ? el.closest('.card').querySelector('.txt-right') : el.closest('.card').querySelector('.txt-left');
        if (span) span.innerText = nombre;
    }
}

async function generarReporteMaestro() {
    try {
        const response = await fetch(`${API_URL}/obtener-todas-predicciones`);
        const datos = await response.json();

        if (!datos || datos.length === 0) {
            alert("No hay quinielas guardadas.");
            return;
        }

        // Agrupar datos por nombre de usuario
        const agrupado = datos.reduce((acc, row) => {
            if (!acc[row.nombre_usuario]) acc[row.nombre_usuario] = [];
            acc[row.nombre_usuario].push(row);
            return acc;
        }, {});

        // Crear el contenido del reporte
        let htmlReporte = `
            <html>
            <head>
                <title>Reporte General de Quinielas</title>
                <style>
                    body { font-family: sans-serif; padding: 20px; color: #333; }
                    .usuario-section { page-break-after: always; border-bottom: 2px solid #01215b; margin-bottom: 40px; }
                    h2 { color: #01215b; text-transform: uppercase; border-left: 5px solid #d4af37; padding-left: 10px; }
                    table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                    th { background: #01215b; color: white; padding: 8px; text-align: left; }
                    td { border: 1px solid #ddd; padding: 8px; }
                    tr:nth-child(even) { background: #f9f9f9; }
                    .marcador { font-weight: bold; text-align: center; background: #fffdf5; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <div class="no-print">
                    <button onclick="window.print()" style="padding: 10px 20px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer;">
                        🖨️ Guardar como PDF / Imprimir
                    </button>
                    <hr>
                </div>
        `;

        // Generar una tabla por cada usuario
        for (const usuario in agrupado) {
            htmlReporte += `
                <div class="usuario-section">
                    <h2>Quiniela de: ${usuario}</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Local</th>
                                <th>Res. Local</th>
                                <th>Res. Visita</th>
                                <th>Visita</th>
                            </tr>
                        </thead>
                        <tbody>
            `;

            agrupado[usuario].forEach(row => {
                const p = partidosData.find(item => item.id === row.partido_id) || {};
                htmlReporte += `
                    <tr>
                        <td>${row.partido_id}</td>
                        <td>${p.local || '---'}</td>
                        <td class="marcador">${row.goles_local}</td>
                        <td class="marcador">${row.goles_visita}</td>
                        <td>${p.visita || '---'}</td>
                    </tr>
                `;
            });

            htmlReporte += `</tbody></table></div>`;
        }

        htmlReporte += `</body></html>`;

        // Abrir en una nueva pestaña
        const ventana = window.open('', '_blank');
        ventana.document.write(htmlReporte);
        ventana.document.close();

    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo generar el reporte.");
    }
}

async function resetearBaseDeDatos() {
    if (!confirm("⚠️ ¿Estás SEGURO? Esto borrará TODAS las quinielas y resultados de la base de datos.")) return;

    try {
        const res = await fetch(`${API_URL}/reset-db`, { method: 'DELETE' });
        const data = await res.json();
        alert(data.mensaje);
        location.reload(); // Recarga la página para limpiar todo
    } catch (e) {
        alert("Error al intentar borrar la base de datos.");
    }
}

// 1. Función para filtrar y sumar puntos de una fecha específica
function obtenerPuntosPorFecha(fechaDeseada) {
    // Asumiendo que 'quinielas' es tu array de objetos
    return quinielas
        .filter(q => q.fecha === fechaDeseada)
        .reduce((sum, q) => sum + (q.acertado ? q.valorPunto : 0), 0);
}



// INICIO AL CARGAR PÁGINA
window.onload = async () => {
    await renderizarFixture(); // Dibuja los partidos y resultados reales
    actualizarListaLinks();    // Carga el ranking lateral
    actualizarTorneo();        // Calcula clasificados y llena las llaves de eliminación
};

