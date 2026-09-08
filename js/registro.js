"use strict";

function validarCorreoRepetido(valor) {

    var original = document.getElementById("correo").value.trim();

    if (valor.trim() === "") {
        return "Debe repetir el correo.";
    }
    if (valor.trim().toLowerCase() !== original.toLowerCase()) {
        return "Los dos correos no coinciden.";
    }
    return null;
}

function validarExperiencia() {

    var marcado = document.querySelector("input[name='experiencia']:checked");

    if (marcado === null) {
        return "Escoja el nivel que mejor le represente.";
    }
    return null;
}

function validarIntereses() {

    var ids = ["interes-rapaces", "interes-acuaticas", "interes-marinas",
               "interes-terrestres", "interes-paseriformes", "interes-picaflores"];

    for (var i = 0; i < ids.length; i = i + 1) {
        if (document.getElementById(ids[i]).checked) {
            return null;
        }
    }
    return "Marque al menos un tipo de ave de interés.";
}

function validarConsentimiento() {

    if (!document.getElementById("consentimiento").checked) {
        return "Debe aceptar la declaración para inscribirse.";
    }
    return null;
}

function validarFormulario() {

    var campos = [
        ["nombres",         validarNombre],
        ["apellidos",       validarNombre],
        ["rut",             validarRut],
        ["correo",          validarCorreo],
        ["correo-rep",      validarCorreoRepetido],
        ["telefono",        validarCelular],
        ["telefono-fijo",   validarTelefonoFijo],
        ["region",          validarSeleccion],
        ["comuna",          validarSeleccion]
    ];

    var primerError = null;

    for (var i = 0; i < campos.length; i = i + 1) {

        var id = campos[i][0];
        var regla = campos[i][1];
        var valor = document.getElementById(id).value;
        var mensaje = regla(valor);

        if (mensaje !== null) {
            mostrarError(id, mensaje);
            if (primerError === null) {
                primerError = id;
            }
        }
    }

    var mensajeFecha = validarEdadMinima(
        document.getElementById("fecha-nacimiento").value, 14);
    if (mensajeFecha !== null) {
        mostrarError("fecha-nacimiento", mensajeFecha);
        if (primerError === null) { primerError = "fecha-nacimiento"; }
    }

    var mensajeDireccion = validarTexto(
        document.getElementById("direccion").value, 5, 120);
    if (mensajeDireccion !== null) {
        mostrarError("direccion", mensajeDireccion);
        if (primerError === null) { primerError = "direccion"; }
    }

    var mensajeExperiencia = validarExperiencia();
    if (mensajeExperiencia !== null) {
        document.getElementById("error-experiencia").textContent = mensajeExperiencia;
        if (primerError === null) { primerError = "experiencia-P"; }
    }

    var mensajeIntereses = validarIntereses();
    if (mensajeIntereses !== null) {
        document.getElementById("error-interes").textContent = mensajeIntereses;
        if (primerError === null) { primerError = "interes-rapaces"; }
    }

    var mensajeConsentimiento = validarConsentimiento();
    if (mensajeConsentimiento !== null) {
        document.getElementById("error-consentimiento").textContent = mensajeConsentimiento;
        if (primerError === null) { primerError = "consentimiento"; }
    }

    return primerError;
}

function textoConfirmacion() {

    function valor(id) {
        return document.getElementById(id).value.trim();
    }

    var nivel = document.querySelector("input[name='experiencia']:checked");

    return "Inscripción validada. " + valor("nombres") + " " + valor("apellidos")
        + ", RUT " + valor("rut") + ", correo " + valor("correo")
        + ", celular " + valor("telefono") + ". Dirección: " + valor("direccion")
        + ", " + valor("comuna") + ", " + valor("region")
        + ". Nivel: " + nivel.value + ".";
}

document.addEventListener("DOMContentLoaded", function () {

    var formulario = document.getElementById("form-registro");

    if (formulario === null) {
        return;
    }

    contadorCaracteres("obs", "contador-obs", 500);

    formulario.addEventListener("submit", function (evento) {

        evento.preventDefault();
        limpiarErrores();

        var mensajeFinal = document.getElementById("mensaje-final");
        mensajeFinal.textContent = "";
        mensajeFinal.className = "";

        var primerError = validarFormulario();

        if (primerError !== null) {
            document.getElementById(primerError).focus();
            return;
        }

        mensajeFinal.textContent = textoConfirmacion();
        mensajeFinal.className = "mensaje-exito";
    });

    formulario.addEventListener("reset", function () {
        limpiarErrores();
        document.getElementById("mensaje-final").textContent = "";
    });
});