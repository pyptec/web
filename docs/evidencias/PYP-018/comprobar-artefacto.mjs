import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import http from 'node:http';
import { SEO_PAGES, getSeoPage } from '../../../src/data/seo.js';
const root=path.resolve('docs/evidencias/PYP-018/build-temporal/comercial/dist');
const results=[]; const check=(label,ok)=>results.push({label,passed:!!ok});
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const files=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?files(path.join(d,e.name)):[path.join(d,e.name)]);
const fields=s=>[...s.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]).sort();
const app=fs.readFileSync('src/App.jsx','utf8'),staticHtml=fs.readFileSync(path.join(root,'index.html'),'utf8');
const sourceForm=app.match(/<form\b[\s\S]*?<\/form>/)[0],staticForm=staticHtml.match(/<form\b[\s\S]*?<\/form>/)[0];
check('Campos estáticos y React iguales',JSON.stringify(fields(sourceForm))===JSON.stringify(fields(staticForm)));
for(const marker of ['name="contacto-pyp"','method="POST"','data-netlify="true"','netlify-honeypot="bot-field"','value="contacto-pyp"'])check('Formulario '+marker,sourceForm.includes(marker)&&staticForm.includes(marker));
for(const name of ['nombre','correo','mensaje'])check('Requerido '+name,new RegExp('<(?:input|textarea)\\b[^>]*name="'+name+'"[^>]*required').test(sourceForm));
const escape=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
for(const route of Object.keys(SEO_PAGES)){const p=getSeoPage(route),html=fs.readFileSync(path.join(root,route.slice(1),'index.html'),'utf8');
for(const [label,value] of [['title','<title>'+escape(p.title)+'</title>'],['description','name="description" content="'+escape(p.description)+'"'],['canonical','rel="canonical" href="'+p.canonical+'"'],['og:title','property="og:title" content="'+escape(p.title)+'"'],['og:description','property="og:description" content="'+escape(p.description)+'"'],['og:url','property="og:url" content="'+p.canonical+'"'],['og:image',p.image.url]])check(route+' '+label,html.includes(value));
check(route+' formulario idéntico',html.match(/<form\b[\s\S]*?<\/form>/)[0]===staticForm);
for(const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g))check(route+' recurso '+m[1],fs.existsSync(path.join(root,m[1])));
}
for(const f of ['src/App.jsx','src/pages/MonitoreoEnergetico.jsx','src/pages/IoTIndustrialLoRaWAN.jsx','src/pages/AutomatizacionEdge.jsx']){const s=fs.readFileSync(f,'utf8');check(f+' Navbar única',[...s.matchAll(/<Navbar\b/g)].length===1);for(const m of s.matchAll(/href: "#([^"]+)"/g))check(f+' ancla '+m[1],new RegExp('id=["\\x27]'+m[1]+'["\\x27]').test(s));}
const sitemap=fs.readFileSync(path.join(root,'sitemap.xml'),'utf8'),locs=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]).sort();check('Sitemap cuatro canonical exactos',JSON.stringify(locs)===JSON.stringify(Object.keys(SEO_PAGES).map(r=>getSeoPage(r).canonical).sort()));
check('Robots referencia sitemap',fs.readFileSync(path.join(root,'robots.txt'),'utf8').includes('Sitemap: https://pyptecnologia.com/sitemap.xml'));
check('Fallback SPA intacto',fs.readFileSync(path.join(root,'_redirects'),'utf8')===fs.readFileSync('public/_redirects','utf8'));
check('Imagen OG existente',fs.existsSync(path.join(root,'og-pyp.png')));
const prior=path.resolve('docs/evidencias/PYP-017/build-temporal/comercial/dist');
const artifactFiles=files(root).map(p=>path.relative(root,p).replaceAll('\\','/')).sort();
const differences=artifactFiles.filter(p=>!fs.existsSync(path.join(prior,p))||hash(path.join(root,p))!==hash(path.join(prior,p)));
check('20 archivos idénticos a PYP-017',artifactFiles.length===20&&files(prior).length===20&&differences.length===0);
const server=http.createServer((req,res)=>{if(req.method!=='GET'){res.writeHead(405);res.end();return;}const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let p=path.join(root,pathname);if(fs.existsSync(p)&&fs.statSync(p).isDirectory())p=path.join(p,'index.html');if(!fs.existsSync(p))p=path.join(root,'index.html');res.setHeader('Content-Type','text/html; charset=utf-8');res.end(fs.readFileSync(p));});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));const responses=[];
try{for(const route of Object.keys(SEO_PAGES)){for(const suffix of route==='/'?['']:['','/']){const url=route+suffix;const response=await fetch('http://127.0.0.1:'+server.address().port+url);const html=await response.text();check('HTTP modelo '+url,response.status===200&&html.includes('<title>'+escape(getSeoPage(route).title)+'</title>'));responses.push({url,status:response.status,title:html.match(/<title>(.*?)<\/title>/)[1]});}}}finally{await new Promise(resolve=>server.close(resolve));}
const output={date:'2026-10-17',checks:results.length,failures:results.filter(r=>!r.passed),results,fields:fields(staticForm),responses,artifactFiles,differences,limitations:'Modelo local de archivos/directorios antes del fallback. No reproduce el CDN Netlify. No ejecuta React ni pruebas visuales, teclado o recepción de formularios.'};
fs.writeFileSync('docs/evidencias/PYP-018/comprobaciones.json',JSON.stringify(output,null,2)+'\n');console.log(JSON.stringify({checks:output.checks,failures:output.failures,responses}));if(output.failures.length)process.exitCode=1;
