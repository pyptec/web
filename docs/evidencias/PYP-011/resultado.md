# PYP-011 — Corrección y validación del formulario Netlify

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-011.md).

## Diagnóstico inicial

AGENTS.md e informes PYP-009/PYP-010 leídos. Rama main; nueve archivos seguidos modificados y documentación/fuentes nuevas sin seguimiento antes de empezar. Estado completo y hashes: estado-inicial.json. La plantilla estática está en index.html, fuera de #root; React se encuentra en src/App.jsx. No existe netlify.toml. public/_redirects mantiene el fallback SPA /* /index.html 200. No se alteran estos archivos ni configuraciones del panel.

La plantilla declaraba nombre, correo y mensaje, más form-name; omitía empresa, solucion y bot-field. Ambas representaciones ya tenían name="contacto-pyp", method="POST", data-netlify="true" y netlify-honeypot="bot-field". React contiene el honeypot en un párrafo display:none y usa POST nativo a la URL actual: no tiene onSubmit, fetch, mensajes propios ni ruta de éxito personalizada.

## Corrección mínima

Solo se añadieron tres controles a la plantilla oculta: input empresa, select solucion y input bot-field. No es necesario replicar opciones comerciales en el select oculto: la declaración sirve para registrar el nombre del campo; las opciones y valores reales se conservan en React. No se cambia App.jsx, textos, estilo, imágenes, SEO, rutas, navegación, dependencias ni restricciones required.

| Campo | Plantilla después | React | Obligatorio en interfaz |

| --- | --- | --- | --- |

| form-name | hidden, contacto-pyp | hidden, contacto-pyp | Identificador |

| nombre | input text | input text | Sí |

| correo | input email | input email | Sí |

| empresa | input text | input text | No |

| solucion | select | select | No |

| mensaje | textarea | textarea | Sí |

| bot-field | input text, formulario oculto | input text, párrafo oculto | No; debe quedar vacío |

Se conserva contacto-pyp como nombre exacto y POST application/x-www-form-urlencoded nativo. Los siete nombres coinciden; no se traducen ni renombran.

## Detección y antispam

El HTML compilado conserva una definición estática oculta con data-netlify, name, método, honeypot y todos los campos. Cumple el contrato estático documentado para formularios renderizados con JavaScript. Esto NO demuestra que Netlify lo haya detectado en su infraestructura: exige form detection habilitado y un despliegue autorizado.

