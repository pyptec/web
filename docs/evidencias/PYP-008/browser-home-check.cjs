const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9339',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9339/json/list')).json(); break; } catch { await delay(100); }
  }
  if (!targets) throw Error('Headless Edge did not start');
  ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let seq = 0;
  const pending = new Map();
  ws.onmessage = event => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) { const { resolve, reject } = pending.get(msg.id); pending.delete(msg.id); msg.error ? reject(Error(JSON.stringify(msg.error))) : resolve(msg.result); }
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => { const id = ++seq; pending.set(id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw Error(r.exceptionDetails.text + ' ' + r.exceptionDetails.exception?.description);
    return r.result.value;
  };
  const until = async expression => { for (let i = 0; i < 100; i++) { if (await evaluate(expression)) return; await delay(50); } throw Error('Timeout: ' + expression); };
  const visit = async route => { await call('Page.navigate', { url: 'http://127.0.0.1:5176' + route }); await until('!!document.querySelector("header button[aria-controls]") && !!document.querySelector("h1")'); await delay(80); };
  const key = async (name, code, virtual) => { await call('Input.dispatchKeyEvent', { type: name === 'Enter' ? 'keyDown' : 'rawKeyDown', key: name, code, windowsVirtualKeyCode: virtual, nativeVirtualKeyCode: virtual, ...(name === 'Enter' ? {text: '\r', unmodifiedText: '\r'} : {}) }); await call('Input.dispatchKeyEvent', { type: 'keyUp', key: name, code, windowsVirtualKeyCode: virtual }); await delay(50); };
  const click = async selector => { const r = await evaluate('(()=>{const r=document.querySelector(' + JSON.stringify(selector) + ').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()'); await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...r }); await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...r }); await delay(80); };
  await call('Page.enable');
  await call('Runtime.enable');
  const corporate='nav[aria-label="Navegación corporativa"]';
  const local='nav[aria-label="Secciones de esta página"]';
  const routes=['/monitoreo-energetico','/iot-industrial','/automatizacion-edge'];
  const ids=['soluciones','arquitectura','rpi-mdfr','sectores'];
  const metrics=[];
  const visible=id=>'(()=>{const t=document.getElementById('+JSON.stringify(id)+');const h=t.querySelector("h2,h3")||t;return h.getBoundingClientRect().top>=document.querySelector("header").getBoundingClientRect().bottom-2&&h.getBoundingClientRect().top<innerHeight})()';
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  for(const width of [320,375,768,1024,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    await visit('/');
    check(await evaluate('document.querySelectorAll("header").length===1&&document.querySelectorAll('+JSON.stringify(corporate)+').length===1'),'one corporate Navbar at '+width);
    check(await evaluate('document.querySelectorAll('+JSON.stringify(local)+').length===1'),'one local row at '+width);
    check(await evaluate('JSON.stringify([...document.querySelectorAll('+JSON.stringify(local+' a')+')].map(a=>a.hash.slice(1)))==='+JSON.stringify(JSON.stringify(ids))),'local links use existing IDs, no duplicate corporate links at '+width);
    check(await evaluate('document.querySelector("header").scrollWidth<=innerWidth'),'header does not overflow at '+width);
    metrics.push(await evaluate('({width:innerWidth,pageScrollWidth:document.documentElement.scrollWidth,headerHeight:document.querySelector("header").getBoundingClientRect().height})'));
    check(await evaluate('(()=>{const a=[...document.querySelectorAll('+JSON.stringify(local+' a')+')];return Math.max(...a.map(x=>x.getBoundingClientRect().top))-Math.min(...a.map(x=>x.getBoundingClientRect().top))<1})()'),'local links remain single row at '+width);
    check(await evaluate('document.querySelector("header img").src.includes("log_pyp")&&document.querySelector("header img").parentElement.getAttribute("href")==="/"'),'official logo returns to Inicio at '+width);
    if(width===320||width===1440){const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(base,'home-'+width+'.png'),Buffer.from(shot.data,'base64'));}
    await click('header button');
    check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'),'mouse opens Soluciones at '+width);
    check(await evaluate('document.querySelectorAll('+JSON.stringify(corporate+' ul a')+').length===3'),'three existing solutions at '+width);
    check(await evaluate('document.querySelectorAll('+JSON.stringify(corporate+' a[aria-current=page]')+').length===0'),'no false active solution on homepage at '+width);
    await key('Escape','Escape',27);await key('Enter','Enter',13);
    check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'),'keyboard opens Soluciones at '+width);
    await key('ArrowDown','ArrowDown',40);
    check(await evaluate('document.activeElement===document.querySelector('+JSON.stringify(corporate+' ul a')+')'),'keyboard reaches solutions at '+width);
    await key('Escape','Escape',27);
    for(const id of [...ids,'proyectos','tecnologia','contacto']){
      const selector=ids.includes(id)?local+' a[href="#'+id+'"]':corporate+' a[href="/#'+id+'"]';
      const actual=id==='contacto'?'header > div > a[href="/#contacto"]':selector;
      await evaluate('document.querySelector('+JSON.stringify(actual)+').scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})');
      await click(actual);
      await until('location.hash==='+JSON.stringify('#'+id)+'&&document.activeElement.id==='+JSON.stringify(id));await delay(60);
      check(await evaluate(visible(id)),'anchor title visible at '+width+' #'+id);
    }
    await evaluate('document.querySelector('+JSON.stringify(local+' a')+').focus()');await key('Tab','Tab',9);
    check(await evaluate('document.activeElement.hash==="#arquitectura"&&parseFloat(getComputedStyle(document.activeElement).outlineWidth)>0'),'local keyboard focus visible at '+width);
    await key('Enter','Enter',13);await until('document.activeElement.id==="arquitectura"');
    check(await evaluate(visible('arquitectura')),'keyboard local anchor visible at '+width);
    for(const id of ['soluciones','proyectos']){
      const selector='main section[id="inicio"] a[href="#'+id+'"]';
      await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"center",inline:"nearest",behavior:"instant"})');
      await click(selector);await until('location.hash==='+JSON.stringify('#'+id)+'&&document.activeElement.id==='+JSON.stringify(id));await delay(60);
      check(await evaluate(visible(id)),'original hero link hash/offset works at '+width+' #'+id);
    }
    check(await evaluate('(()=>{const f=document.querySelector("main form");return f.name==="contacto-pyp"&&f.method==="post"&&f.dataset.netlify==="true"&&f.getAttribute("netlify-honeypot")==="bot-field"&&f.elements["form-name"].value==="contacto-pyp"&&!!f.elements["bot-field"]&&!!f.elements["empresa"]&&!!f.elements["solucion"]&&f.elements["nombre"].required&&f.elements["correo"].required&&f.elements["mensaje"].required})()'),'Netlify form attributes and all fields preserved at '+width);
    check(await evaluate('(()=>{const a=document.querySelector('+JSON.stringify(corporate+' a[target=_blank]')+');return a.href==="https://iotrack.com.co/"&&a.rel.includes("noopener")&&a.rel.includes("noreferrer")})()'),'Platform destination/target/rel preserved at '+width);
    for(const route of routes){
      await evaluate('document.querySelector("header button").click()');await click(corporate+' ul a[href="'+route+'"]');
      await until('location.pathname==='+JSON.stringify(route)+'&&!!document.querySelector('+JSON.stringify(corporate)+')');
      check(await evaluate('document.querySelector('+JSON.stringify(corporate+' a[aria-current=page]')+').getAttribute("href")==='+JSON.stringify(route)),'homepage solution navigation to '+route+' at '+width);
      await click(corporate+' a[href="/"]');await until('location.pathname==="/"&&location.hash===""&&!!document.querySelector('+JSON.stringify(local)+')');await delay(100);
      check(await evaluate('scrollY<5'),'Inicio returns to homepage top from '+route+' at '+width);
    }
  }
  await visit('/#sectores');await delay(500);check(await evaluate(visible('sectores')),'direct homepage hash URL positions title correctly');
  await evaluate('document.querySelector('+JSON.stringify(local+' a[href="#arquitectura"]')+').click()');await until('location.hash==="#arquitectura"');
  await evaluate('history.back()');await until('location.hash==="#sectores"');await delay(100);check(await evaluate(visible('sectores')),'homepage history back restores section');
  await visit('/');await evaluate('window.__scrollCalls=[];const original=window.scrollTo;window.scrollTo=function(o){window.__scrollCalls.push(o);return original.call(window,o)}');
  await evaluate('document.querySelector('+JSON.stringify(local+' a[href="#arquitectura"]')+').click()');await delay(100);
  check(await evaluate('window.__scrollCalls.at(-1).behavior==="instant"'),'homepage respects reduced motion');
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await evaluate('document.querySelector('+JSON.stringify(local+' a[href="#sectores"]')+').click()');await delay(1200);
  check(await evaluate('window.__scrollCalls.at(-1).behavior==="smooth"'),'homepage uses smooth scroll without reduced motion');
  check(await evaluate(visible('sectores')),'homepage smooth scroll leaves title visible');
  const formResult=await evaluate('(()=>{const f=document.querySelector("main form");f.elements["nombre"].value="Prueba local";f.elements["correo"].value="prueba@example.com";f.elements["mensaje"].value="Validación local, sin envío";return f.checkValidity()})()');check(formResult,'form local constraint validation succeeds without submission');
  fs.writeFileSync(path.join(base,'home-results.json'),JSON.stringify({browser:'Microsoft Edge headless via CDP',checks:results.length,metrics,results},null,2));
  console.log('Homepage browser checks passed: '+results.length);console.log('Viewport metrics:',JSON.stringify(metrics));
  await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'home-results.json'),JSON.stringify({checksPassed:results.length,results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
