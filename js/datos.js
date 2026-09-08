"use strict";

var VOLUNTARIOS = [
    { nombre: "Camila Rojas",      email: "camila.rojas@correo.cl",      region: "Valparaíso",                           comuna: "Viña del Mar",  nivel: "Avanzado" },
    { nombre: "Matías Fuentes",    email: "matias.fuentes@correo.cl",    region: "Metropolitana de Santiago",            comuna: "La Florida",    nivel: "Intermedio" },
    { nombre: "Fernanda Soto",     email: "fernanda.soto@correo.cl",     region: "Los Lagos",                            comuna: "Puerto Varas",  nivel: "Avanzado" },
    { nombre: "Ignacio Vera",      email: "ignacio.vera@correo.cl",      region: "Biobío",                               comuna: "Concepción",    nivel: "Principiante" },
    { nombre: "Antonia Muñoz",     email: "antonia.munoz@correo.cl",     region: "Coquimbo",                             comuna: "La Serena",     nivel: "Intermedio" },
    { nombre: "Diego Cárcamo",     email: "diego.carcamo@correo.cl",     region: "Magallanes y de la Antártica Chilena", comuna: "Punta Arenas",  nivel: "Avanzado" },
    { nombre: "Valentina Pérez",   email: "valentina.perez@correo.cl",   region: "La Araucanía",                         comuna: "Villarrica",    nivel: "Principiante" },
    { nombre: "Joaquín Silva",     email: "joaquin.silva@correo.cl",     region: "Antofagasta",                          comuna: "Antofagasta",   nivel: "Intermedio" },
    { nombre: "Javiera Contreras", email: "javiera.contreras@correo.cl", region: "Maule",                                comuna: "Constitución",  nivel: "Principiante" },
    { nombre: "Tomás Aguilar",     email: "tomas.aguilar@correo.cl",     region: "Los Ríos",                             comuna: "Valdivia",      nivel: "Intermedio" },
    { nombre: "Constanza Leiva",   email: "constanza.leiva@correo.cl",   region: "Metropolitana de Santiago",            comuna: "Peñalolén",     nivel: "Principiante" },
    { nombre: "Rodrigo Núñez",     email: "rodrigo.nunez@correo.cl",     region: "Atacama",                              comuna: "Caldera",       nivel: "Intermedio" }
];

