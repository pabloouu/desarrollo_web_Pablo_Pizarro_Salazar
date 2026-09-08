"use strict";

var estado = {
    tipo: "todos",
    region: "",
    texto: "",
    desde: "",
    hasta: "",
    orden: "fecha-avistamiento-reciente",
    porPagina: 5,
    pagina: 1
};

function normalizar(texto) {

    return String(texto)
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filtrar(lista) {

    var resultado = [];

    for (var i = 0; i < lista.length; i = i + 1) {

        var a = lista[i];

        if (estado.tipo !== "todos" && normalizar(a.tipo) !== estado.tipo) {
            continue;
        }
        if (estado.region !== "" && a.region !== estado.region) {
            continue;
        }
        if (estado.desde !== "" && a.fecha < estado.desde) {
            continue;
        }
        if (estado.hasta !== "" && a.fecha > estado.hasta) {
            continue;
        }
        if (estado.texto !== "") {
            var donde = normalizar(a.especie + " " + a.lugar + " " + a.comuna + " " + a.region);
            if (donde.indexOf(normalizar(estado.texto)) === -1) {
                continue;
            }
        }
        resultado.push(a);
    }
    return resultado;
}

function ordenar(lista) {

    var copia = lista.slice();
    var criterio = estado.orden;

    copia.sort(function (a, b) {

        if (criterio === "fecha-avistamiento-reciente") {
            return (b.fecha + b.hora).localeCompare(a.fecha + a.hora);
        }
        if (criterio === "fecha-avistamiento-antigua") {
            return (a.fecha + a.hora).localeCompare(b.fecha + b.hora);
        }
        if (criterio === "lugar-a") {
            return a.lugar.localeCompare(b.lugar, "es");
        }
        if (criterio === "lugar-z") {
            return b.lugar.localeCompare(a.lugar, "es");
        }
        if (criterio === "nombre-ave-a") {
            return a.especie.localeCompare(b.especie, "es");
        }
        if (criterio === "nombre-ave-z") {
            return b.especie.localeCompare(a.especie, "es");
        }
        if (criterio === "cantidad-ejem-mayores") {
            return b.cantidad - a.cantidad;
        }
        if (criterio === "cantidad-ejem-menores") {
            return a.cantidad - b.cantidad;
        }
        return 0;
    });

    return copia;
}

function celda(texto) {

    var td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function textoRespaldo(a) {

    var partes = [];

    if (a.fotos > 0) {
        partes.push(a.fotos + (a.fotos === 1 ? " foto" : " fotos"));
    }
    if (a.videos > 0) {
        partes.push(a.videos + (a.videos === 1 ? " video" : " videos"));
    }
    return partes.join(" y ");
}

function dibujarTabla(filas) {

    var cuerpo = document.getElementById("cuerpo-tabla");
    cuerpo.innerHTML = "";

    if (filas.length === 0) {
        var trVacio = document.createElement("tr");
        var tdVacio = document.createElement("td");
        tdVacio.colSpan = 7;
        tdVacio.textContent = "No hay avistamientos que cumplan los filtros seleccionados.";
        trVacio.appendChild(tdVacio);
        cuerpo.appendChild(trVacio);
        return;
    }

    for (var i = 0; i < filas.length; i = i + 1) {

        var a = filas[i];
        var tr = document.createElement("tr");

        tr.appendChild(celda(formatoFecha(a.fecha) + " · " + a.hora + " h"));

        var tdTipo = document.createElement("td");
        var etiqueta = document.createElement("span");
        etiqueta.className = "tipo-ave";
        etiqueta.textContent = a.tipo;
        tdTipo.appendChild(etiqueta);
        tr.appendChild(tdTipo);

        tr.appendChild(celda(a.especie));
        tr.appendChild(celda(a.cantidad));
        tr.appendChild(celda(a.lugar + " (" + a.comuna + ", " + a.region + ")"));
        tr.appendChild(celda(textoRespaldo(a)));
        tr.appendChild(celda(a.voluntario));

        cuerpo.appendChild(tr);
    }
}

function botonPagina(texto, numero, deshabilitado, esActual) {

    var boton = document.createElement("button");

    boton.type = "button";
    boton.textContent = texto;
    boton.disabled = deshabilitado;

    if (esActual) {
        boton.className = "pagina-activa";
    }

    boton.addEventListener("click", function () {
        estado.pagina = numero;
        actualizar();
    });

    return boton;
}

function dibujarPaginador(totalPaginas) {

    var paginador = document.getElementById("paginador");
    paginador.innerHTML = "";

    if (totalPaginas <= 1) {
        return;
    }

    paginador.appendChild(
        botonPagina("‹ Anterior", estado.pagina - 1, estado.pagina === 1, false));

    for (var i = 1; i <= totalPaginas; i = i + 1) {
        paginador.appendChild(
            botonPagina(String(i), i, false, i === estado.pagina));
    }

    paginador.appendChild(
        botonPagina("Siguiente ›", estado.pagina + 1,
                    estado.pagina === totalPaginas, false));

    var indicador = document.createElement("span");
    indicador.className = "ayuda";
    indicador.textContent = "Página " + estado.pagina + " de " + totalPaginas;
    paginador.appendChild(indicador);
}

function actualizar() {

    var datos = ordenar(filtrar(AVISTAMIENTOS));
    var total = datos.length;
    var totalPaginas = Math.max(1, Math.ceil(total / estado.porPagina));

    if (estado.pagina > totalPaginas) {
        estado.pagina = totalPaginas;
    }

    var inicio = (estado.pagina - 1) * estado.porPagina;
    var visibles = datos.slice(inicio, inicio + estado.porPagina);

    dibujarTabla(visibles);
    dibujarPaginador(totalPaginas);

    var contador = document.getElementById("contador-resultados");

    if (total === 0) {
        contador.textContent = "Sin resultados.";
    } else {
        contador.textContent = total + " avistamiento(s) encontrados. Mostrando "
            + (inicio + 1) + " a " + (inicio + visibles.length) + ".";
    }
}

function leerFiltros() {

    limpiarErroresListado();

    var desde = document.getElementById("avistamiento-desde").value;
    var hasta = document.getElementById("avistamiento-hasta").value;

    if (desde !== "" && hasta !== "" && desde > hasta) {
        document.getElementById("error-avistamiento-hasta").textContent =
            "La fecha final no puede ser anterior a la inicial.";
        document.getElementById("avistamiento-hasta").classList.add("campo-invalido");
        return false;
    }

    estado.tipo = document.getElementById("tipo-ave").value;
    estado.region = document.getElementById("region").value;
    estado.texto = document.getElementById("palabra-clave").value.trim();
    estado.desde = desde;
    estado.hasta = hasta;
    estado.orden = document.getElementById("ordenar-por").value;
    estado.porPagina = Number(document.getElementById("resultados-por-pagina").value);
    estado.pagina = 1;

    return true;
}

function limpiarErroresListado() {

    var errores = document.querySelectorAll(".error");
    for (var i = 0; i < errores.length; i = i + 1) {
        errores[i].textContent = "";
    }

    var invalidos = document.querySelectorAll(".campo-invalido");
    for (var j = 0; j < invalidos.length; j = j + 1) {
        invalidos[j].classList.remove("campo-invalido");
    }
}

function aplicarFiltros() {

    if (leerFiltros()) {
        actualizar();
    }
}

document.addEventListener("DOMContentLoaded", function () {

    var formulario = document.getElementById("form-avistamientos");

    if (formulario === null) {
        return;
    }

    document.getElementById("btn-filtrar")
        .addEventListener("click", aplicarFiltros);

    var controles = ["tipo-ave", "region", "ordenar-por", "resultados-por-pagina",
                     "avistamiento-desde", "avistamiento-hasta"];

    for (var i = 0; i < controles.length; i = i + 1) {
        document.getElementById(controles[i])
            .addEventListener("change", aplicarFiltros);
    }

    document.getElementById("palabra-clave")
        .addEventListener("input", aplicarFiltros);

    formulario.addEventListener("reset", function () {
        window.setTimeout(aplicarFiltros, 0);
    });

    aplicarFiltros();
});