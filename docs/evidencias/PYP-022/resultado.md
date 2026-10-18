# PYP-022 — Corrección de favicon, SEO y validación de Netlify

Fecha: 2026-10-18, America/Bogota. [Prompt completo](../../prompts/PYP-022.md).

## Resultado

Correcciones implementadas y validadas en el artefacto local temporal: favicon SVG y cuatro canonical con barra final coherentes con og:url, HTML inicial, React y sitemap. No se publican cambios. La web de producción no incorpora estas correcciones mediante esta intervención.

El usuario reporta en PYP-022 su comprobación manual en Netlify: despliegue publicado y contacto-pyp reconocido en Forms. Se registra como **confirmación manual aportada por el usuario**, no como una consulta de Codex al panel. No hay evidencia del SHA exacto del despliegue. Recepción y notificaciones del formulario siguen pendientes de prueba.

## A. Diagnóstico

Se leyeron AGENTS.md, informe PYP-021, index.html, public/, src/data/seo.js, scripts/generar-seo.mjs, sitemap, robots, componentes SEO/Router y configuración de Vite/VitePress antes de modificar archivos.

index.html ya referencia /favicon.svg con rel=icon y type=image/svg+xml, pero public/favicon.svg no existía. PYP-021 había observado HTTP 200 text/html para ese recurso en producción debido al fallback SPA. Esta auditoría no repite ni presenta aquella respuesta como comprobación nueva.

getSeoPage en src/data/seo.js suministra metadatos a Seo.jsx y al generador HTML. Las canonical interiores carecían de barra final, mientras PYP-021 verificó redirecciones CDN hacia barra final. public/sitemap.xml era estático; scripts/generar-seo.mjs todavía no lo generaba.

El logotipo src/assets/proyectos/log_pyp.webp se inspeccionó visualmente: emblema metálico raster con detalles y degradados. Se conserva intacto; no se vectoriza ni se rediseña.

## B. Corrección

- Nuevo public/favicon.svg: símbolo geométrico de conexiones, fondo #1E1E1E y verdes #A6CE39/#6BA425, viewBox 0 0 64 64. Es un icono auxiliar de acceso, sin presentarlo como nuevo logotipo oficial. SVG autónomo, sin imágenes, fuentes, scripts ni referencias externas.
- index.html no necesita cambios: su referencia existente coincide con el archivo añadido.
- getSeoPage normaliza la barra final de la entrada y construye canonical con una barra final para las páginas interiores; la raíz permanece igual. Ambos formatos de entrada devuelven los mismos metadatos.
- scripts/generar-seo.mjs conserva la generación de cuatro HTML y ahora genera sitemap.xml a partir de SEO_PAGES/getSeoPage. No se duplica una lista de URLs en configuración nueva.
- public/sitemap.xml se actualiza con la salida del generador; durante cada build, el generador vuelve a escribir el sitemap de salida desde la fuente SEO, evitando depender de una copia obsoleta. Su orden sigue las claves SEO; el conjunto conserva las mismas cuatro páginas.
- Sin cambios en rutas React Router, Navbar, SectionNav, componentes funcionales, formularios, redirecciones, robots o configuración. Títulos, descriptions y recursos gráficos existentes conservados.

## C. Canonical anteriores y nuevas

| Página | Anterior | Nueva, también og:url y sitemap |
| --- | --- | --- |
| Inicio | https://pyptecnologia.com/ | https://pyptecnologia.com/ |
| Monitoreo energético | https://pyptecnologia.com/monitoreo-energetico | https://pyptecnologia.com/monitoreo-energetico/ |
| IoT industrial | https://pyptecnologia.com/iot-industrial | https://pyptecnologia.com/iot-industrial/ |
| Automatización Edge | https://pyptecnologia.com/automatizacion-edge | https://pyptecnologia.com/automatizacion-edge/ |

## D. Archivos modificados

Modificaciones de producto:
- src/data/seo.js
- scripts/generar-seo.mjs
- public/sitemap.xml

Nuevo recurso:
- public/favicon.svg

