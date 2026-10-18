# PYP-029 — Estrategia y seguimiento SEO de CLG

Fecha de preparación: 2026-10-18 (America/Bogota).
Fecha de publicación PYP-028/PYP-029: pendiente de comprobación pública.
Estado de indexación: sin comprobar; no hay acceso autorizado conectado a Search Console.

## Estrategia comercial

La página /proyectos/clg/ reúne tres intenciones en una única URL de producto con llamada a evaluación del proyecto. No se crean páginas duplicadas ni comparaciones contra fabricantes. Las expresiones son hipótesis editoriales de intención comercial; no hay datos de volúmenes, posiciones o dificultad de búsqueda verificados. Se priorizan necesidades concretas del comprador y compatibilidad con su operación.

| Grupo | Necesidad y consultas objetivo | Contenido y conversión |
| --- | --- | --- |
| A · Comercial | Sistema de publicidad programable; publicidad por audio para supermercados; perifoneo comercial automatizado; sistema de anuncios para almacenes; música ambiental con publicidad; mensajes automáticos | Secciones de audio comercial, RTC y CLG Media; música, anuncios y horarios. Caso de 47 dispositivos como experiencia, CTA al formulario existente. Prioridad inicial. |
| B · Automatización | Sistema de avisos audibles; audio activado por eventos; mensajes de voz por señales digitales; automatización de audio industrial; relés y anuncios por horarios | Entradas/salidas, diagrama evento-condición-mensaje-acción y Edge. El relé ejecuta acciones según reglas; no se afirma que el audio sea controlado eléctricamente por un relé. Prioridad inicial junto con A. |
| C · Integración | Audio activado por Modbus; avisos con Modbus TCP; mensajes por Ethernet; integración de audio con CAN; procesamiento local Edge Computing; comunicación audible IoT | Protocolos con alcance condicionado y preguntas Modbus. Los términos describen proyectos de integración, sin atribuir protocolos no verificados a las 47 unidades. Captación especializada. |

Diferenciación comunicada: audio/música, señales físicas, datos externos, reglas locales, cuatro relés, RTC, administración según conectividad y experiencia de instalación. Se describen capacidades propias sin comparar con limitaciones de productos ajenos. MQTT permanece como posibilidad de integración pendiente de verificación.

Cambios PYP-029: enlace descriptivo desde Inicio y enlaces contextuales desde IoT Industrial y Automatización Edge. La página CLG conserva diseño, texto aprobado, infografía, fotografías, dashboard y metadatos PYP-028. Sus enlaces de regreso y contacto siguen disponibles.

## Guía operativa de Google Search Console

