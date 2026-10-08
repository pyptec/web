import { useEffect, useState } from "react";
import {
  Mail, Phone, MapPin, Cpu, Gauge, Cloud, ShieldCheck, Network, Zap,
  Droplets, Factory, Activity, Radio, Database, BarChart3, Wind,
  Thermometer, Waves, Server, CheckCircle2
} from "lucide-react";

import clgImg from "./assets/proyectos/clg.jpeg";
import lpsImg from "./assets/proyectos/lps.webp";
import rpiImg from "./assets/proyectos/rpi.jpg";
import logoPyp from "./assets/proyectos/log_pyp.webp";

const COLORS = {
  energy: "#A6CE39",
  energyDark: "#416D13",
  energyIcon: "#6BA425",
  energyButton: "#A6CE39",
  grayLight: "#F5F5F5",
  grayMid: "#6B7280",
  grayDark: "#1E1E1E",
};

const NavLink = ({ href, children, external }) => (
  <a
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : undefined}
    className="text-gray-600 transition-colors duration-200 hover:text-[#416D13] focus-visible:text-[#416D13] active:text-[#416D13] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416D13]"
  >
    {children}
  </a>
);

const Section = ({ id, title, subtitle, children, white = false }) => (
  <section id={id} className={`py-20 scroll-mt-20 ${white ? "bg-white" : ""}`}>
    <div className="max-w-7xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: COLORS.grayDark }}>
        {title}
      </h2>
      {subtitle && <p className="text-lg text-gray-600 mb-10 max-w-4xl">{subtitle}</p>}
      {children}
    </div>
  </section>
);

const Card = ({ icon, title, desc, headingLevel = 3 }) => {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
  <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition-shadow" style={{ borderColor: "#E5E7EB" }}>
    <div className="flex items-center gap-3 text-gray-900 mb-3">
      {icon}
      <Heading className="font-semibold text-lg">{title}</Heading>
    </div>
    <p className="text-gray-600 leading-relaxed">{desc}</p>
  </div>
  );
};

const Pill = ({ children }) => (
  <span className="inline-flex items-center rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600">
    {children}
  </span>
);

const Step = ({ icon, title, text }) => (
  <div className="relative rounded-2xl bg-white border p-5 text-center shadow-sm" style={{ borderColor: "#E5E7EB" }}>
    <div className="mx-auto h-11 w-11 rounded-xl grid place-items-center mb-3" style={{ backgroundColor: `${COLORS.energy}22`, color: COLORS.energyDark }}>
      {icon}
    </div>
    <h3 className="font-bold text-gray-900">{title}</h3>
    <p className="mt-1 text-sm text-gray-600">{text}</p>
  </div>
);

