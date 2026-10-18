import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import SiteRoutes from "./SiteRoutes.jsx";

export function render(pathname) {
  return renderToString(
    <React.StrictMode><StaticRouter location={pathname}><SiteRoutes /></StaticRouter></React.StrictMode>
  );
}