var FILAS_AVISTAMIENTOS = [
    ["Cisne de cuello negro", "Acuáticas", 24, "Los Ríos", "Valdivia", "Santuario Carlos Anwandter, río Cruces", 3, "08:15", "tomas.aguilar@correo.cl", 3, 1],
    ["Pingüino de Humboldt", "Marinas", 60, "Coquimbo", "La Higuera", "Reserva Nacional Pingüino de Humboldt", 5, "10:40", "antonia.munoz@correo.cl", 4, 0],
    ["Cóndor andino", "Rapaces", 2, "Metropolitana de Santiago", "San José de Maipo", "Cajón del Maipo, sector Lo Valdés", 6, "12:05", "matias.fuentes@correo.cl", 2, 1],
    ["Flamenco chileno", "Acuáticas", 45, "Antofagasta", "San Pedro de Atacama", "Laguna Chaxa, Salar de Atacama", 8, "17:30", "joaquin.silva@correo.cl", 5, 0],
    ["Queltehue", "Terrestres", 6, "Metropolitana de Santiago", "Peñalolén", "Parque Quebrada de Macul", 9, "07:50", "constanza.leiva@correo.cl", 1, 0],
    ["Picaflor gigante", "Picaflores", 1, "Valparaíso", "Olmué", "Parque Nacional La Campana", 11, "11:20", "camila.rojas@correo.cl", 2, 0],
    ["Pelícano", "Marinas", 18, "Valparaíso", "Valparaíso", "Caleta Portales", 12, "09:10", "camila.rojas@correo.cl", 2, 1],
    ["Carpintero negro", "Terrestres", 2, "La Araucanía", "Pucón", "Parque Nacional Huerquehue", 14, "15:45", "valentina.perez@correo.cl", 1, 1],
    ["Tagua común", "Acuáticas", 32, "Metropolitana de Santiago", "Santiago", "Laguna del Parque O'Higgins", 15, "16:00", "matias.fuentes@correo.cl", 1, 0],
    ["Albatros de ceja negra", "Marinas", 4, "Magallanes y de la Antártica Chilena", "Punta Arenas", "Estrecho de Magallanes, isla Magdalena", 17, "13:25", "diego.carcamo@correo.cl", 3, 1],
    ["Chincol", "Paseriformes", 12, "Biobío", "Concepción", "Cerro Caracol", 18, "08:35", "ignacio.vera@correo.cl", 1, 0],
    ["Aguilucho común", "Rapaces", 1, "Maule", "San Clemente", "Reserva Nacional Altos de Lircay", 20, "14:10", "javiera.contreras@correo.cl", 2, 0],
    ["Bandurria", "Acuáticas", 15, "Los Lagos", "Puerto Varas", "Humedal de Llanquihue", 21, "09:55", "fernanda.soto@correo.cl", 2, 1],
    ["Loica", "Paseriformes", 8, "Coquimbo", "Ovalle", "Valle del Encanto", 23, "10:15", "antonia.munoz@correo.cl", 1, 0],
    ["Tucúquere", "Rapaces", 1, "Los Ríos", "Panguipulli", "Reserva Biológica Huilo Huilo", 25, "21:40", "tomas.aguilar@correo.cl", 1, 1],
    ["Gaviota dominicana", "Marinas", 40, "Atacama", "Caldera", "Bahía Inglesa", 26, "12:30", "rodrigo.nunez@correo.cl", 2, 0],
    ["Zorzal", "Paseriformes", 5, "Metropolitana de Santiago", "La Florida", "Parque Padre Hurtado", 28, "07:20", "matias.fuentes@correo.cl", 1, 0],
    ["Cachaña", "Terrestres", 14, "Magallanes y de la Antártica Chilena", "Natales", "Parque Nacional Torres del Paine", 30, "11:05", "diego.carcamo@correo.cl", 3, 1],
    ["Garza grande", "Acuáticas", 3, "Valparaíso", "Concón", "Humedal del río Aconcagua", 32, "18:20", "camila.rojas@correo.cl", 2, 0],
    ["Peuco", "Rapaces", 1, "Maule", "Curicó", "Fundo Los Niches", 34, "16:40", "javiera.contreras@correo.cl", 1, 0],
    ["Siete colores", "Paseriformes", 4, "Biobío", "San Pedro de la Paz", "Humedal Los Batros", 36, "09:30", "ignacio.vera@correo.cl", 2, 1],
    ["Piquero", "Marinas", 75, "Antofagasta", "Mejillones", "Península de Mejillones", 38, "14:55", "joaquin.silva@correo.cl", 3, 0],
    ["Picaflor de Arica", "Picaflores", 2, "Arica y Parinacota", "Arica", "Valle de Azapa", 41, "10:05", "rodrigo.nunez@correo.cl", 2, 0],
    ["Tricahue", "Terrestres", 22, "Maule", "Colbún", "Cuesta Los Cóndores", 44, "17:15", "javiera.contreras@correo.cl", 1, 1],
    ["Huala", "Acuáticas", 7, "Los Lagos", "Frutillar", "Lago Llanquihue, costanera", 47, "08:45", "fernanda.soto@correo.cl", 2, 0],
    ["Chercán", "Paseriformes", 3, "La Araucanía", "Temuco", "Cerro Ñielol", 50, "12:50", "valentina.perez@correo.cl", 1, 0],
    ["Cormorán yeco", "Marinas", 28, "Los Lagos", "Puerto Montt", "Costanera de Angelmó", 54, "15:35", "fernanda.soto@correo.cl", 2, 1],
    ["Lechuza blanca", "Rapaces", 1, "Metropolitana de Santiago", "Colina", "Fundo Chicureo", 58, "22:10", "constanza.leiva@correo.cl", 1, 0],
    ["Perdiz chilena", "Terrestres", 5, "Libertador General Bernardo O'Higgins", "Pichilemu", "Camino a Cáhuil", 62, "07:40", "camila.rojas@correo.cl", 1, 0],
    ["Coscoroba", "Acuáticas", 11, "Valparaíso", "El Tabo", "Laguna El Peral", 66, "16:25", "camila.rojas@correo.cl", 3, 1],
    ["Diuca", "Paseriformes", 9, "Coquimbo", "Vicuña", "Valle de Elqui, sector Pisco Elqui", 71, "09:05", "antonia.munoz@correo.cl", 1, 0],
    ["Petrel gigante", "Marinas", 6, "Magallanes y de la Antártica Chilena", "Cabo de Hornos", "Canal Beagle", 76, "13:00", "diego.carcamo@correo.cl", 2, 1],
    ["Cernícalo", "Rapaces", 2, "Ñuble", "Chillán", "Camino a Termas de Chillán", 82, "11:50", "ignacio.vera@correo.cl", 1, 0],
    ["Pitío", "Terrestres", 3, "Los Ríos", "Corral", "Parque Oncol", 88, "10:30", "tomas.aguilar@correo.cl", 2, 0],
    ["Golondrina chilena", "Paseriformes", 26, "Metropolitana de Santiago", "Maipú", "Parque Tres Poniente", 95, "18:05", "constanza.leiva@correo.cl", 1, 1],
    ["Pato jergón grande", "Acuáticas", 19, "Atacama", "Copiapó", "Desembocadura del río Copiapó", 103, "08:20", "rodrigo.nunez@correo.cl", 2, 0],
    ["Yunco", "Marinas", 33, "Valparaíso", "Juan Fernández", "Isla Robinson Crusoe", 112, "14:35", "camila.rojas@correo.cl", 4, 1],
    ["Cometocino de Gay", "Paseriformes", 6, "Metropolitana de Santiago", "Lo Barnechea", "Farellones, sector La Parva", 125, "12:15", "matias.fuentes@correo.cl", 1, 0]
];

