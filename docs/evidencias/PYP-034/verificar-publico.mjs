import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {SEO_PAGES,getSeoPage} from '../../../src/data/seo.js';
const base='docs/evidencias/PYP-034',root=base+'/build-temporal/comercial';
const requests=[];
async function read(url){try{const r=await fetch(url,{redirect:'follow',signal:AbortSignal.timeout(15000)});const b=Buffer.from(await r.arrayBuffer());return {url,status:r.status,finalUrl:r.url,type:r.headers.get('content-type'),server:r.headers.get('server'),bytes:b.length,hash:createHash('sha256').update(b).digest('hex'),text:b.toString('utf8')};}catch(e){return {url,error:e.message};}}
const pages=await Promise.all(Object.keys(SEO_PAGES).map(async route=>{
 const page=getSeoPage(route),r=await read(page.canonical);
 const html=r.text||'',local=fs.readFileSync(root+(route==='/'?'':route)+'/index.html','utf8');
 const canonical=html.match(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i)?.[1]||null;
 const title=html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]||null;
 const resources=[...html.matchAll(/(?:src|href)="(\/(?:assets\/|rpi-mdfr-infografia\.png|clg-audio-comercial\.jpg)[^"?#]*)/g)].map(m=>m[1]);
 const localAssets=[...local.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map(m=>m[1]);
 const result={...r,title,canonical,matchesTitle:title===page.title,matchesCanonical:canonical===page.canonical,matchesBuildAssets:localAssets.every(a=>html.includes(a)),hasGa4Id:html.includes('G-WJ6METJRZD'),hasProduct:/"@type"\s*:\s*"Product"/.test(html),h1:html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1]?.replace(/<[^>]+>/g,'')||null};
 delete result.text;
 return {result,resources};
}));
requests.push(...pages.map(p=>p.result));
const resources=[...new Set([...pages.flatMap(p=>p.resources),'/sitemap.xml','/robots.txt','/favicon.svg','/rpi-mdfr-infografia.png'])];
for(let i=0;i<resources.length;i+=5){const batch=await Promise.all(resources.slice(i,i+5).map(async resource=>{const r=await read('https://pyptecnologia.com'+resource);if(resource==='/sitemap.xml')r.routes=[...(r.text||'').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);delete r.text;return r;}));requests.push(...batch);}
const published=pages.every(p=>p.result.status===200&&p.result.matchesCanonical&&p.result.matchesTitle&&p.result.matchesBuildAssets);
const result={date:new Date().toISOString(),purpose:'Referencia pública anterior a commit/push; no prueba entrega de PYP-034.',publishedBuildMatches:published,pages:pages.map(p=>p.result),requests,netlify:'Sin acceso autenticado al panel; no se infiere estado de créditos/build a partir de HTTP.'};
fs.writeFileSync(base+'/http-publico-pre.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({publicMatchesLocal:published,pages:result.pages.map(p=>({url:p.url,status:p.status,title:p.title,matchesBuild:p.matchesBuildAssets,error:p.error})),resources:requests.length}));
const tag=await read('https://www.googletagmanager.com/gtag/js?id=G-WJ6METJRZD');
const source=tag.text||'';
const flags=[...source.matchAll(/"(vtp_enable[A-Za-z]+)"\s*:\s*(true|false)/g)].map(m=>({field:m[1],value:m[2]==='true'}));
const config={date:new Date().toISOString(),url:tag.url,status:tag.status,error:tag.error,sha256:tag.hash,bytes:tag.bytes,observedFlags:flags,limitations:'Descarga estática sin ejecución ni eventos. Flags en un script no demuestran por sí solos la configuración efectiva de la cuenta. No sustituye confirmación administrativa. El propietario confirmó los ajustes pendientes.'};
fs.writeFileSync(base+'/ga4-etiqueta-publica.json',JSON.stringify(config,null,2)+'\n');
console.log(JSON.stringify({ga4TagStatus:tag.status,flags,tagError:tag.error}));
