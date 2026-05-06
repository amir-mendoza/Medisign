const baseDatosUsuarios = {
  71234567: {
    nombre: "Juan Carlos Perez Garcia",
    fecha: "14/08/1998",
  },
  76543210: {
    nombre: "Maria Fernanda Lopez Rojas",
    fecha: "22/03/2001",
  },
};

const dni = document.getElementById("dni");
const nombre = document.getElementById("nombre");
const fecha = document.getElementById("fecha");
const celular = document.getElementById("celular");

const estadoDni = document.getElementById("estado-dni");
const estadoDatos = document.getElementById("estado-datos");
const estadoCelular = document.getElementById("estado-celular");

function marcarEstado(elemento, estado) {
  elemento.classList.remove("correcto", "error");

  if (estado === "correcto") {
    elemento.classList.add("correcto");
  }

  if (estado === "error") {
    elemento.classList.add("error");
  }
}

dni.addEventListener("input", function () {
  const valorDni = dni.value.trim();

  nombre.value = "";
  fecha.value = "";
  marcarEstado(estadoDni, "");
  marcarEstado(estadoDatos, "");

  if (valorDni.length === 0) {
    return;
  }

  if (valorDni.length !== 8 || isNaN(valorDni)) {
    marcarEstado(estadoDni, "error");
    marcarEstado(estadoDatos, "error");
    return;
  }

  marcarEstado(estadoDni, "correcto");

  if (baseDatosUsuarios[valorDni]) {
    nombre.value = baseDatosUsuarios[valorDni].nombre;
    fecha.value = baseDatosUsuarios[valorDni].fecha;
    marcarEstado(estadoDatos, "correcto");
  } else {
    marcarEstado(estadoDatos, "error");
  }
});

celular.addEventListener("input", function () {
  const valorCelular = celular.value.trim();
  const celularValido = /^(\+51\s?)?9\d{8}$/.test(valorCelular);

  if (valorCelular.length === 0) {
    marcarEstado(estadoCelular, "");
    return;
  }

  if (celularValido) {
    marcarEstado(estadoCelular, "correcto");
  } else {
    marcarEstado(estadoCelular, "error");
  }
});
