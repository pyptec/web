import React from "react";
import logoPyp from "../assets/proyectos/log_pyp.webp";
import {
  ArrowLeft, ArrowRight, RadioTower, Cpu, Cable, Cloud, Database,
  WifiOff, ShieldCheck, Activity, Gauge, Thermometer, Network,
  Server, Bell, Phone, Mail, CheckCircle2, Radio, Layers3,
  Settings2, HardDrive, Smartphone, Zap
} from "lucide-react";

const C = { green: "#A6CE39", icon: "#6BA425", dark: "#416D13", ink: "#1E1E1E" };

const Button = ({ href, children, secondary = false }) => (
  <a href={href} className={secondary
    ? "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]"
    : "inline-flex items-center justify-center gap-2 rounded-xl bg-[#A6CE39] px-6 py-3 font-semibold text-[#1E1E1E] transition-colors duration-200 hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]"}>
    {children}
  </a>
);

const Heading = ({ eyebrow, title, text }) => (
  <div className="mb-10 max-w-3xl">
    <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#416D13]">{eyebrow}</p>
    <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1E1E] md:text-4xl">{title}</h2>
    {text && <p className="mt-4 text-lg leading-relaxed text-gray-700">{text}</p>}
  </div>
);

const Card = ({ icon: Icon, title, children }) => (
  <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#A6CE3926]">
      <Icon size={25} color={C.icon} aria-hidden="true" />
    </div>
    <h3 className="text-xl font-bold text-gray-900">{title}</h3>
    <p className="mt-3 leading-relaxed text-gray-700">{children}</p>
  </article>
);

const capabilities = [
  { icon: Cable, title: "Integración de instrumentación", text: "Lectura de medidores eléctricos, sensores ambientales y equipos industriales mediante interfaces y protocolos compatibles." },
  { icon: RadioTower, title: "Redes LoRaWAN", text: "Conectividad de largo alcance y bajo consumo para sensores distribuidos, con gateways y servidores de red compatibles." },
  { icon: Cpu, title: "Gateways industriales", text: "Adquisición y preprocesamiento de datos en sitio mediante soluciones SAMEE y hardware adaptado a cada instalación." },
  { icon: Cloud, title: "Telemetría MQTT", text: "Publicación segura de eventos hacia servicios en la nube y plataformas de supervisión, según la arquitectura del proyecto." },
  { icon: WifiOff, title: "Continuidad sin Internet", text: "Almacenamiento local y reenvío de eventos al recuperar la conectividad, con trazabilidad temporal cuando la solución lo contempla." },
  { icon: Bell, title: "Supervisión y alertas", text: "Históricos, tendencias, estado de comunicaciones y reglas de alerta para facilitar la operación y el mantenimiento." },
];

const protocols = [
  { name: "Modbus RTU / TCP", detail: "Integración de medidores y sensores industriales", icon: Cable },
  { name: "LoRaWAN", detail: "Sensores remotos y comunicación de bajo consumo", icon: Radio },
  { name: "MQTT / TLS", detail: "Mensajería y transporte seguro de telemetría", icon: ShieldCheck },
  { name: "Ethernet / celular", detail: "Conectividad local y remota según cobertura", icon: Network },
];

const steps = [
  { icon: Thermometer, title: "1. Campo", detail: "Sensores, medidores y señales del proceso" },
  { icon: RadioTower, title: "2. Comunicación", detail: "RS-485, LoRaWAN o redes disponibles" },
  { icon: Cpu, title: "3. Gateway", detail: "Adquisición, validación y cola local" },
  { icon: Database, title: "4. Plataforma", detail: "Históricos, indicadores y visualización" },
];

