import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const base='docs/evidencias/PYP-028';
function run(name,command,args,options={}) {
  const attempt=fs.readdirSync(base).filter(f=>f.startsWith(name+'-')&&f.endsWith('.stdout.txt')).length+1;
  const stem=name+'-'+String(attempt).padStart(2,'0');
  const start=Date.now(),r=spawnSync(command,args,{encoding:'utf8',timeout:240000,...options});
  const stdout=base+'/'+stem+'.stdout.txt',stderr=base+'/'+stem+'.stderr.txt';
  fs.writeFileSync(stdout,r.stdout||'');fs.writeFileSync(stderr,r.stderr||'');
  const info={date:new Date().toISOString(),command,args,exitCode:r.status,elapsedMs:Date.now()-start,error:r.error?.message,stdout,stderr};
  fs.writeFileSync(base+'/'+name+'.json',JSON.stringify(info,null,2)+'\n');
  console.log(JSON.stringify(info));if(r.status!==0)throw Error(name+' falló');return info;
}
if(process.argv[2]==='docs')run('build-docs',process.execPath,[base+'/build-docs.mjs']);
else if(process.argv[2]==='seo')run('generacion-seo',process.execPath,['scripts/generar-seo.mjs','--outDir',path.resolve(base,'build-temporal/comercial')]);
else if(process.argv[2]==='audit')run('npm-audit-produccion','npm.cmd',['audit','--omit=dev','--json'],{shell:true});
else {
  run('build-comercial',process.execPath,[base+'/build-comercial.mjs']);
  run('generacion-seo',process.execPath,['scripts/generar-seo.mjs','--outDir',path.resolve(base,'build-temporal/comercial')]);
}
