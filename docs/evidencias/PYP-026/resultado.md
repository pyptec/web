# PYP-026 — Infografía principal de CLG

Fecha: 2026-10-18 (America/Bogota). [Prompt](../../prompts/PYP-026.md).

## Estado inicial y alcance

HEAD: 6bef36f0c052672e55c1b8a242e07290e5f07376. Se preservan cambios locales previos PYP-024/PYP-025, documentación y dos eliminaciones anteriores. Único archivo funcional modificado en esta intervención: src/pages/CLG.jsx. No se modifica SEO, formulario, dependencias ni imágenes originales.

## Cambio

La presentación usa src/assets/proyectos/clg/clg-infografia.png (1536 × 1024, 1.896.839 bytes). Se elimina del bloque inicial el pie real «Equipo CLG fotografiado: conexión de audio y puerto serie.». Se amplía proporcionalmente la columna visual y se utiliza ancho fluido, altura automática y object-contain, sin contenedores que recorten el contenido.

La imagen y el enlace visible «Ver infografía en tamaño completo» abren el PNG original en una pestaña nueva, con rel noopener noreferrer y nombre accesible. Alt actualizado. Carga inicial eager con prioridad alta, decodificación asíncrona y dimensiones explícitas para reservar espacio. Vite genera un recurso con hash para caché; no se recomprime el PNG ni se reduce su resolución. La prioridad y reserva de espacio optimizan su entrega y estabilidad; no se afirma una reducción de bytes o mejora medida en producción.

La foto anterior /clg-audio-comercial.jpg se conserva en la galería técnica, con carga diferida y su pie descriptivo. Se mantienen las fotos frontal, Ethernet, conexiones, HAT y dashboard. El Open Graph sigue usando la foto anterior, conforme a la restricción de no modificar SEO.

## Verificaciones satisfactorias

- Build comercial y generación de cinco HTML en build-temporal/comercial: salida 0. dist comercial no se utiliza como destino.
- Edge sobre artefacto compilado, /proyectos/clg/: HTTP 200, sin errores de consola ni recursos HTTP fallidos durante el recorrido.
- 1440 px: imagen completa de 622,39 × 414,92 px; proporción 3:2.
- 390 px: imagen completa de 300 × 200 px; proporción 3:2; enlace accesible al original 1536 × 1024 y respuesta 200.
- Sin desplazamiento horizontal del documento en ambas resoluciones. SectionNav mantiene su desplazamiento interno existente.
- Galería: tres fotografías, incluida la anterior principal; todas cargan correctamente en ambas resoluciones.
- Canonical CLG conserva https://pyptecnologia.com/proyectos/clg/.
- Integridad y diff documentados en validacion-final.json y diff-check.txt; validación documental en build-docs.json.

## Capturas

- [Escritorio 1440 px](./clg-1440.png).
- [Móvil 390 px, bloque de infografía](./infografia-390.png).
- [Inicio móvil 390 px](./clg-390.png).
- [Bloque de infografía en escritorio](./infografia-1440.png).

## Evidencias y archivos

[navegador.json](./navegador.json), estado-inicial.json, CLG.jsx.before.txt, scripts de build/navegador y registros de ejecución. Archivos de intervención: src/pages/CLG.jsx, docs/prompts/PYP-026.md, docs/prompts/index.md, docs/BITACORA_DESARROLLO.md y docs/evidencias/PYP-026/. Los directorios de compilación y perfil local son temporales e ignorados por Git.

## Incidencias y pendientes

Sin fallos confirmados del producto en estas pruebas. Primer intento de sustitución encontró CRLF y no escribió el componente; corregido conservando CRLF. Primer control del navegador tenía un selector mal escapado; corregido, segunda ejecución satisfactoria. Advertencias de datos antiguos Browserslist y baseline-browser-mapping: no se actualizan dependencias.

Pendiente revisión visual del usuario y autorización futura para publicar. No se prueba producción, caché CDN, rendimiento de campo ni recepción de Netlify Forms. No se envían formularios. Implementación local autorizada; sin staging, commit, push ni despliegue.

## Cierre de validación — 2026-10-18

VitePress aislado: salida 0 (28,90 s). Git diff --check: salida 0. Los 17 archivos de dist conservan SHA-256; índice Git sin cambios. Comparación del HTML inicial: títulos, metaetiquetas, canonical y JSON-LD idénticos a PYP-025 en las cinco rutas. Fuera de CLG.jsx, bitácora e índice de prompts no cambió ningún archivo preexistente del inventario. No se ejecutó staging, commit, push o despliegue.
