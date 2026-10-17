# PYP-005B — Evidencias — 2026-10-17

## Entorno e instalación

- Node 22.15.1; npm 10.9.2.
- Consulta de compatibilidad: [guía oficial VitePress 1.6.4](https://vuejs.github.io/vitepress/v1/guide/getting-started) y npm view vitepress@1.6.4.
- Comando: npm install --save-dev --save-exact vitepress@1.6.4.
- Resultado: salida 0, 113 paquetes añadidos y siete actualizados.
- Vite comercial conservado: 6.4.1. Vite anidado de VitePress: 5.4.21.

Dependencias transitivas actualizadas automáticamente por npm:

| Paquete | Antes | Después |
| --- | --- | --- |
| @babel/helper-string-parser | 7.27.1 | 7.29.7 |
| @babel/helper-validator-identifier | 7.27.1 | 7.29.7 |
| @babel/parser | 7.28.4 | 7.29.9 |
| @babel/types | 7.28.4 | 7.29.8 |
| nanoid | 3.3.11 | 3.3.20 |
| postcss | 8.5.6 | 8.5.30 |
| source-map-js | 1.2.1 | 1.2.2 |

npm audit: salida 1; 19 vulnerabilidades (1 baja, 6 moderadas, 12 altas), incluidas dependencias comerciales existentes y la cadena de herramientas VitePress/Vite. No se afirma que todas fueran introducidas por esta instalación; no hay auditoría previa comparable. Queda pendiente revisar actualizaciones en otra intervención. No se ejecutó npm audit fix.

## Validación

### Resultados ejecutados

- npm run docs:build: salida 0; VitePress 1.6.4 compiló cliente/servidor y generó 13 páginas en docs/.vitepress/dist. La validación nativa de enlaces no se desactivó.
- npm run docs: servidor iniciado correctamente en http://127.0.0.1:5174/.
- npm run docs:preview: servidor iniciado; acceso verificado en http://127.0.0.1:4174/.
- HTTP: 12 rutas documentales respondieron 200 en desarrollo y preview, incluyendo los cinco prompts, bitácora, arquitectura y evidencias. En preview se comprobó que contienen contenido renderizado.
- Revisión del HTML compilado: 359 referencias internas a páginas, recursos y fragmentos resolvieron en disco.
- Búsqueda local: configuración provider local e índice JavaScript generado verificados. Interacción de búsqueda en navegador pendiente.
- Protección: hashes SHA-256 de 56 archivos iguales a la referencia, incluyendo todo src/, dist/ comercial, archivos SEO, configuración y prompts anteriores. Scripts y dependencias comerciales declaradas conservados.
- Compilación comercial adicional: node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-005B/build-temporal; salida 0, 1598 módulos transformados; no ejecutó generar-seo.mjs ni sobrescribió dist/.
- git diff --check global: detecta espacio final preexistente en src/main.jsx:45. No se modifica porque está fuera de alcance. Comprobación limitada a package.json y package-lock.json: sin errores.
- Caché y build documentales: ignorados por docs/.gitignore, comprobado con git check-ignore.

### Incidencias y pendientes

Avisos de baseline-browser-mapping y caniuse-lite antiguos, y advertencias Git LF/CRLF. No se actualizaron herramientas comerciales para resolverlos.

La primera comprobación de contenido HTTP exigía h1 y rechazó PYP-005 pese a responder 200: su prompt original comienza con h2. Se corrigió el criterio para aceptar encabezados h1–h6 y las 12 rutas pasaron, sin modificar el prompt.

No se ejecutaron pruebas visuales ni interacción con la búsqueda desde un navegador. Pendiente revisar visualmente escritorio/móvil y planificar la actualización de dependencias vulnerables. No se realizaron commit, push ni despliegue.

Las copias package.before.json, package-lock.before.json y protected-hashes.json son referencias previas para verificar la conservación del proyecto. Toda evidencia permanece dentro del repositorio.
