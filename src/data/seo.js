import { CLG_HERO, CLG_TITLE, CLG_DESCRIPTION } from "./clg-meta.js";

export const SITE_URL = "https://pyptecnologia.com";

export const SEO_PAGES = {
  "/proyectos/clg": {
    title: CLG_TITLE,
    description: CLG_DESCRIPTION,
    image: { url: SITE_URL + CLG_HERO.src, type: "image/jpeg", width: CLG_HERO.width, height: CLG_HERO.height, alt: CLG_HERO.alt },
  },
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
  "/automatizacion-edge": {
    title: "Automatización Industrial y Edge Computing | PYP Tecnología",
    description:
      "Desarrollo electrónico, gateways industriales, control Edge, Modbus, CAN J1939, supervisión local y automatización de procesos en Colombia.",
  },
};

export const SHARE_IMAGE = {
  url: SITE_URL + "/og-pyp.png",
  type: "image/png",
  width: 1448,
  height: 1086,
  alt: "Logotipo PYP Tecnología Electrónica SAS",
};

export function getSeoPage(pathname) {
  const normalizedPathname = pathname.replace(/\/+$/, "") || "/";
  const route = Object.hasOwn(SEO_PAGES, normalizedPathname) ? normalizedPathname : "/";
  const canonical = SITE_URL + (route === "/" ? "/" : route + "/");
  return { ...SEO_PAGES[route], canonical, image: SEO_PAGES[route].image ?? SHARE_IMAGE };
}