export default function App() {
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const handleClick = (e) => {
      const link = e.currentTarget;
      const targetId = link.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach((link) => link.addEventListener("click", handleClick));
    return () => links.forEach((link) => link.removeEventListener("click", handleClick));
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.grayLight }}>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b" style={{ borderColor: "#E5E7EB" }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between gap-6">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src={logoPyp}
              alt="PYP Tecnología Electrónica SAS"
              width="600"
              height="450"
              className="h-14 md:h-16 w-auto object-contain"
            />
            <div>
              <p className="font-bold text-base" style={{ color: COLORS.grayDark }}>PYP Tecnología Electrónica SAS</p>
              <p className="text-xs text-gray-700">IoT Industrial · Edge · Energía · Automatización</p>
            </div>
          </a>

          <nav aria-label="Navegación principal" className="hidden lg:flex items-center gap-5 text-sm">
            <NavLink href="#soluciones">Soluciones</NavLink>
            <NavLink href="#arquitectura">Arquitectura</NavLink>
            <NavLink href="#proyectos">Casos</NavLink>
            <NavLink href="#tecnologia">Tecnología</NavLink>
            <NavLink href="/monitoreo-energetico">Monitoreo energético</NavLink>
            <NavLink href="#sectores">Sectores</NavLink>
            <NavLink href="https://iotrack.com.co" external>Plataforma</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </nav>

          <a href="#contacto" className="rounded-xl px-5 py-2.5 font-semibold text-[#1E1E1E] transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]" style={{ backgroundColor: COLORS.energyButton }}>
            Hablemos
          </a>
        </div>
      </header>

      <main id="contenido-principal">
      {/* HERO */}
      <section id="inicio" className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(900px 480px at 80% -10%, ${COLORS.energy}2a, transparent 65%)` }}
        />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-20 grid lg:grid-cols-[1.08fr_0.92fr] gap-14 items-center">
          <div>
            <p className="font-bold uppercase tracking-[0.2em] text-sm border-l-4 pl-3" style={{ color: COLORS.energyIcon, borderColor: COLORS.energy }}>
              Ingeniería IoT industrial
            </p>
            <h1 className="mt-3 text-5xl md:text-6xl lg:text-7xl font-black leading-[0.98] tracking-tight" style={{ color: COLORS.grayDark }}>
              Datos industriales para mejorar energía, producción y procesos
            </h1>
            <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
              Diseñamos soluciones para <strong>medir, conectar, controlar y analizar</strong> activos industriales.
              Integramos energía, OEE, producción, agua, variables ambientales y equipos distribuidos,
              desde el sensor y el Edge hasta plataformas privadas o en la nube.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Energía</Pill>
              <Pill>OEE & Producción</Pill>
              <Pill>Agua & Vertimientos</Pill>
              <Pill>LoRaWAN</Pill>
              <Pill>Edge Computing</Pill>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#soluciones" className="px-6 py-3 rounded-xl text-[#1E1E1E] font-semibold transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]" style={{ backgroundColor: COLORS.energyButton }}>
                Ver soluciones
              </a>
              <a href="#proyectos" className="px-6 py-3 rounded-xl border font-semibold text-gray-700 hover:bg-white" style={{ borderColor: "#D1D5DB" }}>
                Casos de aplicación
              </a>
              <a href="/monitoreo-energetico" className="px-6 py-3 rounded-xl border font-semibold text-gray-700 hover:bg-white" style={{ borderColor: COLORS.energyDark, color: COLORS.energyDark }}>
                Conocer SAMEE100 / SAMEE200
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Card icon={<Gauge className="h-6 w-6" color={COLORS.energyIcon} />} title="Energía" headingLevel={2} desc="Medición, EnPI, línea base, tendencias y desempeño energético." />
            <Card icon={<Factory className="h-6 w-6" color={COLORS.energyIcon} />} title="OEE & Producción" headingLevel={2} desc="Disponibilidad, rendimiento, calidad, producción y paradas." />
            <Card icon={<Droplets className="h-6 w-6" color={COLORS.energyIcon} />} title="Agua" headingLevel={2} desc="Caudal, volumen, balances hídricos y variables de vertimiento." />
            <Card icon={<Radio className="h-6 w-6" color={COLORS.energyIcon} />} title="LoRaWAN" headingLevel={2} desc="Telemetría de sensores y medidores distribuidos sin cableado de datos." />
            <Card icon={<Cpu className="h-6 w-6" color={COLORS.energyIcon} />} title="Edge & Control" headingLevel={2} desc="Operación local, históricos, alarmas y automatización sin depender de la nube." />
            <Card icon={<Cloud className="h-6 w-6" color={COLORS.energyIcon} />} title="Cloud & Integración" headingLevel={2} desc="AWS IoT, MQTT, APIs e integración con plataformas del cliente." />
          </div>
        </div>
      </section>

      {/* ARQUITECTURA */}
      <Section
        id="arquitectura"
        title="Del sensor al indicador"
        subtitle="PYP integra la cadena completa de adquisición, comunicaciones, procesamiento y analítica. La solución puede operar localmente, en la nube o en una arquitectura híbrida."
        white
      >
        <div className="grid md:grid-cols-5 gap-4">
          <Step icon={<Activity className="h-6 w-6" />} title="Medir" text="Sensores, medidores y señales de proceso." />
          <Step icon={<Network className="h-6 w-6" />} title="Conectar" text="Modbus, RS-485, Ethernet, LoRaWAN, MQTT y CAN." />
          <Step icon={<Cpu className="h-6 w-6" />} title="Controlar" text="Edge, lógica local, actuadores y operación offline." />
          <Step icon={<Database className="h-6 w-6" />} title="Analizar" text="Históricos, tendencias, alarmas y trazabilidad." />
          <Step icon={<BarChart3 className="h-6 w-6" />} title="Mejorar" text="OEE, EnPI, producción, agua y desempeño." />
        </div>

        <div className="mt-8 rounded-2xl border p-6 md:p-8 bg-gray-50" style={{ borderColor: "#E5E7EB" }}>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900">Edge cuando la operación debe permanecer local</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Procesamiento, control, dashboard e históricos dentro de la red del cliente. La operación puede continuar
                sin depender de Internet y sin necesidad de exponer la red industrial a servicios externos.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Cloud cuando se necesita centralización</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                Los datos pueden enviarse a nuestra plataforma, a infraestructura cloud o a sistemas propietarios del cliente
                mediante MQTT y APIs, según sus políticas de TI, seguridad y conectividad.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SOLUCIONES */}
      <Section id="soluciones" title="Soluciones" subtitle="Tecnología aplicada a problemas reales de operación, eficiencia y sostenibilidad.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card
            icon={<Zap className="h-6 w-6" color={COLORS.energyIcon} />}
            title="Eficiencia energética"
            desc="SAMEE100/200 para adquisición y gestión energética: V, I, kW, kWh, factor de potencia, THD, líneas base, EnPI, CUSUM, alarmas y análisis orientado a mejora bajo metodologías de gestión energética e ISO 50001."
          />
          <Card
            icon={<Factory className="h-6 w-6" color={COLORS.energyIcon} />}
            title="Producción y OEE"
            desc="Integramos estados de máquina, producción, calidad, paradas y energía para calcular disponibilidad, rendimiento, calidad, OEE, horas productivas y consumo específico por unidad producida."
          />
          <Card
            icon={<Droplets className="h-6 w-6" color={COLORS.energyIcon} />}
            title="Agua y vertimientos"
            desc="Telemetría de caudal, volumen y variables de proceso para balances hídricos, históricos, tendencias y alarmas. Integramos instrumentación de pH, temperatura, conductividad, nivel o turbidez según cada aplicación."
          />
          <Card
            icon={<Radio className="h-6 w-6" color={COLORS.energyIcon} />}
            title="IoT industrial y LoRaWAN"
            desc="Redes de sensores y medidores distribuidos con gateways PYP, almacenamiento local y reenvío automático de datos al recuperar conectividad. Ideal para puntos donde el cableado de comunicaciones no es práctico."
          />
        </div>
      </Section>

      {/* PROYECTOS */}
      <Section id="proyectos" title="Casos de aplicación" subtitle="Soluciones desarrolladas e integradas por PYP en retail, industria y agroindustria." white>
        <div className="grid gap-8">
          {/* CLG */}
          <article className="group grid lg:grid-cols-[0.9fr_1.1fr] rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: "#E5E7EB" }}>
            <div className="relative min-h-[260px] lg:min-h-[330px] overflow-hidden">
              <img src={clgImg} alt="Sistema CLG para gestión centralizada de audio publicitario" loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
                <Network className="h-5 w-5" color={COLORS.energy} /> RETAIL · ACTIVOS DISTRIBUIDOS
              </div>
            </div>
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">CLG — Control centralizado de campañas</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Sistema para comunicar y administrar equipos instalados en múltiples sedes y ciudades desde un centro de control.
                Permite actualizar contenidos de audio, supervisar equipos y desplegar campañas sin intervención presencial en cada establecimiento.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Puede operar con infraestructura de comunicaciones independiente de la red corporativa o integrarse con servicios en la nube,
                de acuerdo con las políticas de seguridad, conectividad y costos del cliente.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>Multi-sede</Pill><Pill>Control central</Pill><Pill>Edge/Cloud</Pill><Pill>Gestión remota</Pill>
              </div>
            </div>
          </article>

          {/* SAMEE / OEE */}
          <article className="group grid lg:grid-cols-[0.9fr_1.1fr] rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: "#E5E7EB" }}>
            <div className="relative min-h-[260px] lg:min-h-[330px] overflow-hidden">
              <img src={lpsImg} alt="SAMEE200 gestión energética y producción industrial" loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
                <Factory className="h-5 w-5" color={COLORS.energy} /> INDUSTRIA · ENERGÍA & OEE
              </div>
            </div>
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">SAMEE200 — Energía y desempeño productivo</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Adquisición de variables eléctricas y operacionales mediante medidores industriales y gateways Edge.
                Integramos energía, producción y estados de máquina para construir indicadores de desempeño.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Dashboards para kWh, potencia, calidad de energía, producción, paradas, horas productivas,
                EnPI y OEE, con históricos y análisis de tendencias.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>SAMEE200</Pill><Pill>Modbus</Pill><Pill>OEE</Pill><Pill>ISO 50001</Pill>
              </div>
              <a href="/monitoreo-energetico" className="mt-6 inline-flex w-fit items-center rounded-xl px-5 py-3 font-semibold text-[#1E1E1E] transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]" style={{ backgroundColor: COLORS.energyButton }}>
                Ver proyecto y monitoreo energético →
              </a>
            </div>
          </article>

          {/* RPI-MDFR */}
          <article className="group grid lg:grid-cols-[0.9fr_1.1fr] rounded-3xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: "#E5E7EB" }}>
            <div className="relative min-h-[260px] lg:min-h-[330px] overflow-hidden">
              <img src={rpiImg} alt="RPI-MDFR control Edge para maduración de banano" loading="lazy" className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
                <Thermometer className="h-5 w-5" color={COLORS.energy} /> AGROINDUSTRIA · CONTROL EDGE
              </div>
            </div>
            <div className="p-7 md:p-9 flex flex-col justify-center">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900">RPI-MDFR — Maduración inteligente de banano</h3>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Sistema Edge para supervisar y controlar procesos de maduración por lote. Integra temperatura y humedad del cuarto,
                CO₂, etileno y temperatura de pulpa mediante PT100/PT1000.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Controla HVAC Samsung y su setpoint de temperatura, recirculación, humidificación, inyección de etileno,
                extracción de CO₂ y renovación con aire fresco. Integra estado de puerta y señal de seguridad de persona atrapada.
              </p>
              <p className="mt-3 text-gray-600 leading-relaxed">
                El dashboard Edge permite configurar límites de proceso, visualizar señales en línea, consultar históricos y
                conservar trazabilidad por lote. Puede operar en red local o replicar información hacia la nube.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Pill>HVAC</Pill><Pill>CO₂</Pill><Pill>C₂H₄</Pill><Pill>PT100/PT1000</Pill><Pill>Edge</Pill>
              </div>
            </div>
          </article>
        </div>

        {/* Nuevas aplicaciones */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border bg-gray-50 p-6" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex items-center gap-3">
              <Radio className="h-6 w-6" color={COLORS.energyIcon} />
              <h3 className="text-xl font-bold text-gray-900">LoRaWAN — Telemetría de agua</h3>
            </div>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Integración de medidores de agua y sensores distribuidos mediante LoRaWAN. El gateway conserva localmente las mediciones
              durante pérdidas de Internet y las retransmite al recuperar conectividad, preservando la trazabilidad temporal de los datos.
            </p>
          </div>

          <div className="rounded-2xl border bg-gray-50 p-6" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex items-center gap-3">
              <Waves className="h-6 w-6" color={COLORS.energyIcon} />
              <h3 className="text-xl font-bold text-gray-900">Monitoreo de agua y vertimientos</h3>
            </div>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Integración de instrumentación para centralizar caudal, volumen y variables fisicoquímicas según la aplicación,
              generando históricos, tendencias y alarmas que apoyan el seguimiento operacional y ambiental.
            </p>
          </div>
        </div>
      </Section>

      {/* RPI DETALLE */}
      <Section
        id="rpi-mdfr"
        title="RPI-MDFR: control del proceso en el borde"
        subtitle="El proceso de maduración puede operar completamente dentro de la red local del cliente, sin depender de la nube para supervisión y control."
      >
        <div className="grid lg:grid-cols-3 gap-6">
          <Card
            icon={<Thermometer className="h-6 w-6" color={COLORS.energyIcon} />}
            title="Sensores y proceso"
            desc="Temperatura y humedad ambiente, CO₂, etileno, temperatura de pulpa PT100/PT1000, puerta y señales de seguridad."
          />
          <Card
            icon={<Wind className="h-6 w-6" color={COLORS.energyIcon} />}
            title="Actuadores y HVAC"
            desc="Setpoint del HVAC, recirculación, humidificación, inyección de etileno, extracción de CO₂ y renovación de aire fresco."
          />
          <Card
            icon={<BarChart3 className="h-6 w-6" color={COLORS.energyIcon} />}
            title="Trazabilidad por lote"
            desc="Inicio de ciclo, variables en línea, históricos, tendencias, límites operacionales y alarmas para analizar el comportamiento del cuarto y del CO₂ durante la maduración."
          />
        </div>
      </Section>

      {/* TECNOLOGÍA */}
      <Section id="tecnologia" title="Tecnología PYP" subtitle="Hardware, comunicaciones y software integrados desde el piso de planta hasta el dato útil." white>
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card icon={<Gauge className="h-6 w-6" color={COLORS.energyIcon} />} title="SAMEE100 / SAMEE200" desc="Gateways y soluciones de adquisición para gestión energética y analítica industrial." />
          <Card icon={<Radio className="h-6 w-6" color={COLORS.energyIcon} />} title="Gateway LoRaWAN" desc="Concentración de sensores y medidores inalámbricos con almacenamiento local y conectividad IoT." />
          <Card icon={<Cpu className="h-6 w-6" color={COLORS.energyIcon} />} title="RPI-MDFR" desc="Automatización Edge y trazabilidad para procesos de maduración de banano." />
          <Card icon={<Network className="h-6 w-6" color={COLORS.energyIcon} />} title="CLG" desc="Plataforma y dispositivos para control centralizado de activos y contenidos distribuidos en múltiples sedes." />
          <Card icon={<Server className="h-6 w-6" color={COLORS.energyIcon} />} title="Integración de datos" desc="Modbus, MQTT, LoRaWAN, APIs, AWS IoT y conexión con plataformas propietarias del cliente." />
        </div>

        <div className="mt-8 rounded-2xl border bg-gray-50 p-6 md:p-8" style={{ borderColor: "#E5E7EB" }}>
          <div className="flex items-start gap-4">
            <CheckCircle2 className="h-7 w-7 shrink-0 mt-1" color={COLORS.energyIcon} />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Tus datos, donde los necesitas</h3>
              <p className="mt-2 text-gray-600 leading-relaxed">
                La solución no obliga al cliente a utilizar una plataforma específica. Los datos pueden permanecer en una red local,
                visualizarse en nuestra plataforma o integrarse con sistemas corporativos y aplicaciones de terceros.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* SECTORES */}
      <Section id="sectores" title="Sectores" subtitle="Aplicamos la misma capacidad de ingeniería a diferentes entornos operacionales.">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { t: "Industria", d: "Energía, OEE, producción, mantenimiento y automatización." },
            { t: "Retail", d: "Activos distribuidos, telemetría y gestión centralizada de campañas." },
            { t: "Agroindustria", d: "Maduración, variables ambientales, Edge y control de procesos." },
            { t: "Gestión hídrica", d: "Medición de agua, LoRaWAN, balances y monitoreo de vertimientos." },
          ].map((c) => (
            <div key={c.t} className="bg-white rounded-2xl p-6 shadow-sm border" style={{ borderColor: "#E5E7EB" }}>
              <h3 className="font-bold text-gray-900">{c.t}</h3>
              <p className="text-gray-600 mt-2">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" title="Cuéntanos qué necesitas medir, conectar o controlar" subtitle="Energía, producción, agua, variables de proceso o activos distribuidos. Evaluamos la instrumentación, conectividad y arquitectura necesaria." white>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 border text-gray-900" style={{ borderColor: "#D1D5DB" }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Datos de contacto</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5" color={COLORS.energyIcon} />
                <a href="mailto:jaime.pedraza@pyptecnologia.com" className="break-all font-medium text-gray-900 underline underline-offset-2 hover:text-[#416D13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]">jaime.pedraza@pyptecnologia.com</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5" color={COLORS.energyIcon} />
                <a href="tel:+573204929150" className="font-medium text-gray-900 underline underline-offset-2 hover:text-[#416D13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]">+57 320 492 9150</a>
              </li>
              <li className="flex items-center gap-3"><MapPin className="h-5 w-5" color={COLORS.energyIcon} /> Colombia</li>
            </ul>

            <div className="mt-8 rounded-xl bg-gray-50 border p-5" style={{ borderColor: "#D1D5DB" }}>
              <h4 className="font-bold text-gray-900">PYP Tecnología Electrónica SAS</h4>
              <p className="mt-2 text-gray-600 text-sm leading-relaxed">
                Ingeniería electrónica e IoT industrial: hardware, Edge Computing, comunicaciones, automatización,
                integración de datos y analítica aplicada a la operación.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 border" style={{ borderColor: "#E5E7EB" }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Solicitar evaluación</h3>
            <form
              name="contacto-pyp"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-4"
            >
              <input type="hidden" name="form-name" value="contacto-pyp" />
              <p className="hidden">
                <label>No llenar: <input name="bot-field" /></label>
              </p>

              <div>
                <label htmlFor="contacto-nombre" className="mb-1 block text-sm font-semibold text-gray-800">Nombre *</label>
                <input id="contacto-nombre" type="text" name="nombre" autoComplete="name" placeholder="Tu nombre" required className="w-full rounded-lg border px-4 py-3 bg-white text-gray-900 focus-visible:outline-2 focus-visible:outline-[#416D13]" style={{ borderColor: "#9CA3AF" }} />
              </div>
              <div>
                <label htmlFor="contacto-empresa" className="mb-1 block text-sm font-semibold text-gray-800">Empresa</label>
                <input id="contacto-empresa" type="text" name="empresa" autoComplete="organization" placeholder="Nombre de la empresa" className="w-full rounded-lg border px-4 py-3 bg-white text-gray-900 focus-visible:outline-2 focus-visible:outline-[#416D13]" style={{ borderColor: "#9CA3AF" }} />
              </div>
              <div>
                <label htmlFor="contacto-correo" className="mb-1 block text-sm font-semibold text-gray-800">Correo electrónico *</label>
                <input id="contacto-correo" type="email" name="correo" autoComplete="email" placeholder="correo@empresa.com" required className="w-full rounded-lg border px-4 py-3 bg-white text-gray-900 focus-visible:outline-2 focus-visible:outline-[#416D13]" style={{ borderColor: "#9CA3AF" }} />
              </div>

              <label htmlFor="contacto-solucion" className="mb-1 block text-sm font-semibold text-gray-800">Solución de interés</label>
              <select id="contacto-solucion" name="solucion" defaultValue="" className="w-full rounded-lg border px-4 py-3 bg-white text-gray-800 focus-visible:outline-2 focus-visible:outline-[#416D13]" style={{ borderColor: "#9CA3AF" }}>
                <option value="" disabled>¿Qué necesitas monitorear?</option>
                <option value="energia">Energía</option>
                <option value="oee">Producción / OEE</option>
                <option value="agua">Agua</option>
                <option value="vertimientos">Vertimientos</option>
                <option value="lorawan">LoRaWAN / IoT</option>
                <option value="automatizacion">Automatización / Edge</option>
                <option value="clg">Control multisede / CLG</option>
                <option value="otro">Otro</option>
              </select>

              <div>
                <label htmlFor="contacto-mensaje" className="mb-1 block text-sm font-semibold text-gray-800">Cuéntanos sobre tu proyecto *</label>
                <textarea id="contacto-mensaje" name="mensaje" placeholder="Describe brevemente lo que necesitas" rows={5} required className="w-full rounded-lg border px-4 py-3 bg-white text-gray-900 focus-visible:outline-2 focus-visible:outline-[#416D13]" style={{ borderColor: "#9CA3AF" }} />
              </div>

              <button type="submit" className="w-full py-3 rounded-lg font-semibold text-[#1E1E1E] transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]" style={{ backgroundColor: COLORS.energyButton }}>
                Solicitar evaluación
              </button>
            </form>
          </div>
        </div>
      </Section>

      </main>

      <footer className="border-t py-8 text-center text-gray-700 text-sm" style={{ borderColor: "#E5E7EB" }}>
        © {year} PYP Tecnología Electrónica SAS — IoT Industrial · Edge · Energía · Automatización
      </footer>
    </div>
  );
}
