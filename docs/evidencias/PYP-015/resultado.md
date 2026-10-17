# PYP-015 — Auditoría y propuesta de dependencias

Fecha: 2026-10-17. [Prompt completo](../../prompts/PYP-015.md). Alcance: diagnóstico y referencia, sin instalaciones ni modificaciones de dependencias.

## A. Inventario y estado inicial

AGENTS, PYP-009 y PYP-010 a PYP-014 revisados. Rama main; doce archivos seguidos modificados previos y fuentes/documentación nuevas. Estado/hashes conservados antes de editar. Node 22.15.1, npm 10.9.2, lockfile v3 con 358 entradas de paquetes. npm ls --all --json devuelve 0 sin árbol inválido. Inventario completo instalado/lock en npm-ls.json e inventario.json.

| Dependencia directa | Instalada | Rango | Uso |
| --- | --- | --- | --- |
| lucide-react | 0.471.2 | ^0.471.2 | Producción |
| react | 18.3.1 | ^18.3.1 | Producción |
| react-dom | 18.3.1 | ^18.3.1 | Producción |
| react-router-dom | 6.30.6 | ^6.30.6 | Producción |
| @vitejs/plugin-react | 5.0.4 | ^5.0.4 | Desarrollo |
| autoprefixer | 10.4.21 | ^10.4.21 | Desarrollo |
| postcss | 8.5.30 | ^8.5.6 | Desarrollo |
| tailwindcss | 3.4.18 | ^3.4.18 | Desarrollo |
| vite | 6.4.1 | ^6.0.0 | Desarrollo |
| vitepress | 1.6.4 | 1.6.4 | Desarrollo |

Existen dos Vite: raíz 6.4.1 y anidado de VitePress 5.4.21. esbuild vulnerable 0.21.5 está bajo VitePress; el esbuild raíz no figura en ese aviso. Las dependencias de desarrollo del repositorio fuente de VitePress no deben confundirse con su árbol instalado en PYP.

## B. Vulnerabilidades por severidad y paquete

Audit completo: 19 entradas, 12 altas, 6 moderadas, 1 baja, 0 críticas. Omitiendo desarrollo: dos entradas moderadas, react-router y react-router-dom. Mismos conteos de PYP-009, consultados nuevamente; las entradas propagadas no equivalen a 19 CVE distintos.

npm audit y omit=dev devuelven 1 por hallazgos, no por errores de red. npm outdated devuelve 1 por versiones disponibles; npm ls devuelve 0. Resultados completos y códigos en los archivos npm-*.json y *-comando.json.

