import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { createServer } from "vite";
import { SEO_PAGES, getSeoPage } from "../src/data/seo.js";
import { getPageStructuredData } from "../src/data/structuredData.js";

const { values } = parseArgs({ options: { outDir: { type: "string" } } });
const outputDir = path.resolve(values.outDir ?? "dist");
const source = path.join(outputDir, "index.html");
if (!fs.existsSync(source)) {
  throw new Error("No existe index.html en la salida. Ejecuta vite build primero.");
}
const template = fs.readFileSync(source, "utf8");
const head = template.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0];
if (!head) throw new Error("No se encontró el head del HTML compilado.");
const manifest = JSON.parse(fs.readFileSync(path.join(outputDir, ".vite/manifest.json"), "utf8"));

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);

function replaceOne(html, pattern, replacement, label) {
  if ([...html.matchAll(pattern)].length !== 1) {
    throw new Error("Se esperaba exactamente una etiqueta SEO: " + label);
  }
  return html.replace(pattern, () => replacement);
}

function renderHead(route) {
  const page = getSeoPage(route);
  let rendered = replaceOne(head, /<title\b[^>]*>[\s\S]*?<\/title>/gi,
    "<title>" + escapeHtml(page.title) + "</title>", "title");
  const meta = (attribute, key, content) => {
    const pattern = new RegExp('<meta\\b(?=[^>]*\\b' + attribute + '="' + key + '")[^>]*>', "gi");
    rendered = replaceOne(rendered, pattern,
      "<meta " + attribute + '="' + key + '" content="' + escapeHtml(content) + '" />', key);
  };
  meta("name", "description", page.description);
  meta("property", "og:title", page.title);
  meta("property", "og:description", page.description);
  meta("property", "og:url", page.canonical);
  meta("property", "og:image", page.image.url);
  meta("property", "og:image:type", page.image.type);
  meta("property", "og:image:width", page.image.width);
  meta("property", "og:image:height", page.image.height);
  meta("property", "og:image:alt", page.image.alt);
  rendered = replaceOne(rendered, /<link\b(?=[^>]*\brel="canonical")[^>]*>/gi,
    '<link rel="canonical" href="' + escapeHtml(page.canonical) + '" />', "canonical");
  rendered = rendered
    .replace(/<script\b(?=[^>]*\bid="page-structured-data")[^>]*>[\s\S]*?<\/script>\s*/gi, "")
    .replace(/<link\b(?=[^>]*\bdata-pyp-hero)[^>]*>\s*/gi, "");
  const structuredData = getPageStructuredData(route);
  let additions = "";
  if (structuredData) {
    const json = JSON.stringify(structuredData).replace(/</g, "\\u003c");
    additions += '<script id="page-structured-data" type="application/ld+json">' + json + "</script>\n";
    additions += '<link data-pyp-hero rel="preload" as="image" href="' + escapeHtml(new URL(page.image.url).pathname) + '" fetchpriority="high" />\n';
  }
  return rendered.replace("</head>", additions + "</head>");
}

function resolveAssets(html) {
  return html.replace(/\b(src|href)="(\/src\/assets\/[^"]+)"/g, (_match, attribute, url) => {
    const key = decodeURIComponent(url.slice(1)).split("?")[0];
    if (!manifest[key]?.file) throw new Error("Asset SSR sin entrada en manifest: " + key);
    return attribute + '="/' + manifest[key].file + '"';
  });
}

// Use the same React routes and components for initial HTML and browser hydration.
const server = await createServer({
  cacheDir: path.resolve("node_modules/.cache/pyp-prerender"),
  server: { middlewareMode: true, watch: null, hmr: false },
  appType: "custom",
  ssr: {
    noExternal: ["react-router-dom", "react-router"],
    resolve: { conditions: ["module-sync", "module", "node", "development"] },
  },
  optimizeDeps: { noDiscovery: true, include: [] },
  logLevel: "error",
});
let pages;
try {
  const { render } = await server.ssrLoadModule("/src/entry-server.jsx");
  const rootPattern = /<!--pyp-prerender:start-->[\s\S]*?<!--pyp-prerender:end-->|<div id="root"><\/div>/g;
  pages = Object.keys(SEO_PAGES).map((route) => {
    const body = resolveAssets(render(route));
    const root = '<!--pyp-prerender:start--><div id="root" data-prerendered="true">' + body + "</div><!--pyp-prerender:end-->";
    return {
      route,
      destination: route === "/" ? source : path.join(outputDir, route.slice(1), "index.html"),
      html: replaceOne(template.replace(head, () => renderHead(route)), rootPattern, root, "root"),
    };
  });
} finally {
  await server.close();
}

for (const { route, destination, html } of pages) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html, "utf8");
  console.log("SEO y contenido inicial generados: " + route + " -> " + destination);
}

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...Object.keys(SEO_PAGES).map((route) =>
    "  <url><loc>" + escapeHtml(getSeoPage(route).canonical) + "</loc></url>"
  ),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap, "utf8");
console.log("Sitemap generado: " + path.join(outputDir, "sitemap.xml"));
