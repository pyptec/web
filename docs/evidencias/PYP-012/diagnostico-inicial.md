# Causas antes de modificar código — 2026-10-17

1. scrollToSection.js ejecuta decodeURIComponent directamente sobre el hash. SectionNav lo invoca en useEffect al montar/cambiar hash y en hashchange. /#% produce URIError dentro del efecto y deja React sin renderizar.
2. Navbar compara pathname con href por igualdad literal, tanto para activeSolution como para aria-current y clases del enlace. React Router admite barra final, pero /ruta/ no coincide con /ruta.
3. El fondo verde del botón depende de activeSolution. En Inicio es false; en Monitoreo sin barra es true. Se debe separar el tratamiento visual constante del botón del estado activo de los enlaces.

Rutas registradas intactas: /, /monitoreo-energetico, /iot-industrial, /automatizacion-edge. No se requiere modificar main.jsx, SectionNav, SEO ni redireccionar.
