
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.jsx";
import MonitoreoEnergetico from "./pages/MonitoreoEnergetico.jsx";
import Seo from "./components/Seo.jsx";

import "./index.css";

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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
