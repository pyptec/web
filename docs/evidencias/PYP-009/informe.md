# PYP-009 — Auditoría previa de integración y publicación

Fecha: 2026-10-17. Rama: main. Alcance: diagnóstico y documentación; sin cambios funcionales, dependencias instaladas, staging, commit, reset, clean, push ni despliegue.

## A. Estado general

Las cuatro rutas ordinarias funcionan en la previsualización del artefacto compilado. Cada página compone una Navbar corporativa y una SectionNav local; el build resuelve sus imports. El usuario confirmó que PYP-008 funciona correctamente y su confirmación se añadió como nota posterior a esa entrada, sin atribuirle pruebas específicas.

La navegación ordinaria está integrada. No recomiendo publicar todavía sin revisar los hallazgos de Git, recepción de contacto, dependencias y SEO. La auditoría no sustituye comprobar la configuración real y la recepción de formularios en Netlify.

## B. Git e inventario

Al inicio: 8 archivos seguidos modificados, 371 archivos sin seguimiento; 293 de estos últimos son builds temporales (12,607,618 bytes). git diff --stat muestra 2143 inserciones y 232 eliminaciones en los 8 archivos seguidos; no cuenta los archivos nuevos.

| Grupo | Archivos / estado |
| --- | --- |
| Navegación modificada | src/App.jsx, src/pages/MonitoreoEnergetico.jsx, src/pages/IoTIndustrialLoRaWAN.jsx |
| Nuevos necesarios para la web | src/components/Navbar.jsx, src/components/SectionNav.jsx, src/utils/scrollToSection.js, src/pages/AutomatizacionEdge.jsx |
| Integración Edge previa a Navbar | src/main.jsx y src/components/Seo.jsx incorporan la ruta y SEO de Edge; deben acompañar la página nueva |
| Documentación/dependencias | package.json y package-lock.json: VitePress, scripts independientes y actualizaciones transitivas de su instalación previa |
| Generado modificado | dist/index.html: JSON-LD y referencias a bundles; es previo a esta auditoría y no debe entrar como cambio fuente |
| Nuevos documentales | AGENTS.md, todo el Markdown fuente de docs/, configuración VitePress, resultados, scripts, capturas y referencias históricas curadas |

### dist ya está versionado

Aunque .gitignore contiene dist/, git ls-files dist devuelve:

```text
dist/assets/clg-DhiTCHTU.jpeg
dist/assets/rpi-DDLAJPsT.jpg
dist/index.html
```

Ignorar no retira archivos ya seguidos. No se retira ninguno aquí. El artefacto original tiene referencias a bundles diferentes del build actual y no es la referencia para publicar; el build de CI debe regenerarlo.

### Documentación y temporales

- git ls-files docs no devuelve archivos: la documentación todavía no está versionada.
- docs/.gitignore excluye salida/caché VitePress; los perfiles nuevos de navegador están excluidos por .gitignore locales.
- Los directorios docs/evidencias/PYP-*/build-temporal/ siguen apareciendo como nuevos, salvo subdirectorios llamados dist que ya quedan ignorados. Antes del commit conviene añadir una exclusión explícita para evidencias/**/build-temporal/ en docs/.gitignore, en una intervención autorizada.
- Conservar Markdown, prompts completos, capturas, resultados JSON, scripts de comprobación y referencias previas; no confundir evidencias con bundles compilados.
- 02_PROMPT_001_AUDITORIA_NAVBAR.md y 03_PROMPT_002_NAVBAR_EDGE.md son copias byte a byte de sus archivos docs/prompts correspondientes. Se excluyen de la propuesta nueva para evitar duplicarlos; no se borran del disco.
- 01_ESTADO_Y_BITACORA.md y 04_BITACORA_001_RESULTADO.md son registros originales históricos. Se propone conservarlos en el commit como legados hasta aprobar su migración documental; no se mueven ni borran durante esta auditoría.
- Las copias *.before.txt y package*.before.json se conservan como evidencia del estado anterior. Algunas replican contenidos que podrían recuperarse de Git, pero otras documentan archivos aún no seguidos; no se eliminan automáticamente.

Inventario completo: `inventario.json` (inventario.json), `git-inicial.json` (comandos iniciales), `generados-no-incluir.txt` (generados excluidos).

## C. Hallazgos por prioridad

