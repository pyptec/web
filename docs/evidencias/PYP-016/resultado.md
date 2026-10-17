# PYP-016 — Actualización controlada de React Router

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-016.md). Rama main. Actualización autorizada, sin commit ni publicación.

## Preparación y compatibilidad

Se leyeron AGENTS, resultado PYP-015 y bitácora. Antes de instalar se registraron estado/hashes, las versiones físicas y copias exactas de package.json y package-lock.json, preservando todos los cambios previos. Había doce archivos seguidos modificados y documentación/fuentes nuevas sin seguimiento.

Node instalado 22.15.1, npm 10.9.2; React y ReactDOM 18.3.1. Las consultas actuales npm view confirmaron que Router DOM y Router 7.18.4 existen, requieren Node >=20 y React/ReactDOM >=18. El entorno cumple. PYP-015 documentó los avisos corregidos desde 7.18.0; además, tras instalar se ejecutó audit para verificar el resultado real, sin inferirlo solo de la versión.

## Versiones iniciales y finales

| Paquete | Antes | Después | Motivo |
| --- | --- | --- | --- |
| react-router-dom | 6.30.6, declarado ^6.30.6 | 7.18.4, declarado exacto | Actualización autorizada y reproducible |
| react-router | 6.30.6 transitivo | 7.18.4 transitivo exacto | Dependencia de Router DOM |
| @remix-run/router | 1.23.4 | Retirado del árbol | Router 7 no lo necesita |
| cookie | No instalado | 1.1.1 | Dependencia ^1.0.1 de Router 7 |
| set-cookie-parser | No instalado | 2.7.2 | Dependencia ^2.6.0 de Router 7 |

Vite 6.4.1, Vite 5.4.21 anidado, Tailwind 3.4.18, VitePress 1.6.4, React/DOM 18.3.1 y las demás versiones/declaraciones se conservan. No se añadió react-router como dependencia directa; npm ls confirma una sola pareja 7.18.4 coherente.

## Instalación acotada y ajustes

Primero se ejecutó una resolución package-lock-only sin scripts/audit, se revisaron las seis entradas modificadas (raíz y cinco ubicaciones de paquetes) y se comprobó que no había cambios ajenos. Después se instaló ese lock: dos paquetes añadidos, uno retirado, dos cambiados. El lock instalado coincide byte a byte con el revisado. Evidencia completa en resolucion-limitada.json y comparacion-dependencias.json.

~~~powershell
npm install react-router-dom@7.18.4 --save-exact --package-lock-only --ignore-scripts --no-audit --no-fund
npm install --ignore-scripts --no-audit --no-fund
npm ls react-router react-router-dom
~~~

No se ejecutó audit fix ni se actualizaron deliberadamente otros paquetes. Se omitieron scripts de instalación para reducir acciones innecesarias; las dos nuevas transitivas son bibliotecas JavaScript sin necesidad de compilación nativa para esta instalación. Los builds posteriores verifican el árbol resultante.

No fue necesario adaptar código: se mantienen BrowserRouter, Routes/Route, useLocation/useNavigate y las importaciones de react-router-dom. No se añaden future flags ni se migra a Framework/Data Mode. main, Navbar, SectionNav, helper, páginas, contenido, imágenes, formulario y fuentes SEO permanecen intactos.

## Regresión frente a PYP-015

Referencia anterior: 177 controles navegación +34 formulario +59 SEO =270, todos pasados. Después: mismos 270 más seis comprobaciones de enlaces externos (destino Plataforma, target/rel y mail/teléfono en 375/1440): total 276 pasados.

- Navegación: 183 controles en Edge headless a 375/1440 px. Cuatro rutas, menú con clic/Enter/ArrowDown/Tab/Escape, resaltado con/sin barra final, SectionNav y anclas reales, hashes vacíos/válidos/inexistentes/malformados incluido /#%, historial atrás/adelante, foco/offset y movimiento reducido/normal. Sin excepciones ni console.error. Enlaces externos comprobados por atributos sin abrir Plataforma, correo o teléfono.

- Formulario: 34 controles pasados. Campos, required, correo inválido, etiquetas/teclado, codificación y POST nativo correctos. Dos solicitudes interceptadas antes de red y respuestas 200/500 sintéticas; no se enviaron formularios a Netlify.

- SEO: 59 controles pasados. Siete variantes URL en HTML inicial sin ejecutar el HTML recibido, cuatro metadatos React, navegación cliente, canonical/OG/imagen, sitemap XML y robots. Declaración estática contacto-pyp y sus siete campos detectables conservados. No se acredita detección o recepción real en Netlify.

Resultados separados: browser-results.json (navegación), form-results.json y seo-results.json. Scripts copiados de la referencia a PYP-016 con puertos/perfiles locales adaptados; originales intactos. Las seis pruebas adicionales verifican enlaces externos sin contacto de red. No se afirma certificación WCAG ni recepción real.

Compilación comercial Vite 6.4.1 temporal: salida 0, 1609 módulos, 15.17 s. Generador SEO original: salida 0 y cuatro HTML correctos. CSS resultante conserva nombre/hash index-hrzmi9gy.css; JS pasó de 273.03 kB (gzip 77.48 kB) en PYP-015 a 292.53 kB (gzip 84.17 kB), aumento esperado medido de 19.50 kB / 6.69 kB por el cambio de librería. No se altera dist para validar.

VitePress se ejecuta con salida, cache e intermediarios SSR aislados; resultado efectivo al cierre. Avisos previos de baseline-browser-mapping/Browserslist continúan porque no se actualizan esas herramientas.