Fuentes consultadas: [configuración oficial Netlify](https://docs.netlify.com/manage/forms/setup/#work-with-javascript-rendered-forms) y [honeypot](https://docs.netlify.com/manage/forms/spam-filters/#honeypot-field). El honeypot se conserva; su filtrado real no se acredita con pruebas locales.

## Pruebas ejecutadas

1. Vite 6.4.1, compilación temporal: salida 0, 1600 módulos, 13.19 s. Salida nueva docs/evidencias/PYP-011/build-temporal/comercial/dist. Avisos previos: datos antiguos de baseline-browser-mapping/Browserslist; no se actualizan dependencias.

2. Generador scripts/generar-seo.mjs original ejecutado desde el cwd comercial temporal: salida 0; genera Monitoreo únicamente en esa salida aislada. Ambas etapas del build comercial probadas sin ejecutar npm run build sobre dist del proyecto.

3. Edge headless sobre el artefacto compilado local: 34 comprobaciones pasadas en 375 y 1440 px. HTML inicial parseado con DOMParser sin depender del montaje React; se compara con los controles montados. Esquema, nombre, método, honeypot y form-name coincidentes.

4. Formulario vacío bloqueado; foco en nombre; correo inválido bloqueado; mensaje vacío bloqueado. Etiquetas asociadas, honeypot oculto, navegación Tab entre campos y selección con teclado comprobadas. No hay desbordamiento horizontal global ni formulario visible duplicado. Prueba básica, no auditoría WCAG ni de lector de pantalla.

5. Dos solicitudes POST nativas interceptadas ANTES de salir del navegador y respondidas sintéticamente con CDP (200 móvil, 500 escritorio). Verificados destino local, método, Content-Type y los siete campos, incluyendo empresa/solucion y bot-field vacío. Tildes, Ñ, &, +, = y / conservados al decodificar. Se utiliza prueba@example.invalid; ningún dato real de clientes.

6. Se conserva la navegación nativa a la respuesta del servidor en ambos estados simulados. La aplicación no anuncia éxito anticipadamente ni tiene mensajes propios de éxito/error que adaptar. La página de respuesta efectiva y los errores de Netlify siguen pendientes: la simulación no acredita recepción ni notificaciones.

7. Capturas contacto-375.png y contacto-1440.png generadas e inspeccionadas. Evidencia técnica: browser-check.cjs y browser-results.json. Perfiles y compilaciones nuevos quedan excluidos por las reglas PYP-010.

Comandos de compilación y prueba:

~~~powershell

node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-011/build-temporal/comercial/dist

# Desde docs/evidencias/PYP-011/build-temporal/comercial:

node D:/promate/web/pyp-web/scripts/generar-seo.mjs

# Desde la raíz:

node node_modules/vite/bin/vite.js preview --outDir docs/evidencias/PYP-011/build-temporal/comercial/dist --host 127.0.0.1 --port 5181 --strictPort

node docs/evidencias/PYP-011/browser-check.cjs

~~~

## Archivos afectados y preservación

Modificado funcionalmente: index.html (solo tres líneas en plantilla oculta). Documentación: docs/BITACORA_DESARROLLO.md, docs/prompts/index.md, docs/arquitectura/index.md; nuevos docs/prompts/PYP-011.md y esta carpeta de evidencia. La copia index.html.before.txt conserva el HTML anterior. Resultado final de hashes, whitespace, enlaces y Git: validacion-final.json.

## Pendientes y riesgos

Con autorización posterior: habilitar/confirmar detección en el panel, desplegar un entorno de prueba y verificar formulario contacto-pyp y campos detectados; autorizar un envío controlado con empresa/solucion y símbolos, comprobar recepción en Forms y notificaciones; comprobar honeypot y respuestas reales de éxito/error. No se han realizado envíos a Netlify ni publicaciones.

Los defectos previos de SEO, hash inválido, barras finales, favicon, dependencias y adjuntos documentales siguen fuera del alcance. Los manifiestos de commit PYP-009/PYP-010 son históricos y no incluyen automáticamente PYP-011. Permanece el whitespace previo de src/main.jsx:45. Git advierte de futura conversión LF/CRLF en index.html; no hay sustitución de caracteres ni cambios fuera de las tres líneas.

No se ejecutó git add, rm, commit, push, reset, clean ni despliegue. Pruebas físicas en móviles, otros motores y tecnologías de asistencia pendientes.

### Cierre PYP-011

647 archivos existentes inventariados: ninguna eliminación ni cambio inesperado fuera de las cuatro rutas autorizadas (index.html y tres documentos). Se excluyen de este inventario .git, node_modules, browser-profile y cache. App.jsx permanece idéntico por hash; el HTML solo difiere en las tres líneas de campos añadidos. Los 17 archivos existentes de dist y el índice Git conservan sus hashes. HTML inicial y copia SEO de Monitoreo verificados: formulario oculto detectable, POST, nombre contacto-pyp, siete campos, honeypot y UTF-8 correctos. Detección efectiva/recepción en Netlify pendientes.

34 comprobaciones de navegador pasadas; sin envíos reales. Whitespace de rutas modificadas y archivos nuevos correcto, enlaces Markdown locales comprobados sin destinos inexistentes. El diff --check global sigue fallando únicamente por el espacio final previo de main.jsx:45; avisos LF/CRLF conservados. Git final: main, diez archivos seguidos modificados (nueve previos más index.html), 118 sin seguimiento al incluir esta evidencia. Sin staging, commit, push ni despliegue. Previsualización temporal detenida y navegador cerrado. No se compila VitePress.
