import { useEffect, useRef, useState } from "react";
import { getConsent, setConsent, subscribeConsent } from "../lib/analytics.js";

export default function AnalyticsConsent() {
  const [choice, setChoice] = useState("unknown");
  const [editing, setEditing] = useState(false);
  const preferences = useRef(null);
  const panelTitle = useRef(null);
  useEffect(() => {
    setChoice(getConsent());
    return subscribeConsent(setChoice);
  }, []);
  useEffect(() => { if (editing) panelTitle.current?.focus(); }, [editing]);
  const choose = value => {
    setConsent(value);
    setEditing(false);
    preferences.current?.focus();
  };
  const open = choice === "unknown" || editing;
  const button = "min-h-11 rounded-lg border border-[#416D13] px-4 py-2 font-semibold text-[#416D13] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]";
  return <>
    <div className="border-t bg-white px-6 py-4 text-center text-sm text-gray-700">
      <button ref={preferences} type="button" className={button} aria-expanded={open} aria-controls="analytics-preferences" onClick={() => setEditing(true)}>Preferencias de analítica</button>
      {choice !== "unknown" && <p className="mt-2" role="status">Analítica {choice === "granted" ? "aceptada" : "rechazada"}.</p>}
    </div>
    {open && <section id="analytics-preferences" aria-labelledby="analytics-consent-title" className="fixed inset-x-3 bottom-3 z-50 max-h-[70vh] overflow-y-auto rounded-2xl border border-gray-300 bg-white p-5 text-gray-900 shadow-xl sm:left-auto sm:right-6 sm:max-w-lg">
      <h2 ref={panelTitle} tabIndex={-1} id="analytics-consent-title" className="text-lg font-bold">Tu privacidad en PYP</h2>
      <p className="mt-3 text-sm leading-relaxed">Con tu permiso usamos Google Analytics para conocer qué páginas y soluciones interesan a nuestros visitantes. Es opcional: puedes navegar y contactarnos aunque lo rechaces.</p>
      <details className="mt-3 text-sm leading-relaxed"><summary className="cursor-pointer py-2 font-semibold">Cómo usamos la analítica</summary>
        <p className="mt-2">PYP Tecnología Electrónica SAS es responsable de esta medición. Si aceptas, Google recibe datos técnicos de conexión y navegación y utiliza cookies con identificadores de navegador. No enviamos el contenido del formulario, nombres, correos ni teléfonos a Analytics. Google puede procesar datos fuera de Colombia.</p>
        <p className="mt-2">Guardamos tu elección en este navegador durante 180 días. Las cookies de analítica se configuran hasta por 13 meses. Puedes retirar el permiso desde “Preferencias de analítica”; se detienen los nuevos eventos y se eliminan las cookies de Analytics accesibles al sitio. Esto no borra los datos ya recibidos por Google.</p>
        <p className="mt-2">Para consultar o solicitar cambios sobre el tratamiento de datos, escribe a <a className="underline" href="mailto:jaime.pedraza@pyptecnologia.com">PYP por correo</a>. <a className="underline" href="https://policies.google.com/privacy?hl=es" target="_blank" rel="noopener noreferrer">Privacidad de Google</a>.</p>
      </details>
      <div className="mt-4 flex flex-wrap gap-3"><button type="button" className={button} onClick={() => choose("denied")}>Rechazar analítica</button><button type="button" className={button} onClick={() => choose("granted")}>Aceptar analítica</button>{choice !== "unknown" && <button type="button" className={button} onClick={() => { setEditing(false); preferences.current?.focus(); }}>Cerrar</button>}</div>
    </section>}
  </>;
}
