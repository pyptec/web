# PYP-032 — Infografía oficial y página RPI-MDFR

Fecha: 2026-10-19 (America/Bogota). [Prompt y confirmación recibidos](../../prompts/PYP-032.md). [Arquitectura](../../arquitectura/PYP-032-rpi-mdfr.md).

Estado inicial: HEAD 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39, cinco rutas, sin página RPI-MDFR y sin prompt inicial PYP-032 disponible. Se conserva íntegro el ajuste recibido, sin inventar antecedentes. Cambios PYP-030/031 y archivos ajenos preservados. Inventario Git en git-inicial.txt y hashes en integridad-inicial.json (excluye perfiles/cache/builds temporales).

La infografía definitiva ya estaba en la ruta solicitada; mide 1536×1024 y ocupa 1.835.390 bytes. Se usa sin modificaciones, con copia pública idéntica para página/tarjeta/Open Graph. El propietario añadió siete capturas originales tras confirmar su ausencia; inspeccionadas todas, sin IP/credenciales visibles, sin edición. Inventario con dimensiones/hashes en imagenes-originales.json. No se presentan las figuras comerciales como pruebas técnicas; el lote SIM-36H-CICLOS se identifica como ejemplo y no como resultado de producción.

Implementación: nueva página semántica /proyectos/rpi-mdfr/ con imagen principal íntegra/ampliable, trece temas solicitados, galería real de sensores, dashboard y ciclos; se conserva la fotografía existente del tablero. Tarjeta Inicio actualizada solo en RPI con descripción y botón pedidos. Rutas/SEO/canonical/OG/sitemap/prerender de seis páginas; WebPage y BreadcrumbList para RPI, sin Product. CLG y módulo de Analytics se conservan; el catálogo SEO incorpora automáticamente la ruta a la medición PYP-031.

Archivos: src/pages/RpiMdfr.jsx, src/data/rpi-mdfr.js, src/data/rpi-mdfr-meta.js, src/SiteRoutes.jsx, src/data/seo.js, src/data/structuredData.js, tarjeta/import RPI de src/App.jsx, public/rpi-mdfr-infografia.png, public/sitemap.xml; ocho imágenes suministradas por el propietario en src/assets/proyectos/rpi-mdfr/; prompt/índice/bitácora/arquitectura/evidencias PYP-032. No se cambian dependencias ni formulario.

Validaciones completadas:

- Build comercial temporal y prerender de las seis rutas: código 0. Misma secuencia comercial Vite + generar-seo con outDir explícito, sin escribir dist. Logs build-comercial.txt y prerender.txt.
- [SEO](./seo.json): 77 controles correctos, cero fallos. Metadatos/canonical/OG, sitemap de seis URLs, WebPage/BreadcrumbList/Organization/WebSite sin Product, imágenes y contenido HTML. Main de CLG y otras tres páginas interiores idéntico a PYP-030. En App.jsx solo cambian import de imagen y tarjeta RPI; formulario y restantes proyectos idénticos al estado inicial.
- [Analytics existente](./analytics-tests.txt): 14 pruebas aprobadas. No se modificó ningún archivo del módulo ni control de consentimiento PYP-031.
- [Integridad](./integridad-final.json): 70 archivos comprobados, incluidos los 17 dist, originales PYP-030/031, páginas anteriores, Analytics y siete capturas; cero diferencias e índice vacío. La infografía pública y la original son byteidénticas, también verificadas en SEO.
- VitePress estricto: código 0, sin excepciones ni cambios de configuración. [Log](./build-docs.txt).
- git diff --check: código 0; [log](./diff-check.txt), solo avisos LF/CRLF. Avisos preexistentes Browserslist/Baseline antiguos en builds, sin cambios de dependencias.

