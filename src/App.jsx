import { useState } from "react";
import {
  Mail, Phone, MapPin, Cpu, Gauge, Cloud, ShieldCheck, Network, Zap, Wrench,
} from "lucide-react";

// Paleta simple
const COLORS = {
  primary: "#0ea5e9",
  bg: "#0b1220",
};

// Link de navegación
function NavLink({ href, children }) {
  return (
    <a href={href} className="text-slate-300 hover:text-white transition-colors">
      {children}
    </a>
  );
}

// Sección reutilizable
function Section({ id, title, subtitle, children }) {
  return (
    <section id={id} className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">{title}</h2>
        {subtitle && <p className="mt-2 text-slate-300 max-w-3xl">{subtitle}</p>}
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-700 px-3 py-1 text-sm text-slate-300">
      {children}
    </span>
  );
}

export default function App() {
  const [year] = useState(new Date().getFullYear());

  return (
    <div
      className="min-h-screen w-full"
      style={{
        background: `radial-gradient(1200px 600px at 80% -10%, ${COLORS.primary}10, ${COLORS.bg} 60%)`,
        backgroundColor: COLORS.bg,
      }}
    >
      {/* Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-slate-900/60 border-b border-slate-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 grid place-items-center text-white font-bold">
              P
            </div>
            <div className="leading-tight">
              <p className="text-white font-semibold">PYP Tecnología Electrónica SAS</p>
              <p className="text-[11px] text-slate-400">IoT · Energía · Automatización</p>
            </div>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <NavLink href="#servicios">Servicios</NavLink>
            <NavLink href="#proyectos">Proyectos</NavLink>
            <NavLink href="#tecnologia">Tecnología</NavLink>
            <NavLink href="#clientes">Clientes</NavLink>
            <NavLink href="#contacto">Plataforma</NavLink>
            <NavLink href="#contacto">Contacto</NavLink>
          </nav>
          <a
            href="#contacto"
            className="ml-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 text-sm font-semibold"
          >
            Hablemos
          </a>
        </div>
      </header>

      {/* Hero */}
      <section id="inicio" className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              Eficiencia energética e IoT industrial
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Diseñamos y operamos soluciones de{" "}
              <strong className="text-white">medición, monitoreo y control</strong> para plantas industriales y retail.
              Alineamos tecnología con <span className="text-white font-semibold">ISO 50001</span> para reducir costos y mejorar desempeño.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Chip>ISO 50001</Chip>
              <Chip>SCADA · Modbus · IEC 60870-5-104</Chip>
              <Chip>AWS IoT · Edge</Chip>
              <Chip>LoRaWAN · MQTT</Chip>
              <Chip>Raspberry Pi · ESP32</Chip>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#servicios" className="rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 font-semibold">
                Ver servicios
              </a>
              <a href="#proyectos" className="rounded-xl border border-slate-700 hover:border-slate-500 text-slate-200 px-6 py-3 font-semibold">
                Casos reales
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-2xl">
              <div className="grid grid-cols-2 gap-4 text-slate-200">
                {[
                  { icon: <Gauge className="h-6 w-6" />, t: "Medición avanzada", d: "PAC3200, ME337, THD, PF, kWh" },
                  { icon: <Cloud className="h-6 w-6" />, t: "Nube industrial", d: "AWS IoT, Timestream, MQTT mTLS" },
                  { icon: <Network className="h-6 w-6" />, t: "Edge & Gateways", d: "Raspberry/ESP32, Balena, Greengrass" },
                  { icon: <ShieldCheck className="h-6 w-6" />, t: "Ciberseguridad", d: "Certificados X.509, VPN, mTLS" },
                  { icon: <Cpu className="h-6 w-6" />, t: "Hardware a medida", d: "HMI, drivers I²C/Modbus, FreeRTOS" },
                  { icon: <Zap className="h-6 w-6" />, t: "Eficiencia", d: "KPIs, ISO 50001, dashboards" },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl bg-slate-800/40 p-4 border border-slate-700">
                    <div className="text-cyan-400">{c.icon}</div>
                    <p className="mt-2 font-semibold">{c.t}</p>
                    <p className="text-sm text-slate-300">{c.d}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnología (ejemplo breve) */}
      <Section id="tecnologia" title="Tecnología" subtitle="Conectamos el piso de planta con la nube de forma segura y escalable.">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-white font-semibold text-lg">Stack IoT & Datos</h3>
            <ul className="mt-3 space-y-2 text-slate-300 list-disc list-inside">
              <li>Raspberry Pi, ESP32, Orange Pi</li>
              <li>Modbus RTU/TCP, MQTT, LoRaWAN, IEC 60870-5-104, DLMS/COSEM</li>
              <li>AWS IoT Core, Timestream, S3, QuickSight</li>
              <li>Certificados X.509, VPN, mTLS</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-white font-semibold text-lg">KPIs y metodología</h3>
            <ul className="mt-3 space-y-2 text-slate-300 list-disc list-inside">
              <li>ISO 50001: línea base, objetivos, verificación</li>
              <li>SAMEE100/200: KPIs energéticos propios</li>
              <li>MTBF/MTTR, OEE, alarmas y eventos</li>
            </ul>
          </div>
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto" title="Contacto" subtitle="Cuéntanos tu reto y te proponemos un plan práctico y medible.">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <h3 className="text-white font-semibold text-lg">Datos de contacto</h3>
            <ul className="mt-3 space-y-3 text-slate-300">
              <li className="flex items-center gap-3"><Mail className="h-5 w-5 text-cyan-400" /> <a href="mailto:contacto@pyp-tec.com" className="hover:text-white">contacto@pyp-tec.com</a></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5 text-cyan-400" /> <a href="tel:+573000000000" className="hover:text-white">+57 300 000 0000</a></li>
              <li className="flex items-center gap-3"><MapPin className="h-5 w-5 text-cyan-400" /> Colombia</li>
              <li className="flex items-center gap-3"><Wrench className="h-5 w-5 text-cyan-400" /> NIT: 830.113.707-5</li>
            </ul>
            <p className="mt-4 text-sm text-slate-400">PYP Tecnología Electrónica SAS — © {year}</p>
          </div>

          <form className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="grid gap-4">
              <div>
                <label className="block text-slate-300 text-sm">Nombre</label>
                <input className="w-full mt-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white outline-none focus:ring-2 ring-cyan-500" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm">Email</label>
                <input type="email" className="w-full mt-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white outline-none focus:ring-2 ring-cyan-500" placeholder="tucorreo@empresa.com" />
              </div>
              <div>
                <label className="block text-slate-300 text-sm">Mensaje</label>
                <textarea rows={4} className="w-full mt-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-2 text-white outline-none focus:ring-2 ring-cyan-500" placeholder="Cuéntanos sobre tu proyecto"></textarea>
              </div>
              <button type="button" onClick={() => alert("Gracias. Este formulario es de demostración.")} className="rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 font-semibold">
                Enviar
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-3">* Este formulario es demostrativo.</p>
          </form>
        </div>
      </Section>
    </div>
  );
}
