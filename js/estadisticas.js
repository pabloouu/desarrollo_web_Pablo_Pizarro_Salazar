"use strict";

var NS_SVG = "http://www.w3.org/2000/svg";

var VERDE = "#15803d";
var NARANJA = "#c2410c";

function contarPor(lista, campo) {

    var conteo = {};

    for (var i = 0; i < lista.length; i = i + 1) {
        var clave = lista[i][campo];
        if (conteo[clave] === undefined) {
            conteo[clave] = 0;
        }
        conteo[clave] = conteo[clave] + 1;
    }
    return conteo;
}

function separarConteo(conteo) {

    var etiquetas = Object.keys(conteo);
    var valores = [];

    for (var i = 0; i < etiquetas.length; i = i + 1) {
        valores.push(conteo[etiquetas[i]]);
    }
    return { etiquetas: etiquetas, valores: valores };
}

function mayores(conteo, cantidad) {

    var pares = [];
    var claves = Object.keys(conteo);

    for (var i = 0; i < claves.length; i = i + 1) {
        pares.push({ etiqueta: claves[i], valor: conteo[claves[i]] });
    }

    pares.sort(function (a, b) {
        return b.valor - a.valor;
    });

    pares = pares.slice(0, cantidad);

    var etiquetas = [];
    var valores = [];

    for (var j = 0; j < pares.length; j = j + 1) {
        etiquetas.push(pares[j].etiqueta);
        valores.push(pares[j].valor);
    }
    return { etiquetas: etiquetas, valores: valores };
}

function contarPorMes() {

    var nombres = ["ene", "feb", "mar", "abr", "may", "jun",
                   "jul", "ago", "sep", "oct", "nov", "dic"];
    var meses = [];
    var ahora = new Date();

    for (var i = 3; i >= 0; i = i - 1) {

        var f = new Date(ahora.getFullYear(), ahora.getMonth() - i, 1);
        var mes = String(f.getMonth() + 1);
        if (mes.length === 1) { mes = "0" + mes; }

        meses.push({
            clave: f.getFullYear() + "-" + mes,
            etiqueta: nombres[f.getMonth()] + " " + String(f.getFullYear()).substring(2),
            total: 0
        });
    }

    for (var j = 0; j < AVISTAMIENTOS.length; j = j + 1) {

        var claveAvistamiento = AVISTAMIENTOS[j].fecha.substring(0, 7);

        for (var k = 0; k < meses.length; k = k + 1) {
            if (meses[k].clave === claveAvistamiento) {
                meses[k].total = meses[k].total + 1;
            }
        }
    }
    return meses;
}

function crearSVG(etiqueta, atributos) {

    var elemento = document.createElementNS(NS_SVG, etiqueta);

    for (var nombre in atributos) {
        if (atributos.hasOwnProperty(nombre)) {
            elemento.setAttribute(nombre, atributos[nombre]);
        }
    }
    return elemento;
}

function textoSVG(x, y, contenido, anclaje, tamanio, color) {

    var texto = crearSVG("text", {
        x: x, y: y,
        "text-anchor": anclaje,
        "font-size": tamanio,
        fill: color
    });
    texto.textContent = contenido;
    return texto;
}

function barrasVerticales(idSVG, etiquetas, valores, color) {

    var svg = document.getElementById(idSVG);
    svg.innerHTML = "";

    var ancho = 400;
    var alto = 240;
    var base = alto - 40;
    var altoMaximo = base - 30;

    var maximo = Math.max.apply(null, valores);
    if (maximo === 0) {
        maximo = 1;
    }

    var paso = (ancho - 30) / etiquetas.length;
    var anchoBarra = Math.min(38, paso - 12);

    svg.appendChild(crearSVG("line", {
        x1: 20, y1: base, x2: ancho - 10, y2: base,
        stroke: "#d6d3d1", "stroke-width": 1
    }));

    for (var i = 0; i < etiquetas.length; i = i + 1) {

        var altoBarra = (valores[i] / maximo) * altoMaximo;
        var x = 20 + paso * i + (paso - anchoBarra) / 2;
        var centro = x + anchoBarra / 2;

        svg.appendChild(crearSVG("rect", {
            x: x, y: base - altoBarra,
            width: anchoBarra, height: altoBarra,
            fill: color, rx: 2
        }));

        svg.appendChild(textoSVG(centro, base - altoBarra - 5,
            valores[i], "middle", 11, "#1f2937"));

        svg.appendChild(textoSVG(centro, base + 16,
            etiquetas[i], "middle", 9, "#6b7280"));
    }
}

function barrasHorizontales(idSVG, etiquetas, valores, color) {

    var svg = document.getElementById(idSVG);
    svg.innerHTML = "";

    var ancho = 400;
    var margenIzquierdo = 130;
    var largoMaximo = ancho - margenIzquierdo - 40;

    var maximo = Math.max.apply(null, valores);
    if (maximo === 0) {
        maximo = 1;
    }

    var paso = 26;
    var altoBarra = 14;

    for (var i = 0; i < etiquetas.length; i = i + 1) {

        var y = 15 + paso * i;
        var largo = (valores[i] / maximo) * largoMaximo;

        svg.appendChild(textoSVG(margenIzquierdo - 8, y + altoBarra - 3,
            etiquetas[i], "end", 9, "#6b7280"));

        svg.appendChild(crearSVG("rect", {
            x: margenIzquierdo, y: y,
            width: largo, height: altoBarra,
            fill: color, rx: 2
        }));

        svg.appendChild(textoSVG(margenIzquierdo + largo + 6, y + altoBarra - 3,
            valores[i], "start", 10, "#1f2937"));
    }
}

