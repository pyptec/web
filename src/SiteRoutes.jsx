import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import MonitoreoEnergetico from "./pages/MonitoreoEnergetico.jsx";
import IoTIndustrialLoRaWAN from "./pages/IoTIndustrialLoRaWAN.jsx";
import AutomatizacionEdge from "./pages/AutomatizacionEdge.jsx";
import CLG from "./pages/CLG.jsx";
import Seo from "./components/Seo.jsx";

const pages = [
  { path: "/", Component: App },
  { path: "/monitoreo-energetico", Component: MonitoreoEnergetico },
  { path: "/iot-industrial", Component: IoTIndustrialLoRaWAN },
  { path: "/automatizacion-edge", Component: AutomatizacionEdge },
  { path: "/proyectos/clg", Component: CLG },
];

export default function SiteRoutes() {
  return <Routes>{pages.map(({ path, Component }) =>
    <Route key={path} path={path} element={<><Seo path={path} /><Component /></>} />
  )}</Routes>;
}
