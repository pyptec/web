import React from "react";
import infografia from "../assets/proyectos/clg/clg-infografia.png";
import { ArrowRight, Clock, Volume2, Network, Cpu, Cable, CheckCircle2 } from "lucide-react";
import Navbar from "../components/Navbar.jsx";
import SectionNav from "../components/SectionNav.jsx";
import { CLG_HERO, CLG_PHOTOS, CLG_FAQS, CLG_MODALITIES } from "../data/clg.js";

const primary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#A6CE39] px-6 py-3 font-bold text-[#1E1E1E] transition-colors hover:bg-[#416D13] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416D13]";
const secondary = "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-[#1E1E1E] hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#416D13]";
const links = [
  { href: "#publicidad-clg", label: "Publicidad" },
  { href: "#horarios-clg", label: "Horarios" },
  { href: "#caso-clg", label: "Caso de éxito" },
  { href: "#protocolos-clg", label: "Protocolos" },
  { href: "#funcionamiento-clg", label: "Funcionamiento" },
  { href: "#edge-clg", label: "Edge" },
  { href: "#eventos-clg", label: "Eventos" },
  { href: "#comunicaciones-clg", label: "Red" },
  { href: "#hat-pyp", label: "Hardware" },
  { href: "#modalidades-clg", label: "Modalidades" },
  { href: "#imagenes-clg", label: "Imágenes" },
  { href: "#preguntas-clg", label: "Preguntas" },
  { href: "#contacto-clg", label: "Contacto" },
];

function Heading({ eyebrow, title, children }) {
  return <div className="mb-9 max-w-3xl">
    <p className="mb-3 border-l-4 border-[#A6CE39] pl-3 text-sm font-bold uppercase tracking-[0.14em] text-[#416D13]">{eyebrow}</p>
    <h2 className="text-3xl font-extrabold tracking-tight text-[#1E1E1E] md:text-4xl">{title}</h2>
    {children && <p className="mt-4 text-lg leading-relaxed text-gray-700">{children}</p>}
  </div>;
}

function Photo({ photo, className = "" }) {
  return <figure className={"min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white " + className}>
    <a href={photo.src} target="_blank" rel="noopener noreferrer" className="block rounded-t-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]" aria-label={"Ampliar imagen: " + photo.alt + " (abre en una pestaña nueva)"}>
      <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" className="h-auto max-h-[34rem] w-full object-contain" />
    </a>
    <figcaption className="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">{photo.caption}</figcaption>
  </figure>;
}

