# Arquitectura

La web comercial utiliza React, Vite, Tailwind y React Router. Su entrada es src/main.jsx.

La documentación utiliza docs/ como raíz. La configuración preparada de VitePress está en docs/.vitepress/config.mjs. No se integra en las rutas comerciales.

## Documentación web

VitePress 1.6.4 se incorpora como dependencia de desarrollo en el package.json existente. Los comandos docs, docs:build y docs:preview utilizan exclusivamente docs/ como raíz. La salida se resuelve en docs/.vitepress/dist y la caché en docs/.vitepress/cache; ambas quedan fuera del seguimiento documental mediante docs/.gitignore.

Los scripts comerciales dev, build y preview se conservan. VitePress dispone de sus dependencias de Vite; no se cambia la versión declarada de Vite comercial.

La búsqueda local indexa los Markdown. Los prompts históricos se conservan literalmente. La navegación incluye índice, bitácora, prompts, arquitectura y evidencias.

Compatibilidad consultada en la [guía oficial de VitePress 1.x](https://vuejs.github.io/vitepress/v1/guide/getting-started) y metadatos npm. Entorno verificado: Node 22.15.1 y npm 10.9.2.


## Navegación corporativa — PYP-006

Las tres páginas interiores comparten Inicio, Soluciones (tres rutas existentes), Proyectos y Tecnología de la homepage, Plataforma y Hablemos. Edge mantiene enlaces secundarios locales. Los enlaces a secciones de la homepage esperan a que React monte el destino antes de desplazar y enfocar.

Producción y OEE, y Agua y Vertimientos permanecen como proyectos futuros documentados; no tienen enlaces activos ni rutas nuevas. La homepage no se modifica en esta intervención.

## Navegación local — PYP-007

SectionNav es un componente independiente compuesto dentro de Navbar mediante children. Así ambos niveles comparten un solo encabezado sticky y una medición de altura. El marcado corporativo se conserva. La fila local permanece horizontal, con overflow-x-auto y revelación al recibir foco. No implementa estado de sección activa.

El helper src/utils/scrollToSection.js se comparte entre anclas corporativas y locales: offset real del header, movimiento reducido, foco y espera acotada que se invalida al cambiar ruta/hash. SectionNav atiende hashes directos y del historial. No se añaden ID a las páginas: IoT usa únicamente soluciones y contacto, los dos existentes.

## Página principal — PYP-008

App.jsx compone el mismo Navbar corporativo y SectionNav de las páginas interiores. La fila local utiliza soluciones, arquitectura, rpi-mdfr y sectores; Proyectos, Tecnología y Hablemos permanecen en la fila corporativa y no se duplican. El efecto antiguo de App que interceptaba globalmente los enlaces hash se elimina: SectionNav y scrollToSection gestionan las anclas, historial, foco y movimiento reducido de forma compartida. Navbar, SectionNav y el helper no se modifican en esta intervención. El contenido desde main, el formulario Netlify y el footer permanecen intactos.

## Formulario Netlify — PYP-011

index.html contiene una declaración estática oculta contacto-pyp para detección durante despliegue. src/App.jsx conserva la representación visible con POST nativo, sin manejador AJAX ni mensajes propios. Ambas declaran form-name, nombre, correo, empresa, solucion, mensaje y bot-field; netlify-honeypot apunta a bot-field. Nombre, correo y mensaje son obligatorios en la interfaz. No duplicar el formulario visible ni eliminar la declaración estática al modificar el contacto. La detección efectiva, recepción y antispam requieren validar posteriormente en Netlify con autorización. [Resultado y pruebas locales](../evidencias/PYP-011/resultado.md).

## Robustez de navegación — PYP-012

scrollToSection captura URIError únicamente al decodificar el fragmento y retorna sin inventar destinos; los demás errores se propagan. Se conserva la invalidación de scroll pendiente al cambiar ruta/hash, offset, foco e historial. Navbar normaliza barras finales solo para reconocer el enlace de solución activo; no cambia URL, rutas ni canonical. El botón Soluciones mantiene siempre el tratamiento verde aprobado, también en Inicio, mientras aria-current identifica únicamente la solución actual en el desplegable. [Resultado y comparación visual](../evidencias/PYP-012/resultado.md).

## SEO técnico e inicial — PYP-013

src/data/seo.js centraliza títulos/descripciones aprobados, dominio, canonical e imagen Open Graph. Lo consumen Seo.jsx al navegar y scripts/generar-seo.mjs al terminar Vite. El generador produce HTML por las cuatro rutas, reemplazando únicamente etiquetas SEO del head; body/formulario/JSON-LD y bundles se conservan. npm run build mantiene su secuencia existente; --outDir permite pruebas aisladas. La regla SPA no forzada se conserva para que los archivos existentes prevalezcan en Netlify, pendiente de verificar el CDN real. public/sitemap.xml enumera las cuatro canonical y robots.txt mantiene su referencia. public/og-pyp.png es copia exacta del logo oficial original. Esto no prerenderiza el contenido React. [Resultados y metadatos completos](../evidencias/PYP-013/resultado.md).

## Verificación de entrega — PYP-014

La matriz de siete URL distingue servidor de desarrollo, vite preview 6.4.1 y artefacto generado. Desarrollo no utiliza los HTML postprocesados; preview resuelve directorios con barra y busca pathname.html sin ella antes del fallback. Por tanto, un head raíz en preview sin barra no demuestra un defecto de Netlify. El artefacto contiene los cuatro heads correctos; el modelo local de archivos/directorios responde con ellos en ambas variantes. _redirects sigue sin fuerza. Netlify CDN/Pretty URLs/panel permanecen pendientes de validación real y no se cambian reglas basándose solo en preview. [Matriz y evidencia completa](../evidencias/PYP-014/resultado.md).

## React Router — PYP-016

React Router DOM queda fijado a 7.18.4 y arrastra react-router 7.18.4. Se mantiene BrowserRouter declarativo, las cuatro rutas y sus importaciones; no se introduce Framework/Data Mode, SSR ni cambios de formulario. Node local 22.15.1 y React/DOM 18.3.1 cumplen los requisitos de Router (Node >=20, React >=18). Solo se añaden cookie y set-cookie-parser necesarios y se retira @remix-run/router. La fuente SEO compartida y la generación de HTML permanecen intactas. [Regresión y auditoría posterior](../evidencias/PYP-016/resultado.md).

## Vite comercial — PYP-017

Vite directo se fija a 6.4.4 exacto con peers/engines verificados; no se modifican plugins ni configuración comercial. VitePress 1.6.4 mantiene Vite 5.4.21 anidado: el audit del paquete Vite puede persistir por esa copia aunque la directa ya esté corregida. El build sigue siendo Vite y luego el generador SEO existente. Comparación con PYP-016: artefacto comercial idéntico por hash y regresiones equivalentes. Preview 6.4.4 conserva la diferencia local de rutas sin barra; no se equipara a Netlify CDN. [Resultado de actualización y riesgos residuales](../evidencias/PYP-017/resultado.md).
