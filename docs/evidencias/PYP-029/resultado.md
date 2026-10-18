# PYP-029 — Publicación CLG y SEO competitivo

Fecha: 2026-10-18 (America/Bogota).

## Autorización y estado inicial

[Prompt completo](../../prompts/PYP-029.md): aprobación visual PYP-028 y autorización expresa de staging selectivo, commit y push a main condicionados a verificaciones críticas. Sin force push ni envíos al formulario.

Se leen AGENTS.md, informes y diferencias PYP-027/028. HEAD inicial 1aef3de6de7264696e1fc6f3904ce1ab007ded75, rama main, índice vacío. Se conservan las dos eliminaciones raíz, documentación PYP-024 y evidencias ajenas PYP-019/022/023. git-inicial.txt registra el estado completo. La documentación local posterior a PYP-027 se conserva y se incluirá selectivamente por pertenecer al encargo.

## Corrección VitePress

Dos enlaces del cierre PYP-027 apuntaban a build-comercial-staged.log y generacion-staged.log, que VitePress trataba como páginas. Se crean copias .txt byte a byte y se actualizan únicamente ambas referencias. Se conservan los logs originales y toda la información histórica. No se modifica la configuración ni se desactiva la comprobación de enlaces.

## Contenido y SEO

Se publica el diseño aprobado PYP-028 sin rediseño: producto propio, Edge, hardware 4/4/4, diagrama, RTC y caso de 47 dispositivos relacionado con Alkosto/Ktronix. MQTT sigue pendiente de verificación y las vías industriales se describen como integraciones por proyecto, sin atribuirlas a todas las unidades.

Los grupos de intención ya están cubiertos por las secciones aprobadas; se evitan cambios de texto innecesarios. Ajustes mínimos: enlace descriptivo en la tarjeta CLG de Inicio y enlaces contextuales desde IoT Industrial y Automatización Edge. Sin nuevas URLs, FAQPage, certificaciones, comparaciones, dependencias o cambios al formulario. Los textos técnicos de otros casos se conservan y no se atribuyen a CLG.

[Guía Search Console, estrategia y seguimiento](./seguimiento-seo.md). Indexación y métricas sin comprobar; no hay conexión autorizada a la cuenta.

## Validación y publicación

En curso. Los resultados de builds, rutas, SEO, navegador, audit, diff e integridad se incorporarán antes del commit. Si falla una comprobación crítica no se publicará. Se compilará una copia selectiva sin Appcopia.jsx ignorado para comparar los recursos con producción sin alterar archivos ajenos.

Estado inicial de commit/push/despliegue PYP-029: pendientes. El resultado posterior se registrará con evidencia; no se asume publicación por el push.

## Cierre de verificaciones previo al staging

- Build comercial temporal y generación SEO: código 0; cinco HTML iniciales y sitemap.
- VitePress estricto: código 0, sin ignoreDeadLinks ni excepciones, 29.75 s de proceso. Se resuelve la incidencia histórica de PYP-028 sin perder los logs de PYP-027.
- 180 controles de SEO/HTTP/navegador y 13 adicionales: todos correctos. Incluyen H1 único, IDs, canonical/OG, JSON-LD, cinco sitemap, robots, enlaces entrantes, imágenes, anclas/foco, menú/Escape, tablet, 18 estados 1440/390 y CLG sin JavaScript. Sin fallos de consola o red ni intentos de envío.
- Revisión visual de capturas CLG a 1440 y 390: conserva diseño aprobado e infografía completa/ampliable; documento sin overflow.
- npm audit --omit=dev: código 0, cero vulnerabilidades. Formulario, dependencias y los 17 hashes de dist intactos.
- Revisión de patrones de secretos y diferencias: sin hallazgos. El detector inicial confundió delimitadores HTML con una URL autenticada; se acotó a URLs válidas sin atravesar comillas. No se registran valores sensibles.
- Rendimiento local: JS ~328.56 kB (92.26 kB gzip), CSS ~25.44 kB (5.48 kB gzip). Infografía existente ~1.90 MB conservada por aprobación; sin error de carga. Mediciones del navegador son de laboratorio y no certifican Core Web Vitals de campo.
- Fetch/ls-remote: main y origin/main coinciden en 1aef3de6de7264696e1fc6f3904ce1ab007ded75; sin divergencia, índice inicialmente vacío.

Evidencias: comprobaciones.json, comprobaciones-adicionales.json, navegador.json, http-local.json, revision-secretos.json, logs de build-docs/build-comercial y npm-audit-produccion.json. Capturas pagina-proyectos-clg-1440.png y pagina-proyectos-clg-390.png.

[Manifiesto selectivo](./manifiesto.json): siete archivos fuente; documentación/evidencias PYP-027 posteriores, PYP-028 y PYP-029. Se excluyen PYP-024, las bajas raíz, evidencias PYP-019/022/023, dist, Appcopia.jsx y temporales. Las secciones ajenas de bitácora/índice se conservarán en el árbol de trabajo mediante staging parcial. La copia exacta del índice se compilará y verificará antes del commit.

La referencia HTTP anterior al push devuelve la versión anterior, por lo que sus metadatos CLG y recursos no coinciden con los nuevos esperados: resultado previsto, conservado en http-produccion-pre.json. No se interpreta como fallo del producto nuevo ni como publicación exitosa.

## Validación del índice exacto y preparación del commit

Manifiesto final: 187 archivos seleccionados, siete fuentes y 180 de documentación/evidencias. git diff --cached --check correcto; sin dist, dependencias, formulario, PYP-024 o bajas ajenas. Se normalizan CRLF únicamente en la bitácora del índice y se excluye un log vacío de PYP-028, conservándolo localmente. El primer intento de staging se detuvo por esos detalles; no hubo commit prematuro.

Build del índice selectivo y prerender correctos: JS index-Bwp3tKC_.js (328.56 kB, 92.26 kB gzip) y CSS index-CAWKzJcL.css (24.44 kB, 5.35 kB gzip). La diferencia CSS respecto del workspace procede de clases en Appcopia.jsx ignorado; no se modifica ni publica ese archivo. VitePress estricto sobre el índice: código 0, 24.48 s, sin excepciones.

Prueba adicional sobre este artefacto: 175 controles originales correctos; cinco comparaciones del formulario se verifican después normalizando solo CRLF. Los cinco formularios coinciden íntegramente con el original al normalizar saltos de línea. Las fuentes del sitio seleccionadas coinciden con la copia compilada; el formulario fuente permanece fuera del diff. Consolidado local prepublicacion.json: todas las condiciones críticas correctas. Se conservan comprobaciones originales y evidencia de la normalización, sin presentar los falsos positivos como cambios del formulario.

Una ejecución del auxiliar de navegador reutilizó un puerto anterior y se detuvo solo su árbol de procesos; se corrigió la preparación para leer el origen actual y se repitió. La segunda ejecución terminó sin errores de navegador y sin cambios del sitio.

Se procede al único commit y push autorizados después de reconfirmar main/origin. Los resultados posteriores, SHA y evidencia pública se añadirán localmente al informe y bitácora; no se crea un commit adicional solo para registrar su propio identificador.
