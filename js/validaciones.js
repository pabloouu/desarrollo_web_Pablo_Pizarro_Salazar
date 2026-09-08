"use strict";

var RE_NOMBRE = /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ ]+$/;
var RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
var RE_CELULAR = /^9[0-9]{8}$/;
var RE_RUT = /^([0-9]{7,8})-([0-9kK])$/;

function validarTexto(valor, minimo, maximo) {

    var limpio = valor.trim();

    if (limpio === "") {
        return "Este dato es obligatorio.";
    }
    if (limpio.length < minimo) {
        return "Debe tener al menos " + minimo + " caracteres.";
    }
    if (limpio.length > maximo) {
        return "No puede superar los " + maximo + " caracteres.";
    }
    return null;
}

function validarNombre(valor) {

    var mensaje = validarTexto(valor, 3, 60);
    if (mensaje !== null) {
        return mensaje;
    }
    if (!RE_NOMBRE.test(valor.trim())) {
        return "Use sólo letras y espacios.";
    }
    return null;
}

function validarCorreo(valor) {

    var limpio = valor.trim();

    if (limpio === "") {
        return "El correo es obligatorio.";
    }
    if (!RE_EMAIL.test(limpio)) {
        return "Formato de correo no válido. Ejemplo: nombre@dominio.cl";
    }
    return null;
}

function validarCelular(valor) {

    var limpio = valor.replace(/[\s()+-]/g, "");

    if (limpio === "") {
        return "El celular es obligatorio.";
    }
    if (limpio.indexOf("56") === 0 && limpio.length === 11) {
        limpio = limpio.substring(2);
    }
    if (!RE_CELULAR.test(limpio)) {
        return "Debe ser un celular de 9 dígitos que parte con 9. Ejemplo: 945623815";
    }
    return null;
}

function validarTelefonoFijo(valor) {

    var limpio = valor.replace(/[\s()+-]/g, "");

    if (limpio === "") {
        return null;
    }
    if (!/^[0-9]+$/.test(limpio)) {
        return "Sólo se aceptan dígitos y separadores.";
    }
    if (limpio.length < 8 || limpio.length > 12) {
        return "Debe tener entre 8 y 12 dígitos.";
    }
    return null;
}

function validarRut(valor) {

    var limpio = valor.replace(/[.\s]/g, "").toUpperCase();

    if (limpio === "") {
        return "El RUT es obligatorio.";
    }

    var partes = RE_RUT.exec(limpio);
    if (partes === null) {
        return "Formato de RUT no válido. Ejemplo: 12.345.678-9";
    }

    var cuerpo = partes[1];
    var digitoIngresado = partes[2].toUpperCase();

    var suma = 0;
    var multiplicador = 2;

    for (var i = cuerpo.length - 1; i >= 0; i = i - 1) {
        suma = suma + Number(cuerpo.charAt(i)) * multiplicador;
        multiplicador = (multiplicador === 7) ? 2 : multiplicador + 1;
    }

    var resto = 11 - (suma % 11);
    var digitoEsperado;

    if (resto === 11) {
        digitoEsperado = "0";
    } else if (resto === 10) {
        digitoEsperado = "K";
    } else {
        digitoEsperado = String(resto);
    }

    if (digitoIngresado !== digitoEsperado) {
        return "El dígito verificador no corresponde al RUT ingresado.";
    }
    return null;
}

function validarSeleccion(valor) {

    if (valor === "") {
        return "Debe seleccionar una opción.";
    }
    return null;
}

function aFecha(texto) {

    var partes = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(texto);
    if (partes === null) {
        return null;
    }

    var anio = Number(partes[1]);
    var mes = Number(partes[2]) - 1;
    var dia = Number(partes[3]);

    var f = new Date(anio, mes, dia);

    if (f.getFullYear() !== anio || f.getMonth() !== mes || f.getDate() !== dia) {
        return null;
    }

    f.setHours(0, 0, 0, 0);
    return f;
}

function hoy() {

    var f = new Date();
    f.setHours(0, 0, 0, 0);
    return f;
}

function formatoFecha(iso) {

    var partes = String(iso).split("-");
    if (partes.length !== 3) {
        return iso;
    }
    return partes[2] + "-" + partes[1] + "-" + partes[0];
}

function validarEdadMinima(valor, aniosMinimos) {

    if (valor.trim() === "") {
        return "La fecha de nacimiento es obligatoria.";
    }

    var nacimiento = aFecha(valor);
    if (nacimiento === null) {
        return "Esa fecha no existe en el calendario.";
    }

    var actual = hoy();

    if (nacimiento > actual) {
        return "La fecha de nacimiento no puede estar en el futuro.";
    }

    var edad = actual.getFullYear() - nacimiento.getFullYear();
    var mes = actual.getMonth() - nacimiento.getMonth();

    if (mes < 0 || (mes === 0 && actual.getDate() < nacimiento.getDate())) {
        edad = edad - 1;
    }

    if (edad < aniosMinimos) {
        return "Debe tener al menos " + aniosMinimos + " años para inscribirse.";
    }
    if (edad > 110) {
        return "Revise la fecha: la edad calculada no es razonable.";
    }
    return null;
}

function mostrarError(idCampo, mensaje) {

    document.getElementById("error-" + idCampo).textContent = mensaje;
    document.getElementById(idCampo).classList.add("campo-invalido");
}

function limpiarErrores() {

    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i = i + 1) {
        errores[i].textContent = "";
    }

    var invalidos = document.querySelectorAll(".campo-invalido");
    for (var j = 0; j < invalidos.length; j = j + 1) {
        invalidos[j].classList.remove("campo-invalido");
    }
}

function contadorCaracteres(idCampo, idContador, maximo) {

    var campo = document.getElementById(idCampo);
    var contador = document.getElementById(idContador);

    if (campo === null || contador === null) {
        return;
    }

    function actualizar() {
        contador.textContent = campo.value.length + " de " + maximo + " caracteres";
    }

    campo.addEventListener("input", actualizar);
    actualizar();
}