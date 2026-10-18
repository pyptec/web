# PYP-021 — Auditoría de publicación en Netlify

Fecha: 2026-10-18, America/Bogota. [Prompt completo](../../prompts/PYP-021.md).

## Dictamen

La web pública funciona en los recorridos realizados y las cabeceras identifican Netlify. **No se puede certificar que el despliegue publicado corresponda al commit PYP-020**: falta evidencia del panel/API que vincule deploy y SHA. Diagnóstico y documentación sin modificaciones funcionales, compilación, staging, commit, push, despliegue ni envío de formularios.

## A. GitHub y estado inicial

Rama main. HEAD, origin/main local y consulta real git ls-remote origin refs/heads/main coinciden en **4f0a960377f3e3ea16e3c9a32f19847308be85cb**; diferencia HEAD...origin/main 0/0. Commit PYP-020: “feat: integrar navegación, SEO y documentación PYP”, 2026-10-17 16:36:42 -05:00. Se confirma su presencia actual en main de GitHub; no se consultan checks/actions ni se reconstruye el log del push anterior.

Leídos AGENTS.md e informes PYP-019/020. Estado antes de editar: sin cambios tracked ni staging, tres rutas sin seguimiento conservadas:
- 02_PROMPT_001_AUDITORIA_NAVBAR.md
- 03_PROMPT_002_NAVBAR_EDGE.md
- docs/evidencias/PYP-019/main.jsx.before.txt

[Datos Git/configuración](./git-inicial.json): su campo status se capturó al iniciar el script, después de crear prompt y script PYP-021; esas altas no son cambios previos. El informe PYP-020 quedó escrito antes de su commit; este registro incorpora el SHA real sin reescribir el histórico. No se ejecutan fetch, pull, merge o rebase.

## B. Netlify

Cabeceras server: Netlify, cache-status: Netlify Edge y x-nf-request-id conservadas por salto en [http-rutas.json](./http-rutas.json). HTTPS público operativo. Sin netlify.toml, .netlify/state.json o CLI Netlify disponible. Búsqueda de plugin Netlify: cero resultados. No se inspeccionan secretos ni credenciales del equipo.

