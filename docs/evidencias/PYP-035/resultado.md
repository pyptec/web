# PYP-035 — Corrección final GA4 y publicación conjunta

Fecha: 2026-10-20 (America/Bogota). [Prompt completo](../../prompts/PYP-035.md).

## Resultado de la primera intervención (histórico)

Validación local satisfactoria; publicación detenida por discrepancia pendiente sobre GA4 externo. El propietario seleccionó «Confirmo los ajustes y detallo la revisión», sin detalle adicional. Una consulta pública posterior de la etiqueta G-WJ6METJRZD contiene historial y formularios habilitados. Se solicitó aclarar configuración guardada y momento de los ajustes. No se presume que la descarga estática certifique la configuración administrativa; tampoco se descarta la discrepancia sin resolverla. Condición 16 del prompt: no ejecutar commit/push con estado externo necesario desconocido.

**Estado más reciente — verificación final del 2026-10-20:** el ajuste de la etiqueta GT-K824G9N8 ya se refleja públicamente. Etiqueta original sin modificar: una vista por navegación SPA, enlaces reales y BFCache; cero recopilación sin consentimiento y tras revocar. Bloqueo GA4 superado. Se prepara el único commit/push autorizado tras validar la selección; el resultado con SHA y Netlify se añadirá después de ejecutarlos.

## Auditoría inicial y cambios

Rama main; HEAD 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39, coincidente con el SHA proporcionado y con main remoto consultado por git ls-remote. Índice preparado con 146 archivos de intervenciones anteriores, cambios documentales locales, dos bajas raíz y archivos no rastreados ajenos conservados. Sin conflictos Git. Se revisaron instrucciones, diferencias de fuentes, documentación/arquitectura/resultados PYP-030/031/032/034. No existe documentación PYP-033 disponible; no se inventó. Imágenes RPI presentes y verificadas contra sus originales en las pruebas SEO.

No fue necesaria una nueva corrección de código: src/lib/analytics.js ya usa una sola carga/config, send_page_view:false y vistas manuales desde React Router; lastPage evita efectos duplicados y permite A→B→A. Analytics.jsx limpia su listener; las pruebas en desarrollo verifican StrictMode. AnalyticsConsent.jsx conserva aceptar/rechazar/modificar/revocar; SiteRoutes.jsx monta una instancia de ambos. No se halló otra etiqueta GA/GTM en src, public o index.html. Esto no inspecciona inyecciones del hosting ni etiquetas/reglas de la propiedad remota.

Fuentes comerciales sin modificaciones durante PYP-035. No se reemplazó diseño aprobado ni se alteró formulario. No se modificaron dependencias. El build usa salida temporal y no dist. [Integridad](./integridad-revision.json): 17 archivos dist byteidénticos, fuentes comerciales preservadas, ningún archivo prohibido ni secreto detectado por los patrones aplicados al índice de 146 archivos. Este análisis no garantiza ausencia absoluta de secretos. No se añadió ni retiró nada del índice.

Archivos creados: docs/prompts/PYP-035.md (copia íntegra del adjunto), evidencias PYP-035 (informes, logs, auxiliares reproducibles, inventarios, capturas y resultados). Archivos actualizados: docs/prompts/index.md y docs/BITACORA_DESARROLLO.md. Los builds/cache/perfil se mantienen dentro de la carpeta temporal ignorada o del perfil ignorado, siempre dentro del repositorio. El diff comercial inicial es evidencia local y debe excluirse de un futuro staging por sus espacios de contexto propios de un patch.

## Validaciones