function fechaHaceDias(dias) {

    var f = new Date();
    f.setHours(0, 0, 0, 0);
    f.setDate(f.getDate() - dias);

    var mes = String(f.getMonth() + 1);
    var dia = String(f.getDate());

    if (mes.length === 1) { mes = "0" + mes; }
    if (dia.length === 1) { dia = "0" + dia; }

    return f.getFullYear() + "-" + mes + "-" + dia;
}

function formatoFecha(iso) {

    var partes = String(iso).split("-");
    if (partes.length !== 3) {
        return iso;
    }
    return partes[2] + "-" + partes[1] + "-" + partes[0];
}

function nombreVoluntario(email) {

    for (var i = 0; i < VOLUNTARIOS.length; i = i + 1) {
        if (VOLUNTARIOS[i].email === email) {
            return VOLUNTARIOS[i].nombre;
        }
    }
    return email;
}

function construirAvistamientos() {

    var lista = [];

    for (var i = 0; i < FILAS_AVISTAMIENTOS.length; i = i + 1) {

        var fila = FILAS_AVISTAMIENTOS[i];

        lista.push({
            id: i + 1,
            especie: fila[0],
            tipo: fila[1],
            cantidad: fila[2],
            region: fila[3],
            comuna: fila[4],
            lugar: fila[5],
            fecha: fechaHaceDias(fila[6]),
            hora: fila[7],
            email: fila[8],
            voluntario: nombreVoluntario(fila[8]),
            fotos: fila[9],
            videos: fila[10]
        });
    }
    return lista;
}

var AVISTAMIENTOS = construirAvistamientos();