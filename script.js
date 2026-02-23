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

   // AÑADIR ELIMINATORIAS (IDs 73 a 104)
const eliminatorias = [
    { id: 73, fase: "16vos", local: "2A", visita: "2B" }, { id: 74, fase: "16vos", local: "1C", visita: "2F" },
    { id: 75, fase: "16vos", local: "1E", visita: "3T1" }, { id: 76, fase: "16vos", local: "1F", visita: "2C" },
    { id: 77, fase: "16vos", local: "2E", visita: "2I" }, { id: 78, fase: "16vos", local: "1I", visita: "3T2" },
    { id: 79, fase: "16vos", local: "1A", visita: "3T3" }, { id: 80, fase: "16vos", local: "1L", visita: "3T4" },
    { id: 81, fase: "16vos", local: "1G", visita: "3T5" }, { id: 82, fase: "16vos", local: "1D", visita: "3T6" },
    { id: 83, fase: "16vos", local: "1H", visita: "2J" }, { id: 84, fase: "16vos", local: "2K", visita: "2L" },
    { id: 85, fase: "16vos", local: "1B", visita: "3T7" }, { id: 86, fase: "16vos", local: "2D", visita: "2G" },
    { id: 87, fase: "16vos", local: "1J", visita: "2H" }, { id: 88, fase: "16vos", local: "1K", visita: "3T8" },
    // 8vos
    { id: 89, fase: "8vos", local: "Ganador 73", visita: "Ganador 75" }, { id: 90, fase: "8vos", local: "Ganador 74", visita: "Ganador 77" },
    { id: 91, fase: "8vos", local: "Ganador 76", visita: "Ganador 78" }, { id: 92, fase: "8vos", local: "Ganador 79", visita: "Ganador 80" },
    { id: 93, fase: "8vos", local: "Ganador 83", visita: "Ganador 84" }, { id: 94, fase: "8vos", local: "Ganador 81", visita: "Ganador 82" },
    { id: 95, fase: "8vos", local: "Ganador 86", visita: "Ganador 88" }, { id: 96, fase: "8vos", local: "Ganador 85", visita: "Ganador 87" },
    // 4tos
    { id: 97, fase: "4tos", local: "Ganador 89", visita: "Ganador 90" }, { id: 98, fase: "4tos", local: "Ganador 93", visita: "Ganador 94" },
    { id: 99, fase: "4tos", local: "Ganador 91", visita: "Ganador 92" }, { id: 100, fase: "4tos", local: "Ganador 95", visita: "Ganador 96" },
    // Semis, 3ero y Final
    { id: 101, fase: "Semis", local: "Ganador 97", visita: "Ganador 98" }, { id: 102, fase: "Semis", local: "Ganador 99", visita: "Ganador 100" },
    { id: 103, fase: "3er Puesto", local: "Perdedor 101", visita: "Perdedor 102" }, { id: 104, fase: "FINAL", local: "Ganador 101", visita: "Ganador 102" }
];
eliminatorias.forEach(e => partidosData.push(e));

