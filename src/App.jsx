import { useState } from "react";
import { Mail, Phone, MapPin, Cpu, Gauge, Cloud, ShieldCheck, Network, Zap, Wrench } from "lucide-react";

// Paleta PYP — Verde energía + grises
const COLORS = {
  energy: "#A6CE39",     // verde energía
  energyDark: "#6BA425", // verde hover
  grayLight: "#F5F5F5",  // fondo claro
  grayMid: "#9CA3AF",    // textos secundarios
  grayDark: "#1E1E1E",   // títulos/contraste
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
  <section id={id} className="py-20">
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: COLORS.grayDark }}>{title}</h2>
      {subtitle && <p className="mt-2 max-w-3xl text-gray-600">{subtitle}</p>}
      <div className="mt-10">{children}</div>
    </div>
  </section>
);

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm" style={{ borderColor: "#E5E7EB", color: "#374151" }}>
    {children}
  </span>
);

export default function App() {
  const [year] = useState(new Date().getFullYear());

  // Cambia el color del navbar al hacer scroll
  useState(() => {
    const onScroll = () => {
      const header = document.querySelector('header');
      if (!header) return;
      if (window.scrollY > 8) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  });

  // Componentes de botón con variantes (primario verde y secundario gris)
  const Button = ({ children, href, variant = 'primary', external }) => {
    const base = 'inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors';
    const styles = {
      primary: { backgroundColor: COLORS.energy, color: '#ffffff' },
      secondary: { backgroundColor: '#ffffff', color: '#374151', border: '1px solid #E5E7EB' },
    };
    const style = styles[variant];
    return (
      <a href={href} target={external ? "_blank" : "_self"} rel={external ? "noopener noreferrer" : undefined} className={base} style={style}>
        {children}
      </a>
    );
  };

  // Tarjeta reutilizable
  const Card = ({ children }) => (
    <div className="rounded-2xl border bg-white p-6 hover:shadow-md transition-shadow" style={{ borderColor: '#E5E7EB' }}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: COLORS.grayLight }}>
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="#inicio" className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl grid place-items-center text-white font-bold" style={{ background: `linear-gradient(135deg, ${COLORS.energy}, ${COLORS.energyDark})` }}>P</div>
            <div className="leading-tight">
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
          <Button href="#contacto" variant="primary">Hablemos</Button>
        </div>
      </header>

      {/* Hero mejorado con degradado sutil */}
      <section id="inicio" className="relative">
        <div className="absolute inset-0 -z-10" style={{
          background: `radial-gradient(800px 400px at 80% -10%, ${COLORS.energy}1a, transparent 60%)`
        }} />
        <div className="max-w-6xl mx-auto px-6 pt-16 pb-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight" style={{ color: COLORS.grayDark }}>
              Eficiencia energética e IoT industrial
            </h1>
            <p className="mt-4 text-lg text-gray-700">
              Diseñamos y operamos soluciones de <strong className="text-black">medición, monitoreo y control</strong> para plantas industriales y retail. Alineamos tecnología con <span className="font-semibold" style={{ color: COLORS.grayDark }}>ISO 50001</span> para reducir costos, mejorar OEE y tomar decisiones con datos.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Chip>ISO 50001</Chip>
              <Chip>SCADA · Modbus · IEC 60870-5-104</Chip>
              <Chip>AWS IoT · Edge</Chip>
              <Chip>LoRaWAN · MQTT</Chip>
              <Chip>Gateway SAMEE</Chip>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href="#servicios" variant="primary">Ver servicios</Button>
              <Button href="#proyectos" variant="secondary">Casos reales</Button>
            </div>
          </div>

          <div className="relative">
            <Card>
              <div className="grid grid-cols-2 gap-4 text-gray-800">
                {[
                  { icon: <Gauge className="h-6 w-6" color={COLORS.energyDark} />, t: 'Medición avanzada', d: 'PAC3200, ME337, THD, PF, kWh' },
                  { icon: <Cloud className="h-6 w-6" color={COLORS.energyDark} />, t: 'Nube industrial', d: 'AWS IoT, Timestream, MQTT mTLS' },
                  { icon: <Network className="h-6 w-6" color={COLORS.energyDark} />, t: 'Edge & Gateways', d: 'Raspberry/ESP32, Balena, Greengrass' },
                  { icon: <ShieldCheck className="h-6 w-6" color={COLORS.energyDark} />, t: 'Ciberseguridad', d: 'Certificados X.509, VPN, mTLS' },
                  { icon: <Cpu className="h-6 w-6" color={COLORS.energyDark} />, t: 'Hardware a medida', d: 'HMI, drivers I²C/Modbus, FreeRTOS' },
                  { icon: <Zap className="h-6 w-6" color={COLORS.energyDark} />, t: 'Eficiencia', d: 'KPIs, ISO 50001, dashboards' },
                ].map((c, i) => (
                  <div key={i} className="rounded-xl bg-gray-50 p-4 border hover:bg-white transition-colors" style={{ borderColor: '#E5E7EB' }}>
                    <div style={{ color: COLORS.energyDark }}>{c.icon}</div>
                    <p className="mt-2 font-semibold text-gray-900">{c.t}</p>
                    <p className="text-sm text-gray-600">{c.d}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Franja separadora sutil */}
      <div className="border-t" style={{ borderColor: '#E5E7EB' }} />

      {/* Servicios */}
      <Section id="servicios" title="Servicios" subtitle="Acompañamos el ciclo completo: desde la toma de datos hasta la acción en planta.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Gauge className="h-6 w-6" color={COLORS.energyDark} />, title: 'Medición & Monitoreo Energético',
              bullets: [
                'Levantamiento de variables eléctricas (V, I, PF, THD, kWh)',
                'Integración PAC3200, ME337 y medidores DLMS/COSEM',
                'Dashboards y alarmas (AWS Timestream/QuickSight)'
              ]
            },
            {
              icon: <Cpu className="h-6 w-6" color={COLORS.energyDark} />, title: 'IoT & Automatización a Medida',
              bullets: [
                'Diseño de hardware y firmware (ESP32, RPi, FreeRTOS)',
                'Gateways edge con Modbus, MQTT, LoRaWAN',
                'HMI, drivers I²C/Modbus, integración SCADA'
              ]
            },
            {
              icon: <ShieldCheck className="h-6 w-6" color={COLORS.energyDark} />, title: 'Eficiencia Energética (ISO 50001)',
              bullets: [
                'Líneas base y KPIs energéticos (SAMEE100/200)',
                'Auditorías de uso significativo de energía (USE)',
                'Proyectos de mejora y verificación de ahorros'
              ]
            }
          ].map((s, i) => (
            <Card key={i}>
              <div style={{ color: COLORS.energyDark }}>{s.icon}</div>
              <h3 className="mt-3 text-xl font-semibold text-gray-900">{s.title}</h3>
              <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
                {s.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            </Card>
          ))}
        </div>
      </Section>

      {/* Proyectos destacados */}
      <Section id="proyectos" title="Proyectos destacados" subtitle="Casos reales en industria, retail y agro.">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { tag: 'Retail · Audio de alerta', title: 'Cliente Ganador (CLG) — Alkosto', desc: 'Dispositivo insignia con enfoque en eficiencia energética e ISO 50001. Telemetría, control y analítica.' },
            { tag: 'Plásticos · Eficiencia', title: 'Laboratorios Industriales LPS', desc: 'KPIs energéticos y dashboard de consumo por máquina (Aoki, prensas). Integración con PAC3200 y medidores.' },
            { tag: 'Agro · Maduración', title: 'RPI-MDFR-001', desc: 'Sistema de maduración de frutas: CO₂, HR, temperatura, control de etileno, extractores y humidificación.' },
          ].map((p, i) => (
            <Card key={i}>
              <div className="text-xs uppercase tracking-wider" style={{ color: COLORS.energyDark }}>{p.tag}</div>
              <h3 className="mt-2 text-xl font-semibold text-gray-900">{p.title}</h3>
              <p className="mt-2 text-gray-600">{p.desc}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Chip>MQTT mTLS</Chip>
                <Chip>Modbus TCP/RTU</Chip>
                <Chip>AWS IoT</Chip>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Tecnología */}
      <Section id="tecnologia" title="Tecnología" subtitle="Conectamos el piso de planta con la nube de forma segura y escalable.">
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <h3 className="text-gray-900 font-semibold text-lg">Stack IoT & Datos</h3>
            <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
              <li>Gateways Edge: Raspberry Pi, ESP32, Orange Pi</li>
              <li>Protocolos: Modbus RTU/TCP, MQTT, LoRaWAN, IEC 60870-5-104, DLMS/COSEM</li>
              <li>Nube: AWS IoT Core, Timestream, S3, QuickSight</li>
              <li>Seguridad: X.509, VPN, mTLS, gestión de credenciales</li>
            </ul>
          </Card>
          <Card>
            <h3 className="text-gray-900 font-semibold text-lg">KPIs y metodología</h3>
            <ul className="mt-3 space-y-2 text-gray-600 list-disc list-inside">
              <li>ISO 50001: línea base, objetivos, verificación de desempeño</li>
              <li>SAMEE100/200: modelo propio para gestión energética</li>
              <li>MTBF/MTTR, OEE, alarmas y análisis de eventos</li>
              <li>Integración con SCADA y HMI existentes</li>
            </ul>
          </Card>
        </div>
      </Section>

      {/* Sectores */}
      <Section id="clientes" title="Sectores a los que servimos" subtitle="Experiencia práctica en entornos reales.">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { t: 'Industria', d: 'Siderurgia, plásticos, alimentos' },
            { t: 'Retail', d: 'Grandes superficies y cadenas' },
            { t: 'Energía', d: 'GD, BESS, plantas solares 9.9 MW' },
            { t: 'Agro', d: 'Cámaras de maduración, clima' },
          ].map((c, i) => (
            <Card key={i}>
              <h4 className="text-gray-900 font-semibold">{c.t}</h4>
              <p className="text-gray-600 mt-1">{c.d}</p>
            </Card>
          ))}
        </div>
      </Section>

      {/* Contacto */}
      <Section id="contacto" title="Contacto" subtitle="Cuéntanos tu reto y te proponemos un plan práctico y medible.">
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <h3 className="text-gray-900 font-semibold text-lg">Datos de contacto</h3>
            <ul className="mt-3 space-y-3 text-gray-700">
              <li className="flex items-center gap-3"><Mail className="h-5 w-5" color={COLORS.energyDark} /> <a href="mailto:contacto@pyp-tec.com" className="hover:underline">contacto@pyp-tec.com</a></li>
              <li className="flex items-center gap-3"><Phone className="h-5 w-5" color={COLORS.energyDark} /> <a href="tel:+573000000000" className="hover:underline">+57 300 000 0000</a></li>
              <li className="flex items-center gap-3"><MapPin className="h-5 w-5" color={COLORS.energyDark} /> Colombia</li>
              <li className="flex items-center gap-3"><Wrench className="h-5 w-5" color={COLORS.energyDark} /> NIT: 830.113.707-5</li>
            </ul>
            <p className="mt-4 text-sm text-gray-500">PYP Tecnología Electrónica SAS — Todos los derechos reservados © {year}</p>
          </Card>

          <Card>
            <div className="grid gap-4">
              <div>
                <label className="block text-gray-700 text-sm">Nombre</label>
                <input required className="w-full mt-1 rounded-xl bg-white border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} placeholder="Tu nombre" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Email</label>
                <input type="email" required className="w-full mt-1 rounded-xl bg-white border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} placeholder="tucorreo@empresa.com" />
              </div>
              <div>
                <label className="block text-gray-700 text-sm">Mensaje</label>
                <textarea required rows={4} className="w-full mt-1 rounded-xl bg-white border px-4 py-2 outline-none focus:ring-2" style={{ borderColor: '#E5E7EB' }} placeholder="Cuéntanos sobre tu proyecto"></textarea>
              </div>
              <Button href="#" variant="primary">Enviar</Button>
            </div>
            <p className="text-xs text-gray-500 mt-3">* Este formulario es demostrativo. Podemos conectarlo a tu correo, WhatsApp o CRM.</p>
          </Card>
        </div>
      </Section>

      {/* Footer */}
      <footer className="border-t py-8" style={{ borderColor: '#E5E7EB' }}>
        <div className="max-w-6xl mx-auto px-6 text-gray-500 text-sm flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
          <p>© {year} PYP Tecnología Electrónica SAS</p>
          <div className="flex gap-4">
            <a href="#politica" className="hover:text-gray-700">Política de privacidad</a>
            <a href="#terminos" className="hover:text-gray-700">Términos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
