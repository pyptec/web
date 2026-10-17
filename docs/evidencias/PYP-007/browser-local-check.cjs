const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9338',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9338/json/list')).json(); break; } catch { await delay(100); }
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
  const nav = 'nav[aria-label="Secciones de esta página"]';
  const pages = [
    {route:'/monitoreo-energetico',slug:'monitoreo',ids:['proyectos','lps','alkosto','can-j1939','contacto']},
    {route:'/iot-industrial',slug:'iot',ids:['soluciones','contacto']},
    {route:'/automatizacion-edge',slug:'edge',ids:['capacidades','hardware','j1939','aplicaciones','contacto']},
  ];
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  const localLinks = nav + ' a';
  const inView = id => '(()=>{const target=document.getElementById('+JSON.stringify(id)+');const heading=target.querySelector("h2,h3,h4")||target;const r=heading.getBoundingClientRect();return r.top>=document.querySelector("header").getBoundingClientRect().bottom-2&&r.top<innerHeight})()';
  for(const width of [320,375,768,1024,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:900,deviceScaleFactor:1,mobile:width<640});
    for(const page of pages){
      await visit(page.route);
      check(await evaluate('document.querySelectorAll("header").length===1&&document.querySelectorAll('+JSON.stringify('nav[aria-label="Navegación corporativa"]')+').length===1'),'one corporate header: '+width+' '+page.slug);
      check(await evaluate('document.querySelectorAll('+JSON.stringify(nav)+').length===1'),'one local nav: '+width+' '+page.slug);
      check(await evaluate('JSON.stringify([...document.querySelectorAll('+JSON.stringify(localLinks)+')].map(a=>a.hash.slice(1)))==='+JSON.stringify(JSON.stringify(page.ids))),'exact existing anchors: '+width+' '+page.slug);
      check(await evaluate('document.documentElement.scrollWidth<=innerWidth'),'no page horizontal overflow: '+width+' '+page.slug);
      check(await evaluate('(()=>{const a=[...document.querySelectorAll('+JSON.stringify(localLinks)+')];return Math.max(...a.map(x=>x.getBoundingClientRect().top))-Math.min(...a.map(x=>x.getBoundingClientRect().top))<1&&document.querySelector('+JSON.stringify(nav)+').getBoundingClientRect().height<80})()'),'compact single row: '+width+' '+page.slug);
      if(width===320||width===1440){const img=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(base,page.slug+'-'+width+'.png'),Buffer.from(img.data,'base64'));}
      for(const id of page.ids){
        const selector=nav+' a[href="#'+id+'"]';
        await evaluate('document.querySelector('+JSON.stringify(selector)+').scrollIntoView({block:"nearest",inline:"nearest",behavior:"instant"})');
        await click(selector);
        await until('location.hash==='+JSON.stringify('#'+id)+'&&document.activeElement.id==='+JSON.stringify(id));
        await delay(80);
        check(await evaluate(inView(id)),'click anchor heading visible: '+width+' '+page.slug+' #'+id);
        check(await evaluate('Math.abs(document.querySelector("header").getBoundingClientRect().top)<1'),'header remains accessible: '+width+' '+page.slug+' #'+id);
      }
      await evaluate('document.querySelector('+JSON.stringify(localLinks)+').focus()');
      await key('Tab','Tab',9);
      check(await evaluate('document.activeElement===document.querySelectorAll('+JSON.stringify(localLinks)+')[1]'),'Tab reaches second local link: '+width+' '+page.slug);
      check(await evaluate('parseFloat(getComputedStyle(document.activeElement).outlineWidth)>0'),'keyboard focus visible: '+width+' '+page.slug);
      await key('Enter','Enter',13);
      await until('document.activeElement.id==='+JSON.stringify(page.ids[1]));
      check(await evaluate(inView(page.ids[1])),'Enter anchor heading visible: '+width+' '+page.slug);
      await evaluate('document.querySelector('+JSON.stringify(localLinks)+').focus()');
      for(let i=1;i<page.ids.length;i++)await key('Tab','Tab',9);
      check(await evaluate('(()=>{const a=document.activeElement.getBoundingClientRect(),ul=document.querySelector('+JSON.stringify(nav+' ul')+').getBoundingClientRect();return a.left>=ul.left-1&&a.right<=ul.right+1&&document.activeElement.hash==='+JSON.stringify('#'+page.ids.at(-1))+'})()'),'last link reachable horizontally by Tab: '+width+' '+page.slug);
      await evaluate('window.scrollTo({top:0,behavior:"instant"})');
      check(await evaluate('(()=>{const a=document.querySelector("header a[href$=contacto]").getBoundingClientRect();return a.top>=0&&a.bottom<innerHeight})()'),'Hablemos remains visible: '+width+' '+page.slug);
    }
  }
  for(const page of pages){
    await visit(page.route+'#'+page.ids[0]);await delay(500);
    check(await evaluate(inView(page.ids[0])),'direct hash URL aligns title: '+page.slug);
    await evaluate('document.querySelector('+JSON.stringify(nav+' a')+').click()');
    await evaluate('document.querySelector('+JSON.stringify(nav+' a[href="#'+page.ids[1]+'"]')+').click()');
    await until('location.hash==='+JSON.stringify('#'+page.ids[1]));
    await evaluate('history.back()');
    await until('location.hash==='+JSON.stringify('#'+page.ids[0]));await delay(100);
    check(await evaluate(inView(page.ids[0])),'history back restores section: '+page.slug);
    await visit(page.route);
    await click('nav[aria-label="Navegación corporativa"] a[href="/"]');
    await until('location.pathname==="/"&&!!document.querySelector("h1")&&!document.querySelector('+JSON.stringify(nav)+')');
    check(true,'Inicio works: '+page.slug);
  }
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
  await visit('/automatizacion-edge');
  await evaluate('window.__scrollCalls=[];const native=window.scrollTo;window.scrollTo=function(options){window.__scrollCalls.push(options);return native.call(window,options)}');
  await evaluate('document.querySelector('+JSON.stringify(nav+' a[href="#hardware"]')+').click()');await delay(100);
  check(await evaluate('window.__scrollCalls.at(-1).behavior==="instant"'),'reduced motion uses instant scroll');
  await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
  await evaluate('document.querySelector('+JSON.stringify(nav+' a[href="#j1939"]')+').click()');await delay(1200);
  check(await evaluate('window.__scrollCalls.at(-1).behavior==="smooth"'),'normal preference uses smooth scroll');
  check(await evaluate(inView('j1939')),'smooth-scroll destination title visible');
  await evaluate('document.querySelector("header button").click()');
  await click('header ul a[href="/iot-industrial"]');
  await until('location.pathname==="/iot-industrial"&&!!document.querySelector('+JSON.stringify(nav)+')');await delay(300);
  check(await evaluate('location.hash===""&&scrollY<5'),'changing solution resets to top without stale hash scroll');
  fs.writeFileSync(path.join(base,'local-results.json'),JSON.stringify({browser:'Microsoft Edge headless via CDP',checks:results.length,results},null,2));
  console.log('Local navigation browser checks passed: '+results.length);
  await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'local-results.json'),JSON.stringify({checksPassed:results.length,results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
