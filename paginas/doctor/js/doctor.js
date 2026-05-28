const pacientes = {
  lucia: {
    nombre: "Lucia Fernandez",
    dni: "71234567",
    edad: "27",
    bmi: "23.4",
    condicion: "Paciente sordomuda",
    especialidad: "Medicina general",
    motivo: "Dolor de garganta y malestar general",
    diagnostico: "Sintomas leves compatibles con infeccion respiratoria alta. Requiere control y explicacion visual de indicaciones.",
    etiqueta: "Requiere apoyo en senas",
    historial: [
      ["28 May", "Consulta programada", "Control general con soporte visual para comunicacion por senas."],
      ["12 May", "Registro facial validado", "Identidad confirmada en el modulo de acceso de pacientes."],
      ["04 May", "Observacion medica", "Paciente reporta dolor leve. Se recomienda seguimiento y descanso."]
    ],
    pendientes: ["Confirmar alergias", "Explicar tratamiento con apoyo visual", "Registrar evolucion al cierre"]
  },
  marco: {
    nombre: "Marco Salazar",
    dni: "76543210",
    edad: "34",
    bmi: "26.1",
    condicion: "Paciente regular",
    especialidad: "Neumologia",
    motivo: "Evaluacion respiratoria",
    diagnostico: "Tos persistente sin signos de alarma. Requiere control respiratorio y seguimiento.",
    etiqueta: "Atencion regular",
    historial: [
      ["28 May", "Consulta programada", "Evaluacion respiratoria en turno manana."],
      ["10 May", "Control previo", "Se solicito seguimiento por tos recurrente."],
      ["21 Abr", "Admision", "Paciente registrado por ingreso manual."]
    ],
    pendientes: ["Revisar saturacion", "Actualizar indicaciones", "Programar control"]
  },
  rosa: {
    nombre: "Rosa Huaman",
    dni: "73450192",
    edad: "41",
    bmi: "24.7",
    condicion: "Paciente sordomuda",
    especialidad: "Dermatologia",
    motivo: "Irritacion en piel",
    diagnostico: "Lesion dermatologica leve. Necesita indicaciones claras y confirmacion de comprension.",
    etiqueta: "Modulo de senas sugerido",
    historial: [
      ["28 May", "Consulta programada", "Revision dermatologica con apoyo de traductor visual."],
      ["18 May", "Registro de sintomas", "Paciente indico comezon mediante modulo de senas."],
      ["02 May", "Actualizacion", "Se agrego nota de sensibilidad cutanea."]
    ],
    pendientes: ["Confirmar zona afectada", "Revisar tratamiento anterior", "Anotar evolucion"]
  },
  diego: {
    nombre: "Diego Ramos",
    dni: "70124590",
    edad: "22",
    bmi: "21.9",
    condicion: "Paciente regular",
    especialidad: "Medicina general",
    motivo: "Primera consulta",
    diagnostico: "Evaluacion inicial pendiente. No presenta historial previo en el sistema.",
    etiqueta: "Nuevo paciente",
    historial: [
      ["28 May", "Primera consulta", "Paciente asignado al turno de manana."],
      ["27 May", "Pre registro", "Datos basicos validados en admision."]
    ],
    pendientes: ["Completar antecedentes", "Tomar signos vitales", "Registrar diagnostico inicial"]
  }
};

const agendaPorDia = {
  1: [["09:00", "lucia"], ["09:45", "marco"], ["10:30", "rosa"], ["11:15", "diego"]],
  2: [["08:30", "marco"], ["09:20", "lucia"], ["10:10", "diego"]],
  3: [["09:00", "rosa"], ["09:45", "lucia"], ["10:30", "marco"], ["12:00", "diego"]],
  4: [["08:00", "diego"], ["08:45", "marco"], ["09:30", "rosa"]],
  5: [["09:00", "lucia"], ["09:40", "rosa"], ["11:10", "marco"]],
  6: [["08:20", "diego"], ["10:00", "lucia"]],
  7: [["09:30", "marco"], ["10:20", "rosa"], ["11:00", "lucia"]],
  8: [["08:30", "lucia"], ["09:15", "marco"], ["10:00", "rosa"], ["10:45", "diego"]],
  9: [["09:00", "rosa"], ["11:00", "diego"]],
  10: [["08:00", "lucia"], ["08:45", "marco"], ["09:30", "rosa"], ["10:15", "diego"], ["11:00", "lucia"]],
  11: [["09:00", "marco"], ["10:30", "diego"]],
  12: [["08:40", "rosa"], ["09:30", "lucia"], ["10:20", "marco"]],
  13: [["09:10", "diego"], ["10:00", "rosa"]],
  14: [["08:30", "lucia"], ["09:15", "marco"], ["10:00", "rosa"]],
  15: [["09:00", "diego"], ["09:45", "lucia"], ["11:30", "marco"]],
  16: [["08:20", "rosa"], ["09:05", "lucia"], ["09:50", "diego"], ["10:35", "marco"]],
  17: [["09:00", "marco"], ["10:00", "rosa"]],
  18: [["08:40", "lucia"], ["09:30", "diego"], ["10:20", "rosa"]],
  19: [["09:00", "marco"], ["09:50", "lucia"], ["11:00", "diego"]],
  20: [["08:30", "rosa"], ["09:15", "marco"]],
  21: [["09:00", "lucia"], ["10:00", "rosa"], ["11:00", "diego"]],
  22: [["08:15", "marco"], ["09:00", "lucia"], ["09:45", "rosa"], ["10:30", "diego"]],
  23: [["09:20", "diego"], ["10:10", "marco"]],
  24: [["08:30", "lucia"], ["09:30", "rosa"], ["10:30", "marco"]],
  25: [["09:00", "diego"], ["09:45", "lucia"]],
  26: [["08:00", "marco"], ["08:45", "rosa"], ["09:30", "lucia"], ["11:00", "diego"]],
  27: [["09:00", "lucia"], ["10:00", "marco"]],
  28: [["09:00", "lucia"], ["09:45", "marco"], ["10:30", "rosa"], ["11:15", "diego"]],
  29: [["08:30", "rosa"], ["09:15", "lucia"], ["10:00", "marco"]],
  30: [["09:00", "diego"], ["09:45", "rosa"], ["10:30", "lucia"]]
};