export default function IoTIndustrialLoRaWAN() {
  const year = new Date().getFullYear();
  return (
    <div className="min-h-screen bg-[#F5F5F5] text-[#1E1E1E]">
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-4">
          <a href="/" className="flex items-center gap-3 font-extrabold text-gray-900" aria-label="PYP Tecnología Electrónica, volver al inicio">
            <img src={logoPyp} alt="Logo de PYP Tecnología Electrónica" width="600" height="450" className="h-14 w-auto object-contain md:h-16" />
            <span><span className="block text-sm sm:text-base">PYP Tecnología Electrónica SAS</span><span className="block text-xs font-normal text-gray-600">IoT industrial · Energía · Automatización</span></span>
          </a>
          <nav aria-label="Navegación de IoT industrial" className="flex items-center gap-4">
            <a href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-[#416D13]"><ArrowLeft size={17} aria-hidden="true"/> Inicio</a>
            <Button href="#contacto">Hablemos</Button>
          </nav>
        </div>
      </header>

      <main>
        <section className="overflow-hidden bg-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:py-24 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="border-l-4 border-[#A6CE39] pl-3 text-sm font-bold uppercase tracking-[0.16em] text-[#416D13]">Ingeniería IoT industrial</p>
              <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">Conectamos equipos, sensores y procesos con datos confiables</h1>
              <p className="mt-6 max-w-2xl text-xl leading-relaxed text-gray-700">Diseñamos soluciones de adquisición, comunicaciones y supervisión para integrar la operación industrial con plataformas digitales.</p>
              <p className="mt-4 max-w-2xl leading-relaxed text-gray-700">Desde sensores Modbus y LoRaWAN hasta gateways SAMEE, mensajería MQTT, almacenamiento local y servicios en la nube.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Button href="#soluciones">Explorar soluciones <ArrowRight size={18} aria-hidden="true"/></Button><Button href="#contacto" secondary>Solicitar evaluación</Button></div>
            </div>
            <div className="rounded-3xl border border-[#D9E8BD] bg-gradient-to-br from-[#F4F9E8] to-white p-7 shadow-sm" aria-label="Esquema de adquisición de datos IoT">
              <div className="mb-6 flex items-center gap-3"><Layers3 color={C.icon} size={30} aria-hidden="true"/><h2 className="text-xl font-extrabold">Arquitectura conectada</h2></div>
              <div className="space-y-3">
                {[{icon:Gauge,name:"Instrumentación",desc:"Medidores y sensores"},{icon:RadioTower,name:"Comunicaciones",desc:"Modbus · LoRaWAN"},{icon:Cpu,name:"Gateway SAMEE",desc:"Procesamiento y almacenamiento"},{icon:Cloud,name:"Supervisión",desc:"MQTT · Web · Históricos"}].map(({icon:Icon,name,desc},i)=><React.Fragment key={name}><div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"><Icon color={C.icon} size={25} aria-hidden="true"/><div><p className="font-bold">{name}</p><p className="text-sm text-gray-600">{desc}</p></div></div>{i<3&&<div className="mx-auto h-5 w-0.5 bg-[#6BA425]" aria-hidden="true"/>}</React.Fragment>)}
              </div>
              <p className="mt-5 text-sm text-gray-600">Arquitectura de referencia; los componentes se seleccionan según el proyecto.</p>
            </div>
          </div>
        </section>

        <section id="soluciones" className="scroll-mt-24 py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Qué hacemos" title="Soluciones IoT para la industria" text="Integramos tecnología de campo, software y comunicaciones para obtener información útil de equipos y procesos."/><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{capabilities.map(x=><Card key={x.title} icon={x.icon} title={x.title}>{x.text}</Card>)}</div></div></section>

        <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Tecnología PYP" title="Gateways SAMEE100 y SAMEE200" text="Equipos de adquisición y comunicación para integrar instrumentación industrial, procesar datos en sitio y conectar sistemas de supervisión."/><div className="grid gap-8 lg:grid-cols-2"><article className="rounded-3xl border border-gray-200 bg-[#F5F5F5] p-8"><Cpu size={34} color={C.icon} aria-hidden="true"/><h3 className="mt-5 text-2xl font-bold">Adquisición y procesamiento local</h3><p className="mt-4 leading-relaxed text-gray-700">Lectura periódica de variables, configuración de equipos, supervisión del gateway y visualización local según la implementación.</p><div className="mt-6 flex flex-wrap gap-2">{["Medidores eléctricos","Sensores ambientales","RS-485","Dashboard local"].map(t=><span key={t} className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium">{t}</span>)}</div></article><article className="rounded-3xl border border-gray-200 bg-[#F5F5F5] p-8"><HardDrive size={34} color={C.icon} aria-hidden="true"/><h3 className="mt-5 text-2xl font-bold">Operación y resiliencia</h3><p className="mt-4 leading-relaxed text-gray-700">Opciones de almacenamiento temporal, recuperación de comunicaciones, watchdog y registro temporal de eventos para mantener trazabilidad de la información.</p><div className="mt-6 flex flex-wrap gap-2">{["Cola de eventos","RTC","Watchdog","MQTT seguro"].map(t=><span key={t} className="rounded-full border border-gray-200 bg-white px-3 py-2 text-sm font-medium">{t}</span>)}</div></article></div><p className="mt-5 text-sm text-gray-600">Las funciones y periféricos disponibles dependen de la versión del hardware y de la configuración contratada.</p></div></section>

        <section className="py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Integración" title="Protocolos y conectividad" text="Seleccionamos interfaces y medios de transmisión según distancias, infraestructura, consumo y necesidades de la operación."/><div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">{protocols.map(({name,detail,icon:Icon})=><article key={name} className="rounded-2xl border border-gray-200 bg-white p-6"><Icon size={28} color={C.icon} aria-hidden="true"/><h3 className="mt-4 font-bold">{name}</h3><p className="mt-2 text-sm leading-relaxed text-gray-700">{detail}</p></article>)}</div></div></section>

        <section className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Cómo funciona" title="Del sensor a la plataforma" text="Un flujo de datos que facilita la trazabilidad, el diagnóstico y la toma de decisiones."/><div className="grid gap-5 md:grid-cols-4">{steps.map(({icon:Icon,title,detail})=><div key={title} className="rounded-2xl border border-gray-200 bg-[#F5F5F5] p-6"><Icon size={30} color={C.icon} aria-hidden="true"/><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-gray-700">{detail}</p></div>)}</div><div className="mt-7 flex items-start gap-3 rounded-2xl border border-[#D9E8BD] bg-[#F4F9E8] p-6"><WifiOff size={25} color={C.dark} className="shrink-0" aria-hidden="true"/><p className="leading-relaxed text-gray-800"><strong>Cuando falla la conexión:</strong> las soluciones configuradas con cola local conservan eventos pendientes y los reenvían cuando vuelve la conectividad. El comportamiento exacto depende de la instalación y de la disponibilidad de almacenamiento y energía.</p></div></div></section>

        <section className="py-20"><div className="mx-auto max-w-7xl px-6"><Heading eyebrow="Aplicaciones" title="Dónde aplicamos IoT industrial" text="La misma arquitectura puede adaptarse a distintos procesos, sensores y objetivos de monitoreo."/><div className="grid gap-6 md:grid-cols-3"><Card icon={Zap} title="Energía y producción">Medición de consumos, seguimiento de equipos, indicadores y detección de cambios operativos.</Card><Card icon={Thermometer} title="Ambiente y cadena productiva">Registro de temperatura, humedad y otras variables para trazabilidad y análisis de procesos.</Card><Card icon={Activity} title="Infraestructura remota">Telemetría de instalaciones distribuidas con redes de largo alcance o conectividad celular.</Card></div><div className="mt-8"><a href="/monitoreo-energetico" className="inline-flex items-center gap-2 font-bold text-[#416D13] underline-offset-4 hover:underline">Ver solución de monitoreo energético <ArrowRight size={18} aria-hidden="true"/></a></div></div></section>

        <section id="contacto" className="scroll-mt-24 bg-white py-20"><div className="mx-auto max-w-7xl px-6"><div className="rounded-3xl border border-gray-200 bg-[#F5F5F5] p-8 md:p-12"><p className="text-sm font-bold uppercase tracking-widest text-[#416D13]">Hablemos de tu proyecto</p><h2 className="mt-3 text-3xl font-extrabold md:text-4xl">¿Necesitas conectar equipos o sensores?</h2><p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-700">Revisamos las variables a medir, protocolos disponibles, cobertura, frecuencia de muestreo y necesidades de visualización para definir una solución IoT adecuada.</p><div className="mt-8 flex flex-wrap gap-3"><Button href="mailto:jaime.pedraza@pyptecnologia.com?subject=Consulta%20IoT%20industrial%20y%20LoRaWAN"><Mail size={19} aria-hidden="true"/> Solicitar evaluación</Button><Button href="tel:+573204929150" secondary><Phone size={19} aria-hidden="true"/> +57 320 492 9150</Button></div><p className="mt-5 text-sm text-gray-700">jaime.pedraza@pyptecnologia.com</p></div></div></section>
      </main>
      <footer className="border-t border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-600">© {year} PYP Tecnología Electrónica SAS · IoT industrial · LoRaWAN · Automatización</footer>
    </div>
  );
}
