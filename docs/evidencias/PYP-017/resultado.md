# PYP-017 — Actualización controlada de Vite

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-017.md). Rama main. Actualización limitada al Vite directo, sin publicación.

## A. Auditoría y versiones verificadas

AGENTS, PYP-015 y PYP-016 revisados; package/lock, árbol npm, Node y requisitos inspeccionados. Estado inicial: doce archivos seguidos modificados previos y nuevas fuentes/documentación, conservados en estado-inicial.json. Copias exactas package.json.before.json y package-lock.json.before.json tomadas antes de resolver la actualización; versiones físicas previas en instaladas-inicial.json.

| Componente | Antes | Después |
| --- | --- | --- |
| Node | 22.15.1 | 22.15.1 |
| npm | 10.9.2 | 10.9.2 |
| Vite directo | 6.4.1, declarado ^6.0.0 | 6.4.4, declarado exacto |
| Vite de VitePress | 5.4.21 | 5.4.21 |
| VitePress | 1.6.4 | 1.6.4 |
| React Router DOM/Router | 7.18.4 | 7.18.4 |
| React/ReactDOM | 18.3.1 | 18.3.1 |
| Tailwind | 3.4.18 | 3.4.18 |

Se confirmó npm view vite@6.4.4: versión publicada, engines ^18.0.0 || ^20.0.0 || >=22.0.0, dependencias y peers. Node local y peers Vite de @vitejs/plugin-react 5.0.4 y @vitejs/plugin-vue 5.2.4 compatibles. Compatibilidad comprobada antes de instalar en compatibilidad-objetivo.json; metadatos actuales en vite-objetivo.json.

## B. Correcciones de seguridad objetivo

Los cuatro avisos propios de Vite detectados en la auditoría inicial son GHSA-4w7w-66w2-5vf9 (<=6.4.1), GHSA-p9ff-h696-f583 (>=6.0.0 <=6.4.1), GHSA-v6wh-96g9-6wx3 (<=6.4.2) y GHSA-fx2h-pf6j-xcff (<=6.4.2). 6.4.4 está fuera de los cuatro rangos; no se confunde ese resultado con corregir todas las transitivas o VitePress.