| Prioridad | Hallazgo | Acción propuesta, no ejecutada |
| --- | --- | --- |
| P1 | Archivos fuente importados aún sin seguimiento y numerosos builds nuevos | Seleccionar el manifiesto, excluir compilaciones; no usar staging indiscriminado |
| P1 | Plantilla estática Netlify incompleta | Declarar empresa, solucion y bot-field con nombres coherentes y comprobar recepción real |
| P1 — revisión de riesgo | 19 dependencias señaladas; 2 moderadas en producción, 17 de desarrollo incluidas 12 altas | Plan de actualización por etapas y evaluación de exposición; no aplicar audit fix --force |
| P2 | /#% deja la aplicación en blanco por URIError | Manejar decodeURIComponent inválido en scrollToSection sin romper React |
| P2 | Rutas con barra final pierden aria-current/resaltado | Normalizar pathname antes de comparar la solución activa |
| P2 | IoT y Edge no tienen metadatos iniciales propios; sitemap solo incluye inicio | Generar heads por las cuatro rutas y ampliar sitemap sin cambiar textos comerciales |
| P2 — documentación | Adjuntos JSON/TXT/PNG enlazados no se copian al HTML estático | Corregir publicación de adjuntos en una tarea documental autorizada |
| P2 | Configuración real Netlify no verificable desde el repositorio | Confirmar build, publish directory, Node, form detection y despliegue de prueba autorizado |
| P3 | Whitespace previo en src/main.jsx:45 | Corregir únicamente en una tarea autorizada antes del commit |
| P3 | /favicon.svg está declarado pero no existe en public ni en el artefacto | Añadir/referenciar el recurso oficial adecuado posteriormente |
| P3 | Tailwind declara theme dos veces; nota AGENTS sobre PYP-005 quedó histórica | Revisar mantenimiento de configuración e instrucciones sin mezclarlo con navegación |

No se encontró netlify.toml ni configuración local equivalente de build/publicación. Esto no demuestra que falte configuración en el panel de Netlify.

## D. Validaciones y seguridad

### Artefacto comercial

Vite 6.4.1: compilación temporal con salida 0, 1600 módulos, 14.54 segundos. Después se ejecutó scripts/generar-seo.mjs sin cambiarlo, desde el directorio temporal cuyo dist es aislado: salida 0 y HTML específico de Monitoreo generado. Así se comprobaron ambas etapas del script comercial sin tocar dist del proyecto.

Comandos ejecutados:

```powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-009/build-temporal/comercial/dist
# Desde docs/evidencias/PYP-009/build-temporal/comercial:
node D:/promate/web/pyp-web/scripts/generar-seo.mjs
```

`browser-audit.json` (Auditoría de navegador del artefacto): 88 comprobaciones ordinarias pasadas en 375 y 1440 px, cuatro rutas, títulos/descripciones/canonical/OG después de React, anclas locales visibles, ausencia de duplicados, menú y foco. Se registraron aparte las tres rutas con barra final sin estado activo y la excepción reproducida con hash inválido. La excepción no se oculta como un resultado exitoso.

Los enlaces externos se verificaron por sus destinos y atributos. No se abrió Plataforma ni se enviaron formularios. El servidor usado fue Vite preview, no un emulador de Netlify; no acredita el comportamiento de producción.

VitePress 1.6.4 compiló temporalmente con salida 0 mediante CLI directa en 22.08 segundos. El control adicional de enlaces detectó adjuntos no copiados, detallados abajo; una compilación correcta no acredita esos enlaces.

Whitespace: git diff --check global devuelve 2 por src/main.jsx:45. La auditoría no lo corrige. Persisten avisos de LF/CRLF y datos antiguos de compatibilidad.

### npm audit

npm audit --json: salida 1 por vulnerabilidades; 19 dependencias señaladas: 12 altas, 6 moderadas y 1 baja, sin críticas. npm audit --omit=dev --json: salida 1; 2 moderadas (react-router y react-router-dom). Las entradas propagadas por dependencias no equivalen a 19 CVE distintos.

