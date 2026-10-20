import fs from 'node:fs';
import path from 'node:path';
import http from 'node:http';
import {spawn,execFileSync} from 'node:child_process';
import {createServer} from 'vite';
import {getSeoPage} from '../../../src/data/seo.js';
const base='docs/evidencias/PYP-035';
const root=path.resolve(base,'build-temporal/comercial');
const results=[],commands=[],exceptions=[],blocked=[],tagRequests=[];
const check=(name,ok,detail)=>{results.push({name,ok:!!ok,...(detail?{detail}:{})});if(results.length % 10 === 0) console.log("Controles Edge: "+results.length);if(!ok)throw Error(name);};
const delay=ms=>new Promise(r=>setTimeout(r,ms));
const server=http.createServer((req,res)=>{
 if(req.method!=='GET'&&req.method!=='HEAD'){res.writeHead(405);res.end();return;}
 const url=new URL(req.url,'http://localhost');
 let file=path.join(root,decodeURIComponent(url.pathname));
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403);res.end();return;}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file))file=path.join(root,'index.html');
 const types={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
 res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream'});res.end(fs.readFileSync(file));
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin='http://127.0.0.1:'+server.address().port;
const dev=await createServer({optimizeDeps:{entries:['index.html']},cacheDir:path.resolve(base,'build-temporal/vite-cache'),server:{host:'127.0.0.1',port:0},logLevel:'error'});
await dev.listen();const devOrigin='http://127.0.0.1:'+dev.httpServer.address().port;
const browser=spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',['--headless=new','--disable-gpu','--no-first-run','--no-default-browser-check','--disable-extensions','--remote-debugging-port=9385','--user-data-dir='+path.resolve(base,'browser-profile'),'about:blank'],{windowsHide:true,stdio:'ignore'});
let ws,sequence=0,phase='setup',mock='success';const pending=new Map();
try {
 let targets;
 for(let i=0;i<80;i++){try{targets=await(await fetch('http://127.0.0.1:9385/json/list')).json();break;}catch{await delay(100);}}
 if(!targets)throw Error('Edge CDP unavailable');
 ws=new WebSocket(targets.find(t=>t.type==='page').webSocketDebuggerUrl);
 await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j;});
 const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++sequence;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}));});
 ws.onmessage=e=>{
  const m=JSON.parse(e.data);
  if(m.id&&pending.has(m.id)){const p=pending.get(m.id);pending.delete(m.id);m.error?p.reject(Error(JSON.stringify(m.error))):p.resolve(m.result);return;}
  if(m.method==='Runtime.bindingCalled'){try{commands.push({phase,command:JSON.parse(m.params.payload)});}catch{}}
  if(m.method==='Runtime.exceptionThrown')exceptions.push({phase,text:m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text});
  if(m.method==='Fetch.requestPaused'){
   const p=m.params,u=new URL(p.request.url);let method,args={requestId:p.requestId};
   if(!['GET','HEAD'].includes(p.request.method)){blocked.push({phase,method:p.request.method,path:u.pathname});method='Fetch.failRequest';args.errorReason='BlockedByClient';}
   else if(u.hostname==='www.googletagmanager.com'){
    tagRequests.push({phase,path:u.pathname,id:u.searchParams.get('id')});
    if(mock==='failure'){method='Fetch.failRequest';args.errorReason='BlockedByClient';}
    else {method='Fetch.fulfillRequest';args.responseCode=200;args.responseHeaders=[{name:'Content-Type',value:'text/javascript'}];args.body=Buffer.from('window.__pypCommands=[];window.gtag=function(){const a=Array.from(arguments);window.dataLayer.push(a);window.__pypCommands.push(a);window.__pypReport(JSON.stringify(a));};').toString('base64');}
   } else if(u.hostname==='127.0.0.1'||u.hostname==='localhost'){method='Fetch.continueRequest';}
   else {method='Fetch.fulfillRequest';args.responseCode=200;args.responseHeaders=[{name:'Content-Type',value:'text/css'}];args.body='';}
   call(method,args).catch(e=>exceptions.push({phase,text:String(e)}));
  }
 };
 const ev=async expression=>{const r=await call('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;};
 const until=async expression=>{for(let i=0;i<100;i++){if(await ev(expression))return;await delay(100);}throw Error('Timeout: '+expression);};
 const visit=async(route='/',site=origin)=>{await call('Page.navigate',{url:site+route});await until('!!document.querySelector("main") && !!document.querySelector("[aria-controls=analytics-preferences]")');await until('document.readyState==="complete"');await delay(120);};
 const click=async text=>{
  const point=await ev('(()=>{const b=[...document.querySelectorAll("button")].find(b=>b.textContent.trim()==='+JSON.stringify(text)+');if(!b)throw Error("Missing button");b.scrollIntoView({block:"center",behavior:"instant"});const r=b.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2};})()');
  await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...point});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...point});await delay(120);
 };
 const views=()=>ev('(window.__pypCommands||[]).filter(c=>c[0]==="event"&&c[1]==="page_view")');
 const spa=async route=>{await ev('history.pushState({},"",'+JSON.stringify(route)+');dispatchEvent(new PopStateEvent("popstate"));');await delay(160);};
 const shot=async file=>{const r=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(base+'/'+file,Buffer.from(r.data,'base64'));};
 await call('Page.enable');await call('Runtime.enable');await call('Network.enable');await call('Runtime.addBinding',{name:'__pypReport'});
 await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
 await call('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
 phase='unknown-mobile';await visit('/proyectos/clg/?correo=sentinel#private');
 await ev('localStorage.clear()');await visit('/proyectos/clg/?correo=sentinel#private');
 check('Sin consentimiento: no tag GA',await ev('!document.querySelector("#pyp-ga4")')&&tagRequests.length===0);
 check('Móvil: sin overflow, controles visibles >=44px',await ev('document.documentElement.scrollWidth<=innerWidth && [...document.querySelectorAll("#analytics-preferences button")].every(b=>b.getBoundingClientRect().height>=44)'));
 await shot('movil-consentimiento.png');
 await click('Rechazar analítica');
 check('Rechazo: panel cerrado, preferencia/foco y ninguna etiqueta',await ev('!document.querySelector("#analytics-preferences") && document.activeElement.textContent==="Preferencias de analítica" && !document.querySelector("#pyp-ga4")'));
 phase='denied-navigation';await spa('/iot-industrial/');
 check('Navegación sin Analytics y consentimiento persiste',await ev('document.title.includes("IoT Industrial y LoRaWAN") && JSON.parse(localStorage.getItem("pyp.analytics-consent.v1")).value==="denied" && !document.querySelector("#pyp-ga4")'));
 await click('Preferencias de analítica');
 check('Editar preferencias: foco en título',await ev('document.activeElement.id==="analytics-consent-title"'));
 phase='accept';await click('Aceptar analítica');await until('(window.__pypCommands||[]).some(c=>c[0]==="event"&&c[1]==="page_view")');
 check('Primera página al aceptar: solo IoT actual', (await views()).length===1&&(await views())[0][2].page_location==='https://pyptecnologia.com/iot-industrial/');
 check('Una sola etiqueta y config correctos',await ev('document.querySelectorAll("#pyp-ga4").length===1 && __pypCommands.filter(c=>c[0]==="config").length===1 && __pypCommands.find(c=>c[0]==="config")[1]==="G-WJ6METJRZD" && __pypCommands.find(c=>c[0]==="config")[2].send_page_view===false'));
 phase='routes';
 for(const route of ['/','/monitoreo-energetico/','/automatizacion-edge/','/proyectos/rpi-mdfr/','/proyectos/clg/']){
  const before=(await views()).length;await spa(route);
  const data=(await views()).at(-1)[2],seo=getSeoPage(route);
  check('SPA vista única/título/canonical '+route,(await views()).length===before+1&&data.page_title===seo.title&&data.page_location===seo.canonical&&await ev('document.title==='+JSON.stringify(seo.title)));
  check('Móvil ruta/imágenes '+route,await ev('document.documentElement.scrollWidth<=innerWidth && [...document.querySelectorAll("main img")].every(i=>i.complete?i.naturalWidth>0:true)'));
 }
 let count=(await views()).length;await spa('/proyectos/clg/?correo=sentinel#contacto');
 check('Query/hash no suman vistas',(await views()).length===count);
 await ev('Array.from(document.querySelectorAll("main a")).find(a=>a.getAttribute("href")==="/#contacto").click()');await delay(120);
 check('CTA CLG identifica origen sin conversión',commands.some(c=>c.command[1]==='contact_cta_click'&&c.command[2].page_path==='/proyectos/clg/'));
 await until('!!document.querySelector("form[name=contacto-pyp]:not([hidden])")');
 await until('(window.__pypCommands||[]).some(c=>c[0]==="event"&&c[1]==="page_view")');
 phase='contacts';
 // Prevent external protocol navigation in this test only; the real listener still sees each click.
 await ev('document.addEventListener("click",e=>{if(e.target.closest?.("a[href^=mailto],a[href^=tel]"))e.preventDefault();});document.querySelector("main a[href^=mailto]").click();document.querySelector("main a[href^=tel]").click();');await delay(100);
 check('Clics reales email/phone sin datos personales',commands.some(c=>c.command[1]==='contact_click'&&c.command[2].contact_method==='email')&&commands.some(c=>c.command[1]==='contact_click'&&c.command[2].contact_method==='phone')&&!JSON.stringify(commands.filter(c=>c.command[0]==='event')).match(/jaime|573204929150|sentinel/));
 phase='invalid-form';
 let postCount=blocked.length;
 await ev('document.querySelector("main form[name=contacto-pyp]").requestSubmit()');await delay(100);
 check('Formulario inválido no envía ni convierte',blocked.length===postCount&&!commands.some(c=>c.command[1]==='generate_lead'));
 await ev('document.querySelector("#contacto-nombre").value="Prueba local";document.querySelector("#contacto-correo").value="qa@example.invalid";document.querySelector("#contacto-mensaje").value="Prueba local interceptada, sin envío";');
 phase='revoke';await click('Preferencias de analítica');await click('Rechazar analítica');
 check('Revocación preserva formulario escrito y activa opt-out',await ev('document.querySelector("#contacto-nombre").value==="Prueba local" && window["ga-disable-G-WJ6METJRZD"]===true'));
 phase='blocked-form';await ev('document.querySelector("main form[name=contacto-pyp]").requestSubmit()');await delay(350);
 check('POST interceptado sin recepción real ni generate_lead',blocked.length===postCount+1&&!commands.some(c=>c.command[1]==='generate_lead'));
 phase='blocked-tag';mock='failure';await visit('/');await click('Preferencias de analítica');await click('Aceptar analítica');await delay(200);
 check('Etiqueta bloqueada: sitio y formulario funcionales',await ev('!!document.querySelector("main") && !!document.querySelector("main form[name=contacto-pyp]") && !document.querySelector("#pyp-ga4") && !window.__pypCommands'));
 await spa('/proyectos/clg/');check('Etiqueta bloqueada no bloquea rutas',await ev('document.querySelector("h1").textContent.includes("CLG")'));
 await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
 phase='desktop';mock='success';await visit('/proyectos/clg/');await until('(window.__pypCommands||[]).some(c=>c[0]==="event")');
 check('Escritorio: sin overflow',await ev('document.documentElement.scrollWidth<=innerWidth'));
 await shot('escritorio-clg.png');
 await click('Preferencias de analítica');await shot('escritorio-preferencias.png');await click('Rechazar analítica');

 phase='rpi-presentation';
 for (const width of [1440,390]) {
  await call('Emulation.setDeviceMetricsOverride',{width,height:width===390?844:1000,deviceScaleFactor:1,mobile:width===390});
  await visit('/');
  await ev('document.querySelector("#proyecto-rpi-mdfr").scrollIntoView({block:"center",behavior:"instant"});');await delay(120);
  await until('document.querySelector("#proyecto-rpi-mdfr img").complete && document.querySelector("#proyecto-rpi-mdfr img").naturalWidth===1536');
  check('Inicio '+width+' tarjeta RPI íntegra/enlace',await ev('(()=>{const c=document.querySelector("#proyecto-rpi-mdfr"),i=c.querySelector("img");return i.complete&&i.naturalWidth===1536&&getComputedStyle(i).objectFit==="contain"&&c.querySelector("a").pathname==="/proyectos/rpi-mdfr/"&&document.documentElement.scrollWidth<=innerWidth;})()'));
  const cardClip=await ev('(()=>{const c=document.querySelector("#proyecto-rpi-mdfr"),h=document.querySelector("header").getBoundingClientRect().height;window.scrollTo({top:Math.max(0,c.getBoundingClientRect().top+scrollY-h-16),behavior:"instant"});const r=c.getBoundingClientRect();return {x:0,y:scrollY,width:innerWidth,height:Math.ceil(r.bottom+16),scale:1};})()');
  const cardImage=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip:cardClip});fs.writeFileSync(base+'/inicio-'+width+'.png',Buffer.from(cardImage.data,'base64'));
  await ev('document.querySelector("#proyecto-rpi-mdfr a").click()');
  await until('document.querySelector("h1")?.textContent==="RPI-MDFR — Maduración inteligente de banano" && document.readyState==="complete"');await delay(180);
  check('RPI '+width+' canonical/H1 sin overflow',await ev('document.querySelector("link[rel=canonical]").href==="https://pyptecnologia.com/proyectos/rpi-mdfr/"&&document.querySelectorAll("h1").length===1&&document.documentElement.scrollWidth<=innerWidth'));
  await ev('window.scrollTo({top:0,behavior:"instant"})');await delay(120);
  check('RPI '+width+' infografía completa sin distorsión',await ev('(()=>{const i=document.querySelector("#presentacion-rpi-mdfr img"),r=i.getBoundingClientRect();return i.complete&&i.naturalWidth===1536&&i.naturalHeight===1024&&Math.abs(r.width/r.height-1.5)<0.01&&getComputedStyle(i).objectFit==="contain"&&i.closest("a").target==="_blank";})()'));
  const captureRegion=async(selector,file)=>{
   await ev('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();const h=document.querySelector("header").getBoundingClientRect().height;window.scrollTo({top:'+JSON.stringify(selector)+'==="#presentacion-rpi-mdfr"?0:Math.max(0,r.top+scrollY-h-16),behavior:"instant"});})()');await delay(100);
   const clip=await ev('(()=>{const r=document.querySelector('+JSON.stringify(selector)+').getBoundingClientRect();return {x:0,y:scrollY,width:innerWidth,height:Math.ceil(r.bottom+16),scale:1}})()');
   const pic=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true,clip});fs.writeFileSync(base+'/'+file,Buffer.from(pic.data,'base64'));
  };
  await captureRegion('#presentacion-rpi-mdfr','rpi-mdfr-'+width+'.png');
  await ev('Promise.all([...document.querySelectorAll("main img")].map(i=>{i.loading="eager";return i.decode().then(()=>true,()=>false)}))');
  check('RPI '+width+' siete capturas originales cargadas y ampliables',await ev('(()=>{const imgs=[...document.querySelectorAll("#sensores-rpi-mdfr figure img,#dashboard-rpi-mdfr figure img,#historicos-rpi-mdfr figure img")];return imgs.length===7&&imgs.every(i=>i.complete&&i.naturalWidth>0&&getComputedStyle(i).objectFit==="contain"&&i.closest("a").target==="_blank");})()'));
  check('RPI '+width+' anclas locales válidas',await ev('Array.from(document.querySelectorAll("header a")).filter(a=>a.getAttribute("href").startsWith("#")).every(a=>document.getElementById(a.hash.slice(1)))'));
  await captureRegion('#sensores-rpi-mdfr','rpi-mdfr-sensores-'+width+'.png');
  await captureRegion('#dashboard-rpi-mdfr','rpi-mdfr-dashboard-'+width+'.png');
  await captureRegion('#historicos-rpi-mdfr','rpi-mdfr-ciclos-'+width+'.png');
  await ev('document.querySelector("#contacto-rpi-mdfr").scrollIntoView({block:"center",behavior:"instant"})');
  check('RPI '+width+' contacto válido y sin formulario duplicado',await ev('document.querySelector("#contacto-rpi-mdfr a").getAttribute("href")==="/#contacto"&&document.querySelectorAll("main form").length===0'));
  await shot('rpi-mdfr-contacto-'+width+'.png');
 }
 phase='rpi-zoom';
 const beforeTargets=(await call('Target.getTargets')).targetInfos;
 const imagePoint=await ev('(()=>{const a=document.querySelector("#presentacion-rpi-mdfr a[target=_blank]");a.scrollIntoView({block:"center",behavior:"instant"});const r=a.getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()');
 await call('Input.dispatchMouseEvent',{type:'mousePressed',button:'left',clickCount:1,...imagePoint});await call('Input.dispatchMouseEvent',{type:'mouseReleased',button:'left',clickCount:1,...imagePoint});
 let newTarget;
 for(let i=0;i<50;i++){newTarget=(await call('Target.getTargets')).targetInfos.find(t=>t.url.endsWith('/rpi-mdfr-infografia.png')&&!beforeTargets.some(p=>p.targetId===t.targetId));if(newTarget)break;await delay(100);}
 check('Infografía se amplía en pestaña nueva',!!newTarget);
 if(newTarget)await call('Target.closeTarget',{targetId:newTarget.targetId});
 await click('Preferencias de analítica');await click('Aceptar analítica');
 await until('(window.__pypCommands||[]).some(c=>c[1]==="page_view")');
 check('Analytics RPI: una vista con canonical y título propios',await ev('__pypCommands.filter(c=>c[1]==="page_view").length===1 && __pypCommands.find(c=>c[1]==="page_view")[2].page_location==="https://pyptecnologia.com/proyectos/rpi-mdfr/" && __pypCommands.find(c=>c[1]==="page_view")[2].page_title.includes("RPI-MDFR")'));
 await click('Preferencias de analítica');await click('Rechazar analítica');

 phase='strictmode-dev';await visit('/',devOrigin);await ev('localStorage.clear()');await visit('/',devOrigin);
 await click('Aceptar analítica');await until('(window.__pypCommands||[]).some(c=>c[0]==="event")');
 check('React StrictMode desarrollo: una inicialización/vista',await ev('__pypCommands.filter(c=>c[0]==="config").length===1 && __pypCommands.filter(c=>c[0]==="event"&&c[1]==="page_view").length===1 && document.querySelectorAll("#pyp-ga4").length===1'));
 await spa('/proyectos/clg/');
 await ev('document.addEventListener("click",e=>{if(e.target.closest?.("a")?.getAttribute("href")==="/#contacto")e.preventDefault();});');
 check('StrictMode cambio ruta: una vista adicional',(await views()).length===2);
 await ev('Array.from(document.querySelectorAll("main a")).find(a=>a.getAttribute("href")==="/#contacto").click()');await delay(100);
 check('StrictMode listener contacto sin duplicados',await ev('__pypCommands.filter(c=>c[1]==="contact_cta_click").length===1'));
 check('Sin excepciones JavaScript',exceptions.length===0,exceptions);
 check('Nunca generate_lead ficticio',!commands.some(c=>c.command[1]==='generate_lead'));
 check('ID correcto en todas las cargas interceptadas',tagRequests.every(r=>r.id==='G-WJ6METJRZD'));
} catch(e){results.push({name:'Ejecución',ok:false,error:String(e.stack||e)});}
finally {
 const data={date:'2026-10-20',results,passed:results.filter(r=>r.ok).length,failed:results.filter(r=>!r.ok).length,exceptions,commands,blocked,tagRequests,limitations:'Edge emulado local (390/1440); etiqueta Google sustituida, todos los externos interceptados, POST bloqueados. No confirma recepción ni configuración GA4 real, ni recepción Netlify.'};
 fs.writeFileSync(base+'/navegador.json',JSON.stringify(data,null,2)+'\n');
 console.log(JSON.stringify({passed:data.passed,failed:data.failed,failures:results.filter(r=>!r.ok)},null,2));
 ws?.close();
 try{execFileSync('taskkill',['/PID',String(browser.pid),'/T','/F'],{windowsHide:true,stdio:'ignore'});}catch{}
 await dev.close();await new Promise(r=>server.close(r));
 if(data.failed)process.exitCode=1;
}
