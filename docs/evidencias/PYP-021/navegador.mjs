import fs from 'node:fs';
import path from 'node:path';
import {spawn} from 'node:child_process';
const base='docs/evidencias/PYP-021';
const save=(n,o)=>fs.writeFileSync(base+'/'+n,JSON.stringify(o,null,2)+'\n');
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-extensions','--remote-debugging-port=9361','--user-data-dir='+path.resolve(base,'browser-profile'),'about:blank'],{windowsHide:true,stdio:'ignore'});
const delay=ms=>new Promise(r=>setTimeout(r,ms));
let ws,seq=0;const pending=new Map(),results=[],consoleEvents=[],network=[],failures=[],blocked=[],requests=new Map();
let context={};
try{
let targets;for(let i=0;i<80;i++){try{targets=await(await fetch('http://127.0.0.1:9361/json/list')).json();break;}catch{await delay(100);}}
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
const visit=async route=>{await call('Page.navigate',{url:'https://pyptecnologia.com'+route});await until('location.hostname==="pyptecnologia.com" && !!document.querySelector("header button[aria-controls]") && !!document.querySelector("main")');await delay(500);};
await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Network.setCacheDisabled',{cacheDisabled:true});await call('Log.enable');await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
const routes=['/','/monitoreo-energetico','/monitoreo-energetico/','/iot-industrial','/iot-industrial/','/automatizacion-edge','/automatizacion-edge/'];
for(const width of [1440,375]){
await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width===375});
for(const route of routes){
context={width,route};try{
await visit(route);
const state=await ev('({url:location.href,title:document.title,description:document.querySelector("meta[name=description]")?.content,canonical:document.querySelector("link[rel=canonical]")?.href,og:Object.fromEntries([...document.querySelectorAll("meta[property^=\\"og:\\"]")].map(m=>[m.getAttribute("property"),m.content])),headers:document.querySelectorAll("header").length,h1:document.querySelector("h1")?.textContent,overflow:document.documentElement.scrollWidth>innerWidth,external:[...document.querySelectorAll("header a")].filter(a=>a.href.includes("iotrack.com.co")).map(a=>({href:a.href,target:a.target,rel:a.rel})),links:[...document.querySelectorAll("a[href]")].map(a=>({text:a.textContent.trim(),href:a.getAttribute("href")})),forms:[...document.querySelectorAll("form[name=\\"contacto-pyp\\"]")].map(f=>({hidden:f.hidden,method:f.method,netlify:f.getAttribute("data-netlify"),honeypot:f.getAttribute("netlify-honeypot"),fields:[...f.querySelectorAll("[name]")].map(e=>({name:e.name,type:e.type,required:e.required,value:e.name==="form-name"?e.value:undefined}))}))})');
await click('header button[aria-controls]');state.menuOpened=await ev('document.querySelector("header button").getAttribute("aria-expanded")==="true"');state.active=await ev('document.querySelector("header a[aria-current=page]")?.getAttribute("href")||null');
await call('Input.dispatchKeyEvent',{type:'keyDown',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});await call('Input.dispatchKeyEvent',{type:'keyUp',key:'Escape',code:'Escape',windowsVirtualKeyCode:27});
state.escapeClosed=await ev('document.querySelector("header button").getAttribute("aria-expanded")==="false"&&document.activeElement===document.querySelector("header button")');
state.sections=[];
const anchors=await ev('[...document.querySelectorAll("nav[aria-label=\\"Secciones de esta página\\"] a")].map(a=>a.getAttribute("href"))');
for(const href of anchors){await click('nav[aria-label="Secciones de esta página"] a[href='+JSON.stringify(href)+']');await delay(200);state.sections.push(await ev('(()=>{const id='+JSON.stringify(href.split('#')[1])+',t=document.getElementById(id),h=t?.querySelector("h2,h3,h4")||t;return {id,hash:location.hash,exists:!!t,focus:document.activeElement?.id,scrollY,headingTop:h?.getBoundingClientRect().top,headerBottom:document.querySelector("header").getBoundingClientRect().bottom,visible:!!h&&h.getBoundingClientRect().top>=document.querySelector("header").getBoundingClientRect().bottom-2}})()'));}
await ev('window.scrollTo({top:0,behavior:"instant"})');await delay(100);
if(route==='/'||!route.endsWith('/')){const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(base+'/pagina-'+(route==='/'?'inicio':route.slice(1))+'-'+width+'.png',Buffer.from(shot.data,'base64'));}
results.push({width,route,...state});
}catch(e){results.push({width,route,error:String(e)});}
}
context={width,route:'navigation'};
await visit('/');const transitions=[];
for(const route of ['/monitoreo-energetico','/iot-industrial','/automatizacion-edge']){await click('header button');await click('header a[href="'+route+'"]');await until('location.pathname.replace(/\\/$/,"")==='+JSON.stringify(route)+'&&!!document.querySelector("main")');await delay(350);transitions.push(await ev('({url:location.href,title:document.title,canonical:document.querySelector("link[rel=canonical]").href})'));}
await click('header a[href="/#contacto"]');await until('location.pathname==="/"&&location.hash==="#contacto"&&document.activeElement.id==="contacto"');await delay(200);transitions.push(await ev('({url:location.href,title:document.title,canonical:document.querySelector("link[rel=canonical]").href,contactFocus:document.activeElement.id})'));
for(const id of ['proyectos','tecnologia']){await click('header a[href="/#'+id+'"]');await until('document.activeElement.id==='+JSON.stringify(id));transitions.push(await ev('({url:location.href,focus:document.activeElement.id,scrollY})'));}
results.push({width,type:'navigation',transitions});
}
save('navegador.json',{date:new Date().toISOString(),mode:'Edge headless CDP, escritorio 1440x1000 y emulación móvil 375x1000; reduced-motion; sin envíos; no dispositivo físico',results,consoleEvents,network,failures,blocked});
console.log(JSON.stringify({states:results.map(r=>({width:r.width,route:r.route,type:r.type,error:r.error,overflow:r.overflow,menu:r.menuOpened,escape:r.escapeClosed,sections:r.sections?.map(s=>({id:s.id,visible:s.visible,focus:s.focus}))})),consoleEvents,failed:failures,errors:network.filter(n=>n.status>=400),blocked},null,2));
await call('Browser.close').catch(()=>{});
}catch(e){save('navegador-error.json',{error:String(e),results,consoleEvents,network,failures,blocked});console.error(e);process.exitCode=1;}finally{ws?.close();browser.kill();}
