import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const base='docs/evidencias/PYP-022';
function run(name,command,args,options={}){const start=Date.now(),r=spawnSync(command,args,{encoding:'utf8',timeout:240000,...options});fs.writeFileSync(base+'/'+name+'.stdout.txt',r.stdout||'');fs.writeFileSync(base+'/'+name+'.stderr.txt',r.stderr||'');const info={date:new Date().toISOString(),command,args,exitCode:r.status,elapsedMs:Date.now()-start,error:r.error?.message};fs.writeFileSync(base+'/'+name+'.json',JSON.stringify(info,null,2)+'\n');console.log(JSON.stringify(info));if(r.status!==0)throw Error(name+' falló');return r;}
if(process.argv[2]==='docs')run('build-docs',process.execPath,[base+'/build-docs.mjs']);
else{
run('build-comercial',process.execPath,[base+'/build-comercial.mjs']);
run('generacion-seo',process.execPath,['scripts/generar-seo.mjs','--outDir',path.resolve(base,'build-temporal/comercial')]);
fs.copyFileSync(base+'/build-temporal/comercial/sitemap.xml','public/sitemap.xml');
const audit=run('npm-audit-produccion','npm.cmd',['audit','--omit=dev','--json'],{shell:true});
JSON.parse(audit.stdout);
}
