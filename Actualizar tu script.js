const API_URL = "http://localhost:3000";

async function guardarQuinielaCompleta() {
    const nombre = document.getElementById('nombre-usuario').value;
    if (!nombre) return alert("Escribe un nombre");

    const predicciones = [];
    partidosData.forEach(p => {
        const gl = document.getElementById(`L-${p.id}`).value;
        const gv = document.getElementById(`V-${p.id}`).value;
        if (gl !== "" && gv !== "") {
            predicciones.push({ id: p.id, gl: parseInt(gl), gv: parseInt(gv) });
        }
    });

    const response = await fetch(`${API_URL}/guardar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, predicciones })
    });

    const resData = await response.json();
    if (resData.error) alert(resData.error);
    else {
        alert(resData.mensaje);
        actualizarListaLinks();
    }
}

async function actualizarListaLinks() {
    const container = document.getElementById('links-container');
    container.innerHTML = "Cargando...";
    
    const response = await fetch(`${API_URL}/registros`);
    const registros = await response.json();
    
    container.innerHTML = "";
    registros.forEach(reg => {
        const link = document.createElement('button');
        link.textContent = reg.nombre_usuario;
        link.className = "btn-link"; // Dale estilo en CSS
        link.onclick = () => cargarDesdeDB(reg.nombre_usuario);
        container.appendChild(link);
    });
}

async function cargarDesdeDB(nombre) {
    const response = await fetch(`${API_URL}/cargar/${nombre}`);
    const datos = await response.json();
    
    // Limpiar campos
    document.querySelectorAll('input[type="number"]').forEach(i => i.value = "");
    
    // Llenar con datos de la DB
    datos.forEach(d => {
        const inputL = document.getElementById(`L-${d.id}`);
        const inputV = document.getElementById(`V-${d.id}`);
        if(inputL) inputL.value = d.gl;
        if(inputV) inputV.value = d.gv;
    });
    document.getElementById('nombre-usuario').value = nombre;
}

// Llamar al cargar la página
window.onload = () => {
    cargarQuiniela();
    actualizarListaLinks();
};