// 2. FUNCIÓN DE ACTUALIZACIÓN (CÁLCULO EN CASCADA)
function actualizarTorneo() {
    const grupos = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
    let clasificados = {};
    let terceros = [];

    // Lógica Grupos
    grupos.forEach(letra => {
        let tabla = {};
        partidosData.filter(p => p.grupo === letra).forEach(p => {
            const gL = parseInt(document.getElementById(`L-${p.id}`)?.value);
            const gV = parseInt(document.getElementById(`V-${p.id}`)?.value);
            if (!tabla[p.local]) tabla[p.local] = { n: p.local, pts: 0, dg: 0 };
            if (!tabla[p.visita]) tabla[p.visita] = { n: p.visita, pts: 0, dg: 0 };
            if (!isNaN(gL) && !isNaN(gV)) {
                tabla[p.local].dg += (gL - gV); tabla[p.visita].dg += (gV - gL);
                if (gL > gV) tabla[p.local].pts += 3;
                else if (gV > gL) tabla[p.visita].pts += 3;
                else { tabla[p.local].pts += 1; tabla[p.visita].pts += 1; }
            }
        });
        const rank = Object.values(tabla).sort((a,b) => b.pts - a.pts || b.dg - a.dg);
        if (rank.length >= 2) {
            clasificados[`1${letra}`] = rank[0].n;
            clasificados[`2${letra}`] = rank[1].n;
            if (rank[2]) terceros.push({ n: rank[2].n, pts: rank[2].pts, dg: rank[2].dg });
        }
    });

    // Mejores Terceros (Top 8)
    terceros.sort((a,b) => b.pts - a.pts || b.dg - a.dg).slice(0, 8).forEach((t, i) => {
        clasificados[`3T${i+1}`] = t.n;
    });

    // Envío a 16vos
    const mapeo16vos = [
        { id: 73, L: "2A", V: "2B" }, { id: 74, L: "1C", V: "2F" }, { id: 75, L: "1E", V: "3T1" },
        { id: 76, L: "1F", V: "2C" }, { id: 77, L: "2E", V: "2I" }, { id: 78, L: "1I", V: "3T2" },
        { id: 79, L: "1A", V: "3T3" }, { id: 80, L: "1L", V: "3T4" }, { id: 81, L: "1G", V: "3T5" },
        { id: 82, L: "1D", V: "3T6" }, { id: 83, L: "1H", V: "2J" }, { id: 84, L: "2K", V: "2L" },
        { id: 85, L: "1B", V: "3T7" }, { id: 86, L: "2D", V: "2G" }, { id: 87, L: "1J", V: "2H" }, { id: 88, L: "1K", V: "3T8" }
    ];

    mapeo16vos.forEach(m => {
        ponerNombre(m.id, 'L', clasificados[m.L] || m.L);
        ponerNombre(m.id, 'V', clasificados[m.V] || m.V);
    });

    // Cadena de avance automática (Ganadores)
    const saltos = [
        { de: 73, a: 89, p: 'L' }, { de: 75, a: 89, p: 'V' }, { de: 74, a: 90, p: 'L' }, { de: 77, a: 90, p: 'V' },
        { de: 76, a: 91, p: 'L' }, { de: 78, a: 91, p: 'V' }, { de: 79, a: 92, p: 'L' }, { de: 80, a: 92, p: 'V' },
        { de: 83, a: 93, p: 'L' }, { de: 84, a: 93, p: 'V' }, { de: 81, a: 94, p: 'L' }, { de: 82, a: 94, p: 'V' },
        { de: 86, a: 95, p: 'L' }, { de: 88, a: 95, p: 'V' }, { de: 85, a: 96, p: 'L' }, { de: 87, a: 96, p: 'V' },
        // A 4tos
        { de: 89, a: 97, p: 'L' }, { de: 90, a: 97, p: 'V' }, { de: 93, a: 98, p: 'L' }, { de: 94, a: 98, p: 'V' },
        { de: 91, a: 99, p: 'L' }, { de: 92, a: 99, p: 'V' }, { de: 95, a: 100, p: 'L' }, { de: 96, a: 100, p: 'V' },
        // A Semis y Final
        { de: 97, a: 101, p: 'L' }, { de: 98, a: 101, p: 'V' }, { de: 99, a: 102, p: 'L' }, { de: 100, a: 102, p: 'V' },
        { de: 101, a: 104, p: 'L' }, { de: 102, a: 104, p: 'V' }
    ];

    saltos.forEach(s => {
        ponerNombre(s.a, s.p, sacarGanador(s.de));
    });
}

// 3. FUNCIONES AUXILIARES
function ponerNombre(id, lado, nombre) {
    const input = document.getElementById(`${lado}-${id}`);
    if (input) {
        const card = input.closest('.partido-card');
        card.querySelector(lado === 'L' ? '.local' : '.visita').innerText = nombre;
    }
}

function sacarGanador(id) {
    const l = parseInt(document.getElementById(`L-${id}`)?.value);
    const v = parseInt(document.getElementById(`V-${id}`)?.value);
    if (isNaN(l) || isNaN(v)) return `Ganador ${id}`;
    const card = document.getElementById(`L-${id}`).closest('.partido-card');
    return l > v ? card.querySelector('.local').innerText : card.querySelector('.visita').innerText;
}

// 4. RENDER INICIAL
function render() {
    const cont = document.getElementById("fixture-container");
    cont.innerHTML = "";
    partidosData.forEach(p => {
        const div = document.createElement("div");
        div.className = "partido-card";
        div.innerHTML = `
            <div class="card-header">${p.fase} ${p.grupo || ''}</div>
            <div class="card-body">
                <span class="equipo-col local">${p.local}</span>
                <div class="marcador-col">
                    <input type="number" id="L-${p.id}" oninput="actualizarTorneo()">
                    <input type="number" id="V-${p.id}" oninput="actualizarTorneo()">
                </div>
                <span class="equipo-col visita">${p.visita}</span>
            </div>`;
        cont.appendChild(div);
    });
}

window.onload = render;

