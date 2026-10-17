import React from "react";
import Navbar from "../components/Navbar.jsx";
import SectionNav from "../components/SectionNav.jsx";
import {
  ArrowLeft, ArrowRight, Cpu, CircuitBoard, Network, Cable, Radio,
  Gauge, ShieldCheck, Database, WifiOff, Settings2, Activity,
  Server, Thermometer, Bell, Factory, Zap, Mail, Phone, CheckCircle2
} from "lucide-react";

const C = { green: "#A6CE39", icon: "#6BA425", dark: "#416D13", ink: "#1E1E1E" };
const Btn = ({ href, children, outline = false }) => (
  <a href={href} className={outline
    ? "inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]"
    : "inline-flex items-center justify-center gap-2 rounded-xl bg-[#A6CE39] px-6 py-3 font-semibold text-[#1E1E1E] transition-colors hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]"}>{children}</a>
);
const Heading = ({ label, title, desc }) => <div className="mb-10 max-w-3xl">
  <p className="mb-3 border-l-4 border-[#A6CE39] pl-3 text-sm font-bold uppercase tracking-[0.14em] text-[#416D13]">{label}</p>
  <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1E1E] md:text-4xl">{title}</h2>
  {desc && <p className="mt-4 text-lg leading-relaxed text-gray-700">{desc}</p>}
</div>;
const Feature = ({ icon: Icon, title, children }) => <article className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#A6CE3926]"><Icon className="h-6 w-6" color={C.icon} aria-hidden="true" /></div>
  <h3 className="text-xl font-bold text-[#1E1E1E]">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{children}</p>
