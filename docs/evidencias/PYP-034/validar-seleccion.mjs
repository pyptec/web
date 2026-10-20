import fs from 'node:fs';
import path from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';
const repo=process.cwd(),base='docs/evidencias/PYP-034';
const tree=execFileSync('git',['write-tree'],{encoding:'utf8'}).trim();
const root=path.resolve(base,'build-temporal/seleccion-'+tree.slice(0,12));
if(!root.startsWith(path.resolve(base,'build-temporal')+path.sep)||fs.existsSync(root))throw Error('Destino inesperado o existente');
fs.mkdirSync(root,{recursive:true});
const archive=path.resolve(base,'build-temporal/seleccion.tar');
execFileSync('git',['archive','--format=tar','-o',archive,tree],{windowsHide:true});
execFileSync('tar',['-xf',archive,'-C',root],{windowsHide:true});
const commandResults=[];
function run(label,args,cwd=root){
 const r=spawnSync(process.execPath,args,{cwd,encoding:'utf8',windowsHide:true,maxBuffer:20*1024*1024});
 fs.writeFileSync(path.resolve(repo,base,label+'.txt'),(r.stdout||'')+(r.stderr||''));
 commandResults.push({label,code:r.status});
 if(r.status!==0)throw Error(label+' falló con '+r.status);
 console.log(label+': 0');
}
const out=path.join(root,base,'build-temporal/comercial');
let result;
try{
 run('build-seleccion',[path.join(repo,'node_modules/vite/bin/vite.js'),'build','--outDir',out]);
 run('prerender-seleccion',[path.join(root,'scripts/generar-seo.mjs'),'--outDir',out]);
 run('seo-seleccion',[path.join(repo,base,'validar-seo.mjs'),out],repo);
 run('docs-seleccion',[path.join(repo,'node_modules/vitepress/bin/vitepress.js'),'build','docs']);
 const manifest=JSON.parse(fs.readFileSync(path.join(repo,base,'manifiesto.json'),'utf8'));
 const source=manifest.files.filter(f=>f.startsWith('src/')||f.startsWith('public/'));
 const endOfLineNormalized=[];
 const unchanged=source.every(f=>{
  const local=fs.readFileSync(path.join(repo,f)),selected=fs.readFileSync(path.join(root,f));
  if(local.equals(selected))return true;
  if(/\.(png|jpe?g|webp)$/i.test(f))return false;
  const same=local.toString('utf8').replace(/\r\n/g,'\n')===selected.toString('utf8').replace(/\r\n/g,'\n');
  if(same)endOfLineNormalized.push(f);
  return same;
 });
 if(!unchanged)throw Error('Fuentes distintas de la selección');
 const forms=['/','/proyectos/clg/','/proyectos/rpi-mdfr/','/monitoreo-energetico/','/iot-industrial/','/automatizacion-edge/'].map(route=>({route,ok:fs.readFileSync(out+(route==='/'?'/':route)+'index.html','utf8').match(/<form\b[\s\S]*?<\/form>/)?.[0]?.replace(/\r\n/g,'\n')===fs.readFileSync(path.join(repo,'index.html'),'utf8').match(/<form\b[\s\S]*?<\/form>/)?.[0]?.replace(/\r\n/g,'\n')}));
 if(forms.some(f=>!f.ok))throw Error('Formulario estático diferente');
 result={date:'2026-10-19',passed:true,indexTree:tree,sourceFilesCompared:source.length,sameSources:unchanged,endOfLineNormalized,forms,commands:commandResults,artifact:out,commitExecuted:false,pushExecuted:false,privacyGate:'Pendiente, confirmado por propietario. Validar selección no habilita publicación sin completar GA4.'};
}catch(e){result={date:'2026-10-19',passed:false,indexTree:tree,commands:commandResults,error:e.message};process.exitCode=1;}
fs.writeFileSync(path.join(repo,base,'seleccion-validada.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({passed:result.passed,commands:commandResults,error:result.error}));
