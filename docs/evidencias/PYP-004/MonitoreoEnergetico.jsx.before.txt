

import {

  ArrowLeft,

  ArrowRight,

  Activity,

  BarChart3,

  Bell,

  CheckCircle2,

  Cloud,

  Cpu,

  Factory,

  Gauge,

  Mail,

  Monitor,

  Phone,

  Radio,

  Sun,

  Thermometer,

  Zap

} from "lucide-react";



import lpsImg from "../assets/proyectos/lps.webp";
import lpsInstalacion from "../assets/proyectos/lps-instalacion-samee200.webp";

import solarImg from "../assets/proyectos/paneles-solares.webp";

import logoPyp from "../assets/proyectos/log_pyp.webp";

import sameeImg from "../assets/proyectos/samee200.jpeg";
import alkostoCorrientes from "../assets/proyectos/alkosto-corrientes.png";
import alkostoResumen from "../assets/proyectos/alkosto-resumen.png";
import canJ1939Dashboard from "../assets/proyectos/can-j1939-dashboard.png";



const COLORS = {

  energy: "#A6CE39",

  energyDark: "#416D13",
  energyIcon: "#6BA425",

  grayLight: "#F5F5F5",

  grayDark: "#1E1E1E"

};



const capacidades = [

  {

    icon: Gauge,

    title: "Medición eléctrica",

    description:

      "Monitoreo de energía, potencia, demanda, tensiones, corrientes y otras variables disponibles en los equipos integrados."

  },

  {

    icon: Monitor,

    title: "Dashboard local",

    description:

      "Visualización de variables, curvas e indicadores desde la red local del cliente, sin depender de Internet para la consulta local."

  },

  {

    icon: Cloud,

    title: "Monitoreo web",

    description:

      "Supervisión remota, consulta de históricos y centralización de datos mediante plataformas web."

  },

  {

    icon: BarChart3,

    title: "Indicadores energéticos",

    description:

      "Seguimiento de consumos, generación, líneas base, desviaciones e indicadores de desempeño energético EnPI."

  },

  {

    icon: Activity,

    title: "Diagnóstico operativo",

    description:

      "Análisis de tendencias, comportamientos anómalos y oportunidades de mejora energética y mantenimiento."

  },

  {

    icon: Bell,

    title: "Alarmas y análisis predictivo",

    description:

      "Alertas por condiciones anómalas y desviaciones de línea base. Los pronósticos pueden desarrollarse según los datos y requisitos del proyecto."

  }

];



const equiposLps = [

  "Inyecto-sopladora AOKI",

  "Compresor de alta presión",

  "Compresor de baja presión",

  "Deshumidificador",

  "Equipos auxiliares",

  "Zona de producción"

];



const indicadoresAlkosto = [

  {

    icon: Sun,

    title: "Energía generada",

    description:

      "Consulta de la energía fotovoltaica generada por hora, día, mes y año, expresada en kWh."

  },

  {

    icon: Zap,

    title: "Inyección a la red",

    description:

      "Seguimiento de la energía entregada a la red eléctrica y su comportamiento histórico."

  },

  {

    icon: BarChart3,

    title: "Curvas de generación",

    description:

      "Gráficas de producción de los paneles e inversores para analizar tendencias y desempeño."

  },

  {

    icon: Gauge,

    title: "Variables eléctricas",

    description:

      "Visualización de tensiones, corrientes, potencias y otras variables disponibles para administrar la instalación."

  },

  {

    icon: Monitor,

    title: "Dashboard local y web",

    description:

      "Supervisión desde la red interna del cliente y posibilidad de consulta remota mediante plataforma web."

  },

  {

    icon: Activity,

    title: "Análisis para mantenimiento",

    description:

      "Identificación de caídas de generación, desviaciones y cambios de comportamiento que pueden orientar inspecciones."

  }

];



function FeatureCard({ icon: Icon, title, description }) {

  return (

    <article className="bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-lg transition-shadow">

      <div

        className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"

        style={{ backgroundColor: "#A6CE3922" }}

      >

        <Icon size={25} color={COLORS.energyIcon} />

      </div>



      <h3 className="text-xl font-bold text-gray-900 mb-3">

        {title}

      </h3>



      <p className="text-gray-600 leading-relaxed">

        {description}

      </p>

    </article>

  );

}



function SectionTitle({ eyebrow, title, description }) {

  return (

    <div className="mb-10">

      {eyebrow && (

        <p

          className="text-sm font-bold uppercase tracking-widest mb-3 border-l-4 pl-3"

          style={{ color: COLORS.energyDark }}

        >

          {eyebrow}

        </p>

      )}



      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">

        {title}

      </h2>



      {description && (

        <p className="mt-4 text-lg text-gray-600 max-w-4xl leading-relaxed">

          {description}

        </p>

      )}

    </div>

  );

}



