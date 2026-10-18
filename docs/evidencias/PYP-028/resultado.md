# PYP-028 — Auditoría preliminar

Fecha: 2026-10-18 (America/Bogota).

Estado: pendiente de recibir la continuación del prompt. El archivo recibido termina literalmente en «Antes de anunciar MQTT», apartado 6.7. Se conserva completo lo recibido, sin reconstruir instrucciones ausentes.

Se leyeron AGENTS.md, src/pages/CLG.jsx, src/data/clg.js, clg-meta.js, seo.js, structuredData.js, scripts/generar-seo.mjs, public/sitemap.xml, el bloque CLG de src/App.jsx y los prompts PYP-025, PYP-026 y PYP-027. Se inventariaron los recursos gráficos CLG; su inspección visual queda pendiente.

HEAD: 1aef3de6de7264696e1fc6f3904ce1ab007ded75, coincide con el indicado por el propietario.

Git inicial: eliminaciones previas de 01_ESTADO_Y_BITACORA.md y 04_BITACORA_001_RESULTADO.md; modificaciones previas en bitácora, índice de prompts y evidencias PYP-027; archivos no rastreados de documentación y evidencias PYP-019, PYP-022, PYP-023, PYP-024 y PYP-027. Se conservan todos.

Hallazgos: el bloque CLG de Inicio no nombra Alkosto ni Ktronix; la página CLG ya menciona 47 unidades y dispone de modalidades Media, Alert y Safety IP. El sitemap contiene cinco rutas y CLG dispone de Product y BreadcrumbList. La comprobación visual de imágenes, referencias históricas del caso comercial y validación técnica de protocolos siguen pendientes.

Validación: git diff --check terminó con código 0 antes de la documentación, con advertencias de conversión LF/CRLF. No se ejecutó build ni pruebas de navegador: no hay implementación nueva. No se modificaron dist, dependencias ni código comercial.

Archivos de esta intervención: docs/prompts/PYP-028.md, docs/evidencias/PYP-028/resultado.md y apéndice en docs/BITACORA_DESARROLLO.md.

Aprobación: encargo recibido parcialmente; continuación solicitada. Sin staging, commit, push ni publicación.

## Continuación e implementación — 2026-10-18

Recibida la continuación completa desde 6.7 hasta 17 y añadida literalmente al mismo prompt sin eliminar la primera entrega ni esta auditoría.

Implementación: identidad de producto propio, hardware 4/4/4, protocolos con alcance condicionado, diagrama funcional responsive, Edge Computing, RTC, caso 47 dispositivos vinculado a Alkosto/Ktronix, aplicaciones comerciales/industriales/IoT y tres FAQ nuevas. Se conserva la infografía aprobada, fotografías, dashboard y modalidades. Inicio recibe únicamente texto del caso y ancla contextual; el formulario no cambia.

SEO: nuevo título y description compartidos por React, OG y prerender; Product cambia el nombre. Canonical y sitemap conservan las cinco rutas. Sin FAQPage, precios, reseñas o certificaciones nuevas.

La clasificación y fuentes de cada protocolo y la guía Search Console están en [arquitectura](../../arquitectura/PYP-028-clg-edge-iot.md). No se dispone de firmware ni pruebas de protocolos: la validación de esta tarea cubre el sitio, no las instalaciones físicas. MQTT se presenta como posibilidad pendiente de verificación.

Archivos de producto modificados: src/pages/CLG.jsx, src/App.jsx, src/data/clg.js, src/data/clg-meta.js y src/data/structuredData.js. Documentación: docs/prompts/PYP-028.md, docs/prompts/index.md, docs/BITACORA_DESARROLLO.md, docs/arquitectura/PYP-028-clg-edge-iot.md y evidencias de esta carpeta.

Compilación comercial temporal y generación SEO: código 0. npm audit --omit=dev: código 0, ninguna vulnerabilidad de producción. Se conservan advertencias preexistentes de antigüedad de Browserslist/baseline-browser-mapping; no se actualizan dependencias.

Aprobación: implementación local solicitada; aprobación visual final pendiente. Sin staging, commit, push, despliegue o acciones en Search Console.

## Validaciones finales

