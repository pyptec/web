import fs from 'node:fs';
import {createHash} from 'node:crypto';
const records=[];
for(const url of ['https://www.googletagmanager.com/gtag/js?id=G-WJ6METJRZD','https://www.googletagmanager.com/gtag/js?id=G-WJ6METJRZD&pyp_final='+Date.now()]){
 const r=await fetch(url,{headers:{'Cache-Control':'no-cache','Pragma':'no-cache'},signal:AbortSignal.timeout(30000)}),bytes=Buffer.from(await r.arrayBuffer()),source=bytes.toString();
 const a=source.indexOf('"tags":')+7,b=source.indexOf('"predicates":',a),tags=JSON.parse(source.slice(a,b).trim().replace(/,$/,''));
 records.push({url,finalUrl:r.url,status:r.status,observedAt:new Date().toISOString(),sha256:createHash('sha256').update(bytes).digest('hex'),headers:Object.fromEntries([...r.headers].filter(([k])=>['date','age','cache-control','expires','etag','last-modified','content-type','vary','via'].includes(k))),destinationTags:tags.filter(t=>t.vtp_instanceDestinationId==='G-WJ6METJRZD'&&['__ccd_em_page_view','__ccd_em_form'].includes(t.function))});
}
fs.writeFileSync('docs/evidencias/PYP-035/ga4-publicacion-consulta-final.json',JSON.stringify({date:'2026-10-20',records},null,2)+'\n');
console.log(JSON.stringify(records.map(r=>({url:r.url,status:r.status,tags:r.destinationTags}))));
