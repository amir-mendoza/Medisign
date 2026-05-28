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
    historial: [
      ["28 May", "Primera consulta", "Paciente asignado al turno de manana."],
      ["27 May", "Pre registro", "Datos basicos validados en admision."]
    ],
    pendientes: ["Completar antecedentes", "Tomar signos vitales", "Registrar diagnostico inicial"]
  }
};

function renderPaciente() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("paciente") || "lucia";
  const paciente = pacientes[key] || pacientes.lucia;

  document.querySelectorAll("[data-paciente-nombre]").forEach((item) => {
    item.textContent = paciente.nombre;
  });

  document.querySelectorAll("[data-paciente-condicion]").forEach((item) => {
    item.textContent = paciente.condicion;
  });

  document.querySelector("[data-paciente-detalle]").innerHTML = `
    <div><span>DNI</span><strong>${paciente.dni}</strong></div>
    <div><span>Edad</span><strong>${paciente.edad}</strong></div>
    <div><span>BMI</span><strong>${paciente.bmi}</strong></div>
    <div><span>Especialidad</span><strong>${paciente.especialidad}</strong></div>
    <div><span>Motivo</span><strong>${paciente.motivo}</strong></div>
  `;

  document.querySelector("[data-diagnostico]").textContent = paciente.diagnostico;

  document.querySelector("[data-historial]").innerHTML = paciente.historial.map(([fecha, titulo, texto]) => `
    <div class="historial-item">
      <time>${fecha}</time>
      <div>
        <strong>${titulo}</strong>
        <p>${texto}</p>
      </div>
    </div>
  `).join("");

  document.querySelector("[data-pendientes]").innerHTML = paciente.pendientes
    .map((pendiente) => `<p class="diagnostico">${pendiente}</p>`)
    .join("");
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

renderPaciente();
activarNotas();
