# PYP-031 — Arquitectura y operación de Analytics

Fecha: 2026-10-19 (America/Bogota). [Prompt](../prompts/PYP-031.md). [Resultado y pruebas](../evidencias/PYP-031/resultado.md).

## Auditoría y alcance

No había GA, GTM, CMP, política de privacidad ni aviso de analítica en src, public o index.html. Se leyeron AGENTS.md, PYP-030, index.html, App.jsx, rutas, SEO, páginas, enlaces y formulario. No se accedió a cuentas Google. El agotamiento de créditos Netlify fue informado por el propietario en PYP-031; no se verificó en el panel.

src/lib/analytics.js centraliza el ID público G-WJ6METJRZD, carga, preferencia, vistas, eventos y filtros de datos. Analytics.jsx se monta una sola vez dentro del Router y observa pathname/search. AnalyticsConsent.jsx ofrece una sección no modal, botones equivalentes de aceptar/rechazar y un control permanente al pie de todas las páginas. No requiere dependencias. SiteRoutes.jsx integra ambos sin modificar páginas, App.jsx, formulario, index.html o SEO de PYP-030.

## Consentimiento y privacidad

Estado inicial sin permiso: no se inserta gtag, no hay comandos ni solicitudes GA ni cookies GA. La elección expresa (aceptar o rechazar) se conserva en localStorage durante 180 días, sin identificador de visitante propio. Si storage está bloqueado, funciona en memoria; al recargar se vuelve a pedir permiso. Se sincroniza revocación entre pestañas mediante storage. Si expira, vuelve a desconocido en la siguiente carga. No se emplea consentimiento implícito, Consent Mode avanzado, pings sin cookies, Google Ads ni remarketing. La implementación usa bloqueo de etiqueta previo al consentimiento, sin Google Consent Mode.

Al aceptar se carga asíncronamente la etiqueta oficial; Google puede utilizar identificadores técnicos/cookies e IP de conexión. No se afirma ausencia de todo dato personal: se excluyen los campos del formulario y parámetros identificables propios. Se desactivan Google Signals y personalización publicitaria. Cookies configuradas por 395 días sin renovación en config (aproximadamente 13 meses). La retención de eventos en la cuenta es otro ajuste, pendiente del propietario.

Al rechazar después de aceptar, el flag oficial ga-disable-G-WJ6METJRZD bloquea la recopilación futura y se eliminan cookies _ga y _ga_* accesibles en el dominio y raíz. No se recarga la página ni se pierden campos escritos en el formulario. No se pueden retirar solicitudes ya enviadas, datos históricos o cookies inaccesibles. No se oculta esa limitación. Reaceptar utiliza la instancia ya cargada y mide solo la página actual. No hay identificadores de usuario propios ni datos introducidos en formularios en los eventos.

