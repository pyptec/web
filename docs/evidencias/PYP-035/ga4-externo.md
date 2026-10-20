# PYP-035 — Estado de GA4 externo

Fecha: 2026-10-20 (America/Bogota).

Se solicitó confirmar historial/formularios desactivados y ausencia de etiquetas/reglas duplicadas. Respuesta textual disponible del propietario:

> Confirmo los ajustes y detallo la revisión

No se recibió un detalle adicional de los cambios ni acceso administrativo. Se registró como confirmación del propietario, sin simular una inspección de la cuenta.

Una consulta pública posterior, sin ejecutar la etiqueta ni enviar eventos, devolvió HTTP 200 y vtp_enableHistoryEvents=true, vtp_enableForm=true, vtp_enableOutboundClick=true y vtp_enablePageView=true. Véase ga4-etiqueta-publica.json. Los indicadores no certifican el estado efectivo por sí solos, pero contradicen la expectativa y dejan pendiente aclarar la propagación/configuración. Se preguntó al propietario qué estado ve y cuándo guardó los cambios. Commit/push detenidos mientras se aclara.

## Ajustes manuales exactos

1. GA4 → Administrar → Recogida y modificación de datos → Flujos de datos → seleccionar el flujo web cuyo ID de medición es G-WJ6METJRZD.
2. Medición mejorada → engranaje → Vistas de página → Mostrar configuración avanzada → desmarcar Cambios de página basados en eventos del historial del navegador. Guardar. El código ya utiliza send_page_view:false para la inicialización; el ajuste de historial es independiente.
3. En Medición mejorada, desactivar Interacciones con formularios. Guardar. No usar form_submit como evidencia de recepción Netlify ni convertirlo en generate_lead.
4. Revisar clics salientes: pueden registrar URLs de contacto con teléfonos/mensajes. Desactivarlos para este flujo mientras no exista una exclusión verificada que evite ese contenido. Se conservan los eventos manuales contact_click/contact_cta_click, que envían solo método y ruta. Revisar búsqueda del sitio y descarga de archivos si pueden incorporar términos o URLs con datos personales. No desactivar scroll/video sin motivo: no duplican las vistas ni los eventos manuales de contacto por sí mismos.
5. En el flujo → Etiqueta de Google/configurar ajustes de etiqueta → revisar etiquetas/destinos conectados y ausencia de una segunda etiqueta que mida este flujo. Si existe GTM externo o inyectado desde hosting, revisar sus activadores de carga/historial/clic/formulario y evitar duplicados con el módulo React. El repositorio no contiene otro ID GA/GTM ni otra carga de etiqueta en src/public/index.html.
6. Administrar → Visualización de datos → Eventos: revisar creación/modificación de eventos y eventos clave, evitando reglas adicionales para page_view, contact_click, contact_cta_click y generate_lead. Mantener generate_lead desactivado sin confirmación verificable del formulario.
7. Revisar Google Signals, publicidad y datos proporcionados por usuarios: el código los restringe; no habilitar recogida adicional que contradiga el aviso. Revisar retención y la revisión jurídica del aviso integral sin afirmar cumplimiento legal absoluto.
8. Confirmar ID, cambios guardados, estado de los interruptores y ausencia de reglas/etiquetas duplicadas. Aclarar la discrepancia pública antes de publicar. Luego verificar la configuración efectiva y, tras despliegue confirmado, la medición consentida sin duplicados.

No se modificó ninguna configuración externa. No se enviaron formularios ni eventos reales. Las pruebas con etiqueta sustituida localmente no prueban la recepción GA4.

Fuentes oficiales consultadas:

- [Google: page_view manual y desactivación independiente del historial](https://developers.google.com/analytics/devguides/collection/ga4/views).
- [Google: medición mejorada](https://support.google.com/analytics/answer/9216061) (consulta inicial agotó el tiempo; no se presenta como página revisada correctamente en esa consulta).

Consulta posterior correcta de [Medición mejorada de Google](https://support.google.com/analytics/answer/9216061?hl=es): confirma controles por evento, historial independiente, URLs de enlace en clics salientes y eventos automáticos de formulario.

Continuación del 2026-10-20: confirmación explícita guardada en el prompt con sufijo confirmacion-ga4. La consulta específica del destino conserva __ccd_em_page_view/vtp_historyEvents:true, sin __ccd_em_form. Los indicadores ogt generales no bastan para concluir configuración del destino. Véanse ga4-confirmacion-publica.json y el apéndice de resultado.md. Sin commit/push mientras no se resuelva el historial.