1. El propietario debe acceder a [Search Console](https://search.google.com/search-console/) con su cuenta y comprobar si pyptecnologia.com ya aparece como propiedad verificada. Si existe, utilizarla o solicitar acceso al propietario actual; no duplicar verificación sin necesidad.
2. Si falta, añadir una propiedad de tipo Dominio con pyptecnologia.com. Copiar el registro TXT que genere el asistente y añadirlo en el proveedor DNS de la zona, usando el host indicado y conservando los registros existentes. Esperar la propagación y pulsar Verificar. Mantener el registro. No guardar el valor de verificación ni credenciales en este repositorio. [Procedimiento oficial de verificación](https://support.google.com/webmasters/answer/9008080?hl=es).
3. En Sitemaps, enviar https://pyptecnologia.com/sitemap.xml y revisar lectura, fecha y errores. La presentación del sitemap ayuda al descubrimiento, pero no garantiza indexación ni posicionamiento. [Guía oficial de sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
4. Inspeccionar https://pyptecnologia.com/proyectos/clg/. Registrar el estado real de la URL indexada, canonical declarada/seleccionada, último rastreo y recursos. Ejecutar Probar URL publicada; distinguir el resultado de la prueba en vivo del estado indexado. Si es rastreable y procede tras publicar, Solicitar indexación. No afirmar que la solicitud equivale a inclusión. [Inspección de URL](https://support.google.com/webmasters/answer/9012289?hl=es).
5. Revisar también las otras cuatro URLs: https://pyptecnologia.com/, https://pyptecnologia.com/iot-industrial/, https://pyptecnologia.com/monitoreo-energetico/ y https://pyptecnologia.com/automatizacion-edge/. Registrar errores específicos y corregirlos según evidencia.
6. En Indexación > Páginas, revisar indexadas/no indexadas y sus causas; comparar con las cinco canonical. Guardar fecha y resultado, sin datos privados de cuentas.
7. En Rendimiento > Resultados de búsqueda, filtrar la página CLG, tipo Web y periodos comparables. Registrar consultas, impresiones, clics, CTR y posición media; segmentar marca, comercial y técnica. Si se utiliza país Colombia o dispositivo, mantener el mismo filtro al comparar. Exportar únicamente datos del sitio autorizados, sin identidad de usuarios o credenciales. [Informe Rendimiento](https://support.google.com/webmasters/answer/7576553?hl=es).

No se ejecutan acciones sobre la cuenta en PYP-029. Un HTTP 200, un sitemap y el HTML rastreable no acreditan indexación. Fuentes oficiales consultadas el 2026-10-18.

## Línea de base y plantilla de medición

No se sustituyen valores desconocidos por cero. Cada dato necesita fecha, filtros, fuente y evidencia. CTR se obtiene de Search Console o se calcula como clics/impresiones cuando hay impresiones. La posición media se registra tal como la informa la herramienta; no se inventa un ranking por consulta.

| Fecha de observación | Grupo | Consulta detectada | Indexación | Impresiones | Clics | CTR | Posición media | Página de destino | Fuente/filtros | Oportunidad |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Pendiente | A · Marca (CLG/PYP) | Sin datos | Sin comprobar | Sin datos | Sin datos | Sin datos | Sin datos | /proyectos/clg/ | Search Console pendiente | Separar búsquedas de marca |
| Pendiente | B · Comercial (publicidad/perifoneo/audio) | Sin datos | Sin comprobar | Sin datos | Sin datos | Sin datos | Sin datos | /proyectos/clg/ | Search Console pendiente | Priorizar intención de compra |
| Pendiente | C · Técnica (Modbus/automatización/Edge) | Sin datos | Sin comprobar | Sin datos | Sin datos | Sin datos | Sin datos | /proyectos/clg/ | Search Console pendiente | Verificar demanda de integraciones |

Las letras de la plantilla de medición corresponden a la clasificación solicitada de marca/comercial/técnica; la tabla de estrategia anterior conserva los grupos temáticos originales del encargo.

## Revisiones a 30, 60 y 90 días

La fecha base será la publicación realmente verificada, no la de preparación del documento. No se crean automatizaciones ni recordatorios externos.

| Hito | Fecha | Revisión | Decisión basada en evidencia |
| --- | --- | --- | --- |
| D+30 | Pendiente de publicación | Indexación de cinco URLs, errores de rastreo, consultas iniciales por grupo y página | Resolver problemas de acceso/canonical; revisar si consultas comerciales encuentran la página |
| D+60 | Pendiente de publicación | Comparar periodos completos con los mismos filtros; separar marca, comercial y técnica | Ajustar claridad de títulos, descripciones o respuestas según consultas reales; no acumular palabras clave |
| D+90 | Pendiente de publicación | Tendencia de impresiones/clics/CTR/posición y pertinencia de las consultas | Priorizar contenido útil respaldado y solicitudes comerciales reales; aprobar aparte cualquier nueva página |

Las consultas pueden agruparse con filtros o exportación manual; hay que comprobar cada clasificación porque una consulta puede mezclar marca e intención comercial. El tráfico de marca no se presenta como crecimiento de búsquedas genéricas. Si no existen datos suficientes, registrar esta limitación y posponer conclusiones.
