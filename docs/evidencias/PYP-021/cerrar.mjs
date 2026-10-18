import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {spawnSync} from 'node:child_process';
const base='docs/evidencias/PYP-021';
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const initial=JSON.parse(fs.readFileSync(base+'/integridad-inicial.json'));
const changes=initial.filter(r=>!fs.existsSync(r.path)||hash(r.path)!==r.sha256);
const git=args=>{const r=spawnSync('git',args,{encoding:'utf8'});return {exit:r.status,stdout:r.stdout.trim(),stderr:r.stderr.trim()};};
const files=['docs/prompts/PYP-021.md',base+'/resultado.md','docs/prompts/index.md','docs/BITACORA_DESARROLLO.md'];
const links=[];
for(const f of files){for(const m of fs.readFileSync(f,'utf8').matchAll(/\]\(([^)]+)\)/g)){const target=m[1];if(!/^https?:/.test(target)&&!target.startsWith('#'))links.push({source:f,target,exists:fs.existsSync(path.resolve(path.dirname(f),target.split('#')[0]))||target==='./validacion-final.json'});}}
const whitespace=files.flatMap(f=>fs.readFileSync(f,'utf8').split(/\r?\n/).flatMap((s,i)=>/[ \t]+$/.test(s)?[{file:f,line:i+1}]:[]));
const final={date:new Date().toISOString(),clientDate:'2026-10-18 America/Bogota',protectedCount:initial.length,protectedChanges:changes,distCount:initial.filter(r=>r.path.startsWith('dist/')).length,distUnchanged:!changes.some(r=>r.path.startsWith('dist/')),indexUnchanged:!changes.some(r=>r.path==='.git/index'),head:git(['rev-parse','HEAD']),remoteMain:git(['ls-remote','origin','refs/heads/main']),status:git(['status','--short']),trackedDiff:git(['diff','--name-only']),diffCheck:git(['diff','--check']),staged:git(['diff','--cached','--name-only']),links,brokenLinks:links.filter(l=>!l.exists),whitespace,xmlSitemap:'Parseado con PowerShell [xml], cuatro URLs',builds:'No ejecutados; no modifica dist',npmAudit:JSON.parse(fs.readFileSync(base+'/npm-audit-comando.json')),browserValidation:JSON.parse(fs.readFileSync(base+'/validaciones.json')).failures};
fs.writeFileSync(base+'/validacion-final.json',JSON.stringify(final,null,2)+'\n');
console.log(JSON.stringify({protectedCount:final.protectedCount,changes,distCount:final.distCount,indexUnchanged:final.indexUnchanged,status:final.status.stdout,tracked:final.trackedDiff.stdout,staged:final.staged.stdout,diffCheck:final.diffCheck.exit,brokenLinks:final.brokenLinks,whitespace,remote:final.remoteMain.stdout},null,2));
if(changes.length||final.brokenLinks.length||whitespace.length||final.diffCheck.exit||final.staged.stdout)process.exitCode=1;