| Verificación | Resultado | Evidencia |
| --- | --- | --- |
| Build comercial temporal y HTML inicial de cinco rutas | Correcto, código 0 | build-comercial.json y generacion-seo.json |
| SEO anterior, metadatos CLG, canonical, OG, sitemap, JSON-LD y robots | Correcto | [180 comprobaciones](./comprobaciones.json) |
| HTTP local, rutas con/sin barra final, recursos e hidratación | Correcto | http-local.json y navegador.json |
| Escritorio 1440, móvil 390 y tablet 768 | Sin desbordamiento, un H1, sin IDs duplicados, anclas y menú correctos | navegador.json y tablet.json |
| Consola y red local | Sin errores, advertencias de consola ni solicitudes fallidas | navegador.json y visual.json |
| CLG sin JavaScript | Contenido visible, diez FAQ, canonical correcto | sin-javascript.json |
| Hardware, caso, enlaces, no divulgación y preservación | 12 comprobaciones correctas | [comprobaciones adicionales](./comprobaciones-adicionales.json) |
| Formulario y dependencias | Fuentes conservadas respecto de HEAD; comparación de texto normaliza CRLF | comprobaciones-adicionales.json; diff limitado a la tarjeta CLG en App.jsx |
| dist | Los mismos 17 archivos y hashes SHA-256 | dist-inicial.json y comprobaciones-adicionales.json |
| npm audit --omit=dev | 0 vulnerabilidades | npm-audit-produccion.json y npm-audit-produccion-01.stdout.txt |
| VitePress estricto | Falló por dos enlaces preexistentes de PYP-027 a .log | build-docs.json y build-docs-01.stderr.txt |
| VitePress temporal con dos exclusiones explícitas | Correcto, código 0, 22.45 s | build-docs-excepciones-03.log y build-docs-excepciones.mjs |

Total: 180 comprobaciones principales y 12 adicionales correctas. La comparación adicional inicial de MonitoreoEnergetico detectó diferencias de finales de línea Windows, no cambios de contenido; se corrigió la comprobación para normalizar CRLF y pasó. Los intentos de exclusión documental anteriores no se aplicaron hasta trasladar las dos excepciones a onAfterConfigResolve; se conservan sus logs. No se altera la configuración VitePress del proyecto ni los documentos PYP-027.

La compilación documental estricta queda pendiente de resolver los enlaces ./build-comercial-staged.log y ./generacion-staged.log en evidencias/PYP-027/resultado.md. La compilación con excepciones acredita el resto de la documentación, sin ocultar este fallo previo.

## Capturas y revisión visual

- Portada: [1440 px](./clg-portada-1440.png) y [390 px](./clg-portada-390.png).
- Página completa: [1440 px](./clg-completa-1440.png) y [390 px](./clg-completa-390.png).
- Diagrama funcional: [1440 px](./funcionamiento-clg-1440.png) y [390 px](./funcionamiento-clg-390.png).
- Hardware: [1440 px](./hat-pyp-1440.png) y [390 px](./hat-pyp-390.png).
- Caso de éxito: [1440 px](./caso-clg-1440.png) y [390 px](./caso-clg-390.png).

Revisadas visualmente la portada en ambos anchos, el diagrama móvil y las tarjetas de hardware de escritorio. Tipografía y tarjetas se adaptan; el diagrama apila sus etapas y conserva sus etiquetas. La navegación interna usa desplazamiento horizontal propio sin ampliar el ancho del documento. La infografía original se conserva completa y ampliable; el dashboard no se presenta como prueba de calendarios o supervisión.

## Limitaciones y entrega

No se probaron comunicaciones industriales ni firmware, ni se accedió a dispositivos físicos. Ningún protocolo pendiente se atribuye al despliegue de 47 equipos. Las pruebas HTTP usan servidor local, sin comprobar redirecciones CDN, producción o indexación. No hay cambios en Search Console ni publicación. La revisión visual del propietario continúa pendiente.

El estado de Git y el manifiesto de archivos de esta tarea se conservan en git-final.txt y archivos-PYP-028.json. Los cambios anteriores de otras tareas permanecen. Estado: implementación local terminada para revisión, con la incidencia documental estricta preexistente descrita; sin staging, commit, push ni despliegue.
