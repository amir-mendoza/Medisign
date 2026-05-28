const pacientes = {
  lucia: {
    nombre: "Lucia Fernandez",
    dni: "71234567",
    condicion: "Paciente sordomuda",
    especialidad: "Medicina general",
    motivo: "Dolor de garganta y malestar general"
  },
  marco: {
    nombre: "Marco Salazar",
    dni: "76543210",
    condicion: "Paciente regular",
    especialidad: "Neumologia",
    motivo: "Evaluacion respiratoria"
  },
  rosa: {
    nombre: "Rosa Huaman",
    dni: "73450192",
    condicion: "Paciente sordomuda",
    especialidad: "Dermatologia",
    motivo: "Irritacion en piel"
  },
  diego: {
    nombre: "Diego Ramos",
    dni: "70124590",
    condicion: "Paciente regular",
    especialidad: "Medicina general",
    motivo: "Primera consulta"
  }
};

const agendaBase = [
  ["09:00", "lucia"],
  ["09:45", "marco"],
  ["10:30", "rosa"],
  ["11:15", "diego"],
  ["12:00", "lucia"]
];

const nombresMes = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

let fechaActiva = new Date(2026, 4, 28);
let diaSeleccionado = 28;

function getAgendaDelDia(dia) {
  const cantidad = (dia % 4) + 2;
  return agendaBase.slice(0, cantidad);
}

function getTipoDia(dia) {
  const agenda = getAgendaDelDia(dia);
  const tieneSenas = agenda.some(([, key]) => pacientes[key].condicion.includes("sordomuda"));
  if (agenda.length >= 5) return "lleno";
  if (tieneSenas) return "senas";
  return "normal";
}

function etiquetaPaciente(paciente) {
  if (paciente.condicion.includes("sordomuda")) {
    return '<span class="etiqueta etiqueta-azul">Senas</span>';
  }
  return '<span class="etiqueta etiqueta-normal">Regular</span>';
}

function renderAgenda(dia) {
  const titulo = document.querySelector("[data-dia-seleccionado]");
  const lista = document.querySelector("[data-lista-pacientes-dia]");
  if (!titulo || !lista) return;

  const agenda = getAgendaDelDia(Number(dia));
  titulo.textContent = `Dia ${dia} - ${agenda.length} pacientes asignados`;
  lista.innerHTML = agenda.map(([hora, key]) => {
    const paciente = pacientes[key];
    return `
      <a class="paciente-card" href="../pacientes/detalle-paciente.html?paciente=${key}">
        <div class="hora">${hora}</div>
        <div>
          <strong>${paciente.nombre}</strong>
          <span>${paciente.dni} - ${paciente.condicion}</span>
          <small>${paciente.especialidad}: ${paciente.motivo}</small>
        </div>
        ${etiquetaPaciente(paciente)}
      </a>
    `;
  }).join("");
}

function renderCalendario() {
  const year = fechaActiva.getFullYear();
  const month = fechaActiva.getMonth();
  const totalDias = new Date(year, month + 1, 0).getDate();
  const primerDia = new Date(year, month, 1).getDay();
  const inicioLunes = (primerDia + 6) % 7;
  const contenedor = document.querySelector("[data-calendario-dias]");
  const titulo = document.querySelector("[data-calendario-titulo]");
  const periodo = document.querySelector("[data-calendario-periodo]");
  const total = document.querySelector("[data-calendario-total]");

  if (!contenedor) return;

  titulo.textContent = `Calendario de ${nombresMes[month]} ${year}`;
  periodo.textContent = `${nombresMes[month]} ${year}`;
  total.textContent = `${totalDias} dias`;
  contenedor.innerHTML = "";

  for (let i = 0; i < inicioLunes; i++) {
    const vacio = document.createElement("div");
    vacio.className = "dia-vacio";
    contenedor.appendChild(vacio);
  }

  for (let dia = 1; dia <= totalDias; dia++) {
    const boton = document.createElement("button");
    const agenda = getAgendaDelDia(dia);
    boton.className = "dia-calendario";
    boton.dataset.dia = String(dia);
    boton.dataset.tipo = getTipoDia(dia);
    boton.innerHTML = `<strong>${dia}</strong><span>${agenda.length} pacientes</span>`;

    if (dia === diaSeleccionado) boton.classList.add("activo");
    if (year === 2026 && month === 4 && dia === 28) boton.classList.add("hoy");

    boton.addEventListener("click", () => {
      diaSeleccionado = dia;
      document.querySelectorAll(".dia-calendario").forEach((item) => item.classList.remove("activo"));
      boton.classList.add("activo");
      renderAgenda(dia);
    });

    contenedor.appendChild(boton);
  }

  if (diaSeleccionado > totalDias) diaSeleccionado = totalDias;
  renderAgenda(diaSeleccionado);
}

document.querySelector("[data-mes-anterior]")?.addEventListener("click", () => {
  fechaActiva = new Date(fechaActiva.getFullYear(), fechaActiva.getMonth() - 1, 1);
  diaSeleccionado = 1;
  renderCalendario();
});

document.querySelector("[data-mes-siguiente]")?.addEventListener("click", () => {
  fechaActiva = new Date(fechaActiva.getFullYear(), fechaActiva.getMonth() + 1, 1);
  diaSeleccionado = 1;
  renderCalendario();
});

renderCalendario();
