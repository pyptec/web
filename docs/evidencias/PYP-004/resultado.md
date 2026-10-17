# Evidencia PYP-004 — 2026-10-17

## Compilación

Comando ejecutado desde la raíz del repositorio:

```powershell
node node_modules/vite/bin/vite.js build --outDir docs/evidencias/PYP-004/build-temporal
```

Resultado: salida 0; Vite 6.4.1; 1598 módulos transformados; build completado en 4.26 segundos. No se ejecutó el generador SEO ni se escribió en dist comercial. Los artefactos se conservan en build-temporal/ dentro de esta carpeta.

Advertencias: baseline-browser-mapping y caniuse-lite contienen datos antiguos. No se actualizaron dependencias. Git también advierte sobre normalización LF/CRLF; no se cambió su configuración.

## Comprobaciones ejecutadas

- Una instancia de Navbar en Monitoreo y otra en IoT, sin encabezados independientes.
- Comparación literal de main y del contenido posterior: idénticos antes/después en ambas páginas.
- Identificadores de ancla idénticos; todos los href locales estáticos de ambas páginas tienen destino.
- Inicio conserva / y Hablemos conserva #contacto. El logo compartido apunta a /.
- Renderizado estático React: HTML de Navbar con las props actuales de Edge idéntico al anterior; el espacio opcional children renderiza el CTA.
- SHA-256: 47 archivos protegidos idénticos antes/después, incluido AutomatizacionEdge.jsx, sus imágenes, App.jsx, main.jsx, Seo.jsx, configuración, dependencias y todo dist.
- Revisión de git diff de las páginas y comparación de Navbar con la copia previa (no está seguido por Git).

Los archivos *.before.txt y protected-hashes.json conservan la referencia usada para estas comparaciones. No son prompts reconstruidos.

## Pendiente

Sin navegador disponible para esta ejecución: revisión visual desktop/móvil, teclado, scroll sticky, clic real en anclas y enlaces de correo/teléfono. El renderizado estático no verifica disposición visual ni interacción.