</article>;
const features = [
  { icon: CircuitBoard, title: "Hardware electrónico propio", text: "Diseño e integración de tarjetas de interfaz para entradas digitales, salidas de relé, señales analógicas y comunicaciones industriales, según los requerimientos de cada proyecto." },
  { icon: Cpu, title: "Control Edge", text: "Adquisición, reglas operativas, temporización y procesamiento local sobre equipos embebidos, sin depender de la nube para las funciones críticas." },
  { icon: Cable, title: "Interfaces industriales", text: "Integración mediante RS-485, Modbus RTU/TCP, RS-232, señales discretas y entradas analógicas, con acondicionamiento adecuado para cada instalación." },
  { icon: Network, title: "CAN y J1939", text: "Lectura pasiva de mensajes CAN de 29 bits y decodificación de variables identificadas en controladores de grupos electrógenos, con monitoreo y diagnóstico." },
  { icon: WifiOff, title: "Operación local y resiliencia", text: "Servicios supervisados, watchdog, reloj de tiempo real y almacenamiento temporal para continuar registrando eventos ante fallas de conectividad." },
  { icon: Database, title: "Integración de información", text: "Dashboards locales, históricos, APIs y publicación MQTT para enlazar los datos de campo con plataformas empresariales o servicios en la nube." },
];
const stages = [
  { n: "01", title: "Instrumentación", text: "Sensores, medidores, controladores y señales de planta" },
  { n: "02", title: "Interfaz industrial", text: "Modbus, RS-485, CAN/J1939, entradas y salidas" },
  { n: "03", title: "Procesamiento Edge", text: "Reglas, adquisición, alarmas y registro local" },
  { n: "04", title: "Visualización e integración", text: "Dashboard local, MQTT, APIs y nube opcional" },
];
export default function AutomatizacionEdge() {
  return <div className="min-h-screen bg-[#F5F5F5] text-[#1E1E1E]">
    <Navbar>
      <SectionNav
        links={[
          { href: "#capacidades", label: "Capacidades" },
          { href: "#hardware", label: "Hardware" },
          { href: "#j1939", label: "CAN/J1939" },
          { href: "#aplicaciones", label: "Aplicaciones" },
          { href: "#contacto", label: "Contacto" },
        ]}
      />
    </Navbar>
    <main>
      <section className="bg-gradient-to-br from-white via-[#F7FAEF] to-[#EFF6DC]">
        <div className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="border-l-4 border-[#A6CE39] pl-3 text-sm font-bold uppercase tracking-[0.16em] text-[#416D13]">Ingeniería electrónica y control industrial</p>
            <h1 className="mt-5 text-4xl font-black leading-tight tracking-tight md:text-6xl">Automatización industrial y <span className="text-[#416D13]">Edge Computing</span></h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">Desarrollamos soluciones para adquirir señales, integrar equipos, ejecutar lógica de control y supervisar procesos directamente en la instalación. Desde el hardware hasta el dashboard y la integración de datos.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Btn href="#capacidades">Explorar capacidades <ArrowRight size={18}/></Btn><Btn href="#contacto" outline>Consultar un proyecto</Btn></div>
          </div>
          <div className="rounded-3xl border border-[#DCE9BD] bg-white p-6 shadow-lg" aria-label="Arquitectura de automatización Edge">
            <div className="mb-5 flex items-center gap-3"><Cpu color={C.icon} size={30}/><h2 className="text-xl font-bold">Arquitectura de control local</h2></div>
            <div className="space-y-3">
              {stages.map((s) => <div key={s.n} className="flex gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4"><span className="font-black text-[#416D13]">{s.n}</span><div><h3 className="font-bold">{s.title}</h3><p className="mt-1 text-sm text-gray-600">{s.text}</p></div></div>)}
            </div>
            <p className="mt-5 text-sm text-gray-600">La arquitectura se adapta a la criticidad del proceso y a los requisitos de seguridad y conectividad del cliente.</p>
          </div>
        </div>
      </section>
      <section id="capacidades" className="scroll-mt-28 py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading label="Capacidades técnicas" title="Del circuito electrónico a la operación industrial" desc="Combinamos hardware embebido, comunicaciones industriales, software y supervisión para resolver necesidades concretas en planta." />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{features.map((f) => <Feature key={f.title} icon={f.icon} title={f.title}>{f.text}</Feature>)}</div>
      </div></section>
      <section id="hardware" className="scroll-mt-28 bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading label="Desarrollo propio" title="Gateways y tarjetas electrónicas para campo" desc="Las plataformas SAMEE incorporan interfaces y funciones adaptadas a la adquisición y supervisión de variables industriales." />
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-[#F7FAEF] p-8"><CircuitBoard size={34} color={C.icon}/><h3 className="mt-4 text-2xl font-bold">Hardware de interfaz</h3><p className="mt-3 leading-relaxed text-gray-700">Desarrollos con entradas digitales, relés, entradas analógicas, RS-485, RS-232, RTC y watchdog externo. La configuración de interfaces depende de la versión de hardware y del proyecto.</p><div className="mt-5 flex flex-wrap gap-2">{["Entradas digitales", "Relés", "ADC", "RS-485", "RTC", "Watchdog"].map(t=><span key={t} className="rounded-full border border-[#D4E5A9] bg-white px-3 py-1 text-xs font-semibold text-[#416D13]">{t}</span>)}</div></div>
          <div className="rounded-2xl border border-gray-200 bg-gray-50 p-8"><Server size={34} color={C.icon}/><h3 className="mt-4 text-2xl font-bold">Software embebido</h3><p className="mt-3 leading-relaxed text-gray-700">Servicios de adquisición, configuración por equipo, supervisión de recursos, registro de eventos con marca temporal, reintentos de comunicación y visualización local cuando la aplicación lo requiere.</p><div className="mt-5 flex flex-wrap gap-2">{["Python", "Linux", "MQTT", "Modbus", "SQLite", "Dashboards"].map(t=><span key={t} className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-semibold text-gray-700">{t}</span>)}</div></div>
        </div>
      </div></section>
      <section id="j1939" className="scroll-mt-28 py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading label="Integración de generadores" title="Monitoreo CAN / SAE J1939" desc="Desarrollo de adquisición y diagnóstico para grupos electrógenos mediante lectura de tramas CAN y visualización de variables identificadas en el controlador." />
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-gray-200 bg-white p-8"><h3 className="text-2xl font-bold">Qué permite la integración</h3><div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[{icon:Gauge,t:"Variables eléctricas",d:"Frecuencia, tensiones y batería cuando están disponibles en los mensajes identificados."},{icon:Activity,t:"Estados y eventos",d:"Supervisión de condiciones operativas y eventos relevantes del controlador."},{icon:Network,t:"Recepción CAN",d:"Interfaz CAN de 250 kbps y mensajes extendidos de 29 bits en el entorno de desarrollo."},{icon:ShieldCheck,t:"Adquisición pasiva",d:"Lectura sin transmitir comandos al bus durante las pruebas de monitoreo."}].map(x=><div key={x.t}><x.icon color={C.icon} size={24}/><h4 className="mt-2 font-bold">{x.t}</h4><p className="mt-1 text-sm leading-relaxed text-gray-600">{x.d}</p></div>)}
          </div></div>
          <div className="rounded-2xl bg-[#1E1E1E] p-8 text-white"><p className="text-sm font-bold uppercase tracking-widest text-[#A6CE39]">Caso de desarrollo</p><h3 className="mt-3 text-2xl font-bold">Controlador de grupo electrógeno</h3><p className="mt-4 leading-relaxed text-gray-200">Pruebas de integración con Raspberry Pi, interfaz CAN y software de supervisión local. Se han identificado y decodificado señales de frecuencia, tensiones y batería, con visualización mediante dashboard.</p><p className="mt-5 text-sm text-gray-300">La compatibilidad de señales y funciones se valida para cada modelo de controlador. No se presenta como una solución de control remoto certificada.</p></div>
        </div>
      </div></section>
      <section id="aplicaciones" className="scroll-mt-28 bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading label="Aplicaciones" title="Automatización adaptada al proceso" desc="Integramos tecnologías de control, monitoreo y comunicaciones para distintos sectores productivos." />
        <div className="grid gap-6 md:grid-cols-3">
          <Feature icon={Factory} title="Procesos industriales">Adquisición de estados de máquina, alarmas, sensores y señales de producción para análisis operacional y mantenimiento.</Feature>
          <Feature icon={Thermometer} title="Control ambiental y agroindustrial">Integración de temperatura, humedad, gases y actuadores para procesos que requieren supervisión y reglas locales.</Feature>
          <Feature icon={Zap} title="Energía y generación">Supervisión de variables eléctricas, integración de medidores y diagnóstico de equipos de generación.</Feature>
        </div>
        <div className="mt-9 flex flex-wrap gap-3"><Btn href="/monitoreo-energetico" outline>Ver monitoreo energético</Btn><Btn href="/iot-industrial" outline>Ver IoT y LoRaWAN</Btn></div>
      </div></section>
      <section id="contacto" className="scroll-mt-28 bg-[#F7FAEF] py-20"><div className="mx-auto max-w-7xl px-6"><div className="rounded-3xl border border-[#DCE9BD] bg-white p-8 md:p-12">
        <Heading label="Hablemos de tu proyecto" title="¿Necesitas integrar o automatizar un proceso?" desc="Revisamos la instrumentación existente, las interfaces de comunicación, las necesidades de control y las condiciones de operación." />
        <div className="flex flex-wrap items-center gap-4"><Btn href="mailto:jaime.pedraza@pyptecnologia.com?subject=Consulta%20automatizacion%20industrial"><Mail size={19}/> Solicitar evaluación</Btn><a className="inline-flex items-center gap-2 font-semibold text-[#416D13] underline underline-offset-4" href="tel:+573204929150"><Phone size={18}/> +57 320 492 9150</a></div>
      </div></div></section>
    </main>
    <footer className="border-t border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-600"><a className="font-semibold text-[#416D13] hover:underline" href="/"><ArrowLeft className="mr-1 inline h-4 w-4"/> Volver al inicio</a><p className="mt-3">© {new Date().getFullYear()} PYP Tecnología Electrónica SAS · Automatización y Edge Computing</p></footer>
  </div>;
}
