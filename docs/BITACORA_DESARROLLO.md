# Bitácora de desarrollo

## Antecedentes conservados

Los registros originales permanecen en la raíz del repositorio:

- Estado y bitácora inicial: `01_ESTADO_Y_BITACORA.md` en la raíz del repositorio.
- Resultado PYP-001: `04_BITACORA_001_RESULTADO.md` en la raíz del repositorio.

No se reemplazan sus contenidos ni se reconstruyen registros ausentes.

## PYP-005 — Organización documental — 2026-10-17

- Objetivo: establecer ubicaciones únicas para documentación, conservar prompts e instrucciones futuras.
- [Prompt completo de esta intervención](./prompts/PYP-005.md).
- Estado inicial: rama main; cambios previos en dist/index.html, src/main.jsx y src/components/Seo.jsx; Navbar y Edge sin seguimiento. No existían docs/ ni AGENTS.md.
- Archivos: AGENTS.md; docs/index.md; esta bitácora; docs/prompts/index.md, PYP-001.md, PYP-002.md, PYP-005.md; docs/evidencias/index.md; docs/arquitectura/index.md; docs/.vitepress/config.mjs.
- Explicación técnica: estructura Markdown y configuración documental separadas del sitio comercial; copias literales de los prompts disponibles sin borrar sus originales.
- Validaciones: búsqueda de Markdown y revisión estática de integración Navbar. Copias verificadas con SHA-256 durante la creación.
- [Evidencias](./evidencias/index.md).
- Incidencias: PYP-004 no implementado en Monitoreo ni IoT; prompt original PYP-004 no encontrado. Se mantiene la condición de detener su instalación indicada en el prompt inicial PYP-005.
- Pendientes: completar PYP-004; instalar una versión compatible de VitePress; añadir comandos docs:dev/docs:build/docs:preview; validar enlaces con VitePress, servidor, búsqueda local y build sin modificar dist comercial. La configuración preparada todavía no fue ejecutada.
- Aprobación: organización autorizada por el usuario; instalación condicionada. Commit, push y publicación: no ejecutados.

### Verificación documental realizada

La sintaxis de docs/.vitepress/config.mjs pasó `node --check`. Los 11 enlaces Markdown iniciales resolvieron en disco y los archivos se leyeron como UTF-8 sin caracteres de sustitución. Las referencias a documentos históricos fuera de docs/ se dejaron como nombres de archivo para evitar rutas fuera de la raíz de VitePress. No se ejecutó VitePress ni se afirma validación en navegador.

## PYP-004 — Integración de Navbar en páginas interiores — 2026-10-17

Entrada añadida después de PYP-005 porque esta intervención se ejecutó posteriormente; se conserva el historial anterior.

- Objetivo: usar Navbar en Monitoreo Energético e IoT Industrial/LoRaWAN con el diseño aprobado de Edge.
- [Prompt completo recibido](./prompts/PYP-004.md).
- Estado inicial: rama main; Monitoreo e IoT tenían encabezados propios. Existían cambios en dist/index.html, main.jsx y Seo.jsx, documentación y los archivos Navbar/Edge sin seguimiento. Se leyeron AGENTS.md y las tres páginas interiores.
- Archivos modificados: src/components/Navbar.jsx; src/pages/MonitoreoEnergetico.jsx; src/pages/IoTIndustrialLoRaWAN.jsx; docs/prompts/index.md; esta bitácora.
- Archivos creados: docs/prompts/PYP-004.md; evidencias en docs/evidencias/PYP-004/ (referencias previas, hashes, resultado y build temporal).
- Explicación técnica: Navbar admite children opcional para conservar los CTA originales. Ambas páginas pasan Inicio como enlace y su botón Hablemos como contenido. Se reutilizan logo, estructura, paleta y comportamiento responsive de Edge; se eliminan los imports de logo/ArrowLeft que quedaron sin uso. No se añadieron enlaces, menús ni dependencias.
- Pruebas ejecutadas y resultados: compilación Vite temporal satisfactoria; una Navbar por página; contenido desde main intacto; IDs sin cambios; anclas locales con destino; renderizado estático de la barra Edge idéntico antes/después; 47 archivos protegidos con hashes iguales. Revisión de diff y estado Git realizada.
- [Evidencias y comando exacto](./evidencias/PYP-004/resultado.md).
- Incidencias: avisos de datos de compatibilidad antiguos y normalización LF/CRLF. Sin errores de build. No se modificaron dependencias ni configuración para atender los avisos.
- Pendientes: pruebas manuales desktop/móvil, teclado, scroll y enlaces en navegador. PYP-005 puede continuar con su instalación y validación documental en una intervención posterior; no se ejecuta aquí.
- Estado Git al validar: se mantienen los cambios previos; aparecen modificadas MonitoreoEnergetico.jsx e IoTIndustrialLoRaWAN.jsx. Navbar continúa sin seguimiento, ahora con el espacio opcional de CTA; docs/ sigue sin seguimiento. Nada agregado al staging.
- Aprobación: implementación autorizada por el prompt PYP-004. Commit, push y despliegue: no ejecutados.

## Antecedentes PYP-001 y PYP-002 — incorporados el 2026-10-17

Resúmenes retrospectivos incorporados durante PYP-005B; no sustituyen el historial anterior ni representan nuevas ejecuciones de esas tareas.

### PYP-001 — Auditoría previa de navegación — 2026-10-17

- Objetivo: diagnosticar las barras, rutas y SEO antes de extraer Navbar.
- [Prompt original](./prompts/PYP-001.md).
- Estado inicial: encabezados independientes; cambios previos en Git que debían conservarse.
- Archivos modificados en la intervención: ninguno; auditoría de solo lectura.
- Resultado histórico: cuatro rutas con Seo propio, diferencias de navegación y plan incremental. Build y pruebas visuales no ejecutados.
- Evidencia histórica: documento original 04_BITACORA_001_RESULTADO.md en la raíz; contenido consultado durante esta sesión.
- Incidencias y pendientes: navegación móvil, SEO estático, sitemap, formulario y configuración Tailwind quedaron como asuntos separados.
- Aprobación: diagnóstico autorizado; implementación posterior mediante PYP-002. Commit y publicación: no ejecutados por Codex.

### PYP-002 — Extracción inicial de Navbar en Edge — 2026-10-17

- Objetivo: extraer el encabezado aprobado y usarlo únicamente en Edge.
- [Prompt original](./prompts/PYP-002.md).
- Estado inicial: Edge tenía encabezado propio y era un archivo sin seguimiento; main.jsx y Seo.jsx contenían cambios previos.
- Archivos: se creó src/components/Navbar.jsx y se modificó src/pages/AutomatizacionEdge.jsx.
- Explicación: extracción del encabezado con props links y ariaLabel, preservando destinos y clases.
- Resultados históricos según el informe de Codex de esta conversación: build Vite temporal satisfactorio, una Navbar, destinos de ancla existentes y 28 archivos protegidos sin cambios. No se repitieron estas pruebas durante PYP-005B.
- Evidencia disponible: informe PYP-002 en esta conversación; no se dispone de un registro Markdown original separado del resultado PYP-002 para copiar. No se fabrica.
- Incidencias: avisos de compatibilidad antiguos; quedaron pendientes pruebas de teclado, interacción y revisión visual.
- Aprobación: extracción autorizada. Commit, push y publicación: no ejecutados por Codex.

## PYP-005B — Finalización documental con VitePress — 2026-10-17