- Build comercial temporal: código 0, build-comercial.txt. Equivale a la secuencia de build comercial con outDir explícito para preservar dist.
- Prerender: seis rutas, código 0, prerender.txt.
- SEO: 77 controles correctos, 0 fallos, seo.json y seo-tests.txt. JSON-LD sin Product, Organization/WebSite/BreadcrumbList preservados; canonical, metadatos, Open Graph, imágenes, sitemap de seis rutas, contenido CLG y tarjeta RPI. Formulario conservado por comparación de fuentes/estructura.
- Analytics: 14 pruebas correctas, código 0, analytics-tests.txt. Consentimiento previo, revocación, cookies accesibles, carga lenta/fallida, no replay previo, rutas, clics y sanitización de parámetros propios. generate_lead sigue desactivado.
- Edge: 46 controles correctos, 0 fallos, 0 excepciones JavaScript, navegador.json y edge-tests.txt. Seis rutas, navegación, enlaces de contacto, consentimiento, imágenes de sensores, infografía completa y apertura ampliada, tarjeta Inicio, móvil 390 y escritorio 1440 sin overflow. Desarrollo StrictMode sin duplicación. Captura móvil RPI inspeccionada visualmente.
- VitePress estricto: código 0, build-docs.txt; docs/ sigue siendo la raíz y docs/.vitepress/ la configuración independiente. Sin excepciones de enlaces añadidas.
- npm audit --omit=dev: código 0, cero vulnerabilidades, npm-audit.json.
- git diff --check y git diff --cached --check: código 0, logs respectivos. Avisos de conversión LF/CRLF, Browserslist y baseline antiguos sin cambio de dependencias.

Los auxiliares SEO/Edge se copiaron de PYP-034 cambiando únicamente carpeta de evidencia, fecha y puerto CDP para conservar las evidencias históricas. Las pruebas de navegador sustituyen la etiqueta de Google y bloquean envíos externos/POST: no prueban recepción en GA4 ni recepción Netlify, ni sustituyen la configuración externa.

## Privacidad y GA4 externo

El aviso describe finalidad, cookies, Google, duración, rechazo, revocación y limitaciones de eliminación. Los eventos propios no envían contenido del formulario, email, teléfono ni query/hash de navegación. El código restringe Signals y personalización. Se mantiene pendiente la revisión jurídica integral ya documentada; no se afirma cumplimiento legal absoluto. La medición automática externa podría recopilar campos adicionales o duplicar eventos, razón para no publicar hasta aclararla.