La [fuente oficial sobre Windows fs.deny](https://github.com/vitejs/vite/security/advisories/GHSA-fx2h-pf6j-xcff) identifica parche 6.4.3 y describe exposición bajo ciertas condiciones de servidor de desarrollo/Windows. El [aviso WebSocket](https://github.com/vitejs/vite/security/advisories/GHSA-p9ff-h696-f583) también se consultó. No se hicieron pruebas de explotación ni se leyeron archivos sensibles. El audit posterior verifica que el Vite directo ya no figura entre las ubicaciones afectadas.

## C. Cambio mínimo aplicado

Se resolvió primero --package-lock-only y se revisó el diff antes de instalar. Solo cambian la entrada raíz del lock y node_modules/vite. El resto de entradas conserva contenido/versión. package.json únicamente cambia devDependencies.vite a 6.4.4 exacto; no se actualizan React, Router, Tailwind, VitePress ni independientes. No fueron necesarias actualizaciones transitivas.

~~~powershell
npm install vite@6.4.4 --save-dev --save-exact --package-lock-only --ignore-scripts --no-audit --no-fund
npm install --ignore-scripts --no-audit --no-fund
~~~

La instalación reportó un paquete cambiado; el lock final coincide con lock-revisado.json. Versiones físicas previas comparadas: solo node_modules/vite 6.4.1 ->6.4.4. Se conservan Vite 5 anidado, todos los peers y las versiones declaradas ajenas. No se ejecutó audit fix ni se forzó un override. No se modificó código comercial ni configuración para compatibilidad.

## D. Compilación y regresiones

Build comercial Vite 6.4.4 temporal: salida 0, 1609 módulos, 17.06 s. Generador existente con --outDir temporal: salida 0, cuatro HTML. Archivo JS index-BOudA17U.js (292.53 kB/gzip 84.17 kB) y CSS index-hrzmi9gy.css (23.72 kB/gzip 5.21 kB) mantienen nombres y tamaños de PYP-016.

Comparación por hash de ambos artefactos comerciales completos: 20 archivos; 0 diferencias. Detalle en comparacion-artefactos.json. Esta comparación se hace entre salidas temporales: dist del proyecto permanece protegido.

| Prueba Edge 375/1440 | PYP-016 | PYP-017 |
| --- | ---: | ---: |
| Navegación y enlaces externos | 183 | 183 |
| Formulario | 34 | 34 |
| SEO | 59 | 59 |
| Logo/layout estable | 16 | 16 |
| Total | 292 | 292 |

Navegación: cuatro rutas, soluciones desplegable con clic/teclado, estado activo, variantes con/sin barra, SectionNav/anclas, hashes inválidos incluido /#%, historial, movimiento reducido, enlaces externos por atributos. Sin excepciones ni console.error. SEO: siete URL de HTML inicial, metadatos React/canonical/OG, sitemap XML, robots e imagen. Formulario: campos, required, codificación, definición estática y POST nativo; dos POST interceptados con respuestas 200/500 sintéticas, sin envío real. Logo: decode/fonts antes de validar visibilidad/layout en ocho combinaciones.

Scripts y resultados de PYP-016 reutilizados como referencia sin alterar los originales; copias locales adaptan puertos y perfiles. browser-results.json, form-results.json, seo-results.json y visual-results.json registran el resultado actual. No se afirma recepción real, validación CDN ni certificación de accesibilidad.

Además se midió vite preview 6.4.4 en siete URL (vite-preview-rutas.json): todas HTTP 200; las soluciones sin barra siguen recibiendo el head raíz y con barra el propio, como la diferencia documentada en PYP-014. No es una regresión nueva; preview no se equipara al CDN. El servidor de archivos del artefacto entrega los heads correctos en las siete variantes. No se cambian reglas para adaptar el sitio a preview.

VitePress se compila con salida/caché/SSR aislados en build-temporal; su resultado efectivo se añade al cierre. Avisos previos de Browserslist/baseline-browser-mapping continúan porque no se actualizan esas dependencias.

## E. Vulnerabilidades antes y después

| Auditoría | PYP-016 / inicio PYP-017 | Después |
| --- | --- | --- |
| Total | 17 | 17 |
| Altas / moderadas / bajas | 12 / 4 / 1 | 12 / 4 / 1 |
| Producción | 0 | 0 |
| Vite directo en nodes afectados | Sí | No |
| Vite anidado de VitePress afectado | Sí | Sí |
| npm audit salida | 1 | 1 por residuales de desarrollo |
| npm audit --omit=dev salida | 0 en PYP-016 | 0 |

El contador no disminuye porque npm agrupa por nombre de paquete y mantiene la entrada Vite por la copia 5.4.21. Antes nodes incluía node_modules/vite y node_modules/vitepress/node_modules/vite; después solo esta última e isDirect pasa a false. No se afirma que VitePress/esbuild/otras alertas desaparezcan. Comparación exacta en comparacion-seguridad.json; no hay paquetes vulnerables ni avisos nuevos. El aviso WebSocket exclusivo de Vite 6 ya no aparece en el audit posterior.

Se ejecutaron audit completo y producción en texto y JSON, npm ls vite y árbol completo. ls devuelve 0 y muestra los plugins deduplicados al Vite 6.4.4 raíz y VitePress conservando 5.4.21. npm-audit*.json/.txt y *-command.json conservan salidas/códigos. Los resultados corresponden al registro consultado hoy; no garantizan ausencia de avisos futuros.

## F. Archivos y riesgos pendientes

Modificados: package.json/lock y documentación (bitácora, índice de prompts, arquitectura). Nuevos: docs/prompts/PYP-017.md y evidencias PYP-017 (estado/copias previas, metadatos/compatibilidad, resolución limitada, audit/ls, comparaciones, scripts/resultados, capturas, informe y validación final). Ningún componente, ruta, SEO, formulario, sitemap, imagen o regla comercial se modifica.

Pendientes: sublotes transitivos de PYP-015 (Babel, Browserslist, Rollup/globs), migración Tailwind evaluada aparte y solución estable de VitePress/Vite 5/esbuild. No actualizar estas cadenas dentro de este parche. Mantener servicios locales en loopback sin presentar esa medida como parche. Continúan las validaciones Netlify CDN/Pretty URLs/cachés/detección y recepción Forms con autorización, así como otros motores/dispositivos y lector de pantalla. Whitespace main.jsx:45 previo queda intacto.

## G. Comandos y cierre

~~~powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-017/build-temporal/comercial/dist
node scripts/generar-seo.mjs --outDir docs/evidencias/PYP-017/build-temporal/comercial/dist
node docs/evidencias/PYP-017/static-server.cjs
node docs/evidencias/PYP-017/navigation-check.cjs
node docs/evidencias/PYP-017/form-check.cjs
node docs/evidencias/PYP-017/seo-check.cjs
node docs/evidencias/PYP-017/visual-check.cjs
node docs/evidencias/PYP-017/preview-check.mjs
node docs/evidencias/PYP-017/build-docs.mjs
npm audit
npm audit --omit=dev
npm ls vite
~~~

Estado Git final, los 17 hashes de dist y la integridad se registran al cierre. No se ejecutó git add, commit, push, reset, clean ni despliegue; no se enviaron formularios reales.


## Cierre de validación — 2026-10-17

- Compilación comercial: exit 0, Vite 6.4.4, 1609 módulos, 17,06 s; generación SEO exit 0. Los 20 archivos del artefacto son idénticos por SHA-256 a PYP-016.
- VitePress: exit 0, 26,41 s, salida temporal independiente. Advertencias sobre baseline-browser-mapping y caniuse-lite antiguos; sin actualizar paquetes ajenos.
- Regresión: 292 comprobaciones aprobadas (183 navegación, 34 formulario interceptado localmente, 59 SEO, 16 logo/layout en escritorio y móvil). Preview: siete HTTP 200; persiste la diferencia conocida de metadatos sin barra final en preview, sin equivaler a Netlify CDN.
- Seguridad: audit completo 17 entradas (12 altas, 4 moderadas, 1 baja); producción 0. Vite directo ya no aparece como nodo vulnerable; permanece Vite 5.4.21 de VitePress. Sin alertas nuevas.
- Integridad: 1775 archivos previos comprobados; sin pérdidas ni cambios fuera de los cinco archivos existentes autorizados. Los 17 archivos de dist y los 1457 archivos generados previos conservan sus hashes. Índice Git intacto.
- Whitespace: comprobación acotada exit 0. La comprobación global conserva el problema previo src/main.jsx:45 (exit 2); avisos LF/CRLF sin corrección ajena.
- Git: rama main; 12 archivos versionados modificados acumulados y 320 archivos sin seguimiento tras guardar validacion-final.json. package.json/lock ya estaban modificados antes. No se ejecutaron operaciones de staging, commit, push ni publicación.
- Evidencia de cierre: docs/evidencias/PYP-017/validacion-final.json. Netlify CDN y recepción real de Forms siguen pendientes; no se enviaron mensajes reales. La documentación compiló antes de añadir este cierre administrativo.
