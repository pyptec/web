# Instrucciones permanentes — PYP

Toda la documentación debe permanecer dentro de D:\promate\web\pyp-web.

En cada intervención:
1. Leer estas instrucciones e inspeccionar el estado Git antes de editar. Conservar los cambios previos.
2. Identificar el prompt y guardar su texto completo disponible en docs/prompts/PYP-NNN.md. No inventar instrucciones históricas ni sobrescribir versiones distintas: conservarlas con un sufijo explícito.
3. Implementar únicamente cambios autorizados.
4. Ejecutar las pruebas posibles y distinguir resultados de verificaciones pendientes.
5. Añadir cronológicamente el resultado en docs/BITACORA_DESARROLLO.md: identificador, título, fecha real, objetivo, enlace al prompt, estado inicial, archivos modificados, explicación técnica, validaciones, evidencias, incidencias, pendientes y estado de aprobación, commit y publicación.
6. Guardar evidencias en docs/evidencias/ y documentación de arquitectura en docs/arquitectura/.
7. Informar los archivos modificados. No registrar contraseñas, tokens ni información sensible.
8. No ejecutar commit, push ni despliegue sin autorización expresa.

VitePress debe utilizar docs/ como raíz y docs/.vitepress/ como configuración. Sus comandos de desarrollo y build deben ser independientes de la compilación comercial. No crear proyectos ni documentación fuera de este repositorio. No modificar dist comercial para validar documentación.

PYP-005: la instalación de VitePress permanece pendiente hasta completar PYP-004, según la condición del prompt inicial. No asumir completada una integración sin inspeccionar el código.
