# PYP-028 — CLG como producto Edge IoT

Fecha: 2026-10-18. [Prompt completo recibido en dos entregas](../prompts/PYP-028.md). [Evidencias](../evidencias/PYP-028/resultado.md).

La página conserva la ruta y componentes existentes. CLG.jsx añade secciones comerciales y un diagrama funcional HTML accesible con lista ordenada de tres etapas, apiladas en móvil. Los eventos entran por interfaces físicas o comunicaciones elegidas por proyecto; la regla local asocia condiciones con audio y salidas. No se expone la plataforma interna.

La descripción de hardware (4 entradas digitales acopladas, 4 salidas de relé, 4 entradas ADC, audio estéreo) procede de PYP-028. No se publican parámetros eléctricos ni garantías no documentadas. Se conservan fotografías, dashboard e infografía aprobada sin alteraciones.

## Matriz de capacidades y evidencia

Estas clasificaciones describen la evidencia disponible para redactar el sitio; no equivalen a pruebas de firmware o de las 47 unidades.

| Capacidad | Estado interno | Evidencia y límite |
| --- | --- | --- |
| RTC y reproducción por horarios | Disponible mediante configuración; confirmada por propietario | PYP-025-confirmacion-funciones y PYP-028. Sin prueba de firmware; calendario del dashboard no demostrado por la captura de archivos. Sincronización de red condicionada a configuración. |
| Entradas digitales y pulsos | Disponible mediante configuración | PYP-024 y PYP-028. Regla entrada/audio por proyecto. |
| 4 relés | Disponible mediante configuración | PYP-028. Condiciones eléctricas y reglas requieren verificación de instalación. |
| 4 ADC | Disponible mediante desarrollo o integración | Hardware comunicado en PYP-028; acondicionamiento y reglas analógicas por definir. |
| Audio estéreo y pausa de música para anuncios | Disponible mediante configuración; confirmada por propietario | PYP-025 y PYP-028. No se infiere certificación. |
| Serie / RS-232 | Interfaz documentada; integración por verificar | Matriz PYP-024, fuente propietario. No hay esquema ni prueba de cableado o firmware. |
| Modbus RTU | Disponible mediante desarrollo o integración | Identificado por propietario en PYP-028; no hay prueba específica ni mapa de registros. |
| CAN | Disponible mediante desarrollo o integración | Interfaz citada en PYP-024; perfil y mensajes requieren validación. |
| Ethernet mediante sockets | Disponible mediante desarrollo o integración | Vía identificada en PYP-028; infografía conceptual no acredita protocolo operativo. |
| Modbus TCP | Disponible mediante desarrollo o integración | Identificado en PYP-028; sin prueba de implementación específica. |
| MQTT | Pendiente de verificación; posibilidad de integración | Las referencias genéricas a MQTT en otros servicios PYP no acreditan CLG. Sin broker, topics ni despliegue inferidos. |
| Administración de contenidos local y remota | Disponible mediante configuración | PYP-024/025; acceso remoto condicionado a conectividad. |

Ningún protocolo se clasifica como implementado y validado mediante pruebas técnicas en esta intervención: el repositorio web no contiene firmware ni trazas de comunicaciones CLG.

## Caso comercial y SEO

La confirmación explícita del propietario en la continuación de PYP-028 vincula los 47 dispositivos al caso existente y a Alkosto/Ktronix. Antes de este cambio el bloque CLG de Inicio no nombraba estos clientes. Se añade esa relación sin cantidades por cliente, sedes o fechas. Se conserva una sola URL de producto; Inicio usa el ancla caso-clg y ambos contenidos se enlazan. No se importan nuevos logotipos.

clg-meta.js centraliza title y description usados por SEO React, Open Graph y prerender. Product actualiza únicamente el nombre y hereda la descripción; BreadcrumbList y Organization existentes se conservan. El generador SEO no cambia y produce los cinco HTML iniciales en la carpeta temporal de esta tarea. El sitemap conserva sus cinco canonical.

## Search Console después de una publicación autorizada

1. Verificar la propiedad de dominio pyptecnologia.com con el método ofrecido por Search Console y acceso autorizado del propietario.
2. Enviar https://pyptecnologia.com/sitemap.xml.
3. Inspeccionar https://pyptecnologia.com/proyectos/clg/ y comprobar la URL canónica y rastreo.
4. Solicitar indexación si corresponde tras revisar el resultado.
5. Consultar indexación y rendimiento por página.
6. Analizar consultas, impresiones, clics y CTR para ajustar el contenido con datos reales.

No se accedió a Search Console ni se comprobó indexación. Las palabras clave son hipótesis editoriales; no se prometen posiciones ni tráfico.
