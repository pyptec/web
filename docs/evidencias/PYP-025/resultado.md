# PYP-025 — Implementación CLG y posicionamiento orgánico

Fecha: 2026-10-18, America/Bogota. [Prompt completo](../../prompts/PYP-025.md). [Confirmación adicional del usuario](../../prompts/PYP-025-confirmacion-funciones.md). [Arquitectura implementada](../../arquitectura/PYP-025-clg-seo.md).

## Resultado

Página CLG implementada en /proyectos/clg/ y optimizada dentro de esta misma intervención, sin crear otra tarea o publicar. Incluye imágenes existentes, modalidades Media/Alert/Safety IP, siete preguntas visibles y CTA al formulario actual.

El HTML inicial de las cinco rutas contiene texto relevante y un H1, además de los metadatos. Las cuatro páginas previas conservan sus valores SEO exactos. El generador continúa produciendo los HTML y sitemap durante el build; ahora prerenderiza los mismos componentes que hidrata React.

Estado: lista para revisión local. No se ha realizado commit, push, despliegue o solicitud de indexación. No se afirma posición, indexación, recepción de mensajes o estado remoto nuevo.

## Base de hechos y recursos

Se leyeron AGENTS.md y la propuesta PYP-024 y se inspeccionó Git antes de editar. HEAD inicial: 6bef36f0c052672e55c1b8a242e07290e5f07376, rama main. Se conservan dos bajas raíz, cambios documentales y evidencias anteriores y la carpeta de imágenes CLG ya sin seguimiento. [Estado inicial y hashes](./estado-inicial.json).

Además de los nueve hechos confirmados en PYP-024, el usuario confirmó expresamente en esta tarea:
- Programación horaria mediante RTC.
- Música ambiental con pausa para reproducir anuncios.
- Conexión al amplificador existente.

No se confunden estas confirmaciones con una prueba técnica de firmware de Codex. Las reglas precisas de eventos/pulsadores y relés se configuran y verifican por proyecto. Safety IP sigue como modalidad propuesta; no se le atribuyen certificaciones, logs, supervisión o audio IP avanzado.

A diferencia de PYP-024, al comenzar esta intervención había siete recursos nuevos en src/assets/proyectos/clg/. Se inspeccionaron visualmente todos:

| Recurso original | Dimensiones | Bytes | Uso |
| --- | --- | ---: | --- |
| clg-audio-serie.jpg | 1599×899 | 88.145 | Foto principal; copia exacta en public/clg-audio-comercial.jpg para una URL OG estable |
| clg-conexiones.jpg | 721×1600 | 79.923 | Conectores del equipo, secundaria diferida |
| clg-frontal.jpg | 721×1600 | 85.146 | Frente del equipo, secundaria diferida |
| clg-ethernet.jpg | 1599×899 | 88.160 | Vista de conexiones/red, secundaria diferida |
| clg-hat.jpg | 721×1600 | 175.471 | Hardware interno HAT, secundaria diferida |
| clg-dashboard.png | 1110×823 | 26.715 | Captura de administración de archivos, identificada como captura |
| clg-infografia.png | 1536×1024 | 1.896.839 | Conservada sin cambios; no se importa ni publica como prueba de funciones |

Son fotografías del equipo, no un registro de las 47 instalaciones. La captura no demuestra supervisión o logs. La imagen antigua clg.jpeg y el logo permanecen intactos.

Las seis imágenes utilizadas suman 543.560 bytes, antes del logo compartido. Se mantienen originales con tamaños adecuados sin recomprimirlos o reducir calidad. Todas declaran alt y dimensiones. La principal usa carga eager, fetchpriority=high y preload; las cinco secundarias usan lazy. No se utiliza ninguna imagen inventada o inexistente.

## Intención y contenido

Las diez expresiones del prompt se tratan como hipótesis, sin volúmenes ni posición comprobados. Se integran de forma natural alrededor de publicidad por audio para comercios en Colombia, mensajes por horario/eventos, perifoneo, música, pulsadores, red y amplificadores.