| Paquete | Versiones instaladas | Severidad | Tipo / uso | Candidata o bloqueo | Compatibilidad y riesgo |
| --- | --- | --- | --- | --- | --- |
| @babel/core | 7.28.4 | low | Transitiva / desarrollo | 7.29.7 | Compatible con ^7.28.4 actual. Bajo/medio: compilación/sourcemaps. |
| baseline-browser-mapping | 2.8.18 | moderate | Transitiva / desarrollo | 2.11.29; aviso corregido desde 2.11.0 | Compatible con ^2.8.9. Bajo: datos de navegadores. |
| brace-expansion | 2.0.2 | high | Transitiva / desarrollo | 2.1.7 | Compatible con rangos ^2.0.1/^2.0.2. Bajo/medio: patrones. |
| braces | 3.0.3 | high | Transitiva / desarrollo | Sin parche publicado; latest 3.0.3 afectada | No hay reemplazo compatible; evaluar cadena Tailwind 4.3.3. Alto al cambiar cadena. |
| browserslist | 4.26.3 | high | Transitiva / desarrollo | 4.29.3; mínimo corregido 4.28.7 | Compatible con ^4.24.0/^4.24.4. Medio: objetivos/prefijos CSS. |
| chokidar | 3.6.0 | high | Transitiva / desarrollo | No actualizar aisladamente; evaluar Tailwind 4.3.3 | Versión 3.6.0 arrastra braces; Chokidar 5 no cabe en ^3.6.0. Medio/alto: watchers. |
| esbuild | 0.21.5 | moderate | Transitiva / desarrollo | 0.25.0 corrige aviso; bloqueado en cadena VitePress | Vite 5 exige ^0.21.3; no forzar override 0.25. Alto: rama 0.x incompatible. |
| fast-glob | 3.3.3 | high | Transitiva / desarrollo | Sin parche standalone; latest 3.3.3 aún arrastra aviso | micromatch/braces siguen afectados; evaluar Tailwind 4. Medio/alto: cambiar cadena. |
| glob | 10.4.5 | high | Transitiva / desarrollo | 10.5.0 | Compatible con ^10.3.10 de sucrase. Bajo/medio: CLI y globs. |
| micromatch | 4.0.8 | high | Transitiva / desarrollo | Sin parche standalone; latest 4.0.8 aún afectada | Depende de braces ^3.0.3; evaluar cadena Tailwind 4. Medio/alto. |
| minimatch | 9.0.5 | high | Transitiva / desarrollo | 9.0.9; mínimo corregido 9.0.7 | Compatible con ^9.0.4. Bajo/medio: patrones. |
| picomatch | 2.3.1, 4.0.3 | high | Transitiva / desarrollo | 2.3.2 para rama 2; 4.0.7 para ambas copias rama 4 | Conservar ramas de cada padre; mínimo 4.0.4 para rama 4. Bajo/medio: patrones. |
| postcss-selector-parser | 6.1.2 | moderate | Transitiva / desarrollo | 7.1.6 corrige todos; 6.1.3/6.1.4 solo parcial | No cabe en ^6.1.1/^6.1.2 de postcss-nested/Tailwind 3; migrar cadena. Alto: API/AST mayor. |
| react-router | 6.30.6 | moderate | Transitiva / producción | 7.18.4 transitivo; mínimo corregido 7.18.0 | Lo fija react-router-dom 7.18.4; no forzar bajo Router DOM 6. Medio: navegación. |
| react-router-dom | 6.30.6 | moderate | Directa / producción | 7.18.4 | Cambio mayor fuera de ^6.30.6; Node >=20 y React >=18 cumplidos. Medio: transiciones, enlaces e historial; autorización previa. |
| rollup | 4.52.5 | high | Transitiva / desarrollo | 4.64.9; mínimo corregido 4.59.0 | Compatible con ^4.34.9 y ^4.20.0. Medio: bundles/plugins/binarios. |
| tailwindcss | 3.4.18 | high | Directa / desarrollo | 4.3.3 solo mediante migración separada; 3.4.19 no corrige cadena | Cambio mayor, pipeline CSS y utilidades/navegadores. Alto: regresión visual; autorización previa. |
| vite | 6.4.1, 5.4.21 | high | Directa / desarrollo | 6.4.4 para raíz; 5.4.21 anidado sigue pendiente | Raíz dentro de ^6.0.0; no compatible con ^5.4.14 de VitePress. Medio: build/dev/plugins. |
| vitepress | 1.6.4 | moderate | Directa / desarrollo | Sin estable corregida: latest 1.6.4; no recomendar next alpha.20 | Cadena Vite ^5.4.14; no imponer Vite 6 ni esbuild 0.25. Alto al forzar mayor o alpha. |

clasificacion.json conserva ubicaciones/versiones, via/avisos/rangos/URL, fixAvailable, candidatas, compatibilidad y riesgo por cada paquete. compatibilidad-candidatas.json verifica engines y rangos reales de los padres. fixAvailable=true no garantiza un parche standalone compatible: fast-glob/micromatch aún arrastran braces y sus versiones latest actuales siguen afectadas.

17 entradas están en desarrollo/build/documentación. Los avisos de globs/compiladores/servidores locales no demuestran explotación en la web estática comercial. Los avisos Vite sobre lecturas/Windows sí merecen atención en el equipo/CI; no exponer servidores a redes no confiables reduce exposición, pero no sustituye una corrección. No se hicieron pruebas de explotación.

## C. Producción: React Router

Instalados react-router-dom 6.30.6, react-router 6.30.6 transitivo y @remix-run/router 1.23.4. El tag version-6 sigue en 6.30.6: no se encontró parche 6.x para los dos avisos actuales. Corrección desde 7.18.0; candidata concreta: react-router-dom 7.18.4, que depende exactamente de react-router 7.18.4.

