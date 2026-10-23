# PYP-037 — Resultado de publicación

Fecha: 2026-10-23, America/Bogota. Estado: PREPARACIÓN; aún no publicado.

[Prompt íntegro](../../prompts/PYP-037.md). Objetivo: publicar y verificar PYP-036 mediante commit selectivo y push normal a origin/main (https://github.com/pyptec/web.git), sin modificar producto adicional ni configuración Netlify. HEAD inicial 3dae972b5a14c92757b1eeaad01437385ab1a0dc; [Git inicial](./git-inicial.txt).

Selección: cuatro fuentes aprobadas (tres páginas y src/data/seo.js), prompt/evidencias PYP-036 y documentación PYP-037. Bitácora e índice se preparan parcialmente para excluir cierres/documentos ajenos de intervenciones anteriores. Dist, builds, perfiles, dependencias, CLG, RPI, formulario y Analytics quedan fuera de la selección de fuentes.

Pruebas y revisión de staging pendientes de ejecución. Sin credenciales ni configuración remota nueva. No se confundirá push con despliegue. Netlify se comprobará mediante respuesta pública y hashes del artefacto, más API pública GitHub si ofrece estado; ID interno/créditos solo si verificables. No se enviarán formularios ni eventos reales de prueba a GA4.

## Validaciones previas al commit

Build comercial/prerender correctos en build-temporal/comercial; 17 pruebas Analytics, 73 controles SEO y 56 controles Edge correctos, cero excepciones. CTA nuevos y seis rutas revisados a 390/1440, consentimiento, revocación, etiqueta bloqueada y StrictMode. Registros: build.txt, prerender.txt, analytics.txt, seo.txt y navegador.txt; resultados estructurados en navegador.json y seo-diagnostico.json. Integridad SHA-256 inicial conservada, incluidos 17 dist. origin/main y ls-remote coinciden con HEAD previo, sin divergencias. Pendiente VitePress estricto de la selección y revisión completa de staging antes del commit. No hay cambios de producto durante PYP-037.

Se conserva íntegro el informe histórico PYP-036: sus estados NO PUBLICADO describen su cierre local; el estado posterior de publicación se registra aquí. Pendientes ajenos excluidos y preservados, sin pedir autorización para incluirlos.

VitePress estricto de la copia del índice: correcto (14,97 s), registro docs-seleccion.txt. git diff --cached --check: correcto, sin normalización adicional. Staging revisado por rutas y contenido con git diff --cached, sin bajas ni archivos protegidos; revisión por patrones sin hallazgos de secretos (no garantía absoluta). Las cuatro fuentes staged coinciden con las compiladas normalizando solo CRLF/LF. Se procederá al único commit comercial autorizado y push normal; SHA y resultados posteriores se guardarán explícitamente en este informe local. No se crea un segundo commit solo para registrar el SHA del primero.

Incidencia previa a commit: el registro de diff recién agregado contenía espacios de contexto que git diff --check marca como whitespace. Se normalizaron solo los finales de línea del registro, conservando contenido original y hash en staged-diff-original.json; no se tocó código. Revisión repetida a continuación.
