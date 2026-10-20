import fs from 'node:fs';
import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {SEO_PAGES,getSeoPage} from '../../../src/data/seo.js';
import {getPageStructuredData} from '../../../src/data/structuredData.js';
const dir='docs/evidencias/PYP-030';
const root=dir+'/build-temporal/comercial';
const checks=[];
function check(name,fn){try{fn();checks.push({name,ok:true});}catch(e){checks.push({name,ok:false,error:e.message});}}
const jsons=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const objects=x=>Array.isArray(x)?x.flatMap(objects):x&&typeof x==='object'?[x,...Object.values(x).flatMap(objects)]:[];
const templateSchemas=jsons(fs.readFileSync('index.html','utf8'));
for(const route of Object.keys(SEO_PAGES)){
 const html=fs.readFileSync(root+(route==='/'?'':route)+'/index.html','utf8');
 const page=getSeoPage(route);
 const schemas=jsons(html);const nodes=objects(schemas);
 check(route+' JSON-LD sin Product ni datos comerciales ficticios',()=>{assert(!nodes.some(n=>[].concat(n['@type']||[]).includes('Product')));assert(!nodes.some(n=>['offers','review','aggregateRating','price'].some(k=>k in n)));assert(!html.includes('#producto'));assert(!/itemtype=["'][^"']*Product/i.test(html));});
 check(route+' Organization y WebSite intactos',()=>assert.deepEqual(schemas.slice(0,templateSchemas.length),templateSchemas));
 check(route+' canonical único',()=>{assert.equal([...html.matchAll(/rel="canonical"/g)].length,1);assert(html.includes('rel="canonical" href="'+page.canonical+'"'));});
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 check(route+' título, descripción y Open Graph',()=>{assert(html.includes('<title>'+escape(page.title)+'</title>'));for(const [key,value] of Object.entries({'description':page.description,'og:title':page.title,'og:description':page.description,'og:url':page.canonical,'og:image':page.image.url,'og:image:type':page.image.type,'og:image:width':page.image.width,'og:image:height':page.image.height,'og:image:alt':page.image.alt})){assert(html.includes((key==='description'?'name':'property')+'="'+key+'" content="'+escape(value)+'"'));}});
 check(route+' imágenes locales presentes',()=>{for(const m of html.matchAll(/<img\b[^>]*src="(\/[^"?#]+)"/g))assert(fs.existsSync(root+decodeURIComponent(m[1])),m[1]);});
 check(route+' URL en sitemap',()=>assert(fs.readFileSync(root+'/sitemap.xml','utf8').includes('<loc>'+page.canonical+'</loc>')));
}
const clg=fs.readFileSync(root+'/proyectos/clg/index.html','utf8');
const visible=clg.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g,'').replace(/<[^>]+>/g,' ');
for(const text of ['CLG — Audio inteligente y automatización IoT','4 entradas digitales acopladas','4 salidas de relé','4 entradas analógicas ADC','Modbus RTU','Modbus TCP','CAN','RS-232','MQTT','RTC','Edge Computing','47 dispositivos','Alkosto','Ktronix','Solicitar evaluación CLG'])check('HTML visible: '+text,()=>assert(visible.includes(text)));
const old=fs.readFileSync(dir+'/structuredData-antes.txt','utf8');
const dataUrl='data:text/javascript;base64,'+Buffer.from(old.replace('"./seo.js"',JSON.stringify(new URL('../../../src/data/seo.js',import.meta.url).href))).toString('base64');
const previous=(await import(dataUrl)).getPageStructuredData('/proyectos/clg');
const expected={...previous,'@graph':previous['@graph'].filter(n=>n['@type']!=='Product')};
for(const route of ['/proyectos/clg','/proyectos/clg/'])check('Datos React '+route+' solo retiran Product',()=>assert.deepEqual(getPageStructuredData(route),expected));
check('HTML CLG usa exactamente el esquema compartido',()=>assert.deepEqual(jsons(clg).at(-1),expected));
for(const file of ['src/pages/CLG.jsx','src/App.jsx','src/data/clg.js','src/data/clg-meta.js','src/data/seo.js','src/components/Seo.jsx','scripts/generar-seo.mjs','index.html','public/sitemap.xml','package.json','package-lock.json','docs/.vitepress/config.mjs'])check('Fuente conservada: '+file,()=>assert.equal(fs.readFileSync(file,'utf8').replace(/\r\n/g,'\n'),execFileSync('git',['show','HEAD:'+file],{encoding:'utf8'}).replace(/\r\n/g,'\n')));
const result={date:'2026-10-19',checks,passed:checks.filter(c=>c.ok).length,failed:checks.filter(c=>!c.ok).length};
fs.writeFileSync(dir+'/seo.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(result,null,2));
if(result.failed)process.exitCode=1;