| Dependencia | Severidad npm | Uso según lock/audit | Corrección informada |
| --- | --- | --- | --- |
| @babel/core | low | Desarrollo | npm indica corrección compatible; verificar árbol |
| baseline-browser-mapping | moderate | Desarrollo | npm indica corrección compatible; verificar árbol |
| brace-expansion | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| braces | high | Desarrollo | tailwindcss 4.3.3 (mayor) |
| browserslist | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| chokidar | high | Desarrollo | tailwindcss 4.3.3 (mayor) |
| esbuild | moderate | Desarrollo | Sin corrección automática propuesta |
| fast-glob | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| glob | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| micromatch | high | Desarrollo | tailwindcss 4.3.3 (mayor) |
| minimatch | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| picomatch | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| postcss-selector-parser | moderate | Desarrollo | npm indica corrección compatible; verificar árbol |
| react-router | moderate | Producción | react-router-dom 7.18.4 (mayor) |
| react-router-dom | moderate | Producción | react-router-dom 7.18.4 (mayor) |
| rollup | high | Desarrollo | npm indica corrección compatible; verificar árbol |
| tailwindcss | high | Desarrollo | tailwindcss 4.3.3 (mayor) |
| vite | high | Desarrollo | Sin corrección automática propuesta |
| vitepress | moderate | Desarrollo | Sin corrección automática propuesta |

Informes: `npm-audit.json` (audit completo), `npm-audit-produccion.json` (solo producción). Incluyen referencias oficiales a los avisos. Los problemas de herramientas afectan entorno de desarrollo/build; no se atribuye automáticamente explotación al sitio estático público. Los avisos de Router requieren evaluar las condiciones de uso: no se realizó una prueba de explotación y este sitio no implementa SSR de React Router.

### Versiones candidatas consultadas, sin instalar

| Dependencia | Instalada | Wanted dentro del rango | Latest del registro |
| --- | --- | --- | --- |
| @vitejs/plugin-react | 5.0.4 | 5.2.0 | 6.1.2 |
| autoprefixer | 10.4.21 | 10.6.1 | 10.6.1 |
| lucide-react | 0.471.2 | 0.471.2 | 1.59.0 |
| react | 18.3.1 | 18.3.1 | 19.3.1 |
| react-dom | 18.3.1 | 18.3.1 | 19.3.1 |
| react-router-dom | 6.30.6 | 6.30.6 | 7.18.4 |
| tailwindcss | 3.4.18 | 3.4.19 | 4.3.3 |
| vite | 6.4.1 | 6.4.4 | 8.3.4 |

Fuente: `npm-outdated.json` (npm outdated), consulta del registro de esta intervención. Wanted significa compatibilidad de rango semántico, no garantía de ausencia de regresión.

Node observado: 22.15.1; npm 10.9.2. Se consultaron también engines: Vite 6.4.4 admite Node >=22, plugin-react 5.2.0 >=22.12, Tailwind 3.4.19 >=14 y Autoprefixer 10.6.1 >=14 en esta rama de Node. El Node local cumple esos candidatos.

Plan futuro: primero evaluar Vite 6.4.4, plugin-react 5.2.0, Autoprefixer 10.6.1 y actualizaciones transitivas compatibles. Vite 6 no sustituye el Vite 5 anidado de VitePress. Tailwind 3.4.19 no elimina todos los avisos del árbol. React Router 7.18.4, Tailwind 4.3.3, React 19, Lucide 1 y Vite 8 son migraciones que requieren revisión y pruebas; no son parches intercambiables. VitePress 1.6.4 sigue señalado a través de Vite y npm no propone una corrección automática. No se instaló ni actualizó ningún paquete.

## E. SEO y Netlify

| Ruta | HTML inicial propio | Title/description/canonical/OG iniciales | React tras montar | Sitemap |
| --- | --- | --- | --- | --- |
| / | Sí | De inicio | Correctos | Sí |
| /monitoreo-energetico | Sí, generado | Propios de Monitoreo | Correctos | No |
| /iot-industrial | No; fallback al inicio | Inicialmente de inicio, canonical incorrecto para IoT | Correctos | No |
| /automatizacion-edge | No; fallback al inicio | Inicialmente de inicio, canonical incorrecto para Edge | Correctos | No |

Evidencias: `seo-html-inicial.json` (HTML inicial) y snapshots de navegador en browser-audit.json. Los hashes no se incorporan al canonical. El HTML inicial de Monitoreo define OG propio, aunque su descripción OG no es idéntica a la que establece Seo.jsx; inicio también usa una variante estática de OG. No hay og:image declarado. El contenido principal sigue renderizándose en cliente; generar metadatos iniciales no equivale a prerenderizar el contenido React.

