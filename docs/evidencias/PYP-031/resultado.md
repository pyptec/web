# PYP-031 — Integración local de Google Analytics 4

Fecha: 2026-10-19 (America/Bogota). [Prompt íntegro](../../prompts/PYP-031.md). [Arquitectura y guía GA4](../../arquitectura/PYP-031-analytics.md).

Estado inicial: HEAD 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39; [Git inicial](./git-inicial.txt). Se preservan todos los cambios previos, especialmente PYP-030, bajas raíz y documentación PYP-029. Inventario de hashes en integridad-inicial.json, incluido dist (17 archivos), contenido comercial, formulario y evidencias PYP-030.

Implementación: analytics.js reutilizable, ID público G-WJ6METJRZD, bloqueo total de etiqueta hasta aceptación expresa, rechazo y preferencias persistentes/revocables. Vistas manuales canónicas con deduplicación y sin datos de formulario. Eventos contact_click y contact_cta_click. No se implementó generate_lead: el POST nativo Netlify carece de confirmación verificable propia; no se altera el formulario ni se simulan conversiones.

Requisito antes de publicar: verificar que Medición mejorada (incluidas vistas por historial y eventos de formulario) esté desactivada en el flujo GA4, revisar etiquetas conectadas y privacidad/retención. No hay acceso ni cambios en cuentas Google. El código local no puede garantizar la configuración remota. El aviso específico de analítica no sustituye una política integral; revisión jurídica de Colombia pendiente. No se afirma cumplimiento legal definitivo.

Archivos nuevos: src/lib/analytics.js, src/components/Analytics.jsx, src/components/AnalyticsConsent.jsx; docs/prompts/PYP-031.md; docs/arquitectura/PYP-031-analytics.md; carpeta docs/evidencias/PYP-031/ con pruebas, logs, integridad y capturas. Modificados: src/SiteRoutes.jsx, docs/prompts/index.md y docs/BITACORA_DESARROLLO.md. App.jsx, formulario, index.html, páginas, catálogo SEO, dependencias y PYP-030 no se modifican.

Pruebas realizadas:

- Build comercial temporal y prerender de las cinco rutas: código 0. Logs build-comercial.txt y prerender.txt. Se ejecutó la misma secuencia comercial de Vite + generar-seo con outDir explícito; dist no se utilizó como salida.
- [Analítica automatizada](./analytics-tests.txt): 14 pruebas Node aprobadas. Consentimiento/rechazo/revocación entre pestañas y durante carga, storage bloqueado/caducidad, rutas y títulos, inicialización única, ausencia de duplicados, sanitización UTM/referente, clics sin datos personales, bloqueo/CSP/error y ausencia de conversiones ficticias.
- [SEO](./seo.json): 65 controles aprobados. Los 60 controles heredados de PYP-030 más comparación exacta del main prerenderizado en las cinco rutas frente al build PYP-030. Sin Product; se conservan contenido, canonical, Open Graph, JSON-LD, imágenes, sitemap, fuentes comerciales y dependencias. El validador se adaptó dentro de PYP-031 sin tocar el original ni sus resultados.
- [Edge local](./navegador.json): 30 controles aprobados, sin excepciones JavaScript. Móvil 390×844 y escritorio 1440×1000; navegación SPA, consentimiento, foco, etiqueta bloqueada, formulario inválido, POST interceptado, preservación de campos al revocar y StrictMode real mediante Vite desarrollo. Etiqueta Google sustituida por un stub local: no acredita recepción real GA4. Los errores de recurso inducidos por el bloqueo del loader/POST son esperados; no se confunden con excepciones de la aplicación. El navegador/script local se cerraron al terminar.
- Capturas inspeccionadas: [consentimiento móvil](./movil-consentimiento.png), [CLG escritorio](./escritorio-clg.png), [preferencias escritorio](./escritorio-preferencias.png). Sin overflow en las rutas probadas; controles de decisión >=44px. Emulación, sin dispositivo físico.
- [npm audit --omit=dev](./npm-audit.json): código 0, cero vulnerabilidades; sin npm audit fix ni cambios de dependencias.
- [Integridad final](./integridad-final.json): 72 archivos verificados por SHA-256 contra integridad-inicial.json, incluidos exactamente los 17 archivos de dist y toda la evidencia/código PYP-030 inventariados; cero diferencias e índice Git vacío. El formulario, páginas, recursos y dependencias conservan sus hashes. Auxiliar reproducible verificar-integridad.mjs.

Incidencias de pruebas: primer auxiliar Edge detenido por comillas en selector CSS (16 controles previos correctos); segundo por disparar clics tras navegación nativa antes de que la etiqueta local estuviera lista (17 controles correctos). Se corrigieron solo selector/esperas del auxiliar y se repitió el recorrido completo con 30 controles correctos. Intentos conservados en navegador-intento-01.json y navegador-intento-02.json. No fueron fallos del formulario ni regresiones del sitio. Avisos preexistentes de datos Browserslist y baseline-browser-mapping antiguos, sin actualizar paquetes.

No se ejecutaron envíos reales ni solicitudes de analítica a Google. El POST de laboratorio se bloqueó en el navegador antes de llegar incluso al servidor local. No se modificaron cuentas ni se probaron conversiones reales. No se afirma presencia de eventos en producción.

Publicación: prohibida por el encargo. Sin git add, commit, push, despliegue o acciones en Search Console/GA4. Preparado para revisión local y posterior commit conjunto solo bajo nueva autorización.

## Cierre local — 2026-10-19

VitePress estricto (npm run docs:build): código 0, sin ignoreDeadLinks ni excepciones; [log](./build-docs.txt). git diff --check: código 0, solo avisos LF/CRLF en archivos del árbol de trabajo; [log](./diff-check.txt). Estado Git completo en git-final.txt, índice vacío. No se añadió ninguna dependencia. JS comercial 335.63 kB / 95.01 kB gzip; CSS 26.22 kB / 5.56 kB gzip. La etiqueta externa solo se solicita tras aceptar. Las salidas de prueba permanecen bajo build-temporal/comercial, excluidas del build de documentación y de Git.

Resultado: integración local terminada y verificaciones disponibles para revisión. Se mantienen los pendientes externos descritos: configuración remota GA4 para eliminar automatismos/duplicados, revisión jurídica/retención, vínculo Search Console y recepción real/atribución tras publicación. generate_lead requiere una confirmación fiable futura y no está activo. No hubo git add, commit, push, despliegue ni envíos reales.
