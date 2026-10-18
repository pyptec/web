import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawn,spawnSync} from 'node:child_process';
import {SEO_PAGES,getSeoPage} from '../../../src/data/seo.js';
import {artifactServer} from './servidor.mjs';
const base='docs/evidencias/PYP-025',root=path.resolve(base,'build-temporal/comercial');
const save=(n,v)=>fs.writeFileSync(base+'/'+n,typeof v==='string'?v:JSON.stringify(v,null,2)+'\n');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const results=[],check=(label,passed)=>results.push({label,passed:!!passed});
const initial=JSON.parse(fs.readFileSync(base+'/estado-inicial.json')),prior=await import('data:text/javascript,'+encodeURIComponent(initial.originalSeo));
for(const r of Object.keys(prior.SEO_PAGES))check('SEO anterior idéntico '+r,JSON.stringify(prior.getSeoPage(r))===JSON.stringify(getSeoPage(r)));
const attrs=t=>Object.fromEntries([...t.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1],m[2]]));
function parse(html){const tags=[...html.matchAll(/<(?:meta|link)\b[^>]*>/gi)].map(m=>attrs(m[0]));return {title:html.match(/<title>([\s\S]*?)<\/title>/i)?.[1],description:tags.find(t=>t.name==='description')?.content,canonical:tags.find(t=>t.rel==='canonical')?.href,og:Object.fromEntries(tags.filter(t=>t.property?.startsWith('og:')).map(t=>[t.property,t.content])),h1s:[...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)].map(m=>m[1]),json:[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]))};}
const routes=Object.keys(SEO_PAGES),form=fs.readFileSync('index.html','utf8').match(/<form\b[\s\S]*?<\/form>/)[0],parsed=[];
for(const [i,r]of routes.entries()){
const html=fs.readFileSync(path.join(root,r.slice(1),'index.html'),'utf8'),m=parse(html),e=getSeoPage(r);parsed.push({route:r,...m});save('html-'+i+'.html',html);
check(r+' title/description',m.title===e.title&&m.description===e.description);
check(r+' canonical/OG',m.canonical===e.canonical&&m.og['og:url']===e.canonical&&m.og['og:title']===e.title&&m.og['og:description']===e.description&&m.og['og:image']===e.image.url);
check(r+' H1 único inicial',m.h1s.length===1);
check(r+' contenido inicial e hidratación',html.includes('data-prerendered="true"')&&html.match(/<main\b[\s\S]*?<\/main>/)?.[0].replace(/<[^>]+>/g,'').trim().length>500);
check(r+' formulario estático intacto',html.match(/<form\b[\s\S]*?<\/form>/)?.[0]===form);
check(r+' sin noindex o assets de desarrollo',!/<meta\b[^>]*content="[^"]*noindex/i.test(html)&&!/\b(?:src|href)="\/src\/assets\//.test(html));
for(const url of [...html.matchAll(/\b(?:src|href)="([^"]+)"/g)].map(x=>x[1]).filter(x=>x.startsWith('/assets/')||x==='/clg-audio-comercial.jpg'))check(r+' recurso '+url,fs.existsSync(path.join(root,url)));
const types=m.json.flatMap(x=>x['@graph']||[x]).map(x=>x['@type']);
check(r+' Organization única',types.filter(t=>t==='Organization').length===1);
check(r+' JSON-LD específico',r==='/proyectos/clg'?types.filter(t=>t==='BreadcrumbList').length===1&&types.filter(t=>t==='Product').length===1:!types.includes('Product')&&!types.includes('BreadcrumbList'));
check(r+' sin FAQPage/precios/reviews',!types.includes('FAQPage')&&!m.json.some(x=>/"(?:offers|aggregateRating|review|availability|certification)"\s*:/.test(JSON.stringify(x))));
}
const clg=fs.readFileSync(root+'/proyectos/clg/index.html','utf8');
check('H1 CLG exacto',parse(clg).h1s[0]==='Publicidad programable y comunicación inteligente con CLG');
check('Siete FAQ visibles',clg.includes('¿Qué es un sistema de publicidad programable por audio?')&&[...clg.matchAll(/<dt>/g)].length===7);
check('Enlace rastreable desde Inicio/Proyectos',fs.readFileSync(root+'/index.html','utf8').includes('href="/proyectos/clg/"'));
check('Foto OG real e idéntica',hash(root+'/clg-audio-comercial.jpg')===hash('src/assets/proyectos/clg/clg-audio-serie.jpg'));
check('Infografía no publicada como prueba',!clg.includes('clg-infografia'));
check('Hero priorizado y con dimensiones',clg.includes('fetchpriority="high"')&&clg.includes('width="1599" height="899"'));
const locs=[...fs.readFileSync(root+'/sitemap.xml','utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
check('Sitemap cinco canonical únicas',locs.length===5&&new Set(locs).size===5&&routes.every(r=>locs.includes(getSeoPage(r).canonical)));
check('Sitemap público igual al generado',hash(root+'/sitemap.xml')===hash('public/sitemap.xml'));
check('Robots permite rastreo',/Allow: \//.test(fs.readFileSync(root+'/robots.txt','utf8'))&&fs.readFileSync(root+'/robots.txt','utf8').includes('https://pyptecnologia.com/sitemap.xml'));
const before=Object.fromEntries([...routes.map(r=>path.join(root,r.slice(1),'index.html')),root+'/sitemap.xml'].map(p=>[p,hash(p)]));
const regen=spawnSync(process.execPath,['scripts/generar-seo.mjs','--outDir',root],{encoding:'utf8',timeout:120000});save('regeneracion.stdout.txt',regen.stdout||'');save('regeneracion.stderr.txt',regen.stderr||'');
const same=Object.entries(before).every(([p,h])=>hash(p)===h);check('Prerender idempotente',regen.status===0&&same);save('idempotencia.json',{exitCode:regen.status,unchanged:same,hashes:before});
const server=artifactServer(root);await new Promise((resolve,reject)=>{server.once('error',reject);server.listen(0,'127.0.0.1',resolve)});
const origin='http://127.0.0.1:'+server.address().port;save('servidor-local.json',{origin,root,limitation:'Modelo local de archivos; no prueba CDN Netlify.'});
const responses=[];
try {
for(const r of routes)for(const suffix of r==='/'?['']:['','/']){const url=origin+r+suffix,response=await fetch(url),m=parse(await response.text());responses.push({url,status:response.status,finalUrl:response.url,metadata:m});check('HTTP '+r+suffix,response.status===200&&m.canonical===getSeoPage(r).canonical&&m.h1s.length===1);}
for(const p of ['/robots.txt','/sitemap.xml','/favicon.svg','/clg-audio-comercial.jpg']){const response=await fetch(origin+p);responses.push({url:origin+p,status:response.status,contentType:response.headers.get('content-type')});check('HTTP recurso '+p,response.status===200);}
save('http-local.json',responses);
const prep=spawnSync(process.execPath,[base+'/preparar-navegador.mjs'],{encoding:'utf8'});if(prep.status!==0)throw Error(prep.stderr);
const browser=await new Promise(resolve=>{const child=spawn(process.execPath,[base+'/navegador.mjs'],{windowsHide:true,stdio:['ignore','pipe','pipe']});let stdout='',stderr='';child.stdout.on('data',b=>stdout+=b);child.stderr.on('data',b=>stderr+=b);child.on('error',e=>resolve({exitCode:null,error:String(e),stdout,stderr}));child.on('close',code=>resolve({exitCode:code,stdout,stderr}));});
save('navegador.stdout.txt',browser.stdout);save('navegador.stderr.txt',browser.stderr);save('navegador-comando.json',{exitCode:browser.exitCode,error:browser.error});check('Navegador completado',browser.exitCode===0);
if(fs.existsSync(base+'/navegador.json')){
const n=JSON.parse(fs.readFileSync(base+'/navegador.json')),states=n.results.filter(s=>s.route);check('18 estados escritorio/móvil',states.length===18);
for(const s of states){const e=getSeoPage(s.route);check(s.width+' '+s.route+' hidratación/SEO',!s.error&&s.title===e.title&&s.canonical===e.canonical&&s.description===e.description&&s.og['og:url']===e.canonical);check(s.width+' '+s.route+' Navbar/anclas',s.headers===1&&!s.overflow&&s.menuOpened&&s.escapeClosed&&s.sections.every(a=>a.visible&&a.focus===a.id));check(s.width+' '+s.route+' H1/IDs',s.contentAudit?.h1Count===1&&s.contentAudit.duplicateIds.length===0);}
check('Consola sin errores/warnings',n.consoleEvents.length===0);
check('Red sin fallos ni HTTP>=400',n.failures.length===0&&!n.network.some(r=>r.status>=400));
check('Sin intentos de envío',n.blocked.length===0);
const noJs=JSON.parse(fs.readFileSync(base+'/sin-javascript.json'));check('CLG visible sin JavaScript',noJs.h1==='Publicidad programable y comunicación inteligente con CLG'&&noJs.faq===7&&noJs.text.length>1000&&noJs.hasProjectLink);
const tablet=JSON.parse(fs.readFileSync(base+'/tablet.json'));check('Tablet sin overflow',tablet.width===768&&!tablet.overflow&&tablet.h1s===1);
}
}finally{await new Promise(resolve=>server.close(resolve));}
const result={date:new Date().toISOString(),checks:results.length,failures:results.filter(r=>!r.passed),results,parsed,limitations:'Pruebas locales; LCP/CLS laboratorio, sin INP/CrUX/indexación; sin publicación ni envíos.'};save('comprobaciones.json',result);console.log(JSON.stringify({checks:result.checks,failures:result.failures}));if(result.failures.length)process.exitCode=1;
