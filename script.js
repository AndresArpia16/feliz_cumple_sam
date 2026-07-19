/* ============================================================
   SCRIPT.JS
   Lógica general del proyecto "Sorpresa de Cumpleaños"
   Cada sección está comentada y solo se activa si los elementos
   correspondientes existen en la página actual.
   ============================================================ */

/* ---------------------------------------------------------
   1) FONDO: brillos ambientales + corazones flotantes
   Se ejecuta en TODAS las páginas porque el contenedor
   #contenedor-particulas y .capa-brillos están en cada HTML.
--------------------------------------------------------- */
function iniciarCapaBrillos() {
  const capa = document.querySelector('.capa-brillos');
  if (!capa) return;
  const total = 35;
  for (let i = 0; i < total; i++) {
    const brillo = document.createElement('div');
    brillo.className = 'brillo';
    brillo.style.left = Math.random() * 100 + 'vw';
    brillo.style.top = Math.random() * 100 + 'vh';
    brillo.style.animationDelay = (Math.random() * 4) + 's';
    brillo.style.animationDuration = (3 + Math.random() * 3) + 's';
    capa.appendChild(brillo);
  }
}

function iniciarCorazonesFlotantes() {
  const contenedor = document.getElementById('contenedor-particulas');
  if (!contenedor) return;

  const simbolos = ['❤', '♥', '💕'];

  function crearCorazon() {
    const corazon = document.createElement('span');
    corazon.className = 'corazon-particula';
    corazon.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
    corazon.style.left = Math.random() * 100 + 'vw';
    corazon.style.setProperty('--drift', (Math.random() * 80 - 40) + 'px');
    corazon.style.fontSize = (0.9 + Math.random() * 1.3) + 'rem';
    const duracion = 8 + Math.random() * 10;
    corazon.style.animationDuration = duracion + 's';
    contenedor.appendChild(corazon);

    setTimeout(() => corazon.remove(), duracion * 1000);
  }

  // Genera un corazón cada cierto intervalo aleatorio para que se vea natural
  for (let i = 0; i < 8; i++) {
    setTimeout(crearCorazon, i * 600);
  }
  setInterval(crearCorazon, 1400);
}

/* ---------------------------------------------------------
   2) PANTALLA PRINCIPAL (index.html)
   Animación de máquina de escribir para "Feliz Cumpleaños ❤️"
   y aparición escalonada del subtexto y los botones.
--------------------------------------------------------- */
function iniciarTypewriter() {
  const elemento = document.getElementById('titulo-typewriter');
  if (!elemento) return;

  const textoCompleto = 'Feliz Cumpleaños ❤️';
  const cursor = document.createElement('span');
  cursor.className = 'cursor-typewriter';

  let indice = 0;
  elemento.textContent = '';
  elemento.appendChild(cursor);

  function escribir() {
    if (indice < textoCompleto.length) {
      cursor.insertAdjacentText('beforebegin', textoCompleto.charAt(indice));
      indice++;
      setTimeout(escribir, 110);
    } else {
      // Al terminar, muestra el subtexto y los botones
      const subtexto = document.getElementById('subtexto');
      const botones = document.getElementById('grupo-botones');
      if (subtexto) subtexto.style.display = 'block';
      if (botones) botones.style.display = 'flex';
      // El cursor sigue parpadeando al final del texto
    }
  }

  setTimeout(escribir, 500);
}

/* ---------------------------------------------------------
   3) PÁGINA DE CONTRASEÑAS (password.html)
   Dos contraseñas distintas llevan a rutas diferentes.
   La contraseña de aniversario se deja como plantilla para
   que el usuario la complete.
--------------------------------------------------------- */
function iniciarPassword() {
  const form = document.getElementById('form-password');
  if (!form) return;

  const input = document.getElementById('input-password');
  const mensajeError = document.getElementById('mensaje-error');
  const sello = document.getElementById('sello-cera');

  // Primera contraseña fija
  const cartaPassword = '2010';

  // Segunda contraseña: el usuario la reemplaza aquí con su fecha de aniversario
  const aniversarioPassword = '100726';

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    const valor = input.value.trim();

    if (valor === cartaPassword) {
      transicionSalida('carta.html');
    } else if (valor === aniversarioPassword) {
      transicionSalida('aniversario.html');
    } else {
      mostrarError();
    }
  });

  function mostrarError() {
    input.classList.remove('shake');
    // Forzar reflow para poder reiniciar la animación
    void input.offsetWidth;
    input.classList.add('shake');

    mensajeError.textContent = 'Contraseña incorrecta ❤️';
    mensajeError.classList.remove('mostrar');
    void mensajeError.offsetWidth;
    mensajeError.classList.add('mostrar');

    input.value = '';
    input.focus();
  }

  function transicionSalida(destino) {
    if (sello) sello.classList.add('derretido');
    document.body.style.transition = 'opacity 0.6s ease';
    document.body.style.opacity = '0';
    setTimeout(() => {
      window.location.href = destino;
    }, 550);
  }
}

