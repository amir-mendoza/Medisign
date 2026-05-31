const textoPaciente = document.querySelector("[data-texto-paciente]");
const fechaPaciente = document.querySelector("[data-fecha-paciente]");
const avatar = document.querySelector("[data-avatar]");
const detenerAnimacion = document.querySelector("[data-detener-animacion]");
const limpiarMensaje = document.querySelector("[data-limpiar-mensaje]");

const renderMensaje = ({ mensaje, fecha }) => {
  if (!mensaje) return;

  textoPaciente.textContent = mensaje;
  fechaPaciente.textContent = `Actualizado: ${new Date(fecha || Date.now()).toLocaleTimeString("es-PE", {
    hour: "2-digit",
    minute: "2-digit"
  })}`;
};

const ultimoMensaje = localStorage.getItem("medisignMensajeDoctor");

if (ultimoMensaje) {
  renderMensaje(JSON.parse(ultimoMensaje));
}

if ("BroadcastChannel" in window) {
  const canal = new BroadcastChannel("medisign-paciente");
  canal.addEventListener("message", (event) => renderMensaje(event.data));
}

window.addEventListener("storage", (event) => {
  if (event.key === "medisignMensajeDoctor" && event.newValue) {
    renderMensaje(JSON.parse(event.newValue));
  }
});

detenerAnimacion.addEventListener("click", () => {
  avatar.classList.toggle("detener");
  detenerAnimacion.textContent = avatar.classList.contains("detener") ? "Reanudar animacion" : "Detener animacion";
});

limpiarMensaje.addEventListener("click", () => {
  textoPaciente.textContent = "Esperando indicacion del doctor.";
  fechaPaciente.textContent = "La pantalla se actualizara en tiempo real cuando el doctor escriba, dicte o use un atajo.";
});