El aviso de analítica explica responsable, finalidad, cookies/identificadores, Google, posible procesamiento fuera de Colombia, duración, rechazo, modificación y canal de contacto. Es un aviso específico de analítica; no sustituye una política integral de tratamiento. Antes de publicar, revisión jurídica colombiana del aviso/consentimiento, deberes del responsable, atención de derechos, transferencias/transmisiones, relación contractual con Google, retención y tratamiento del formulario. No se afirma cumplimiento legal definitivo. La SIC explica la aplicación de la Ley 1581 al tratamiento de datos personales mediante cookies en Colombia: [comunicación oficial sobre Google](https://www.sic.gov.co/boletin/juridico/habeas-data/superindustria-ordena-google-llc-cumplir-con-la-ley-1581-de-2012).

## Estrategia única de vistas

Configuración gtag con send_page_view: false; vistas exclusivamente manuales. recordPage usa datos del catálogo SEO, no document.title, evitando carreras con el efecto Seo. Se normaliza slash final como canonical, se eliminan todos los parámetros/fragmentos de page_location y page_path, y no se cuentan query/hash, rerenders, efectos dobles de StrictMode ni clics internos sin cambio de página. Una vuelta real A → B → A sí cuenta tres vistas. No se emite session_start manual, no se inventan sesiones ni se fuerzan IDs.

Tras consentimiento/carga lenta se mide solo la página actual; no se reproducen rutas o clics anteriores. Un módulo persistente previene doble inicialización dentro del documento. Una recarga real inicia un documento nuevo y genera una vista legítima. El primer referente externo se reduce a origen, sin ruta/query; las navegaciones posteriores usan la canonical anterior. Esto reduce detalle de referencias a cambio de privacidad.

**Requisito previo a publicar:** en GA4 → Administrar → Flujos de datos → flujo web G-WJ6METJRZD → Medición mejorada, desactivar los eventos automáticos de medición mejorada, especialmente vistas por cambios de historial y la interacción automática con formularios. Revisar también etiquetas conectadas, reglas de creación/modificación de eventos y Signals. El código no puede auditar ni cambiar esa configuración remota. send_page_view: false por sí solo no desactiva los cambios de historial de Medición mejorada; [Google lo documenta expresamente](https://developers.google.com/analytics/devguides/collection/ga4/views). Sin este ajuste no se garantiza ausencia de duplicados/eventos automáticos remotos; no publicar antes de verificarlo. No se tomó acción en la cuenta.

## Eventos y formulario

- page_view: page_location canonical, page_title del catálogo SEO, page_path limpio y page_referrer sanitizado; cinco páginas, CLG distinguible por /proyectos/clg/.
- contact_click: contact_method email, phone o whatsapp y page_path. Se delega el clic, no se envían href, email, número, texto, subject ni campos. Hay enlaces reales email/teléfono; no hay WhatsApp en el sitio actual. Se reconoce WhatsApp solo si existe un enlace real a uno de sus hosts oficiales, sin crearlo.
- contact_cta_click: clic real en enlace interno #contacto, con page_path de origen; permite identificar clics de CLG hacia Contacto. No es una conversión.

No se implementa generate_lead: el formulario usa POST nativo Netlify, sin fetch, callback ni URL de éxito verificable propia. No existe evidencia fiable de recepción en React. No se escuchan submit, botones, validación, HTTP de error o visitas para inventar leads. No se modifica el comportamiento ni marcado del formulario. Las solicitudes reales se consultan en Netlify hasta que una tarea autorizada defina una confirmación verificable y deduplicación. No se atribuyen ventas a vistas/clics. No se usa view_item.

## Adquisición y campañas

GA4 puede clasificar orgánico/directo/referencia/social mediante referente y campañas tras el consentimiento. Rechazo, bloqueadores, URLs saneadas y referente reducido limitan cobertura/detalle. UTM permitidas: utm_source, utm_medium, utm_campaign, utm_content, solo tokens minúsculos de hasta 64 caracteres, letras/números/guion/guion bajo, iniciados por letra y sin secuencias de 7 dígitos. No se admiten correo, URL, espacios, teléfonos ni utm_term de texto libre; tampoco gclid/fbclid. Los tokens iniciales se mantienen en memoria y pasan como campaign_source/medium/name/content al único config, sin incluir la query en page_location ni persistir actividad anterior al permiso. No son eventos retroactivos.

Convención futura, sin crear campañas: source identifica canal/socio; medium usa social, email, referral, messaging o print; campaign identifica iniciativa y periodo; content distingue pieza. Usar códigos comerciales controlados, nunca nombres de personas, correos o datos de clientes, aunque tengan sintaxis válida. Solo en enlaces externos hacia PYP; nunca añadir UTM a enlaces internos. Validar con una campaña real autorizada tras publicar; no se garantiza atribución antes de esa prueba.

## Configuración y verificación posterior autorizada

1. Antes de publicar, revisar privacidad y ajustes de cuenta anteriores. Revisar retención mínima adecuada, Signals desactivado, medición mejorada desactivada y ausencia de etiquetas duplicadas. No activar parámetros de usuario ni recopilación de datos proporcionados por usuarios.
2. Tras despliegue autorizado, abrir GA4 → Informes → Tiempo real; abrir PYP en un navegador de prueba limpio. Rechazar primero: no debe aparecer gtag ni solicitudes GA. Abrir preferencias y aceptar: debe registrarse una única vista de la página actual.
3. Navegar Inicio, CLG y demás páginas; comprobar títulos/canonical y una vista por navegación real. Hashes y query de la misma ruta no deben sumar vistas. Confirmar sin duplicados tras volver atrás/adelante y recargar.
4. En CLG, usar el CTA Contacto; comprobar contact_cta_click con origen /proyectos/clg/. En enlaces reales de correo/teléfono comprobar contact_click y método, sin dirección o número. Comparar Usuarios, Sesiones y Vistas en informes por ruta; usar exploración de sesiones que incluyen CLG y CTA para interés, sin atribución de venta.
5. Para DebugView, habilitar depuración solo en un navegador de prueba mediante Google Analytics Debugger/Tag Assistant autorizado; no activar debug_mode para todos los visitantes. Revisar en red que no salgan campos del formulario ni query sensible. Los tests locales sustituyen la etiqueta y no verifican recepción en Google.
6. Cambiar a rechazo: parar eventos nuevos y borrar cookies accesibles. Probar bloqueo de gtag y navegación/formulario funcionales. No interpretar ausencia de eventos bajo rechazo como fallo.
7. generate_lead no se espera en esta versión. Un futuro envío real y controlado requiere autorización expresa, más un mecanismo verificable de confirmación antes de instrumentarlo; no se hicieron envíos. Los informes estándar pueden tardar 24–48 horas; Tiempo real/DebugView sirven para diagnóstico inicial.

## Vinculación de Search Console

No crear otra propiedad. Con permisos de Editor en GA4 y propietario verificado en Search Console, ir a GA4 → Administrar → Vinculaciones de productos → Vinculaciones con Search Console → Vincular; seleccionar la propiedad de dominio pyptecnologia.com y el flujo web correcto, revisar y enviar. Publicar la colección Search Console en la biblioteca de Informes si se necesita. Confirmar en ambas cuentas; no se afirma vínculo existente ni se efectuaron acciones externas. [Guía oficial](https://support.google.com/analytics/answer/10737381).

Search Console informa consultas, impresiones, clics y posición en Google. GA4 informa usuarios/sesiones/navegación/eventos de quienes pueden ser medidos. Consentimiento, bloqueadores, atribución, ventanas y zonas horarias impiden esperar coincidencia exacta de clics y sesiones. Para tráfico CLG filtrar /proyectos/clg/ y comparar adquisición por sesión; no reconstruir identificadores ni datos de contacto.

## Resiliencia y límites

Carga asíncrona, timeout y captura de errores evitan bloquear la web. No se acumulan eventos si la etiqueta no carga ni se reintenta indefinidamente; una nueva aceptación explícita puede reintentar. Las pruebas de laboratorio interceptan Google y bloquean POST para no contaminar la propiedad ni enviar formularios. La recepción real, atribución de campañas, configuración remota, revisión jurídica y validación móvil física quedan pendientes. [Privacidad/opt-out oficial](https://developers.google.com/tag-platform/security/guides/privacy).