/* ---------------------------------------------------------
   4) PÁGINA CARTA (carta.html)
   La carta se escribe letra por letra. Al terminar aparece
   el botón "Te amo" que dispara una lluvia de corazones.
--------------------------------------------------------- */
function iniciarCarta() {
  const cuerpo = document.getElementById('cuerpo-carta');
  if (!cuerpo) return;

  // Edita este texto para personalizar completamente la carta
  const carta = `Hola mi amor,
Hoy quiero recordate lo increible que eres y
lo afortunado que me siento de tenerte en mi vida.
Gracias por tu manera de hacerme setir tan especial,
por tu apoyo y por cada momento que compartimos juntos.

Deseo que este nuevo año de vida te traiga tanta
felicidad como la que tú me das a mí.


Feliz cumpleaños, mi persona favorita.`;

  let indice = 0;

  function escribirCarta() {
    if (indice < carta.length) {
      cuerpo.textContent += carta.charAt(indice);
      indice++;
      // Pausa un poco más larga en saltos de línea para efecto natural
      const retraso = carta.charAt(indice - 1) === '\n' ? 180 : 28;
      setTimeout(escribirCarta, retraso);
    } else {
      const boton = document.getElementById('boton-te-amo');
      if (boton) boton.classList.add('visible');
    }
  }

  setTimeout(escribirCarta, 600);

  // Botón "Te amo" -> lluvia de corazones por toda la pantalla
  const botonTeAmo = document.getElementById('boton-te-amo');
  if (botonTeAmo) {
    botonTeAmo.addEventListener('click', lanzarLluviaCorazones);
  }

  // Botón "Volver" -> regresa a la pantalla de contraseña
  const botonVolver = document.getElementById('boton-volver');
  if (botonVolver) {
    botonVolver.addEventListener('click', () => {
      document.body.style.transition = 'opacity 0.6s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'password.html';
      }, 550);
    });
  }
}

function lanzarLluviaCorazones() {
  const contenedor = document.getElementById('lluvia-corazones');
  if (!contenedor) return;

  const simbolos = ['❤', '💕', '💖', '♥'];
  const totalCorazones = 60;

  for (let i = 0; i < totalCorazones; i++) {
    setTimeout(() => {
      const corazon = document.createElement('span');
      corazon.className = 'corazon-lluvia';
      corazon.textContent = simbolos[Math.floor(Math.random() * simbolos.length)];
      corazon.style.left = Math.random() * 100 + 'vw';
      corazon.style.fontSize = (1 + Math.random() * 1.6) + 'rem';
      corazon.style.animationDuration = (2.5 + Math.random() * 2) + 's';
      contenedor.appendChild(corazon);
      setTimeout(() => corazon.remove(), 5000);
    }, i * 40);
  }
}