Configuración del repositorio: package.json declara build = vite build && node scripts/generar-seo.mjs, Node >=22.12.0. Vite conserva salida predeterminada dist; public/_redirects declara /* /index.html 200. Esto **no confirma la configuración efectiva del panel**.

Pendientes: último deploy/ID/fecha, SHA asociado, estado Published o Failed, rama/base, comando, publish directory, Node, instalación de devDependencies, errores y advertencias de build. No se crea ningún despliegue.

Los bundles públicos index-Di7j3tgx.js e index-C-IWZACu.css tienen nombres diferentes a index-BOudA17U.js e index-hrzmi9gy.css del artefacto temporal PYP-019. No se comprobó equivalencia binaria ni la causa de la diferencia; no se atribuye a un commit o fallo concreto. No se recompila.

## C. Rutas HTTP reales

GET con redirecciones manuales; cabeceras y fechas UTC en [http-rutas.json](./http-rutas.json). Origen de las rutas solicitadas: https://pyptecnologia.com.

| Ruta solicitada | HTTP inicial | Cadena | URL final | SEO propio |
| --- | ---: | --- | --- | --- |
| / | 200 | 200 | https://pyptecnologia.com/ | Sí |
| /monitoreo-energetico | 301 | 301 → 200 | https://pyptecnologia.com/monitoreo-energetico/ | Sí |
| /monitoreo-energetico/ | 200 | 200 | https://pyptecnologia.com/monitoreo-energetico/ | Sí |
| /iot-industrial | 301 | 301 → 200 | https://pyptecnologia.com/iot-industrial/ | Sí |
| /iot-industrial/ | 200 | 200 | https://pyptecnologia.com/iot-industrial/ | Sí |
| /automatizacion-edge | 301 | 301 → 200 | https://pyptecnologia.com/automatizacion-edge/ | Sí |
| /automatizacion-edge/ | 200 | 200 | https://pyptecnologia.com/automatizacion-edge/ | Sí |

Las tres interiores sin barra redirigen 301 a barra final, sin bucles observados. Canonical y sitemap interiores permanecen sin barra, aunque el CDN redirige a barra final: divergencia de normalización a revisar. Cada respuesta conserva metadatos propios.

## D. SEO

robots.txt: 200, permite rastreo y referencia sitemap. Igual al local tras normalizar CRLF/LF; diferencia de SHA por saltos de línea. sitemap.xml: 200 application/xml, cuatro URLs exactas y SHA idéntico al local; XML parseado con PowerShell. og-pyp.png: 200 image/png, 1.355.270 bytes y SHA idéntico al local; dimensiones declaradas 1448 × 1086.

Siete HTML iniciales con título, description, canonical y OG coincidentes con src/data/seo.js. Las interiores no heredan metadatos de Inicio. Catorce estados de navegador (7 URLs × 2 tamaños) comparados con esa configuración; regreso React de Edge a /#contacto actualiza metadatos a Inicio. [Comparaciones](./validaciones.json). Todas las etiquetas OG por URL están también en http-rutas.json; HTML inicial conservado en ruta-0.html a ruta-6.html.


### /

Título: IoT Industrial y Monitoreo Energético en Colombia | PYP Tecnología

Canonical: https://pyptecnologia.com/

Description: Soluciones IoT industriales, monitoreo energético, automatización, OEE y telemetría LoRaWAN. Hardware, gateways Edge y software desarrollado en Colombia.

Open Graph:

- og:type: website
- og:locale: es_CO
- og:site_name: PYP Tecnología Electrónica SAS
- og:title: IoT Industrial y Monitoreo Energético en Colombia | PYP Tecnología
- og:description: Soluciones IoT industriales, monitoreo energético, automatización, OEE y telemetría LoRaWAN. Hardware, gateways Edge y software desarrollado en Colombia.
- og:url: https://pyptecnologia.com/
- og:image: https://pyptecnologia.com/og-pyp.png
- og:image:type: image/png
- og:image:width: 1448
- og:image:height: 1086
- og:image:alt: Logotipo PYP Tecnología Electrónica SAS

### /monitoreo-energetico

Título: Monitoreo Energético Industrial y Solar | PYP Tecnología

Canonical: https://pyptecnologia.com/monitoreo-energetico

Description: Soluciones IoT SAMEE100 y SAMEE200 para monitoreo energético industrial y solar. Medición eléctrica, dashboards, alarmas e indicadores ISO 50001.

Open Graph:

- og:type: website
- og:locale: es_CO
- og:site_name: PYP Tecnología Electrónica SAS
- og:title: Monitoreo Energético Industrial y Solar | PYP Tecnología
- og:description: Soluciones IoT SAMEE100 y SAMEE200 para monitoreo energético industrial y solar. Medición eléctrica, dashboards, alarmas e indicadores ISO 50001.
- og:url: https://pyptecnologia.com/monitoreo-energetico
- og:image: https://pyptecnologia.com/og-pyp.png
- og:image:type: image/png
- og:image:width: 1448
- og:image:height: 1086
- og:image:alt: Logotipo PYP Tecnología Electrónica SAS

### /iot-industrial

Título: IoT Industrial y LoRaWAN en Colombia | PYP Tecnología

Canonical: https://pyptecnologia.com/iot-industrial

Description: Soluciones IoT industrial y LoRaWAN: gateways Edge, sensores, Modbus, MQTT, telemetría, almacenamiento local e integración con AWS IoT y plataformas empresariales.

Open Graph:

- og:type: website
- og:locale: es_CO
- og:site_name: PYP Tecnología Electrónica SAS
- og:title: IoT Industrial y LoRaWAN en Colombia | PYP Tecnología
- og:description: Soluciones IoT industrial y LoRaWAN: gateways Edge, sensores, Modbus, MQTT, telemetría, almacenamiento local e integración con AWS IoT y plataformas empresariales.
- og:url: https://pyptecnologia.com/iot-industrial
- og:image: https://pyptecnologia.com/og-pyp.png
- og:image:type: image/png
- og:image:width: 1448
- og:image:height: 1086
- og:image:alt: Logotipo PYP Tecnología Electrónica SAS

### /automatizacion-edge

Título: Automatización Industrial y Edge Computing | PYP Tecnología

Canonical: https://pyptecnologia.com/automatizacion-edge

Description: Desarrollo electrónico, gateways industriales, control Edge, Modbus, CAN J1939, supervisión local y automatización de procesos en Colombia.

Open Graph:

- og:type: website
- og:locale: es_CO
- og:site_name: PYP Tecnología Electrónica SAS
- og:title: Automatización Industrial y Edge Computing | PYP Tecnología
- og:description: Desarrollo electrónico, gateways industriales, control Edge, Modbus, CAN J1939, supervisión local y automatización de procesos en Colombia.
- og:url: https://pyptecnologia.com/automatizacion-edge
- og:image: https://pyptecnologia.com/og-pyp.png
- og:image:type: image/png
- og:image:width: 1448
- og:image:height: 1086
- og:image:alt: Logotipo PYP Tecnología Electrónica SAS

## E. Formulario contacto-pyp

Las siete respuestas iniciales contienen formulario oculto POST y los siete campos: form-name=contacto-pyp, nombre, correo, empresa, solucion, mensaje y bot-field. En el HTML público se omiten data-netlify y netlify-honeypot del formulario estático: compatible con procesamiento Netlify, **no acredita su registro en el panel**.

El formulario React visible de Inicio conserva POST, data-netlify=true, netlify-honeypot=bot-field y los siete campos en ambos tamaños. nombre, correo y mensaje son required; correo usa type=email. [DOM](./navegador.json), [HTML/campos](./http-rutas.json).

No se enviaron formularios. El navegador permitió solo GET/HEAD; ningún intento de otros métodos registrado. Reconocimiento en Forms, recepción, notificaciones y antispam **no validados**.

## F. Navegación, consola y recursos

Edge headless mediante CDP: escritorio 1440×1000 y emulación móvil 375×1000, reduced-motion. No equivale a móvil físico ni todos los navegadores.

- 14 cargas, una Navbar por página, sin overflow horizontal de página.
- Soluciones abre por clic; Escape cierra y devuelve foco; enlace activo correcto con/sin barra.
- 56 clics de SectionNav: destino existente, hash/foco correctos y encabezado visible debajo de Navbar.
- Recorrido por las tres soluciones en ambos tamaños. Hablemos regresa a /#contacto mediante React; Proyectos y Tecnología desplazan/enfocan las secciones.
- Plataforma: enlace https://iotrack.com.co, target=_blank y rel=noopener noreferrer. GET real externo 200, título IoT Collector. Sin probar autenticación/funcionalidad de esa plataforma.
- 254 respuestas de red: cero HTTP >=400, cero loadingFailed, cero errores/warnings de consola/Log en el recorrido. JS/CSS con tipos correctos e imágenes observadas sin fallos.
- Ocho PNG de las cuatro páginas en ambos tamaños. Inspección visual de Inicio móvil y Edge escritorio sin roturas generales; SectionNav móvil admite desplazamiento horizontal local.

[Registro del navegador](./navegador.json), [recursos HTTP](./http-recursos.json), [iotrack](./iotrack.json). No se pulsaron exhaustivamente todos los CTA, enlaces de correo/teléfono o documentos. Sin móvil físico, prueba de envío ni validación de otros navegadores. Los resultados se limitan a estos recorridos.

## Fallos confirmados

/favicon.svg devuelve **200 text/html**, con HTML de Inicio (4.442 bytes), en lugar de un SVG. El fallback oculta el recurso ausente; no es un 404. No se modifica. No se observaron fallos de rutas, metadatos, consola o anclas en las pruebas ejecutadas.

## Seguridad e integridad

npm audit --omit=dev --json: exit 0 y cero vulnerabilidades de producción; 11 dependencias prod reportadas. [Salida](./npm-audit-produccion.json), [código de salida](./npm-audit-comando.json). No se extiende el resultado a devDependencies; sin actualizar dependencias.

No se ejecutan builds comerciales ni VitePress; validación documental con enlaces, whitespace y diff, sin tocar dist. [Inventario SHA inicial](./integridad-inicial.json) y [cierre](./validacion-final.json) comparan dist, fuentes, public, scripts, configuración, dependencias e índice Git.

## Pruebas no realizadas y acciones recomendadas

1. Alta: obtener evidencia de panel/API Netlify del último deploy Published, ID, SHA exacto esperado, comando/directorio, rama/base, Node y logs. Esto cierra la atribución pendiente.
2. Alta: verificar contacto-pyp en Forms. Autorizar aparte un envío controlado y comprobar recepción/notificaciones; no inferirlo del HTML.
3. Corregir favicon.svg en una intervención funcional autorizada y verificar MIME/contenido.
4. Revisar barras entre CDN, canonical, sitemap y enlaces internos para evitar redirecciones innecesarias.
5. Si se requiere equivalencia binaria, comparar artefacto y entorno de build del deploy con el commit; nombres de bundles respecto a PYP-019 diferentes, causa sin comprobar.
6. Complementar con móvil físico, otros navegadores y CTA/documentos restantes. No se verifican checks GitHub ni se repiten builds previos.

## H. Git final, archivos y aprobación

HEAD permanece en el commit PYP-020, índice sin staging y tres rutas previas sin seguimiento conservadas. Modificados únicamente docs/BITACORA_DESARROLLO.md y docs/prompts/index.md. Nuevos docs/prompts/PYP-021.md y docs/evidencias/PYP-021/ (informe, scripts de diagnóstico/documentación, JSON, HTML HTTP, robots/sitemap y ocho PNG). Perfil anónimo temporal en browser-profile/, ignorado por reglas existentes.

[Estado Git, integridad y validaciones finales](./validacion-final.json). Aprobado diagnóstico/documentación por PYP-021; sin cambios funcionales, staging, commit, push, despliegues o envíos. Publicación del SHA esperado y recepción Forms pendientes de evidencia.

Incidencia de documentación: el primer generador falló por sintaxis antes de escribir informe/bitácora/índice; se corrigió y reejecutó. Las pruebas HTTP y navegador ya habían terminado y no se repitieron.
