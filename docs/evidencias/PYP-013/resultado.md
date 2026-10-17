# PYP-013 — SEO técnico, metadatos y sitemap

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-013.md). Estado inicial y hashes: estado-inicial.json. Copias anteriores de index, Seo, generador y sitemap conservadas como *.before.txt.

## Auditoría inicial

Se leyeron AGENTS.md, bitácora e informe PYP-009 y se revisaron las intervenciones PYP-010/011/012. Diez archivos seguidos modificados y fuentes/documentación nuevas previas; sin staging. main.jsx registra las cuatro rutas y pasa un path fijo a Seo. package.json ejecuta vite build y después scripts/generar-seo.mjs. No existe netlify.toml; la configuración del panel no se puede confirmar.

| Ruta | HTML inicial anterior | React anterior | Sitemap anterior |

| --- | --- | --- | --- |

| / | Title/description/canonical propios; OG con variantes de texto | Propio | Sí |

| /monitoreo-energetico | HTML propio por sustituciones literales; OG description distinta de React | Propio | No |

| /iot-industrial | Fallback con metadatos de Inicio | Propio después de montar | No |

| /automatizacion-edge | Fallback con metadatos de Inicio | Propio después de montar | No |

No existían og:image ni Twitter Card. robots.txt ya permitía rastreo y apuntaba al sitemap oficial. El generador solo producía Monitoreo y dependía de sustituir textos literales duplicados. Netlify Forms fue corregido en PYP-011 y navegación/hash en PYP-012; se preservan.

## Arquitectura elegida

Se amplía el postproceso existente después de Vite, sin nuevas dependencias, SSR ni prerenderizado de contenido. src/data/seo.js centraliza exactamente los títulos y descripciones aprobados que estaban en Seo.jsx, el dominio, canonical por ruta y la imagen social. Seo.jsx consume ese módulo para el navegador y scripts/generar-seo.mjs lo importa en Node.

El generador lee el HTML compilado y produce index.html y los tres directorios de ruta con su index.html. Solo reemplaza etiquetas SEO específicas del head; conserva body, bundles, formulario y JSON-LD. Exige exactamente una etiqueta de cada tipo y valida todos los heads antes de escribir; admite --outDir explícito para pruebas temporales y mantiene dist como valor predeterminado del build comercial existente.

No se cambia package.json: npm run build sigue ejecutando Vite y el generador. Los cambios head de index.html alinean OG de Inicio con los mismos textos y declaran la imagen. Ningún componente visual ni contenido comercial fue modificado.

