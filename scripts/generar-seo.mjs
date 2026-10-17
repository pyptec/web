import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "node:util";
import { SEO_PAGES, getSeoPage } from "../src/data/seo.js";

const { values } = parseArgs({ options: { outDir: { type: "string" } } });
const outputDir = path.resolve(values.outDir ?? "dist");
const source = path.join(outputDir, "index.html");
if (!fs.existsSync(source)) {
  throw new Error("No existe index.html en la salida. Ejecuta vite build primero.");
}
const template = fs.readFileSync(source, "utf8");
const head = template.match(/<head\b[^>]*>[\s\S]*?<\/head>/i)?.[0];
if (!head) throw new Error("No se encontró el head del HTML compilado.");

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
})[character]);

function replaceOne(html, pattern, replacement, label) {
  if ([...html.matchAll(pattern)].length !== 1) {
    throw new Error("Se esperaba exactamente una etiqueta SEO: " + label);
  }
  return html.replace(pattern, () => replacement);
}

function renderHead(page) {
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
  return replaceOne(rendered, /<link\b(?=[^>]*\brel="canonical")[^>]*>/gi,
    '<link rel="canonical" href="' + escapeHtml(page.canonical) + '" />', "canonical");
}

// Validate all heads first. Only metadata changes; body, forms and bundles stay intact.
const pages = Object.keys(SEO_PAGES).map((route) => ({
  route,
  destination: route === "/" ? source : path.join(outputDir, route.slice(1), "index.html"),
  html: template.replace(head, () => renderHead(getSeoPage(route))),
}));
for (const { route, destination, html } of pages) {
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.writeFileSync(destination, html, "utf8");
  console.log("SEO generado: " + route + " -> " + destination);
}