function llenarTabla(idCuerpo, etiquetas, valores) {

    var cuerpo = document.getElementById(idCuerpo);
    cuerpo.innerHTML = "";

    for (var i = 0; i < etiquetas.length; i = i + 1) {

        var tr = document.createElement("tr");

        var tdEtiqueta = document.createElement("td");
        tdEtiqueta.textContent = etiquetas[i];
        tr.appendChild(tdEtiqueta);

        var tdValor = document.createElement("td");
        tdValor.textContent = valores[i];
        tr.appendChild(tdValor);

        cuerpo.appendChild(tr);
    }
}

function tarjetaCifra(numero, descripcion) {

    var li = document.createElement("li");

    var valor = document.createElement("strong");
    valor.textContent = numero;

    var texto = document.createElement("span");
    texto.textContent = descripcion;

    li.appendChild(valor);
    li.appendChild(texto);
    return li;
}

function dibujarCifras() {

    var lista = document.getElementById("cifras");
    lista.innerHTML = "";

    var especies = {};
    var regiones = {};
    var ejemplares = 0;
    var conVideo = 0;

    for (var i = 0; i < AVISTAMIENTOS.length; i = i + 1) {

        var a = AVISTAMIENTOS[i];
        especies[a.especie] = true;
        regiones[a.region] = true;
        ejemplares = ejemplares + a.cantidad;

        if (a.videos > 0) {
            conVideo = conVideo + 1;
        }
    }

    var porcentaje = Math.round((conVideo / AVISTAMIENTOS.length) * 100);

    lista.appendChild(tarjetaCifra(AVISTAMIENTOS.length, "avistamientos informados"));
    lista.appendChild(tarjetaCifra(VOLUNTARIOS.length, "voluntarios registrados"));
    lista.appendChild(tarjetaCifra(Object.keys(especies).length, "especies distintas observadas"));
    lista.appendChild(tarjetaCifra(Object.keys(regiones).length + " de 16", "regiones con registros"));
    lista.appendChild(tarjetaCifra(ejemplares, "ejemplares contabilizados"));
    lista.appendChild(tarjetaCifra(porcentaje + " %", "informes con video de respaldo"));
}

function dibujarRanking() {

    var cuerpo = document.getElementById("cuerpo-ranking");
    cuerpo.innerHTML = "";

    var ranking = [];

    for (var i = 0; i < VOLUNTARIOS.length; i = i + 1) {

        var v = VOLUNTARIOS[i];
        var informes = 0;
        var ejemplares = 0;

        for (var j = 0; j < AVISTAMIENTOS.length; j = j + 1) {
            if (AVISTAMIENTOS[j].email === v.email) {
                informes = informes + 1;
                ejemplares = ejemplares + AVISTAMIENTOS[j].cantidad;
            }
        }

        ranking.push({
            nombre: v.nombre,
            region: v.region,
            nivel: v.nivel,
            informes: informes,
            ejemplares: ejemplares
        });
    }

    ranking.sort(function (a, b) {
        return b.informes - a.informes;
    });

    for (var k = 0; k < ranking.length; k = k + 1) {

        var r = ranking[k];
        var tr = document.createElement("tr");
        var valores = [k + 1, r.nombre, r.region, r.nivel, r.informes, r.ejemplares];

        for (var c = 0; c < valores.length; c = c + 1) {
            var td = document.createElement("td");
            td.textContent = valores[c];
            tr.appendChild(td);
        }
        cuerpo.appendChild(tr);
    }
}


document.addEventListener("DOMContentLoaded", function () {

    if (document.getElementById("cifras") === null) {
        return;
    }

    dibujarCifras();

    var tipos = separarConteo(contarPor(AVISTAMIENTOS, "tipo"));
    barrasVerticales("grafico-tipos", tipos.etiquetas, tipos.valores, VERDE);
    llenarTabla("tabla-tipos", tipos.etiquetas, tipos.valores);

    var meses = contarPorMes();
    var etiquetasMes = [];
    var valoresMes = [];

    for (var i = 0; i < meses.length; i = i + 1) {
        etiquetasMes.push(meses[i].etiqueta);
        valoresMes.push(meses[i].total);
    }
    barrasVerticales("grafico-meses", etiquetasMes, valoresMes, NARANJA);
    llenarTabla("tabla-meses", etiquetasMes, valoresMes);

    var regiones = mayores(contarPor(AVISTAMIENTOS, "region"), 6);
    barrasHorizontales("grafico-regiones", regiones.etiquetas, regiones.valores, VERDE);
    llenarTabla("tabla-regiones", regiones.etiquetas, regiones.valores);

    var niveles = separarConteo(contarPor(VOLUNTARIOS, "nivel"));
    barrasHorizontales("grafico-niveles", niveles.etiquetas, niveles.valores, NARANJA);
    llenarTabla("tabla-niveles", niveles.etiquetas, niveles.valores);

    dibujarRanking();
});