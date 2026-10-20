import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='docs/evidencias/PYP-035';
const checks=[];const check=(name,fn)=>{try{fn();checks.push({name,ok:true});}catch(e){checks.push({name,ok:false,error:e.message});}};
for(const suffix of ['final-spa','final-ui']){
 const d=JSON.parse(fs.readFileSync(base+'/diagnostico-runtime-'+suffix+'.json','utf8'));
 check(suffix+' recorrido completo',()=>{assert(d.completed);assert.equal(d.exceptions.length,0);});
 check(suffix+' etiqueta original y destino correcto',()=>{assert(d.downloads.every(r=>r.status===200&&r.destinationPresent));assert(d.tagLoads.every(r=>r.snapshotHash===d.downloads[1].sha256));});
 const source=fs.readFileSync(base+'/build-temporal/diagnostico/gtag-'+suffix+'-1.js','utf8');
 const a=source.indexOf('"tags":')+7,b=source.indexOf('"predicates":',a),tags=JSON.parse(source.slice(a,b).trim().replace(/,$/,''));
 check(suffix+' historial/formularios efectivamente desactivados en configuración publicada',()=>{assert(!tags.some(t=>t.vtp_historyEvents===true));const settings=tags.find(t=>t.function==='__ogt_auto_events');assert.equal(settings.vtp_enableHistoryEvents,false);assert.equal(settings.vtp_enableForm,false);assert(!tags.some(t=>t.function.startsWith('__ccd_em_form')));});
 for(const s of d.steps){check(suffix+' '+s.run+' '+s.name,()=>{
  const noConsent=['unknown-home','denied-home','revoke-clg'].includes(s.name)||s.name.includes('after-revoke');
  assert.equal(s.publicViews,noConsent?0:1);assert.equal(s.networkViews.length,noConsent?0:1);
  if(noConsent){assert.equal(s.state.gaCookieCount,0);if(['unknown-home','denied-home'].includes(s.name))assert.equal(s.tagLoads,0);}
  else if(s.run==='classified')assert.equal(s.networkViews[0].originMarker,'app');
 });}
 check(suffix+' sin etiquetas ni configuraciones duplicadas',()=>{assert.equal(d.commands.filter(c=>c.kind==='config').length,d.tagLoads.length);assert(d.steps.every(s=>s.state.tagCount<=1&&s.state.allTagScripts.length<=1));});
 check(suffix+' sin envíos reales ni conversiones ficticias',()=>{assert(d.requests.every(r=>r.blocked));assert(!d.requests.flatMap(r=>r.events).some(e=>e.event==='generate_lead'));});
}
const edge=JSON.parse(fs.readFileSync(base+'/publicacion-final/navegador.json','utf8'));
check('Edge seis rutas, presentación e imágenes',()=>{assert.equal(edge.failed,0);assert.equal(edge.passed,46);assert.equal(edge.exceptions.length,0);});
const seo=JSON.parse(fs.readFileSync(base+'/seo-diagnostico.json','utf8'));
check('SEO seis rutas',()=>{assert.equal(seo.passed,77);assert.equal(seo.failed,0);});
const audit=JSON.parse(fs.readFileSync(base+'/npm-audit-publicacion.json','utf8').replace(/^\uFEFF/,''));
check('npm audit producción',()=>assert.equal(audit.metadata.vulnerabilities.total,0));
const result={date:'2026-10-20',externalGatePassed:checks.every(c=>c.ok),passed:checks.filter(c=>c.ok).length,failed:checks.filter(c=>!c.ok).length,checks,limits:'Etiqueta pública original ejecutada en build local; collect interceptado con 204 local. No prueba recepción ni producción. La publicación aún requiere validar selección y Git.'};
fs.writeFileSync(base+'/puerta-publicacion.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({passed:result.passed,failed:result.failed,externalGatePassed:result.externalGatePassed}));if(!result.externalGatePassed)process.exitCode=1;
