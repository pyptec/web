# PYP-018 — Preparación de commit y despliegue controlado

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-018.md). Solo auditoría, validación y documentación; sin cambios funcionales, dependencias, staging, commit, push ni despliegue.

## Estado y alcance revisado

Se leyeron AGENTS.md, bitácora y los informes PYP-009, PYP-010, PYP-013, PYP-014, PYP-016 y PYP-017. Rama main; remoto origin https://github.com/pyptec/web.git. No se hizo fetch ni se verificó sincronización con el remoto. Inicial: 12 archivos versionados modificados, 320 sin seguimiento, índice sin cambios preparados. Inventario y hashes antes de escribir: estado-inicial.json.

Cambios acumulados: Navbar corporativa y SectionNav en cuatro páginas; helper de anclas seguro y normalización de estado activo; ruta Edge y SEO previos incorporados en main/Seo; plantilla Netlify alineada; fuente SEO compartida, cuatro HTML por ruta y sitemap; documentación VitePress; React Router DOM 7.18.4 y Vite directo 6.4.4. No se atribuyen todos los cambios a Navbar. Los diffs de App/Monitoreo/IoT limitan la sustitución de encabezados/imports; el formulario fuente conserva sus nombres.

## Inventario exacto y selección

manifiesto-commit.txt es la propuesta comentada con categorías A–H, rutas exactas y exclusiones justificadas. seleccion-commit.txt contiene únicamente las rutas que se propone añadir en el futuro; no se ejecutó staging. inventario.json clasifica individualmente los 320 archivos iniciales, por directorio, extensión, finalidad y decisión. Incluye la lista de prerrequisitos ya versionados que no necesitan volver a añadirse.

Se conserva toda evidencia oficial: informes, capturas, resultados, scripts de reproducción, snapshots previos, registros de intentos fallidos y HTML capturado PYP-014. Esos HTML son evidencias de respuestas distintas entre entornos, no un build para publicar. Los scripts históricos no se consideran descartables porque fundamentan las pruebas registradas; algunos usan puertos/rutas de su intervención y no son una suite genérica.

Los registros raíz 01_ESTADO_Y_BITACORA.md y 04_BITACORA_001_RESULTADO.md son legados únicos incluidos. Los prompts raíz 02/03 son copias SHA-256 idénticas a docs/prompts/PYP-001.md y PYP-002.md: se omiten del commit, sin borrarlos ni cambiar exclusiones. No se excluyen documentación oficial ni evidencias para reducir artificialmente el número de archivos.

### Clasificación funcional

- A: App, main, Seo, Navbar, SectionNav, helper y tres páginas interiores; incluir todos los imports necesarios, incluida Edge que aún está sin seguimiento.
- B: package.json/lock y .gitignore; Vite/PostCSS/Tailwind/jsconfig ya versionados permanecen como prerrequisitos. No hay actualizaciones en esta intervención.
- C: src/data/seo.js, generador, sitemap y public/og-pyp.png; robots y _redirects ya versionados permanecen presentes.
- D: index.html contiene la declaración Netlify; App contiene el formulario React. Una ruta puede pertenecer a más de una categoría y aparece una sola vez en la selección.
- E: AGENTS, Markdown, configuración/ignore de VitePress, prompts, bitácora y evidencias oficiales.
- F: imagen OG nueva; logo y demás imágenes de src/assets/proyectos ya versionadas. Inventario exacto de recursos en inventario.json.
- G: dist, node_modules, perfiles, cachés, builds temporales, Appcopia y dos prompts raíz duplicados.
- H: retirar tres archivos dist del índice requiere autorización futura; corregir whitespace de main requiere otra modificación autorizada. Nuevas reglas Netlify, favicon y mantenimiento de dependencias quedan fuera.

## Dist: tres archivos versionados, 17 en disco

Rutas exactas seguidas por Git:

~~~text
dist/assets/clg-DhiTCHTU.jpeg
dist/assets/rpi-DDLAJPsT.jpg
dist/index.html
~~~

dist/index.html tiene una modificación previa; las dos imágenes no tienen cambios. Los otros 14 archivos presentes están ignorados. La regla dist/ no deja de seguir archivos ya registrados.

Propuesta, NO ejecutada, después de aprobación y de conservar el contenido local:

~~~powershell
git rm --cached -- dist/assets/clg-DhiTCHTU.jpeg dist/assets/rpi-DDLAJPsT.jpg dist/index.html
~~~

Esto prepararía tres bajas del repositorio y conservaría los archivos en disco. No confundir con git rm sin --cached. El commit futuro incluiría esas bajas solo si se aprueba esta operación; seleccion-commit.txt no las prepara. No usar reset/clean para resolver el cambio local de dist/index.html.

Si Netlify instala dependencias y ejecuta npm run build desde las fuentes, dist se regenera con los HTML SEO y recursos; no necesita estar versionado. Si el sitio depende de publicar un dist preexistente sin build, quitarlo rompería ese proceso. Confirmar primero el panel real, rama/base, build command y publish directory; no se presume su configuración.