Recomendación SEO: extender el generador a las cuatro rutas y mantener una fuente de metadatos común con Seo.jsx, conservando títulos y textos aprobados. Actualizar public/sitemap.xml con las cuatro URLs canónicas. Evitar depender de que un rastreador social ejecute JavaScript.

La regla public/_redirects es /* /index.html 200 y se copia al build. Es adecuada como fallback SPA. Según la [documentación oficial de Netlify](https://docs.netlify.com/manage/routing/redirects/rewrites-proxies/#history-pushstate-and-single-page-apps), los archivos existentes prevalecen salvo reglas forzadas; mantener esta propiedad para servir HTML específico de cada ruta cuando exista.

Confirmar en Netlify: comando npm run build, publicación de dist comercial y Node compatible; mantener VitePress fuera del artefacto comercial. No se puede confirmar el panel ni la producción con los archivos disponibles.

Formulario: faltan empresa, solucion y bot-field en la declaración estática, aunque existen en React. La [guía oficial de formularios JavaScript de Netlify](https://docs.netlify.com/manage/forms/setup/#work-with-javascript-rendered-forms) pide declarar los mismos nombres en el HTML detectable. Completar el esquema y probar recepción/honeypot en un entorno autorizado; no afirmar que está roto o que entrega datos sin esa prueba. `formulario-netlify.json` (Comparación de campos).

### Adjuntos documentales

La comprobación inicial encontró 25 destinos de adjuntos inexistentes en el build: 14 pertenecen a PYP-006/007/008 y 11 al borrador PYP-009. Las páginas Markdown y los recursos de la interfaz sí se generan. Los adjuntos originales existen en docs/evidencias y no se borran.

En el informe nuevo se sustituyen los hipervínculos JSON/TXT por nombres de archivo y se añade una propuesta de commit en Markdown navegable. No se cambian los registros anteriores ni la configuración para ocultar sus 14 enlaces pendientes. El detalle está en enlaces-documentacion.json.

La [guía oficial de assets VitePress 1.6.4](https://vuejs.github.io/vitepress/v1/guide/asset-handling) distingue imágenes embebidas de archivos enlazados. En una tarea posterior: usar sintaxis de imagen para las capturas o un proceso explícito de copia de adjuntos al build, conservando docs/evidencias como fuente y revisando las URLs. No basta con que el Markdown compile.

## F. Propuesta exacta del futuro commit

Listas de rutas existentes, no comandos ejecutados:

- [Propuesta navegable con las dos listas completas](./propuesta-commit.md).
- Manifiestos de texto equivalentes: commit-web.txt y commit-documentacion.txt en esta carpeta.

La unión constituye la propuesta exacta sobre el estado actual. Se incluyen las fuentes nuevas que requieren los imports, el registro PYP-009 y evidencias de diagnóstico. No se incluyen dist ni builds temporales, perfiles, caché o salida VitePress. Los listados no ejecutan staging y no incorporan automáticamente correcciones futuras.

No usar git add . ni añadir docs/ recursivamente sin exclusiones mientras los builds sigan apareciendo. Eliminar dist del índice debe ser otra acción explícitamente autorizada; esta propuesta solo omite su modificación actual y no propone bajas. Tras corregir hallazgos, revisar nuevamente la lista y el diff, validar builds y solicitar la autorización de commit/publicación por separado.

## G. Riesgos y pendientes

Resolver o aceptar conscientemente los hallazgos antes de publicar. Pendientes: recepción real Netlify, panel de build, revisión de dependencias, metadatos iniciales/sitemap, robustez de hash, estado activo con barra final, whitespace y selección cuidadosa de archivos. Pruebas humanas con dispositivos físicos, lector de pantalla y otros navegadores permanecen fuera de esta ejecución.

## H. Estado final

Los 121 hashes protegidos coinciden, incluido .git/index: fuentes, configuración comercial, dependencias y salidas existentes siguen intactas. El staging está vacío. La propuesta consta de 9 archivos fuente web y 100 archivos documentales/dependencias/históricos.

El estado corto mantiene las ocho modificaciones previas y los archivos nuevos de navegación/documentación. No se corrigió ninguna funcionalidad, vulnerabilidad o archivo SEO. git-final.json y validacion-final.json guardan las comprobaciones realizadas.
