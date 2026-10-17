# PYP-019 — Revisión final del manifiesto y cierre de Git

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-019.md). Rama main, origin https://github.com/pyptec/web.git. Sin staging, commit, push ni despliegue.

## Auditoría y resultado del manifiesto

Leídos AGENTS.md, informe, manifiesto y selección PYP-018; revisados estado Git e ignores antes de modificar. Inicial: 12 archivos versionados modificados y 332 sin seguimiento, índice sin cambios preparados.

Las 341 rutas anteriores existen, son archivos del proyecto, no están ignoradas y el manifiesto comentado contiene el mismo conjunto sin duplicados de rutas. Se revisaron tamaños, hashes y contenido textual. revision-manifiesto.json contiene la clasificación por archivo y los 29 grupos de contenido idéntico.

| Categoría PYP-018 revisada | Archivos |
| --- | ---: |
| Código fuente | 11 |
| Recursos públicos | 2 |
| Configuración | 4 |
| Dependencias | 2 |
| Documentación | 4 |
| Prompts | 19 |
| Evidencias | 297 |
| Históricos | 2 |
| Total | 341 |

Peso inicial conjunto: 12.060.629 bytes. Mayor archivo: public/og-pyp.png, 1.355.270 bytes; único superior al umbral de revisión de 1 MiB. Recurso oficial utilizado por los metadatos, se conserva sin optimizar ni alterar. No se encontró un bundle o build temporal camuflado en la selección; los HTML PYP-014 son evidencias de respuestas HTTP.

Los 29 grupos duplicados son capturas equivalentes en momentos diferentes, resultados sin cambios, snapshots/lock y reglas locales idénticas. Se conservan por trazabilidad y referencias, sin deduplicar ni eliminar pruebas. En particular los snapshots JSON de lock no reemplazan el package-lock.json raíz. Las dos copias literales de prompts raíz permanecen excluidas como en PYP-018.

### Revisión de información sensible

No se detectaron claves privadas, tokens npm/GitHub, claves de acceso AWS, credenciales en URL, asignaciones literales de secretos ni nombres .env/archivos de claves entre las rutas propuestas. Se inspeccionó también el contenido gzip/base64 de la evidencia PYP-010 y los chunks de metadatos de los PNG; no se encontraron chunks textuales/EXIF en esos PNG.

Las coincidencias de correo en src/App.jsx y su snapshot PYP-008 se revisaron con valores ocultos: contacto comercial público o placeholder del formulario, ya presentes en la versión histórica. No se añadió información privada y no se registran valores en este informe. Las rutas de trabajo/nombres corporativos operativos presentes en evidencias históricas son parte de la trazabilidad; no se identificaron datos personales privados innecesarios mediante esta inspección.

Límites: revisión estática y de metadatos, sin OCR/revisión píxel a píxel de todas las capturas ni auditoría completa de historial Git. No se certifica ausencia absoluta de secretos o datos personales. Una coincidencia sensible real bloquearía la preparación; no se encontró ninguna. Revisar visibilidad del repositorio y evidencias antes de publicar.

## Corrección exclusiva de whitespace

src/main.jsx:45 contenía ocho espacios en una línea vacía. Se retiran esos ocho bytes conservando los saltos de línea y todas las otras líneas. No se alteran importaciones, rutas, lógica o SEO.

whitespace.json registra hashes antes/después, bytes retirados y comparación de todas las líneas. main-previo.json conserva el contenido previo escapado sin whitespace final en su representación JSON. El diff incremental respecto a la copia anterior muestra únicamente esa línea; los cambios preexistentes de integración de Edge siguen presentes.

git diff --no-index entre referencia y main devuelve 1 porque hay una diferencia esperada, no por un error del build. git diff --check global después de la corrección devuelve 0. Persisten únicamente avisos de conversión LF/CRLF de Git; no se normalizan archivos completos.

### Exclusión de la copia cruda de trabajo

docs/evidencias/PYP-019/main.jsx.before.txt queda en disco, fuera de la selección: contiene deliberadamente los ocho espacios previos y reproduciría el aviso al incorporar el archivo entero al índice. La evidencia oficial reproducible es main-previo.json más whitespace.json. No se borra ni se cambia .gitignore para ocultar esta copia.

