# PYP-027 — Publicación controlada de CLG

Fecha: 2026-10-18, America/Bogota. [Prompt completo](../../prompts/PYP-027.md).

## Alcance y autorización

Propietario aprueba visualmente PYP-025/PYP-026 y autoriza staging selectivo, un commit y push seguro a main. No se alteran funcionalidades adicionales ni se realizan despliegues manuales o envíos. Base: 6bef36f0c052672e55c1b8a242e07290e5f07376; main y origin/main sin divergencia tras fetch.

Únicos cambios funcionales a publicar: CLG, enlace desde Proyectos, rutas compartidas, prerenderizado/hidratación, metadatos/JSON-LD de CLG, manifest Vite, sitemap y recursos gráficos. Las cuatro entradas SEO previas se comparan con la base y siguen idénticas. No se modifican componentes/formulario, dependencias ni los 17 archivos dist. El formulario oculto de index.html permanece idéntico en cinco HTML compilados; formulario visible y navegación revisados sin envíos.

[Manifiesto exacto](./manifiesto.json). Se excluyen las dos eliminaciones raíz anteriores, PYP-019/PYP-022/PYP-023 pendientes, documentación PYP-024, temporales, perfiles, cachés y dist. Bitácora e índice se preparan parcialmente para conservar localmente PYP-024 sin publicarlo. Documentación PYP-025/PYP-026 conserva su estado histórico; la aprobación/publicación posterior se registra aquí.

## Validaciones previas satisfactorias

- Build comercial aislado y generación de cinco HTML: salida 0. No se usa dist local como destino.
- 180 comprobaciones, cero fallos: cinco rutas, nueve variantes HTTP, HTML inicial/H1, canonical, description, OG, Organization/WebSite/BreadcrumbList/Product, sitemap, robots, recursos e idempotencia.
- Edge: 18 estados de escritorio 1440/móvil 390, tablet 768, contenido CLG sin JavaScript, navegación, menús/Escape, anclas/foco, enlaces y formulario sin envíos. Sin errores de consola, hidratación, red o HTTP >=400.
- Infografía aprobada completa a 1440 y 390, proporción 3:2 sin recorte ni desbordamiento horizontal del documento. Enlace original HTTP 200 y tres fotografías en galería técnica cargadas. [Prueba](./infografia.json), [escritorio](./clg-1440.png), [móvil](./infografia-390.png).
- npm audit --omit=dev: salida 0, cero vulnerabilidades de producción. Sin audit fix ni actualizaciones.
- Revisión de patrones de secretos y lectura de código/configuración: sin hallazgos; [detalle](./revision-secretos.json). No equivale a una certificación exhaustiva.
- VitePress, diff e integridad final: resultados en build-docs.json y prepublicacion.json antes del commit.

## Evidencias

[Pruebas](./comprobaciones.json), [navegador](./navegador.json), [audit](./npm-audit-produccion-01.stdout.txt), [HTTP anterior al push](./http-produccion-pre.json), estado-inicial.json y registros de build. El HTTP anterior sirve de referencia: CLG todavía devuelve el sitio previo mediante fallback y no se declara publicada antes del push.

Incidencias: prueba de infografía inicialmente sin acceso al puerto Edge porque otra prueba ocupaba el mismo perfil; repetida secuencialmente y satisfactoria. Persisten avisos de datos antiguos Browserslist/baseline y conversión LF/CRLF; no se actualizan dependencias. Sin fallos críticos del producto en las validaciones previas.

## Commit, push y despliegue

Estado al preparar este documento: pendientes. El SHA, resultado del push y verificación pública se registrarán después de ejecutarlos; no se infieren a partir del build local. No hay CLI/panel Netlify configurado ni herramienta Netlify disponible. Se comprobará HTTP y, si es accesible, el estado reportado por la integración en GitHub. Ninguna petición HTTP por sí sola prueba el SHA asociado en Netlify.

## Preparación para Google y pendientes

Antes de declarar preparación pública se comprobarán sitemap de cinco URLs, ausencia de noindex y X-Robots-Tag restrictivo, robots, enlace interno y canonical CLG HTTP 200. **Indexación pendiente hasta comprobar Google Search Console.** No se accede a la cuenta ni se solicita indexación en esta intervención.

Procedimiento para una persona autorizada:

1. Abrir Search Console y verificar la propiedad pyptecnologia.com con el método disponible.
2. En Sitemaps, enviar https://pyptecnologia.com/sitemap.xml y revisar procesamiento/errores.
3. Inspeccionar https://pyptecnologia.com/proyectos/clg/, ejecutar la prueba de URL publicada y revisar rastreo, robots y canonical seleccionada.
4. Si procede, solicitar indexación y guardar la evidencia del estado real; comprobar nuevamente después del procesamiento.
5. Consultar posteriormente rendimiento por página/país/consulta. No prometer posiciones ni plazos de indexación.

Enviar sitemap no garantiza indexación. Fuentes consultadas: [Google sobre sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap), [Search Console](https://developers.google.com/search/docs/monitor-debug/search-console-start).

Recepción/notificaciones Netlify Forms siguen sin validar: no se envían mensajes ni se confirma recepción. Sin certificación de métricas de campo, móvil físico o auditoría WCAG completa.

## Cierre previo al commit

VitePress sobre copia del índice selectivo: salida 0, 28,92 s. Se corrigió en el lanzador una ruta ESM de Windows mediante pathToFileURL; primer registro conservado. Los 17 hashes dist siguen idénticos; archivos fuente e imágenes no se modificaron durante PYP-027. Revisado el diff del índice, sin dependencias, formulario, archivos ajenos o temporales. Se procede al único commit y al push autorizado tras comprobar de nuevo origin/main. Los resultados posteriores actualizarán este informe y la bitácora localmente, sin crear un segundo commit solo para registrar el SHA del primero.
