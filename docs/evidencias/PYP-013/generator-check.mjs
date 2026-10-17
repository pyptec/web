import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import vm from "node:vm";
import { SEO_PAGES, getSeoPage } from "../../../src/data/seo.js";

const base = path.resolve("docs/evidencias/PYP-013");
const output = path.join(base, "build-temporal/comercial/dist");
const generator = path.resolve("scripts/generar-seo.mjs");
const checks = [];
const check = (ok, message) => { if (!ok) throw new Error(message); checks.push(message); };
const hash = (file) => crypto.createHash("sha256").update(fs.readFileSync(file)).digest("hex");
const htmlBefore = fs.readFileSync(path.join(base, "build-temporal/index-before-seo.html"), "utf8");
const body = (html) => html.slice(html.indexOf("<body"));
const jsonld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const snapshots = [];
for (const route of Object.keys(SEO_PAGES)) {
  const file = path.join(output, route === "/" ? "" : route.slice(1), "index.html");
  const html = fs.readFileSync(file,"utf8");
  check(body(html) === body(htmlBefore), "Generated body/form/React entry unchanged: " + route);
  check(JSON.stringify(jsonld(html)) === JSON.stringify(jsonld(htmlBefore)), "Organization/WebSite JSON-LD preserved: " + route);
  snapshots.push({route,file,hash:hash(file)});
}
const old = fs.readFileSync(path.join(base,"Seo.jsx.before.txt"),"utf8");
const dataBlock = old.slice(old.indexOf("const SEO_PAGES"),old.indexOf("function setMeta"));
const previousPages = vm.runInNewContext(dataBlock + "; SEO_PAGES");
check(JSON.stringify(previousPages) === JSON.stringify(SEO_PAGES), "All approved titles/descriptions preserved verbatim");
const beforeSource = fs.readFileSync(path.join(base,"index.html.before.txt"),"utf8");
check(body(fs.readFileSync("index.html","utf8")) === body(beforeSource), "Source HTML body and Netlify template byte preserved");
check(hash("src/assets/proyectos/log_pyp.png") === hash("public/og-pyp.png") && hash("public/og-pyp.png") === hash(path.join(output,"og-pyp.png")), "Social image is exact official PNG copy in source and artifact");

const run = (dir) => spawnSync(process.execPath,[generator,"--outDir",dir],{encoding:"utf8"});
const second = run(output);
check(second.status === 0 && snapshots.every(s=>hash(s.file)===s.hash), "SEO generation is idempotent in newly created temporal output");

const fixtureRoot=path.join(base,"build-temporal/negative-fixtures");
const failures=[];
for(const [name,transform]of [
  ["missing-description",html=>html.replace(/<meta\b(?=[^>]*\bname="description")[^>]*>/,"")],
  ["duplicate-canonical",html=>html.replace("</head>",'<link rel="canonical" href="https://pyptecnologia.com/" /></head>')],
]){
  const folder=path.join(fixtureRoot,name);fs.mkdirSync(folder,{recursive:true});
  const fixture=path.join(folder,"index.html");fs.writeFileSync(fixture,transform(htmlBefore));
  const before=hash(fixture),result=run(folder);
  check(result.status!==0&&hash(fixture)===before&&!fs.existsSync(path.join(folder,"iot-industrial")),"Invalid template fails before writing routes: "+name);
  failures.push({name,exit:result.status,error:result.stderr});
}
fs.writeFileSync(path.join(base,"generator-results.json"),JSON.stringify({checks:checks.length,results:checks,snapshots,negativeTests:failures,metadata:Object.fromEntries(Object.keys(SEO_PAGES).map(route=>[route,getSeoPage(route)]))},null,2)+"\n");
console.log("Generator checks passed: "+checks.length);
