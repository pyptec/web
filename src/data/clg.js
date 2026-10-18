import conexiones from "../assets/proyectos/clg/clg-conexiones.jpg";
import frontal from "../assets/proyectos/clg/clg-frontal.jpg";
import ethernet from "../assets/proyectos/clg/clg-ethernet.jpg";
import hat from "../assets/proyectos/clg/clg-hat.jpg";
import dashboard from "../assets/proyectos/clg/clg-dashboard.png";

export { CLG_HERO } from "./clg-meta.js";

export const CLG_PHOTOS = {
  conexiones: { src: conexiones, width: 721, height: 1600, alt: "Vista del equipo CLG con conectores rotulados AUDIO y PWR y conector serie", caption: "Conexiones del equipo CLG fotografiado." },
  frontal: { src: frontal, width: 721, height: 1600, alt: "Frente del equipo CLG con pulsador rojo, indicador y conectores", caption: "Detalle del frente y los conectores." },
  ethernet: { src: ethernet, width: 1599, height: 899, alt: "Equipo CLG con pulsador, indicador, puertos USB y conector Ethernet", caption: "Otra vista del equipo, con sus conexiones de red." },
  hat: { src: hat, width: 721, height: 1600, alt: "Hardware HAT de PYP montado dentro del gabinete CLG, con borneras y relés", caption: "Hardware HAT desarrollado por PYP." },
  dashboard: { src: dashboard, width: 1110, height: 823, alt: "Captura de Cliente Ganador con la interfaz de carga y listado de archivos de audio", caption: "Captura de la interfaz de administración de archivos. No es una demostración de supervisión o de registros de eventos." },
};

export const CLG_FAQS = [
  { question: "¿Puede CLG integrarse con equipos Modbus?", answer: "Modbus RTU y Modbus TCP son vías de integración para asociar registros o estados con mensajes audibles. La compatibilidad, configuración y desarrollo necesario se revisan y validan por proyecto; no se afirma que estén activos en las 47 unidades." },
  { question: "¿Qué ventajas ofrece el procesamiento local?", answer: "CLG evalúa eventos y ejecuta las funciones configuradas en el establecimiento, sin depender permanentemente de Internet. Necesita alimentación y configuración; la administración remota requiere conectividad." },
  { question: "¿Puede CLG activar relés además de reproducir audio?", answer: "Dispone de 4 salidas de relé. Una regla puede asociar un evento con un mensaje y una o varias salidas, según configuración y pruebas de la aplicación. Las condiciones eléctricas se revisan antes de conectar equipos externos." },
  {
    question: "¿Qué es un sistema de publicidad programable por audio?",
    answer: "Es una solución que reproduce mensajes comerciales según una programación o una señal externa. CLG combina el equipo de reproducción, hardware desarrollado por PYP y administración de contenidos para comunicar promociones y avisos en establecimientos.",
  },
  {
    question: "¿Cómo se programan anuncios de audio en un supermercado?",
    answer: "Se definen los mensajes y los horarios de reproducción, por ejemplo para apertura y cierre, y se administra la programación desde la red interna. CLG dispone de programación horaria con RTC; PYP revisa con el establecimiento los contenidos y la configuración de cada equipo.",
  },
  {
    question: "¿CLG puede funcionar sin conexión a Internet?",
    answer: "Sí. La programación horaria con RTC permite ejecutar los mensajes configurados sin depender de Internet. La programación local utiliza la red interna; la administración remota sí requiere conexión a Internet. El equipo necesita alimentación y los contenidos deben estar configurados.",
  },
  {
    question: "¿Puede conectarse al amplificador de sonido existente?",
    answer: "Sí. CLG puede conectarse al amplificador del establecimiento. Antes de instalarlo se revisan la entrada disponible, el cableado y la configuración de audio, para adaptar la conexión al sistema existente.",
  },
  {
    question: "¿Puede reproducir un mensaje al presionar un botón?",
    answer: "CLG dispone de entradas digitales para señales y pulsos. Un pulsador puede formar parte de una integración para activar un mensaje; la asignación de cada entrada al audio o a una salida de relé se define y verifica para el proyecto.",
  },
  {
    question: "¿Puede administrar campañas en varias ubicaciones?",
    answer: "CLG cuenta con una red propietaria de interconexión y administración de contenidos y tiene 47 unidades instaladas en Colombia. Permite programación local mediante la red interna y administración remota cuando existe Internet. El alcance de cada campaña y de cada unidad se configura con PYP.",
  },
  {
    question: "¿Qué diferencia existe entre CLG Media y CLG Alert?",
    answer: "CLG Media organiza la oferta de publicidad, música ambiental y mensajes programados. CLG Alert organiza las necesidades de avisos activados por señales y acciones externas. Son modalidades comerciales: las reglas e integraciones específicas se revisan por proyecto. CLG Safety IP es una propuesta de integración por IP cuyo alcance debe evaluarse.",
  },
];

export const CLG_MODALITIES = [
  { id: "clg-media", name: "CLG Media", title: "Publicidad y música que acompañan su operación", text: "Contenidos de audio, música ambiental y anuncios por horario. La música puede pausarse para dar paso al mensaje publicitario.", scope: "Programación con RTC y administración local o remota según conectividad." },
  { id: "clg-alert", name: "CLG Alert", title: "Avisos conectados a señales y eventos", text: "Entradas digitales, señales y pulsos junto con la capacidad de activar avisos audibles y salidas de relé.", scope: "La relación entre entrada, mensaje y acción externa se configura y verifica por proyecto." },
  { id: "clg-safety-ip", name: "CLG Safety IP", title: "Integraciones de comunicación por IP", text: "Modalidad propuesta para evaluar necesidades de comunicación y avisos por IP, con desarrollo e integración según el proyecto.", scope: "No se ofrece como sistema certificado de evacuación o protección contra incendios. Audio IP avanzado, supervisión y logs requieren verificación." },
];