export default function CLG() {
  return <div className="min-h-screen bg-[#F5F5F5] text-[#1E1E1E]">
    <Navbar><SectionNav links={links} /></Navbar>
    <main id="contenido-principal">
      <section id="clg-presentacion" className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 md:pb-20">
          <nav aria-label="Ruta de navegación" className="mb-10 flex flex-wrap items-center gap-2 text-sm text-gray-600">
            <a href="/" className="rounded px-1 py-2 underline-offset-4 hover:underline">Inicio</a><span aria-hidden="true">/</span>
            <a href="/#proyectos" className="rounded px-1 py-2 underline-offset-4 hover:underline">Proyectos</a><span aria-hidden="true">/</span>
            <span aria-current="page" className="font-semibold text-[#416D13]">CLG</span>
          </nav>
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#416D13]">Producto propio · PYP Tecnología Electrónica SAS</p>
              <h1 className="mt-4 text-4xl font-black leading-[1.04] tracking-tight sm:text-5xl lg:text-6xl">CLG — Audio inteligente y automatización IoT</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">Plataforma de publicidad programable y comunicación audible inteligente que integra señales físicas, protocolos industriales y procesamiento local para activar mensajes y acciones de automatización.</p>
              <div className="mt-8 flex flex-wrap gap-3"><a className={primary} href="/#contacto">Consultar mi proyecto <ArrowRight size={18} aria-hidden="true" /></a><a className={secondary} href="#modalidades-clg">Conocer modalidades</a></div>
              <p className="mt-5 text-sm leading-relaxed text-gray-600">CLG transforma señales y datos en comunicación audible inteligente.</p>
            </div>
            <div className="min-w-0">
              <figure className="overflow-hidden rounded-3xl border border-gray-200 bg-[#F5F5F5]">
                <a href={infografia} target="_blank" rel="noopener noreferrer" className="block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]" aria-label="Abrir infografía comercial de CLG a tamaño completo (abre en una pestaña nueva)">
                    <img src={infografia} alt="Infografía comercial de CLG: equipo, hardware HAT, conexiones y arquitectura de administración y audio" width={1536} height={1024} loading="eager" fetchpriority="high" decoding="async" className="h-auto w-full object-contain" />
                    <span className="block border-t border-gray-200 px-5 py-3 text-center text-sm font-semibold text-[#416D13] underline underline-offset-4">Ver infografía en tamaño completo ↗</span>
                  </a>
              </figure>
              <div className="mt-4 flex items-center gap-4 rounded-2xl bg-[#1E1E1E] px-6 py-5 text-white">
                <span className="text-5xl font-black text-[#A6CE39]">47</span><p className="text-sm leading-relaxed"><strong className="block text-base">unidades instaladas en Colombia</strong>Hardware y desarrollo PYP para equipos distribuidos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="publicidad-clg" className="py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Audio comercial" title="Publicidad y música para establecimientos comerciales">Publicidad sonora para supermercados, almacenes y otros espacios que necesitan comunicar promociones y avisos durante la jornada.</Heading>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            [Volume2, "Música y anuncios", "Combine música ambiental con mensajes publicitarios. CLG pausa la música para reproducir el anuncio y permite configurar los contenidos del establecimiento."],
            [Clock, "Mensajes en su momento", "Organice mensajes de apertura, cierre y promociones con la programación horaria del equipo."],
            [Network, "Contenidos desde una red", "Administre los archivos y la programación desde la red interna, con acceso remoto cuando exista conexión a Internet."],
          ].map(([Icon, title, text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7"><Icon size={28} color="#6BA425" aria-hidden="true" /><h3 className="mt-5 text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}
        </div>
        <p className="mt-6 max-w-4xl leading-relaxed text-gray-700">Un sistema de perifoneo comercial automatizado ayuda a dar continuidad a la comunicación del almacén. El contenido, la frecuencia y los horarios se definen según su operación.</p>
      </div></section>

      <section id="caso-clg" className="bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Experiencia comercial" title="CLG en operación: 47 dispositivos instalados">Experiencia de implementación de CLG en establecimientos comerciales, vinculada al caso de éxito de PYP en Alkosto y Ktronix.</Heading>
        <div className="rounded-3xl bg-[#1E1E1E] p-8 text-white md:p-10"><p className="text-5xl font-black text-[#A6CE39]">47 <span className="text-xl text-white">dispositivos CLG</span></p><p className="mt-5 max-w-3xl leading-relaxed">Producto desarrollado por PYP para audio comercial, publicidad programable, activación de mensajes y administración de contenidos en establecimientos. Esta experiencia conecta la plataforma CLG con la operación de equipos distribuidos.</p><p className="mt-4 max-w-3xl text-sm leading-relaxed text-gray-300">El alcance de las interfaces y protocolos industriales se evalúa por proyecto; no todas las integraciones descritas corresponden a estas 47 unidades.</p><a href="/#caso-clg" className="mt-6 inline-flex min-h-11 items-center font-semibold text-[#A6CE39] underline underline-offset-4">Ver el caso CLG en Inicio →</a></div>
      </div></section>
      <section id="horarios-clg" className="bg-white py-20"><div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
        <div><Heading eyebrow="Programación local" title="Mensajes automáticos programados por horario">Audio inteligente para acompañar la jornada del comercio.</Heading>
          <p className="leading-relaxed text-gray-700">Por ejemplo, configure un mensaje de apertura y otro de cierre con los audios y horarios que necesita. El RTC, o reloj de tiempo real, permite ejecutar la programación configurada sin depender de Internet.</p>
          <p className="mt-4 leading-relaxed text-gray-700">Por ejemplo: himno nacional, bienvenida, publicidad periódica, apertura y cierre, según la programación configurada. El RTC conserva una referencia horaria local sin conectividad; cuando existe conexión y está configurada la sincronización, el reloj puede actualizarse desde la red. Las opciones concretas del calendario se revisan en el dashboard de cada instalación. El equipo requiere alimentación y contenidos configurados. La programación local utiliza la red interna; las modificaciones desde fuera de esa red necesitan conectividad a Internet.</p>
        </div>
        <div className="rounded-3xl border border-gray-200 bg-[#F5F5F5] p-7 md:p-9">
          <p className="text-sm font-bold uppercase tracking-widest text-[#416D13]">Ejemplo de uso</p>
          <ol className="mt-6 space-y-6">{[
            ["Preparar", "Definir los archivos de apertura, cierre y promociones."],
            ["Programar", "Asignar los horarios desde la administración del equipo."],
            ["Comunicar", "Ejecutar los mensajes configurados mediante el RTC local."],
          ].map(([title, text], i) => <li key={title} className="flex gap-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#A6CE39] font-bold">{i + 1}</span><div><h3 className="font-bold">{title}</h3><p className="mt-1 text-gray-700">{text}</p></div></li>)}</ol>
        </div>
      </div></section>

      <section id="eventos-clg" className="py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Audio y automatización" title="Activación de anuncios mediante pulsadores y eventos">El hardware CLG recibe señales y pulsos mediante entradas digitales y dispone de salidas de relé para acciones externas.</Heading>
        <div className="grid gap-4 md:grid-cols-3">{[
          ["01 · Recibir", "Un pulsador o una señal externa puede aportar el evento de entrada."],
          ["02 · Configurar", "PYP define y verifica la relación entre el evento, el mensaje y la acción requerida."],
          ["03 · Actuar", "El alcance puede incluir avisos audibles y acciones mediante relés."],
        ].map(([title, text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-7"><h3 className="text-lg font-bold text-[#416D13]">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>
        <p className="mt-5 text-sm leading-relaxed text-gray-600">Es un flujo de integración propuesto. La lógica concreta de pulsadores, mensajes y relés se configura y prueba por proyecto; no se presupone una regla universal para las 47 unidades.</p>
      </div></section>

      <section id="comunicaciones-clg" className="bg-white py-20"><div className="mx-auto grid max-w-7xl items-start gap-10 px-6 lg:grid-cols-2">
        <div><Heading eyebrow="Gestión de contenidos" title="Administración de campañas desde una red">CLG cuenta con una red propietaria de interconexión y administración de contenidos.</Heading>
          <div className="space-y-5">{[
            ["Red interna", "Programe y administre los contenidos mediante la red local del establecimiento."],
            ["Acceso remoto", "Administre los equipos desde fuera de la sede cuando exista conexión a Internet."],
            ["Varias ubicaciones", "Defina con PYP el alcance de las campañas y la configuración de cada equipo distribuido."],
          ].map(([title, text]) => <div key={title} className="flex gap-3"><CheckCircle2 size={23} className="mt-1 shrink-0 text-[#416D13]" aria-hidden="true" /><div><h3 className="font-bold">{title}</h3><p className="mt-1 leading-relaxed text-gray-700">{text}</p></div></div>)}</div>
        </div><Photo photo={CLG_PHOTOS.dashboard} />
      </div></section>

      <section id="hat-pyp" className="py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Desarrollado por PYP" title="Automatización e integración industrial">Hardware electrónico desarrollado por PYP, entradas y salidas para integrar audio y automatización.</Heading>
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{[
          ["4 entradas digitales acopladas", "Reciben señales físicas, pulsos o estados de dispositivos externos."],
          ["4 salidas de relé", "Ejecutan acciones de control según las condiciones configuradas."],
          ["4 entradas analógicas ADC", "Incorporan señales analógicas para monitoreo y automatización según acondicionamiento y configuración."],
          ["Audio estéreo", "Salida para conexión con sistemas de amplificación."],
          ["Comunicaciones", "Interfaces para integrar equipos externos y redes según el proyecto."],
          ["RTC y procesamiento local", "Referencia horaria local y ejecución de mensajes y acciones en el propio CLG."],
        ].map(([title, text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6"><h3 className="text-xl font-bold text-[#416D13]">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="grid gap-4 sm:grid-cols-2">{[
              [Cpu, "HAT PYP", "Hardware desarrollado por PYP para la integración del equipo."],
              [Cable, "Interfaces", "Entradas digitales, señales y pulsos; interfaces Modbus, CAN y RS-232."],
              [Volume2, "Audio y amplificador", "Conexión al amplificador del establecimiento, revisando la entrada y el cableado disponibles."],
              [Network, "Acciones externas", "Capacidad de activar alarmas audibles y utilizar salidas de relé."],
            ].map(([Icon, title, text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-white p-6"><Icon size={27} color="#6BA425" aria-hidden="true" /><h3 className="mt-4 font-bold">{title}</h3><p className="mt-2 leading-relaxed text-gray-700">{text}</p></article>)}</div>
            <p className="mt-5 text-sm leading-relaxed text-gray-600">La compatibilidad de interfaces, las condiciones eléctricas y las reglas de operación se revisan para cada instalación. No se atribuyen perfiles, velocidades o funciones de supervisión no verificados.</p>
          </div>
          <div className="grid grid-cols-2 gap-4"><Photo photo={CLG_PHOTOS.hat} /><Photo photo={CLG_PHOTOS.conexiones} /></div>
        </div>
      </div></section>

      <section id="protocolos-clg" className="bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Señales y comunicaciones" title="Activación de audio mediante señales y protocolos industriales">CLG puede asociar eventos o condiciones configuradas con mensajes de audio específicos. La interfaz física y el protocolo se seleccionan según el equipo externo y el alcance de integración.</Heading>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{[
          ["Pulsos y entradas digitales", "Interfaz física", "Un pulsador, contacto o cambio de estado aporta una señal para activar el mensaje asignado. La regla se configura y prueba por proyecto."],
          ["Comunicación serie", "Interfaz física", "Puerto serie para equipos externos. La documentación de CLG identifica RS-232; se revisan el hardware, cableado y configuración de la unidad antes de integrar."],
          ["Modbus RTU", "Protocolo · integración por proyecto", "Un registro o estado recibido por comunicación serial puede servir de condición para reproducir audio. Requiere definir y validar la integración."],
          ["CAN", "Bus de comunicación · integración por proyecto", "Un evento de un dispositivo compatible puede activar un aviso. El perfil, los mensajes y la compatibilidad se verifican para cada equipo."],
          ["Ethernet mediante sockets", "Red y comunicación · integración por proyecto", "Una aplicación puede enviar un evento o comando de audio a CLG mediante una conexión de red desarrollada y validada para el proyecto."],
          ["Modbus TCP", "Protocolo · integración por proyecto", "Permite plantear audio activado por datos o estados de sistemas compatibles mediante Ethernet, con configuración y validación de la comunicación."],
          ["MQTT", "Protocolo IoT · posibilidad de integración", "Puede evaluarse para conectar eventos de aplicaciones de monitoreo. Su implementación específica en CLG está pendiente de verificación; no se anuncia como función instalada en las 47 unidades."],
          ["RTC y horarios", "Fuente local de eventos", "El reloj de tiempo real permite ejecutar mensajes en horarios programados. El calendario disponible depende de la configuración de cada instalación."],
        ].map(([title, kind, text]) => <article key={title} className="rounded-2xl border border-gray-200 bg-[#F5F5F5] p-6"><p className="text-sm font-semibold text-[#416D13]">{kind}</p><h3 className="mt-3 text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>
        <p className="mt-6 text-sm leading-relaxed text-gray-600">La presencia de una interfaz no implica que todos los protocolos estén activos. Modbus RTU, CAN, sockets y Modbus TCP son vías de integración cuyo desarrollo, configuración y pruebas se acuerdan por proyecto.</p>
      </div></section>

      <section id="funcionamiento-clg" className="py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="De la señal a la acción" title="Cómo activa CLG un mensaje de audio">CLG transforma señales y datos en comunicación audible inteligente. A partir de eventos físicos, información externa o condiciones programadas, evalúa la regla configurada y ejecuta el mensaje asociado.</Heading>
        <ol aria-label="Flujo funcional de CLG" className="grid gap-5 lg:grid-cols-3">
          <li className="min-w-0 rounded-3xl border border-gray-200 bg-white p-7"><h3 className="text-xl font-bold">1. Entradas y eventos</h3><dl className="mt-5 space-y-4"><div><dt className="font-semibold text-[#416D13]">Interfaces físicas</dt><dd className="mt-1 text-gray-700">Pulsos, 4 entradas digitales, 4 entradas analógicas ADC, puerto serie y Ethernet.</dd></div><div><dt className="font-semibold text-[#416D13]">Comunicaciones según integración</dt><dd className="mt-1 text-gray-700">Modbus RTU, CAN, sockets, Modbus TCP y MQTT según implementación.</dd></div><div><dt className="font-semibold text-[#416D13]">Programación local</dt><dd className="mt-1 text-gray-700">RTC y horarios configurados.</dd></div></dl></li>
          <li className="min-w-0 rounded-3xl bg-[#1E1E1E] p-7 text-white"><h3 className="text-xl font-bold text-[#A6CE39]">2. CLG · procesamiento local</h3><p className="mt-5 leading-relaxed">Recibir señales o datos → interpretar el evento → evaluar condiciones configuradas → identificar el mensaje asociado → ejecutar acciones.</p><p className="mt-5 text-sm text-gray-300">La lógica se define y valida para cada aplicación.</p></li>
          <li className="min-w-0 rounded-3xl border border-gray-200 bg-white p-7"><h3 className="text-xl font-bold">3. Salidas</h3><ul className="mt-5 list-disc space-y-4 pl-5 text-gray-700"><li>Reproducción de audio estéreo.</li><li>Interrupción de música ambiental cuando corresponda.</li><li>Activación de una o varias de las 4 salidas de relé según configuración.</li></ul></li>
        </ol><p className="mt-5 text-sm text-gray-600">Flujo funcional de referencia: cada instalación utiliza únicamente las interfaces, protocolos y reglas acordados.</p>
      </div></section>

      <section id="edge-clg" className="bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Producto desarrollado por PYP" title="Inteligencia local con Edge Computing">CLG procesa eventos directamente en el establecimiento y ejecuta mensajes de audio y acciones de automatización mediante reglas configuradas.</Heading>
        <p className="max-w-4xl text-lg leading-relaxed text-gray-700">Su procesamiento local permite operar las funciones disponibles sin depender permanentemente de Internet: recibir señales, evaluar eventos, ejecutar mensajes y activar relés. La administración local permite ajustar la operación; la administración remota requiere conectividad. El equipo necesita alimentación, contenidos y configuración.</p>
        <div className="mt-7 flex flex-wrap gap-6"><a href="/iot-industrial/" className={secondary}>Integración IoT Industrial →</a><a href="/automatizacion-edge/" className={secondary}>Automatización Edge de PYP →</a></div>
      </div></section>
      <section id="modalidades-clg" className="bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Un producto, distintos alcances" title="Soluciones CLG Media, Alert y Safety IP">Tres modalidades comerciales para ordenar necesidades de publicidad, comunicación y automatización. Cada integración se define según el proyecto.</Heading>
        <div className="grid gap-6 lg:grid-cols-3">{CLG_MODALITIES.map((mode, i) => <article id={mode.id} key={mode.id} className="flex flex-col rounded-3xl border border-gray-200 bg-[#F5F5F5] p-7">
          <span className="text-sm font-bold text-[#416D13]">0{i + 1} / {mode.name}</span><h3 className="mt-4 text-2xl font-extrabold">{mode.title}</h3><p className="mt-4 leading-relaxed text-gray-700">{mode.text}</p><p className="mt-5 border-t border-gray-200 pt-4 text-sm leading-relaxed text-gray-600">{mode.scope}</p>
        </article>)}</div>
      </div></section>

      <section id="imagenes-clg" className="py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Imágenes del proyecto" title="El equipo CLG en detalle">Fotografías del equipo y su hardware. Estas imágenes muestran el producto; no se presentan como un inventario fotográfico de las 47 instalaciones.</Heading>
        <div className="grid items-start gap-6 md:grid-cols-[0.7fr_1.3fr]"><Photo photo={CLG_PHOTOS.frontal} /><Photo photo={CLG_PHOTOS.ethernet} /><Photo photo={{ ...CLG_HERO, caption: "Equipo CLG fotografiado: conexión de audio y puerto serie." }} className="md:col-span-2" /></div>
      </div></section>

      <section id="aplicaciones-clg" className="bg-white py-20"><div className="mx-auto max-w-7xl px-6">
        <Heading eyebrow="Usos comerciales" title="Aplicaciones de CLG">Publicidad programable para almacenes y comunicación operativa adaptada al establecimiento.</Heading>
        <div className="grid gap-5 md:grid-cols-3">{[
          ["Comercio y retail", "Música ambiental con anuncios, promociones, publicidad programable, bienvenida, premios, apertura y cierre. Los mensajes y la activación por pulsadores se configuran según la operación; no se atribuyen todas estas opciones a las instalaciones existentes."],
          ["Automatización industrial", "Ejemplos de integración: avisos por cambios de estado, pulsos y señales digitales, registros Modbus, eventos CAN, comandos Ethernet o condiciones analógicas, con reproducción de audio y accionamiento de relés según desarrollo y configuración."],
          ["Integración IoT", "Recepción de datos externos, procesamiento local y reglas para conectar comunicación audible con aplicaciones de monitoreo y sistemas industriales compatibles. Las integraciones se evalúan y validan por proyecto."],
        ].map(([title, text]) => <article key={title} className="rounded-2xl border border-gray-200 p-7"><h3 className="text-xl font-bold">{title}</h3><p className="mt-3 leading-relaxed text-gray-700">{text}</p></article>)}</div>
      </div></section>

      <section id="preguntas-clg" className="py-20"><div className="mx-auto max-w-5xl px-6">
        <Heading eyebrow="Antes de elegir" title="Preguntas frecuentes">Respuestas para definir el alcance de su sistema de audio comercial.</Heading>
        <dl className="divide-y divide-gray-200 rounded-3xl border border-gray-200 bg-white px-6 md:px-9">{CLG_FAQS.map(faq => <div key={faq.question} className="py-7"><dt><h3 className="text-lg font-bold">{faq.question}</h3></dt><dd className="mt-3 leading-relaxed text-gray-700">{faq.answer}</dd></div>)}</dl>
      </div></section>

      <section id="contacto-clg" className="bg-white py-20"><div className="mx-auto max-w-7xl px-6"><div className="rounded-3xl bg-[#1E1E1E] p-8 text-white md:p-12">
        <p className="text-sm font-bold uppercase tracking-widest text-[#A6CE39]">Definamos su proyecto</p><h2 className="mt-4 max-w-3xl text-3xl font-extrabold md:text-4xl">Conecte sus mensajes con la operación de su establecimiento</h2>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-gray-200">Cuéntenos cuántos equipos necesita, qué contenidos desea programar y qué señales o sistema de sonido quiere integrar.</p>
        <div className="mt-8 flex flex-wrap items-center gap-5"><a href="/#contacto" className={primary}>Solicitar evaluación CLG <ArrowRight size={18} aria-hidden="true" /></a><a href="/#proyectos" className="inline-flex min-h-11 items-center rounded px-2 py-3 font-semibold text-[#A6CE39] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#A6CE39]">Volver a Proyectos</a></div>
        <p className="mt-5 text-sm text-gray-300">En el formulario de contacto puede seleccionar “Control multisede / CLG”.</p>
      </div></div></section>
    </main>
    <footer className="border-t border-gray-200 bg-white px-6 py-8 text-center text-sm text-gray-600">© {new Date().getFullYear()} PYP Tecnología Electrónica SAS · Publicidad · Comunicación · Automatización</footer>
  </div>;
}
