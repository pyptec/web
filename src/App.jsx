import { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Cpu, Gauge, Cloud, ShieldCheck, Network, Zap, Wrench } from "lucide-react";
import clgImg from "./assets/proyectos/clg.jpeg";
import lpsImg from "./assets/proyectos/lps.jpeg";
import rpiImg from "./assets/proyectos/rpi.jpg";
const COLORS = {
  energy: "#A6CE39",
  energyDark: "#6BA425",
  grayLight: "#F5F5F5",
  grayMid: "#9CA3AF",
  grayDark: "#1E1E1E",
};

const NavLink = ({ href, children, external }) => (
  <a
    href={href}
    target={external ? "_blank" : "_self"}
    rel={external ? "noopener noreferrer" : undefined}
    className="text-gray-600 transition-colors duration-200 hover:text-[#A6CE39] focus:text-[#A6CE39] active:text-[#6BA425]"
  >
    {children}
  </a>
);

const Section = ({ id, title, subtitle, children }) => (
  <section id={id} className="py-20 scroll-mt-20">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-2" style={{ color: COLORS.grayDark }}>{title}</h2>
      {subtitle && <p className="text-lg text-gray-600 mb-10">{subtitle}</p>}
      {children}
    </div>
  </section>
);

const Card = ({ icon, title, desc }) => (
  <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition-shadow" style={{ borderColor: '#E5E7EB' }}>
    <div className="flex items-center gap-3 text-gray-900 mb-3">
      {icon}
      <h3 className="font-semibold text-lg">{title}</h3>
    </div>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default function App() {
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', e => {
        const targetId = link.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(targetId);
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }, []);

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.grayLight }}>
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl grid place-items-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${COLORS.energy}, ${COLORS.energyDark})` }}>P</div>
            <div>
              <p className="font-semibold" style={{ color: COLORS.grayDark }}>PYP Tecnología Electrónica SAS</p>
              <p className="text-[11px] text-gray-500">IoT · Energía · Automatización</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#proyectos">Proyectos</NavLink>
            <NavLink href="#tecnologia">Tecnología</NavLink>
            <NavLink href="#clientes">Clientes</NavLink>
            <NavLink href="https://iotrack.com.co" external>Plataforma</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </nav>
          <a href="#contacto" className="rounded-xl px-6 py-3 font-semibold text-white" style={{ backgroundColor: COLORS.energy }}>Hablemos</a>
        </div>
      </header>

      {/* HERO */}
      <section id="inicio" className="relative">
        <div className="absolute inset-0 -z-10" style={{ background: `radial-gradient(800px 400px at 80% -10%, ${COLORS.energy}1a, transparent 60%)` }} />
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight" style={{ color: COLORS.grayDark }}>Eficiencia energética e IoT industrial</h1>
            <p className="mt-4 text-lg text-gray-700">Diseñamos y operamos soluciones de <strong>monitoreo, control y analítica</strong> energética para industria, retail y agro, alineadas con <span className="text-[#6BA425] font-semibold">ISO 50001</span>.</p>
            <div className="mt-8 flex gap-4">
              <a href="#servicios" className="px-6 py-3 rounded-xl text-white font-semibold" style={{ backgroundColor: COLORS.energy }}>Ver servicios</a>
              <a href="#proyectos" className="px-6 py-3 rounded-xl border font-semibold text-gray-700 hover:bg-gray-50" style={{ borderColor: '#E5E7EB' }}>Proyectos</a>
            </div>
          </div>

          {/* BLOQUES DE DEMOSTRACIÓN */}
          <div className="grid grid-cols-2 gap-4">
            <Card icon={<Gauge className="h-6 w-6" color={COLORS.energyDark} />} title="Medición avanzada" desc="PAC3200, ME337, THD, PF, kWh en tiempo real." />
            <Card icon={<Cloud className="h-6 w-6" color={COLORS.energyDark} />} title="Nube industrial" desc="AWS IoT Core, Timestream y QuickSight para analítica energética." />
            <Card icon={<Network className="h-6 w-6" color={COLORS.energyDark} />} title="Edge & Gateways" desc="Gateway Greengrass y Modbus TCP/RTU." />
            <Card icon={<ShieldCheck className="h-6 w-6" color={COLORS.energyDark} />} title="Ciberseguridad" desc="Certificados X.509, VPN segura y mTLS integrado." />
            <Card icon={<Cpu className="h-6 w-6" color={COLORS.energyDark} />} title="Hardware a medida" desc="Diseño de PCBs, firmware y controladores personalizados." />
            <Card icon={<Zap className="h-6 w-6" color={COLORS.energyDark} />} title="Eficiencia" desc="Implementación de KPIs energéticos y proyectos ISO 50001." />
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <Section id="servicios" title="Servicios" subtitle="Acompañamos todo el ciclo: desde la medición hasta la acción.">
        <div className="grid md:grid-cols-3 gap-6">
          <Card icon={<Gauge className="h-6 w-6" color={COLORS.energyDark} />} title="Monitoreo energético" desc="Implementación de Sistemas de medición 
          energética integrados con AWS IoT Timestream. Compatibles con PAC3200, ME337 y protocolos Modbus RTU/TCP, DLMS/COSEM, MQTT e IEC 104, permiten 
          el monitoreo y análisis de energía en tiempo real con visualización avanzada en la nube." />
          <Card icon={<Cpu className="h-6 w-6" color={COLORS.energyDark} />} title="IoT y automatización" desc="Diseño de hardware embebido a la medida 
          para control industrial. Desarrollamos soluciones personalizadas que resuelven las necesidades específicas de tu proceso con precisión, confiabilidad 
          y eficiencia " />
          <Card icon={<ShieldCheck className="h-6 w-6" color={COLORS.energyDark} />} title="Eficiencia energética" desc="Equipos de medición modelos SAMEE100/200 
          y auditorías energéticas bajo la norma ISO 50001. Implementamos soluciones integrales para el diagnóstico, pronóstico y monitoreo energético, con 
          generación de alertas tempranas, dashboards personalizados y detección de oportunidades de mejora en los procesos productivos.

          Nuestros sistemas permiten una gestión energética inteligente, orientada a la eficiencia, sostenibilidad y cumplimiento normativo, facilitando la 
          toma de decisiones basada en datos reales." />

        </div>
      </Section>

   
 {/* PROYECTOS */}
<Section id="proyectos" title="Proyectos" subtitle="Casos reales en industria, retail y agro.">
  <div className="grid md:grid-cols-3 gap-6">

    {/* Cliente Ganador */}
    <div className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: '#E5E7EB' }}>
      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={clgImg}
          alt="Cliente Ganador Alkosto"
          className="w-full h-48 object-cover" /*"w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"*/
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
          
          <Zap className="h-5 w-5" color="#6BA425" /> Retail · Audio de Publicidad
        </div>
      </div>
    
      {/* Texto */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">Cliente Ganador (CLG) — Alkosto</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Dispositivo de audio con telemetría y control remoto, instalado en Alkosto y Ktronics.
          Reproduce mensajes del programa Cliente Ganador cada 50 facturas mediante señal digital.
        </p>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Permite actualizar audios de forma remota, monitorear el estado de cada equipo y gestionar
          campañas publicitarias centralizadas desde la nube.
        </p>
      </div>
    </div>

    {/* LPS Industria Plástica */}
    <div className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: '#E5E7EB' }}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={lpsImg}
          alt="LPS Industria Plástica"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
          <Cloud className="h-4 w-4" color="#6BA425" /> Industria · Gestión energética
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">LPS — Industria plástica</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Monitoreo energético de una planta de 240 kVA con SAMEE200 y medidores Meatrol ME337 vía
          Modbus TCP/IP, integrado a AWS IoT.
        </p>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Dashboards de KPIs energéticos por máquina (Aoki, prensas) con trazabilidad, análisis de
          tendencia y soporte a proyectos de eficiencia bajo ISO 50001.
        </p>
      </div>
    </div>

    {/* RPI-MDFR */}
    <div className="group rounded-2xl border bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300" style={{ borderColor: '#E5E7EB' }}>
      <div className="relative h-48 overflow-hidden">
        <img
          src={rpiImg}
          alt="RPI-MDFR-001 Maduración de frutas"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-semibold text-white">
          <Network className="h-4 w-4" color="#6BA425" /> Agro · Maduración
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900">RPI-MDFR-001 — Maduración de frutas</h3>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Sistema IoT para cámaras de maduración que controla CO₂, humedad, temperatura y etileno
          desde una plataforma basada en Raspberry Pi y AWS IoT Core.
        </p>
        <p className="mt-2 text-gray-600 text-sm leading-relaxed">
          Automatiza ventilación, recirculación, inyección de etileno y tiempos de apertura de puertas,
          mejorando calidad del fruto, tiempos de proceso y consumo energético.
        </p>
      </div>
    </div>

  </div>
</Section>


     

      {/* TECNOLOGÍA */}
      <Section id="tecnologia" title="Tecnología" subtitle="Conectamos el piso de planta con la nube.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card icon={<Cpu className="h-6 w-6" color={COLORS.energyDark} />} title="Edge Computing" desc="Gateways con Greengrass, Balena y MQTT mTLS para monitoreo local con replicación en nube." />
          <Card icon={<Cloud className="h-6 w-6" color={COLORS.energyDark} />} title="Nube industrial" desc="Integraciones con AWS IoT Core, Timestream, QuickSight y almacenamiento seguro S3." />
        </div>
      </Section>

      {/* CLIENTES */}
      <Section id="clientes" title="Clientes" subtitle="Sectores donde aplicamos nuestras soluciones.">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="font-semibold text-gray-900">Retail</h3>
            <p className="text-gray-600">Alkosto, Éxito, Falabella</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="font-semibold text-gray-900">Industria</h3>
            <p className="text-gray-600">LPS, Siderurgia, plásticos</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="font-semibold text-gray-900">Energía</h3>
            <p className="text-gray-600">GD, BESS, plantas solares</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="font-semibold text-gray-900">Agro</h3>
            <p className="text-gray-600">Maduración, control ambiental</p>
          </div>
        </div>
      </Section>

      {/* CONTACTO */}
      <Section id="contacto" title="Contacto" subtitle="Conversemos sobre tu proyecto.">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Datos de contacto</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3"><Mail className="h-5 w-5" color={COLORS.energyDark} /> pyptec@hotmail.com</li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5" color={COLORS.energyDark} /> +57 320 492 9150</li>
              <li className="flex items-center gap-3"><MapPin className="h-5 w-5" color={COLORS.energyDark} /> Colombia</li>
            </ul>
          </div>

          <div className="bg-white rounded-xl p-6 border" style={{ borderColor: '#E5E7EB' }}>
            <h3 className="text-gray-900 font-semibold text-lg mb-4">Formulario</h3>
            <form
  name="contacto-pyp"
  method="POST"
  data-netlify="true"
  netlify-honeypot="bot-field"
  className="space-y-4"
>
  {/* obligatorio para Netlify */}
  <input type="hidden" name="form-name" value="contacto-pyp" />

  {/* honeypot anti-bots */}
  <p className="hidden">
    <label>
      No llenar: <input name="bot-field" />
    </label>
  </p>

  <input
    type="text"
    name="nombre"
    placeholder="Nombre"
    required
    className="w-full rounded-lg border px-4 py-2"
    style={{ borderColor: '#E5E7EB' }}
  />

  <input
    type="email"
    name="correo"
    placeholder="Correo"
    required
    className="w-full rounded-lg border px-4 py-2"
    style={{ borderColor: '#E5E7EB' }}
  />

  <textarea
    name="mensaje"
    placeholder="Mensaje"
    rows={4}
    required
    className="w-full rounded-lg border px-4 py-2"
    style={{ borderColor: '#E5E7EB' }}
  ></textarea>

  <button
    type="submit"
    className="w-full py-2 rounded-lg font-semibold text-white"
    style={{ backgroundColor: COLORS.energy }}
  >
    Enviar
  </button>
</form>

          </div>
        </div>
      </Section>

      <footer className="border-t py-8 text-center text-gray-500 text-sm" style={{ borderColor: '#E5E7EB' }}>
        © {year} PYP Tecnología Electrónica SAS — IoT · Energía · Automatización
      </footer>
    </div>
  );
}
