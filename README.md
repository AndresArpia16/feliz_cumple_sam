# Sorpresa de Cumpleaños ❤️ (versión Vercel — estructura plana)

Misma web romántica, pero reorganizada en una sola carpeta sin
subdirectorios `templates/` ni `static/`, para que Vercel la despliegue
directo sin configuración adicional.

## Estructura

```
/
├── index.html
├── password.html
├── carta.html
├── aniversario.html
├── style.css
├── script.js
├── images/     → tus fotografías (foto1.jpg ... foto5.jpg)
├── music/      → tu canción (cancion.mp3)
└── README.md
```

## Cómo subirlo a Vercel

1. Sube el **contenido de esta carpeta** (no la carpeta contenedora) a tu
   repositorio de GitHub, o arrastra estos archivos directamente al
   importar un proyecto nuevo en vercel.com.
2. En "Framework Preset" elige **Other** (no es un framework, es HTML puro).
3. Deja "Build Command" y "Output Directory" vacíos — Vercel sirve los
   archivos estáticos tal cual.
4. Deploy. La URL raíz (`/`) abrirá automáticamente `index.html`.

## Cómo personalizarlo

1. **Segunda contraseña (fecha de aniversario):**
   Abre `script.js`, busca la función `iniciarPassword()` y reemplaza el
   valor de `aniversarioPassword` por la fecha que quieras usar.
   La primera contraseña ya está fija en `2010` y lleva a la carta.

2. **Texto de la carta:**
   En el mismo archivo, dentro de `iniciarCarta()`, edita la constante
   `carta` con tu propio mensaje.

3. **Fotos del aniversario:**
   Copia tus imágenes a la carpeta `images/`. Si no se llaman
   `foto1.jpg`...`foto5.jpg`, actualiza el arreglo `fotos` dentro de
   `iniciarCarrusel()`.

4. **Canción de fondo:**
   Copia tu archivo de audio a la carpeta `music/`. Si no se llama
   `cancion.mp3`, actualiza la variable `song` dentro de
   `iniciarReproductor()`.

## Nota sobre la ilustración de "Atrás"

Se usa una ilustración genérica de un perrito triste en SVG (dentro de
`index.html`) en vez del personaje Snoopy, que tiene derechos de autor.
Puedes reemplazarla por tu propia imagen en `images/` si quieres.

## Notas técnicas

- 100% HTML5 + CSS3 + JavaScript puro, sin backend ni dependencias — ideal
  para hosting estático como Vercel, Netlify o GitHub Pages.
- Todas las rutas internas son relativas y planas (`style.css`, `script.js`,
  `carta.html`, `images/foto1.jpg`, etc.), sin subir ni bajar niveles de
  carpeta, así que funciona igual sin importar dónde la despliegues.
- Responsive, con `backdrop-filter` (glassmorphism) y soporte para
  `prefers-reduced-motion`.
