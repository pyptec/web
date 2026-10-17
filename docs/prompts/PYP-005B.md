# PYP-005B — Finalización de la documentación web con VitePress

Proyecto: D:\promate\web\pyp-web

## OBJETIVO

Completar la instalación y configuración de VitePress para consultar desde un navegador local la bitácora, los prompts, las evidencias y la arquitectura del proyecto web PYP.

PYP-004 ya fue implementado y documentado. No es necesario repetirlo.

## FASE 1 — REVISIÓN

1. Lee AGENTS.md.
2. Ejecuta git status --short.
3. Inspecciona docs/, docs/.vitepress/config.mjs y package.json.
4. Verifica que existan los prompts PYP-001, PYP-002, PYP-004 y PYP-005.
5. Verifica que la bitácora tenga las entradas correspondientes.
6. Conserva todos los cambios anteriores.

## FASE 2 — INSTALACIÓN

1. Comprueba las versiones de Node.js y npm.
2. Verifica la compatibilidad de VitePress.
3. Instala VitePress como dependencia de desarrollo, utilizando una versión compatible.
4. Configura comandos independientes para la documentación:
   - npm run docs
   - npm run docs
   - npm run docs
5. Conserva los scripts existentes de la web comercial.

## FASE 3 — CONFIGURACIÓN WEB

Utiliza docs/ como raíz de documentación.

Configura:

- Inicio de documentación.
- Bitácora de desarrollo.
- Índice de prompts.
- Arquitectura.
- Evidencias.
- Navegación lateral.
- Búsqueda local.

No modifiques los componentes React, las rutas comerciales ni los archivos SEO.

## FASE 4 — REGISTRO DEL PROMPT

Guarda el texto completo de esta instrucción en:

docs/prompts/PYP-005B.md

Actualiza el índice de prompts y añade a docs/BITACORA_DESARROLLO.md una entrada PYP-005B con fecha real, objetivo, implementación, archivos afectados, pruebas, incidencias y pendientes.

No inventes resultados ni pruebas.

## FASE 5 — VALIDACIÓN

1. Ejecuta npm run docs.
2. Comprueba que la documentación compile correctamente.
3. Verifica que los enlaces internos sean válidos.
4. Inicia el servidor local de VitePress para confirmar que arranca.
5. Comprueba que la compilación de documentación no sobrescriba el directorio dist/ de la web comercial.
6. Ejecuta git diff --check.
7. Revisa git status --short.

Si el proceso requiere cambiar archivos comerciales fuera de package.json y el archivo de bloqueo de dependencias, detente y explica el motivo.

## FASE 6 — INFORME FINAL

Entrega:

A. Archivos creados y modificados.

B. Versión instalada de VitePress.

C. Resultados de las pruebas.

D. URL local para abrir la documentación.

E. Comandos para iniciar y compilar la documentación.

F. Confirmación de actualización de prompts y bitácora.

G. Estado final de Git.

No ejecutes commit, push ni despliegue.