[Confirmación recibida, discrepancia y pasos exactos](./ga4-externo.md). [Indicadores públicos actuales](./ga4-etiqueta-publica.json). Google documenta expresamente que send_page_view:false no impide la medición por historial de Medición mejorada: [documentación oficial de page_view](https://developers.google.com/analytics/devguides/collection/ga4/views). [Medición mejorada y parámetros recogidos](https://support.google.com/analytics/answer/9216061?hl=es), consultada correctamente en un segundo intento; el primero agotó el tiempo.

No se accedió ni modificó la propiedad GA4. No se enviaron eventos reales ni formularios. No se desactivaron funciones externas sin autorización. Pendiente: aclarar/confirmar ajustes guardados de historial, formularios y clics salientes, etiquetas/destinos/reglas duplicadas; comprobar medición efectiva consentida después de publicación verificable.

## Aprobación, commit, GitHub y Netlify

Diseño RPI aprobado y commit/push autorizados por el prompt, sujetos a sus condiciones técnicas. La confirmación genérica recibida se conserva; la discrepancia posterior mantiene pendiente la condición externa. Sin git add adicional, commit, push ni despliegue en PYP-035. No hay SHA nuevo. [Main remoto consultado](./remoto-main.txt): 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39. No se afirma que GitHub contenga PYP-030/031/032 publicados.

Sin acceso autenticado a Netlify: créditos, cola y renovación del ciclo del 20 de octubre no verificados. El propietario debe consultar el panel. No se hicieron pagos, cambios de plan ni intentos de despliegue. Sin un despliegue nuevo confirmado por Netlify, no se ejecutó la validación de producción condicionada por el apartado 13 del prompt. URLs públicas verificadas como publicación de PYP-035: ninguna.

Tras resolver GA4 y repetir revisión de main/selección: un único commit selectivo, push normal a origin main; verificar nuevo SHA remoto y despliegue automático Netlify sin reintentos adicionales. Verificar seis URLs, assets, consentimiento y sitemap solo cuando Netlify confirme ese SHA.

Search Console pendiente tras disponibilidad pública real: revisar https://pyptecnologia.com/sitemap.xml y solicitar indexación de /proyectos/clg/ y /proyectos/rpi-mdfr/. No se afirma indexación ni recepción Analytics.

## Continuación — confirmación explícita del propietario — 2026-10-20

[Prompt de continuación íntegro](../../prompts/PYP-035-confirmacion-ga4.md). El propietario confirma cargas de página activadas, historial y formularios desactivados, ajustes guardados y verificados nuevamente; renueva autorización condicionada de commit/push. Esta confirmación sustituye la falta de detalle de la respuesta anterior; se conserva la cronología sin sobrescribir el prompt inicial.

**Resultado actual: el historial aún no coincide en la configuración pública.** Se consultó de nuevo la etiqueta oficial tanto con su URL normal como con parámetros distintos y petición no-cache, ambas HTTP 200. [Evidencia estructurada](./ga4-confirmacion-publica.json), con horas UTC de observación. Para el destino exacto G-WJ6METJRZD permanece la etiqueta __ccd_em_page_view con vtp_historyEvents:true. No se puede asegurar ausencia de vistas automáticas además de las manuales de React Router con esa discrepancia. No se afirma que se haya demostrado un evento duplicado real: no se enviaron eventos a Google. La propagación de los ajustes es una posibilidad, no un diagnóstico confirmado.

**Precisión sobre formularios:** no aparece una etiqueta de destino __ccd_em_form en la descarga actual, lo cual es compatible con formularios desactivados. Los campos vtp_enableForm y vtp_enableHistoryEvents de __ogt_auto_events son indicadores generales y no bastan para inferir por sí solos el estado efectivo del flujo. En esta continuación se inspeccionó la configuración específica del destino, y el bloqueo se fundamenta en __ccd_em_page_view/vtp_historyEvents:true; no en el indicador general de formularios. La evidencia anterior queda conservada con esta precisión.

Validaciones finales repetidas: 14 pruebas Analytics correctas; comprobaciones git diff --check y --cached --check correctas; integridad de 17 dist y fuentes comerciales correcta; 146 archivos del índice sin secretos detectados por patrones, sin rutas prohibidas ni conflictos. Logs analytics-confirmacion.txt, diff-confirmacion.txt, diff-cached-confirmacion.txt, integridad-confirmacion.txt. Main remoto sigue en 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39 (remoto-confirmacion.txt). Build/prerender de seis rutas, 77 controles SEO y 46 controles Edge ya aprobados en esta fecha siguen aplicando: las fuentes comerciales se comprobaron idénticas y no se modificaron. No se repiten esos recorridos sin cambios de código; se repite VitePress al añadir esta documentación.

Commit/push no ejecutados: no se cumple aún «si todo está correcto». El índice preparado se conserva. No se modifica diseño, formulario, dependencias ni dist. Sin nuevo SHA/despliegue que verificar en Netlify; créditos y estado de cuenta sin acceso autenticado. No se provocan despliegues ni se repiten intentos. No se verifican seis URLs como publicación nueva sin despliegue confirmado. Search Console y recepción efectiva GA4 permanecen pendientes de publicación real.

Intervención necesaria: en el flujo cuyo ID es G-WJ6METJRZD, revisar Medición mejorada → engranaje → Vistas de página → Mostrar configuración avanzada → Cambios de página basados en eventos del historial del navegador desmarcado, guardar y esperar propagación; mantener cargas de página activadas (el código ya tiene send_page_view:false). Si el panel continúa mostrando historial desactivado pero la etiqueta pública no cambia, revisar también Etiqueta de Google → configurar ajustes → gestionar detección automática de eventos y cualquier configuración de destino/etiquetas conectadas que pueda mantener historial. No activar/desactivar otras funciones indiscriminadamente. Revalidar la configuración pública específica antes del único commit/push ya autorizado. La autorización permanece vigente; no se solicita una nueva autorización genérica.

Archivos de esta continuación: docs/prompts/PYP-035-confirmacion-ga4.md; docs/prompts/index.md; docs/BITACORA_DESARROLLO.md; docs/evidencias/PYP-035/resultado.md; ga4-confirmacion-publica.json; git-confirmacion-inicial.txt; diff-confirmacion.txt; diff-cached-confirmacion.txt; analytics-confirmacion.txt; integridad-confirmacion.txt; remoto-confirmacion.txt; build-docs-confirmacion.txt y comprobaciones documentales finales. El auxiliar existente actualiza integridad-revision.json y git-final.txt. No se guardan credenciales ni datos de cuenta.

## Diagnóstico definitivo con etiqueta real — 2026-10-20

[Prompt completo de esta intervención](../../prompts/PYP-035-diagnostico-ga4.md). Estado inicial: main y HEAD 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39, 146 archivos ya preparados, cambios locales previos conservados. Se releen AGENTS.md, Git/diferencias y los cuatro módulos indicados. El propietario refiere una captura de ajustes guardados; no hay acceso administrativo GA4 en esta sesión para auditar esa pantalla. Se conserva su confirmación sin sustituirla por una supuesta inspección de la cuenta.

### Conclusión comprobada

**Existe duplicación observable de eventos generados por la etiqueta real en cambios de historial, no solo un indicador estático discrepante.** La aplicación llama una vez al evento manual y la etiqueta pública genera además una vista automática para la misma ruta. Se separaron los reintentos de transporte, los lotes diferidos y las llamadas de la aplicación. No se afirma que esos eventos hayan llegado a GA4: toda recopilación se interceptó antes de enviarla.

En el recorrido de enlaces reales, RPI → Inicio/Proyectos (navegación SPA ejecutada por Navbar) produce dos vistas: una marcada como manual y otra automática. Inicio → RPI y tarjeta Inicio → CLG usan enlaces HTML con documento nuevo y producen una vista cada uno. RPI no contiene enlace directo a CLG: el recorrido real es RPI → Inicio/Proyectos → tarjeta CLG. Además se probó explícitamente RPI → CLG mediante History API/popstate para observar la ruta SPA; no se presenta ese tramo sintético como un enlace disponible al visitante.

[Consolidación reproducible](./diagnostico-consolidado.json): 36 controles de evidencia correctos, 0 fallos. Las verificaciones que demuestran duplicación satisfacen el diagnóstico, pero **no significan que el producto esté listo para publicar** (publicationReady:false).

### Consulta pública y caché

Los JSON de runtime conservan por descarga la URL solicitada/final, hora de observación UTC, HTTP 200, tamaño, SHA-256 y encabezados relevantes (Date, Cache-Control, Expires, Content-Type, Vary, y Age/ETag/Last-Modified si existen). Se verifica el destino exacto G-WJ6METJRZD, y se repite con parámetro único, Cache-Control:no-cache y Pragma:no-cache. Network.setCacheDisabled evita reutilización en el navegador de pruebas.

[Última consulta pública](./ga4-diagnostico-consulta-final.json): la URL normal y otra distinta siguen publicando __ccd_em_page_view/vtp_historyEvents:true para G-WJ6METJRZD. No aparece __ccd_em_form. Respuesta Cache-Control:private,max-age=900, una ventana de caché declarada de 15 minutos. La consulta variada y no-cache reduce la reutilización del cliente, sin demostrar cómo Google invalida todas sus capas. Las horas de recepción del equipo y Date del servidor se conservan separadas y pueden diferir; no se ajustan ni se confunden.

Los snapshots ejecutados se guardan en build-temporal/diagnostico, ignorado; los hashes y configuraciones seleccionadas quedan en evidencia versionable. Los indicadores generales __ogt_auto_events no se usaron por sí solos como demostración de emisiones. Se comprobó específicamente el comportamiento de __ccd_em_page_view.

### Método de navegador y separación de emisores

Edge 155 real en modo headless ejecuta el build comercial local, servido mediante CDP bajo el origen simulado https://pyptecnologia.com. Se entrega la etiqueta Google descargada byte a byte, sin sustituirla por un simulador. La resolución externa del navegador se restringe y toda solicitud se intercepta; los endpoints collect reciben una respuesta **204 local sin reenvío** y los demás externos/formularios se bloquean. No se rellenan ni envían formularios. Solo se guardan método/dominio/ruta y campos permitidos de evento; no se guardan cookies, client IDs, session IDs ni cuerpos de recopilación brutos.

Una primera pasada bloqueaba collect con error: Google reintentó en www.google.com después de www.google-analytics.com y el batching atribuyó algunas vistas a la fase siguiente. Se conserva diagnostico-runtime-original.json como incidencia, pero sus recuentos brutos no se usan como prueba de duplicación. El procedimiento definitivo usa 204 local y ventanas de 7 segundos por paso para evitar reintentos y permitir vaciar lotes. La primera navegación nativa en ui falló por comillas de un selector del auxiliar; se conserva interfaz204.json y se corrigió el auxiliar en interfaz204-v2, sin cambios de producto por ese error.

Dos pasadas equivalentes —observación sin añadir parámetros y observación añadiendo solo pyp_diagnostic_origin=app al evento manual— muestran los mismos recuentos. El marcador existe únicamente en la instrumentación de diagnóstico, sin incluirse en fuentes/build del producto ni enviarse a Google. Los eventos adicionales no tienen ese marcador y poseen secuencias distintas. Ejemplo reproducido al volver a RPI: manual _s=4 y automático _s=5 para /proyectos/rpi-mdfr/, una sola llamada pública. Un lote HTTP puede contener varios eventos: se cuentan los eventos, no simplemente las solicitudes.

[Etiqueta original, dos pasadas](./diagnostico-runtime-transporte204.json). [Interfaz real anterior a corrección](./diagnostico-runtime-interfaz204-v2.json). [Interfaz real con corrección](./diagnostico-runtime-interfaz-corregida.json). Los auxiliares correspondientes permanecen en esta carpeta.

### Resultados con el código corregido y la etiqueta pública original

| Escenario | Llamadas manuales page_view | Eventos page_view interceptados | Vistas automáticas |
| --- | ---: | ---: | ---: |
| Inicio sin consentimiento | 0 | 0 | 0 |
| Rechazo | 0 | 0 | 0 |
| Aceptación en Inicio | 1 | 1 | 0 |
| Carga de Inicio con permiso guardado | 1 | 1 | 0 |
| Inicio → RPI por tarjeta real | 1 | 1 | 0 |
| RPI → Inicio/Proyectos por cabecera real (SPA) | 1 | 2 | 1 |
| Inicio → CLG por tarjeta real | 1 | 1 | 0 |
| Atrás a Inicio, documento restaurado | 1 | 1 | 0 |
| Adelante a CLG, documento restaurado | 1 | 1 | 0 |
| Revocación en CLG | 0 | 0 | 0 |
| Atrás después de revocar | 0 | 0 | 0 |

En los pasos sin consentimiento/rechazo no se cargó la etiqueta ni hubo cookies GA. Al revocar desaparecen cookies accesibles, se activa opt-out y el retorno no recopila. En cada documento se observa un tag y una config; las restauraciones reutilizan ambos sin reinicializar. La búsqueda de fuentes en src/public/index.html solo encuentra el ID esperado y su carga en analytics.js; no aparecen otros IDs, GTM ni inicializaciones. El runtime no intenta cargar otra etiqueta. Esto no inspecciona configuraciones administrativas ni inyecciones del hosting real.

### Control causal del historial externo

Se toma exactamente el snapshot original por SHA-256 y se cambia **un único campo** en una copia local: __ccd_em_page_view/vtp_historyEvents:true → false. Nada se cambia en Google Analytics. En [control aislado con el build corregido](./diagnostico-runtime-control-corregido.json), los cambios SPA RPI → CLG, atrás y adelante pasan de dos eventos a uno, siempre el manual. Sin consentimiento y después de revocar permanecen en cero. El control anterior al arreglo BFCache también dio una vista en esos tres pasos SPA.

Ese resultado identifica como causa de la vista adicional la medición automática efectiva de historial de la etiqueta descargada. La razón administrativa por la que Google publica ese ajuste pese a la confirmación del panel sigue sin determinarse: son hipótesis propagación/caché, configuración del destino/etiqueta conectada o falta de persistencia efectiva. No se atribuye el problema al propietario ni se afirma un fallo específico del servicio sin acceso a la cuenta. El control local no resuelve la discrepancia externa y no habilita publicación.

### Corrección local mínima de BFCache y validaciones

Se detectó otro defecto en el recorrido real: atrás/adelante entre documentos restaurados desde BFCache generaba cero vistas, porque React no se monta nuevamente. Se añaden seis líneas a src/lib/analytics.js: listener pageshow registrado una vez; únicamente con event.persisted invalida lastPage y relee el consentimiento persistido mediante el flujo existente. Registra la vista de retorno si sigue permitido, sin nueva etiqueta/config; respeta revocación y expiración ocurridas mientras el documento estaba guardado. No se modifica Analytics.jsx, AnalyticsConsent.jsx ni SiteRoutes.jsx: su montaje/listeners ya eran únicos. No se cambia diseño, CLG, RPI, formulario ni dependencias.

- Tres regresiones BFCache fallan antes (14/17 correctas) y pasan después (17/17): restauración frente a pageshow ordinario, revocación/expiración mientras está guardado y aceptación en otro documento sin replay. Logs analytics-regression-antes.txt y analytics-regression-despues.txt; auxiliar analytics-regression.test.mjs. Las catorce pruebas anteriores siguen correctas.
- El recorrido Edge corregido muestra una vista al volver y otra al avanzar, sin nueva config ni tag. Después de revocar el retorno sigue sin recopilar.
- Build comercial temporal y prerender de seis rutas: código 0; build-diagnostico.txt y prerender-diagnostico.txt. Salida build-temporal/comercial-diagnostico, sin escribir dist.
- SEO: 77 controles correctos, cero fallos; seo-diagnostico.json. Incluye JSON-LD, canonical, sitemap, imágenes y conservación de contenidos/formulario.
- Integridad: 17 dist byteidénticos, 19 fuentes/assets aprobados restantes idénticos al índice previo, única fuente comercial modificada analytics.js; integridad-diagnostico-final.json. Un primer intento del auxiliar excedió el búfer al leer una imagen; se conserva dentro del temporal, se amplía búfer y se compara binario de imágenes, con resultado final correcto.
- git diff --check y --cached --check: código 0; diff-diagnostico.txt y diff-cached-diagnostico.txt. VitePress estricto se repite para cerrar la documentación; log build-docs-diagnostico.txt.

### Comprobación manual exacta que falta y estado de publicación

La corrección mínima de la duplicación es que el destino **publique y ejecute** historial desactivado. No se puede modificar esa configuración desde este repositorio sin acceso autorizado a GA4. Se conserva la estrategia manual y no se añaden filtros que oculten eventos arbitrariamente.

1. Abrir GA4 → Administrar → Flujos de datos y verificar el ID de medición visible G-WJ6METJRZD en el flujo seleccionado, no solo el nombre comercial de la propiedad.
2. En ese mismo flujo → Medición mejorada → engranaje → Vistas de página → Mostrar configuración avanzada, comprobar Cambios de página basados en eventos del historial del navegador desmarcado; guardar y volver a abrir para confirmar. Mantener cargas de página activadas y formularios desactivados.
3. Desde ese flujo revisar la etiqueta Google asociada y sus destinos/etiquetas conectadas; comprobar que el destino editado sea G-WJ6METJRZD y no exista otra configuración que restablezca historial. Revisar la detección automática en los ajustes de esa etiqueta, sin desactivar funciones ajenas indiscriminadamente.
4. Anotar hora real de guardado. Repetir la descarga normal/no-cache y el diagnóstico con etiqueta original después de la propagación. max-age=900 orienta una ventana de caché de 15 minutos, pero no garantiza cuándo Google publicará el cambio. Si el panel persiste en desactivado y la etiqueta sigue publicando/ejecutando historial activo tras esa ventana, hace falta revisión administrativa o soporte Google con ID, horas, hashes y evidencia de doble emisión aquí guardados.
5. Criterio verificable de desbloqueo: ejecutar la etiqueta pública sin modificar y observar un único evento por cambio SPA/retorno y cero carga previa al permiso, sin automatic page_view adicional. El control offline actual no satisface ese criterio de publicación.

**Sin commit, push ni despliegue.** HEAD y main remoto consultado siguen en 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39 (remoto-diagnostico.txt). La autorización permanece condicionada; el bloqueo externo continúa, ahora con duplicación reproducida. No se hizo staging adicional: el índice conserva la versión anterior de analytics.js y la corrección está en el árbol de trabajo (AM); al desbloquear, deberá incorporarse selectivamente la versión corregida y sus evidencias antes de validar la selección final. Cambios previos ajenos y bajas raíz conservados. Sin pagos, force push ni despliegue manual Netlify. No hay nuevo SHA que validar en Netlify/producción; créditos no verificados. Search Console y recepción real GA4 siguen pendientes.

Archivos de esta intervención: src/lib/analytics.js; docs/prompts/PYP-035-diagnostico-ga4.md; docs/prompts/index.md; docs/arquitectura/PYP-035-ga4.md; docs/arquitectura/index.md; docs/BITACORA_DESARROLLO.md; evidencias PYP-035 (auxiliares de runtime/control/consolidación/regresión/SEO/integridad, snapshot fuente anterior, informes JSON, consultas HTTP y logs). Los snapshots Google, perfiles y builds permanecen en carpetas temporales ignoradas dentro del repositorio. No hay instrumentación de diagnóstico incorporada al sitio.

Referencias oficiales consultadas: [Google: vistas manuales e independencia del historial de send_page_view](https://developers.google.com/analytics/devguides/collection/ga4/views), [medición SPA](https://developers.google.com/analytics/devguides/collection/ga4/single-page-applications) y [medición mejorada](https://support.google.com/analytics/answer/9216061?hl=es). Las pruebas locales no certifican producción, recepción GA4 ni cumplimiento jurídico absoluto.

## Verificación final y preparación de publicación — 2026-10-20

[Prompt completo](../../prompts/PYP-035-verificacion-final-publicacion.md). El propietario informa ajustes guardados en etiqueta GT-K824G9N8 / flujo G-WJ6METJRZD, historial y formularios desactivados y scroll/clics salientes/vídeo/descargas activados. Se vuelve a leer AGENTS.md y Git; main/HEAD inicial 6dd7bbe5cafbfda5ed8605893f4bd78b619bae39, cambios previos conservados.

**Bloqueo GA4 superado:** las descargas normal y no-cache ya reflejan __ogt_auto_events/vtp_enableHistoryEvents:false y vtp_enableForm:false. No se encuentra una etiqueta __ccd_em_page_view con vtp_historyEvents:true ni __ccd_em_form. Se conservan URL, destino, encabezados, horas y hashes en ga4-publicacion-consulta-final.json y en las descargas de runtime. La comprobación decisiva es la ejecución de la etiqueta original, no solo esos campos.

[SPA final](./diagnostico-runtime-final-spa.json): pasadas sin marcador y con marcador de observación, etiqueta Google original byteidéntica al snapshot descargado, sin control modificado. Inicio con aceptación/permiso guardado: una vista; Inicio→RPI: una; RPI→CLG SPA, atrás y adelante: una por navegación. Sin consentimiento, rechazado y después de revocar: cero vistas y cero carga previa. El marcador se limita a la instrumentación y no está en el producto. [Enlaces reales y BFCache](./diagnostico-runtime-final-ui.json): una vista por Inicio→RPI, RPI→Inicio/Proyectos, tarjeta CLG, atrás y adelante. La vista adicional de Google ha desaparecido. Cookie/flag de revocación correctos.

[Puerta de publicación](./puerta-publicacion.json): 44 controles correctos, 0 fallos, externalGatePassed:true. Sin duplicación de config/tag, sin formularios ni generate_lead. Recopilación interceptada y respondida 204 local sin reenvío: no se afirma recepción en GA4 ni se sustituye la comprobación posterior de producción.

Validaciones locales finales: [Edge](./publicacion-final/navegador.json), 46 controles de seis rutas, tarjeta RPI, infografía/ampliación, sensores, móvil/escritorio, consentimiento, contacto y StrictMode, cero fallos/excepciones. Analytics: 17 pruebas correctas (analytics-publicacion.txt). SEO: 77 controles correctos (seo-publicacion.txt/seo-diagnostico.json), canonical, sitemap, JSON-LD, imágenes y contenido CLG/RPI. npm audit --omit=dev: cero vulnerabilidades (npm-audit-publicacion.json). Integridad correcta: 17 dist intactos y fuentes aprobadas preservadas, con únicamente la corrección BFCache de seis líneas en analytics.js sobre la selección previa (integridad-publicacion.txt). Diseño, formulario y dependencias sin cambios. Los builds locales correctos ya corresponden a esas fuentes, y se compilará/prerenderizará la copia del índice antes del commit.

Se revisa y prepara staging selectivo del manifiesto PYP-030/031/032/034 más PYP-035, corrección BFCache, prompts, arquitectura, bitácora e informes. Se excluyen las bajas raíz, pendientes/documentos ajenos PYP-019/022/023/024/028/029, los patches brutos, dist, perfiles, builds y temporales. Bitácora/índice de prompts se incorporan parcialmente para conservar el trabajo ajeno local. El índice de arquitectura solo añade PYP-035. Revisión por patrones de credenciales sin valores impresos; no garantiza ausencia absoluta de secretos. Una comprobación preliminar del índice de prompts se detuvo porque aún faltaba agregar el enlace al último prompt; se añadió antes de preparar el índice.

Autorización expresa de commit y push vigente y condición externa cumplida. Se ejecutará un único commit tras validar la selección y confirmar main remoto sin divergencia; no habrá force push ni reescritura. El SHA y resultados de push/Netlify se registrarán después de su ejecución, en el cierre local de estas evidencias, sin crear un segundo commit automático únicamente para insertar el SHA del primero.

Sin CLI ni token autenticado Netlify/GitHub detectados. Se verificará el SHA remoto y la señal pública de despliegue Netlify en GitHub, sin inferir créditos de una página HTML ni del cambio de ciclo. No se harán pagos ni despliegues manuales/repetidos. Tras despliegue nuevo confirmado se revisarán las seis rutas y recursos públicos; la solicitud de indexación de CLG/RPI y revisión del sitemap en Search Console queda posterior a disponibilidad pública real.

Incidencia de staging final: diff --cached --check detectó únicamente líneas vacías extra al final de auxiliares .mjs y espacios de salida de node:test en la evidencia de regresión anterior. Se normalizó solo formato, preservando originales completos y SHA-256 en normalizacion-publicacion-originales.json. No se alteró código comercial ni lógica de auxiliares. El log de ejecución de preparación queda local fuera del índice para evitar capturarlo mientras se escribe.

Selección validada antes del commit: build comercial, prerender de seis rutas, 77 controles SEO y VitePress estricto de la copia del índice correctos; 20 fuentes/assets seleccionados coinciden con el árbol local normalizando solo saltos en texto, seis formularios estáticos conservados. Evidencia seleccion-publicacion-validada.json. Se incorporan los informes finales y auxiliares de consulta pública GitHub/Netlify y producción; esos añadidos son exclusivamente documentales y no alteran las fuentes compiladas.
