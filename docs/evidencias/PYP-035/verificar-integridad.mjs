import fs from 'node:fs';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
const base='docs/evidencias/PYP-035';
const git=args=>execFileSync('git',args,{encoding:'utf8',windowsHide:true});
const before=JSON.parse(fs.readFileSync(base+'/dist-inicial.json','utf8').replace(/^\uFEFF/,''));
const dist=before.map(x=>({file:x.path,ok:fs.existsSync(x.path)&&createHash('sha256').update(fs.readFileSync(x.path)).digest('hex').toUpperCase()===x.hash}));
const initialDiff=fs.readFileSync(base+'/diff-comercial-inicial.patch','utf8').replace(/^\uFEFF/,'').replace(/\r\n/g,'\n').trimEnd();
const codeUnchanged=initialDiff===git(['diff','HEAD','--','src','public']).replace(/\r\n/g,'\n').trimEnd();
const staged=git(['diff','--cached','--name-only','-z']).split('\0').filter(Boolean);
const patterns=[['private-key',/-----BEGIN (?:RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----/],['github-token',/\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/],['aws-access',/\bAKIA[0-9A-Z]{16}\b/],['slack-token',/\bxox[baprs]-[A-Za-z0-9-]{20,}\b/],['api-key',/\b(?:sk_live_[A-Za-z0-9]{20,}|AIza[0-9A-Za-z_-]{35})\b/]];
const findings=[];
for(const file of staged){if(/\.(png|jpe?g|webp)$/i.test(file))continue;const content=git(['show',':'+file]);for(const [rule,re] of patterns)if(re.test(content))findings.push({file,rule});}
const forbidden=staged.filter(f=>/(?:^dist\/|^node_modules\/|\.env(?:\.|$)|browser-profile|build-temporal|\.vitepress\/(?:dist|cache))/.test(f));
const result={date:'2026-10-20',branch:git(['branch','--show-current']).trim(),head:git(['rev-parse','HEAD']).trim(),unmerged:git(['diff','--name-only','--diff-filter=U']).trim(),distCount:dist.length,dist,commercialSourcesUnchanged:codeUnchanged,stagedFiles:staged.length,forbidden,secretFindings:findings,limitations:'Revisión por patrones conocidos del índice preparado; no certifica ausencia absoluta de secretos. Archivos ajenos no se añaden.'};
fs.writeFileSync(base+'/integridad-revision.json',JSON.stringify(result,null,2)+'\n');
fs.writeFileSync(base+'/git-final.txt',git(['status','--short']));
console.log(JSON.stringify({distCount:dist.length,distUnchanged:dist.every(x=>x.ok),commercialSourcesUnchanged:codeUnchanged,stagedFiles:staged.length,forbidden,secretFindings:findings,unmerged:result.unmerged}));
if(dist.length!==17||dist.some(x=>!x.ok)||!codeUnchanged||findings.length||forbidden.length||result.unmerged)process.exitCode=1;
