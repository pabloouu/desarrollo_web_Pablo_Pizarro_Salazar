"use strict";

var RE_HORA = /^([01][0-9]|2[0-3]):[0-5][0-9]$/;

var ANTIGUEDAD_MAXIMA_ANIOS = 5;
var MAXIMO_ARCHIVOS = 5;
var TAMANIO_MAXIMO_MB = 25;
var EXTENSIONES = ["jpg", "jpeg", "png", "webp", "mp4", "webm"];

function validarCantidad(valor) {

    var limpio = valor.trim();

    if (limpio === "") {
        return "Indique la cantidad de ejemplares.";
    }
    if (!/^[0-9]+$/.test(limpio)) {
        return "Debe ser un número entero, sin decimales ni letras.";
    }

    var n = Number(limpio);
    if (n < 1 || n > 5000) {
        return "Debe estar entre 1 y 5000.";
    }
    return null;
}

function validarFechaAvistamiento(valor) {

    if (valor.trim() === "") {
        return "La fecha del avistamiento es obligatoria.";
    }

    var fecha = aFecha(valor);
    if (fecha === null) {
        return "Esa fecha no existe en el calendario.";
    }

    var actual = hoy();

    if (fecha > actual) {
        return "La fecha no puede estar en el futuro.";
    }

    var limite = new Date(actual.getFullYear() - ANTIGUEDAD_MAXIMA_ANIOS,
                          actual.getMonth(), actual.getDate());

    if (fecha < limite) {
        return "No se aceptan avistamientos con más de "
            + ANTIGUEDAD_MAXIMA_ANIOS + " años de antigüedad.";
    }
    return null;
}

function validarHoraAvistamiento(valor) {

    var limpio = valor.trim();

    if (limpio === "") {
        return "La hora del avistamiento es obligatoria.";
    }
    if (!RE_HORA.test(limpio)) {
        return "Ingrese una hora válida en formato HH:MM (24 horas).";
    }

    var fecha = aFecha(document.getElementById("fecha").value);

    if (fecha === null || fecha.getTime() !== hoy().getTime()) {
        return null;
    }

    var ahora = new Date();
    var partes = limpio.split(":");
    var minutosInformados = Number(partes[0]) * 60 + Number(partes[1]);
    var minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();

    if (minutosInformados > minutosActuales) {
        return "El avistamiento es de hoy: la hora no puede ser posterior a la actual.";
    }
    return null;
}

function validarEvidencia() {

    var archivos = document.getElementById("evidencia").files;

    if (archivos.length === 0) {
        return "Debe adjuntar al menos una foto o un video del avistamiento.";
    }
    if (archivos.length > MAXIMO_ARCHIVOS) {
        return "Puede adjuntar como máximo " + MAXIMO_ARCHIVOS + " archivos.";
    }

    for (var i = 0; i < archivos.length; i = i + 1) {

        var archivo = archivos[i];
        var extension = archivo.name.split(".").pop().toLowerCase();

        if (EXTENSIONES.indexOf(extension) === -1) {
            return "El archivo " + archivo.name + " no tiene un formato aceptado ("
                + EXTENSIONES.join(", ") + ").";
        }
        if (archivo.size > TAMANIO_MAXIMO_MB * 1024 * 1024) {
            return "El archivo " + archivo.name + " supera los "
                + TAMANIO_MAXIMO_MB + " MB.";
        }
    }
    return null;
}

function validarObservaciones(valor) {

    if (valor.trim() === "") {
        return null;
    }
    if (valor.trim().length > 500) {
        return "No puede superar los 500 caracteres.";
    }
    return null;
}

