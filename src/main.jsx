
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import MonitoreoEnergetico from "./pages/MonitoreoEnergetico.jsx";
import IoTIndustrialLoRaWAN from "./pages/IoTIndustrialLoRaWAN.jsx";
import Seo from "./components/Seo.jsx";

import "./index.css";
import AutomatizacionEdge from "./pages/AutomatizacionEdge.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Seo path="/" />
              <App />
            </>
          }
        />

        <Route
          path="/monitoreo-energetico"
          element={
            <>
              <Seo path="/monitoreo-energetico" />
              <MonitoreoEnergetico />
            </>
          }
        />
        <Route
          path="/iot-industrial"
          element={
            <>
              <Seo path="/iot-industrial" />
              <IoTIndustrialLoRaWAN />
            </>
          }

        />
        <Route
          path="/automatizacion-edge"
          element={
            <>
              <Seo path="/automatizacion-edge" />
              <AutomatizacionEdge />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