export default function MonitoreoEnergetico() {

  const year = new Date().getFullYear();



  return (

    <div

      className="min-h-screen w-full"

      style={{ backgroundColor: COLORS.grayLight }}

    >

      {/* ENCABEZADO */}

      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-200">

        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-wrap items-center justify-between gap-4">

          <a href="/" className="flex items-center gap-3">

            <img

              src={logoPyp}

              alt="Logo PYP Tecnología Electrónica SAS"

              className="h-14 md:h-16 w-auto object-contain"

            />



            <div>

              <p className="font-bold text-sm md:text-base text-gray-900">

                PYP Tecnología Electrónica SAS

              </p>



              <p className="text-xs text-gray-500">

                IoT Industrial · Energía · Automatización

              </p>

            </div>

          </a>



          <nav aria-label="Navegación de monitoreo energético" className="flex items-center gap-5">

            <a

              href="/"

              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-[#6BA425]"

            >

              <ArrowLeft size={18} />

              Inicio

            </a>



            <a

              href="#contacto"

              className="rounded-xl px-5 py-2.5 font-semibold bg-[#A6CE39] text-[#1E1E1E] hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13] transition-colors duration-200"

            >

              Hablemos

            </a>

          </nav>

        </div>

      </header>



      <main>

        {/* HERO */}

        <section className="relative overflow-hidden bg-gradient-to-br from-white via-[#F7FAEF] to-[#EFF6DC]">

          <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">

            <div className="max-w-5xl">

              <p

                className="text-sm font-bold uppercase tracking-widest"

                style={{ color: COLORS.energyDark }}

              >

                Soluciones SAMEE100 / SAMEE200

              </p>



              <h1 className="mt-5 text-4xl md:text-6xl font-extrabold leading-tight text-gray-900">

                Monitoreo energético industrial y solar

              </h1>



              <p className="mt-7 text-xl text-gray-700 leading-relaxed">

                Medimos, supervisamos y analizamos el comportamiento

                energético de plantas industriales, procesos

                productivos y sistemas solares fotovoltaicos.

              </p>



              <p className="mt-5 text-lg text-gray-600 leading-relaxed">

                En PYP Tecnología desarrollamos soluciones IoT

                que integran medidores eléctricos, sensores

                ambientales, gateways SAMEE100/200, dashboards

                locales y plataformas web para transformar

                datos operativos en información útil.

              </p>



              <div className="mt-9 flex flex-wrap gap-4">

                <a

                  href="#proyectos"

                  className="inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold bg-[#A6CE39] text-[#1E1E1E] hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13] transition-colors duration-200"

                >

                  Conocer proyectos

                  <ArrowRight size={18} />

                </a>



                <a

                  href="#contacto"

                  className="inline-flex items-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800 hover:bg-gray-50"

                >

                  Solicitar evaluación

                </a>

              </div>

            </div>

          </div>

        </section>



        {/* PRESENTACIÓN DEL EQUIPO SAMEE Y SUS APLICACIONES */}
        <section className="bg-white py-16 md:py-20 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-sm font-bold uppercase tracking-widest" style={{ color: COLORS.energyDark }}>
                  Tecnología desarrollada por PYP
                </p>
                <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
                  SAMEE100 / SAMEE200
                </h2>
                <p className="mt-5 text-xl font-semibold text-gray-700">
                  Equipo IoT para monitoreo energético industrial y fotovoltaico
                </p>
                <p className="mt-5 text-gray-600 leading-relaxed">
                  Integra medidores eléctricos y sensores, procesa datos en sitio y permite
                  visualizar variables, históricos e indicadores mediante dashboards locales
                  y plataformas web, según la configuración de cada proyecto.
                </p>
                <div className="grid sm:grid-cols-2 gap-5 mt-8">
                  {[
                    { icon: Gauge, title: "Medición", text: "Integración de medidores y sensores." },
                    { icon: Cpu, title: "Adquisición local", text: "Procesamiento de datos en sitio." },
                    { icon: Monitor, title: "Dashboard local", text: "Supervisión desde la red del cliente." },
                    { icon: Cloud, title: "Plataforma web", text: "Históricos y monitoreo remoto." }
                  ].map((item) => {
                    const Icon = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-3">
                        <Icon size={25} color={COLORS.energyIcon} className="shrink-0" />
                        <div>
                          <h3 className="font-bold text-gray-900">{item.title}</h3>
                          <p className="mt-1 text-sm text-gray-600">{item.text}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <figure className="rounded-3xl bg-gray-50 border border-gray-200 p-6 md:p-10">
                <img src={sameeImg} alt="Equipo SAMEE100 y SAMEE200 de PYP Tecnología" className="w-full max-h-[460px] object-contain" />
                <figcaption className="mt-4 text-center text-sm text-gray-500">
                  Equipo SAMEE para adquisición y supervisión de variables energéticas
                </figcaption>
              </figure>
            </div>

            <div className="mt-16">
              <h3 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900">
                Aplicaciones en industria y energía solar
              </h3>
              <p className="text-center mt-4 mb-9 text-gray-600">
                Dos proyectos que muestran cómo se utiliza la tecnología SAMEE.
              </p>
              <div className="grid lg:grid-cols-2 gap-8">
                <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative h-64 md:h-80">
                    <img src={lpsImg} alt="Línea de producción de plásticos de LPS con máquina AOKI" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl shadow-md p-2 flex items-center gap-3">
                      <img src={sameeImg} alt="Equipo SAMEE" className="w-16 h-16 object-contain" loading="lazy" />
                      <span className="text-sm font-semibold text-gray-800">Monitoreo industrial SAMEE</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORS.energyDark }}>Industria</p>
                    <h4 className="mt-2 text-2xl font-bold text-gray-900">Laboratorios Industriales LPS</h4>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      Dos medidores: uno para el consumo total de la línea de plásticos y otro
                      para el compresor de alta presión. Sensores ambientales, dashboards
                      local y web, línea base energética y alarmas por desviaciones.
                    </p>
                    <a href="#lps" className="inline-flex items-center gap-2 mt-5 font-semibold" style={{ color: COLORS.energyDark }}>
                      Ver proyecto LPS <ArrowRight size={18} />
                    </a>
                  </div>
                </article>
                <article className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
                  <div className="relative h-64 md:h-80">
                    <img src={solarImg} alt="Imagen ilustrativa de paneles solares; el proyecto real se encuentra en Alkosto Avenida 68, Bogotá" className="w-full h-full object-cover" loading="lazy" />
                    <div className="absolute bottom-4 left-4 bg-white/95 rounded-xl shadow-md p-2 flex items-center gap-3">
                      <img src={sameeImg} alt="Equipo SAMEE" className="w-16 h-16 object-contain" loading="lazy" />
                      <span className="text-sm font-semibold text-gray-800">Monitoreo solar SAMEE</span>
                    </div>
                  </div>
                  <div className="p-7">
                    <p className="text-sm font-bold uppercase tracking-wide" style={{ color: COLORS.energyDark }}>Energía solar</p>
                    <h4 className="mt-2 text-2xl font-bold text-gray-900">Alkosto Avenida 68</h4>
                    <p className="mt-4 text-gray-600 leading-relaxed">
                      Generación por hora, día, mes y año; energía inyectada a la red,
                      curvas de inversores, tensiones, corrientes, potencias y análisis
                      de datos para apoyar el mantenimiento.
                    </p>
                    <a href="#alkosto" className="inline-flex items-center gap-2 mt-5 font-semibold" style={{ color: COLORS.energyDark }}>
                      Ver proyecto Alkosto <ArrowRight size={18} />
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* CAPACIDADES */}

        <section className="py-20">

          <div className="max-w-7xl mx-auto px-6">

            <SectionTitle

              eyebrow="Tecnología aplicada"

              title="Capacidades de monitoreo y análisis"

              description="Una arquitectura flexible para adquirir datos en campo, supervisar equipos y evaluar el desempeño energético de cada instalación."

            />



            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {capacidades.map((item) => (

                <FeatureCard

                  key={item.title}

                  icon={item.icon}

                  title={item.title}

                  description={item.description}

                />

              ))}

            </div>

          </div>

        </section>



        {/* ARQUITECTURA */}

        <section className="bg-white py-20">

          <div className="max-w-7xl mx-auto px-6">

            <SectionTitle

              eyebrow="Arquitectura IoT"

              title="Del equipo industrial al indicador energético"

              description="SAMEE100 y SAMEE200 integran instrumentación, procesamiento local y comunicación con sistemas de supervisión."

            />



            <div className="grid md:grid-cols-4 gap-5">

              {[

                {

                  icon: Gauge,

                  title: "1. Medición",

                  text: "Medidores eléctricos y sensores ambientales."

                },

                {

                  icon: Cpu,

                  title: "2. Gateway",

                  text: "Adquisición y procesamiento de datos con SAMEE100/200."

                },

                {

                  icon: Monitor,

                  title: "3. Dashboard",

                  text: "Visualización local de variables, curvas e indicadores."

                },

                {

                  icon: Cloud,

                  title: "4. Plataforma web",

                  text: "Supervisión remota, históricos y análisis energético."

                }

              ].map((step) => {

                const Icon = step.icon;



                return (

                  <div

                    key={step.title}

                    className="rounded-2xl bg-gray-50 border border-gray-200 p-6"

                  >

                    <Icon size={30} color={COLORS.energyIcon} />



                    <h3 className="mt-4 font-bold text-lg">

                      {step.title}

                    </h3>



                    <p className="mt-2 text-gray-600 text-sm leading-relaxed">

                      {step.text}

                    </p>

                  </div>

                );

              })}

            </div>



            <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-6">

              <div className="flex items-start gap-3">

                <Radio

                  className="shrink-0"

                  color={COLORS.energyIcon}

                />



                <p className="text-gray-700 leading-relaxed">

                  <strong>Operación local y conectividad:</strong>{" "}

                  el dashboard instalado en sitio permite

                  consultar información desde la red del cliente.

                  Los datos también pueden integrarse con una

                  plataforma web para supervisión remota

                  y análisis centralizado.

                </p>

              </div>

            </div>

          </div>

        </section>



        {/* PROYECTOS */}

        <section

          id="proyectos"

          className="py-20 scroll-mt-24"

        >

          <div className="max-w-7xl mx-auto px-6">

            <SectionTitle

              eyebrow="Experiencia aplicada"

              title="Proyectos de monitoreo energético"

              description="Aplicaciones de tecnología IoT en procesos industriales y sistemas de generación solar."

            />



            {/* CASO LPS */}

            <article id="lps" className="overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm mb-12 scroll-mt-28">

              <div className="grid lg:grid-cols-2">

                <div className="relative min-h-[300px] lg:min-h-[440px]">

                  <img

                    src={lpsImg}

                    alt="Proyecto de monitoreo energético en la planta de plásticos LPS"

                    className="absolute inset-0 w-full h-full object-cover"

                    loading="lazy"

                  />

                </div>



                <div className="p-8 md:p-12">

                  <p

                    className="text-sm font-bold uppercase tracking-widest"

                    style={{ color: COLORS.energyDark }}

                  >

                    Caso industrial

                  </p>



                  <h3 className="mt-4 text-3xl font-extrabold text-gray-900">

                    Laboratorios Industriales LPS

                  </h3>



                  <p className="mt-2 text-lg font-semibold text-gray-600">

                    Planta de producción de plásticos

                  </p>



                  <p className="mt-6 text-gray-700 leading-relaxed">

                    Sistema IoT de monitoreo energético y ambiental

                    aplicado a una línea de fabricación de envases

                    plásticos mediante el proceso de inyecto-soplado.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    La planta integra una inyecto-sopladora AOKI,

                    compresores de alta y baja presión,

                    deshumidificador y equipos auxiliares.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    La instrumentación permite supervisar el

                    consumo total de la línea de producción

                    y medir de manera independiente el compresor

                    de alta presión, uno de los equipos de

                    mayor consumo y criticidad operativa.

                  </p>

                </div>

              </div>



              <div className="p-8 md:p-12 border-t border-gray-200">

                <h4 className="text-2xl font-bold text-gray-900">

                  Instrumentación instalada en LPS

                </h4>



                <div className="grid md:grid-cols-3 gap-6 mt-8">

                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">

                    <Gauge color={COLORS.energyIcon} size={30} />



                    <h5 className="mt-4 text-lg font-bold">

                      Medidor eléctrico 1

                    </h5>



                    <p className="mt-3 text-gray-600 leading-relaxed">

                      Medición del consumo eléctrico total de

                      la línea de producción de plásticos,

                      proporcionando una visión global de

                      su comportamiento energético.

                    </p>

                  </div>



                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">

                    <Zap color={COLORS.energyIcon} size={30} />



                    <h5 className="mt-4 text-lg font-bold">

                      Medidor eléctrico 2

                    </h5>



                    <p className="mt-3 text-gray-600 leading-relaxed">

                      Medición dedicada al compresor de alta

                      presión para evaluar sus ciclos de operación,

                      demanda y participación en el consumo

                      energético de la línea.

                    </p>

                  </div>



                  <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">

                    <Thermometer color={COLORS.energyIcon} size={30} />



                    <h5 className="mt-4 text-lg font-bold">

                      Monitoreo ambiental

                    </h5>



                    <p className="mt-3 text-gray-600 leading-relaxed">

                      Seguimiento de temperatura, humedad relativa

                      y condiciones de confort ambiental

                      en la zona de producción.

                    </p>

                  </div>

                </div>



                {/* EVIDENCIA FOTOGRAFICA LPS */}
                <section className="mt-12" aria-labelledby="lps-instalacion-titulo">
                  <div className="mb-5">
                    <p className="text-sm font-semibold uppercase tracking-wide" style={{ color: "#6BA425" }}>
                      Implementación real en planta
                    </p>
                    <h4 id="lps-instalacion-titulo" className="mt-2 text-2xl font-bold text-gray-900">
                      Instalación del sistema SAMEE200 en LPS
                    </h4>
                    <p className="mt-3 max-w-4xl text-gray-600 leading-relaxed">
                      Registro fotográfico del gabinete de adquisición, conexiones de medición y
                      componentes integrados en la planta. El sistema supervisa el consumo total
                      de la línea de plásticos y, mediante un segundo medidor, el compresor de alta presión.
                    </p>
                  </div>
                  <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <img
                      src={lpsInstalacion}
                      alt="Collage técnico de la instalación real SAMEE200 en LPS: gabinete, conexiones, medidores y tablero eléctrico"
                      className="block h-auto w-full"
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className="px-5 py-4 text-sm text-gray-600">
                      Evidencia de instalación del sistema IoT SAMEE200 en Laboratorios Industriales LPS.
                    </figcaption>
                  </figure>
                </section>

                {/* DASHBOARDS LPS */}

                <div className="mt-12">

                  <h4 className="text-2xl font-bold text-gray-900">

                    Dashboards, línea base energética y alarmas

                  </h4>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    El sistema permite visualizar las variables

                    eléctricas y ambientales en dashboards locales

                    y web. Además, dispone de un dashboard

                    especializado para comparar el consumo real

                    frente a la línea base energética.

                  </p>



                  <div className="grid md:grid-cols-3 gap-6 mt-8">

                    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">

                      <Monitor size={30} color={COLORS.energyIcon} />



                      <h5 className="mt-4 text-lg font-bold">

                        Dashboard local y web

                      </h5>



                      <p className="mt-3 text-gray-600 leading-relaxed">

                        Consulta de consumo eléctrico total,

                        variables del compresor de alta presión,

                        temperatura, humedad, tendencias

                        e históricos desde la red local

                        o mediante la plataforma web.

                      </p>

                    </div>



                    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">

                      <BarChart3 size={30} color={COLORS.energyIcon} />



                      <h5 className="mt-4 text-lg font-bold">

                        Dashboard de línea base

                      </h5>



                      <p className="mt-3 text-gray-600 leading-relaxed">

                        Comparación entre el consumo energético

                        real y el consumo de referencia.

                        Permite identificar desfases,

                        evaluar tendencias y realizar

                        seguimiento del desempeño energético.

                      </p>

                    </div>



                    <div className="rounded-2xl bg-gray-50 border border-gray-200 p-6">

                      <Bell size={30} color={COLORS.energyIcon} />



                      <h5 className="mt-4 text-lg font-bold">

                        Alarmas por desviaciones

                      </h5>



                      <p className="mt-3 text-gray-600 leading-relaxed">

                        Generación de alertas cuando se presentan

                        desviaciones relevantes respecto a la

                        línea base, facilitando la revisión

                        de consumos anormales y la evaluación

                        de acciones correctivas.

                      </p>

                    </div>

                  </div>



                  <div

                    className="mt-8 rounded-2xl p-7"

                    style={{ backgroundColor: "#A6CE391A" }}

                  >

                    <h5 className="text-xl font-bold text-gray-900">

                      Seguimiento del desempeño energético

                    </h5>



                    <p className="mt-4 text-gray-700 leading-relaxed">

                      La comparación continua entre consumo real

                      y línea base permite detectar desviaciones

                      y evaluar posibles oportunidades de mejora.

                      Las alertas ayudan a priorizar revisiones,

                      considerando las condiciones de producción

                      y operación antes de confirmar una anomalía.

                    </p>



                    <p className="mt-4 text-gray-700 leading-relaxed">

                      Esta metodología apoya el desarrollo de

                      indicadores EnPI, el seguimiento de acciones

                      correctivas y la mejora continua

                      alineada con ISO 50001.

                    </p>

                  </div>

                </div>



                {/* EQUIPOS DEL PROCESO */}

                <h4 className="mt-12 text-2xl font-bold text-gray-900">

                  Equipos que conforman el proceso

                </h4>



                <p className="mt-3 text-gray-600">

                  La línea incluye los siguientes equipos.

                  La medición eléctrica se realiza mediante

                  un medidor totalizador y otro dedicado

                  al compresor de alta presión.

                </p>



                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">

                  {equiposLps.map((equipo) => (

                    <div

                      key={equipo}

                      className="flex items-center gap-3 rounded-xl bg-gray-50 border border-gray-200 p-4"

                    >

                      <CheckCircle2

                        size={21}

                        color={COLORS.energyIcon}

                        className="shrink-0"

                      />



                      <span className="font-medium text-gray-800">

                        {equipo}

                      </span>

                    </div>

                  ))}

                </div>



                {/* DIAGNOSTICO COMPRESOR */}

                <div

                  className="mt-10 rounded-2xl p-7"

                  style={{ backgroundColor: "#A6CE391A" }}

                >

                  <h4 className="text-xl font-bold text-gray-900">

                    Diagnóstico del compresor de alta presión

                  </h4>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    Durante el seguimiento energético se

                    identificaron variaciones en los ciclos

                    de carga del compresor de alta presión

                    asociadas a pérdidas en el sistema

                    de aire comprimido.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    Después de una intervención de mantenimiento

                    se observaron ciclos de funcionamiento

                    más constantes, facilitando el análisis

                    del comportamiento energético del equipo.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    Los datos eléctricos pueden relacionarse

                    con registros de producción, paradas

                    operativas y condiciones ambientales

                    para analizar indicadores de desempeño

                    e identificar oportunidades de mejora.

                  </p>

                </div>

              </div>

            </article>



            {/* CASO ALKOSTO */}

            <article id="alkosto" className="overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm scroll-mt-28">

              <div className="grid lg:grid-cols-2">

                <div className="relative min-h-[300px] lg:min-h-[440px]">

                  <img

                    src={solarImg}

                    alt="Imagen ilustrativa de paneles solares para el proyecto de Alkosto Avenida 68"

                    className="absolute inset-0 w-full h-full object-cover"

                    loading="lazy"

                  />

                </div>



                <div className="p-8 md:p-12">

                  <p

                    className="text-sm font-bold uppercase tracking-widest"

                    style={{ color: COLORS.energyDark }}

                  >

                    Caso de energía solar fotovoltaica

                  </p>



                  <h3 className="mt-4 text-3xl font-extrabold text-gray-900">

                    Alkosto Avenida 68 — Monitoreo de generación solar

                  </h3>



                  <p className="mt-6 text-gray-700 leading-relaxed">

                    PYP Tecnología Electrónica SAS implementó una solución IoT

                    de monitoreo energético en Alkosto Avenida 68, Bogotá.

                    Los paneles solares fotovoltaicos están instalados en la cubierta

                    del edificio y el gateway SAMEE200 se encuentra en el sótano,

                    donde adquiere y procesa los datos de supervisión energética.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    El dashboard permite consultar la energía

                    generada por hora, día, mes y año,

                    visualizar curvas de producción

                    y realizar seguimiento de la energía

                    inyectada a la red eléctrica.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    También permite graficar tensiones,

                    corrientes, potencias y otras variables

                    necesarias para analizar el desempeño

                    y administrar la instalación fotovoltaica.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    La información está disponible en un

                    dashboard local accesible desde la red

                    del cliente y puede integrarse con una

                    plataforma web para consulta remota.

                  </p>

                </div>

              </div>



              {/* UBICACIÓN REAL DEL PROYECTO ALKOSTO */}
              <div className="px-8 pb-8 md:px-12 md:pb-12">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <Sun className="mb-3" size={26} style={{ color: COLORS.energyDark }} />
                    <h4 className="font-bold text-gray-900">Cubierta del edificio</h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">Paneles solares fotovoltaicos instalados en Alkosto Avenida 68.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <Cpu className="mb-3" size={26} style={{ color: COLORS.energyDark }} />
                    <h4 className="font-bold text-gray-900">Sótano · SAMEE200</h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">Gateway IoT instalado en el sótano para adquirir y procesar variables energéticas.</p>
                  </div>
                  <div className="rounded-2xl border border-gray-200 bg-gray-50 p-5">
                    <BarChart3 className="mb-3" size={26} style={{ color: COLORS.energyDark }} />
                    <h4 className="font-bold text-gray-900">Dashboards y Excel</h4>
                    <p className="mt-2 text-sm leading-relaxed text-gray-600">Curvas, históricos, energía generada e inyectada a la red y exportación de reportes a Excel.</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">La fotografía de paneles es ilustrativa; las capturas de los dashboards corresponden al sistema de monitoreo.</p>
              </div>

              {/* INDICADORES ALKOSTO */}

              <div className="p-8 md:p-12 border-t border-gray-200">

                <h4 className="text-2xl font-bold text-gray-900">

                  Variables e indicadores de generación fotovoltaica

                </h4>



                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

                  {indicadoresAlkosto.map((item) => {

                    const Icon = item.icon;



                    return (

                      <div

                        key={item.title}

                        className="rounded-2xl bg-gray-50 border border-gray-200 p-6"

                      >

                        <Icon

                          size={28}

                          color={COLORS.energyIcon}

                        />



                        <h5 className="mt-4 text-lg font-bold">

                          {item.title}

                        </h5>



                        <p className="mt-3 text-gray-600 leading-relaxed">

                          {item.description}

                        </p>

                      </div>

                    );

                  })}

                </div>



                {/* MANTENIMIENTO SOLAR */}

                <div

                  className="mt-10 rounded-2xl p-7"

                  style={{ backgroundColor: "#A6CE391A" }}

                >

                  <h4 className="text-xl font-bold text-gray-900">

                    Diagnóstico y mantenimiento de sistemas solares

                  </h4>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    El análisis de las curvas de generación

                    y de las variables eléctricas permite

                    identificar cambios de comportamiento,

                    reducciones de producción y desviaciones

                    que requieren evaluación.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    Esta información facilita la administración

                    del sistema y sirve como apoyo para

                    programar inspecciones, investigar

                    anomalías y evaluar intervenciones

                    de mantenimiento.

                  </p>



                  <p className="mt-4 text-gray-700 leading-relaxed">

                    También es posible desarrollar análisis

                    predictivos y pronósticos de generación,

                    dependiendo de los datos disponibles

                    y de los objetivos del proyecto.

                  </p>

                </div>



                <div className="grid md:grid-cols-3 gap-6 mt-8">

                  <div className="flex items-start gap-3">

                    <Sun

                      color={COLORS.energyIcon}

                      className="shrink-0"

                    />



                    <div>

                      <h5 className="font-bold">

                        Generación solar

                      </h5>



                      <p className="mt-2 text-sm text-gray-600">

                        Producción energética por hora,

                        día, mes y año.

                      </p>

                    </div>

                  </div>



                  <div className="flex items-start gap-3">

                    <Monitor

                      color={COLORS.energyIcon}

                      className="shrink-0"

                    />



                    <div>

                      <h5 className="font-bold">

                        Dashboard local

                      </h5>



                      <p className="mt-2 text-sm text-gray-600">

                        Visualización desde la red interna

                        del cliente.

                      </p>

                    </div>

                  </div>



                  <div className="flex items-start gap-3">

                    <Cloud

                      color={COLORS.energyIcon}

                      className="shrink-0"

                    />



                    <div>

                      <h5 className="font-bold">

                        Integración web

                      </h5>



                      <p className="mt-2 text-sm text-gray-600">

                        Consulta remota e históricos

                        mediante plataforma web.

                      </p>

                    </div>

                  </div>

                </div>

              </div>


              {/* EVIDENCIA REAL DE SOFTWARE EN ALKOSTO */}
              <div className="border-t border-gray-200 p-8 md:p-12">
                <h4 className="text-2xl font-bold text-gray-900">Dashboards reales de Alkosto</h4>
                <p className="mt-3 text-gray-600 leading-relaxed max-w-4xl">
                  Capturas del software de supervisión SAMEE100: resumen energético,
                  estado del gateway y curvas históricas de corrientes eléctricas.
                  La plataforma permite consultar los datos por periodo y exportar
                  reportes a Excel para análisis, trazabilidad y seguimiento.
                </p>
                <div className="mt-7 grid lg:grid-cols-2 gap-6 items-start">
                  <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                    <a href={alkostoResumen} target="_blank" rel="noopener noreferrer" title="Abrir captura del dashboard energético">
                      <img src={alkostoResumen} alt="Captura real del dashboard SAMEE100 Alkosto con resumen energético y estado del gateway" className="w-full h-auto" loading="lazy" />
                    </a>
                    <figcaption className="p-4 text-sm text-gray-700">
                      <strong>Resumen energético y diagnóstico del gateway.</strong> Potencia,
                      generación, consumo, indicadores estimados y estado de adquisición.
                    </figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
                    <a href={alkostoCorrientes} target="_blank" rel="noopener noreferrer" title="Abrir captura de curvas eléctricas">
                      <img src={alkostoCorrientes} alt="Captura real de Alkosto con gráfica histórica de corriente trifásica y controles de vistas" className="w-full h-auto" loading="lazy" />
                    </a>
                    <figcaption className="p-4 text-sm text-gray-700">
                      <strong>Históricos de variables eléctricas.</strong> Selección de
                      potencia activa, generación diaria, voltajes L-N y corrientes.
                    </figcaption>
                  </figure>
                </div>
                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    "Reportes exportables a Excel",
                    "Selección de periodo",
                    "Curvas y tendencias",
                    "Estado del gateway"
                  ].map((item) => (
                    <span key={item} className="inline-flex items-center gap-2 rounded-full bg-[#A6CE391A] px-4 py-2 text-sm font-semibold text-gray-800">
                      <CheckCircle2 size={17} color={COLORS.energyIcon} />{item}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Capturas de operación proporcionadas por PYP. Los valores mostrados
                  corresponden al momento de cada consulta y no representan resultados garantizados.
                </p>
              </div>
            </article>

          </div>

        </section>



        {/* INTEGRACION CAN / J1939 */}
        <section id="can-j1939" className="bg-gray-50 py-20 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6">
            <SectionTitle
              eyebrow="Integración industrial"
              title="Supervisión de grupos electrógenos mediante CAN/J1939"
              description="Adquisición pasiva de datos del bus CAN para visualizar variables de operación, registrar históricos y apoyar el diagnóstico de grupos electrógenos."
            />
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              <figure className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <a href={canJ1939Dashboard} target="_blank" rel="noopener noreferrer" title="Abrir captura del dashboard CAN/J1939">
                  <img src={canJ1939Dashboard} alt="Captura real del dashboard CAN J1939 de grupo electrógeno con RPM, horas, temperatura y voltaje" className="w-full h-auto" loading="lazy" />
                </a>
                <figcaption className="px-5 py-4 text-sm text-gray-600">Dashboard de recepción pasiva CAN/J1939 desarrollado para supervisión industrial.</figcaption>
              </figure>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Variables de operación en tiempo real</h3>
                <p className="mt-4 text-gray-700 leading-relaxed">
                  La integración CAN/J1939 permite interpretar tramas del controlador
                  y mostrar señales disponibles, como velocidad del motor (RPM),
                  horas acumuladas, temperatura del refrigerante y voltaje de batería.
                  La disponibilidad y validación de cada señal dependen del equipo.
                </p>
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  {[
                    ["RPM", "Velocidad del motor"],
                    ["Horas", "Horas de funcionamiento"],
                    ["Temperatura", "Refrigerante del motor"],
                    ["Voltaje", "Sistema de batería"]
                  ].map(([name, detail]) => (
                    <div key={name} className="rounded-xl border border-gray-200 bg-white p-4">
                      <p className="font-bold text-gray-900">{name}</p>
                      <p className="mt-1 text-sm text-gray-600">{detail}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-6 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 leading-relaxed">
                  <strong>Alcance de la demostración:</strong> el dashboard mostrado
                  recibe datos CAN de forma pasiva; no transmite comandos ni realiza
                  control remoto del grupo electrógeno. Las funciones de control,
                  cuando se requieran, necesitan desarrollo, validación y mecanismos
                  específicos de seguridad.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INDICADORES E ISO 50001 */}

        <section className="bg-white py-20">

          <div className="max-w-7xl mx-auto px-6">

            <SectionTitle

              eyebrow="Gestión energética"

              title="Del monitoreo a la mejora continua"

              description="Los datos históricos y los indicadores permiten evaluar el desempeño energético y apoyar la toma de decisiones."

            />



            <div className="grid md:grid-cols-2 gap-6">

              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8">

                <BarChart3

                  size={32}

                  color={COLORS.energyIcon}

                />



                <h3 className="mt-5 text-xl font-bold">

                  Líneas base e indicadores EnPI

                </h3>



                <p className="mt-4 text-gray-600 leading-relaxed">

                  Evaluación de consumos, tendencias,

                  líneas base y desviaciones energéticas.

                  Los indicadores permiten dar seguimiento

                  al desempeño y apoyar iniciativas

                  alineadas con ISO 50001.

                </p>

              </div>



              <div className="rounded-2xl bg-gray-50 border border-gray-200 p-8">

                <Activity

                  size={32}

                  color={COLORS.energyIcon}

                />



                <h3 className="mt-5 text-xl font-bold">

                  Diagnóstico, alarmas y pronósticos

                </h3>



                <p className="mt-4 text-gray-600 leading-relaxed">

                  Identificación de desviaciones y patrones

                  anómalos para apoyar acciones correctivas

                  y mantenimiento. Según la disponibilidad

                  y calidad de los datos, pueden desarrollarse

                  modelos predictivos.

                </p>

              </div>

            </div>

          </div>

        </section>



        {/* CONTACTO */}

        <section

          id="contacto"

          className="py-20 scroll-mt-24"

        >

          <div className="max-w-7xl mx-auto px-6">

            <div className="rounded-3xl bg-white border border-gray-200 p-8 md:p-12">

              <div className="flex items-start gap-4">

                <Factory

                  size={34}

                  color={COLORS.energyIcon}

                  className="shrink-0"

                />



                <div>

                  <h2 className="text-3xl font-extrabold text-gray-900">

                    ¿Necesitas monitorear tu instalación?

                  </h2>



                  <p className="mt-4 text-lg text-gray-600 max-w-3xl leading-relaxed">

                    Evaluamos tus equipos, variables eléctricas,

                    sensores, comunicaciones e indicadores

                    para diseñar una solución adaptada

                    a tus necesidades de operación,

                    mantenimiento y eficiencia energética.

                  </p>

                </div>

              </div>



              <div className="mt-9 flex flex-wrap gap-4">

                <a

                  href="mailto:jaime.pedraza@pyptecnologia.com?subject=Evaluaci%C3%B3n%20de%20monitoreo%20energ%C3%A9tico"

                  className="inline-flex items-center gap-3 rounded-xl px-6 py-3 font-semibold bg-[#A6CE39] text-[#1E1E1E] hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13] transition-colors duration-200"

                >

                  <Mail size={20} />

                  Solicitar evaluación

                </a>



                <a

                  href="tel:+573204929150"

                  className="inline-flex items-center gap-3 rounded-xl border border-gray-300 px-6 py-3 font-semibold text-gray-800"

                >

                  <Phone size={20} />

                  +57 320 492 9150

                </a>

              </div>



              <p className="mt-6 text-gray-600">

                jaime.pedraza@pyptecnologia.com

              </p>

            </div>

          </div>

        </section>

      </main>



      {/* PIE DE PAGINA */}

      <footer className="border-t border-gray-200 py-8 text-center text-gray-500 text-sm px-6">

        © {year} PYP Tecnología Electrónica SAS —

        IoT Industrial · Monitoreo Energético · Automatización

      </footer>

    </div>

  );

}