## Selección actualizada

Usar manifiesto-commit.txt y seleccion-commit.txt de PYP-019. Los PYP-018 permanecen intactos como históricos. La nueva selección mantiene sus 341 rutas y añade los registros conservables de esta intervención. No agrega dist, perfiles, node_modules, cachés, builds temporales, Appcopia ni prompts raíz duplicados. Lista completa y conteos finales se guardan junto a este informe.

La revisión actualizada comprueba existencia, pertenencia al proyecto, duplicados de rutas, ignores y whitespace de todos los textos propuestos sin ejecutar git add. No se prepara automáticamente la baja de dist.

## Dist y publicación

Tres rutas siguen versionadas:

~~~text
dist/assets/clg-DhiTCHTU.jpeg
dist/assets/rpi-DDLAJPsT.jpg
dist/index.html
~~~

Propuesta exacta, NO ejecutada, solo con autorización futura:

~~~powershell
git rm --cached -- dist/assets/clg-DhiTCHTU.jpeg dist/assets/rpi-DDLAJPsT.jpg dist/index.html
~~~

Con --cached se prepararían bajas del índice y se conservarían archivos locales. No usar eliminación del disco ni force. Volver a verificar hashes y estado antes/después de esa operación autorizada.

Confirmación local: npm run build ejecuta vite build y luego node scripts/generar-seo.mjs. No utiliza dist versionado como entrada; las fuentes, public y la configuración producen un artefacto completo en un directorio nuevo. Los tres recursos seguidos se generan/copían de nuevo y los cuatro HTML SEO están presentes. La compilación temporal lo demuestra sin leer ni sobrescribir el dist comercial.

Publicación real: no hay netlify.toml y no se consultó el panel Netlify. No puede confirmarse que el sitio remoto use ese build. Antes de retirar dist del repositorio, comprobar en Netlify build command npm run build, publicación dist, directorio base, rama y Node compatible, instalación de devDependencies y ausencia de dependencia de un dist precompilado. Esta limitación impide afirmar que la configuración remota ya está confirmada.

## Validaciones reales

- Vite 6.4.4 temporal: salida 0, 1609 módulos, 19,18 s; sin cambio de dependencias.
- Generación SEO: salida 0, cuatro archivos HTML con metadatos de src/data/seo.js.
- comprobar-artefacto.mjs: 81 comprobaciones, cero fallos. Siete respuestas HTTP 200 en modelo local (raíz y tres interiores con/sin barra), metadatos propios, assets presentes, anclas existentes, una Navbar por página, formulario, sitemap, robots y OG.
- Netlify contacto-pyp: definición estática idéntica en cuatro HTML, POST/data-netlify/honeypot conservados; campos React/HTML coinciden: bot-field, correo, empresa, form-name, mensaje, nombre, solucion. nombre/correo/mensaje siguen required. Sin envíos de formulario.
- Sitemap parseado como XML con PowerShell; cuatro canonical absolutos exactos.
- Los 20 archivos del artefacto son idénticos por SHA-256 a PYP-018. El cambio de whitespace no altera los bundles.
- npm audit --omit=dev --json: salida 0, cero vulnerabilidades; resultado/código conservados. No se repite auditoría completa ni se actualizan dependencias de desarrollo.
- VitePress aislado, integridad final y segunda revisión del manifiesto: resultados al cierre.
- No se repitieron pruebas de navegador, teclado, capturas o móvil; siguen como referencia las pruebas PYP-017. El servidor HTTP efímero de la prueba se cerró al terminar. El modelo local no es un emulador de Netlify ni prueba recepción real.

## Procedimiento futuro seguro; NO ejecutado

1. Revisar y aprobar el manifiesto PYP-019 y la decisión sobre los tres archivos dist; confirmar el panel Netlify antes de sus bajas.
2. Revalidar hashes/estado si alguien modifica el repositorio. La selección es una propuesta para este estado, no una selección automática de cambios futuros.
3. Solo con autorización de staging, utilizar el archivo de paths literales. Revisar el diff preparado completo y confirmar que no se incluyen la copia cruda, duplicados raíz ni generados.
4. Autorizar commit por separado; push y despliegue requieren otra autorización. No interpretar build correcto como aprobación de publicación.

