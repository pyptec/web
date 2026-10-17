# PYP Tecnología Electrónica — Estado y bitácora de cambios
Fecha de inicio: 2026-10-17
Proyecto local: `D:\promate\web\pyp-web`
Tecnologías conocidas: React, Vite, Tailwind, lucide-react, React Router; despliegue GitHub/Netlify.

## Estado conocido (validar contra el repositorio)
- `/`: página principal `src/App.jsx`, existente; reorganizar al final.
- `/monitoreo-energetico`: `src/pages/MonitoreoEnergetico.jsx`, existente.
- `/iot-industrial`: `src/pages/IoTIndustrialLoRaWAN.jsx`, usuario confirmó funcionamiento y commit.
- `/automatizacion-edge`: `src/pages/AutomatizacionEdge.jsx`, usuario confirmó apariencia; comprobar ruta, SEO y commit.
- `src/main.jsx`: contiene React Router y `Seo` en las rutas existentes.
- `src/components/Seo.jsx`: metadatos por ruta; comprobar entrada de automatización.
- Logo oficial: `src/assets/proyectos/log_pyp.webp` (comprobar ruta exacta en repositorio).
- Próximas páginas: Producción/OEE, Agua/Vertimientos, Proyectos (CLG Alkosto: 46 equipos reportados por el usuario).

## Decisiones de diseño
- Color principal `#A6CE39`; hover `#416D13`; iconos `#6BA425`; texto oscuro `#1E1E1E`.
- Una sola barra compartida `Navbar.jsx`, inspirada en la de Automatización/Edge; responsive, accesible, enlaces activos y botón Hablemos.
- No reescribir ni rediseñar la página principal hasta terminar páginas internas.
- Mantener SEO, imágenes reales, formularios, rutas y enlaces.
- No asumir que una característica está desplegada sin revisar repositorio y producción.

## Protocolo para cada intervención
1. Registrar objetivo, prompt e identificador.
2. Inspeccionar archivos y dependencias actuales; no sobrescribir sin comparar.
3. Aplicar cambios mínimos; mostrar `git diff` y explicar decisiones.
4. Ejecutar `npm run build`; comprobar rutas, enlaces, SEO y vista móvil.
5. Registrar evidencias, incidencias, archivos modificados y estado.
6. Solicitar aprobación antes de `git commit` y `git push`.

## Registro
| ID | Fecha | Objetivo | Archivos | Pruebas | Resultado | Commit |
|---|---|---|---|---|---|---|
| PYP-001 | 2026-10-17 | Inspección y propuesta de navbar compartida | Por determinar | Pendientes | Planificado | Pendiente |

### Plantilla de entrada
**ID:**
**Fecha:**
**Objetivo:**
**Prompt enviado:**
**Archivos inspeccionados:**
**Cambios realizados:**
**Justificación técnica:**
**Pruebas y resultados:**
**Incidencias/correcciones:**
**Evidencias (capturas, terminal, diff):**
**Commit/hash y despliegue:**
**Estado:**
