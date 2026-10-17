
import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("dist");
const origen = path.join(dist, "index.html");
const destino = path.join(dist, "monitoreo-energetico", "index.html");

if (!fs.existsSync(origen)) {
  throw new Error("No existe dist/index.html. Ejecuta vite build primero.");
}

let html = fs.readFileSync(origen, "utf8");

const reemplazar = (buscar, nuevo) => {
  if (!html.includes(buscar)) {
    throw new Error(`No se encontró en index.html: ${buscar}`);
  }
  html = html.replace(buscar, nuevo);
};

reemplazar(
  "<title>IoT Industrial y Monitoreo Energético en Colombia | PYP Tecnología</title>",
  "<title>Monitoreo Energético Industrial y Solar | PYP Tecnología</title>"
);

reemplazar(
  "Soluciones IoT industriales, monitoreo energético, automatización, OEE y telemetría LoRaWAN. Hardware, gateways Edge y software desarrollado en Colombia.",
  "Soluciones IoT SAMEE100 y SAMEE200 para monitoreo energético industrial y solar. Medición eléctrica, dashboards, alarmas e indicadores ISO 50001."
);

reemplazar(
  'href="https://pyptecnologia.com/"',
  'href="https://pyptecnologia.com/monitoreo-energetico"'
);

reemplazar(
  'content="IoT Industrial y Monitoreo Energético | PYP Tecnología"',
  'content="Monitoreo Energético Industrial y Solar | PYP Tecnología"'
);

reemplazar(
  'content="Ingeniería IoT industrial, eficiencia energética, producción OEE, telemetría de agua, LoRaWAN y automatización."',
  'content="Monitoreo energético industrial y solar con SAMEE100 y SAMEE200. Proyectos LPS y Alkosto, dashboards, indicadores y gestión energética."'
);

reemplazar(
  'content="https://pyptecnologia.com/"',
  'content="https://pyptecnologia.com/monitoreo-energetico"'
);

fs.mkdirSync(path.dirname(destino), { recursive: true });
fs.writeFileSync(destino, html, "utf8");

console.log("SEO generado: dist/monitoreo-energetico/index.html");
