# PYP-010 — Organización del repositorio y control de archivos

Fecha: 2026-10-17. Rama: main. [Prompt completo](../../prompts/PYP-010.md).

## Estado inicial

AGENTS.md e informes PYP-009 leídos antes de editar. Ocho archivos seguidos modificados, 483 sin seguimiento. Inventario exacto y hashes iniciales en estado-inicial.base64 (JSON comprimido con gzip, codificado base64). No se descartan cambios previos.

~~~text
 M dist/index.html
 M package-lock.json
 M package.json
 M src/App.jsx
 M src/components/Seo.jsx
 M src/main.jsx
 M src/pages/IoTIndustrialLoRaWAN.jsx
 M src/pages/MonitoreoEnergetico.jsx
?? 01_ESTADO_Y_BITACORA.md
?? 02_PROMPT_001_AUDITORIA_NAVBAR.md
?? 03_PROMPT_002_NAVBAR_EDGE.md
?? 04_BITACORA_001_RESULTADO.md
?? AGENTS.md
?? docs/
?? src/components/Navbar.jsx
?? src/components/SectionNav.jsx
?? src/pages/AutomatizacionEdge.jsx
?? src/utils/
~~~

| Finalidad | Cantidad |
| --- | ---: |
| Builds temporales | 379 |
| Evidencias conservables | 80 |
| Prompts e índice | 10 |
| Documentación/configuración | 5 |
| Fuentes nuevas | 4 |
| Raíz | 5 |

379 artefactos temporales ocupan 14.836.856 bytes. Permanecen visibles 104 archivos previos, más los registros nuevos de PYP-010.

| Directorio inicial | Cantidad |
| --- | ---: |
| . | 5 |
| docs | 3 |
| docs/.vitepress | 1 |
| docs/arquitectura | 1 |
| docs/evidencias/PYP-004 | 5 |
| docs/evidencias/PYP-004/build-temporal/ | 16 |
| docs/evidencias/PYP-005B/build-temporal/ | 16 |
| docs/evidencias/PYP-005B | 4 |
| docs/evidencias/PYP-006 | 13 |
| docs/evidencias/PYP-006/build-temporal/ | 16 |
| docs/evidencias/PYP-007 | 24 |
| docs/evidencias/PYP-007/build-temporal/ | 152 |
| docs/evidencias/PYP-008 | 8 |
| docs/evidencias/PYP-008/build-temporal/ | 93 |
| docs/evidencias/PYP-009 | 25 |
| docs/evidencias/PYP-009/build-temporal/ | 86 |
| docs/evidencias | 1 |
| docs/prompts | 10 |
| src/components | 2 |
| src/pages | 1 |
| src/utils | 1 |

| Extensión inicial | Cantidad |
| --- | ---: |
| .md | 26 |
| (sin extension) | 10 |
| .mjs | 1 |
| .txt | 20 |
| .png | 32 |
| .jpeg | 10 |
| .css | 13 |
| .js | 164 |
| .webp | 20 |
| .jpg | 5 |
| .html | 78 |
| .xml | 5 |
| .json | 35 |
| .cjs | 5 |
| .woff2 | 56 |
| .jsx | 3 |

## Exclusiones

Se conservan las reglas previas node_modules/, dist/ y src/Appcopia.jsx. Se añaden /docs/evidencias/**/build-temporal/ y /docs/evidencias/**/browser-profile/ para ejecuciones reproducibles y perfiles. Se añaden .DS_Store, Thumbs.db, Desktop.ini, *.swp y *.swo como prevención acotada de metadatos e intercambios; no aparecieron estos últimos en el inventario. No se ignoran extensiones documentales ni configuraciones compartidas del editor.

docs/.gitignore ya cubre .vitepress/cache/, .vitepress/dist/ y .vitepress/.temp/: permanece intacto. Se conservan las reglas locales de perfiles. Capturas, informes, JSON, *.before.txt y package*.before.json son evidencias conservables.

