# PYP-030 — Corrección de datos estructurados de CLG

Fecha: 2026-10-19 (America/Bogota). [Prompt completo](../../prompts/PYP-030.md).

Google Search Console detectó «Debe especificarse offers, review o aggregateRating» en Product, CLG — Cliente Ganador, con ID https://pyptecnologia.com/proyectos/clg/#producto. La indexabilidad y solicitud de indexación son información aportada por el propietario; no se accedió a Search Console durante esta intervención. El código local PYP-028/PYP-029 ya usaba el nombre CLG — Audio inteligente y automatización IoT, con el mismo ID.

Se eliminó únicamente el objeto Product de src/data/structuredData.js, compartido por el prerender comercial y el componente SEO de React. CLG se cotiza sin precio público fijo; no se añadieron precios, ofertas, reseñas ni puntuaciones. BreadcrumbList se conserva. Organization y WebSite permanecen en index.html; no existía un WebPage. No se sustituyó Product por otro esquema comercial.

Estado inicial: HEAD 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39. [Inventario Git inicial](./git-inicial.txt). Se conservaron las dos bajas raíz, modificaciones documentales PYP-029, bitácora/índice y todos los archivos previos no rastreados. No se ejecutó staging.

Archivos de esta intervención: src/data/structuredData.js; docs/prompts/PYP-030.md; docs/prompts/index.md; docs/BITACORA_DESARROLLO.md; esta carpeta de evidencias (resultado.md, git-inicial.txt, structuredData-antes.txt, validar-seo.mjs, seo.json, build-comercial.txt, prerender.txt, build-docs.txt, diff-check.txt). El build comercial temporal se guarda en build-temporal/comercial, ignorado por Git y excluido de VitePress. No se modifica dist comercial.

Validación comercial: Vite build y scripts/generar-seo.mjs con salida temporal terminaron con código 0; cinco rutas y sitemap generados. Es la misma secuencia del script npm run build con outDir explícito para preservar dist. Avisos preexistentes de antigüedad de baseline-browser-mapping y Browserslist; no se actualizaron dependencias.

Validación SEO: script reproducible validar-seo.mjs y detalle seo.json. Comprueba ausencia de Product en todas las páginas generadas y esquema React, conservación exacta de BreadcrumbList/Organization/WebSite, canonical único, metadatos y Open Graph, imágenes locales, cinco URLs del sitemap, contenido comercial/técnico visible y fuentes sin cambios respecto a HEAD. El esquema anterior completo se conserva en structuredData-antes.txt. No se hizo una comparación entre dos builds: la conservación se verifica contra las fuentes de HEAD y los datos compartidos.

Resultados finales: 60 comprobaciones SEO aprobadas, 0 fallos (seo.json). VitePress estricto mediante npm run docs:build: código 0, sin excepciones de enlaces ni cambios de configuración. git diff --check: código 0, solo advertencias de conversión LF/CRLF. Logs: build-comercial.txt, prerender.txt, build-docs.txt y diff-check.txt.

Incidencia del auxiliar: la primera ejecución SEO tuvo 59 controles correctos y uno fallido porque el validador referenciaba SEO.jsx en lugar del nombre Git Seo.jsx. Se corrigió exclusivamente la referencia en el auxiliar y se repitieron los 60 controles, todos correctos. El sitio no presentó fallos.

Pendientes: publicación conjunta con siguientes mejoras SEO, solo con autorización posterior; después comprobar la URL pública y solicitar nueva validación en Search Console. No se afirma que Google haya reprocesado el cambio local. No se ejecutaron pruebas de navegador ni validadores externos de Google.

Aprobación: implementación y pruebas locales autorizadas por PYP-030. Sin git add, commit, push ni despliegue.
