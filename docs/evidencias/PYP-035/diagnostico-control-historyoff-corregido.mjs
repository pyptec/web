import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
import {spawn,execFileSync} from 'node:child_process';
const base='docs/evidencias/PYP-035', root=path.resolve(base,'build-temporal/comercial-diagnostico');
const ID='G-WJ6METJRZD', origin='https://pyptecnologia.com';
const suffix=process.argv[2]||'original';
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const output={date:'2026-10-20',startedAt:new Date().toISOString(),suffix,downloads:[],steps:[],commands:[],requests:[],tagLoads:[],exceptions:[],checks:[]};
const publicUrl='https://www.googletagmanager.com/gtag/js?id='+ID;
// Controlled offline experiment: change ONLY destination historyEvents in the captured Google tag.
const observed=JSON.parse(fs.readFileSync(base+'/diagnostico-runtime-transporte204.json','utf8'));
output.downloads=observed.downloads;
const original=fs.readFileSync(path.resolve(base,'build-temporal/diagnostico/gtag-transporte204-1.js'));
if(createHash('sha256').update(original).digest('hex')!==observed.downloads[1].sha256)throw Error('Original snapshot hash mismatch');
const source=original.toString('utf8');
const pattern=/(\{"function":"__ccd_em_page_view"[^}]*"vtp_historyEvents":)true/g;
if([...source.matchAll(pattern)].length!==1)throw Error('Expected exactly one destination history setting');
const tag=Buffer.from(source.replace(pattern,'$1false'));
output.experiment={offlineOnly:true,sourceReport:'diagnostico-runtime-transporte204.json',originalHash:observed.downloads[1].sha256,executedHash:createHash('sha256').update(tag).digest('hex'),onlyChange:'__ccd_em_page_view/vtp_historyEvents:true → false',externalConfigurationChanged:false};
fs.writeFileSync(path.resolve(base,'build-temporal/diagnostico/gtag-control-historyoff.js'),tag);
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--disable-extensions','--disable-background-networking','--no-first-run','--no-default-browser-check','--host-resolver-rules=MAP * 127.0.0.1','--remote-debugging-port=9387','--user-data-dir='+path.resolve(base,'browser-profile/diagnostico-'+suffix), 'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws,seq=0,phase='setup',run='setup',mark=false,scriptId;
const pending=new Map();
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;const timer=setTimeout(()=>{pending.delete(id);reject(Error('CDP timeout '+method));},15000);pending.set(id,{resolve,reject,timer});ws.send(JSON.stringify({id,method,params}));});
const instrument=marked=>`(()=>{let fn;Object.defineProperty(window,'gtag',{configurable:true,get(){return fn},set(value){if(typeof value!=='function'){fn=value;return;}fn=function(...args){const c={kind:args[0],name:typeof args[1]==='string'?args[1]:null,path:args[2]?.page_path||null,sendPageView:args[2]?.send_page_view,source:(new Error()).stack.split('\\n').slice(2,5).join(' | ')};window.__pypObserve(JSON.stringify(c));if(${marked}&&args[0]==='event'&&args[1]==='page_view')args[2]={...args[2],pyp_diagnostic_origin:'app'};return value.apply(this,args);};}});document.addEventListener('submit',e=>e.preventDefault(),true);})()`;
const parseCollect=(request,u)=>{
 const query=new URLSearchParams(u.search),lines=request.postData?request.postData.split(/\r?\n/):[''];
 const records=[];
 for(const line of lines){const params=new URLSearchParams(query);for(const [k,v]of new URLSearchParams(line))params.set(k,v);if(!params.get('en'))continue;
 records.push({event:params.get('en'),destination:params.get('tid'),location:(()=>{try{return new URL(params.get('dl')).pathname;}catch{return null;}})(),originMarker:params.get('ep.pyp_diagnostic_origin'),autoMarker:params.get('_ee'),eventSequence:params.get('_s'),parameterNames:[...params.keys()].filter(k=>!['cid','sid','sct','_p','_s','_ga','_gcl_au'].includes(k)).sort()});}
 return records;
};
try {
 let targets;
 for(let i=0;i<100;i++){try{targets=await(await fetch('http://127.0.0.1:9387/json/list',{signal:AbortSignal.timeout(500)})).json();break;}catch{await delay(100);}}
 if(!targets)throw Error('Edge CDP unavailable');
 ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
 ws.onmessage=event=>{
  const m=JSON.parse(event.data);
  if(m.id&&pending.has(m.id)){const p=pending.get(m.id);clearTimeout(p.timer);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);return;}
  if(m.method==='Runtime.bindingCalled'){try{output.commands.push({run,phase,...JSON.parse(m.params.payload)});}catch{}}
  if(m.method==='Runtime.exceptionThrown')output.exceptions.push({run,phase,text:m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text});
  if(m.method==='Fetch.requestPaused')void(async()=>{
   const p=m.params,u=new URL(p.request.url),args={requestId:p.requestId};
   if(u.origin===origin&&['GET','HEAD'].includes(p.request.method)) {
    let file=path.join(root,decodeURIComponent(u.pathname));
    if(!file.startsWith(root+path.sep)&&file!==root)throw Error('Path outside artifact');
    if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
    if(!fs.existsSync(file))file=path.join(root,'index.html');
    const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml'};
    await call('Fetch.fulfillRequest',{...args,responseCode:200,responseHeaders:[{name:'Content-Type',value:types[path.extname(file)]||'application/octet-stream'}],body:fs.readFileSync(file).toString('base64')});return;
   }
   if(u.hostname==='www.googletagmanager.com'&&u.pathname==='/gtag/js'&&u.searchParams.get('id')===ID&&p.request.method==='GET') {
    output.tagLoads.push({run,phase,url:u.origin+u.pathname+'?id='+u.searchParams.get('id'),snapshotHash:output.experiment.executedHash});
    await call('Fetch.fulfillRequest',{...args,responseCode:200,responseHeaders:[{name:'Content-Type',value:'text/javascript'}],body:tag.toString('base64')});return;
   }
   // Every other request is paused and blocked, including collection GET/POST and all form methods.
   const events=parseCollect(p.request,u);output.requests.push({run,phase,observedAt:new Date().toISOString(),method:p.request.method,host:u.hostname,path:u.pathname,blocked:true,localResponse:events.length?204:null,events});if(events.length){await call('Fetch.fulfillRequest',{...args,responseCode:204,body:''});return;}
   await call('Fetch.failRequest',{...args,errorReason:'BlockedByClient'});
  })().catch(e=>output.exceptions.push({run,phase,text:String(e)}));
 };
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});
 output.browser=await call('Browser.getVersion');
 await call('Runtime.addBinding',{name:'__pypObserve'});
 await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 const until=async expr=>{for(let i=0;i<100;i++){if(await ev(expr))return;await delay(100);}throw Error('Timeout '+expr);};
 const visit=async route=>{await call('Page.navigate',{url:origin+route});await until('document.readyState==="complete" && !!document.querySelector("[aria-controls=analytics-preferences]")');};
 const click=async text=>{await ev('(()=>{const b=[...document.querySelectorAll("button")].find(b=>b.textContent.trim()==='+JSON.stringify(text)+');if(!b)throw Error("Missing button");b.click();})()');};
 const step=async(name,action,wait=7000)=>{
  phase=name;const ci=output.commands.length,ri=output.requests.length,ti=output.tagLoads.length;
  await action();await delay(wait);
  const cs=output.commands.slice(ci),rs=output.requests.slice(ri),events=rs.flatMap(r=>r.events);
  const state=await ev('({pathname:location.pathname,tagCount:document.querySelectorAll("#pyp-ga4").length,allTagScripts:[...document.scripts].filter(s=>/googletagmanager|google-analytics/.test(s.src)).map(s=>new URL(s.src).pathname),gaCookieCount:document.cookie.split(";").filter(c=>/^\\s*_ga(?:_|=)/.test(c)).length,disabled:window["ga-disable-G-WJ6METJRZD"]===true})');
  const summary={run,name,waitMs:wait,state,publicViews:cs.filter(c=>c.kind==='event'&&c.name==='page_view').length,configs:cs.filter(c=>c.kind==='config').length,tagLoads:output.tagLoads.length-ti,networkViews:events.filter(e=>e.event==='page_view'),allEventNames:events.map(e=>e.event)};
  output.steps.push(summary);console.log(JSON.stringify({run,name,app:summary.publicViews,network:summary.networkViews.length,tagLoads:summary.tagLoads,markers:summary.networkViews.map(v=>v.originMarker)}));
 };
 for(const marked of [true]){
  run=marked?'classified':'baseline';mark=marked;
  if(scriptId)await call('Page.removeScriptToEvaluateOnNewDocument',{identifier:scriptId});
  ({identifier:scriptId}=await call('Page.addScriptToEvaluateOnNewDocument',{source:instrument(marked)}));
  await call('Storage.clearDataForOrigin',{origin,storageTypes:'all'});
  await step('unknown-home',()=>visit('/'));
  await step('denied-home',()=>click('Rechazar analítica'));
  await step('accepted-home',async()=>{await click('Preferencias de analítica');await click('Aceptar analítica');},7000);
  await step('initial-home-saved-consent',()=>visit('/'),7000);
  await step('home-to-rpi-native-link',async()=>{await ev('document.querySelector("#proyecto-rpi-mdfr a").click()');await until('location.pathname==="/proyectos/rpi-mdfr/" && document.querySelector("h1")?.textContent.includes("RPI-MDFR")');},7000);
  await step('rpi-to-clg-router-history',async()=>{await ev('history.pushState({},"","/proyectos/clg/");dispatchEvent(new PopStateEvent("popstate"));');await until('document.querySelector("h1")?.textContent.includes("CLG")');});
  await step('history-back-rpi',async()=>{await ev('history.back()');await until('location.pathname==="/proyectos/rpi-mdfr/"');});
  await step('history-forward-clg',async()=>{await ev('history.forward()');await until('location.pathname==="/proyectos/clg/"');});
  await step('revoke-clg',async()=>{await click('Preferencias de analítica');await click('Rechazar analítica');});
  await step('history-back-after-revoke',async()=>{await ev('history.back()');await until('location.pathname==="/proyectos/rpi-mdfr/"');});
 }
 output.completed=true;
} catch(e){output.completed=false;output.error=String(e.stack||e);console.log(output.error);process.exitCode=1;}
finally {
 output.finishedAt=new Date().toISOString();
 output.limitations='Edge real headless, build local servido mediante CDP bajo origen simulado https://pyptecnologia.com, CONTROL OFFLINE: copia de la etiqueta original con único cambio historyEvents:false; no corresponde a configuración externa actual ni prueba corrección de producción. Todo collect interceptado con respuesta 204 local sin reenviar; restantes externos bloqueados antes de envío; no prueba recepción GA4 ni producción. Baseline observa gtag; classified añade solo marcador al evento manual para distinguirlo del automático. RPI→CLG usa History API y popstate porque no hay enlace directo en RPI; Inicio→RPI usa enlace HTML real y recarga documento. Ventanas de observación finitas. No se guardan IDs de cookies/sesión ni cuerpos brutos de collect.';
 fs.writeFileSync(base+'/diagnostico-runtime-'+suffix+'.json',JSON.stringify(output,null,2)+'\n');
 ws?.close();for(const p of pending.values())clearTimeout(p.timer);
 try{execFileSync('taskkill',['/PID',String(browser.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'});}catch{}
}
