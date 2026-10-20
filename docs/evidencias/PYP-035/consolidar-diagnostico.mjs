import fs from 'node:fs';
import assert from 'node:assert/strict';
const base='docs/evidencias/PYP-035';
const read=name=>JSON.parse(fs.readFileSync(base+'/'+name,'utf8'));
const baseline=read('diagnostico-runtime-transporte204.json'),uiBefore=read('diagnostico-runtime-interfaz204-v2.json'),uiAfter=read('diagnostico-runtime-interfaz-corregida.json'),control=read('diagnostico-runtime-control-corregido.json');
const checks=[];
const check=(name,fn)=>{try{fn();checks.push({name,ok:true});}catch(e){checks.push({name,ok:false,error:e.message});}};
const step=(d,name,run='classified')=>d.steps.find(s=>s.name===name&&s.run===run);
for(const [name,d]of Object.entries({baseline,uiBefore,uiAfter,control})){
 check(name+' recorrido completo sin excepciones',()=>{assert.equal(d.completed,true);assert.equal(d.exceptions.length,0);});
 check(name+' sin consentimiento/rechazo: cero carga, vistas y cookies',()=>{for(const name of ['unknown-home','denied-home']){const s=step(d,name);assert.equal(s.publicViews,0);assert.equal(s.networkViews.length,0);assert.equal(s.tagLoads,0);assert.equal(s.state.gaCookieCount,0);}});
 check(name+' revocación y retorno: cero recopilación/cookies',()=>{for(const s of d.steps.filter(s=>s.name==='revoke-clg'||s.name.includes('after-revoke'))){assert.equal(s.publicViews,0);assert.equal(s.networkViews.length,0);assert.equal(s.state.gaCookieCount,0);assert.equal(s.state.disabled,true);}});
 check(name+' una configuración por carga, ninguna etiqueta extra',()=>{assert.equal(d.commands.filter(c=>c.kind==='config').length,d.tagLoads.length);assert(d.steps.every(s=>s.state.tagCount<=1&&s.state.allTagScripts.length<=1));assert(d.requests.every(r=>!(r.host==='www.googletagmanager.com'&&['/gtm.js','/gtag/js'].includes(r.path))));});
 check(name+' todo collect interceptado; sin lead ni formulario',()=>{assert(d.requests.every(r=>r.blocked));assert(d.requests.flatMap(r=>r.events).every(e=>e.destination==='G-WJ6METJRZD'&&!['generate_lead','form_start','form_submit'].includes(e.event)));assert(!d.requests.some(r=>r.host==='pyptecnologia.com'&&r.method==='POST'));});
}
for(const name of ['rpi-to-clg-router-history','history-back-rpi','history-forward-clg']){
 check('Duplicación demostrada '+name,()=>{const s=step(baseline,name);assert.equal(s.publicViews,1);assert.equal(s.networkViews.length,2);assert.equal(s.networkViews.filter(e=>e.originMarker==='app').length,1);assert.equal(s.networkViews.filter(e=>e.originMarker===null).length,1);assert.equal(new Set(s.networkViews.map(e=>e.eventSequence)).size,2);assert.equal(new Set(s.networkViews.map(e=>e.location)).size,1);});
 check('Marcador no causa duplicación '+name,()=>assert.equal(step(baseline,name,'baseline').networkViews.length,step(baseline,name).networkViews.length));
 check('Control offline solo historial desactivado elimina duplicación '+name,()=>{const s=step(control,name);assert.equal(s.publicViews,1);assert.equal(s.networkViews.length,1);assert.equal(s.networkViews[0].originMarker,'app');});
}
check('Enlace real RPI→Inicio duplica sin dos llamadas de aplicación',()=>{const s=step(uiAfter,'rpi-to-home-real-header');assert.equal(s.publicViews,1);assert.equal(s.networkViews.length,2);assert.equal(s.networkViews.filter(e=>e.originMarker==='app').length,1);});
for(const name of ['history-back-home-real-ui','history-forward-clg-real-ui'])check('Corrección BFCache '+name,()=>{assert.equal(step(uiBefore,name).publicViews,0);const s=step(uiAfter,name);assert.equal(s.publicViews,1);assert.equal(s.networkViews.length,1);assert.equal(s.tagLoads,0);assert.equal(s.configs,0);});
for(const name of ['accepted-home','initial-home-saved-consent','home-to-rpi-native-link','home-to-clg-real-card'])check('Vista inicial/documento único '+name,()=>{const s=step(uiAfter,name);assert.equal(s.publicViews,1);assert.equal(s.networkViews.length,1);});
const matrix=uiAfter.steps.map(s=>({scenario:s.name,app:s.publicViews,networkPageViews:s.networkViews.length,automatic:s.networkViews.filter(e=>e.originMarker===null).length,tagLoads:s.tagLoads,cookies:s.state.gaCookieCount}));
const result={date:'2026-10-20',passed:checks.filter(c=>c.ok).length,failed:checks.filter(c=>!c.ok).length,publicationReady:false,blocker:'Etiqueta pública ejecutada genera page_view adicional por historial. Corrección BFCache local verificada; corrección externa no realizada.',checks,matrix,externalCorrectionRequired:'Publicar configuración efectiva __ccd_em_page_view/historyEvents:false para G-WJ6METJRZD y repetir diagnóstico con etiqueta original sin modificar.',controlWarning:'El control cambia una copia local, no la propiedad GA4; no prueba corrección pública ni recepción de eventos.'};
fs.writeFileSync(base+'/diagnostico-consolidado.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({passed:result.passed,failed:result.failed,matrix},null,2));
if(result.failed)process.exitCode=1;
