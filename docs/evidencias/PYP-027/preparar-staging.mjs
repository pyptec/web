import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import{spawnSync}from'node:child_process';
const base='docs/evidencias/PYP-027';
const git=(args,input)=>{const r=spawnSync('git',args,{encoding:'utf8',input});if(r.status!==0)throw Error(r.stderr||r.stdout);return r.stdout.trim();};
if(git(['branch','--show-current'])!=='main'||git(['rev-list','--left-right','--count','main...origin/main']).replace(/\s+/g,' ')!=='0 0'||git(['diff','--cached','--name-only']))throw Error('Estado Git inesperado');
const preliminary=JSON.parse(fs.readFileSync(base+'/manifiesto-preliminar.json'));
const evidence=git(['ls-files','--others','--exclude-standard','docs/evidencias/PYP-025','docs/evidencias/PYP-026','docs/evidencias/PYP-027']).split('\n').filter(Boolean);
const files=[...new Set([...preliminary.files.filter(p=>!p.startsWith('docs/evidencias/')), ...evidence,base+'/manifiesto.json'])].sort();
const manifest={date:new Date().toISOString(),base:git(['rev-parse','HEAD']),files,partial:['docs/BITACORA_DESARROLLO.md','docs/prompts/index.md'],excluded:preliminary.exclude,notes:'Documentación PYP-024 conservada solo en working tree; evidencia y scripts reproducibles son documentación, no builds/perfiles.'};
fs.writeFileSync(base+'/manifiesto.json',JSON.stringify(manifest,null,2)+'\n');
for(const p of files){if(!fs.existsSync(p)||/build-temporal|browser-profile|^dist\//.test(p))throw Error('Ruta inválida '+p);}
const partial=manifest.partial;
git(['add','--',...files.filter(p=>!partial.includes(p))]);
for(const p of partial){let text=fs.readFileSync(p,'utf8');if(p.includes('BITACORA')){const start=text.indexOf('## PYP-024 —'),end=text.indexOf('## PYP-025 —');if(start<0||end<start)throw Error('Sección PYP-024 inesperada');text=text.slice(0,start)+text.slice(end);}else{text=text.split(/\r?\n/).filter(line=>!line.includes('[PYP-024 —')).join('\n');}const blob=git(['hash-object','-w','--stdin'],text);git(['update-index','--add','--cacheinfo','100644,'+blob+','+p]);}
const actual=git(['diff','--cached','--name-only']).split('\n');if(JSON.stringify(actual.sort())!==JSON.stringify(files))throw Error('Staging no coincide');
const check=spawnSync('git',['diff','--cached','--check'],{encoding:'utf8'});fs.writeFileSync(base+'/staged-check.txt',(check.stdout||'')+(check.stderr||'')+'\nexitCode: '+check.status+'\n');if(check.status!==0)throw Error('diff cached check falló');
fs.writeFileSync(base+'/staged-name-status.txt',git(['diff','--cached','--name-status'])+'\n');
const snapshot=path.resolve(base,'build-temporal/staged');if(!snapshot.startsWith(path.resolve(base)+path.sep)||fs.existsSync(snapshot))throw Error('Destino snapshot inesperado');fs.mkdirSync(snapshot,{recursive:true});git(['checkout-index','--prefix='+snapshot.replaceAll('\\','/')+'/','-a']);
console.log(JSON.stringify({stagedFiles:files.length,manifest:base+'/manifiesto.json',source:files.filter(p=>!p.startsWith('docs/')),documentationFiles:files.filter(p=>p.startsWith('docs/')).length,snapshot,check:check.status}));