Documentación:
- docs/BITACORA_DESARROLLO.md: nueva entrada cronológica, conserva contenido anterior PYP-021.
- docs/prompts/index.md: enlace PYP-022, conserva cambios previos.
- docs/prompts/PYP-022.md: copia literal del adjunto, sin reconstruir instrucciones.
- docs/evidencias/PYP-022/: este informe, inventarios, scripts de diagnóstico, logs, validaciones, cuatro HTML y ocho capturas PNG. [Inventario exacto de cambios de esta intervención](./archivos-PYP-022.json).

Salidas temporales de compilación y perfil anónimo de Edge quedan dentro de build-temporal/ y browser-profile/ en PYP-022, ignorados por reglas ya existentes. No se eliminan archivos ni se alteran ignores.

## E. Pruebas

### Build comercial y generación SEO

Vite 6.4.4: salida 0, 1609 módulos, build en 4,09 s. Ejecución equivalente a Vite build más scripts/generar-seo.mjs, con outDir explícito docs/evidencias/PYP-022/build-temporal/comercial. No se ejecuta npm run build con su destino dist predeterminado. [Comando/tiempo](./build-comercial.json), [salida](./build-comercial.stdout.txt), [advertencias](./build-comercial.stderr.txt).

Generador SEO: salida 0, cuatro HTML y sitemap. [Comando](./generacion-seo.json), [salida](./generacion-seo.stdout.txt). Se probó además que reemplaza un sitemap obsoleto simulado exclusivamente en el artefacto temporal y conserva los hashes de los cuatro HTML y del sitemap al regenerar: [idempotencia](./seo-idempotencia.json).

### Validación de páginas y recursos

103 comprobaciones, cero fallos: [detalle](./comprobaciones.json).

- Cuatro títulos/descriptions individuales correctos; canonical y og:url explícitos con barra final en cuatro HTML y en DOM React.
- Siete solicitudes HTTP locales (raíz e interiores con/sin barra) devuelven 200 y los metadatos correspondientes.
- Cuatro URLs exactas en sitemap, XML sin errores de parseo y copia pública idéntica a la generada.
- robots idéntico al original, referencia a https://pyptecnologia.com/sitemap.xml.
- Favicon copiado por Vite, SHA idéntico al de public; HTTP local 200 image/svg+xml con SVG, sin HTML.
- DOMParser del navegador valida namespace y raíz SVG y XML de sitemap. Image.decode() acepta el favicon y devuelve dimensiones positivas; rel=icon apunta a /favicon.svg. [Evidencia SVG/XML](./xml-favicon-navegador.json).
- Formularios estáticos de las cuatro páginas idénticos al de index.html; siete campos conservados. Sin envío ni modificaciones.
- Imagen OG, recursos referenciados y fallback conservados.

[HTTP local](./http-local.json), [servidor de prueba](./servidor-local.json). El servidor de archivos/directorios no emula las redirecciones Netlify; los 200 locales sin barra no son una nueva política de redirección. El MIME local corresponde al servidor de prueba; deberá comprobarse en CDN después de una futura publicación autorizada.

### Navegador

Edge headless CDP, escritorio 1440×1000 y móvil emulado 375×1000, reduced-motion. Catorce cargas (7 URLs × 2 tamaños), Soluciones/Escape y navegación entre páginas correctos. 56 anclas comprobadas con foco y encabezados visibles debajo de Navbar; sin overflow horizontal de página. Regreso React a /#contacto actualiza SEO a Inicio, enlaces Proyectos/Tecnología conservan foco y desplazamiento.

174 respuestas de red observadas, cero HTTP >=400, cero loadingFailed y cero errores/warnings de consola/Log. Sin intentos POST. [Registro](./navegador.json), [salida del comprobador](./navegador.stdout.txt). Ocho capturas pagina-*.png; Inicio móvil se inspeccionó visualmente sin roturas generales.

No es una prueba en móvil físico, todos los navegadores o todos los CTA. No se prueba recepción de mensajes. Servidor y navegador de prueba se cierran al terminar.

