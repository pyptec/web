# PYP-008 — Navegación de página principal — 2026-10-17

## Auditoría y cambio

App.jsx tenía encabezado independiente y un efecto que interceptaba todos los enlaces hash con scrollIntoView smooth, sin actualizar el hash ni compensar la altura del encabezado. Ese listener también habría capturado enlaces del nuevo SectionNav.

Se sustituyó el encabezado por Navbar con SectionNav. Se retiraron exclusivamente el efecto de scroll antiguo, el helper NavLink que solo usaba aquel encabezado y los imports sin uso. useState conserva el estado del año. Navbar, SectionNav, scrollToSection.js y las páginas interiores no se modificaron.

La fila corporativa conserva logo, Inicio, Soluciones desplegable, Proyectos, Tecnología, Plataforma y Hablemos. La fila local usa únicamente #soluciones (Áreas de solución), #arquitectura, #rpi-mdfr y #sectores. No duplica los destinos corporativos Proyectos, Tecnología o Contacto.

Las anclas del contenido ahora actualizan su hash mediante navegación nativa y son atendidas por SectionNav/scrollToSection: foco, compensación de todo el header, historial y movimiento reducido compartidos. No hay dos interceptores compitiendo.

## Validación posterior del usuario de PYP-007

Se añadió bajo PYP-007 en la bitácora la nota exacta solicitada:

> El usuario confirmó que las tres páginas interiores muestran correctamente las barras y que la navegación funciona.

No se atribuyen al usuario dispositivos, navegadores ni pruebas específicas adicionales.

## Pruebas ejecutadas

- [156 comprobaciones con Edge headless](./home-results.json), a 320, 375, 768, 1024 y 1440 px; viewport de 1000 px de alto.
- Una Navbar y una SectionNav; menú mediante clic, Enter, flecha abajo y Escape; tres destinos reales y sin solución falsamente activa en la homepage.
- Anclas locales y corporativas con títulos visibles; Tab/Enter y foco visible; enlaces originales Ver soluciones y Casos de aplicación del hero funcionando con hash y offset.
- Navegación real desde la homepage a cada una de las tres soluciones y regreso a Inicio en los cinco tamaños; retorno arriba sin hash residual.
- URL con hash directo, historial y comportamiento instantáneo/suave según preferencia de movimiento reducido.
- Logo oficial y atributos de Plataforma verificados; no se abrió ni se verificó la disponibilidad remota de Plataforma.
- Formulario Netlify: nombre, método POST, data-netlify, honeypot, campo form-name, todos los campos y required verificados en DOM. Validación local con datos de prueba correcta; no se envió ningún formulario.
- Métricas de página sin desbordamiento horizontal en los cinco tamaños; fila local compacta de una sola línea.
- Comparación literal de todo App.jsx desde main hasta el final, incluidos formulario y footer: idéntico a la copia inicial. IDs existentes sin cambios. Una única instancia Navbar y SectionNav en el código.
- 116 archivos protegidos con hashes iguales: todos los componentes compartidos, páginas interiores, rutas, SEO, assets, dependencias, dist comercial y la salida documental existente. Referencia: protected-hashes.json.
- git diff de App.jsx revisado y git diff --check sobre App.jsx correcto.

Script reproducible: browser-home-check.cjs en esta carpeta. Requiere Vite en http://127.0.0.1:5176/ y Edge en la ruta indicada; no instala dependencias.

## Capturas generadas e inspeccionadas

- [Homepage móvil, 320 px](./home-320.png).
- [Homepage escritorio, 1440 px](./home-1440.png).

## Compilaciones

Compilación comercial temporal correcta: Vite 6.4.1, salida 0, 1600 módulos, 21.63 segundos. No se ejecutó generar-seo.mjs ni se tocó dist.

```powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-008/build-temporal/comercial
node node_modules/vitepress/bin/vitepress.js build docs --outDir D:/promate/web/pyp-web/docs/evidencias/PYP-008/build-temporal/documentacion
```

VitePress terminó con salida 0 mediante CLI directa en 22.53 segundos, con carpeta temporal nueva para conservar todas las salidas existentes. No se desactivó su validación de enlaces.

## Incidencias y pendientes

Sin errores en las pruebas de navegación ni en la compilación comercial. Persisten avisos previos de datos de compatibilidad y LF/CRLF. No se cambian dependencias para resolverlos.

Pendientes: validación humana del usuario para PYP-008, dispositivos físicos, lector de pantalla y otros navegadores. La recepción real de formularios en Netlify y la disponibilidad de Plataforma no fueron probadas. Sin commit, push ni despliegue.

## Cierre

git diff --check sobre los archivos modificados devuelve 0; los Markdown nuevos también se revisaron directamente, sin whitespace final. La comprobación global mantiene únicamente el whitespace preexistente de src/main.jsx:45 (salida 2); no se modifica fuera de alcance. Después de los builds, los 116 hashes protegidos siguen coincidiendo.

Estado Git: src/App.jsx se añade a los archivos modificados; las modificaciones previas de package.json/lock, dist/index.html, main.jsx, Seo.jsx, Monitoreo e IoT y los archivos sin seguimiento se conservan. Los cambios documentales permanecen dentro de docs/. Sin staging, commit, push ni despliegue.