[Navegador consolidado](./navegador.json): 46 controles aprobados, cero pendientes de la implementación local y cero excepciones JavaScript. Se compone de 38 controles aprobados del recorrido de seis rutas y 8 de la continuación dirigida de ampliación/Analytics/StrictMode; no se presenta como una sola ejecución. La etiqueta de Google se sustituyó localmente y los POST se bloquearon: sin eventos reales a la propiedad ni envíos Netlify. Se verifican consentimiento, vistas sin duplicados, título/canonical de RPI, navegación nativa Inicio → RPI, anclas, imágenes íntegras/ampliables, apertura efectiva en pestaña nueva, galería completa, contacto y ausencia de overflow a 1440/390. StrictMode se probó en Vite desarrollo.

Los auxiliares reproducibles son navegador.mjs (recorrido completo), verificar-ampliacion-analytics.mjs (continuación dirigida) y consolidar-navegador.mjs (exige que la comprobación pendiente esté aprobada). Resultados originales en navegador-intento-03.json y navegador-continuacion.json. No se repitieron los 38 controles correctos porque el código del sitio no cambió.

Incidencias del auxiliar conservadas: intento 01 con 30 controles correctos se detuvo por un paréntesis en un selector evaluado; intento 02 con 26 correctos detectó falta de espera de una imagen lazy; intento 03 con 38 correctos se detuvo al intentar abrir la pestaña mediante click programático, bloqueado por el navegador. Se corrigieron los auxiliares (selector, espera, desplazamiento instantáneo y clic real), sin modificar el sitio para satisfacerlos. La continuación revalidó la apertura con eventos reales de ratón y completó Analytics/StrictMode con 8 controles correctos. Los tres intentos permanecen disponibles, no se ocultan ni se cuentan como recorridos completos aprobados.

Pendientes externos: aprobación visual/técnica del propietario, publicación conjunta expresamente autorizada y verificación pública posterior. Los requisitos remotos/jurídicos de GA4 PYP-031 siguen pendientes; no se afirma que Google haya recibido eventos o indexado la nueva ruta. Pruebas en emulación Edge, sin móvil físico. No se publicará sin autorización.

Incidencia inicial: el inventario intentó leer un perfil temporal de navegador bloqueado y se detuvo antes de modificar código; se excluyeron perfiles y builds temporales, conservando las evidencias reales. Posteriormente se completó la implementación. No se borraron archivos ajenos.

Aprobación: implementación local autorizada, revisión visual/publicación pendientes. Sin git add, commit, push ni despliegue; dist preservado.

## Capturas para revisión

| Vista | Escritorio 1440 px | Móvil 390 px |
| --- | --- | --- |
| Inicio, tarjeta RPI-MDFR | [Captura](./inicio-1440.png) | [Captura](./inicio-390.png) |
| RPI-MDFR, presentación completa | [Captura](./rpi-mdfr-1440.png) | [Captura](./rpi-mdfr-390.png) |
| Galería de sensores | [Captura](./rpi-mdfr-sensores-1440.png) | [Captura](./rpi-mdfr-sensores-390.png) |
| Dashboard original | [Captura](./rpi-mdfr-dashboard-1440.png) | [Captura](./rpi-mdfr-dashboard-390.png) |
| Ciclos de CO₂ | [Captura](./rpi-mdfr-ciclos-1440.png) | [Captura](./rpi-mdfr-ciclos-390.png) |
| Contacto RPI-MDFR | [Captura](./rpi-mdfr-contacto-1440.png) | [Captura](./rpi-mdfr-contacto-390.png) |

Capturas de Inicio/RPI, sensores y dashboard/ciclos inspeccionadas visualmente. Infografía y gráficos completos, sin sustituciones generadas. En miniaturas móviles el detalle se consulta ampliando; H1, texto HTML y CTA permanecen legibles. La revisión visual del propietario queda pendiente.

## Cierre local — 2026-10-19

Implementación terminada localmente, con seis rutas prerenderizadas, infografía oficial y siete capturas originales incorporadas. Builds comercial y documental estrictos, SEO, Analytics, navegador y diff-check correctos. Integridad de dist, CLG, formulario, Analytics y evidencia previa preservada. Sin git add, commit, push ni despliegue.