### VitePress y cierre

Compilación con raíz docs/ y configuración docs/.vitepress/, independiente del build comercial. Salida, SSR y cachés aislados dentro de PYP-022/build-temporal. [Resultado de ejecución](./build-docs.json), [salida](./build-docs.stdout.txt), [advertencias/errores](./build-docs.stderr.txt). VitePress terminó con salida 0 en 8,26 s (9,45 s de proceso). Se conservan las advertencias de datos Browserslist/baseline antiguos. Resultado final e integridad documental en [validacion-final.json](./validacion-final.json).

git diff --check y enlaces documentales comprobados al cierre. Las advertencias LF/CRLF de Git no se corrigen mediante normalización masiva. Incidencia de pruebas: se corrigió un paréntesis del script de comprobación después de un error de sintaxis; la ejecución fallida no inició las pruebas ni alteró el producto. La ejecución posterior aprobó las 103 comprobaciones.

## F. Seguridad

npm audit --omit=dev --json: exit 0, **cero vulnerabilidades de producción**, 11 dependencias prod reportadas. [Resultado](./npm-audit-produccion.stdout.txt), [comando](./npm-audit-produccion.json). Sin actualizaciones, instalaciones ni npm audit fix; no se extiende el resultado a devDependencies.

Advertencias de build comercial: baseline-browser-mapping y caniuse-lite/Browserslist desactualizados. Se registran sin actualizar dependencias.

## G. Integridad de dist y archivos existentes

[Estado inicial](./estado-inicial.json): 541 archivos previos inventariados por SHA-256, excluyendo node_modules, metadatos Git y salidas/perfiles temporales previos; índice Git con hash separado. Incluye los 17 archivos locales de dist.

[Verificación final](./validacion-final.json): comparación del inventario, listado de cambios esperados/inesperados, conservación de los 17 hashes dist, logo, formulario/index.html, componentes, dependencias, configuración e índice. Ningún archivo eliminado por PYP-022.

## H. Git

Rama main, HEAD inicial 4f0a960377f3e3ea16e3c9a32f19847308be85cb. Antes de editar ya estaban eliminados localmente 01_ESTADO_Y_BITACORA.md y 04_BITACORA_001_RESULTADO.md; se preserva ese estado sin restaurar ni eliminar más archivos. Bitácora/índice ya contenían cambios de PYP-021; permanecen. También se conservan docs/prompts/PYP-021.md, docs/evidencias/PYP-021/ y la copia cruda PYP-019 sin seguimiento.

Sin git add, commit, push o despliegue; índice y HEAD se verifican al cierre. Estado Git y diff se conservan en validacion-final.json y archivos-PYP-022.json, separando cambios previos de los de esta intervención.

## I. Producción y Netlify Forms

| Comprobación | Procedencia y estado |
| --- | --- |
| Despliegue visible como publicado | Confirmación manual reportada por el usuario en PYP-022 |
| contacto-pyp reconocido en Netlify Forms | Confirmación manual reportada por el usuario en PYP-022 |
| SHA exacto del despliegue | No confirmado; sin evidencia que lo vincule al commit esperado |
| Favicon y SEO corregidos | Validados localmente; sin publicación de PYP-022 |
| Recepción de mensajes | Pendiente, sin envíos |
| Configuración de notificaciones | Pendiente de verificar |

Pendientes de producción: autorizar en otra intervención commit/push/publicación, verificar después favicon MIME y canonical/og:url/sitemap en CDN y confirmar SHA desplegado. Para Forms, quedan pendientes la recepción y las notificaciones; no se mantiene como pendiente su reconocimiento, ya confirmado manualmente por el usuario. No se realizó una consulta nueva al panel ni se enviaron mensajes.

Aprobación: correcciones y pruebas locales autorizadas por PYP-022. Commit, push, despliegue y envíos no autorizados ni ejecutados.

Cierre administrativo: compilaciones aprobadas; no se repitió VitePress después de este cierre y del inventario final. El HTML documental del informe ya fue generado. Estado de aprobación/commit/publicación sin cambios.
