const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9340',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9340/json/list')).json(); break; } catch { await delay(100); }
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
  const visit = async route => { await call('Page.navigate', { url: 'http://127.0.0.1:5179' + route }); await until('!!document.querySelector("header button[aria-controls]") && !!document.querySelector("h1")'); await delay(80); };
  const key = async (name, code, virtual) => { await call('Input.dispatchKeyEvent', { type: name === 'Enter' ? 'keyDown' : 'rawKeyDown', key: name, code, windowsVirtualKeyCode: virtual, nativeVirtualKeyCode: virtual, ...(name === 'Enter' ? {text: '\r', unmodifiedText: '\r'} : {}) }); await call('Input.dispatchKeyEvent', { type: 'keyUp', key: name, code, windowsVirtualKeyCode: virtual }); await delay(50); };
  const click = async selector => { const r = await evaluate('(()=>{const r=document.querySelector(' + JSON.stringify(selector) + ').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()'); await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...r }); await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...r }); await delay(80); };
  await call('Page.enable');
  await call('Runtime.enable');
  const expected=JSON.parse(fs.readFileSync(path.join(base,'seo-esperado.json')));
  const pages=[{route:'/',slug:'inicio'},{route:'/monitoreo-energetico',slug:'monitoreo'},{route:'/iot-industrial',slug:'iot'},{route:'/automatizacion-edge',slug:'edge'}];
  const warnings=[],snapshots=[],runtimeErrors=[];
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')runtimeErrors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);});
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  const local='nav[aria-label="Secciones de esta página"]';
  const corporate='nav[aria-label="Navegación corporativa"]';
  for(const width of [375,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    for(const page of pages){
      await visit(page.route);
      check(await evaluate('document.querySelectorAll("header").length===1&&document.querySelectorAll('+JSON.stringify(local)+').length===1'),'single corporate/local header '+width+' '+page.route);
      check(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'no page overflow '+width+' '+page.route);
      const meta=await evaluate('({path:location.pathname,title:document.title,description:document.querySelector("meta[name=description]").content,canonical:document.querySelector("link[rel=canonical]").href,ogTitle:[...document.querySelectorAll("meta")].find(m=>m.getAttribute("property")==="og:title").content,ogDescription:[...document.querySelectorAll("meta")].find(m=>m.getAttribute("property")==="og:description").content,ogUrl:[...document.querySelectorAll("meta")].find(m=>m.getAttribute("property")==="og:url").content})');
      const canonical='https://pyptecnologia.com'+page.route;
      check(meta.title===expected[page.route].title&&meta.description===expected[page.route].description,'React title/description '+width+' '+page.route);
      check(meta.canonical===canonical&&meta.ogUrl===canonical&&meta.ogTitle===meta.title&&meta.ogDescription===meta.description,'React canonical/OG '+width+' '+page.route);
      snapshots.push({width,route:page.route,...meta});
      const links=await evaluate('[...document.querySelectorAll('+JSON.stringify(local+' a')+')].map(a=>a.hash.slice(1))');
      for(const id of links){const selector=local+' a[href="#'+id+'"]';await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})');await click(selector);await until('document.activeElement.id==='+JSON.stringify(id));await delay(80);check(await evaluate('(()=>{const t=document.getElementById('+JSON.stringify(id)+'),h=t.querySelector("h2,h3,h4")||t;return h.getBoundingClientRect().top>=document.querySelector("header").getBoundingClientRect().bottom-2})()'),'anchor visible '+width+' '+page.route+' #'+id);}
      await evaluate('window.scrollTo({top:0,behavior:"instant"})');await click('header button');
      check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'),'Soluciones opens '+width+' '+page.route);
      const active=await evaluate('document.querySelector('+JSON.stringify(corporate+' a[aria-current=page]')+')?.getAttribute("href")||null');
      if(page.route!=='/'&&active!==page.route)warnings.push({case:'active-solution',requested:page.route,actualPath:meta.path,active});else check(true,'active solution correct '+width+' '+page.route);
      await key('Escape','Escape',27);check(await evaluate('document.activeElement===document.querySelector("header button")'),'Escape restores focus '+width+' '+page.route);
      if(width===375||page.route==='/'){const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(base,page.slug+'-'+width+'.png'),Buffer.from(shot.data,'base64'));}
    }
  }
  for(const page of pages.filter(p=>p.route!=='/')){
    await visit(page.route+'/');await click('header button');const state=await evaluate('({path:location.pathname,header:!!document.querySelector("header"),active:document.querySelector("header a[aria-current=page]")?.getAttribute("href")||null})');snapshots.push({test:'trailing-slash',...state});if(state.active!==page.route)warnings.push({case:'trailing-slash-active-state',...state});
  }
  await call('Page.navigate',{url:'http://127.0.0.1:5179/#%'});await delay(1200);const malformed=await evaluate('({path:location.pathname,hash:location.hash,hasHeader:!!document.querySelector("header"),hasMain:!!document.querySelector("main")})');if(!malformed.hasMain)warnings.push({case:'malformed-hash-crashes-render',...malformed});snapshots.push({test:'malformed-hash',...malformed});
  fs.writeFileSync(path.join(base,'browser-audit.json'),JSON.stringify({browser:'Edge headless; compiled artifact preview, not Netlify',checks:results.length,results,warnings,snapshots,runtimeErrors},null,2));
  console.log('Compiled browser audit:',JSON.stringify({checks:results.length,warnings,runtimeErrors}));await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'browser-audit-failure.json'),JSON.stringify({checksPassed:results.length,results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