El [aviso oficial de redirección abierta](https://github.com/remix-run/react-router/security/advisories/GHSA-wrjc-x8rr-h8h6) requiere destinos no confiables pasados a navegación. En PYP useNavigate recibe href definidos en Navbar/SectionNav, sin destinos tomados de query o formulario. La exposición observada es limitada; no se afirma que esto descarte todos los casos.

El [aviso oficial SSR](https://github.com/remix-run/react-router/security/advisories/GHSA-337j-9hxr-rhxg) excluye Declarative Mode. PYP usa BrowserRouter y createRoot, sin SSR/hidratación de errores, Framework/Data Mode ni RouterProvider. No se observa la condición de ese aviso; audit clasifica por versión y no por uso. No confundir la alerta con una explotación comprobada.

Router DOM 7.18.4 requiere Node >=20 y React/ReactDOM >=18: el entorno cumple. El salto 6 -> 7 sigue siendo mayor y requiere autorización futura. [Router DOM v7 mantiene reexportaciones](https://api.reactrouter.com/v7/modules/react-router-dom.html); conservar imports y BrowserRouter reduce alcance. Revisar las [future flags v6](https://reactrouter.com/6.30.6/upgrading/future), especialmente transiciones y enlaces relativos. No hay splats ni data routers en las rutas actuales; no es necesario convertir el formulario HTML a React Router Form ni adoptar Framework Mode.

El registro publica react-router latest 8.4.0, pero react-router-dom latest/version-7 es 7.18.4. No actualizar el transitivo a latest ni mezclar mayores. No se necesita React 19, ReactDOM 19 o Lucide 1 para resolver estos avisos.

## D. Versiones recomendadas y plan mínimo

1. Prioridad producción: autorizar una intervención separada para react-router-dom 7.18.4 y su Router 7.18.4 transitivo. Preparar/revisar future flags bajo v6 dentro de ese alcance y comparar rutas, anclas, teclado, historial y barras finales con la referencia. Mantener React/DOM 18.3.1. No instalar Router directo bajo DOM 6.
2. Tooling comercial, tras autorización: Vite raíz 6.4.1 -> 6.4.4, dentro del rango existente. Corrige los avisos propios <=6.4.2, pero no el Vite 5 de VitePress.
3. Ocho familias transitivas compatibles, en sublotes: @babel/core 7.29.7; browserslist 4.29.3; baseline-browser-mapping 2.11.29; rollup 4.64.9; glob 10.5.0; minimatch 9.0.9; brace-expansion 2.1.7; picomatch 2.3.2 y 4.0.7 según padre. No añadirlas como dependencias directas innecesarias ni deduplicar picomatch a un mayor único. Inspeccionar el diff del lock después de cada sublote.
4. Reauditar y repetir builds/referencia tras cada cambio autorizado. Las candidatas existen, cumplen Node y están fuera de los rangos de sus avisos actuales; NO se ha instalado/auditado un árbol futuro. No prometer audit=0 ni compatibilidad garantizada.
5. Migraciones separadas: Tailwind 4.3.3 para evaluar retirada de la cadena vulnerable y parser de selectores; VitePress cuando exista estable corregida. No aplicar overrides incompatibles ni npm audit fix. Si un lote exige un mayor no previsto, detener ese lote y solicitar autorización concreta.

## E. Riesgos y bloqueos de actualización

Tailwind 3.4.19 no resuelve la cadena braces/chokidar/micromatch/fast-glob. postcss-selector-parser 6.1.3/6.1.4 no corrige el aviso <7.1.6; 7.1.6 rompe rangos de Tailwind 3/postcss-nested. La [guía Tailwind 4](https://tailwindcss.com/docs/upgrade-guide) implica revisar plugin PostCSS/Vite, configuración, utilidades y navegadores mínimos. Requiere pruebas visuales y autorización independiente, no un parche ciego de lock.

VitePress latest sigue en 1.6.4, next=2.0.0-alpha.20. No se recomienda adoptar una alpha solo para reducir audit. Su Vite ^5.4.14 exige esbuild ^0.21.3; esbuild 0.25.0 corrige el aviso <=0.24.2, pero no cabe en ese rango. Cambiar Vite raíz no corrige este árbol anidado; conservar residual documentado y evaluar solución estable aguas arriba.

@vitejs/plugin-react 5.2.0 y autoprefixer 10.6.1 son wanted compatibles, pero mantener inicialmente 5.0.4 y 10.4.21 reduce el lote si basta actualizar sus transitivas. PostCSS 8.5.30 ya es latest y no figura como vulnerable. No ampliar a Vite 8, Babel 8, React 19 o Lucide 1 sin necesidad.

registro-versiones.json contiene tags, versiones, engines, peers y dependencias consultados en el registro público npm. @babel/core 7.29.1 NO está publicado; no se recomienda inferirlo del rango: la candidata comprobada es 7.29.7. Las versiones corregidas se determinan contra todos los avisos del paquete, no solo el primero.

## F. Trazabilidad y alcance de seguridad

Los JSON de audit conservan los enlaces/rangos de todos los avisos. Ejemplos primarios: [Vite Windows](https://github.com/advisories/GHSA-fx2h-pf6j-xcff), [esbuild](https://github.com/advisories/GHSA-67mh-4wv8-2f99), [Rollup](https://github.com/advisories/GHSA-mw96-cpmx-2vgc), [braces](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm). Los avisos se usan para clasificar condiciones; no se atribuye entrada no confiable a un proceso concreto sin evidencia.

No se modificaron package.json, lock, componentes, SEO, formulario, navegación o configuración. No se ejecutó install, update, audit fix, overrides ni resoluciones experimentales. No se crearon copias de proyecto para instalar otras versiones.

## G. Pruebas de referencia sin actualizar

Compilación comercial temporal Vite 6.4.1: salida 0, 1601 módulos, 16.40 s. Generador existente con --outDir temporal: salida 0, cuatro HTML.

- Navegación Edge 375/1440: 177 controles pasados, sin excepciones ni console.error. Rutas con/sin barra, estados activos, hashes inválidos, anclas, historial, menú, teclado y movimiento reducido.
- Formulario: 34 controles pasados. Dos POST interceptados y respuestas sintéticas 200/500; ningún envío real. Declaración estática y campos conservados.
- SEO: 59 controles pasados, HTML inicial/React coincidentes, cuatro rutas/siete variantes del servidor de archivos, sitemap XML/robots/imagen correctos.
- Total navegador: 270 controles. browser-results.json corresponde a navegación; form-results.json y seo-results.json conservan resultados separados.

Se reutilizaron scripts PYP-011/012/013 adaptando únicamente puertos, perfiles y archivos de resultados en PYP-015; originales intactos. Se generaron capturas, sin atribuir inspección visual nueva ni certificación de accesibilidad. Las pruebas locales no acreditan recepción/antispam real ni CDN Netlify; diferencias dev/preview de PYP-014 siguen documentadas.

~~~powershell
npm audit --json
npm audit --omit=dev --json
npm ls --all --json
npm outdated --json
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-015/build-temporal/comercial/dist
node scripts/generar-seo.mjs --outDir docs/evidencias/PYP-015/build-temporal/comercial/dist
node docs/evidencias/PYP-015/static-server.cjs
node docs/evidencias/PYP-015/navigation-check.cjs
node docs/evidencias/PYP-015/form-check.cjs
node docs/evidencias/PYP-015/seo-check.cjs
node docs/evidencias/PYP-015/build-docs.mjs
~~~

VitePress aísla salida/caché/SSR; resultado final al cierre. Incidencias previas: datos Browserslist/baseline antiguos, whitespace main.jsx:45 y adjuntos históricos; no se corrigen ni se atribuyen a actualizaciones que no se hicieron. Un primer intento de escribir este informe falló por el delimitador de PowerShell sin ejecutar cambios; se conservó la auditoría y se generó el informe mediante escritura estructurada. La compilación documental se repite tras incorporar este informe.

## H. Archivos y Git

Modificados exclusivamente docs/BITACORA_DESARROLLO.md y docs/prompts/index.md. Nuevos docs/prompts/PYP-015.md y docs/evidencias/PYP-015/ (inventarios, audit/ls/outdated, registro/compatibilidad, clasificación, scripts/resultados de referencia, capturas, informe e integridad). Estado final e integridad en validacion-final.json y cierre.

Para aplicar Router mayor, Tailwind mayor o cualquier actualización se requiere una intervención autorizada posterior. No se pide ni ejecuta una instalación en PYP-015: se entrega la propuesta para revisión. Sin staging, commit, push, reset, clean ni despliegue.

### Cierre PYP-015

Auditoría completa 19 entradas (12 altas, 6 moderadas, 1 baja); producción dos moderadas de Router/DOM. npm ls completo salió 0. Consultas del registro y rangos/engines verificadas sin instalar/resolver un árbol nuevo. Las propuestas no garantizan ausencia de vulnerabilidades en un árbol futuro; debe reauditarse después de cada cambio autorizado.

Referencia: Vite 1601 módulos, 16.40 s, salida 0; generador cuatro HTML, salida 0; 270 comprobaciones Edge pasadas (177 navegación, 34 formulario con POST interceptados, 59 SEO). VitePress final con informe incorporado: salida 0 en 27.28 s. Hubo un build documental inicial correcto de 24.96 s anterior a incorporar el informe; se repitió por ese cambio documental. No se repite tras añadir este cierre textual. Ningún formulario real enviado ni CDN/recepción Netlify verificados. Navegadores y servidor local de referencia cerrados.

Integridad: 1.302 archivos previos inventariados, sin eliminaciones ni cambios fuera de bitácora e índice autorizados. Se excluyen .git, node_modules, browser-profile y cache del inventario. package.json y package-lock.json conservan hashes y las diez versiones directas instaladas siguen idénticas. Los 17 archivos dist y 1.057 generados previos conservan hashes; código/SEO/navegación/formulario intactos. Índice Git idéntico. No se instalaron ni actualizaron paquetes.

Whitespace de archivos afectados/nuevos correcto; enlaces Markdown locales válidos. El chequeo global conserva el espacio previo main.jsx:45 (salida 2) y avisos LF/CRLF. Git final: main, doce archivos seguidos modificados preexistentes y 226 sin seguimiento al incluir validacion-final.json. La intervención modifica solo documentación/evidencias. No se ejecutó audit fix, add, commit, push, reset, clean ni despliegue. Migraciones Router/Tailwind y cualquier actualización futura requieren autorización. Evidencia completa: validacion-final.json.
