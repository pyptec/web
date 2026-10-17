# PYP-014 — Verificación de entrega SEO y compatibilidad Netlify

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-014.md). Rama main. Alcance final: auditoría, pruebas y documentación; sin cambios funcionales.

## Diagnóstico y decisión

Se leyeron AGENTS.md, resultado PYP-013 y bitácora; se inspeccionaron mapa SEO, Seo.jsx, generador, index, main, package y _redirects. No existe netlify.toml local ni se verificó el panel de Netlify. Estado inicial: doce archivos seguidos modificados y fuentes/documentación previas sin seguimiento, conservados en estado-inicial.json junto con hashes.

La diferencia de preview es reproducible, pero no demuestra un defecto del artefacto ni del CDN de Netlify. El generador entrega las cuatro definiciones correctas y React Router funciona en las siete variantes. No hay evidencia que justifique modificar el generador, la estructura de salida, reglas, canonical, dependencias ni componentes. No se aplican cambios funcionales.

## Resultados por URL

| URL | HTTP dev / preview / artefacto | Head inicial desarrollo | Head inicial preview | Head inicial artefacto local | React en los tres |
| --- | --- | --- | --- | --- | --- |
| / | 200 / 200 / 200 | Propio | Propio | Propio | Correcto, sin blanco |
| /monitoreo-energetico | 200 / 200 / 200 | Inicio | Inicio | Propio | Correcto, sin blanco |
| /monitoreo-energetico/ | 200 / 200 / 200 | Inicio | Propio | Propio | Correcto, sin blanco |
| /iot-industrial | 200 / 200 / 200 | Inicio | Inicio | Propio | Correcto, sin blanco |
| /iot-industrial/ | 200 / 200 / 200 | Inicio | Propio | Propio | Correcto, sin blanco |
| /automatizacion-edge | 200 / 200 / 200 | Inicio | Inicio | Propio | Correcto, sin blanco |
| /automatizacion-edge/ | 200 / 200 / 200 | Inicio | Propio | Propio | Correcto, sin blanco |

Propio significa igualdad completa con src/data/seo.js: title, description, canonical, og:title, og:description, og:url, imagen/tipo/dimensiones/alt, sin duplicados. Inicio significa que ese HTML inicial contiene los metadatos de / y no los de la solución solicitada. Todos los status locales son 200, sin Location ni redirecciones; esto NO predice los códigos o cadenas de redirección del CDN.

21 respuestas HTTP HTML originales conservadas en html-inicial/desarrollo/, html-inicial/preview/ y html-inicial/artefacto/. comparacion-entornos.json contiene por dirección status, Location, Content-Type, metadatos iniciales completos, datos tras montar React, heading, ruta, estado activo y campos estáticos. No se sustituye la medición del head inicial por los metadatos que React actualiza después.

## Diferencias y causa técnica demostrada

- Desarrollo (5190): trabaja con index.html fuente y no ejecuta el postproceso del build ni consume los HTML generados. Las seis variantes interiores tienen el head de Inicio hasta que React monta la página. Es comportamiento de desarrollo, no validación de SEO de publicación.

- Vite preview 6.4.1 (5191): el middleware htmlFallbackMiddleware busca directorio/index.html cuando pathname termina en /. Sin barra busca pathname.html; como el generador produce directorios/index.html y no hermanos .html, termina en /index.html. El middleware de estáticos usa extensions: []. Fuente instalada inspeccionada, extracto/hash conservados en causa-vite-preview.json. No se parchea node_modules.

- Artefacto servido por static-server.cjs (5192): resuelve archivo o directorio/index.html antes del fallback. Las siete variantes reciben el head propio. Diez verificaciones adicionales confirman igualdad byte a byte entre cada respuesta y el HTML generado, y _redirects copiado intacto. Este servidor es un modelo explícito local, no un emulador de Netlify ni un sustituto de probar el CDN.

## Metadatos completos recibidos del artefacto

