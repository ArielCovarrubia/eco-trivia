const preguntas = [
    { categoria: 'RECICLAJE', texto: '¿Qué significa reducir nuestros residuos?', opciones: ['Comprar más productos', 'Generar menos basura desde el principio', 'Separar solo el vidrio', 'Tirar todo en el mismo contenedor'], correcta: 1 },
    { categoria: 'ENERGÍA', texto: '¿Qué acción ahorra más electricidad en casa?', opciones: ['Dejar las luces encendidas', 'Abrir el refrigerador muchas veces', 'Apagar y desenchufar lo que no usamos', 'Usar más aparatos al mismo tiempo'], correcta: 2 },
    { categoria: 'HUELLA DE CARBONO', texto: '¿Cuál de estos transportes suele emitir menos CO₂ por persona?', opciones: ['Avión', 'Auto particular', 'Bicicleta', 'Motocicleta'], correcta: 2 },
    { categoria: 'RECICLAJE', texto: '¿Qué debemos hacer antes de reciclar un envase?', opciones: ['Llenarlo de agua', 'Vaciarlo y limpiarlo si es necesario', 'Romperlo siempre', 'Pintarlo de verde'], correcta: 1 },
    { categoria: 'ENERGÍA', texto: '¿Qué fuente es renovable?', opciones: ['Carbón', 'Petróleo', 'Energía solar', 'Gas natural'], correcta: 2 },
    { categoria: 'AGUA', texto: '¿Cuál es una forma sencilla de ahorrar agua?', opciones: ['Dejar el grifo abierto', 'Ducharse durante una hora', 'Cerrar el grifo al cepillarse', 'Lavar la vereda con manguera'], correcta: 2 },
    { categoria: 'HUELLA DE CARBONO', texto: '¿Qué ayuda a reducir la huella de carbono de la alimentación?', opciones: ['Desperdiciar comida', 'Preferir alimentos locales y de temporada', 'Comprar solo productos con mucho envase', 'Desechar las sobras'], correcta: 1 },
    { categoria: 'RECICLAJE', texto: '¿Qué regla se recomienda seguir antes de reciclar?', opciones: ['Reutilizar cuando sea posible', 'Comprar envases nuevos', 'Mezclar todos los materiales', 'Usar más bolsas'], correcta: 0 },
    { categoria: 'ENERGÍA', texto: '¿Qué tipo de bombilla consume menos energía?', opciones: ['Incandescente', 'LED', 'Halógena antigua', 'De cualquier tipo da igual'], correcta: 1 },
    { categoria: 'PLANETA', texto: '¿Qué pequeño hábito tiene un gran impacto?', opciones: ['Usar productos desechables', 'Llevar una botella reutilizable', 'Dejar basura en la calle', 'Imprimir todo'], correcta: 1 }
];

let preguntaActual = 0;
let puntuacion = 0;
let racha = 0;
let respondida = false;

const $ = (selector) => document.querySelector(selector);
const mostrarPantalla = (id) => document.querySelectorAll('.pantalla').forEach((pantalla) => pantalla.classList.toggle('activa', pantalla.id === id));

function cargarPregunta() {
    const pregunta = preguntas[preguntaActual];
    respondida = false;
    $('#categoria').textContent = pregunta.categoria;
    $('#numero-pregunta').textContent = preguntaActual + 1;
    $('#puntuacion').textContent = puntuacion;
    $('#racha').textContent = `Racha actual: ${racha}`;
    $('#texto-pregunta').textContent = pregunta.texto;
    const porcentaje = Math.round(((preguntaActual + 1) / preguntas.length) * 100);
    $('#barra-progreso').style.width = `${porcentaje}%`;
    $('#porcentaje-progreso').textContent = `${porcentaje}%`;
    $('#mensaje-respuesta').textContent = '';
    $('#boton-siguiente').disabled = true;
    $('#opciones').innerHTML = '';

    pregunta.opciones.forEach((opcion, indice) => {
        const boton = document.createElement('button');
        boton.className = 'opcion';
        const letra = document.createElement('span');
        letra.className = 'letra-opcion';
        letra.textContent = String.fromCharCode(65 + indice);
        const texto = document.createElement('span');
        texto.textContent = opcion;
        boton.append(letra, texto);
        boton.addEventListener('click', () => comprobarRespuesta(indice, boton));
        $('#opciones').appendChild(boton);
    });
}

function comprobarRespuesta(indice, botonElegido) {
    if (respondida) return;
    respondida = true;
    const pregunta = preguntas[preguntaActual];
    const botones = document.querySelectorAll('.opcion');
    botones.forEach((boton, indiceBoton) => {
        boton.disabled = true;
        if (indiceBoton === pregunta.correcta) boton.classList.add('correcta');
    });

    if (indice === pregunta.correcta) {
        racha++;
        puntuacion += 100 + (racha - 1) * 25;
        botonElegido.classList.add('correcta');
        $('#mensaje-respuesta').textContent = `¡Correcto! +${100 + (racha - 1) * 25} puntos`;
        $('#mensaje-respuesta').style.color = '#caec5e';
    } else {
        racha = 0;
        botonElegido.classList.add('incorrecta');
        $('#mensaje-respuesta').textContent = `Casi. La respuesta era: ${pregunta.opciones[pregunta.correcta]}`;
        $('#mensaje-respuesta').style.color = '#ef8b78';
    }
    $('#puntuacion').textContent = puntuacion;
    $('#racha').textContent = `Racha actual: ${racha}`;
    $('#boton-siguiente').disabled = false;
}

function terminarJuego() {
    $('#puntuacion-final').textContent = puntuacion;
    $('#mensaje-final').textContent = puntuacion >= 900 ? '¡Eres una verdadera inspiración ecológica!' : puntuacion >= 600 ? '¡Muy bien! Cada hábito cuenta.' : 'Cada respuesta es una oportunidad para aprender.';
    mostrarPantalla('pantalla-final');
}

$('#boton-iniciar').addEventListener('click', () => {
    preguntaActual = 0;
    puntuacion = 0;
    racha = 0;
    mostrarPantalla('pantalla-juego');
    cargarPregunta();
});

$('#boton-siguiente').addEventListener('click', () => {
    preguntaActual++;
    if (preguntaActual < preguntas.length) cargarPregunta();
    else terminarJuego();
});

$('#boton-reiniciar').addEventListener('click', () => {
    mostrarPantalla('pantalla-inicio');
});