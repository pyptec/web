# PYP-006 — Navegación corporativa — 2026-10-17

## Diagnóstico

PYP-004 compartió el componente, pero cada página seguía configurando enlaces distintos: Edge tenía anclas locales; Monitoreo e IoT solo Inicio y Hablemos. La auditoría confirma rutas y secciones reales de la homepage para los destinos solicitados.

## Implementación

Navbar centraliza Inicio, las tres soluciones existentes, Proyectos, Tecnología, Plataforma y Hablemos. Edge conserva Capacidades, CAN/J1939, Aplicaciones y Contacto como navegación secundaria dentro del mismo encabezado. Las páginas migradas no contienen CTA duplicados en la barra; sus contactos del contenido permanecen intactos.

Soluciones es un desplegable de enlaces con botón nativo, aria-expanded, aria-controls, aria-current en la solución activa, foco visible y cierre por Escape, salida de foco o clic exterior. Enter y flecha abajo permiten abrir; Tab recorre enlaces. No utiliza role menu porque es navegación de enlaces, no un menú de comandos.

Los destinos /#proyectos, /#tecnologia y /#contacto esperan el montaje de React antes de desplazar y enfocar. Las anclas locales también compensan la altura del encabezado sticky. Se respeta prefers-reduced-motion. No se modifica App.jsx.

Producción/OEE y Agua/Vertimientos se documentan como proyectos futuros, sin enlaces ni rutas activas.

## Validación de navegador

Microsoft Edge instalado, ejecutado en modo headless por CDP usando únicamente Node y su WebSocket integrado. Sin dependencias añadidas.

- 201 comprobaciones pasaron en una ejecución completa: tres rutas a 320, 375, 768, 1024 y 1440 px de ancho; alto de viewport 1000 px.
- Una barra por ruta, Hablemos visible, sin desbordamiento horizontal; desplegable dentro del viewport; tres destinos válidos y solución activa correcta.
- Clic abre; Escape cierra y devuelve foco; Enter abre; flecha abajo enfoca primer enlace; Tab recorre y cierra al salir; clic exterior cierra.
- Proyectos, Tecnología y Hablemos llegan a la homepage con hash y foco correctos y sección visible bajo el encabezado (comprobado a 1440 px).
- CAN/J1939 local de Edge sigue funcionando y queda visible.
- Navegación real Monitoreo -> IoT mediante el desplegable.
- Plataforma conserva URL, target blank y rel noopener noreferrer; no se abrió la plataforma externa ni se comprobó su disponibilidad.

[Resultados automatizados](./browser-results.json). Script reproducible: browser-check.cjs en esta carpeta; requiere Vite en http://127.0.0.1:5176/ y Edge instalado en la ruta registrada en el script.

Capturas revisadas por Codex:

- [Escritorio 1440 px](./navbar-1440.png).
- [Móvil 320 px](./navbar-320.png).

Los dos primeros intentos fallaron en el verificador: un selector escapado incorrectamente y un evento Enter CDP incompleto. Se conservan browser-first-attempt.json y browser-second-attempt.json. Se corrigió el controlador de prueba; el menú superó después la ejecución completa.

## Integridad

Comparación literal de las tres páginas desde main hasta el final: contenido idéntico. Todos los IDs conservados. Hashes de 46 archivos protegidos sin cambios: App.jsx, main.jsx, Seo.jsx, assets, configuración, dependencias y dist comercial.

Las referencias previas están en *.before.txt y protected-hashes.json. El perfil temporal de Edge está ignorado por el .gitignore local de esta carpeta.

## Compilaciones

Comando comercial temporal:

```powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-006/build-temporal
```

Compilación final correcta: salida 0; Vite 6.4.1, 1598 módulos y 9.83 segundos. La compilación no ejecutó generar-seo.mjs ni escribió en dist comercial.

npm run docs:build también terminó con salida 0; VitePress 1.6.4, cliente/servidor y páginas generadas en 14.81 segundos. No se desactivó la validación nativa de enlaces.

Se repitieron las 201 comprobaciones CDP sobre el diseño final, con el nombre corporativo visible en escritorio; todas pasaron. Las capturas guardadas corresponden a ese diseño.

git diff --check sobre los archivos modificados seguidos por Git: salida 0, sin errores de whitespace. Los archivos nuevos Navbar/Edge se compararon con sus referencias mediante git diff --no-index --check: salida 1 por diferencias existentes, sin diagnósticos de whitespace. También se revisó whitespace directamente en todos los archivos fuente/documentales modificados, sin incidencias.

Estado final de Git: se conservan los cambios previos; continúan modificadas Monitoreo e IoT y sin seguimiento Navbar/Edge/docs. package.json, package-lock.json, App.jsx, main.jsx, Seo.jsx y dist no cambiaron durante PYP-006 (ver hashes). No hay staging ni commits nuevos.

## Pendientes

Validación humana en dispositivos físicos, lector de pantalla y otros navegadores. No se probaron envíos de formularios ni disponibilidad de Plataforma. No se instalaron dependencias ni se realizaron commit, push o despliegue.
