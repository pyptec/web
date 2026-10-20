import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base='docs/evidencias/PYP-034';
const before=JSON.parse(fs.readFileSync(base+'/integridad-inicial.json','utf8'));
const results=Object.entries(before).map(([file,hash])=>{
 const exists=fs.existsSync(file),identical=exists&&createHash('sha256').update(fs.readFileSync(file)).digest('hex')===hash;
 if(identical)return {file,ok:true,byteIdentical:true};
 if(file==='docs/evidencias/PYP-032/navegador.mjs'&&exists){
  const saved=JSON.parse(fs.readFileSync(base+'/navegador-PYP-032-original.json','utf8'));
  const preserved=createHash('sha256').update(Buffer.from(saved.originalSource)).digest('hex')===hash;
  const formatOnly=saved.originalSource.replace(/^[\t ]+$/gm,'')===fs.readFileSync(file,'utf8');
  return {file,ok:preserved&&formatOnly,byteIdentical:false,formatOnly,originalPreserved:preserved};
 }
 return {file,ok:false,byteIdentical:false};
});
const result={date:'2026-10-19',checked:results.length,distFiles:results.filter(r=>r.file.startsWith('dist/')).length,failed:results.filter(r=>!r.ok),branch:execFileSync('git',['branch','--show-current'],{encoding:'utf8'}).trim(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),results};
fs.writeFileSync(base+'/integridad-final.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(base+'/git-final.txt',execFileSync('git',['status','--short'],{encoding:'utf8'}));
console.log(JSON.stringify({checked:result.checked,distFiles:result.distFiles,failed:result.failed}));
if(result.failed.length||result.distFiles!==17)process.exitCode=1;