function validarFormularioAvistamiento() {

    var campos = [
        ["correo-voluntario", validarCorreo],
        ["tipo-ave",          validarSeleccion],
        ["cantidad",          validarCantidad],
        ["region",            validarSeleccion],
        ["comuna",            validarSeleccion],
        ["fecha",             validarFechaAvistamiento],
        ["hora",              validarHoraAvistamiento],
        ["obs",               validarObservaciones]
    ];

    var primerError = null;

    for (var i = 0; i < campos.length; i = i + 1) {

        var id = campos[i][0];
        var regla = campos[i][1];
        var mensaje = regla(document.getElementById(id).value);

        if (mensaje !== null) {
            mostrarError(id, mensaje);
            if (primerError === null) {
                primerError = id;
            }
        }
    }

    var mensajeNombre = validarTexto(document.getElementById("nombre-ave").value, 3, 60);
    if (mensajeNombre !== null) {
        mostrarError("nombre-ave", mensajeNombre);
        if (primerError === null) { primerError = "nombre-ave"; }
    }

    var mensajeLugar = validarTexto(document.getElementById("lugar").value, 5, 120);
    if (mensajeLugar !== null) {
        mostrarError("lugar", mensajeLugar);
        if (primerError === null) { primerError = "lugar"; }
    }

    var mensajeEvidencia = validarEvidencia();
    if (mensajeEvidencia !== null) {
        mostrarError("evidencia", mensajeEvidencia);
        if (primerError === null) { primerError = "evidencia"; }
    }

    return primerError;
}

function textoConfirmacionAvistamiento() {

    function valor(id) {
        return document.getElementById(id).value.trim();
    }

    var archivos = document.getElementById("evidencia").files.length;

    return "Avistamiento validado: " + valor("cantidad") + " ejemplar(es) de "
        + valor("nombre-ave") + " en " + valor("lugar") + ", " + valor("comuna")
        + ", " + valor("region") + ", el " + formatoFecha(valor("fecha"))
        + " a las " + valor("hora") + " h. Informado por " + valor("correo-voluntario")
        + " con " + archivos + " archivo(s) de respaldo.";
}

function acotarFecha() {

    var campo = document.getElementById("fecha");
    var actual = hoy();
    var limite = new Date(actual.getFullYear() - ANTIGUEDAD_MAXIMA_ANIOS,
                          actual.getMonth(), actual.getDate());

    campo.max = aTextoISO(actual);
    campo.min = aTextoISO(limite);
}

function aTextoISO(fecha) {

    var mes = String(fecha.getMonth() + 1);
    var dia = String(fecha.getDate());

    if (mes.length === 1) { mes = "0" + mes; }
    if (dia.length === 1) { dia = "0" + dia; }

    return fecha.getFullYear() + "-" + mes + "-" + dia;
}

function listarArchivos() {

    var lista = document.getElementById("lista-archivos");
    var archivos = document.getElementById("evidencia").files;

    lista.innerHTML = "";

    for (var i = 0; i < archivos.length; i = i + 1) {

        var archivo = archivos[i];
        var peso;

        if (archivo.size >= 1024 * 1024) {
            peso = (archivo.size / (1024 * 1024)).toFixed(2) + " MB";
        } else {
            peso = Math.round(archivo.size / 1024) + " KB";
        }

        var li = document.createElement("li");
        li.textContent = archivo.name + " (" + peso + ")";
        lista.appendChild(li);
    }
}

document.addEventListener("DOMContentLoaded", function () {

    var formulario = document.getElementById("form-registrar-avistamiento");

    if (formulario === null) {
        return;
    }

    acotarFecha();
    contadorCaracteres("obs", "contador-obs", 500);

    document.getElementById("evidencia").addEventListener("change", listarArchivos);

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();
        limpiarErrores();

        var mensajeFinal = document.getElementById("mensaje-final");
        mensajeFinal.textContent = "";
        mensajeFinal.className = "";

        var primerError = validarFormularioAvistamiento();

        if (primerError !== null) {
            document.getElementById(primerError).focus();
            return;
        }

        mensajeFinal.textContent = textoConfirmacionAvistamiento();
        mensajeFinal.className = "mensaje-exito";
    });

    formulario.addEventListener("reset", function () {
        limpiarErrores();
        document.getElementById("mensaje-final").textContent = "";
        document.getElementById("lista-archivos").innerHTML = "";
    });
});