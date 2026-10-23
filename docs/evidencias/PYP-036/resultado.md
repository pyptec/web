# PYP-036 — Resultado de implementación

Fecha: 2026-10-23 (America/Bogota).

## Objetivo y alcance

Ampliar las páginas existentes de monitoreo energético, IoT Industrial y Automatización Edge con modalidades comerciales, integración abierta e indicadores TPM. [Prompt íntegro](../../prompts/PYP-036.md). Implementación local autorizada; publicación no autorizada.

## Estado inicial

Rama main; HEAD 3dae972b5a14c92757b1eeaad01437385ab1a0dc, correspondiente a PYP-035. Sin modificaciones comerciales previas; documentación modificada, dos bajas en raíz y numerosos archivos sin seguimiento preexistentes. Se conservaron íntegramente. [Inventario Git inicial](./git-inicial.txt). Se leyeron AGENTS.md, índice, bitácora, prompt y cierre/evidencias PYP-035 antes de editar.

## Archivos y decisiones técnicas

- src/pages/MonitoreoEnergetico.jsx: cuatro modalidades (suministro, arrendamiento, MaaS y datos/analítica); aprovechamiento de medidores existentes, alcance contractual y posibles costos de instalación/adecuación/conectividad.
- src/pages/IoTIndustrialLoRaWAN.jsx: equipos existentes, compatibilidad, interfaces de campo frente a transmisión, plataformas del cliente/SCADA/MES/ERP/CMMS/nube/IoTrack, autorización contractual y continuidad condicionada.
- src/pages/AutomatizacionEdge.jsx: disponibilidad, fórmula OEE, MTBF, MTTR, paradas, tendencias, anomalías y energía/producción; restricciones de datos y validación explícitas.
- src/data/seo.js: únicamente las tres descripciones; títulos conservados por seguir describiendo el servicio principal. Canonical, Open Graph, sitemap y esquemas compartidos conservados.
- docs/prompts/PYP-036.md, docs/prompts/index.md, docs/BITACORA_DESARROLLO.md y esta carpeta: prompt, registro y evidencias.

Se reutilizaron SectionTitle/FeatureCard, Heading/Card y Heading/Feature, botones y colores existentes. Los dos CTA nuevos conducen a /#contacto, el formulario corporativo actual. Sin dependencias ni rutas nuevas. Sin precios, ahorros, certificaciones o resultados inventados; TPM presentado como integración/análisis sujeto a evaluación. Sin modificación de Analytics, formulario, CLG ni RPI-MDFR.

## Comandos y validaciones

- git status --short, git rev-parse HEAD, git branch --show-current y git diff --numstat: estado inicial y alcance revisados.
- npx vite build --outDir docs/evidencias/PYP-036/build-temporal/comercial: correcto; [build](./build.txt).
- node scripts/generar-seo.mjs --outDir docs/evidencias/PYP-036/build-temporal/comercial: correcto; [prerender](./prerender.txt). Equivale a las dos etapas del script comercial, redirigidas para preservar dist.
- node --test docs/evidencias/PYP-035/analytics-regression.test.mjs: 17 pruebas correctas, cero fallos; [registro](./analytics.txt).
- node docs/evidencias/PYP-036/validar-seo.mjs: 73 controles correctos, cero fallos; [resultado](./seo-diagnostico.json). Adaptación del auxiliar PYP-035: se retiran cuatro expectativas de identidad del contenido con PYP-030, incompatibles con el alcance actual; se conserva el original.
- npm run docs:build: correcto; [registro](./docs-build.txt). Sin modificación de dist comercial.
- git diff --check: correcto en la comprobación inicial posterior al cambio; se repetirá al cierre documental.
- Comparación SHA-256 de 82 archivos: solo difieren las cuatro fuentes autorizadas; los 17 archivos dist permanecen byteidénticos. CLG, RPI-MDFR, formulario en App.jsx, Analytics, rutas, assets, sitemap y dependencias intactos. [Integridad](./integridad.json).

## Incidencias y límites

La primera escritura documental guardó prompt/snapshot y se detuvo antes de editar fuentes: el selector del bloque contacto no contemplaba sus saltos de línea. Se corrigió al inspeccionar el código real.

El primer recorrido de navegador pasó 22 controles y se detuvo en una expectativa heredada sobre un POST que no se observó. Se conservaron [resultado](./navegador-intento01.json) y [log](./navegador-intento01.txt). Se retiró ese intento de envío del auxiliar; la recepción del formulario no forma parte de la validación y no se declara aprobada. Todas las solicitudes externas estaban interceptadas.

Avisos preexistentes de datos Browserslist/Baseline antiguos; no se actualizaron dependencias ni se ejecutó npm audit fix. Las pruebas con etiqueta sustituida no acreditan configuración externa ni recepción real en GA4. Pendientes aprobación visual del propietario, comprobación móvil física y publicación expresamente autorizada. Se mantienen pendientes externos de PYP-035 sin declararlos resueltos.

## Aprobación, commit y publicación

Implementación local autorizada. Sin staging, commit, push ni despliegue Netlify. **NO PUBLICADO**. El árbol conserva pendientes previos y cambios PYP-036; no se declara limpio.

## Cierre de navegador y evidencias

[node docs/evidencias/PYP-036/navegador.mjs](./navegador.mjs): **56 controles correctos, cero fallos y cero excepciones JavaScript**. [Resultado completo](./navegador.json), [log](./navegador.txt). Navegación SPA y retorno, consentimiento/aceptación/rechazo/revocación, etiqueta bloqueada, CTA hacia el formulario, CLG y RPI, imágenes y StrictMode incluidos. Los dos CTA nuevos llegan al formulario tanto a 390 como a 1440 píxeles. Las tres secciones se verificaron sin overflow en ambos tamaños.

Capturas reales de cada sección:

| Página | Escritorio 1440 | Móvil 390 |
| --- | --- | --- |
| Monitoreo energético | [captura](./monitoreo-energetico-1440.png) | [captura](./monitoreo-energetico-390.png) |
| IoT Industrial | [captura](./iot-industrial-1440.png) | [captura](./iot-industrial-390.png) |
| Automatización Edge | [captura](./automatizacion-edge-1440.png) | [captura](./automatizacion-edge-390.png) |

Inspección visual directa de monitoreo móvil, IoT escritorio y Edge móvil: tarjetas y textos legibles, CTA y advertencias visibles. Las capturas de sección incluyen el encabezado fijo superpuesto en su parte superior; no equivalen a una captura completa de toda la página. Resto de capturas reales de Inicio, CLG, RPI y consentimiento conservadas en esta carpeta.

**Listo para revisión visual local.** Ejecutar npm run dev y visitar las tres rutas; las secciones se encuentran antes del contacto de cada servicio. Pendiente aprobación visual del propietario. Recepción GA4 y recepción de formularios no verificadas; no se realizaron cambios de configuración remota.

Estado Git final: [inventario](./git-final.txt), [archivos de fuentes modificados](./diff-fuentes.txt). Solo cuatro fuentes comerciales modificadas más documentación/evidencias PYP-036 e índice/bitácora ampliados; los cambios previos permanecen. Índice sin cambios preparados. Sin commit, push ni despliegue. **NO PUBLICADO**.

Cierre documental: VitePress detectó seis enlaces relativos a archivos .log como enlaces muertos; se añadieron copias .txt enlazables conservando los logs originales, sin desactivar su validación estricta. Resultado final en docs-build-cierre.txt. git diff --check: código 0; índice vacío.