- Objetivo: consultar localmente prompts, bitácora, arquitectura y evidencias sin cambiar la web comercial.
- [Prompt completo](./prompts/PYP-005B.md).
- Estado inicial: PYP-004 implementado y documentado; docs/ y AGENTS.md existentes; cuatro prompts conservados. Cambios previos en dist/index.html, main.jsx, Seo.jsx y las dos páginas migradas; Navbar/Edge y documentación sin seguimiento.
- Implementación: VitePress 1.6.4 fijado como dependencia de desarrollo; scripts docs, docs:build y docs:preview, raíz docs/, salida docs/.vitepress/dist. Barra lateral y búsqueda local. Scripts comerciales conservados.
- Archivos afectados: package.json; package-lock.json; docs/.gitignore; docs/.vitepress/config.mjs; docs/index.md; docs/prompts/index.md; docs/prompts/PYP-005B.md; docs/arquitectura/index.md; docs/evidencias/index.md; docs/evidencias/PYP-005B/; esta bitácora.
- Compatibilidad verificada: Node 22.15.1 y npm 10.9.2; guía oficial VitePress 1.x (Node >=18). VitePress utiliza Vite 5.4.21 anidado; Vite comercial permanece 6.4.1 y los rangos existentes se conservan.
- Incidencias de instalación: npm añadió 113 paquetes y actualizó siete dependencias transitivas dentro de sus rangos; se documentan en evidencias. npm audit informó 19 vulnerabilidades (1 baja, 6 moderadas, 12 altas), incluida la cadena Vite/VitePress. No se ejecutó audit fix ni se cambiaron versiones mayores comerciales.
- Interpretación del prompt: los tres comandos repetidos npm run docs se implementan como desarrollo, build y preview con nombres independientes.
- [Validaciones y evidencias](./evidencias/PYP-005B/resultado.md): instalación y build completados; servidores de desarrollo y preview iniciados; 12 rutas HTTP verificadas en ambos; 13 páginas y 359 referencias internas validadas; índice de búsqueda local generado; build comercial temporal correcto; hashes de 56 archivos protegidos sin cambios.
- Aprobación: instalación y configuración autorizadas por PYP-005B. Sin commit, push ni despliegue.

### Cierre de PYP-005B

Documentación local operativa en http://127.0.0.1:5174/. Compilación: `npm run docs:build`; previsualización: `npm run docs:preview` en http://127.0.0.1:4174/. Los servidores se iniciaron en esta sesión y pueden reiniciarse con esos comandos.

`git diff --check` global señaló únicamente whitespace preexistente en src/main.jsx:45; package.json y package-lock.json pasan. No se modificó main.jsx. Pendientes: revisión visual, interacción de búsqueda y revisión separada de las 19 vulnerabilidades reportadas por npm. Sin commit, push ni despliegue. El estado Git conserva los archivos previos y añade package.json/package-lock.json como modificados, junto con los cambios documentales dentro de docs/.

## PYP-006 — Corrección funcional de navegación corporativa — 2026-10-17

- [Prompt completo](./prompts/PYP-006.md).
- Objetivo: navegación corporativa común y accesible en las tres páginas interiores.
- Problema informado por el usuario: Edge mostraba varios enlaces mientras Monitoreo e IoT conservaban prácticamente la navegación antigua.
- Causa técnica: PYP-004 reutilizaba el componente pero cada página pasaba enlaces distintos; compartir estructura no centralizaba destinos corporativos. Este registro precisa el alcance de PYP-004 sin borrar su entrada histórica.
- Estado inicial: rama main con cambios previos en dist/index.html, package.json/lock, main.jsx, Seo.jsx y las páginas Monitoreo/IoT; Navbar, Edge y docs sin seguimiento. Se preservaron todos.
- Solución: destinos comunes centralizados en Navbar; Soluciones desplegable, solución activa, CTA Hablemos común y enlaces locales secundarios de Edge. Diseño adaptable, teclado, cierre y manejo de foco. Anclas entre páginas con espera del montaje y compensación del sticky, sin editar App.jsx.
- Archivos de código modificados: src/components/Navbar.jsx; src/pages/MonitoreoEnergetico.jsx; src/pages/IoTIndustrialLoRaWAN.jsx; src/pages/AutomatizacionEdge.jsx. Solo se ajustan las integraciones de Navbar en las páginas; contenidos técnicos, imágenes y contactos del cuerpo intactos.
- Documentación: docs/prompts/PYP-006.md; docs/prompts/index.md; docs/.vitepress/config.mjs; docs/arquitectura/index.md; docs/evidencias/index.md; docs/evidencias/PYP-006/; esta bitácora.
- [Evidencias y pruebas](./evidencias/PYP-006/resultado.md): ejecución Edge headless de 201 comprobaciones; capturas desktop/móvil; rutas y anclas verificadas; contenido desde main e IDs conservados en las tres páginas; hashes de 46 archivos protegidos coincidentes. Compilación final Vite temporal correcta (1598 módulos) y VitePress correcta; el diseño final volvió a pasar las 201 pruebas.
- Incidencias: dos errores iniciales del script CDP corregidos (selector y envío de Enter); sin cambios de lógica de menú motivados por esos errores. Advertencias existentes de datos de compatibilidad antiguos y LF/CRLF. Se revisaron diffs respecto al estado previo, incluyendo archivos aún sin seguimiento.
- Pendientes manuales: validación humana con dispositivos físicos y lector de pantalla; otros navegadores. Producción/OEE y Agua/Vertimientos quedan como proyectos futuros sin enlaces activos.
- Aprobación: implementación autorizada por PYP-006. Sin commit, push ni despliegue; no se instalaron dependencias.

### Cierre de PYP-006

Build Vite final temporal y build VitePress: salida 0. Diff de archivos modificados sin errores de whitespace; archivos nuevos comparados con referencias previas. Los 46 hashes protegidos siguen iguales tras los builds. Capturas desktop/móvil revisadas. Pruebas humanas en dispositivos físicos, otros navegadores y lector de pantalla siguen pendientes.

Estado Git: se mantienen las modificaciones previas y los archivos sin seguimiento. Los cambios de PYP-006 se limitan a Navbar, sus tres integraciones y documentación. Sin cambios de dependencias, staging, commit, push ni despliegue.

## PYP-007 — Navegación local de páginas interiores — 2026-10-17

- [Prompt completo](./prompts/PYP-007.md).
- Objetivo/problema: diferenciar navegación corporativa y navegación local; Monitoreo/IoT carecían de la segunda y Edge permitía varias filas en móvil.
- Estado inicial: rama main con los cambios de intervenciones anteriores sin confirmar; se leyeron AGENTS.md, Navbar y las tres páginas y se conservaron referencias antes de editar.
- Diseño UX: SectionNav independiente, composición en un único encabezado sticky, una sola fila subordinada y desplazamiento horizontal nativo. Etiqueta En esta página, foco visible y revelación inmediata del enlace enfocado. Sin resaltado de sección activa para evitar estados que reflejen solo el último clic.
- Secciones reales: Monitoreo — proyectos, lps, alkosto, can-j1939, contacto; IoT — soluciones, contacto; Edge — capacidades, hardware, j1939, aplicaciones, contacto. No se añadieron ID ni se inventaron secciones.
- Archivos creados: src/components/SectionNav.jsx; src/utils/scrollToSection.js; docs/prompts/PYP-007.md; evidencias en docs/evidencias/PYP-007/.
- Archivos modificados: src/components/Navbar.jsx y sus tres páginas interiores; docs/prompts/index.md; docs/.vitepress/config.mjs; docs/evidencias/index.md; docs/arquitectura/index.md; esta bitácora.
- Explicación: Navbar conserva el marcado corporativo y aloja SectionNav mediante children. El helper compartido compensa la altura del encabezado, respeta movimiento reducido, enfoca el destino, maneja hash/historial y evita desplazamientos pendientes en otra ruta.
- Pruebas: 283 comprobaciones de navegación local y 201 de regresión corporativa con Edge headless en cinco anchos; seis capturas locales generadas, dos inspeccionadas directamente. Contenido desde main e IDs intactos en las tres páginas; 111 hashes protegidos coincidentes. Compilación comercial temporal correcta (1600 módulos). VitePress compiló con salida 0. Se detectó que npm.ps1 omitía --outDir y regeneró su salida habitual; se restauraron exactamente los 65 archivos documentales anteriores mediante hashes, sin perder las fuentes actuales. Se usa la CLI directa para la salida temporal final.
- Incidencias: se detectó y corrigió un recorte real de 45 px del último enlace con Tab; se ajustaron selectores del verificador corporativo y el rango de una comparación estática. Advertencias existentes de compatibilidad y LF/CRLF; no se cambian dependencias.
- [Evidencias completas](./evidencias/PYP-007/resultado.md).
- Pendientes: dispositivos físicos, gesto táctil, lector de pantalla y otros navegadores.
- Aprobación: cambios autorizados por PYP-007. No se tocaron App.jsx, rutas, SEO, formularios, contenido ni dependencias. Sin commit, push ni despliegue.

### Cierre de PYP-007

283 comprobaciones locales y 201 corporativas pasadas; compilación comercial temporal y VitePress correctas. Diff de archivos modificados y estado Git revisados. Incidencia de npm.ps1 corregida mediante CLI directa: los 65 archivos documentales generados anteriores se restauraron con hashes idénticos; dist comercial permaneció intacto. Se conservan los 111 archivos protegidos y los contenidos de las tres páginas.

