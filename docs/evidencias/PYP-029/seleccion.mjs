import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {spawnSync} from 'node:child_process';
const base='docs/evidencias/PYP-029';
const git=(args,input)=>{const r=spawnSync('git',args,{encoding:'utf8',input,windowsHide:true});if(r.status!==0)throw Error(r.stderr||r.stdout);return r.stdout.trim();};
const lines=s=>s.split(/\r?\n/).filter(Boolean);
const mode=process.argv[2]||'manifest';
const partial=['docs/BITACORA_DESARROLLO.md','docs/prompts/index.md'];
function selectedText(p){let s=fs.readFileSync(p,'utf8');if(p.includes('BITACORA')){const a=s.indexOf('## PYP-024 —'),b=s.indexOf('## PYP-025 —');if(a<0||b<a)throw Error('No se identifica bloque PYP-024');s=s.slice(0,a)+s.slice(b);}else s=s.split(/\r?\n/).filter(l=>!l.includes('[PYP-024 —')).join('\n');return s.replaceAll('\r\n','\n');}
if(mode==='manifest'){
 const source=['src/App.jsx','src/pages/CLG.jsx','src/pages/IoTIndustrialLoRaWAN.jsx','src/pages/AutomatizacionEdge.jsx','src/data/clg.js','src/data/clg-meta.js','src/data/structuredData.js'];
 const docs=['docs/prompts/PYP-028.md','docs/prompts/PYP-029.md','docs/arquitectura/PYP-028-clg-edge-iot.md',...partial];
 const roots=['docs/evidencias/PYP-027','docs/evidencias/PYP-028','docs/evidencias/PYP-029'];const evidence=[...lines(git(['ls-files','--modified','--others','--exclude-standard',...roots])),...lines(git(['diff','--cached','--name-only','--',...roots]))];
 const files=[...new Set([...source,...docs,...evidence,base+'/manifiesto.json'])].filter(p=>p!=='docs/evidencias/PYP-028/build-docs-01.stdout.txt').sort();
 if(files.some(p=>/build-temporal|browser-profile|^dist\/|\.git\//.test(p)))throw Error('Ruta excluida en selección');
 const manifest={date:new Date().toISOString(),base:git(['rev-parse','HEAD']),files,partial,excluded:['eliminaciones raíz anteriores','documentación PYP-024 y su sección de bitácora/índice','evidencias ajenas PYP-019/022/023','dist','Appcopia.jsx','builds, perfiles y cachés'],note:'Los cierres y evidencias posteriores a PYP-027 pertenecen al encargo; los resultados posteriores al nuevo commit se conservarán localmente sin autorreferencia.'};
 fs.writeFileSync(base+'/manifiesto.json',JSON.stringify(manifest,null,2)+'\n');
 const rules=[['private-key',/-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],['github-token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{50,})\b/],['aws-access-key',/\bAKIA[0-9A-Z]{16}\b/],['openai-key',/\bsk-(?:proj-)?[A-Za-z0-9_-]{40,}\b/],['credential-url',/https?:\/\/[^\s"'<>/:]+:[^\s"'<>/@]+@/]];
 const findings=[];for(const p of files){if(/\.(?:png|jpe?g|webp|ico)$/i.test(p))continue;const text=partial.includes(p)?selectedText(p):fs.readFileSync(p,'utf8');for(const [rule,re]of rules)if(re.test(text))findings.push({file:p,rule});}
 fs.writeFileSync(base+'/revision-secretos.json',JSON.stringify({date:new Date().toISOString(),files:files.length,findings,limitation:'Revisión de patrones y diff; no certificación exhaustiva. Se omiten valores coincidentes.'},null,2));
 if(findings.length)throw Error('Hallazgos requieren revisión: '+JSON.stringify(findings));
 console.log(JSON.stringify({files:files.length,source,partial,findings}));
}else if(mode==='stage'){
 if(git(['branch','--show-current'])!=='main'||git(['rev-list','--left-right','--count','main...origin/main']).replace(/\s+/g,' ')!=='0 0')throw Error('Estado Git inseguro');
 const m=JSON.parse(fs.readFileSync(base+'/manifiesto.json'));if(lines(git(['diff','--cached','--name-only'])).some(p=>!m.files.includes(p)))throw Error('Índice contiene archivos inesperados');
 git(['add','--',...m.files.filter(p=>!partial.includes(p))]);
 for(const p of partial){const blob=git(['hash-object','-w','--stdin'],selectedText(p));git(['update-index','--add','--cacheinfo','100644,'+blob+','+p]);}
 const actual=lines(git(['diff','--cached','--name-only'])).sort();if(JSON.stringify(actual)!==JSON.stringify(m.files))throw Error('Índice distinto del manifiesto');
 git(['diff','--cached','--check']);
 fs.writeFileSync(base+'/staged-name-status.txt',git(['diff','--cached','--name-status'])+'\n');
 const snapshot=path.resolve(base,'build-temporal/seleccion');if(fs.existsSync(snapshot))throw Error('Snapshot ya existe');fs.mkdirSync(snapshot,{recursive:true});git(['checkout-index','--prefix='+snapshot.replaceAll('\\','/')+'/','-a']);
 console.log(JSON.stringify({staged:actual.length,snapshot}));
}else if(mode==='snapshot-build'){
 const snapshot=path.resolve(base,'build-temporal/seleccion'),output=path.resolve(base,'build-temporal/publicacion');process.chdir(snapshot);
 const {build}=await import('vite');await build({root:snapshot,cacheDir:path.resolve('../cache-publicacion'),build:{outDir:output,emptyOutDir:false}});
 const r=spawnSync(process.execPath,['scripts/generar-seo.mjs','--outDir',output],{encoding:'utf8',windowsHide:true});process.stdout.write(r.stdout||'');process.stderr.write(r.stderr||'');if(r.status!==0)throw Error('Prerender limpio falló');
}else if(mode==='snapshot-docs'){
 const snapshot=path.resolve(base,'build-temporal/seleccion'),temp=path.resolve(base,'build-temporal');
 const {build}=await import('vitepress');await build(path.join(snapshot,'docs'),{outDir:path.join(temp,'docs-publicacion'),onAfterConfigResolve(c){c.tempDir=path.join(temp,'docs-ssr-publicacion');c.cacheDir=path.join(temp,'docs-cache-publicacion');c.vite={...c.vite,cacheDir:path.join(temp,'docs-vite-cache-publicacion')};}});
}else throw Error('Modo desconocido');
