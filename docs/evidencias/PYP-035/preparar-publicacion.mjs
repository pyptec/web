import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const base='docs/evidencias/PYP-035';
const git=(args,input)=>execFileSync('git',args,{encoding:'utf8',input,windowsHide:true,maxBuffer:32*1024*1024}).trim();
const previous=JSON.parse(fs.readFileSync('docs/evidencias/PYP-034/manifiesto.json','utf8'));
assert.equal(git(['branch','--show-current']),'main');assert.equal(git(['rev-parse','HEAD']),previous.base);assert.equal(git(['diff','--name-only','--diff-filter=U']),'');
assert(JSON.parse(fs.readFileSync(base+'/puerta-publicacion.json','utf8')).externalGatePassed);
const staged=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean);assert(staged.every(f=>previous.files.includes(f)||f.startsWith(base+'/')||f.startsWith('docs/prompts/PYP-035')||['docs/arquitectura/index.md','docs/arquitectura/PYP-035-ga4.md'].includes(f)));
const added=git(['ls-files','--cached','--others','--exclude-standard','-z','--',base,'docs/prompts/PYP-035*']).split('\0').filter(Boolean).filter(f=>f!==base+'/diff-comercial-inicial.patch'&&f!==base+'/preparacion-publicacion.txt');
const partial=['docs/BITACORA_DESARROLLO.md','docs/prompts/index.md'];
const files=[...new Set([...previous.files,...added,'docs/arquitectura/PYP-035-ga4.md','docs/arquitectura/index.md'])].sort();
assert(files.every(f=>!/(?:^dist\/|^node_modules\/|\.env(?:\.|$)|browser-profile|build-temporal|\.vitepress\/(?:dist|cache)|PYP-0(?:19|22|23|24|28|29)\/)/.test(f)));
const book=fs.readFileSync(partial[0],'utf8'),start=book.search(/^## PYP-030 —/m);assert(start>=0);
const index=fs.readFileSync(partial[1],'utf8');
const lines=index.split(/\r?\n/).filter(l=>/^- \[PYP-0(?:30|31|32|34|35)\b/.test(l));assert(lines.length>=8);
const contents={
 [partial[0]]:git(['show','HEAD:'+partial[0]])+'\n\n'+book.slice(start).trimEnd()+'\n',
 [partial[1]]:git(['show','HEAD:'+partial[1]])+'\n\n'+lines.join('\n\n')+'\n'
};
const patterns=[['private-key',/-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/],['github-token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/],['aws-access',/\bAKIA[0-9A-Z]{16}\b/],['slack-token',/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],['api-key',/\b(?:sk_live_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35})\b/]];
const findings=[];for(const f of files){if(/\.(png|jpe?g|webp)$/i.test(f))continue;const content=contents[f]??fs.readFileSync(f,'utf8');for(const [rule,re]of patterns)if(re.test(content))findings.push({file:f,rule});}
const manifest={date:'2026-10-20',base:previous.base,files,partialFiles:partial,findings,externalGatePassed:true,excluded:'Bajas raíz y trabajo ajeno PYP-019/022/023/024/028/029, dist, dependencias, perfiles, temporales y patches brutos excluidos.'};
fs.writeFileSync(base+'/manifiesto-publicacion.json',JSON.stringify(manifest,null,2)+'\n');assert.equal(findings.length,0,'Hallazgos de credenciales; no preparar índice');
if(process.argv.includes('--stage')){
 const whole=files.filter(f=>!partial.includes(f));for(let i=0;i<whole.length;i+=40)git(['add','--',...whole.slice(i,i+40)]);
 for(const [file,source]of Object.entries(contents)){const hash=git(['hash-object','-w','--stdin'],source.replace(/\r\n/g,'\n'));git(['update-index','--cacheinfo','100644,'+hash+','+file]);}
 git(['diff','--cached','--check']);const actual=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean);assert(actual.every(f=>files.includes(f)));
 fs.writeFileSync(base+'/staged-publicacion.txt',git(['diff','--cached','--name-status'])+'\n');
 console.log(JSON.stringify({files:actual.length,tree:git(['write-tree']),secretFindings:findings.length,mode:'staged-selectively'}));
}else console.log(JSON.stringify({files:files.length,secretFindings:findings.length,mode:'review-only'}));
