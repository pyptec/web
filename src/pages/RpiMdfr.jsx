import { ArrowRight, Expand } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import SectionNav from "../components/SectionNav.jsx";
import tablero from "../assets/proyectos/rpi.jpg";
import { RPI_MDFR_HERO } from "../data/rpi-mdfr-meta.js";
import { RPI_MDFR_CAPTURES } from "../data/rpi-mdfr.js";

const primary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#A6CE39] px-6 py-3 font-bold text-[#1E1E1E] transition-colors hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416D13]";
const links = [
  {href: "#sistema-rpi-mdfr", label: "Sistema"},
  {href: "#sensores-rpi-mdfr", label: "Sensores"},
  {href: "#control-rpi-mdfr", label: "Control ambiental"},
  {href: "#dashboard-rpi-mdfr", label: "Dashboard"},
  {href: "#historicos-rpi-mdfr", label: "Históricos y lotes"},
  {href: "#edge-rpi-mdfr", label: "Edge"},
  {href: "#caso-rpi-mdfr", label: "Aplicación"},
  {href: "#contacto-rpi-mdfr", label: "Contacto"},
];
function Section({id, title, children, white = false}) {
  return <section id={id} className={"scroll-mt-32 py-16 md:py-20 " + (white ? "bg-white" : "")}><div className="mx-auto max-w-7xl px-6"><h2 className="mb-7 max-w-3xl text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h2>{children}</div></section>;
}
function Captures({category}) {
  const captures = RPI_MDFR_CAPTURES.filter(c => c.category === category);
  if (!captures.length) return null;
  return <div className="mt-9 grid items-start gap-6 md:grid-cols-2">{captures.map(c => <figure key={c.src} className={"min-w-0 rounded-2xl border border-gray-200 bg-white p-3 " + (captures.length === 1 ? "md:col-span-2" : "")}>
    <a href={c.src} target="_blank" rel="noopener noreferrer" aria-label={"Ampliar: " + c.alt + " (abre en una pestaña nueva)"} className="block rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416D13]"><img src={c.src} alt={c.alt} width={c.width} height={c.height} loading="lazy" decoding="async" className="h-auto max-h-[36rem] w-full object-contain" /></a>
    <figcaption className="px-2 pb-2 pt-4 text-sm leading-relaxed text-gray-600">{c.caption}</figcaption>
  </figure>)}</div>;
}
export default function RpiMdfr() {
  return <div className="min-h-screen bg-[#F5F5F5] text-[#1E1E1E]">
    <Navbar><SectionNav links={links} /></Navbar>
    <main id="contenido-principal">
      <section id="presentacion-rpi-mdfr" className="border-b border-gray-200 bg-white"><div className="mx-auto max-w-7xl px-6 pb-12 pt-6">
        <nav aria-label="Ruta de navegación" className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-600"><a className="rounded px-1 py-2 underline" href="/">Inicio</a><span aria-hidden="true">/</span><a className="rounded px-1 py-2 underline" href="/#proyectos">Proyectos</a><span aria-hidden="true">/</span><span aria-current="page" className="font-semibold text-[#416D13]">RPI-MDFR</span></nav>
        <h1 className="mb-7 max-w-5xl text-3xl font-black leading-tight tracking-tight md:text-5xl">RPI-MDFR — Maduración inteligente de banano</h1>
        <figure className="rounded-2xl border border-gray-200 bg-white">
          <a href={RPI_MDFR_HERO.src} target="_blank" rel="noopener noreferrer" aria-label="Ampliar infografía RPI-MDFR completa (abre en una pestaña nueva)" className="block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416D13]"><img {...RPI_MDFR_HERO} loading="eager" fetchpriority="high" decoding="async" className="block h-auto w-full object-contain" /></a>
          <figcaption className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 text-sm text-gray-600"><span>Presentación comercial ilustrativa del sistema.</span><a href={RPI_MDFR_HERO.src} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded px-2 font-semibold text-[#416D13] underline"><Expand size={17} aria-hidden="true" /> Ampliar infografía completa</a></figcaption>
        </figure>
        <div className="mt-6 flex flex-wrap gap-4"><a className={primary} href="#sistema-rpi-mdfr">Conocer el sistema <ArrowRight size={18} aria-hidden="true" /></a><a className="inline-flex min-h-11 items-center rounded px-3 font-semibold text-[#416D13] underline" href="/#contacto">Consultar mi proyecto</a></div>
      </div></section>
      <Section id="sistema-rpi-mdfr" title="Supervisión y control de la cámara de maduración">
        <p className="max-w-4xl text-lg leading-relaxed text-gray-700">RPI-MDFR integra la lectura de sensores, el control ambiental y el registro de datos para acompañar la maduración del banano. La operación se organiza por lote: condiciones del proceso, ajustes de control, estados de equipos y evolución de las variables.</p>
        <p className="mt-4 max-w-4xl leading-relaxed text-gray-700">La solución combina automatización local y herramientas de supervisión. La instrumentación, las consignas y el alcance de cada integración se definen para la cámara y el proceso del cliente.</p>
      </Section>
      <Section id="sensores-rpi-mdfr" title="Sensores y señales del proceso" white>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{[
          ["CO₂", "Medición de dióxido de carbono para observar su evolución y relacionarla con los ciclos de ventilación."],
          ["Etileno C₂H₄", "Seguimiento de etileno para supervisar las condiciones del tratamiento y su relación con el lote."],
          ["Temperatura y humedad", "Monitoreo de temperatura ambiente y humedad relativa dentro de la cámara."],
          ["PT100 y PT1000", "Lectura de sondas de temperatura de pulpa, según el sensor y la interfaz instalados."],
          ["Estado de puerta", "Supervisión de apertura y cierre para contextualizar los cambios de condiciones en la cámara."],
          ["Señal de hombre atrapado", "Visualización de la señal de persona atrapada para la atención del operador. No sustituye los dispositivos ni procedimientos de seguridad de la instalación."],
        ].map(([title,text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-[#F5F5F5] p-6"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>
        <h3 className="mt-10 text-2xl font-bold">Galería de sensores: registros históricos</h3><p className="mt-3 max-w-4xl leading-relaxed text-gray-700">Capturas originales de la interfaz de RPI-MDFR. Los datos documentan lo mostrado por el sistema en esas fechas; no son lecturas en vivo ni consignas recomendadas. Puede ampliar cada gráfica para consultar sus detalles.</p>
        <Captures category="sensores" />
      </Section>
      <Section id="control-rpi-mdfr" title="Control ambiental programable">
        <div className="grid gap-6 md:grid-cols-2">{[
          ["Integración HVAC mediante Modbus", "Intercambio de parámetros y consignas con el sistema de climatización. La compatibilidad, el mapa de registros y los límites de operación se revisan para cada equipo."],
          ["Recirculación, extracción y aire fresco", "Coordinación de la circulación interna, la extracción de aire y el ingreso de aire fresco según las condiciones y reglas del proceso."],
          ["Humedad e inyección de etileno", "Configuración de acciones de humidificación e inyección de etileno dentro de la estrategia definida para la cámara."],
          ["Parámetros de operación", "Ajuste de consignas, bandas y tiempos para coordinar sensores y actuadores. Los valores se establecen para cada proceso; no se presentan como una receta universal de maduración."],
        ].map(([title,text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>
        <Captures category="control" />
      </Section>
      <Section id="dashboard-rpi-mdfr" title="Dashboard de supervisión" white>
        <p className="max-w-4xl text-lg leading-relaxed text-gray-700">El dashboard reúne las mediciones, los estados de equipos y las señales del sistema. Permite revisar las condiciones actuales y los parámetros del proceso desde una interfaz de supervisión.</p>
        <p className="mt-4 max-w-4xl leading-relaxed text-gray-700">Los indicadores ayudan a relacionar temperatura, humedad, CO₂ y etileno con la actuación de climatización, ventilación y humidificación, manteniendo el contexto del lote.</p>
        <Captures category="dashboard" />
      </Section>
      <Section id="historicos-rpi-mdfr" title="Históricos y análisis de ciclos de CO₂ por lote">
        <div className="grid gap-7 md:grid-cols-2"><article className="rounded-2xl border border-gray-200 bg-white p-7"><h3 className="text-xl font-bold">Evolución de las variables</h3><p className="mt-3 leading-relaxed text-gray-700">Los registros históricos permiten revisar tendencias de sensores y estados a lo largo del proceso. Su lectura se relaciona con las consignas, los eventos y la información disponible del lote.</p></article><article className="rounded-2xl border border-gray-200 bg-white p-7"><h3 className="text-xl font-bold">Ciclos y seguimiento por lote</h3><p className="mt-3 leading-relaxed text-gray-700">El análisis de ciclos de CO₂ ayuda a observar la acumulación y la renovación del aire durante el proceso. Comparar periodos del lote aporta contexto para revisar tiempos y comportamiento de la cámara.</p></article></div>
        <Captures category="historicos" />
      </Section>
      <Section id="edge-rpi-mdfr" title="Arquitectura Edge Computing" white>
        <p className="max-w-4xl text-lg leading-relaxed text-gray-700">La adquisición, las reglas de control y los registros se ejecutan en la instalación. El acceso por red local permite supervisar el proceso sin depender permanentemente de una conexión a Internet.</p>
        <p className="mt-4 max-w-4xl leading-relaxed text-gray-700">La conectividad IoT y la replicación hacia la nube se definen según los requisitos de acceso, disponibilidad y protección de los datos. El alcance remoto se integra a la operación local, según el proyecto.</p>
        <Captures category="arquitectura" />
      </Section>
      <Section id="caso-rpi-mdfr" title="Aplicación en una cámara de maduración de banano">
        <div className="grid items-center gap-9 lg:grid-cols-[0.8fr_1.2fr]"><figure className="rounded-2xl border border-gray-200 bg-white p-4"><a href={tablero} target="_blank" rel="noopener noreferrer" aria-label="Ampliar fotografía del tablero de maduración (abre en una pestaña nueva)"><img src={tablero} alt="Tablero real de maduración de banano con mandos de recirculación, extracción, etileno y humidificador" width={721} height={1600} loading="lazy" decoding="async" className="h-auto max-h-[36rem] w-full object-contain" /></a><figcaption className="pt-4 text-sm leading-relaxed text-gray-600">Fotografía del tablero de maduración, conservada del proyecto RPI-MDFR de PYP.</figcaption></figure><div><p className="text-lg leading-relaxed text-gray-700">El tablero fotografiado muestra los mandos de la operación de maduración: recirculación, extracción, etileno y humidificación. RPI-MDFR presenta estas necesidades de control junto con la supervisión de variables y el seguimiento por lote.</p><p className="mt-4 leading-relaxed text-gray-700">La definición del proyecto parte de los equipos existentes y de las condiciones de la cámara. El alcance de sensores, automatización e integración se revisa con el cliente.</p></div></div>
        <Captures category="caso" />
      </Section>
      <Section id="contacto-rpi-mdfr" title="Conversemos sobre su cámara de maduración" white>
        <p className="max-w-3xl text-lg leading-relaxed text-gray-700">Cuéntenos qué variables necesita supervisar, qué equipos utiliza y cómo organiza sus lotes. PYP evalúa la instrumentación, el control local y las integraciones para su aplicación.</p><div className="mt-7 flex flex-wrap gap-4"><a className={primary} href="/#contacto">Solicitar información RPI-MDFR <ArrowRight size={18} aria-hidden="true" /></a><a className="inline-flex min-h-11 items-center rounded px-3 font-semibold text-[#416D13] underline" href="/#proyectos">Volver a Proyectos</a></div>
      </Section>
    </main>
    <footer className="border-t bg-white px-6 py-7 text-center text-sm text-gray-600">PYP Tecnología Electrónica SAS · Soluciones para la operación industrial</footer>
  </div>;
}