H1 único: **Publicidad programable y comunicación inteligente con CLG**.

La página desarrolla publicidad y música, horarios/RTC y apertura/cierre, eventos, red local/remota, hardware e interfaces, modalidades, imágenes, aplicaciones, preguntas y contacto. Presenta ejemplos concretos sin ofrecer compatibilidad universal o disponibilidad independiente de energía/contenidos/configuración.

Las siete FAQ están siempre visibles, sin acordeón o interacción obligatoria:
1. Qué es la publicidad programable por audio.
2. Cómo programar anuncios en un supermercado.
3. Operación sin Internet y diferencia con acceso remoto.
4. Conexión al amplificador.
5. Mensajes mediante pulsador.
6. Administración en varias ubicaciones.
7. Diferencia entre Media y Alert, y alcance propuesto de Safety IP.

No se añade FAQPage JSON-LD. Google retiró los resultados enriquecidos FAQ en mayo de 2026 y retiró su documentación en junio; las preguntas se conservan por su utilidad para el visitante. [Actualizaciones oficiales de Google](https://developers.google.com/search/updates).

## Título, canonical y Open Graph

| Campo | Valor |
| --- | --- |
| Título | Publicidad Programable y Audio Comercial &#124; CLG PYP |
| Description | Sistema CLG de PYP para publicidad programable, música y mensajes automáticos por horarios o eventos. 47 unidades instaladas en Colombia. |
| Canonical / og:url | https://pyptecnologia.com/proyectos/clg/ |
| og:title / og:description | Valores específicos anteriores, desde la fuente SEO compartida |
| og:type / og:locale | website / es_CO |
| og:image | https://pyptecnologia.com/clg-audio-comercial.jpg |
| Tipo y dimensiones OG | image/jpeg, 1599×899 |
| Alt OG | Equipo CLG de PYP con conector de audio y puerto serie, fotografiado sobre una mesa |

El sitemap contiene cinco URLs únicas con barra final: Inicio, Monitoreo, IoT, Edge y CLG. Las cuatro canonical/títulos/descriptions/OG anteriores se compararon con el código inicial y resultaron idénticos. robots.txt conserva Allow: / y la referencia a sitemap, sin noindex agregado.

El enlace “Conocer CLG” está en la tarjeta existente de Proyectos en Inicio y aparece en el HTML inicial. El breadcrumb Inicio > Proyectos > CLG usa /#proyectos, sin crear una página adicional. Navbar/SectionNav se reutilizan sin cambios; sus anclas y los CTA de contacto funcionan en el recorrido probado.

## HTML inicial y React

La arquitectura anterior solo generaba metadatos y dejaba el contenido para JavaScript. Para cumplir el requisito de texto inicial se incorporaron:
- SiteRoutes compartido por BrowserRouter y StaticRouter.
- Entrada SSR de build usando renderToString.
- Manifest de Vite para resolver las URLs de imágenes.
- Prerenderizado de las cinco rutas dentro del generador SEO.
- hydrateRoot para el artefacto y createRoot para desarrollo sin prerender.

No se añaden dependencias, servicios o un servidor de producción. No hay contenido distinto para robots. El formulario oculto se conserva y el componente/formulario visible de Inicio mantiene su estructura; no se realizan envíos.

La generación se repitió y sus seis hashes (cinco HTML y sitemap) permanecieron idénticos. El contenido CLG y las siete FAQ se visualizaron con JavaScript desactivado. [Idempotencia](./idempotencia.json), [prueba sin JavaScript](./sin-javascript.json), [captura](./clg-sin-javascript-375.png).

El prerenderizado sigue el criterio de facilitar acceso al contenido para lectores y rastreadores, también cuando no ejecutan JavaScript. [Guía oficial de JavaScript SEO](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

## Datos estructurados

Se reutilizan las declaraciones Organization y WebSite corporativas existentes en index.html, sin duplicarlas. CLG añade un único grafo con:
- BreadcrumbList: Inicio, Proyectos y CLG, coherente con los enlaces visibles.
- Product: nombre CLG/Cliente Ganador, descripción, imagen, URL, marca PYP y manufacturer como referencia al Organization existente.

No hay offers, precios, disponibilidad, ratings, reseñas o certificaciones inventados. El Product identifica el producto semánticamente; no se declara elegibilidad para resultados enriquecidos de producto, que exigen datos adicionales. [Product en Schema.org](https://schema.org/Product), [requisitos de Google para product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet).

JSON-LD parseado en los cinco HTML y en el DOM, con una sola Organization. Al navegar desde CLG a Inicio mediante React se retira el grafo de página y al volver se restaura una sola instancia. [Prueba de interacción](./interacciones.json). No se ejecutó un validador remoto de resultados enriquecidos sobre una página aún sin publicar.

## Pruebas realizadas

- Build comercial Vite temporal: salida 0, 1619 módulos, 20,08 s de build. JS principal 316,10 kB (89,58 kB gzip), CSS 25,31 kB (5,43 kB gzip). [Comando](./build-comercial.json), [salida](./build-comercial-01.stdout.txt).
- Generación SEO/contenido inicial: salida 0 tras ajustar la resolución ESM de React Router en SSR. Cinco HTML y sitemap. [Registro final](./generacion-seo.json).
- **177 comprobaciones locales, cero fallos**: metadatos anteriores, cinco HTML/H1/JSON-LD, recursos, nueve variantes HTTP con/sin barra, idempotencia, navegador y contenido sin JavaScript. [Detalle](./comprobaciones.json), [HTTP](./http-local.json).
- Edge headless: 18 estados de escritorio/móvil (1440 y 375 px), tablet a 768 px; menú/Escape, foco y anclas. Sin overflow de página en el recorrido aprobado, sin errores de hidratación o consola y sin HTTP >=400/fallos de red. [Navegador](./navegador.json), [tablet](./tablet.json), [captura escritorio](./pagina-proyectos-clg-1440.png), [captura móvil](./pagina-proyectos-clg-375.png).
- Comprobación puntual de navegación React y retirada/restauración de JSON-LD, seis imágenes con alt/dimensiones y ningún enlace sin nombre en CLG. [Interacciones](./interacciones.json).
- Medición local puntual: LCP 1.320 ms y CLS aproximado 0,0049. Es laboratorio en Edge/servidor local, no CrUX/Core Web Vitals de campo. INP de campo, móvil físico y auditoría WCAG completa no medidos. [Datos de laboratorio](./interacciones.json); [criterios Web Vitals](https://web.dev/articles/vitals).
- npm audit --omit=dev: salida 0, cero vulnerabilidades de producción. No se actualizaron paquetes. [Comando](./npm-audit-produccion.json), [salida](./npm-audit-produccion-01.stdout.txt).
- VitePress aislado: salida 0, 48,52 s de build (55,49 s de proceso). Cierre documental: resultados en [build-docs.json](./build-docs.json) y [validacion-final.json](./validacion-final.json).

El modelo HTTP local no emula Netlify. Sin redirecciones nuevas; los 301 reales, MIME/canonical públicos y caché CDN se comprobarán después de una publicación autorizada. No se afirma que la ruta esté publicada o indexada ahora.

## Incidencias corregidas

El primer prerenderizado detectó resolución CommonJS de StaticRouter en Vite; se seleccionaron las exportaciones ESM con las condiciones de SSR y sin externalizar los paquetes de Router. No se cambió su versión. Los intentos fallidos y sus logs se conservan.

El primer recorrido registró dos fallos transitorios al comenzar sobre HTML prerenderizado antes de terminar la carga. El comprobador ahora espera documento y fuentes completos; el segundo recorrido aprobó las 177 comprobaciones sin cambiar el producto para ocultar los fallos. [Primer recorrido conservado](./primer-recorrido/comprobaciones.json). También se corrigió una declaración duplicada en una operación de edición antes de que escribiera cambios.

Persisten advertencias de datos Browserslist/baseline antiguos; no se actualizan dependencias. Las advertencias LF/CRLF no se resuelven con normalización masiva.

## Archivos y preservación

Nuevos archivos de implementación:
- src/pages/CLG.jsx
- src/data/clg.js
- src/data/clg-meta.js
- src/data/structuredData.js
- src/SiteRoutes.jsx
- src/entry-server.jsx
- public/clg-audio-comercial.jpg

Modificados:
- src/main.jsx: rutas compartidas e hidratación.
- src/App.jsx: únicamente el enlace CLG de la tarjeta.
- src/components/Seo.jsx: gestión del JSON-LD específico al navegar.
- src/data/seo.js: entrada CLG e imagen OG por página; valores previos preservados.
- scripts/generar-seo.mjs: HTML inicial, metadatos y sitemap.
- vite.config.js: manifest.
- public/sitemap.xml: quinta canonical.
- docs/BITACORA_DESARROLLO.md y docs/prompts/index.md.

Documentación nueva: prompt completo, confirmación adicional, este informe/evidencias y docs/arquitectura/PYP-025-clg-seo.md. Las siete imágenes fuente CLG ya existían sin seguimiento; no se atribuyen como creadas o modificadas por Codex. Las fuentes de las otras tres páginas, Navbar, SectionNav, helper de scroll, formulario/index.html, logo, fotos originales, robots, favicon, package.json y lock se conservan.

[Lista exacta e integridad final](./validacion-final.json). Se comparan los 17 hashes de dist, el índice Git y todos los archivos previos fuera de las modificaciones autorizadas. No se utiliza dist existente para validar ni se ejecutan git add, commit, push o despliegue.

## Procedimiento posterior a la publicación: Search Console

Este procedimiento está documentado, **no ejecutado**:
1. Una persona autorizada verifica la propiedad de dominio pyptecnologia.com en Google Search Console usando el método que ofrezca la consola.
2. Después de publicar y comprobar HTTP/robots/canonical, envía https://pyptecnologia.com/sitemap.xml.
3. Inspecciona https://pyptecnologia.com/proyectos/clg/ y ejecuta la prueba de URL publicada si corresponde.
4. Solicita indexación si procede y si la consola lo permite.
5. Revisa el estado de indexación, canonical elegida y posibles bloqueos; conserva la evidencia real.
6. Consulta impresiones, clics, CTR y consultas con periodo, país y URL comparables.
7. Ajusta título y contenido según consultas reales, manteniendo exactitud comercial.

Enviar un sitemap no garantiza rastreo o indexación. No se accedió a cuentas ni se solicitaron verificaciones o cambios DNS. [Search Console, guía oficial](https://developers.google.com/search/docs/monitor-debug/search-console-start), [sitemaps, Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). Tampoco se afirma indexación en Bing u otros motores.

## Pendientes y aprobación

Revisión local de contenido/diseño y autorización posterior de publicación. Tras ella: comprobar CDN/rutas/redirecciones, sitemap/OG, datos estructurados y Search Console. Las métricas de campo requieren datos posteriores al despliegue; no se prometen posiciones. Recepción y notificaciones del formulario siguen pendientes, sin mensajes enviados.

La implementación y el SEO de CLG están autorizados por el resultado solicitado en PYP-025 y se entregan juntos. No se publican todavía ni se crean tareas independientes. Cambios y eliminaciones previos conservados; ningún commit, push o despliegue realizado.

Cierre administrativo: última generación con HMR explícitamente desactivado, sin variación de los hashes del artefacto validado. VitePress ya había generado el informe y la arquitectura; no se repite tras estas anotaciones y el inventario final. Git y dist se verifican en validacion-final.json, con lista exacta en [archivos-PYP-025.json](./archivos-PYP-025.json).