## Seguridad antes y después

| Audit | PYP-015 | PYP-016 |
| --- | --- | --- |
| Completo | 19: 12 altas, 6 moderadas, 1 baja | 17: 12 altas, 4 moderadas, 1 baja |
| Solo producción | 2 moderadas | 0 vulnerabilidades |
| npm audit salida | 1 | 1 por alertas de desarrollo |
| npm audit --omit=dev salida | 1 | 0 |
| npm ls Router | 6.30.6 | 7.18.4; salida 0 |

Se ejecutaron npm audit y npm audit --omit=dev tanto en formato legible como JSON, además de npm ls Router y árbol completo. Desaparecen las entradas react-router y react-router-dom; no aparecen paquetes vulnerables ni URL de avisos nuevos respecto a PYP-015. Las 17 entradas restantes pertenecen al tooling ya diagnosticado; no se afirma audit completo limpio ni se atribuye explotación a producción por alertas de desarrollo.

Resultados actuales y códigos en npm-audit*.json/.txt y *-command.json; comparación en comparacion-seguridad.json. Estos resultados corresponden al registro consultado el 2026-10-17 y al árbol instalado, no garantizan ausencia de futuros avisos.

## Comandos de regresión

~~~powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-016/build-temporal/comercial/dist
node scripts/generar-seo.mjs --outDir docs/evidencias/PYP-016/build-temporal/comercial/dist
node docs/evidencias/PYP-016/static-server.cjs
node docs/evidencias/PYP-016/navigation-check.cjs
node docs/evidencias/PYP-016/form-check.cjs
node docs/evidencias/PYP-016/seo-check.cjs
node docs/evidencias/PYP-016/build-docs.mjs
npm audit
npm audit --omit=dev
npm ls react-router react-router-dom
~~~

## Archivos y pendientes

Modificados por esta intervención: package.json y package-lock.json; docs/BITACORA_DESARROLLO.md, docs/prompts/index.md y docs/arquitectura/index.md. Nuevos: docs/prompts/PYP-016.md y evidencias PYP-016 (estado/copias previas, resolución/instalación/audit, pruebas/scripts, capturas, resultado e integridad). El diff contra HEAD incluye cambios anteriores; para atribución de esta intervención se compara con las copias before, no se descartan los cambios previos.

Pendientes: tratamiento separado de vulnerabilidades de desarrollo según PYP-015, validación de CDN/Pretty URLs/configuración y recepción Forms en Netlify con autorización, pruebas físicas/otros navegadores/lector de pantalla. El servidor local es un modelo de entrega de archivos antes del fallback; no representa CDN Netlify. main.jsx:45 conserva su whitespace anterior. No se requieren cambios extensos ni rediseño.

Estado final, preservación y whitespace en validacion-final.json y cierre de bitácora. Sin git add, commit, push, reset, clean, envío real ni despliegue.

### Cierre PYP-016

React Router DOM/Router instalados en 7.18.4, Node 22.15.1 y React/DOM 18.3.1 compatibles. Única declaración cambiada: Router DOM exacto; otras entradas de package intactas. Lock limitado a raíz, dos Router actualizados, @remix-run/router retirado y cookie/set-cookie-parser añadidos. El lock coincide con el revisado antes de instalar; todas las versiones físicas previas ajenas a Router permanecen iguales. No se modificó ningún componente ni fue necesario adaptar código.

292 comprobaciones pasadas: 183 navegación/enlaces externos, 34 formulario y 59 SEO (276 regresiones), más 16 de carga efectiva de logo/layout en cuatro páginas a 375/1440. Una captura temprana de Monitoreo se tomó antes de cargar la imagen; se conserva y se añadieron cuatro capturas estable-*.png esperando decode/fonts sin alterar la web. Se inspeccionaron Inicio móvil y Monitoreo desktop con logo cargado; visual-results.json confirma logo y layout en las ocho combinaciones. Sin excepciones ni console.error; sin envíos reales. Recepción/CDN/antispam Netlify siguen pendientes.

Build comercial temporal: Vite 1609 módulos, 15.17 s, salida 0; generador cuatro HTML, salida 0; VitePress aislado, salida 0 en 24.94 s. No se repite la compilación documental tras añadir este cierre textual. Servidor local y navegadores cerrados. Audit producción: dos moderadas -> cero y salida 0. Audit completo: 19 ->17, doce altas/cuatro moderadas/una baja de desarrollo, salida 1. Sin paquetes ni avisos nuevos; npm ls Router y árbol completo salidas 0. Riesgos de tooling permanecen para otra intervención.

Integridad: 1.529 archivos previos inventariados, ninguna eliminación ni cambio fuera de package/lock y tres documentos autorizados. Se excluyen .git, node_modules, browser-profile y cache del inventario; las versiones físicas previas se compararon por separado. Los 17 archivos de dist y 1.253 generados previos conservan hashes; fuentes, formulario, SEO, sitemap, navegación e imágenes originales intactos. Índice Git idéntico.

Whitespace de rutas afectadas/nuevas correcto; enlaces Markdown locales válidos. Global diff --check conserva el espacio previo main.jsx:45 (salida 2) y avisos LF/CRLF. Git final: main, doce archivos seguidos modificados acumulados (incluidos package/lock ya modificados antes) y 268 sin seguimiento al incluir validacion-final.json. Se conservaron los cambios preexistentes. Sin audit fix, git add, commit, push, reset, clean ni despliegue. Evidencia completa en validacion-final.json.