/* ---------------------------------------------------------
   5) PÁGINA ANIVERSARIO (aniversario.html)
   Carrusel moderno de fotografías. Solo se deben reemplazar
   los nombres de archivo dentro del arreglo "fotos".
--------------------------------------------------------- */
function iniciarCarrusel() {
  const track = document.getElementById('carrusel-track');
  if (!track) return;

  // Reemplaza únicamente los nombres de las imágenes aquí.
  // Los archivos deben colocarse dentro de la carpeta images/
  const fotos = [
    'foto1.jpg',
    'foto2.jpg',
    'foto3.jpg',
    'foto4.jpg',
    'foto5.jpg'
  ];

  const controles = document.getElementById('carrusel-controles');
  let indiceActual = 0;

  // Construye los slides dinámicamente
  fotos.forEach((nombreArchivo, i) => {
    const slide = document.createElement('div');
    slide.className = 'carrusel-slide';

    const img = document.createElement('img');
    img.src = 'images/' + nombreArchivo;
    img.alt = 'Recuerdo ' + (i + 1);
    img.loading = 'lazy';

    slide.appendChild(img);
    track.appendChild(slide);

    const punto = document.createElement('span');
    punto.className = 'punto-carrusel' + (i === 0 ? ' activo' : '');
    punto.addEventListener('click', () => irASlide(i));
    controles.appendChild(punto);
  });

  const puntos = controles.querySelectorAll('.punto-carrusel');

  function irASlide(i) {
    indiceActual = (i + fotos.length) % fotos.length;
    track.style.transform = `translateX(-${indiceActual * 100}%)`;
    puntos.forEach((p, idx) => p.classList.toggle('activo', idx === indiceActual));
  }

  document.getElementById('flecha-izq').addEventListener('click', () => irASlide(indiceActual - 1));
  document.getElementById('flecha-der').addEventListener('click', () => irASlide(indiceActual + 1));

  // Avance automático cada 5 segundos
  setInterval(() => irASlide(indiceActual + 1), 5000);
}

/* ---------------------------------------------------------
   6) REPRODUCTOR DE MÚSICA
   Presente en carta.html y aniversario.html.
   Solo se debe reemplazar el nombre del archivo "song".
--------------------------------------------------------- */
function iniciarReproductor() {
  const audio = document.getElementById('audio-fondo');
  const boton = document.getElementById('boton-musica');
  const onda = document.getElementById('onda-musica');
  if (!audio || !boton) return;

  // Reemplaza únicamente el nombre del archivo aquí.
  // El archivo debe colocarse dentro de la carpeta music/
  const song = 'cancion.mp3';
  audio.src = 'music/' + song;
  audio.loop = true;

  // Los navegadores bloquean el autoplay con sonido sin interacción,
  // así que se intenta reproducir y si falla, queda pausado hasta el clic.
  audio.play().catch(() => {
    boton.textContent = '▶';
    if (onda) onda.classList.add('pausado');
  });

  boton.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      boton.textContent = '⏸';
      if (onda) onda.classList.remove('pausado');
    } else {
      audio.pause();
      boton.textContent = '▶';
      if (onda) onda.classList.add('pausado');
    }
  });
}

/* ---------------------------------------------------------
   7) PANTALLA "ATRÁS" (dentro de index.html)
   Alterna entre la pantalla principal y la escena triste.
--------------------------------------------------------- */
function iniciarNavegacionInterna() {
  const botonAtras = document.getElementById('boton-atras');
  const botonSiguiente = document.getElementById('boton-siguiente');
  const botonRegresar = document.getElementById('boton-regresar');
  const pantallaPrincipal = document.getElementById('pantalla-principal');
  const escenaTriste = document.getElementById('escena-triste');

  if (botonAtras && escenaTriste && pantallaPrincipal) {
    botonAtras.addEventListener('click', () => {
      pantallaPrincipal.style.display = 'none';
      escenaTriste.style.display = 'flex';
    });
  }

  if (botonRegresar && escenaTriste && pantallaPrincipal) {
    botonRegresar.addEventListener('click', () => {
      escenaTriste.style.display = 'none';
      pantallaPrincipal.style.display = 'flex';
    });
  }

  if (botonSiguiente) {
    botonSiguiente.addEventListener('click', () => {
      document.body.style.transition = 'opacity 0.6s ease';
      document.body.style.opacity = '0';
      setTimeout(() => {
        window.location.href = 'password.html';
      }, 550);
    });
  }
}

/* ---------------------------------------------------------
   INICIALIZACIÓN GENERAL
   Se ejecuta cuando el DOM está listo, en cualquier página.
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  iniciarCapaBrillos();
  iniciarCorazonesFlotantes();
  iniciarTypewriter();
  iniciarNavegacionInterna();
  iniciarPassword();
  iniciarCarta();
  iniciarCarrusel();
  iniciarReproductor();
});