## Archivos para versionar

Los nueve archivos web de la propuesta PYP-009 siguen siendo necesarios: App.jsx, main.jsx, Seo.jsx, Navbar.jsx, SectionNav.jsx, scrollToSection.js y las tres páginas interiores. Navbar, SectionNav, AutomatizacionEdge y scrollToSection son fuentes nuevas imprescindibles. Conservar assets, public/, scripts/ y configuraciones ya seguidas.

Versionar .gitignore, AGENTS.md, package.json/package-lock.json (cambios previos), fuentes Markdown, prompts, configuración VitePress y evidencias oficiales. archivos-propuestos.txt une los manifiestos PYP-009 con los nuevos registros PYP-010. Los manifiestos históricos no se reemplazan.

## Revisión humana y pendientes

Los prompts raíz 02 y 03 duplican los oficiales: conservarlos en disco, sin proponer duplicación en el commit. Los registros raíz 01 y 04 son históricos únicos incluidos en la propuesta anterior; revisar su organización. src/Appcopia.jsx conserva una exclusión previa: revisar el respaldo separadamente.

Revisar cambios previos de main.jsx, Seo.jsx y dependencias, no atribuibles exclusivamente a Navbar. Siguen pendientes los problemas SEO/Netlify, vulnerabilidades, hash inválido, barras finales y 14 adjuntos no copiados por VitePress descritos en PYP-009. No se corrigen aquí.

## dist versionado

~~~text
dist/assets/clg-DhiTCHTU.jpeg
dist/assets/rpi-DDLAJPsT.jpg
dist/index.html
~~~

.gitignore no retira archivos ya seguidos. dist/index.html conserva su modificación previa. Propuesta para una intervención futura autorizada, NO ejecutada, que retira únicamente del índice y conserva los archivos en disco:

~~~powershell
git rm --cached -- dist/index.html dist/assets/clg-DhiTCHTU.jpeg dist/assets/rpi-DDLAJPsT.jpg
~~~

## Preparación futura del commit

Revisar y autorizar la selección antes de ejecutar staging. Estos comandos son una propuesta; las operaciones de staging NO se ejecutaron:

~~~powershell
git status --short
git diff --check
git diff -- src/main.jsx src/components/Seo.jsx package.json package-lock.json
git add --pathspec-from-file=docs/evidencias/PYP-010/archivos-propuestos.txt
git diff --cached --stat
git diff --cached --check
~~~

El manifiesto excluye dist, perfiles, builds y duplicados raíz 02/03. No se ejecutan add, rm, clean, reset, commit, push ni despliegue.

## Validación

Resultados finales en validacion-final.json y cierre de bitácora. No se compila ni se hacen pruebas visuales: solo se modifican exclusiones y documentación.


### Cierre de validación — PYP-010

642 archivos inventariados comparados por SHA-256: ninguna eliminación ni cambio fuera de .gitignore, bitácora e índice de prompts autorizados. El inventario excluye .git, node_modules, perfiles de navegador y carpetas cache. Los 17 archivos de dist conservan sus hashes y el índice Git permanece idéntico. Los 379 artefactos temporales quedan ignorados y los 104 archivos previos conservables permanecen visibles. Reglas de node_modules, VitePress, perfiles y metadatos verificadas con git check-ignore.

Git diff --check de las rutas afectadas: salida 0; inspección adicional de whitespace en archivos nuevos: sin incidencias. El chequeo global conserva el espacio final previo en src/main.jsx:45 (salida 2), sin corregirlo. Estado final: nueve archivos seguidos modificados (ocho previos más .gitignore), 109 archivos sin seguimiento incluidos los registros PYP-010, sin staging. Manifiesto propuesto: 115 rutas, ninguna faltante. No se ejecutaron builds ni pruebas visuales por ser cambios documentales/exclusiones. Sin add, rm, clean, reset, commit, push ni despliegue.