| Página | Title y og:title | Description y og:description | Canonical y og:url |
| --- | --- | --- | --- |
| / | IoT Industrial y Monitoreo Energético en Colombia \| PYP Tecnología | Soluciones IoT industriales, monitoreo energético, automatización, OEE y telemetría LoRaWAN. Hardware, gateways Edge y software desarrollado en Colombia. | https://pyptecnologia.com/ |
| /monitoreo-energetico | Monitoreo Energético Industrial y Solar \| PYP Tecnología | Soluciones IoT SAMEE100 y SAMEE200 para monitoreo energético industrial y solar. Medición eléctrica, dashboards, alarmas e indicadores ISO 50001. | https://pyptecnologia.com/monitoreo-energetico |
| /iot-industrial | IoT Industrial y LoRaWAN en Colombia \| PYP Tecnología | Soluciones IoT industrial y LoRaWAN: gateways Edge, sensores, Modbus, MQTT, telemetría, almacenamiento local e integración con AWS IoT y plataformas empresariales. | https://pyptecnologia.com/iot-industrial |
| /automatizacion-edge | Automatización Industrial y Edge Computing \| PYP Tecnología | Desarrollo electrónico, gateways industriales, control Edge, Modbus, CAN J1939, supervisión local y automatización de procesos en Colombia. | https://pyptecnologia.com/automatizacion-edge |

En las cuatro páginas: og:image=https://pyptecnologia.com/og-pyp.png, image/png, 1448x1086, alt=Logotipo PYP Tecnología Electrónica SAS. og:type=website, og:locale=es_CO y site_name existentes se conservan. Twitter Card no estaba implementada; esta auditoría no añade etiquetas. La fuente única permanece src/data/seo.js.

## Compatibilidad Netlify y límites

El generador existente se ejecuta después de Vite mediante npm run build y produce index.html, monitoreo-energetico/index.html, iot-industrial/index.html y automatizacion-edge/index.html. Assets y sus referencias absolutas se conservan. La salida comercial de Netlify debe ser dist, no docs.

