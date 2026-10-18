import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
import {SEO_PAGES,getSeoPage} from '../../../src/data/seo.js';
const base='docs/evidencias/PYP-021';
const save=(name,obj)=>fs.writeFileSync(base+'/'+name,typeof obj==='string'?obj:JSON.stringify(obj,null,2)+'\n');
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
function inventory(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>{const p=path.join(dir,e.name);return e.isDirectory()?inventory(p):[{path:p.replaceAll('\\','/'),sha256:hash(p)}]});}
const protectedFiles=[...inventory('dist'),...inventory('src'),...inventory('public'),...inventory('scripts'),...['package.json','package-lock.json','index.html','vite.config.js','.git/index','AGENTS.md'].map(p=>({path:p,sha256:hash(p)}))];
save('integridad-inicial.json',protectedFiles);
const git=args=>spawnSync('git',args,{encoding:'utf8'}).stdout.trim();
save('git-inicial.json',{date:new Date().toISOString(),branch:git(['branch','--show-current']),head:git(['rev-parse','HEAD']),originMain:git(['rev-parse','origin/main']),remoteMain:git(['ls-remote','origin','refs/heads/main']),status:git(['status','--short']),aheadBehind:git(['rev-list','--left-right','--count','HEAD...origin/main']),netlifyConfig:{toml:fs.existsSync('netlify.toml'),localLink:fs.existsSync('.netlify/state.json'),cli:false,pluginSearch:'Netlify: sin resultados',remotePanel:'No disponible; no se inspeccionan credenciales'}});
function attrs(tag){return Object.fromEntries([...tag.matchAll(/([\w:-]+)\s*=\s*["']([^"']*)["']/g)].map(m=>[m[1],m[2]]));}
function parse(html){const tags=[...html.matchAll(/<(meta|link)\b[^>]*>/gi)].map(m=>({tag:m[1],...attrs(m[0])}));return {title:html.match(/<title>([\s\S]*?)<\/title>/i)?.[1],canonical:tags.find(t=>t.rel==='canonical')?.href,description:tags.find(t=>t.name==='description')?.content,og:Object.fromEntries(tags.filter(t=>t.property?.startsWith('og:')).map(t=>[t.property,t.content]))};}
async function request(url){const hops=[];for(let i=0;i<10;i++){const r=await fetch(url,{redirect:'manual',signal:AbortSignal.timeout(25000)});hops.push({url,status:r.status,location:r.headers.get('location'),headers:Object.fromEntries(r.headers)});if(r.status>=300&&r.status<400&&r.headers.get('location')){await r.arrayBuffer();url=new URL(r.headers.get('location'),url).href;continue;}const bytes=Buffer.from(await r.arrayBuffer());return {hops,url,status:r.status,bytes,sha256:crypto.createHash('sha256').update(bytes).digest('hex')};}throw Error('redirect limit');}
const routes=['/','/monitoreo-energetico','/monitoreo-energetico/','/iot-industrial','/iot-industrial/','/automatizacion-edge','/automatizacion-edge/'];
const results=[];
for(const [i,route]of routes.entries()){try{const r=await request('https://pyptecnologia.com'+route);const html=r.bytes.toString();save('ruta-'+i+'.html',html);const metadata=parse(html),expected=getSeoPage(route==='/'?'/':route.replace(/\/$/,''));const form=html.match(/<form\b[^>]*name=["']contacto-pyp["'][\s\S]*?<\/form>/i)?.[0];const fields=form?[...form.matchAll(/<(?:input|select|textarea)\b[^>]*>/gi)].map(m=>attrs(m[0])):[];results.push({...r,bytes:undefined,route,metadata,expected,checks:{title:metadata.title===expected.title,description:metadata.description===expected.description,canonical:metadata.canonical===expected.canonical,ogTitle:metadata.og['og:title']===expected.title,ogDescription:metadata.og['og:description']===expected.description,ogUrl:metadata.og['og:url']===expected.canonical,ogImage:metadata.og['og:image']===expected.image.url},form:{present:!!form,opening:form?.match(/<form[^>]*>/)?.[0],fields},assets:[...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(m=>m[1]).filter(x=>x.startsWith('/assets/')||x==='/favicon.svg')});}catch(e){results.push({route,error:String(e)});}}
save('http-rutas.json',results);
const resources=[];
for(const resource of ['/robots.txt','/sitemap.xml','/og-pyp.png',...new Set(results.flatMap(r=>r.assets||[]))]){try{const r=await request('https://pyptecnologia.com'+resource);const local='public'+resource;const entry={...r,bytes:undefined,resource,length:r.bytes.length,localMatch:fs.existsSync(local)?r.sha256===hash(local):null};if(resource.endsWith('.txt')||resource.endsWith('.xml')){entry.body=r.bytes.toString();save(resource.slice(1),entry.body);}resources.push(entry);}catch(e){resources.push({resource,error:String(e)});}}
save('http-recursos.json',resources);
try{const r=await request('https://iotrack.com.co');save('iotrack.json',{...r,bytes:undefined,title:parse(r.bytes.toString()).title});}catch(e){save('iotrack.json',{error:String(e)});}
const audit=spawnSync('npm.cmd',['audit','--omit=dev','--json'],{encoding:'utf8',shell:true,timeout:60000});
save('npm-audit-produccion.json',audit.stdout||'');save('npm-audit-comando.json',{exitCode:audit.status,stderr:audit.stderr,error:audit.error?.message});
console.log(JSON.stringify({routes:results.map(r=>({route:r.route,status:r.status,hops:r.hops?.map(h=>h.status),checks:r.checks,error:r.error})),resources:resources.map(r=>({resource:r.resource,status:r.status,localMatch:r.localMatch})),auditExit:audit.status},null,2));
