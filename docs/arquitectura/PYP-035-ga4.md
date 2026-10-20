# PYP-035 — Diagnóstico de GA4 y restauraciones de historial

Fecha: 2026-10-20 (America/Bogota). [Prompt](../prompts/PYP-035-diagnostico-ga4.md). [Diagnóstico y evidencias](../evidencias/PYP-035/resultado.md).

La estrategia continúa siendo una sola inicialización por documento y page_view manual desde el catálogo SEO de React Router, con send_page_view:false. La medición automática de historial pertenece a la configuración externa y debe estar efectivamente desactivada: ejecutar la etiqueta pública actual demostró un segundo evento automático, separado del manual. No se añade una estrategia de deduplicación que suprima arbitrariamente vistas ni se modifica código de Google en producción.

Corrección local mínima en src/lib/analytics.js: un listener pageshow, registrado una sola vez dentro de startAnalytics, actúa únicamente cuando event.persisted es true. La restauración BFCache no vuelve a montar React ni a ejecutar los efectos de ruta. Por ello se invalida la última vista y se relee la preferencia persistida antes de medir el retorno. Si fue revocada/expiró mientras el documento estaba guardado, se mantiene el bloqueo y se eliminan cookies accesibles; si sigue aceptada se registra una vista de retorno, reutilizando etiqueta e inicialización existentes. Un pageshow ordinario no añade vistas.

Tres pruebas de regresión fallaban antes y pasan tras el cambio; se conservan las catorce anteriores. El recorrido Edge demuestra atrás/adelante con una vista tras la corrección, sin nueva carga/config y sin recopilación después de revocar. No se cambia diseño, contenido, formulario, cookies esenciales ni dependencia.

La instrumentación vive en evidencias y perfiles/builds ignorados: captura la etiqueta por GET, ejecuta bytes originales en Edge, sirve el build local bajo un origen simulado, distingue llamada pública y evento de red mediante un marcador de prueba, y responde collect con 204 local sin reenviar. Un control causal cambia solo historyEvents:false en una copia local y elimina la vista adicional; ese control no modifica GA4 ni habilita publicación. El sitio productivo y la recepción en la propiedad no quedan certificados por esta prueba.