function etiquetaPaciente(paciente) {
  if (paciente.condicion.includes("sordomuda")) return '<span class="etiqueta etiqueta-azul">Senas</span>';
  if (paciente.etiqueta.includes("Nuevo")) return '<span class="etiqueta etiqueta-alerta">Nuevo</span>';
  return '<span class="etiqueta etiqueta-normal">Regular</span>';
}

function renderAgenda(dia) {
  const titulo = document.querySelector("[data-dia-seleccionado]");
  const lista = document.querySelector("[data-lista-pacientes-dia]");
  if (!titulo || !lista) return;

  const citas = agendaPorDia[dia] || [];
  titulo.textContent = `Dia ${dia} - ${citas.length} pacientes asignados`;
  lista.innerHTML = citas.map(([hora, key]) => {
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

function activarCalendario() {
  const botones = document.querySelectorAll("[data-dia]");
  if (!botones.length) return;

  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      botones.forEach((item) => item.classList.remove("activo"));
      boton.classList.add("activo");
      renderAgenda(boton.dataset.dia);
    });
  });

  renderAgenda(28);
}

function renderPaciente() {
  const contenedor = document.querySelector("[data-paciente-detalle]");
  if (!contenedor) return;

  const params = new URLSearchParams(window.location.search);
  const key = params.get("paciente") || "lucia";
  const paciente = pacientes[key] || pacientes.lucia;

  document.querySelectorAll("[data-paciente-nombre]").forEach((item) => {
    item.textContent = paciente.nombre;
  });
  document.querySelectorAll("[data-paciente-condicion]").forEach((item) => {
    item.textContent = paciente.condicion;
  });

  contenedor.innerHTML = `
    <div><span>DNI</span><strong>${paciente.dni}</strong></div>
    <div><span>Edad</span><strong>${paciente.edad}</strong></div>
    <div><span>BMI</span><strong>${paciente.bmi}</strong></div>
    <div><span>Especialidad</span><strong>${paciente.especialidad}</strong></div>
    <div><span>Motivo</span><strong>${paciente.motivo}</strong></div>
  `;

  const diagnostico = document.querySelector("[data-diagnostico]");
  if (diagnostico) diagnostico.textContent = paciente.diagnostico;

  const historial = document.querySelector("[data-historial]");
  if (historial) {
    historial.innerHTML = paciente.historial.map(([fecha, titulo, texto]) => `
      <div class="historial-item">
        <time>${fecha}</time>
        <div>
          <strong>${titulo}</strong>
          <p>${texto}</p>
        </div>
      </div>
    `).join("");
  }

  const pendientes = document.querySelector("[data-pendientes]");
  if (pendientes) {
    pendientes.innerHTML = paciente.pendientes.map((pendiente) => `<p class="diagnostico">${pendiente}</p>`).join("");
  }
}

function activarNotas() {
  document.querySelectorAll("[data-action='delete']").forEach((boton) => {
    boton.addEventListener("click", () => {
      const nota = boton.closest(".nota");
      if (nota) nota.style.display = "none";
    });
  });

  document.querySelectorAll("[data-action='edit']").forEach((boton) => {
    boton.addEventListener("click", () => {
      const nota = boton.closest(".nota");
      const texto = nota ? nota.querySelector("p") : null;
      if (!texto) return;
      texto.contentEditable = "true";
      texto.focus();
      boton.textContent = "Guardado visual";
    });
  });
}

function activarTraductor() {
  const salida = document.querySelector("[data-traduccion]");
  document.querySelectorAll("[data-frase]").forEach((boton) => {
    boton.addEventListener("click", () => {
      if (salida) salida.textContent = boton.dataset.frase;
    });
  });
}

activarCalendario();
renderPaciente();
activarNotas();
activarTraductor();