Pendientes: dispositivos físicos, gesto táctil, lector de pantalla y otros navegadores. Estado Git: conserva las modificaciones previas; SectionNav.jsx y src/utils/scrollToSection.js aparecen como nuevos, junto con los cambios documentales dentro de docs/. Sin staging, commit, push ni despliegue.

Comprobación final PYP-007: VitePress mediante CLI directa y salida temporal terminó con salida 0; 111 hashes protegidos coincidentes. git diff --check de los archivos modificados pasa; la comprobación global conserva el whitespace previo en src/main.jsx:45, sin corregirlo fuera del alcance.

### Validación posterior de PYP-007 — 2026-10-17

"El usuario confirmó que las tres páginas interiores muestran correctamente las barras y que la navegación funciona."

Nota incorporada por instrucción expresa PYP-008, sin atribuir dispositivos, navegadores ni pruebas adicionales al usuario.

## PYP-008 — Navegación compartida en la página principal — 2026-10-17

- [Prompt completo](./prompts/PYP-008.md).
- Objetivo: integrar la navegación aprobada de las páginas interiores en la homepage y registrar la validación posterior PYP-007 del usuario con sus palabras exactas.
- Estado inicial: rama main con cambios previos sin confirmar; App.jsx conservaba encabezado propio y scroll global de anclas. Se leyeron AGENTS.md y los componentes compartidos y se verificaron rutas e IDs reales.
- Código modificado: únicamente src/App.jsx. Sustituye el encabezado por Navbar + SectionNav y retira el efecto de scroll que competía con los componentes compartidos, el helper NavLink e imports ya sin uso. Estado del año conservado.
- Navegación: corporativa idéntica a las interiores; local Áreas de solución (#soluciones), Arquitectura (#arquitectura), RPI-MDFR (#rpi-mdfr) y Sectores (#sectores), sin duplicar Proyectos, Tecnología y Hablemos.
- Documentación creada/modificada: docs/prompts/PYP-008.md; docs/prompts/index.md; docs/.vitepress/config.mjs; docs/arquitectura/index.md; docs/evidencias/index.md; docs/evidencias/PYP-008/; esta bitácora. La nota de validación PYP-007 aparece antes de esta entrada, sin atribuir pruebas no declaradas al usuario.
- Pruebas: 156 comprobaciones Edge headless en cinco tamaños; capturas desktop/móvil generadas e inspeccionadas. Menú, teclado, rutas a las tres páginas interiores, Inicio, anclas del header/hero, historial, foco y movimiento reducido correctos. Formulario verificado sin enviarlo.
- Integridad: contenido desde main, formulario, footer e IDs literalmente intactos; 116 hashes protegidos coincidentes. Navbar, SectionNav, helper, interiores, main.jsx, Seo.jsx, dependencias y salidas existentes sin cambios.
- Compilación comercial temporal: salida 0, 1600 módulos. VitePress temporal mediante CLI directa también terminó con salida 0. Diff de App.jsx revisado, sin errores de whitespace.
- [Evidencias](./evidencias/PYP-008/resultado.md).
- Incidencias: avisos previos de compatibilidad y LF/CRLF; sin cambios de dependencias. No se repite el mecanismo npm.ps1 de salida temporal: se usa la CLI directa.
- Pendientes: validación humana PYP-008, dispositivos físicos, lector de pantalla y otros navegadores. No se prueba envío real de formularios ni disponibilidad remota de Plataforma.
- Aprobación: implementación autorizada por PYP-008; no implica aprobación visual posterior. Sin staging, commit, push ni despliegue.

### Cierre de PYP-008

156 pruebas de navegador pasadas, capturas desktop/móvil inspeccionadas, compilaciones comercial y VitePress temporales correctas. Los 116 hashes protegidos siguen iguales. git diff --check de los archivos modificados devuelve 0; global conserva el espacio final previo en main.jsx:45, sin tocarlo. Estado Git: App.jsx aparece modificado y docs/ contiene el registro nuevo; se conservan todos los cambios anteriores. Sin dependencias nuevas, staging, commit, push ni despliegue.

### Validación posterior de PYP-008 — 2026-10-17

El usuario confirmó que la navegación de PYP-008 funciona correctamente, según su instrucción PYP-009. No se le atribuyen pruebas específicas, dispositivos ni navegadores adicionales.

## PYP-009 — Auditoría de integración, Git y preparación de publicación — 2026-10-17

- [Prompt completo](./prompts/PYP-009.md).
- Objetivo: auditar el estado acumulado antes de commit/publicación, sin modificar funcionalidades ni publicar. La confirmación del usuario sobre PYP-008 se añadió como nota posterior a esa entrada.
- Estado inicial: main; 8 archivos seguidos modificados, 371 nuevos sin seguimiento y 293 artefactos temporales que no deben versionarse. dist contiene tres archivos seguidos y docs todavía no tiene archivos versionados.
- Archivos documentales modificados: esta bitácora, docs/prompts/index.md y docs/evidencias/index.md. Nuevos: docs/prompts/PYP-009.md y docs/evidencias/PYP-009/ (informe, inventarios, auditorías npm, pruebas y manifiestos propuestos). No se modifica código, SEO, rutas, dependencias ni configuración comercial.
- Hallazgos: Git requiere selección de fuentes nuevas y exclusión de generados; plantilla Netlify no declara empresa/solucion/bot-field; SEO inicial propio solo para inicio y Monitoreo y sitemap solo inicio; hash /#% provoca URIError y pantalla vacía; barras finales pierden solución activa; favicon faltante y whitespace previo.
- Validaciones: Vite temporal y generador SEO original en cwd aislado con salida 0; 88 comprobaciones ordinarias del artefacto con Edge headless a 375/1440 px; hallazgos negativos registrados por separado. npm audit señala 19 dependencias (12 altas, 6 moderadas, 1 baja), de ellas 2 moderadas en producción. npm outdated y engines consultados sin instalar paquetes. VitePress temporal con salida 0; comprobación adicional detecta adjuntos enlazados no copiados al build.
- [Informe y propuesta exacta de commit](./evidencias/PYP-009/informe.md).
- Incidencias/pendientes: no se corrigen los defectos encontrados por tratarse de auditoría. Confirmar configuración real y recepción de formularios en Netlify; planificar actualizaciones y correcciones SEO/robustez/Git con autorización posterior. No se abrió Plataforma ni se enviaron formularios.
- Estado de aprobación: auditoría autorizada; commit, push y publicación no autorizados ni ejecutados. No se ejecutó git add, reset ni clean.

### Cierre de PYP-009

Build Vite comercial, generador SEO original con cwd aislado y VitePress: salida 0. La comprobación HTML detectó adjuntos JSON/TXT/PNG no copiados: 14 enlaces de registros anteriores quedan pendientes; el nuevo informe referencia los adjuntos por nombre y ofrece un manifiesto Markdown navegable. No se modifican los registros previos ni la configuración para resolverlo dentro de la auditoría.

88 comprobaciones ordinarias del artefacto pasadas; barras finales sin activo y hash inválido que deja React en blanco registrados aparte. npm audit: 19 dependencias, 2 moderadas de producción. Se proponen 9 archivos web y 100 documentales/dependencias/históricos, sin staging. Los 121 hashes protegidos, incluido el índice Git, siguen iguales; global diff --check conserva el whitespace previo en main.jsx:45. Sin cambios de código, dependencias, SEO o configuración de publicación; sin add, commit, reset, clean, push ni despliegue.

## PYP-010 — Organización del repositorio y control de archivos — 2026-10-17

- Objetivo: clasificar fuentes/documentación/generados sin perder cambios. [Prompt completo](./prompts/PYP-010.md).
- Estado inicial: main; ocho archivos seguidos modificados y 483 sin seguimiento, 379 temporales (14.836.856 bytes). Auditoría AGENTS/PYP-009 previa a las modificaciones.
- Implementación: exclusiones acotadas para builds/perfiles de evidencias y metadatos/swap. Reglas anteriores y VitePress conservadas.
- Archivos: .gitignore, esta bitácora, docs/prompts/index.md; nuevos docs/prompts/PYP-010.md y docs/evidencias/PYP-010/ (informe, evidencia inicial, manifiesto, validación final).
- [Informe y propuesta futura](./evidencias/PYP-010/informe.md). Evidencia inicial: inventario por directorio/extensión y hashes comprimidos en estado-inicial.base64.
- Pendientes: tres archivos dist ya seguidos; retirar solo del índice en futura intervención autorizada. Revisar duplicados raíz, respaldo Appcopia, cambios previos SEO/main/dependencias y riesgos PYP-009.
- Aprobación: documentación y reglas autorizadas; sin cambios funcionales, eliminación, staging, commit, push ni publicación. Validaciones reales al cierre.


### Cierre de validación — PYP-010

642 archivos inventariados comparados por SHA-256: ninguna eliminación ni cambio fuera de .gitignore, bitácora e índice de prompts autorizados. El inventario excluye .git, node_modules, perfiles de navegador y carpetas cache. Los 17 archivos de dist conservan sus hashes y el índice Git permanece idéntico. Los 379 artefactos temporales quedan ignorados y los 104 archivos previos conservables permanecen visibles. Reglas de node_modules, VitePress, perfiles y metadatos verificadas con git check-ignore.

Git diff --check de las rutas afectadas: salida 0; inspección adicional de whitespace en archivos nuevos: sin incidencias. El chequeo global conserva el espacio final previo en src/main.jsx:45 (salida 2), sin corregirlo. Estado final: nueve archivos seguidos modificados (ocho previos más .gitignore), 109 archivos sin seguimiento incluidos los registros PYP-010, sin staging. Manifiesto propuesto: 115 rutas, ninguna faltante. No se ejecutaron builds ni pruebas visuales por ser cambios documentales/exclusiones. Sin add, rm, clean, reset, commit, push ni despliegue.

## PYP-011 — Corrección y validación del formulario Netlify — 2026-10-17

- Objetivo: alinear los campos del formulario React con la declaración HTML de Netlify. [Prompt completo](./prompts/PYP-011.md).
- Estado inicial: main; nueve archivos seguidos modificados y archivos nuevos previos. Plantilla index.html incompleta: faltaban empresa, solucion y bot-field; React ya los incluía. POST nativo, nombre contacto-pyp y honeypot existentes. Estado/hashes guardados antes de editar.
- Implementación: tres controles añadidos únicamente a la plantilla oculta de index.html. App.jsx, diseño, textos, validación, navegación, SEO, rutas y dependencias intactos.
- Archivos: index.html; bitácora, índice de prompts y arquitectura; nuevos prompt PYP-011 y docs/evidencias/PYP-011/ (resultado, estado inicial, HTML anterior, script de navegador, JSON, capturas y validación final). Build y perfil temporal ignorados.
- Validaciones: compilación Vite temporal (1600 módulos, salida 0) y generador SEO en cwd aislado (0). Edge 375/1440: 34 comprobaciones; esquema estático/React, required, correo inválido, etiquetas, teclado, layout y codificación. Dos POST interceptados y respondidos sintéticamente con 200/500, sin llegar a Netlify. Capturas inspeccionadas. [Resultado completo](./evidencias/PYP-011/resultado.md).
- Mensajes: se mantiene el envío nativo y la respuesta del servidor; no existen mensajes propios de éxito/error. Una respuesta sintética no acredita recepción ni antispam reales.
- Incidencias/pendientes: confirmar form detection y configuración del panel, despliegue de prueba y recepción/notificaciones/honeypot/respuestas reales solo con autorización. Avisos previos de compatibilidad y whitespace no corregidos. No se compila VitePress ni se actualizan manifiestos históricos de commit.
- Aprobación: corrección y pruebas locales autorizadas; sin envíos reales, staging, commit, push ni publicación. Integridad/whitespace/estado final al cierre y en validacion-final.json.

### Cierre PYP-011

647 archivos existentes inventariados: ninguna eliminación ni cambio inesperado fuera de las cuatro rutas autorizadas (index.html y tres documentos). Se excluyen de este inventario .git, node_modules, browser-profile y cache. App.jsx permanece idéntico por hash; el HTML solo difiere en las tres líneas de campos añadidos. Los 17 archivos existentes de dist y el índice Git conservan sus hashes. HTML inicial y copia SEO de Monitoreo verificados: formulario oculto detectable, POST, nombre contacto-pyp, siete campos, honeypot y UTF-8 correctos. Detección efectiva/recepción en Netlify pendientes.

34 comprobaciones de navegador pasadas; sin envíos reales. Whitespace de rutas modificadas y archivos nuevos correcto, enlaces Markdown locales comprobados sin destinos inexistentes. El diff --check global sigue fallando únicamente por el espacio final previo de main.jsx:45; avisos LF/CRLF conservados. Git final: main, diez archivos seguidos modificados (nueve previos más index.html), 118 sin seguimiento al incluir esta evidencia. Sin staging, commit, push ni despliegue. Previsualización temporal detenida y navegador cerrado. No se compila VitePress.

## PYP-012 — Corrección de navegación y robustez de rutas — 2026-10-17

- [Prompt completo, incluida ampliación visual](./prompts/PYP-012.md). Objetivo: resolver URIError por hash inválido, estado activo con barra final y fondo verde de Soluciones en Inicio.
- Estado inicial: main, diez archivos seguidos modificados y nuevas fuentes/documentación previas. Diagnóstico y hashes guardados antes de modificar código: decodeURIComponent sin control en el helper; comparaciones literales de pathname en Navbar; fondo del botón condicionado a solución activa.
- Implementación: captura local de URIError; normalización de barras finales solo para comparar enlaces; tratamiento verde común del botón sin duplicar Navbar ni alterar el desplegable. No se modifican formulario, rutas, canonical, SEO, páginas ni dependencias.
- Archivos funcionales: src/utils/scrollToSection.js y src/components/Navbar.jsx. Documentación: esta bitácora, índice de prompts, arquitectura; nuevos prompt y docs/evidencias/PYP-012/ con diagnóstico, snapshots, pruebas, capturas y resultado.
- Compilación comercial temporal: Vite 1600 módulos, salida 0, 13.55 s; generador SEO original desde cwd aislado, salida 0. Avisos previos de compatibilidad sin actualizar paquetes. Pruebas Edge y VitePress: resultados reales al cierre.
- [Resultado y comparación visual Inicio/Monitoreo](./evidencias/PYP-012/resultado.md). Capturas anteriores obtenidas del artefacto PYP-011 sin modificarlo; capturas nuevas del artefacto temporal PYP-012.
- Pendientes: pruebas físicas/otros motores/lector de pantalla, recepción Netlify y riesgos ajenos de PYP-009; no se corrigen hallazgos fuera del alcance. Sin staging, commit, push ni despliegue. Aprobación: cambios y pruebas locales autorizados, publicación no autorizada.

### Resultado de navegador

177 comprobaciones pasadas en Edge headless a 375 y 1440 px; ninguna excepción ni console.error. Ocho capturas comparativas generadas; las cuatro posteriores se inspeccionaron visualmente. Fondo calculado idéntico Inicio/Monitoreo: rgba(166, 206, 57, 0.2); tratamiento anterior de las páginas interiores conservado. La captura anterior utiliza el artefacto PYP-011, que permanece intacto.

### Cierre de PYP-012

189 comprobaciones pasadas: 177 de navegación y 12 complementarias de hover, foco visible y contraste en Inicio/Monitoreo a 375/1440 px. Sin excepciones ni console.error en la navegación. Ocho capturas comparativas generadas; cuatro posteriores inspeccionadas. Contraste calculado sobre fondo blanco: aproximadamente 8,90–8,99:1, comprobación local complementaria sin certificación WCAG. Dos intentos iniciales de hover fallaron por sincronización/transición CSS; se conservaron en visual-states-first-attempt.json, visual-states-second-attempt.json y visual-states-failure.json. La prueba espera ahora el color final antes de comprobarlo; no se modificaron estilos para resolver esos fallos de prueba. Resultado definitivo en visual-states.json.

VitePress compiló con salida 0 en 24.81 s mediante build-docs.mjs: salida, cachés e intermediarios SSR aislados en build-temporal. Las ocho referencias de capturas del informe tienen assets existentes en el HTML compilado (VitePress deduplica la captura de Monitoreo desktop idéntica). Los cambios de cierre posteriores son documentales; no se repitió la compilación tras añadir este resultado.

Integridad: 673 archivos previos comparados por SHA-256, sin eliminaciones ni cambios fuera de Navbar, helper y los tres documentos autorizados. Se excluyen .git, node_modules, browser-profile y cache. Los 17 archivos de dist y 505 generados previos inventariados permanecen idénticos; App.jsx, formulario/index.html, main.jsx, SectionNav, páginas, SEO y dependencias conservan sus contenidos. Índice Git intacto.

Whitespace de rutas afectadas y archivos nuevos correcto; enlaces locales nuevos/actualizados sin destinos inexistentes. El chequeo global conserva el espacio final previo en main.jsx:45 (salida 2) y avisos LF/CRLF. Git final: main, diez archivos seguidos modificados previos y 142 sin seguimiento al incluir validacion-final.json. Navbar y helper todavía aparecen como nuevos porque no estaban versionados; no se ejecuta staging. Evidencia completa en validacion-final.json. Sin dependencias nuevas, envíos de formularios, commit, push, reset, clean ni despliegue.

## PYP-013 — SEO técnico, metadatos y sitemap — 2026-10-17

- [Prompt completo](./prompts/PYP-013.md). Objetivo: SEO específico inicial/React para cuatro rutas y sitemap completo sin alterar contenido, navegación ni formulario.
- Estado inicial: main, diez archivos seguidos modificados y fuentes/documentación previas sin seguimiento. Solo Inicio/Monitoreo tenían HTML inicial propio, OG divergía de React, IoT/Edge dependían de JS, sitemap solo Inicio, sin imagen OG/Twitter Card. Auditoría AGENTS/bitácora/PYP-009/posteriores realizada; hashes y copias guardados antes de editar.
- Arquitectura: mapa compartido src/data/seo.js con textos originales; Seo.jsx y generador consumen los mismos datos. Postproceso de cuatro HTML por ruta solo en head, sin SSR ni nuevas dependencias. --outDir explícito para pruebas; build comercial existente conservado. Logo PNG oficial copiado a URL estable; sitemap cuatro canonical, robots y _redirects intactos.
- Archivos modificados: index.html, Seo.jsx, scripts/generar-seo.mjs, public/sitemap.xml y documentación (bitácora, índice y arquitectura). Nuevos: src/data/seo.js, public/og-pyp.png, prompt y docs/evidencias/PYP-013/.
- Pruebas: Vite temporal 1601 módulos, 15.77 s, salida 0; generador cuatro HTML; 14 controles de preservación/imagen/idempotencia/fallos de plantilla; 59 controles Edge 375/1440 sobre HTML inicial, React, cliente, canonical/OG, Forms, sitemap XML y robots. Sin errores de consola ni envíos. [Resultado y metadatos](./evidencias/PYP-013/resultado.md).
- Incidencias: vite preview sirve fallback en /ruta sin barra; se conserva el fallo y se valida con servidor de archivos/directorios local, sin afirmar validación del CDN. Puerto 5184 ocupado, prueba definitiva 5185. Avisos previos de compatibilidad y whitespace sin corregir. VitePress e integridad al cierre.
- Pendientes: comprobación Netlify real, configuración/cachés/normalización, imagen social y recepción Forms, solo con autorización. Riesgos ajenos PYP-009 sin cambios. Aprobación: SEO y pruebas locales autorizados; sin publicación, instalación, staging, commit ni push.

### Cierre PYP-013

73 comprobaciones pasadas: 14 del generador y 59 de HTML inicial/React/navegación/imagen/sitemap/robots. Compilación comercial Vite 1601 módulos, 15.77 s, salida 0; postproceso cuatro rutas, salida 0; VitePress temporal con caché/SSR aislados, salida 0 en 24.46 s. No se repitió la compilación documental tras añadir este cierre textual. Los fallos iniciales de preview y el conflicto de puerto están registrados; la validación definitiva usa el servidor de archivos en 5185 y no acredita el CDN de Netlify.

Integridad: 862 archivos anteriores comparados por hash, sin eliminaciones ni cambios fuera de index.html, Seo.jsx, generador, sitemap y tres documentos autorizados. Se excluyen .git, node_modules, browser-profile y cache. Los 17 archivos de dist y 670 generados anteriores inventariados conservan sus hashes. Componentes visuales, navegación, formulario (body), robots, _redirects, rutas y dependencias intactos. Índice Git idéntico. Los procesos de navegador y servidores locales de esta intervención quedaron cerrados.

Whitespace de archivos afectados/nuevos correcto y enlaces Markdown locales comprobados sin destinos faltantes. El chequeo global conserva el espacio final previo en main.jsx:45 (salida 2) y avisos LF/CRLF. Estado Git final: main, 12 archivos seguidos modificados (diez previos y dos nuevos cambios en sitemap/generador), 161 sin seguimiento al incluir validacion-final.json. No se ejecutó staging, commit, push, reset, clean ni despliegue. Publicación y validación Netlify reales pendientes de autorización. Resultados completos en validacion-final.json, generator-results.json y browser-results.json.
## PYP-014 — Verificación de entrega SEO y compatibilidad Netlify — 2026-10-17

- [Prompt completo](./prompts/PYP-014.md). Objetivo: medir siete URL sin/con barra en desarrollo, preview y artefacto antes de corregir únicamente defectos demostrados.
- Estado inicial: main, doce archivos seguidos modificados y fuentes/documentación nuevas previas. AGENTS, resultado PYP-013, bitácora y fuentes/configuración requeridas revisados. Estado y hashes conservados antes de editar.
- Causa: Vite preview 6.4.1 busca directorio/index.html con barra, pathname.html sin barra y finalmente fallback raíz. Desarrollo no ejecuta postproceso SEO. Extracto instalado/hash conservado en causa-vite-preview.json.
- Resultados: 21 HTTP 200, React correcto y sin blanco en las 21 variantes; head propio en las siete del modelo de artefacto, solo raíz en desarrollo y raíz/interiores con barra en preview. Head/canonical/OG completos registrados antes de ejecutar el HTML recibido. 148 controles de navegador y diez de correspondencia de archivos pasados; sin excepciones/console.error ni envíos.
- Decisión: ningún defecto demostrado del generador/artefacto/React o Netlify que justifique modificar reglas. No se realizan cambios funcionales. Compatibilidad de Netlify razonada según documentación; CDN/Pretty URLs/configuración real no verificados.
- Archivos: bitácora, índice y arquitectura; nuevos prompt PYP-014 y evidencias (HTML recibidos, comparación, causa Vite, scripts, resultado e integridad). [Matriz por ruta](./evidencias/PYP-014/resultado.md).
- Build comercial temporal: salida 0, 1601 módulos, 15.79 s; generación SEO cuatro HTML, salida 0. VitePress e integridad al cierre. Sitemap/robots/imagen/Form detectables verificados localmente en los tres entornos, sin acreditar procesamiento Netlify.
- Incidencias: primer script con paréntesis sobrante no llegó a ejecutar pruebas; se corrigió herramienta y pasó node --check. Avisos previos de compatibilidad/whitespace conservados. Pendiente comprobar CDN/cachés/normalización/detección y recepción Forms con autorización.
- Aprobación: auditoría/pruebas/documentación autorizadas. Sin fuentes ni dependencias modificadas, staging, commit, push o despliegue.

### Cierre PYP-014

158 comprobaciones pasadas: 148 de comparación entre entornos y diez de correspondencia con artefactos. Las diferencias de head inicial se mantienen explícitas: 21 HTTP 200 y React correcto en las 21 respuestas; 12/21 heads iniciales propios de la URL solicitada (1 desarrollo, 4 preview, 7 modelo de artefacto), nueve heads de Inicio en variantes interiores de desarrollo/preview. No hay páginas en blanco ni errores de consola. Los siete HTML del modelo de artefacto coinciden byte a byte con los cuatro archivos generados. Los 21 HTML originales están conservados como evidencia.

Vite comercial temporal: salida 0, 1601 módulos, 15.79 s; generador cuatro HTML, salida 0; VitePress aislado, salida 0 en 24.23 s. No se repitió el build documental tras añadir este cierre textual. Ningún cambio funcional: no se modifican generador, fuente SEO, componentes, formulario, canonical, sitemap, robots, reglas ni dependencias. Netlify CDN/panel/Pretty URLs/detección y recepción siguen sin verificar; no se publicó ni se envió ningún formulario.

Integridad: 1.060 archivos existentes inventariados, sin eliminaciones ni cambios fuera de bitácora, índice y arquitectura autorizados. Se excluyen .git, node_modules, browser-profile y cache del inventario. Los 17 archivos de dist y 849 generados previos conservan sus hashes; índice Git idéntico. Whitespace de rutas afectadas y archivos nuevos correcto; enlaces Markdown locales válidos. Global diff --check conserva el espacio final previo en main.jsx:45 (salida 2) y avisos LF/CRLF, sin corregirlos.

Git final: main, doce archivos seguidos modificados preexistentes y 195 sin seguimiento al incluir validacion-final.json. Los cambios de esta intervención son exclusivamente documentales y herramientas/evidencias de verificación. Navegador y tres servidores locales cerrados. Sin staging, commit, push, reset, clean ni despliegue. Validación completa en validacion-final.json.

## PYP-015 — Auditoría y propuesta de dependencias — 2026-10-17

- [Prompt completo](./prompts/PYP-015.md). Auditoría AGENTS, PYP-009 y PYP-010/014 realizada. Estado inicial main con doce cambios seguidos previos y nuevas fuentes/documentación, preservado por hashes. Node 22.15.1, npm 10.9.2, lock v3 con 358 entradas; npm ls salida 0.
- Audit actual: 19 entradas (12 altas, 6 moderadas, 1 baja), dos moderadas de producción en Router/DOM. JSON completos, árbol y registro de versiones guardados. No se afirma explotación por severidad ni por versión.
- Propuesta: Router DOM 7.18.4 con Router 7.18.4 transitivo (mayor, autorización futura); Vite raíz 6.4.4 y ocho familias transitivas compatibles. Residuales Tailwind 3 y VitePress/Vite 5 requieren migraciones/evaluación separadas; sin overrides mayores ni alpha. [Informe completo por paquete y plan](./evidencias/PYP-015/resultado.md).
- Referencia: Vite temporal 1601 módulos, 16.40 s, salida 0; SEO cuatro HTML correcto; 177 controles navegación, 34 formulario con POST interceptados y 59 SEO, total 270 en Edge 375/1440. Sin envíos reales ni errores de consola. VitePress e integridad al cierre. Sin afirmar inspección nueva de capturas ni recepción Netlify.
- Archivos: esta bitácora, índice; nuevos prompt y evidencias PYP-015 (inventarios, audit/ls/outdated, versiones/compatibilidad, clasificación, scripts/resultados, capturas, informe y validación). Ninguna dependencia ni fuente modificada.
- Pendientes: autorización de futuras migraciones y sublotes, reauditar/comparar referencia después de cada uno; Netlify/CDN/recepción y avisos previos siguen pendientes. Primer intento de escritura de informe falló en delimitador PowerShell antes de ejecutar; informe reescrito de forma estructurada y build documental posterior requerido. Sin instalación, audit fix, staging, commit, push ni despliegue.

### Cierre PYP-015

Auditoría completa 19 entradas (12 altas, 6 moderadas, 1 baja); producción dos moderadas de Router/DOM. npm ls completo salió 0. Consultas del registro y rangos/engines verificadas sin instalar/resolver un árbol nuevo. Las propuestas no garantizan ausencia de vulnerabilidades en un árbol futuro; debe reauditarse después de cada cambio autorizado.

Referencia: Vite 1601 módulos, 16.40 s, salida 0; generador cuatro HTML, salida 0; 270 comprobaciones Edge pasadas (177 navegación, 34 formulario con POST interceptados, 59 SEO). VitePress final con informe incorporado: salida 0 en 27.28 s. Hubo un build documental inicial correcto de 24.96 s anterior a incorporar el informe; se repitió por ese cambio documental. No se repite tras añadir este cierre textual. Ningún formulario real enviado ni CDN/recepción Netlify verificados. Navegadores y servidor local de referencia cerrados.

Integridad: 1.302 archivos previos inventariados, sin eliminaciones ni cambios fuera de bitácora e índice autorizados. Se excluyen .git, node_modules, browser-profile y cache del inventario. package.json y package-lock.json conservan hashes y las diez versiones directas instaladas siguen idénticas. Los 17 archivos dist y 1.057 generados previos conservan hashes; código/SEO/navegación/formulario intactos. Índice Git idéntico. No se instalaron ni actualizaron paquetes.

Whitespace de archivos afectados/nuevos correcto; enlaces Markdown locales válidos. El chequeo global conserva el espacio previo main.jsx:45 (salida 2) y avisos LF/CRLF. Git final: main, doce archivos seguidos modificados preexistentes y 226 sin seguimiento al incluir validacion-final.json. La intervención modifica solo documentación/evidencias. No se ejecutó audit fix, add, commit, push, reset, clean ni despliegue. Migraciones Router/Tailwind y cualquier actualización futura requieren autorización. Evidencia completa: validacion-final.json.

## PYP-016 — Actualización controlada de React Router — 2026-10-17

- [Prompt completo](./prompts/PYP-016.md). Objetivo: Router DOM/Router 6.30.6 -> 7.18.4 para corregir los avisos de producción preservando web y cambios previos. AGENTS, PYP-015, bitácora, imports y estado revisados. Node 22.15.1/React 18.3.1 cumplen requisitos; objetivo confirmado en npm. Estado y package/lock guardados antes de instalar.
- Inicial: main con doce archivos seguidos modificados previos y fuentes/documentación nuevas. Resolución lock-only revisada antes de instalar, sin cambios ajenos; instalación con scripts/audit deshabilitados. Router DOM exacto 7.18.4, Router transitivo 7.18.4, cookie 1.1.1 y set-cookie-parser 2.7.2 añadidos; @remix-run/router retirado. Resto de versiones/declaraciones preservadas; lock instalado idéntico al revisado.
- Compatibilidad: no se necesita modificar componentes/imports ni añadir flags. BrowserRouter, navegación, formulario y SEO intactos. [Resultado completo y comparación con PYP-015](./evidencias/PYP-016/resultado.md).
- Pruebas: Vite temporal 1609 módulos, 15.17 s, salida 0; cuatro HTML SEO generados; 183 navegación/enlaces externos, 34 formulario con POST interceptados y 59 SEO, total 276 comprobaciones Edge 375/1440 pasadas. Sin errores de consola ni envíos reales. VitePress e integridad al cierre.
- Seguridad comprobada: audit completo 19 ->17 (12 altas, 4 moderadas, 1 baja), producción 2 moderadas ->0 y salida 0. Sin nuevos paquetes/avisos vulnerables; npm ls Router y árbol completo salidas 0. Residuales de desarrollo fuera de alcance, no se ejecuta audit fix.
- Archivos: package.json/lock, esta bitácora, índice y arquitectura; nuevos prompt y evidencias PYP-016. Bundle JS crece 19.50 kB (gzip +6.69 kB); CSS conserva hash. Pendientes Netlify real, otros motores/dispositivos y tooling según PYP-015; whitespace main.jsx:45 anterior conservado.
- Aprobación: actualización mayor y regresiones autorizadas en este prompt. Sin staging, commit, push, reset, clean ni publicación.

### Cierre PYP-016

React Router DOM/Router instalados en 7.18.4, Node 22.15.1 y React/DOM 18.3.1 compatibles. Única declaración cambiada: Router DOM exacto; otras entradas de package intactas. Lock limitado a raíz, dos Router actualizados, @remix-run/router retirado y cookie/set-cookie-parser añadidos. El lock coincide con el revisado antes de instalar; todas las versiones físicas previas ajenas a Router permanecen iguales. No se modificó ningún componente ni fue necesario adaptar código.

292 comprobaciones pasadas: 183 navegación/enlaces externos, 34 formulario y 59 SEO (276 regresiones), más 16 de carga efectiva de logo/layout en cuatro páginas a 375/1440. Una captura temprana de Monitoreo se tomó antes de cargar la imagen; se conserva y se añadieron cuatro capturas estable-*.png esperando decode/fonts sin alterar la web. Se inspeccionaron Inicio móvil y Monitoreo desktop con logo cargado; visual-results.json confirma logo y layout en las ocho combinaciones. Sin excepciones ni console.error; sin envíos reales. Recepción/CDN/antispam Netlify siguen pendientes.

Build comercial temporal: Vite 1609 módulos, 15.17 s, salida 0; generador cuatro HTML, salida 0; VitePress aislado, salida 0 en 24.94 s. No se repite la compilación documental tras añadir este cierre textual. Servidor local y navegadores cerrados. Audit producción: dos moderadas -> cero y salida 0. Audit completo: 19 ->17, doce altas/cuatro moderadas/una baja de desarrollo, salida 1. Sin paquetes ni avisos nuevos; npm ls Router y árbol completo salidas 0. Riesgos de tooling permanecen para otra intervención.

Integridad: 1.529 archivos previos inventariados, ninguna eliminación ni cambio fuera de package/lock y tres documentos autorizados. Se excluyen .git, node_modules, browser-profile y cache del inventario; las versiones físicas previas se compararon por separado. Los 17 archivos de dist y 1.253 generados previos conservan hashes; fuentes, formulario, SEO, sitemap, navegación e imágenes originales intactos. Índice Git idéntico.

Whitespace de rutas afectadas/nuevas correcto; enlaces Markdown locales válidos. Global diff --check conserva el espacio previo main.jsx:45 (salida 2) y avisos LF/CRLF. Git final: main, doce archivos seguidos modificados acumulados (incluidos package/lock ya modificados antes) y 268 sin seguimiento al incluir validacion-final.json. Se conservaron los cambios preexistentes. Sin audit fix, git add, commit, push, reset, clean ni despliegue. Evidencia completa en validacion-final.json.

## PYP-017 — Actualización controlada de Vite — 2026-10-17

- [Prompt completo](./prompts/PYP-017.md). AGENTS/PYP-015/016, versiones y Git auditados. Estado inicial main con doce cambios seguidos previos y archivos nuevos; hashes, package/lock y versiones físicas guardados antes de instalar. Node 22.15.1/npm 10.9.2 compatibles; 6.4.4 publicado, peers React/Vue compatibles y fuera de cuatro rangos de avisos propios.
- Implementación: resolución lock-only revisada; solo raíz y node_modules/vite cambian. Instalación con scripts/audit deshabilitados: un paquete cambiado. Vite directo 6.4.1 ->6.4.4 exacto; ninguna transitiva necesaria. React/Router/Tailwind/VitePress y Vite 5.4.21 anidado intactos; sin cambios de código/configuración.
- Regresión: Vite temporal 1609 módulos, 17.06 s, salida 0; cuatro HTML SEO generados. 292 comprobaciones Edge pasadas frente a 292 en PYP-016 (183 navegación, 34 formulario con POST interceptados, 59 SEO, 16 visuales/logo). Artefactos completos idénticos por hash. VitePress/integridad al cierre. [Informe y comparaciones](./evidencias/PYP-017/resultado.md).
- Seguridad: completo 17 ->17 (12 altas/4 moderadas/1 baja), producción sigue 0. Vite directo deja de estar en nodes afectados; permanece Vite 5 anidado. Sin paquetes/avisos nuevos. npm ls vite/árbol salidas 0. No se atribuye desaparición total de alertas a este parche.
- Prueba preview adicional: siete HTTP 200, misma diferencia de head inicial sin barra de PYP-014; no es CDN Netlify ni regresión nueva. No se cambian reglas ni se envían formularios reales.
- Archivos: package/lock, esta bitácora, índice y arquitectura; nuevos prompt/evidencias PYP-017. Pendientes tooling por sublotes PYP-015, VitePress, Netlify real, otros motores/dispositivos y whitespace main.jsx:45 previo. Parche autorizado; sin audit fix, staging, commit, push, reset, clean ni despliegue.


## Cierre de validación — 2026-10-17

- Compilación comercial: exit 0, Vite 6.4.4, 1609 módulos, 17,06 s; generación SEO exit 0. Los 20 archivos del artefacto son idénticos por SHA-256 a PYP-016.
- VitePress: exit 0, 26,41 s, salida temporal independiente. Advertencias sobre baseline-browser-mapping y caniuse-lite antiguos; sin actualizar paquetes ajenos.
- Regresión: 292 comprobaciones aprobadas (183 navegación, 34 formulario interceptado localmente, 59 SEO, 16 logo/layout en escritorio y móvil). Preview: siete HTTP 200; persiste la diferencia conocida de metadatos sin barra final en preview, sin equivaler a Netlify CDN.
- Seguridad: audit completo 17 entradas (12 altas, 4 moderadas, 1 baja); producción 0. Vite directo ya no aparece como nodo vulnerable; permanece Vite 5.4.21 de VitePress. Sin alertas nuevas.
- Integridad: 1775 archivos previos comprobados; sin pérdidas ni cambios fuera de los cinco archivos existentes autorizados. Los 17 archivos de dist y los 1457 archivos generados previos conservan sus hashes. Índice Git intacto.
- Whitespace: comprobación acotada exit 0. La comprobación global conserva el problema previo src/main.jsx:45 (exit 2); avisos LF/CRLF sin corrección ajena.
- Git: rama main; 12 archivos versionados modificados acumulados y 320 archivos sin seguimiento tras guardar validacion-final.json. package.json/lock ya estaban modificados antes. No se ejecutaron operaciones de staging, commit, push ni publicación.
- Evidencia de cierre: docs/evidencias/PYP-017/validacion-final.json. Netlify CDN y recepción real de Forms siguen pendientes; no se enviaron mensajes reales. La documentación compiló antes de añadir este cierre administrativo.


## PYP-018 — Preparación de commit y despliegue controlado — 2026-10-17

- [Prompt completo](./prompts/PYP-018.md). Objetivo: auditar cambios acumulados y seleccionar archivos sin staging ni publicación.
- Inicial: main, origin https://github.com/pyptec/web.git, 12 modificaciones versionadas y 320 sin seguimiento. Índice sin cambios preparados. Leídos AGENTS, bitácora e informes 009/010/013/014/016/017; fase de revisión sin editar.
- Implementación exclusivamente documental: inventario individual de los 320 archivos, manifiesto comentado y selección literal de 341 rutas, tres bajas dist propuestas pero no ejecutadas. Excluidos dos prompts raíz duplicados; conservadas evidencias oficiales y legados únicos. No cambian ignores, dependencias, componentes, SEO, formularios ni salidas anteriores.
- Archivos: esta bitácora, índice de prompts, docs/prompts/PYP-018.md y docs/evidencias/PYP-018/ (estado inicial, auditoría npm, scripts aislados de validación, resultados, inventario, manifiestos e informe).
- Validaciones: build comercial temporal Vite 6.4.4 exit 0 (1609 módulos, 21,67 s), cuatro HTML SEO, 81 comprobaciones estáticas/HTTP modelo aprobadas, XML sitemap parseado, 20 archivos de artefacto idénticos a PYP-017; audit producción 0. No se repiten pruebas visuales ni se envían formularios. VitePress e integridad final al cierre.
- Incidencias: whitespace previo main.jsx:45 impide diff --check global limpio; sin corrección funcional autorizada aquí. Datos Browserslist/baseline antiguos. Escaneo estático de secretos sin coincidencias, con límites documentados.
- Pendientes: autorizar corrección whitespace/bajas dist, confirmar panel Netlify y deploy de prueba con/sin barra, detección y recepción Forms por separado; devDependencies, favicon, adjuntos documentales y otros pendientes heredados.
- [Informe, decisiones y procedimiento](./evidencias/PYP-018/resultado.md). Commit y despliegue pendientes de aprobación; sin git add/rm/reset/clean/commit/push ni Netlify deploy.


## Cierre PYP-018 — 2026-10-17

VitePress compiló correctamente en 42,37 s con salida, caché e intermediarios SSR temporales; resultado HTML del informe presente. No se repitió la compilación después de este cierre administrativo. Datos Browserslist/baseline antiguos continúan como advertencias.

Integridad final: 2039 archivos previos comparados por SHA-256; ninguna pérdida ni modificación fuera de bitácora e índice de prompts autorizados. Los 17 archivos de dist y los 1670 archivos de configuración/salidas previas contemplados en el grupo de generados conservan sus hashes; índice Git intacto. Los 341 paths seleccionados existen al guardar la validación final, ninguno está ignorado ni pertenece a dist/build-temporal/browser-profile/cache. El manifiesto agrupa por categoría y la selección está ordenada globalmente; contienen el mismo conjunto sin duplicados.

Revisión de los 320 archivos iniciales: 314 documentales/legados (incluidas dos copias de prompts omitidas), cuatro fuentes React nuevas, una fuente de datos SEO y una imagen pública OG. Se incluyen 318; las dos copias permanecen en disco. La selección de 341 rutas se completa con 11 modificaciones versionadas y 12 archivos de esta auditoría.

Markdown modificado: enlaces locales válidos y sin whitespace final; diff --check acotado exit 0. Global exit 2 exclusivamente por el whitespace previo en main.jsx:45; no se elimina ni oculta el pendiente. Sin modificaciones funcionales ni de dependencias. No se encontró un prompt original PYP-003 y no se reconstruye.

Git final: main; mismas 12 modificaciones versionadas acumuladas, 332 archivos sin seguimiento tras guardar validacion-final.json (320 iniciales + 12 nuevos). Ningún archivo preparado. Solo se modificaron los dos documentos existentes y se crearon el prompt y las evidencias PYP-018. No se ejecutaron git add, rm, reset, clean, commit, push, ni despliegue. El servidor HTTP efímero de la prueba cerró; no se interrumpieron servidores previos del usuario.

Informe, manifiesto, selección literal, inventario y validación final guardados en docs/evidencias/PYP-018/. Pendientes: decisión autorizada sobre whitespace/dist, revisión del panel y despliegue de prueba Netlify; recepción real Forms, CDN/cachés/Pretty URLs y hallazgos heredados. No se autoriza publicación por haber pasado comprobaciones locales.


## PYP-019 — Revisión final del manifiesto y cierre de Git — 2026-10-17

- [Prompt completo](./prompts/PYP-019.md). Objetivo: cerrar revisión del manifiesto y corregir exclusivamente el whitespace de main.jsx:45.
- Inicial: main, 12 modificaciones versionadas y 332 sin seguimiento; PYP-018 proponía 341 rutas. Leídos AGENTS, informe/manifiesto/selección e ignores. Se preservan cambios anteriores.
- Revisión: todas las rutas existen dentro del proyecto, ninguna ignorada; ocho categorías, 29 grupos históricos idénticos conservados. Imagen OG 1.355.270 bytes, único archivo superior al umbral de revisión 1 MiB. Escaneo estático/archivo comprimido/metadatos PNG sin secretos; coincidencias de correo son contactos públicos o placeholder existentes. Límites de privacidad y revisión de capturas documentados.
- Corrección: retirados únicamente ocho espacios de línea 45; todas las otras líneas y contenido no whitespace idénticos. git diff --check global pasa. La ruta Edge y los cambios preexistentes permanecen intactos.
- Selección actualizada: 355 rutas literales en PYP-019, sin alterar PYP-018. Copia cruda de main previa excluida por conservar whitespace; referencia oficial JSON y prueba SHA guardadas. No se eliminan archivos ni se cambian ignores.
- Archivos modificados: main.jsx, esta bitácora, índice de prompts. Creados prompt y evidencias PYP-019. Dependencias, funcionalidades, SEO/formulario y generados existentes sin cambios.
- Validación: Vite temporal exit 0 (1609 módulos, 19,18 s), generador cuatro HTML exit 0, 81 comprobaciones aprobadas, XML sitemap válido, 20 archivos idénticos a PYP-018; audit producción 0. Sin envíos ni pruebas visuales nuevas. VitePress e integridad final al cierre.
- Dist: tres bajas --cached propuestas, no ejecutadas. Build local reconstruye artefacto sin depender del dist versionado; publicación remota pendiente de verificar por falta de acceso al panel Netlify.
- [Informe y procedimiento seguro](./evidencias/PYP-019/resultado.md). Pendientes: autorización de bajas, panel/deploy de prueba/CDN/Forms, dependencias de desarrollo y hallazgos heredados.
- Aprobación: corrección/auditoría autorizadas; staging, commit, push y publicación no autorizados ni ejecutados.


## Cierre PYP-019 — 2026-10-17

- VitePress terminó con exit 0 en 34,70 s; salida, caché y SSR aislados. HTML documental del informe presente. Advertencias previas de Browserslist/baseline continúan. No se repitió el build tras añadir este cierre administrativo.
- Manifiesto final: 355 rutas únicas, todas existentes tras guardar validacion-final.json, dentro del proyecto y ninguna ignorada. Mismo conjunto entre manifiesto comentado y selección literal. Cero incidencias de whitespace en los textos seleccionados y cero patrones de credenciales en el segundo escaneo. La referencia cruda main.jsx.before.txt permanece fuera de la selección, sin borrarla.
- git diff --check global: salida 0. src/main.jsx difiere del estado inicial únicamente por retirar ocho espacios de línea 45; el resto de cambios preexistentes se conserva. Avisos LF/CRLF, sin normalización masiva.
- Integridad: 2271 archivos iniciales comparados por SHA-256; sin pérdidas ni cambios fuera de main, bitácora e índice de prompts autorizados. Los 17 archivos dist y los 1890 archivos del grupo de configuración/salidas previas conservan sus hashes. Índice Git idéntico, sin archivos preparados. Dependencias y archivos funcionales distintos de esa línea de main intactos.
- Git final: main; 12 modificaciones versionadas acumuladas y 347 archivos sin seguimiento (332 iniciales + 15 nuevos; 14 nuevos seleccionados y una copia cruda local excluida). Sin git add/rm/reset/clean/commit/push ni despliegue. Ningún archivo eliminado.
- Evidencia final: docs/evidencias/PYP-019/validacion-final.json; selección actual: docs/evidencias/PYP-019/seleccion-commit.txt. PYP-018 se conserva sin modificaciones. Prompt, índice y bitácora actualizados.
- Pendientes: autorizar las tres bajas --cached, comprobar panel y publicación real Netlify antes de retirarlas, validar CDN/Forms de prueba con autorizaciones separadas; dependencias de desarrollo y asuntos heredados. Los resultados locales no acreditan recepción ni publicación real. No se enviaron formularios.


## PYP-020 — Commit y push de cierre de jornada — 2026-10-17

- [Prompt completo y autorización expresa](./prompts/PYP-020.md). El usuario autoriza staging, retiro --cached de tres archivos dist, un commit y push a origin main; no cambios funcionales ni despliegues manuales.
- Estado inicial: main y origin/main iguales tras fetch (9b7751cd2e315dd87b28479c5182c05fdc6f9807), sin divergencia/retraso; remoto https://github.com/pyptec/web.git; cambios acumulados PYP-001–019 conservados.
- Selección: 355 rutas aprobadas PYP-019 más tres documentos PYP-020; bitácora/índice ya incluidos. Esperado: 358 altas/modificaciones y tres bajas dist, 361 rutas afectadas. Exclusiones conocidas: dos prompts duplicados raíz y copia cruda de main previa. No se alteran manifiestos históricos.
- Archivos documentales: esta bitácora, índice de prompts, docs/prompts/PYP-020.md y docs/evidencias/PYP-020/resultado.md, verificacion-previa.json. Sin código ni dependencias modificados.
- Validaciones previas: 355 rutas existentes y protegidos intactos, hash main coincide con PYP-019, escaneo estático sin patrones de secretos, hashes de 17 archivos dist guardados. Se revisará índice/diff/check antes del commit y remoto antes del push; no se atribuyen pruebas de navegador o builds nuevos.
- [Evidencia y procedimiento de cierre](./evidencias/PYP-020/resultado.md). Estado de commit/push pendiente al escribir este registro previo; hash y resultado reales se entregarán en informe de Codex, para incorporar posteriormente sin un segundo commit no autorizado.
- Advertencia comunicada: push puede activar despliegue automático Netlify si existe integración; no se asume desactivada. No se ejecutará despliegue manual.
- Pendientes: panel/CDN/Forms Netlify y asuntos heredados de desarrollo/documentación; recepción real de formulario no probada ni autorizada.


### Hallazgo documental durante la revisión del índice

La primera comprobación cached detectó una línea vacía extra al EOF de docs/index.md:23, un archivo nuevo que el diff previo de archivos seguidos no revisaba. Se retiró únicamente esa línea final, sin cambiar contenido, enlaces o configuración. Corrección de formato documental necesaria para que el índice pase --check; evidencia SHA antes/después en verificacion-previa.json. No se modificó código funcional. Git detecta por similitud un renombre desde dist/index.html a un HTML histórico nuevo; se verifican altas/bajas con --no-renames, sin mover físicamente archivos. El conteo autorizado sigue siendo 358 altas/modificaciones y tres bajas de paths dist.


### Revisión del staging aprobada antes del commit

Se ejecutaron diff --cached --name-status/stat/check y status --short. Sin heurística de renombres: 358 altas/modificaciones y tres bajas exactas, 361 rutas; conjunto igual al manifiesto PYP-019 más los tres documentos PYP-020. --check salida 0. Sin rutas ajenas, secretos detectados ni modificaciones tracked fuera del índice. Los 17 hashes de dist son idénticos y ls-files dist está vacío. Solo quedan fuera los dos prompts duplicados raíz y la copia cruda de main. Se procede al único commit y, tras verificar que origin/main no avanzó, al push autorizado. Hash/resultado reales quedan en el informe final de Codex, sin editar documentación versionada después del commit.
