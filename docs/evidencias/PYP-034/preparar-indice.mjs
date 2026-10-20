import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
const base='docs/evidencias/PYP-034';
const git=(args,input)=>execFileSync('git',args,{encoding:'utf8',input,windowsHide:true}).trim();
if(git(['branch','--show-current'])!=='main'||git(['rev-parse','HEAD'])!=='6dd7bbe5cafbfda5ed8605893f4bd78b619bae39'||git(['rev-parse','origin/main'])!==git(['rev-parse','HEAD'])||git(['diff','--name-only','--diff-filter=U']))throw Error('Estado Git distinto del revisado');
const code=['src/App.jsx','src/SiteRoutes.jsx','src/data/seo.js','src/data/structuredData.js','src/data/rpi-mdfr-meta.js','src/data/rpi-mdfr.js','src/lib/analytics.js','src/components/Analytics.jsx','src/components/AnalyticsConsent.jsx','src/pages/RpiMdfr.jsx','public/sitemap.xml','public/rpi-mdfr-infografia.png'];
const images=['rpi-mdfr-infografia.png',...JSON.parse(fs.readFileSync('docs/evidencias/PYP-032/imagenes-originales.json','utf8')).map(i=>i.name)].map(n=>'src/assets/proyectos/rpi-mdfr/'+n);
const docs=['docs/prompts/PYP-030.md','docs/prompts/PYP-031.md','docs/prompts/PYP-032.md','docs/prompts/PYP-034.md','docs/arquitectura/PYP-031-analytics.md','docs/arquitectura/PYP-032-rpi-mdfr.md'];
const roots=['docs/evidencias/PYP-030','docs/evidencias/PYP-031','docs/evidencias/PYP-032',base];
const evidence=git(['ls-files','--cached','--others','--exclude-standard','-z','--',...roots]).split('\0').filter(Boolean).filter(f=>f!=='docs/evidencias/PYP-034/diff-inicial.txt');
const files=[...new Set([...code,...images,...docs,...evidence,'docs/BITACORA_DESARROLLO.md','docs/prompts/index.md'])].sort();
const forbidden=files.filter(f=>/(?:^dist\/|^node_modules\/|\.env(?:\.|$)|browser-profile|build-temporal|PYP-0(?:19|22|23|24|28|29)\/|\.vitepress\/(?:dist|cache)|Appcopia)/.test(f));
if(forbidden.length)throw Error('Archivos fuera de alcance: '+forbidden.join(', '));
const patterns=[['private-key',/-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/],['github-token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/],['aws-access',/\bAKIA[0-9A-Z]{16}\b/],['slack-token',/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],['api-key',/\b(?:sk_live_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35})\b/]];
const findings=[];
for(const f of files){if(/\.(png|jpe?g|webp)$/i.test(f))continue;const content=fs.readFileSync(f,'utf8');for(const [rule,pattern] of patterns)if(pattern.test(content))findings.push({file:f,rule});}
const manifest={date:'2026-10-19',base:git(['rev-parse','HEAD']),files,codeFiles:code.length+images.length,documentationFiles:files.length-code.length-images.length,partialFiles:['docs/BITACORA_DESARROLLO.md','docs/prompts/index.md'],excluded:'Bajas raíz, PYP-024, cierre/documentación pendiente PYP-029, evidencias PYP-019/022/023/028/029, dist, dependencias, perfiles, builds y temporales quedan en el árbol sin incluir.',privacyGate:'Pendiente de configuración GA4 confirmada por el propietario; NO commit/push.',findings};
fs.writeFileSync(base+'/manifiesto.json',JSON.stringify(manifest,null,2)+'\n');
fs.writeFileSync(base+'/revision-secretos.json',JSON.stringify({date:'2026-10-19',filesReviewed:files.length,findings,limitations:'Patrones de credenciales conocidos más selección explícita de rutas. No se imprimen valores coincidentes ni se incluyen perfiles/env/archivos privados. G-WJ6METJRZD es identificador público.'},null,2)+'\n');
if(findings.length)throw Error('Revisar hallazgos antes de preparar el índice');
if(process.argv.includes('--stage')){
 const current=git(['diff','--cached','--name-only']);
 if(current.split('\n').filter(Boolean).some(f=>!files.includes(f)))throw Error('Índice contiene archivos ajenos al manifiesto');
 git(['add','--',...files.filter(f=>!manifest.partialFiles.includes(f))]);
 const oldBook=execFileSync('git',['show','HEAD:docs/BITACORA_DESARROLLO.md'],{encoding:'utf8'});
 const book=fs.readFileSync('docs/BITACORA_DESARROLLO.md','utf8');
 const start=book.search(/^## PYP-030 —/m);if(start<0)throw Error('Apéndices no encontrados');
 const oldIndex=execFileSync('git',['show','HEAD:docs/prompts/index.md'],{encoding:'utf8'});
 const index=fs.readFileSync('docs/prompts/index.md','utf8');
 const selectedLines=index.split(/\r?\n/).filter(l=>/^- \[PYP-0(?:30|31|32|34)\b/.test(l));if(selectedLines.length!==4)throw Error('Índice inesperado');
 const partial={'docs/BITACORA_DESARROLLO.md':oldBook.trimEnd()+'\n\n'+book.slice(start).trimEnd()+'\n','docs/prompts/index.md':oldIndex.trimEnd()+'\n\n'+selectedLines.join('\n\n')+'\n'};
 for(const f of manifest.partialFiles.filter(f=>f.endsWith('navegador.mjs'))) partial[f]=fs.readFileSync(f,'utf8').replace(/^[\t ]+$/gm,'');
 for(const [file,content] of Object.entries(partial)){
  const object=git(['hash-object','-w','--stdin'],content.replace(/\r\n/g,'\n'));
  git(['update-index','--cacheinfo','100644,'+object+','+file]);
 }
 const actual=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean).sort();
 const expected=files.filter(f=>git(['diff','--cached','--name-only','--',f])).sort();
 if(JSON.stringify(actual)!==JSON.stringify(expected))throw Error('Índice fuera del manifiesto');
 git(['diff','--cached','--check']);
 const result={date:'2026-10-19',files:actual.length,indexTree:git(['write-tree']),partialFiles:manifest.partialFiles,commitExecuted:false,pushExecuted:false,condition:manifest.privacyGate};
 fs.writeFileSync(base+'/indice-preparado.json',JSON.stringify(result,null,2)+'\n');
 fs.writeFileSync(base+'/staged-name-status.txt',git(['diff','--cached','--name-status'])+'\n');
 console.log(JSON.stringify(result));
}else console.log(JSON.stringify({files:files.length,codeFiles:manifest.codeFiles,documentationFiles:manifest.documentationFiles,secretFindings:findings.length,mode:'review-only'}));
