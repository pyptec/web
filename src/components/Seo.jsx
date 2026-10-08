
import { useEffect } from "react";

const SITE_URL = "https://pyptecnologia.com";

const SEO_PAGES = {
  "/": {
    title: "IoT Industrial y Monitoreo Energético en Colombia | PYP Tecnología",
    description:
      "Soluciones IoT industriales, monitoreo energético, automatización, OEE y telemetría LoRaWAN. Hardware, gateways Edge y software desarrollado en Colombia.",
  },
  "/iot-industrial": {
    title: "IoT Industrial y LoRaWAN en Colombia | PYP Tecnología",
    description:
      "Soluciones IoT industrial y LoRaWAN: gateways Edge, sensores, Modbus, MQTT, telemetría, almacenamiento local e integración con AWS IoT y plataformas empresariales.",
  },
  "/monitoreo-energetico": {
    title: "Monitoreo Energético Industrial y Solar | PYP Tecnología",
    description:
      "Soluciones IoT SAMEE100 y SAMEE200 para monitoreo energético industrial y solar. Medición eléctrica, dashboards, alarmas e indicadores ISO 50001.",
  },
};

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function Seo({ path }) {
  useEffect(() => {
    const page = SEO_PAGES[path] || SEO_PAGES["/"];
    const canonical = SITE_URL + (path === "/" ? "/" : path);

    document.title = page.title;

    setMeta("name", "description", page.description);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonical);

    let link = document.head.querySelector('link[rel="canonical"]');

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    link.setAttribute("href", canonical);
  }, [path]);

  return null;
}
