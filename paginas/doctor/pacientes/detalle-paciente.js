const pacientes = {
  lucia: {
    nombre: "Lucia Fernandez Quispe",
    dni: "71234567",
    edad: "27",
    bmi: "23.4",
    condicion: "Paciente sordomuda",
    especialidad: "Dermatología",
    motivo: "Tratamiento de manchas",
    diagnostico: "Manchas faciales superficiales. Se recomienda control dermatologico y proteccion solar estricta.",
    historial: [
      ["31 May", "Consulta dermatológica", "Evaluacion de manchas y sensibilidad facial."],
      ["12 May", "Registro facial validado", "Identidad confirmada en el modulo de acceso de pacientes."],
      ["04 May", "Observacion medica", "Paciente reporta irritacion leve posterior a limpieza facial."]
    ],
    pendientes: ["Confirmar alergias", "Revisar tolerancia a productos tópicos", "Registrar evolucion al cierre"]
  },
  marco: {
    nombre: "Marco Salazar Rojas",
    dni: "76543210",
    edad: "34",
    bmi: "26.1",
    condicion: "Paciente regular",
    especialidad: "Dermatología",
    motivo: "Revisión dermatológica",
    diagnostico: "Lesiones leves sin signos de alarma. Requiere seguimiento y control preventivo.",
    historial: [
      ["31 May", "Consulta programada", "Revision dermatologica de control."],
      ["10 May", "Control previo", "Se recomendo hidratacion y observacion de lesiones."],
      ["21 Abr", "Admision", "Paciente registrado por ingreso manual."]
    ],
    pendientes: ["Revisar lesiones nuevas", "Actualizar indicaciones", "Programar control"]
  },
  rosa: {
    nombre: "Rosa Huaman Torres",
    dni: "73450192",
    edad: "41",
    bmi: "24.7",
    condicion: "Paciente sordomuda",
    especialidad: "Dermatología",
    motivo: "Acné severo",
    diagnostico: "Acne inflamatorio persistente. Necesita tratamiento progresivo y explicacion visual de indicaciones.",
    historial: [
      ["31 May", "Consulta programada", "Revision dermatologica con apoyo de traductor visual."],
      ["18 May", "Registro de sintomas", "Paciente indico dolor e inflamacion mediante modulo de señas."],
      ["02 May", "Actualizacion", "Se agrego nota de sensibilidad cutanea."]
    ],
    pendientes: ["Confirmar zona afectada", "Revisar tratamiento anterior", "Anotar evolucion"]
  },
  diego: {
    nombre: "Diego Ramos Castillo",
    dni: "70124590",
    edad: "22",
    bmi: "21.9",
    condicion: "Paciente regular",
    especialidad: "Dermatología",
    motivo: "Limpieza facial",
    diagnostico: "Evaluacion inicial para limpieza facial. No presenta historial dermatologico previo.",
    historial: [
      ["31 May", "Primera consulta", "Paciente asignado al turno de mañana."],
      ["27 May", "Pre registro", "Datos basicos validados en admision."]
    ],
    pendientes: ["Completar antecedentes", "Evaluar tipo de piel", "Registrar diagnostico inicial"]
  }
};

let anotaciones = [
  {
    id: crearId(),
    titulo: "Control post tratamiento",
    fecha: "2026-05-25",
    modificado: "2026-05-29",
    descripcion: "Paciente refiere mejoria posterior al tratamiento inicial. Mantiene leve sensibilidad en mejillas.",
    diagnostico: "Evolucion favorable de manchas superficiales.",
    tratamiento: "Continuar protector solar y crema nocturna por 14 dias.",
    observaciones: "Evitar exfoliacion agresiva.",
    estado: "En seguimiento",
    doctor: "Dr. Carlos Rivas"
  },
  {
    id: crearId(),
    titulo: "Control dermatológico inicial",
    fecha: "2026-05-12",
    modificado: "2026-05-12",
    descripcion: "Primera revision dermatologica. Se observa irritacion leve y resequedad.",
    diagnostico: "Dermatitis leve por producto cosmetico.",
    tratamiento: "Suspender producto irritante e hidratar la zona.",
    observaciones: "Revisar evolucion en siguiente cita.",
    estado: "Finalizado",
    doctor: "Dr. Carlos Rivas"
  }
];

