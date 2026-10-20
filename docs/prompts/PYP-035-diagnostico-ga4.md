# PYP-035 — Diagnóstico definitivo de discrepancia GA4 antes de publicación

Continuar PYP-035 en D:\promate\web\pyp-web.

El propietario configuró manualmente Google Analytics 4, flujo G-WJ6METJRZD, y presentó captura con:

- Cargas de página activadas.
- Cambios de página por historial de navegación desactivados.
- Interacciones con formularios desactivadas.

Sin embargo, dos consultas nuevas a la etiqueta pública siguen mostrando:

\_\_ccd_em_page_view → vtp_historyEvents: true

No aparece \_\_ccd_em_form.

OBJETIVO:

Determinar si existe una duplicación real de page_view o una discrepancia entre la configuración del panel GA4 y la etiqueta pública.

PROCEDIMIENTO:

1. Comprobar que la etiqueta consultada corresponde exactamente a G-WJ6METJRZD y registrar URL, fecha, respuesta y encabezados relevantes.
2. Repetir la consulta evitando caché, sin confundir parámetros de configuración publicados con evidencia de eventos realmente enviados.
3. Revisar si existen múltiples inicializaciones gtag, etiquetas GA4 adicionales o Google Tag Manager.
4. Inspeccionar src/lib/analytics.js, Analytics.jsx, AnalyticsConsent.jsx y SiteRoutes.jsx.
5. Probar en navegador real los siguientes escenarios:
   - Sin consentimiento.
   - Consentimiento rechazado.
   - Consentimiento aceptado.
   - Primera carga de Inicio.
   - Navegación Inicio → RPI-MDFR.
   - Navegación RPI-MDFR → CLG.
   - Navegación atrás y adelante.
   - Revocación de consentimiento.
6. Instrumentar temporalmente la observación de eventos y solicitudes de red para identificar cuántos page_view se generan por navegación.
7. Diferenciar eventos emitidos por nuestra aplicación de eventos automáticos de Google.
8. No enviar formularios reales ni datos personales.
9. Si existen eventos duplicados, identificar y corregir su causa con el mínimo cambio necesario.
10. Si no existen duplicados observables, documentar exactamente qué se probó, qué no pudo verificarse y el riesgo residual de la discrepancia.
11. No presentar pruebas locales como demostración absoluta de lo que ocurrirá en producción.
12. Mantener intactos el diseño aprobado, CLG, RPI-MDFR y los 17 archivos locales de dist.
13. Ejecutar nuevamente las pruebas necesarias tras cualquier corrección.
14. Actualizar docs/evidencias/PYP-035/resultado.md y la bitácora.

CRITERIO DE PUBLICACIÓN:

Si se demuestra que existe una única emisión de page_view por navegación, no hay cargas de Analytics antes del consentimiento y no existen otros problemas críticos, presentar el resultado con evidencia.

Si persiste la discrepancia externa sin explicación suficiente, no realizar commit ni push automáticamente. Informar la causa probable y la comprobación manual exacta que falta.

Si se confirma una duplicación, corregirla antes de publicar.

La autorización previa de publicación sigue vigente, condicionada a resolver el bloqueo técnico.

No ejecutar force push, no realizar pagos y no desplegar manualmente en Netlify.
