import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
const base='docs/evidencias/PYP-025';
const save=(n,o)=>fs.writeFileSync(base+'/'+n,JSON.stringify(o,null,2)+'\n');
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-extensions','--remote-debugging-port=9364','--user-data-dir='+path.resolve(base,'browser-profile'),'about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let ws,seq=0;const pending=new Map(),results=[],consoleEvents=[],network=[],failures=[],blocked=[],requests=new Map();
let context={};
try{
let targets;for(let i=0;i<80;i++){try{targets=await(await fetch('http://127.0.0.1:9364/json/list')).json();break;}catch{await delay(100);}}
if(!targets)throw Error('Edge no disponible');
ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++seq;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);}
if(m.method==='Network.requestWillBeSent')requests.set(m.params.requestId,{url:m.params.request.url,method:m.params.request.method});
if(m.method==='Network.responseReceived')network.push({...context,url:m.params.response.url,status:m.params.response.status,mime:m.params.response.mimeType,type:m.params.type});
if(m.method==='Network.loadingFailed')failures.push({...context,...requests.get(m.params.requestId),error:m.params.errorText,canceled:m.params.canceled});
if(m.method==='Runtime.exceptionThrown')consoleEvents.push({...context,type:'exception',details:m.params.exceptionDetails});
if(m.method==='Runtime.consoleAPICalled'&&['error','warning'].includes(m.params.type))consoleEvents.push({...context,type:m.params.type,args:m.params.args.map(a=>a.value||a.description)});
if(m.method==='Log.entryAdded'&&['error','warning'].includes(m.params.entry.level))consoleEvents.push({...context,type:'log',entry:m.params.entry});
if(m.method==='Fetch.requestPaused'){const p=m.params,allowed=['GET','HEAD'].includes(p.request.method);if(!allowed)blocked.push({url:p.request.url,method:p.request.method});call(allowed?'Fetch.continueRequest':'Fetch.failRequest',{requestId:p.requestId,...(allowed?{}:{errorReason:'BlockedByClient'})}).catch(()=>{});}
};
const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
const until=async expr=>{for(let i=0;i<100;i++){if(await ev(expr))return;await delay(100);}throw Error('Timeout '+expr);};
const click=async selector=>{await ev('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"nearest",inline:"nearest"})');const p=await ev('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()');await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...p});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...p});await delay(150);};
const visit=async route=>{await call('Page.navigate',{url:'http://127.0.0.1:54186'+route});await until('location.hostname==="127.0.0.1" && !!document.querySelector("header button[aria-controls]") && !!document.querySelector("main")');await until('document.readyState==="complete"');await ev('document.fonts.ready.then(()=>true)');await delay(150);};
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Log.enable');await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
await call('Page.addScriptToEvaluateOnNewDocument',{source:"(()=>{window.__pypVitals={lcp:null,cls:0};try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__pypVitals.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__pypVitals.cls+=e.value}).observe({type:'layout-shift',buffered:true})}catch{}})()"});

await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
await visit('/proyectos/clg/');
await delay(1000);
const before=await ev('({url:location.href,schema:JSON.parse(document.getElementById("page-structured-data").textContent),vitals:window.__pypVitals,images:[...document.querySelectorAll("main img")].map(i=>({alt:i.alt,width:i.getAttribute("width"),height:i.getAttribute("height"),loading:i.loading})),headings:[...document.querySelectorAll("h1,h2,h3")].map(e=>({level:e.tagName,text:e.textContent})),unnamedLinks:[...document.querySelectorAll("a")].filter(a=>!a.textContent.trim()&&!a.getAttribute("aria-label")&&!a.querySelector("img[alt]")).length})');
await click('header a[href="/#contacto"]');
await until('location.pathname==="/"&&location.hash==="#contacto"&&document.activeElement.id==="contacto"');
const after=await ev('({url:location.href,title:document.title,schemaPresent:!!document.getElementById("page-structured-data"),canonical:document.querySelector("link[rel=canonical]").href})');
await ev('history.back()');
await until('location.pathname.startsWith("/proyectos/clg")&&!!document.getElementById("page-structured-data")');
const restored=await ev('({url:location.href,canonical:document.querySelector("link[rel=canonical]").href,graphCount:document.querySelectorAll("#page-structured-data").length,product:JSON.parse(document.getElementById("page-structured-data").textContent)["@graph"].filter(x=>x["@type"]==="Product").length})');
save('interacciones.json',{date:new Date().toISOString(),before,after,restored,consoleEvents,failures,networkErrors:network.filter(n=>n.status>=400),blocked,limitations:'LCP/CLS locales de laboratorio en una visita, sin INP de campo ni auditoría WCAG completa.'});
if(after.schemaPresent||after.canonical!=='https://pyptecnologia.com/'||restored.graphCount!==1||restored.product!==1||before.unnamedLinks!==0||!before.images.every(i=>i.alt&&Number(i.width)>0&&Number(i.height)>0)||consoleEvents.length||failures.length||network.some(n=>n.status>=400))throw Error('Fallo de interacción/semántica');
console.log(JSON.stringify({structuredDataRemoved:true,restored:true,images:before.images.length,vitals:before.vitals,consoleErrors:consoleEvents.length}));
await call('Browser.close').catch(()=>{});
}catch(e){save('interacciones-error.json',{error:String(e),consoleEvents,failures});console.error(e);process.exitCode=1;}finally{ws?.close();browser.kill();}
