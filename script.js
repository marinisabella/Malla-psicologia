const materias = [
  { codigo: "ESP-22062", nombre: "Procesos psicológicos I", semestre: 1, pre: [] },
  { codigo: "ESP-22063", nombre: "Procesos psicológicos II", semestre: 2, pre: ["ESP-22062"] },
  { codigo: "ESP-22064", nombre: "Procesos psicológicos III", semestre: 3, pre: ["ESP-22063"] },
  { codigo: "ESP-22006", nombre: "Psicología del desarrollo I", semestre: 3, pre: [] },
  { codigo: "ESP-22010", nombre: "Psicología del desarrollo II", semestre: 4, pre: ["ESP-22006"] },
  { codigo: "ESP-22044", nombre: "Fundamentos de Psicopatología", semestre: 5, pre: ["ESP-22010", "ESP-22064"] },
  { codigo: "ESP-22115", nombre: "Psicología clínica y de la salud I", semestre: 6, pre: ["ESP-22044"] },
  { codigo: "ESP-22121", nombre: "Psicología clínica y de la salud II", semestre: 7, pre: ["ESP-22115"] },
  { codigo: "ESP-22126", nombre: "Práctica clínica", semestre: 9, pre: ["ESP-22121"] },
  { codigo: "ESP-22127", nombre: "Práctica profesional y supervisión", semestre: 10, pre: ["ESP-22126"] }
];

const estado = {}; // Guarda si cada materia fue aprobada

function crearMalla() {
  const contenedor = document.getElementById('malla');
  materias.forEach(m => {
    const div = document.createElement('div');
    div.className = 'ramo bloqueado';
    div.id = m.codigo;
    div.innerHTML = `<strong>${m.nombre}</strong><br><small>${m.codigo}</small>`;
    div.onclick = () => manejarClick(m.codigo);
    contenedor.appendChild(div);
    estado[m.codigo] = false;
  });
  actualizarEstados();
}

function manejarClick(codigo) {
  const materia = materias.find(m => m.codigo === codigo);
  if (!materia || !puedeAprobar(materia)) return;

  estado[codigo] = !estado[codigo];
  actualizarEstados();
}

function puedeAprobar(materia) {
  return materia.pre.every(pr => estado[pr]);
}

function actualizarEstados() {
  materias.forEach(m => {
    const div = document.getElementById(m.codigo);
    if (estado[m.codigo]) {
      div.className = 'ramo aprobado';
    } else if (puedeAprobar(m)) {
      div.className = 'ramo';
    } else {
      div.className = 'ramo bloqueado';
    }
  });
}

crearMalla();