let anotacionSeleccionada = anotaciones[0]?.id;
let modoVista = "rows";
let editandoId = null;

function crearId() {
  if (window.crypto?.randomUUID) return window.crypto.randomUUID();
  return `nota-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function formatFecha(fecha) {
  return new Date(`${fecha}T00:00:00`).toLocaleDateString("es-PE");
}

function fechaActualInput() {
  const hoy = new Date();
  return `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;
}

function renderPaciente() {
  const params = new URLSearchParams(window.location.search);
  const key = params.get("paciente") || "lucia";
  const paciente = pacientes[key] || pacientes.lucia;

  document.querySelectorAll("[data-paciente-nombre]").forEach((item) => item.textContent = paciente.nombre);
  document.querySelectorAll("[data-paciente-condicion]").forEach((item) => item.textContent = paciente.condicion);

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
      <div><strong>${titulo}</strong><p>${texto}</p></div>
    </div>
  `).join("");
  document.querySelector("[data-pendientes]").innerHTML = paciente.pendientes.map((pendiente) => `<p class="diagnostico">${pendiente}</p>`).join("");
}

function archivoTemplate(anotacion) {
  return `
    <div class="archivo-item ${anotacion.id === anotacionSeleccionada ? "activo" : ""}" data-id="${anotacion.id}">
      <div class="archivo-icono">DOC</div>
      <div class="archivo-contenido">
        <h4>${anotacion.titulo}</h4>
        <small>Creado: ${formatFecha(anotacion.fecha)}</small>
        <small>Modificado: ${formatFecha(anotacion.modificado || anotacion.fecha)}</small>
        <div class="archivo-estado">${anotacion.estado}</div>
      </div>
    </div>
  `;
}

function renderArchivos() {
  const lista = document.querySelector("[data-archivos-lista]");
  lista.className = `archivos-lista vista-${modoVista === "rows" ? "filas" : modoVista === "columns" ? "columnas" : "agrupada"}`;

  if (modoVista === "grouped") {
    const grupos = anotaciones.reduce((acc, item) => {
      const fecha = new Date(`${item.fecha}T00:00:00`);
      const clave = fecha.toLocaleDateString("es-PE", { month: "long", year: "numeric" });
      acc[clave] = acc[clave] || [];
      acc[clave].push(item);
      return acc;
    }, {});

    lista.innerHTML = Object.entries(grupos).map(([grupo, items]) => `
      <section class="grupo-anotaciones">
        <h4>${grupo}</h4>
        <small>${items.length} archivo(s)</small>
        ${items.map(archivoTemplate).join("")}
      </section>
    `).join("");
  } else {
    lista.innerHTML = anotaciones.map(archivoTemplate).join("");
  }

  lista.querySelectorAll("[data-id]").forEach((item) => {
    item.addEventListener("click", () => {
      anotacionSeleccionada = item.dataset.id;
      renderArchivos();
      renderPreview();
    });
  });
}

function renderPreview() {
  const anotacion = anotaciones.find((item) => item.id === anotacionSeleccionada);
  if (!anotacion) return;

  document.querySelector("[data-preview-titulo]").textContent = anotacion.titulo;
  document.querySelector("[data-preview-meta]").textContent = `${formatFecha(anotacion.fecha)} · Estado: ${anotacion.estado}`;
  document.querySelector("[data-preview-diagnostico]").textContent = anotacion.diagnostico;
  document.querySelector("[data-preview-descripcion]").textContent = `${anotacion.descripcion.slice(0, 120)}...`;
  document.querySelector("[data-preview-doctor]").textContent = anotacion.doctor;
}

function abrirFormulario(anotacion = null) {
  const modal = document.querySelector("[data-modal-anotacion]");
  const form = document.querySelector("[data-form-anotacion]");
  editandoId = anotacion?.id || null;
  document.querySelector("[data-modal-titulo]").textContent = anotacion ? "Editar Anotación" : "Nueva Anotación";

  form.titulo.value = anotacion?.titulo || "";
  form.fecha.value = anotacion?.fecha || fechaActualInput();
  form.descripcion.value = anotacion?.descripcion || "";
  form.diagnostico.value = anotacion?.diagnostico || "";
  form.tratamiento.value = anotacion?.tratamiento || "";
  form.observaciones.value = anotacion?.observaciones || "";
  form.estado.value = anotacion?.estado || "Pendiente";
  form.doctor.value = anotacion?.doctor || "Dr. Carlos Rivas";

  modal.classList.remove("oculto");
}

function cerrarFormulario() {
  document.querySelector("[data-modal-anotacion]").classList.add("oculto");
}

function verArchivo() {
  const anotacion = anotaciones.find((item) => item.id === anotacionSeleccionada);
  if (!anotacion) return;

  document.querySelector("[data-ver-titulo]").textContent = anotacion.titulo;
  document.querySelector("[data-ver-meta]").textContent = `${formatFecha(anotacion.fecha)} · ${anotacion.estado}`;
  document.querySelector("[data-ver-contenido]").innerHTML = `
    <article><strong>Descripción médica</strong><p>${anotacion.descripcion}</p></article>
    <article><strong>Diagnóstico</strong><p>${anotacion.diagnostico}</p></article>
    <article><strong>Tratamiento recomendado</strong><p>${anotacion.tratamiento}</p></article>
    <article><strong>Observaciones adicionales</strong><p>${anotacion.observaciones || "Sin observaciones adicionales."}</p></article>
    <article><strong>Doctor responsable</strong><p>${anotacion.doctor}</p></article>
  `;
  document.querySelector("[data-modal-ver]").classList.remove("oculto");
}

document.querySelector("[data-nueva-anotacion]").addEventListener("click", () => abrirFormulario());
document.querySelector("[data-cerrar-modal]").addEventListener("click", cerrarFormulario);
document.querySelector("[data-cancelar-modal]").addEventListener("click", cerrarFormulario);
document.querySelector("[data-cerrar-ver]").addEventListener("click", () => document.querySelector("[data-modal-ver]").classList.add("oculto"));
document.querySelector("[data-ver-anotacion]").addEventListener("click", verArchivo);
document.querySelector("[data-editar-anotacion]").addEventListener("click", () => abrirFormulario(anotaciones.find((item) => item.id === anotacionSeleccionada)));
document.querySelector("[data-eliminar-anotacion]").addEventListener("click", () => {
  if (!anotacionSeleccionada) return;
  if (!confirm("¿Está seguro de eliminar esta anotación médica?")) return;
  anotaciones = anotaciones.filter((item) => item.id !== anotacionSeleccionada);
  anotacionSeleccionada = anotaciones[0]?.id || null;
  renderArchivos();
  renderPreview();
});

document.querySelectorAll("[data-view]").forEach((boton) => {
  boton.addEventListener("click", () => {
    modoVista = boton.dataset.view;
    document.querySelectorAll("[data-view]").forEach((item) => item.classList.remove("activo"));
    boton.classList.add("activo");
    renderArchivos();
  });
});

document.querySelector("[data-form-anotacion]").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const datos = {
    id: editandoId || crearId(),
    titulo: form.titulo.value,
    fecha: form.fecha.value,
    modificado: fechaActualInput(),
    descripcion: form.descripcion.value,
    diagnostico: form.diagnostico.value,
    tratamiento: form.tratamiento.value,
    observaciones: form.observaciones.value,
    estado: form.estado.value,
    doctor: form.doctor.value
  };

  if (editandoId) {
    anotaciones = anotaciones.map((item) => item.id === editandoId ? datos : item);
  } else {
    anotaciones.unshift(datos);
  }

  anotacionSeleccionada = datos.id;
  cerrarFormulario();
  renderArchivos();
  renderPreview();
});

renderPaciente();
renderArchivos();
renderPreview();
