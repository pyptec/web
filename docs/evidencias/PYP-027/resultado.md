# PYP-027 — Publicación controlada de CLG

Fecha: 2026-10-18, America/Bogota. [Prompt completo](../../prompts/PYP-027.md).

**Estado final:** CLG disponible en producción; commit 1aef3de6de7264696e1fc6f3904ce1ab007ded75 enviado correctamente. Confirmación del SHA en panel Netlify e indexación pendientes. Evidencias posteriores al push conservadas localmente.

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

## Publicación y verificación final de producción

Estado final: **contenido CLG publicado y verificado por HTTP y navegador** en https://pyptecnologia.com/proyectos/clg/.

- Commit: 1aef3de6de7264696e1fc6f3904ce1ab007ded75. Mensaje: feat(clg): publicar página comercial y SEO de CLG.
- Push: salida 0; origin/main y main apuntan al mismo SHA, confirmado con ls-remote. Padre: 6bef36f0c052672e55c1b8a242e07290e5f07376. Un solo commit, sin force ni despliegue manual. [Registro](./push.json).
- Archivos publicados: 211, exactamente los del [manifiesto](./manifiesto.json): 21 archivos de implementación/recursos y 190 de documentación/evidencias. Se excluyen PYP-024, bajas raíz, evidencias ajenas, dist, perfiles y builds.
- Netlify: servidor HTTP identificado como Netlify. El contenido nuevo ya se entrega; las cinco páginas tienen contenido inicial y metadatos correctos. Los 19 recursos gráficos, JS y CSS coinciden por SHA-256 con la compilación limpia de los archivos seleccionados. No se ha consultado el panel/API autenticada de Netlify ni se puede confirmar formalmente su SHA asociado o el estado Published desde ese panel. GitHub devuelve listas vacías de statuses/check-runs/deployments; el state pending con statuses vacío no se interpreta como estado real del build. [Consulta final](./github-deployment-status-final.json).

| Ruta pública | HTTP | Canonical HTML inicial |
| --- | ---: | --- |
| /proyectos/clg/ | 200 | https://pyptecnologia.com/proyectos/clg/ |
| / | 200 | https://pyptecnologia.com/ |
| /iot-industrial/ | 200 | https://pyptecnologia.com/iot-industrial/ |
| /monitoreo-energetico/ | 200 | https://pyptecnologia.com/monitoreo-energetico/ |
| /automatizacion-edge/ | 200 | https://pyptecnologia.com/automatizacion-edge/ |
| /sitemap.xml | 200 | — |
| /robots.txt | 200 | — |
| /favicon.svg | 200 | — |

[HTTP completo y hashes](./http-produccion-post.json). Sin redirecciones en estas ocho URLs con barra final. Sin errores HTTP en 27 solicitudes: cinco páginas, tres endpoints y 19 recursos. Títulos/descriptions/canonical/OG individuales correctos, sin noindex ni X-Robots-Tag restrictivo. JSON-LD corporativo intacto; CLG añade Product y BreadcrumbList sin ofertas/reviews/certificaciones. Sitemap: cinco canonical únicas, incluida CLG; robots permite rastreo y referencia el sitemap; favicon SVG válido. Inicio enlaza CLG y la canonical de CLG responde 200. Indexación: **pendiente hasta comprobar Search Console**; no se declara indexada.

[Navegador de producción consolidado](./navegador-produccion-validacion.json): 18 estados (1440/390, variantes con y sin barra), navegación/menú/Escape/SectionNav/anclas y metadatos correctos, sin overflow de documento ni errores de consola/recursos. El primer recorrido tuvo timeout en una transición extra móvil después de completar los 18 estados; se repitió esa navegación con espera explícita de carga/fuentes y apertura del menú, y pasó sin cambiar código funcional. [Repetición dirigida](./produccion-navegacion/resultado.json). Incluye paso desde Inicio a CLG, tres fotos técnicas cargadas, infografía íntegra con enlace de ampliación y retorno al formulario de Inicio, sin envíos. [Captura escritorio pública](./produccion-navegacion/clg-infografia-1440.png), [captura móvil pública](./produccion-navegacion/clg-infografia-390.png).

La primera comparación de JS/CSS con el build del workspace difería porque Tailwind examina el archivo local ignorado src/Appcopia.jsx. Sin modificarlo o publicarlo, se compiló la copia del índice selectivo: JS index-CPtDmkS8.js y CSS index-CC0PfD1S.css coinciden exactamente en nombre, bytes y SHA con producción. También coinciden todas las imágenes. [Build limpio](./build-comercial-staged.txt), [generación limpia](./generacion-staged.txt). Así se explica y resuelve la diferencia de comprobación; los primeros intentos HTTP se conservan. Netlify normaliza las comillas del formulario estático; se adapta únicamente el detector de evidencia para reconocer ambos tipos de comillas, sin alterar el formulario.

Los 17 archivos locales de dist y todos los archivos iniciales ajenos a las dos actualizaciones documentales permanecen iguales por SHA. Sin cambios de dependencias, formulario, componentes adicionales o imágenes originales durante PYP-027. [Integridad final](./estado-final.json).

### Pendientes y estado Git

- Confirmación formal del SHA/estado/build logs en panel Netlify: no disponible desde esta sesión.
- Reconocimiento en panel Netlify Forms y recepción/notificaciones: no comprobados; no se envían mensajes.
- Search Console, indexación elegida por Google y métricas de campo: pendientes; instrucciones anteriores listas.
- Las evidencias posteriores al push, esta actualización del informe y el cierre de bitácora permanecen locales, sin staging ni segundo commit administrativo. También siguen los cambios/documentos PYP-024 y los archivos ajenos excluidos. El árbol de trabajo no queda limpio por estas razones; índice sin cambios staged.
