# PYP-007 — Navegación local — 2026-10-17

## Auditoría y decisión UX

PYP-006 unificó la navegación corporativa. Solo Edge conservaba navegación secundaria; sus enlaces podían envolver varias filas en móvil. Monitoreo e IoT no ofrecían acceso local desde el encabezado.

Se crea SectionNav como componente independiente, compuesto dentro del mismo header sticky de Navbar. La navegación corporativa conserva exactamente su marcado; Navbar pasa a ofrecer un espacio children para el nivel local. No hay dos barras corporativas ni dos encabezados. La fila local utiliza fondo gris, texto menor y etiqueta En esta página. Los enlaces permanecen en una sola fila con desplazamiento horizontal nativo y acceso por teclado.

No se implementa resaltado de sección activa: no se marca como activa una sección basándose en el último clic.

## Destinos reales utilizados

| Página | Enlaces locales |
| --- | --- |
| Monitoreo | Proyectos (#proyectos), LPS (#lps), Alkosto (#alkosto), CAN/J1939 (#can-j1939), Contacto (#contacto) |
| IoT | Soluciones IoT (#soluciones), Contacto (#contacto) |
| Edge | Capacidades (#capacidades), Hardware (#hardware), CAN/J1939 (#j1939), Aplicaciones (#aplicaciones), Contacto (#contacto) |

IoT únicamente tiene dos secciones con ID en el código existente; no se añaden anclas para protocolos, gateways u otras secciones sin ID. El ID lps-instalacion-titulo es un título anidado de Monitoreo y no se añade como enlace para mantener el nivel compacto.

## Implementación técnica

- SectionNav.jsx contiene la fila local, enlaces nativos, foco visible y revelación horizontal inmediata al recibir foco.
- scrollToSection.js centraliza el desplazamiento con compensación de toda la altura del header y 16 px de separación, espera acotada al montaje del destino, foco accesible y respeto de prefers-reduced-motion. Restituye tabindex cuando el destino pierde el foco si se añadió temporalmente.
- La espera se invalida si cambian ruta/hash, evitando que una navegación anterior desplace una página distinta.
- SectionNav atiende enlaces directos, cambios de hash y navegación del historial. Navbar reutiliza el helper para destinos corporativos de la homepage.
- No se modifican contenido desde main, IDs, imágenes, formularios, rutas, SEO, App.jsx ni dependencias.

## Validación en navegador

Microsoft Edge headless mediante CDP; viewport de 900 px de alto para navegación local. Anchos 320, 375, 768, 1024 y 1440 px; tres páginas.

- [283 comprobaciones locales](./local-results.json): un encabezado corporativo y una navegación local; enlaces con destinos reales; una sola fila; ausencia de desbordamiento de página; cada ancla por clic deja el título visible; header accesible; Tab/Enter y foco visible; último enlace accesible mediante desplazamiento horizontal; Hablemos visible.
- También se comprobaron URL con hash directo, regreso en historial, Inicio desde las tres páginas, scroll instantáneo con movimiento reducido, suave con preferencia normal y cambio de solución sin arrastrar el hash/scroll anterior.
- [201 comprobaciones corporativas](./corporate-results.json): clic/teclado, Soluciones, estado activo, menú dentro del viewport, Escape, Tab, clic exterior, enlaces de la homepage y Plataforma con target/rel correctos. La suite corporativa usa alto de 1000 px.
- Total: 484 comprobaciones pasadas. Los scripts reproducibles browser-local-check.cjs y browser-corporate-check.cjs están en esta carpeta; requieren el servidor Vite en http://127.0.0.1:5176/ y Edge en la ruta del script.

Capturas generadas para las tres páginas en 320 y 1440 px. Codex inspeccionó directamente Monitoreo móvil y Edge escritorio:

| Página | Móvil | Escritorio |
| --- | --- | --- |
| Monitoreo | [320 px](./monitoreo-320.png) | [1440 px](./monitoreo-1440.png) |
| IoT | [320 px](./iot-320.png) | [1440 px](./iot-1440.png) |
| Edge | [320 px](./edge-320.png) | [1440 px](./edge-1440.png) |

## Incidencias resueltas

1. La primera prueba detectó que Contacto quedaba 45 px fuera del contenedor al llegar con Tab en 320 px. Se corrigió con scrollIntoView nearest/instant al recibir foco y margen horizontal para el contorno. Ver keyboard-overflow-before.json y local-first-attempt.json. La suite completa pasó después de corregirlo.
2. El verificador corporativo heredado contaba los enlaces de ambas listas bajo header; se acotó al nav corporativo. No fue un defecto del menú. Se conserva corporate-first-attempt.json.
3. Una comparación estática inicialmente abarcaba el return de un cleanup en lugar del JSX; se corrigió el punto de inicio a header y confirmó marcado corporativo idéntico.

## Integridad y compilaciones

- 111 archivos protegidos con SHA-256 coincidentes: incluye código fuera de alcance, dependencias, imágenes, dist comercial y la salida VitePress anterior. Referencia: protected-hashes.json.
- Las tres páginas conservan literalmente todo su contenido desde main hasta el final y todos sus ID. Una instancia Navbar y una SectionNav por página.
- Compilación comercial: salida 0, Vite 6.4.1, 1600 módulos, 17.68 segundos; se ejecutó únicamente Vite, sin generar-seo.mjs.

```powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-007/build-temporal/comercial
node node_modules/vitepress/bin/vitepress.js build docs --outDir D:/promate/web/pyp-web/docs/evidencias/PYP-007/build-temporal/documentacion
```

VitePress compiló correctamente con salida 0. La primera invocación mediante npm.ps1 omitió --outDir y regeneró accidentalmente docs/.vitepress/dist. Se detectó mediante los hashes protegidos. Se reconstruyeron las fuentes documentales anteriores temporalmente y se restauraron sus 65 archivos de salida solo después de comprobar que coincidían exactamente con todos los hashes originales. Las fuentes actuales se preservaron y dist comercial nunca cambió.

El índice de búsqueda depende del orden de procesamiento: la primera reconstrucción produjo hashes diferentes y no se aplicó; el siguiente intento coincidió y permitió la restauración exacta. Ver documentation-restoration.json y documentation-restoration-retries.json.

Para el build documental final se utiliza la CLI directa de Node indicada arriba, que sí transmite --outDir, con salida temporal nueva en build-temporal/documentacion. No se modifica package.json para corregir la envoltura de PowerShell.

## Pendientes

Pruebas humanas en dispositivos físicos, gesto táctil y lector de pantalla; otros navegadores. No se probaron envíos de formularios ni disponibilidad remota de Plataforma. No se instalaron dependencias ni se ejecutaron commit, push o despliegue.

## Comprobación final

La CLI directa compiló la documentación actual en build-temporal/documentacion con salida 0 en 19.48 segundos. Se comprobaron después los 111 hashes protegidos: todos coinciden. Los archivos fuente y Markdown modificados pasan whitespace; git diff --check limitado a esta intervención devuelve 0. La comprobación global devuelve 2 únicamente por el espacio final preexistente en src/main.jsx:45; no se modifica ese archivo fuera de alcance.