La regla public/_redirects /* /index.html 200 permanece intacta. Los archivos existentes prevalecen sobre un rewrite no forzado según la [documentación oficial de Netlify](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#shadowing); los HTML por ruta permiten metadatos iniciales propios sin depender de JavaScript. La configuración real, normalización de barras y cachés del CDN deben verificarse en un entorno Netlify autorizado. Esto entrega metadatos iniciales, no prerenderiza el contenido React ni garantiza indexación o vistas sociales idénticas en todos los rastreadores.

## Metadatos finales

| Ruta | Title y og:title | Description y og:description | Canonical y og:url |

| --- | --- | --- | --- |

| / | IoT Industrial y Monitoreo Energético en Colombia | PYP Tecnología | Soluciones IoT industriales, monitoreo energético, automatización, OEE y telemetría LoRaWAN. Hardware, gateways Edge y software desarrollado en Colombia. | https://pyptecnologia.com/ |
| /iot-industrial | IoT Industrial y LoRaWAN en Colombia | PYP Tecnología | Soluciones IoT industrial y LoRaWAN: gateways Edge, sensores, Modbus, MQTT, telemetría, almacenamiento local e integración con AWS IoT y plataformas empresariales. | https://pyptecnologia.com/iot-industrial |
| /monitoreo-energetico | Monitoreo Energético Industrial y Solar | PYP Tecnología | Soluciones IoT SAMEE100 y SAMEE200 para monitoreo energético industrial y solar. Medición eléctrica, dashboards, alarmas e indicadores ISO 50001. | https://pyptecnologia.com/monitoreo-energetico |
| /automatizacion-edge | Automatización Industrial y Edge Computing | PYP Tecnología | Desarrollo electrónico, gateways industriales, control Edge, Modbus, CAN J1939, supervisión local y automatización de procesos en Colombia. | https://pyptecnologia.com/automatizacion-edge |

En las cuatro páginas: og:type=website, og:locale=es_CO y og:site_name=PYP Tecnología Electrónica SAS conservados. og:image=https://pyptecnologia.com/og-pyp.png; type=image/png; width=1448; height=1086; alt=Logotipo PYP Tecnología Electrónica SAS. El archivo es copia exacta del logo oficial src/assets/proyectos/log_pyp.png, inspeccionado visualmente, sin transformar la imagen. Pesa 1.355.270 bytes; no es una composición promocional nueva ni una tarjeta específica por solución. Se usa una URL pública estable y PNG existente por compatibilidad; la vista/crop final depende de la plataforma.

La [especificación Open Graph](https://ogp.me/) respalda los campos básicos y atributos de imagen. Twitter Card no estaba implementada y no se añade; no se crean títulos sociales alternativos ni afirmaciones comerciales nuevas.

El registro legible completo se conserva en metadatos-esperados.json y generator-results.json. Las URLs canónicas no incorporan barras finales de soluciones, query strings ni fragmentos; Inicio conserva la barra raíz.

## Sitemap y robots

public/sitemap.xml contiene exactamente https://pyptecnologia.com/, /monitoreo-energetico, /iot-industrial y /automatizacion-edge con dominio absoluto en cada loc. Namespace http://www.sitemaps.org/schemas/sitemap/0.9; XML parseado sin errores. No se incluyen documentación, rutas inexistentes, lastmod ni fechas inventadas. Sus cuatro URLs coinciden con los canonical.

public/robots.txt se conserva: User-agent: *, Allow: /, Sitemap: https://pyptecnologia.com/sitemap.xml. Vite copia ambos al artefacto comercial.

## Pruebas realizadas

- Vite 6.4.1: salida 0, 1601 módulos, 15.77 s; salida nueva build-temporal/comercial/dist. Generador ejecutado con --outDir explícito: cuatro HTML generados correctamente.

- generator-check.mjs: 14 comprobaciones pasadas. Todos los títulos/descripciones coinciden literalmente con el mapa anterior de Seo.jsx; body y JSON-LD de las cuatro páginas intactos, body fuente/formulario intacto, imagen exacta original/public/build, idempotencia y rechazo de plantilla sin description o con canonical duplicado sin escribir páginas parciales. Fixtures solo en build-temporal nuevo.

- browser-check.cjs: 59 comprobaciones pasadas sobre el artefacto local, 375/1440 px. HTTP HTML inicial parseado con DOMParser sin ejecutar su JavaScript para siete variantes de URL (raíz y soluciones con/sin barra), valores únicos de metadatos, marcadores/campos estáticos Netlify y entrada React presentes. React y navegación cliente sin recarga actualizan todos los metadatos; ancla corporativa mantiene canonical sin fragmento.

- Imagen servida por HTTP 200 como PNG, 1448x1086; sitemap XML válido, cuatro canonical exactos, robots correcto; sin excepciones ni console.error. No se envían formularios y se bloquean conexiones externas. Esto no acredita recepción Netlify ni disponibilidad actual del recurso en producción antes de publicar.

## Incidencias del entorno de prueba

La primera prueba con vite preview falló para /iot-industrial sin barra: ese servidor entrega fallback de Inicio en /ruta, aunque sirve correctamente /ruta/ y /ruta/index.html. Se conserva vite-preview-first-attempt.json y browser-failure.json; no se modifica el sitio para adaptar su diseño al preview.

Se empleó static-server.cjs como herramienta de evidencia: resuelve archivos/directorios existentes antes del fallback y rechaza POST; sirve únicamente el artefacto temporal. Un intento en 5184 encontró EADDRINUSE porque el preview seguía ocupando el puerto; la prueba definitiva usa 127.0.0.1:5185. Este servidor no es un emulador ni una comprobación de configuración del CDN Netlify.

Persisten avisos previos de datos Browserslist/baseline-browser-mapping; no se actualizan paquetes. El whitespace anterior de main.jsx:45 queda fuera de alcance.

## Comandos ejecutados

~~~powershell

node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-013/build-temporal/comercial/dist

node scripts/generar-seo.mjs --outDir docs/evidencias/PYP-013/build-temporal/comercial/dist

node docs/evidencias/PYP-013/generator-check.mjs

node docs/evidencias/PYP-013/static-server.cjs

node docs/evidencias/PYP-013/browser-check.cjs

node docs/evidencias/PYP-013/build-docs.mjs

~~~

VitePress se compila mediante API con outDir, tempDir, cacheDir y vite.cacheDir aislados en build-temporal; resultado efectivo al cierre. Se preservan las salidas documentales anteriores y dist comercial. No se ejecuta npm run build sobre dist existente.

## Archivos afectados

Modificados: index.html, src/components/Seo.jsx, scripts/generar-seo.mjs, public/sitemap.xml, docs/BITACORA_DESARROLLO.md, docs/prompts/index.md y docs/arquitectura/index.md. Nuevos: src/data/seo.js, public/og-pyp.png, docs/prompts/PYP-013.md y evidencias PYP-013 (estado inicial, copias previas, metadatos, pruebas, resultados y build documental aislado). package.json/lock, robots, _redirects, main, Navbar, SectionNav, helper, páginas, formulario e imágenes originales permanecen intactos.

## Pendientes y riesgos

Con autorización posterior, verificar configuración de Netlify (npm run build, publish dist, Node), cuatro respuestas HTML iniciales y canonical desde el CDN con/sin barra, recursos OG/Content-Type/cachés, detección y recepción Forms; usar herramientas sociales para comprobar recorte/visualización. No se realizó despliegue ni tráfico de prueba contra producción.

No se incorpora contenido visual prerenderizado ni se promete indexación; el contenido principal aún depende de React. El logo social conserva dimensiones y peso originales; una futura tarjeta optimizada requiere alcance independiente. Revisar dependencias, favicon y adjuntos documentales antiguos según PYP-009. Los manifiestos de commit previos son históricos y no incluyen automáticamente las nuevas fuentes SEO.

Sin instalación, staging, commit, push, reset, clean ni despliegue. Validación final de integridad, whitespace y Git al cierre y en validacion-final.json.

### Cierre PYP-013

73 comprobaciones pasadas: 14 del generador y 59 de HTML inicial/React/navegación/imagen/sitemap/robots. Compilación comercial Vite 1601 módulos, 15.77 s, salida 0; postproceso cuatro rutas, salida 0; VitePress temporal con caché/SSR aislados, salida 0 en 24.46 s. No se repitió la compilación documental tras añadir este cierre textual. Los fallos iniciales de preview y el conflicto de puerto están registrados; la validación definitiva usa el servidor de archivos en 5185 y no acredita el CDN de Netlify.

Integridad: 862 archivos anteriores comparados por hash, sin eliminaciones ni cambios fuera de index.html, Seo.jsx, generador, sitemap y tres documentos autorizados. Se excluyen .git, node_modules, browser-profile y cache. Los 17 archivos de dist y 670 generados anteriores inventariados conservan sus hashes. Componentes visuales, navegación, formulario (body), robots, _redirects, rutas y dependencias intactos. Índice Git idéntico. Los procesos de navegador y servidores locales de esta intervención quedaron cerrados.

Whitespace de archivos afectados/nuevos correcto y enlaces Markdown locales comprobados sin destinos faltantes. El chequeo global conserva el espacio final previo en main.jsx:45 (salida 2) y avisos LF/CRLF. Estado Git final: main, 12 archivos seguidos modificados (diez previos y dos nuevos cambios en sitemap/generador), 161 sin seguimiento al incluir validacion-final.json. No se ejecutó staging, commit, push, reset, clean ni despliegue. Publicación y validación Netlify reales pendientes de autorización. Resultados completos en validacion-final.json, generator-results.json y browser-results.json.