~~~powershell
git status --short
git diff --check
# Solo si se autorizan las bajas: el comando --cached indicado arriba.
git --literal-pathspecs add --pathspec-from-file=docs/evidencias/PYP-019/seleccion-commit.txt
git diff --cached --name-status
git diff --cached --stat
git diff --cached --check
# Tras revisar y autorizar el commit:
git commit -m "Integra navegación corporativa, SEO técnico y documentación PYP"
~~~

El conjunto preparado debe coincidir con la selección, más únicamente las tres bajas opcionales autorizadas. Verificar archivos fuente/prerrequisitos existentes. No ejecutar git add . ni git add -A.

## Riesgos pendientes y archivos afectados

Se resuelve el bloqueo de whitespace. Permanecen pendientes la decisión de retirar dist, configuración remota y despliegue de prueba Netlify, entrega CDN con/sin barra, Forms real y antispam, dependencias de desarrollo y los asuntos heredados de favicon/adjuntos documentales/Tailwind/nota histórica AGENTS. No se modifican reglas para imitar Vite preview.

Modificados: src/main.jsx (solo ocho espacios), docs/BITACORA_DESARROLLO.md y docs/prompts/index.md. Nuevos: docs/prompts/PYP-019.md y evidencias PYP-019 (estado inicial, referencia JSON, copia cruda local excluida, prueba del cambio, revisión de manifiesto, scripts/resultados, auditoría npm, manifiesto/selección, informe y validación final). Nada eliminado. Índice Git, hashes dist y estado final al cierre.


### Selección final

355 archivos propuestos: 341 conservados de PYP-018 y 14 nuevas rutas documentales conservables. La copia cruda main.jsx.before.txt queda excluida y conservada localmente.


## Cierre PYP-019 — 2026-10-17

- VitePress terminó con exit 0 en 34,70 s; salida, caché y SSR aislados. HTML documental del informe presente. Advertencias previas de Browserslist/baseline continúan. No se repitió el build tras añadir este cierre administrativo.
- Manifiesto final: 355 rutas únicas, todas existentes tras guardar validacion-final.json, dentro del proyecto y ninguna ignorada. Mismo conjunto entre manifiesto comentado y selección literal. Cero incidencias de whitespace en los textos seleccionados y cero patrones de credenciales en el segundo escaneo. La referencia cruda main.jsx.before.txt permanece fuera de la selección, sin borrarla.
- git diff --check global: salida 0. src/main.jsx difiere del estado inicial únicamente por retirar ocho espacios de línea 45; el resto de cambios preexistentes se conserva. Avisos LF/CRLF, sin normalización masiva.
- Integridad: 2271 archivos iniciales comparados por SHA-256; sin pérdidas ni cambios fuera de main, bitácora e índice de prompts autorizados. Los 17 archivos dist y los 1890 archivos del grupo de configuración/salidas previas conservan sus hashes. Índice Git idéntico, sin archivos preparados. Dependencias y archivos funcionales distintos de esa línea de main intactos.
- Git final: main; 12 modificaciones versionadas acumuladas y 347 archivos sin seguimiento (332 iniciales + 15 nuevos; 14 nuevos seleccionados y una copia cruda local excluida). Sin git add/rm/reset/clean/commit/push ni despliegue. Ningún archivo eliminado.
- Evidencia final: docs/evidencias/PYP-019/validacion-final.json; selección actual: docs/evidencias/PYP-019/seleccion-commit.txt. PYP-018 se conserva sin modificaciones. Prompt, índice y bitácora actualizados.
- Pendientes: autorizar las tres bajas --cached, comprobar panel y publicación real Netlify antes de retirarlas, validar CDN/Forms de prueba con autorizaciones separadas; dependencias de desarrollo y asuntos heredados. Los resultados locales no acreditan recepción ni publicación real. No se enviaron formularios.
