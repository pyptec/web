import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn,spawnSync} from 'node:child_process';
import {getSeoPage} from '../../../src/data/seo.js';
import {artifactServer} from './servidor.mjs';
const base='docs/evidencias/PYP-022',root=path.resolve(base,'build-temporal/comercial');
const save=(n,v)=>fs.writeFileSync(base+'/'+n,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const checks=[],check=(label,passed)=>checks.push({label,passed:!!passed});
const fields=s=>[...s.matchAll(/<(?:input|select|textarea)\b[^>]*\bname="([^"]+)"/g)].map(m=>m[1]).sort();
const attr=s=>Object.fromEntries([...s.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1],m[2]]));
function metadata(html){const tags=[...html.matchAll(/<(meta|link)\b[^>]*>/gi)].map(m=>attr(m[0]));return {title:html.match(/<title>([\s\S]*?)<\/title>/i)?.[1],canonical:tags.find(t=>t.rel==='canonical')?.href,description:tags.find(t=>t.name==='description')?.content,og:Object.fromEntries(tags.filter(t=>t.property?.startsWith('og:')).map(t=>[t.property,t.content]))};}
const sourceForm=fs.readFileSync('index.html','utf8').match(/<form\b[\s\S]*?<\/form>/)[0];
const routes=['/','/monitoreo-energetico','/iot-industrial','/automatizacion-edge'];
const canonicals=routes.map(r=>'https://pyptecnologia.com'+(r==='/'?'/':r+'/'));
const required=['form-name','nombre','correo','empresa','solucion','mensaje','bot-field'].sort(),statics=[];
for(const [i,route]of routes.entries()){
const html=fs.readFileSync(path.join(root,route.slice(1),'index.html'),'utf8');save('html-'+i+'.html',html);
const meta=metadata(html),expected=getSeoPage(route);statics.push({route,...meta});
check(route+' canonical explícita',meta.canonical===canonicals[i]);check(route+' og:url explícita',meta.og['og:url']===canonicals[i]);
for(const [key,want]of [['title',expected.title],['description',expected.description]])check(route+' '+key,meta[key]===want);
check(route+' OG título/description',meta.og['og:title']===expected.title&&meta.og['og:description']===expected.description);
check(route+' formulario intacto',html.match(/<form\b[\s\S]*?<\/form>/)[0]===sourceForm);
check(route+' campos formulario',JSON.stringify(fields(html.match(/<form\b[\s\S]*?<\/form>/)[0]))===JSON.stringify(required));
check(route+' favicon referenciado',html.includes('rel="icon" type="image/svg+xml" href="/favicon.svg"'));
check(route+' helper con/sin barra',getSeoPage(route).canonical===getSeoPage(route==='/'?'/':route+'/').canonical);
for(const m of html.matchAll(/(?:src|href)="(\/assets\/[^"]+)"/g))check(route+' asset '+m[1],fs.existsSync(path.join(root,m[1])));
}
check('Cuatro títulos/descriptions individuales',new Set(statics.map(s=>s.title)).size===4&&new Set(statics.map(s=>s.description)).size===4);
const locs=[...fs.readFileSync(root+'/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
check('Sitemap cuatro canonical explícitas',JSON.stringify(locs.sort())===JSON.stringify([...canonicals].sort()));
check('Sitemap público y generado iguales',hash(root+'/sitemap.xml')===hash('public/sitemap.xml'));
for(const p of ['robots.txt','favicon.svg','_redirects','og-pyp.png'])check(p+' copiado intacto',hash(root+'/'+p)===hash('public/'+p));
check('robots referencia sitemap',fs.readFileSync(root+'/robots.txt','utf8').includes('Sitemap: https://pyptecnologia.com/sitemap.xml'));
const favicon=fs.readFileSync(root+'/favicon.svg','utf8');
check('Favicon sin HTML o imágenes externas',!/<(?:html|script|image)\b/i.test(favicon)&&favicon.includes('xmlns="http://www.w3.org/2000/svg"'));
for(const color of ['#A6CE39','#6BA425','#1E1E1E'])check('Favicon color '+color,favicon.includes(color));
const before=Object.fromEntries([...routes.map(r=>path.join(root,r.slice(1),'index.html')),root+'/sitemap.xml'].map(p=>[p,hash(p)]));
fs.writeFileSync(root+'/sitemap.xml','<!-- sitemap anterior simulado -->');
const rerun=spawnSync(process.execPath,['scripts/generar-seo.mjs','--outDir',root],{encoding:'utf8'});
save('regeneracion-seo.stdout.txt',rerun.stdout||'');save('regeneracion-seo.stderr.txt',rerun.stderr||'');
const unchanged=Object.entries(before).every(([p,h])=>hash(p)===h);
check('Generador reemplaza sitemap obsoleto; HTML idempotente',rerun.status===0&&unchanged);
save('seo-idempotencia.json',{exitCode:rerun.status,unchanged,hashes:before});
const server=artifactServer(root);await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
const origin='http://127.0.0.1:'+server.address().port;save('servidor-local.json',{origin,root,limitations:'Servidor de archivos/directorios y fallback SPA. No emula Netlify ni sus 301; no admite envíos.'});
const responses=[];
try{
for(const route of routes)for(const suffix of route==='/'?['']:['','/']){const url=origin+route+suffix,r=await fetch(url),html=await r.text(),meta=metadata(html);responses.push({requested:url,status:r.status,url:r.url,metadata:meta});check('HTTP local '+route+suffix,r.status===200&&meta.canonical===getSeoPage(route).canonical&&meta.title===getSeoPage(route).title);}
for(const p of ['/favicon.svg','/robots.txt','/sitemap.xml','/og-pyp.png']){const r=await fetch(origin+p),buffer=Buffer.from(await r.arrayBuffer());responses.push({requested:origin+p,status:r.status,contentType:r.headers.get('content-type'),length:buffer.length,sha256:crypto.createHash('sha256').update(buffer).digest('hex')});check('HTTP recurso '+p,r.status===200);if(p==='/favicon.svg')check('HTTP SVG MIME/contenido',r.headers.get('content-type')==='image/svg+xml'&&buffer.toString().startsWith('<svg'));}
save('http-local.json',responses);
const browserFile=base+'/navegador.mjs';
let browser=fs.readFileSync('docs/evidencias/PYP-021/navegador.mjs','utf8').replaceAll('docs/evidencias/PYP-021',base).replaceAll('9361','9362').replaceAll('https://pyptecnologia.com',origin).replaceAll('location.hostname==="pyptecnologia.com"','location.hostname==="127.0.0.1"');
const marker="save('navegador.json',";
const expression="(async()=>{const svg=await(await fetch('/favicon.svg')).text(),xml=await(await fetch('/sitemap.xml')).text(),parser=new DOMParser(),s=parser.parseFromString(svg,'image/svg+xml'),x=parser.parseFromString(xml,'application/xml'),img=new Image();img.src='/favicon.svg';await img.decode();return {faviconXmlValid:!s.querySelector('parsererror'),svgNamespace:s.documentElement.namespaceURI,svgRoot:s.documentElement.localName,sitemapXmlValid:!x.querySelector('parsererror'),sitemapUrls:[...x.getElementsByTagName('loc')].map(e=>e.textContent),iconHref:document.querySelector('link[rel=icon]').getAttribute('href'),imageDecoded:img.naturalWidth>0&&img.naturalHeight>0}})()";
browser=browser.replace(marker,"const xmlChecks=await ev("+JSON.stringify(expression)+");save('xml-favicon-navegador.json',xmlChecks);\n"+marker);
fs.writeFileSync(browserFile,browser);
const browserRun=await new Promise(resolve=>{const child=spawn(process.execPath,[browserFile],{windowsHide:true,stdio:['ignore','pipe','pipe']});let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.on('error',e=>resolve({exitCode:null,error:String(e),stdout,stderr}));child.on('close',code=>resolve({exitCode:code,stdout,stderr}));});
save('navegador.stdout.txt',browserRun.stdout);save('navegador.stderr.txt',browserRun.stderr);save('navegador-comando.json',{exitCode:browserRun.exitCode,error:browserRun.error});
check('Navegador ejecución',browserRun.exitCode===0);
if(fs.existsSync(base+'/navegador.json')){const n=JSON.parse(fs.readFileSync(base+'/navegador.json'));const states=n.results.filter(r=>r.route);check('Navegador 14 estados',states.length===14);for(const state of states){const e=getSeoPage(state.route);check(state.width+' '+state.route+' navegador SEO',!state.error&&state.title===e.title&&state.canonical===e.canonical&&state.description===e.description&&state.og['og:url']===e.canonical);check(state.width+' '+state.route+' navegación',state.headers===1&&!state.overflow&&state.menuOpened&&state.escapeClosed&&state.sections.every(s=>s.visible&&s.focus===s.id));}check('Consola sin errores/warnings',n.consoleEvents.length===0);check('Red sin fallos o HTTP>=400',n.failures.length===0&&!n.network.some(r=>r.status>=400));check('Sin intentos POST',n.blocked.length===0);const xml=JSON.parse(fs.readFileSync(base+'/xml-favicon-navegador.json'));check('SVG/XML decodificados navegador',xml.faviconXmlValid&&xml.svgNamespace==='http://www.w3.org/2000/svg'&&xml.svgRoot==='svg'&&xml.imageDecoded&&xml.iconHref==='/favicon.svg'&&xml.sitemapXmlValid);}
}finally{await new Promise(resolve=>server.close(resolve));}
const result={date:new Date().toISOString(),mode:'Artefacto local; no producción ni recepción Forms',checks:checks.length,failures:checks.filter(c=>!c.passed),results:checks,statics,responses,limitations:'Edge escritorio/móvil emulado, reduced-motion. MIME local del servidor de prueba; pendiente CDN tras publicación futura autorizada.'};
save('comprobaciones.json',result);console.log(JSON.stringify({checks:result.checks,failures:result.failures}));if(result.failures.length)process.exitCode=1;
