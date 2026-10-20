# PYP-035 — Verificación final GA4 y publicación

He realizado los ajustes manuales en Google Analytics 4, etiqueta GT-K824G9N8 y flujo G-WJ6METJRZD.

En «Gestionar detección automática de eventos» dejé:

- Vistas de página cuando cambia el historial del navegador: DESACTIVADAS.
- Interacciones con formularios: DESACTIVADAS.
- Desplazamientos: ACTIVADOS.
- Clics de salida: ACTIVADOS.
- Interacciones con vídeos: ACTIVADAS.
- Descargas de archivos: ACTIVADAS.

Los cambios fueron guardados.

Continúa PYP-035 con estas instrucciones:

1. Consulta nuevamente la etiqueta pública de Google Analytics, evitando respuestas de caché.
2. Comprueba que `vtp_historyEvents` ya no esté activo.
3. Repite las pruebas de navegación SPA con la etiqueta pública original, sin modificarla.
4. Verifica que cada navegación genere un único `page_view` y que se respete el consentimiento.
5. Comprueba que las seis rutas, imágenes, SEO, CLG y RPI-MDFR continúen funcionando.
6. Si las verificaciones son satisfactorias, realiza el commit y push autorizados a `origin/main` de PYP-030, PYP-031, PYP-032 y sus correcciones y documentación.
7. Comprueba el estado del despliegue en Netlify y verifica las seis rutas públicas si se publica.
8. Actualiza las evidencias de PYP-035 con el SHA, resultado de GitHub y estado real de Netlify.

No modificar el diseño aprobado ni los 17 archivos locales de `dist`.

Si la etiqueta pública continúa generando eventos duplicados, no publiques todavía: informa la evidencia exacta y el siguiente ajuste necesario.

No realizar despliegues repetidos ni pagos en Netlify.