La regla SPA /* /index.html 200 no fuerza shadowing. Según [Netlify: archivos existentes y fallback](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#shadowing), un archivo existente puede prevalecer sobre esa regla; añadir 200! podría eliminar esa prioridad y entregar el head raíz en todas las rutas. No se añade ni cambia ninguna regla.

Según [Netlify: trailing slash y Pretty URLs](https://docs.netlify.com/manage/routing/redirects/redirect-options/#trailing-slash), las reglas se comparan tras normalización y Pretty URLs puede llevar /ruta a /ruta/. No se debe inferir su cadena HTTP a partir de preview ni crear reglas contrapuestas para agregar/quitar barras. La configuración efectiva, caché y respuesta final de este proyecto no están verificadas en CDN. Los canonical existentes permanecen sin barra en soluciones y con / en Inicio.

Conclusión limitada: la estructura de salida y regla no forzada son coherentes con la documentación de Netlify; no se demostró un defecto de publicación que requiera corrección. Compatibilidad razonada no equivale a un despliegue probado. No se contactó producción ni se utilizó Netlify CLI/panel para procesar este artefacto.

## Netlify Forms, sitemap y robots

En las 21 respuestas existe la declaración estática oculta contacto-pyp: POST, data-netlify=true, netlify-honeypot=bot-field y form-name/nombre/correo/empresa/solucion/mensaje/bot-field. No se modifica el body, el formulario React ni el HTML fuente. Según [Netlify: formularios JavaScript](https://docs.netlify.com/manage/forms/setup/#work-with-javascript-rendered-forms), la declaración estática es necesaria para detección; detección real, filtrado y recepción siguen pendientes. Todos los POST y las conexiones externas del navegador se bloquean.

Sitemap XML parseado sin errores en los tres entornos, namespace correcto, cuatro canonical exactos y sin lastmod inventado. robots.txt conserva Allow: / y referencia absoluta al sitemap. Imagen OG disponible como PNG HTTP 200 en los tres entornos. Ninguno de estos resultados locales acredita disponibilidad actual en producción.

## Pruebas y comandos

Compilación comercial temporal Vite 6.4.1: salida 0, 1601 módulos, 15.79 s. Generación SEO completa: salida 0, cuatro archivos. Browser-check: 148 comprobaciones sobre HTTP inicial/React/rutas/estado activo/navegación cliente/sitemap/robots/imagen; ninguna excepción ni console.error. Diez controles de correspondencia con los archivos generados: todos pasados. Las diferencias esperadas en desarrollo/preview se registran como hallazgos, no se ocultan bajo el conteo de pruebas pasadas.

~~~powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-014/build-temporal/comercial/dist
node scripts/generar-seo.mjs --outDir docs/evidencias/PYP-014/build-temporal/comercial/dist
node docs/evidencias/PYP-014/serve-environments.mjs
node docs/evidencias/PYP-014/browser-check.cjs
node docs/evidencias/PYP-014/build-docs.mjs
~~~

Desarrollo usa caché Vite nueva dentro de build-temporal. VitePress también aísla salida, caché e intermediarios SSR; su resultado se registra al terminar. No se modifica dist ni se compilan sobre salidas anteriores. Los HTML recibidos son evidencia oficial conservable, no bundles temporales.

Incidencia de la herramienta: primer intento bloqueado por SyntaxError de un paréntesis sobrante; no ejecutó pruebas ni mostró un defecto de la aplicación. Se corrigió solo browser-check.cjs y se verificó con node --check. Registro en incidencias-prueba.md. Persisten avisos previos de Browserslist/baseline-browser-mapping y whitespace de main.jsx:45, sin cambios.

## Archivos y pendientes

Modificados: docs/BITACORA_DESARROLLO.md, docs/prompts/index.md y docs/arquitectura/index.md. Nuevos: docs/prompts/PYP-014.md y docs/evidencias/PYP-014/ (estado inicial, extracto de Vite, scripts locales, comparación, HTML recibidos, correspondencia de artefacto, incidencias, resultado y validación). Ningún archivo funcional, dependencia, regla o contenido comercial se cambia.

Pendiente, con autorización de un entorno Netlify: confirmar comando/publish directory y Pretty URLs, registrar cadena HTTP y HTML final de las siete URL con cliente sin JS, comparar title/description/canonical/OG con la fuente única, revisar cachés y Content-Type de imagen/sitemap/robots, confirmar form detection y autorizar separadamente recepción controlada. No se hacen envíos reales ni despliegues en esta intervención. Pruebas en otros motores/dispositivos físicos no se ejecutaron.

Estado Git final, integridad y whitespace se registran al cierre en validacion-final.json. No se ejecuta add, commit, push, reset, clean ni publicación.

### Cierre PYP-014

158 comprobaciones pasadas: 148 de comparación entre entornos y diez de correspondencia con artefactos. Las diferencias de head inicial se mantienen explícitas: 21 HTTP 200 y React correcto en las 21 respuestas; 12/21 heads iniciales propios de la URL solicitada (1 desarrollo, 4 preview, 7 modelo de artefacto), nueve heads de Inicio en variantes interiores de desarrollo/preview. No hay páginas en blanco ni errores de consola. Los siete HTML del modelo de artefacto coinciden byte a byte con los cuatro archivos generados. Los 21 HTML originales están conservados como evidencia.

Vite comercial temporal: salida 0, 1601 módulos, 15.79 s; generador cuatro HTML, salida 0; VitePress aislado, salida 0 en 24.23 s. No se repitió el build documental tras añadir este cierre textual. Ningún cambio funcional: no se modifican generador, fuente SEO, componentes, formulario, canonical, sitemap, robots, reglas ni dependencias. Netlify CDN/panel/Pretty URLs/detección y recepción siguen sin verificar; no se publicó ni se envió ningún formulario.

Integridad: 1.060 archivos existentes inventariados, sin eliminaciones ni cambios fuera de bitácora, índice y arquitectura autorizados. Se excluyen .git, node_modules, browser-profile y cache del inventario. Los 17 archivos de dist y 849 generados previos conservan sus hashes; índice Git idéntico. Whitespace de rutas afectadas y archivos nuevos correcto; enlaces Markdown locales válidos. Global diff --check conserva el espacio final previo en main.jsx:45 (salida 2) y avisos LF/CRLF, sin corregirlos.

Git final: main, doce archivos seguidos modificados preexistentes y 195 sin seguimiento al incluir validacion-final.json. Los cambios de esta intervención son exclusivamente documentales y herramientas/evidencias de verificación. Navegador y tres servidores locales cerrados. Sin staging, commit, push, reset, clean ni despliegue. Validación completa en validacion-final.json.