## Configuración detectada y despliegue de prueba pendiente

- package.json: build = vite build && node scripts/generar-seo.mjs; el generador toma dist por defecto. Directorio de publicación deducido: dist. Vite config solo declara plugin React; no hay netlify.toml local ni prueba del panel remoto.
- engines Node >=22.12.0; entorno validado Node 22.15.1/npm 10.9.2. Verificar que Netlify use una versión compatible y no omita devDependencies al compilar.
- public/_redirects: /* /index.html 200, sin force. La [documentación de Netlify sobre shadowing](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#shadowing) establece prioridad de archivos existentes sobre reglas no forzadas. Es compatible por diseño con directorio/index.html por solución; no acredita respuesta real del CDN.
- src/data/seo.js es fuente única del generador y Seo.jsx. El build entrega index.html y monitoreo-energetico/index.html, iot-industrial/index.html, automatizacion-edge/index.html. El contenido de la SPA sigue dependiendo de React; no es prerenderizado completo.
- sitemap/robots/imagen OG están en public y se copian al artefacto. Cuatro canonical absolutos oficiales, sin lastmod inventado.
- Declaración Netlify contacto-pyp, POST, data-netlify=true, honeypot bot-field, hidden form-name=contacto-pyp. Campos idénticos: bot-field, correo, empresa, form-name, mensaje, nombre, solucion. nombre/correo/mensaje siguen required en React. [Netlify: formularios JavaScript](https://docs.netlify.com/manage/forms/setup/#work-with-javascript-rendered-forms) explica la detección estática; la recepción no se comprueba localmente.
- VitePress tiene scripts docs/docs:build/docs:preview y salida separada docs/.vitepress/dist. No publicar ese directorio como web comercial ni incluir docs en dist comercial.

En un despliegue de prueba autorizado: confirmar que NO publique producción automáticamente; revisar configuración y rama del sitio, instalación desde lock, build completo y deploy log; obtener sin JS las siete variantes de URL y registrar status/Location/HTML/title/description/canonical/OG; comprobar recursos y refresh directo, React Router y anclas, dropdown/teclado/móvil, robots/sitemap y cachés/Pretty URLs. Canonical sigue apuntando al dominio oficial incluso en preview; impedir indexar el despliegue de prueba mediante configuración apropiada del entorno. Verificar detección del único formulario y nombres reales; recepción/antispam requiere autorización separada para un envío controlado.

## Validaciones de esta intervención

- Vite 6.4.4: build comercial temporal correcto, 1609 módulos, 21,67 s. Generador: cuatro HTML, salida 0.
- comprobar-artefacto.mjs: 81 comprobaciones, cero fallos. Metadatos por ruta, archivos de bundles, campos/marcadores estáticos, required React, una Navbar por página, anclas locales reales, sitemap, robots, OG, SPA y comparación de artefactos.
- Siete GET locales HTTP 200 con title propio: / y tres soluciones con/sin barra. Servidor modelo creado por la prueba y cerrado al terminar; busca archivos/directorios antes del fallback. No es Netlify ni ejecuta React. Resultados: comprobaciones.json.
- Los 20 archivos del artefacto comercial son idénticos por SHA-256 a PYP-017. Las 292 pruebas de navegador de PYP-017 sirven como antecedente; NO se repitieron ni se generaron nuevas capturas o pruebas visuales aquí.
- Sitemap parseado con XML de PowerShell, raíz urlset; cuatro canonical exactos comprobados. Formulario estático presente e idéntico en los cuatro HTML. No hubo POST.
- npm audit --omit=dev --json: salida 0, cero vulnerabilidades. Resultado y código guardados. No se repitió audit completo: PYP-017 mantiene 17 entradas de desarrollo (12 altas/4 moderadas/1 baja), incluido Vite 5.4.21 de VitePress; queda pendiente su plan separado.
- VitePress con salida/caché/SSR aislados: resultado real al cierre.
- git diff --check global: salida 2 por whitespace previo src/main.jsx:45. No se corrige fuera del alcance. Avisos LF/CRLF previos no equivalen a pérdidas. No presentar el conjunto como libre de problemas de whitespace.
- Escaneo estático de rutas seguidas y los 320 nuevos: sin patrones de claves privadas, tokens npm/GitHub, claves AWS ni credenciales en URL; sin .env/.npmrc/archivos de claves detectados en el inventario fuera de directorios excluidos. No se imprimen secretos. Limitaciones: patrones no garantizan ausencia absoluta; no se auditó historial Git, node_modules, perfiles o contenido de binarios/PNG. Revisar también capturas y políticas de publicación del repositorio antes de autorizarlo.
- Hashes e índice Git: resultado final al cierre; no se modifican salidas generadas anteriores.

## Riesgos y decisiones antes del commit

1. Bloqueo de higiene: aprobar/corregir whitespace main.jsx:45 antes del commit o documentar su aceptación explícita. Se mantiene en selección porque la ruta Edge lo necesita; no omitir main para ocultar el aviso.
2. Aprobar o posponer las tres bajas dist. No preparar automáticamente bajas ni incluir dist/index.html modificado como fuente.
3. Confirmar configuración real y modo de despliegue de prueba Netlify, acceso CDN con/sin barra y Forms. Vite preview devuelve head de Inicio en soluciones sin barra, según PYP-014/017; no se utiliza para inferir un defecto de CDN ni justificar cambios de redirects.
4. Pendientes anteriores no funcionales: favicon.svg ausente; enlaces a adjuntos JSON/TXT históricos no necesariamente publicados por VitePress; duplicación de theme Tailwind y nota AGENTS histórica. No se corrigen aquí. La documentación fuente permanece disponible en Git.
5. Revisar/aceptar vulnerabilidades de desarrollo y alcance de publicación de evidencias (rutas locales/nombres de usuario corporativos pueden aparecer; no son credenciales).
6. Los manifiestos PYP-009/010 son históricos. Usar la selección PYP-018, verificar que nada cambió desde sus hashes y regenerarla si se añaden/alteran archivos antes del commit.

## Procedimiento propuesto; ningún comando de escritura Git ejecutado

Solo después de resolver/aceptar los pendientes y recibir autorización expresa:

~~~powershell
git status --short
git diff --check
# Opcional, SOLO con autorización específica: las tres bajas --cached indicadas arriba.
# Lista literal de rutas; no git add . ni git add -A.
git --literal-pathspecs add --pathspec-from-file=docs/evidencias/PYP-018/seleccion-commit.txt
git diff --cached --name-status
git diff --cached --stat
git diff --cached --check
git status --short
# Solo después de revisar lo preparado y autorizar el commit:
git commit -m "Integra navegación corporativa, SEO técnico y documentación PYP"
~~~

Comprobar que las rutas preparadas coinciden exactamente con seleccion-commit.txt, más las tres bajas opcionales autorizadas, y que no hay secretos, builds, perfiles, cachés o dist añadidos. Revisar el diff preparado completo y confirmar que los prerrequisitos ya seguidos siguen en el árbol. No se propone push o publicación automática; se aprueban por separado.


### Conteo del manifiesto PYP-018

341 rutas propuestas: 11 modificaciones versionadas (excluyendo dist/index.html), 318 de los 320 archivos inicialmente sin seguimiento y 12 archivos nuevos de esta auditoría. Dos duplicados raíz omitidos. 21 prerrequisitos ya versionados permanecen en Git sin staging adicional. Las tres bajas opcionales de dist requieren autorización y no se preparan.


## Cierre PYP-018 — 2026-10-17

VitePress compiló correctamente en 42,37 s con salida, caché e intermediarios SSR temporales; resultado HTML del informe presente. No se repitió la compilación después de este cierre administrativo. Datos Browserslist/baseline antiguos continúan como advertencias.

Integridad final: 2039 archivos previos comparados por SHA-256; ninguna pérdida ni modificación fuera de bitácora e índice de prompts autorizados. Los 17 archivos de dist y los 1670 archivos de configuración/salidas previas contemplados en el grupo de generados conservan sus hashes; índice Git intacto. Los 341 paths seleccionados existen al guardar la validación final, ninguno está ignorado ni pertenece a dist/build-temporal/browser-profile/cache. El manifiesto agrupa por categoría y la selección está ordenada globalmente; contienen el mismo conjunto sin duplicados.

Revisión de los 320 archivos iniciales: 314 documentales/legados (incluidas dos copias de prompts omitidas), cuatro fuentes React nuevas, una fuente de datos SEO y una imagen pública OG. Se incluyen 318; las dos copias permanecen en disco. La selección de 341 rutas se completa con 11 modificaciones versionadas y 12 archivos de esta auditoría.

Markdown modificado: enlaces locales válidos y sin whitespace final; diff --check acotado exit 0. Global exit 2 exclusivamente por el whitespace previo en main.jsx:45; no se elimina ni oculta el pendiente. Sin modificaciones funcionales ni de dependencias. No se encontró un prompt original PYP-003 y no se reconstruye.

Git final: main; mismas 12 modificaciones versionadas acumuladas, 332 archivos sin seguimiento tras guardar validacion-final.json (320 iniciales + 12 nuevos). Ningún archivo preparado. Solo se modificaron los dos documentos existentes y se crearon el prompt y las evidencias PYP-018. No se ejecutaron git add, rm, reset, clean, commit, push, ni despliegue. El servidor HTTP efímero de la prueba cerró; no se interrumpieron servidores previos del usuario.

Informe, manifiesto, selección literal, inventario y validación final guardados en docs/evidencias/PYP-018/. Pendientes: decisión autorizada sobre whitespace/dist, revisión del panel y despliegue de prueba Netlify; recepción real Forms, CDN/cachés/Pretty URLs y hallazgos heredados. No se autoriza publicación por haber pasado comprobaciones locales.
