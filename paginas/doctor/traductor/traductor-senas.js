const salida = document.querySelector("[data-traduccion]");

document.querySelectorAll("[data-frase]").forEach((boton) => {
  boton.addEventListener("click", () => {
    if (salida) salida.textContent = boton.dataset.frase;
  });
});
