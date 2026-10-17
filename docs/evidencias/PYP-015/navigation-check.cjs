const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9350',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9350/json/list')).json(); break; } catch { await delay(100); }
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

  const before=process.argv.includes('--before'),origin='http://127.0.0.1:'+(before?'5182':'5195'),snapshots=[],errors=[];
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.value||a.description).join(' '));});
  await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Fetch.requestPaused')call(m.params.request.url.startsWith(origin+'/')&&m.params.request.method!=='POST'?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(m.params.request.url.startsWith(origin+'/')&&m.params.request.method!=='POST'?{}:{errorReason:'BlockedByClient'})});});
  const nav=async route=>{await call('Page.navigate',{url:origin+route});await until('!!document.querySelector("header button[aria-controls]")&&!!document.querySelector("main")');await delay(100);};
  const local='nav[aria-label="Secciones de esta página"]';
  const active=()=>evaluate('document.querySelector("header a[aria-current=page]")?.getAttribute("href")||null');
  const routes=['/monitoreo-energetico','/iot-industrial','/automatizacion-edge'];
  const visible=async id=>{await until('document.activeElement.id==='+JSON.stringify(id));await delay(800);check(await evaluate('(()=>{const t=document.getElementById('+JSON.stringify(id)+'),h=t.querySelector("h2,h3,h4")||t;return h.getBoundingClientRect().top>=document.querySelector("header").getBoundingClientRect().bottom-2})()'),'anchor title visible #'+id);};
  for(const width of [375,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    for(const [route,name]of [['/','inicio'],['/monitoreo-energetico','monitoreo']]){
      await nav(route);
      const state=await evaluate('(()=>{const b=document.querySelector("header button"),s=getComputedStyle(b);return {path:location.pathname,background:s.backgroundColor,color:s.color,class:b.className,headers:document.querySelectorAll("header").length,overflow:document.documentElement.scrollWidth>innerWidth}})()');
      snapshots.push({width,...state});
      const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(base,(before?'antes-':'despues-')+name+'-'+width+'.png'),Buffer.from(shot.data,'base64'));
      if(!before){check(state.background==='rgba(166, 206, 57, 0.2)','approved green background '+name+' '+width);check(state.headers===1&&!state.overflow,'single header and no horizontal overflow '+name+' '+width);}
    }
    if(before)continue;
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    for(const route of routes){
      let pair=[];
      for(const suffix of ['','/']){
        await nav(route+suffix);await click('header button');
        check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'),'dropdown click opens '+route+suffix+' '+width);
        check(await active()===route,'aria-current on solution '+route+suffix+' '+width);
        const st=await evaluate('(()=>{const a=document.querySelector("header a[aria-current=page]");return {class:a.className,bg:getComputedStyle(a).backgroundColor,path:location.pathname,canonical:document.querySelector("link[rel=canonical]").href}})()');pair.push(st);
        check(st.path===route+suffix,'no redirect '+route+suffix);
        check(st.canonical==='https://pyptecnologia.com'+route,'canonical preserved '+route+suffix);
        await key('Escape','Escape',27);check(await evaluate('document.activeElement===document.querySelector("header button")&&document.querySelector("header button").getAttribute("aria-expanded")==="false"'),'Escape closes and restores focus '+route+suffix);
      }
      check(pair[0].class===pair[1].class&&pair[0].bg===pair[1].bg,'same active appearance for slash pair '+route+' '+width);
      const ids=await evaluate('[...document.querySelectorAll('+JSON.stringify(local+' a')+')].map(a=>a.hash.slice(1))');

      for(const id of ids){
        await evaluate('document.querySelector('+JSON.stringify(local+' a[href="#'+id+'"]')+').click()');await visible(id);
      }
    }
    for(const hash of ['','#','#no-existe','#%','#%E0%A4%A','#%GG']){
      await nav('/'+hash);await delay(120);
      check(await evaluate('!!document.querySelector("main")&&!!document.querySelector("header")'),'home renders '+JSON.stringify(hash)+' '+width);
      check(await evaluate('location.hash')===hash.replace(/^#$/,''),'hash preserved '+JSON.stringify(hash));
      check(await evaluate('!document.querySelector("main [tabindex]")'),'invalid/empty/nonexistent hash has no invented focus '+JSON.stringify(hash));
    }
    await nav('/#%70royectos');await visible('proyectos');check(true,'encoded valid hash works '+width);
    await nav('/#%');await evaluate('location.hash="#tecnologia"');await visible('tecnologia');
    await evaluate('location.hash="#%GG"');await delay(120);
    check(await evaluate('!!document.querySelector("main")'),'hashchange malformed survives '+width);
    await evaluate('history.back()');await until('location.hash==="#tecnologia"');await visible('tecnologia');
    await evaluate('history.forward()');await until('location.hash==="#%GG"');check(await evaluate('!!document.querySelector("main")'),'forward malformed hash survives '+width);
    await nav('/');
    await evaluate('window.__scrollCalls=[];window.__nativeScroll=window.scrollTo;window.scrollTo=function(o){window.__scrollCalls.push(o.behavior);return window.__nativeScroll.call(window,o)};document.querySelector('+JSON.stringify(local+' a[href="#arquitectura"]')+').focus()');
    await key('Enter','Enter',13);await visible('arquitectura');
    check(await evaluate('window.__scrollCalls.length>0&&window.__scrollCalls.every(b=>b==="instant")'),'reduced motion uses instant '+width);
    await evaluate('document.querySelector('+JSON.stringify(local+' a[href="#sectores"]')+').click()');await visible('sectores');
    await evaluate('history.back()');await until('location.hash==="#arquitectura"');await visible('arquitectura');
    await evaluate('history.forward()');await until('location.hash==="#sectores"');await visible('sectores');
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'no-preference'}]});
    await evaluate('window.__scrollCalls=[];document.querySelector('+JSON.stringify(local+' a[href="#soluciones"]')+').click()');await visible('soluciones');
    check(await evaluate('window.__scrollCalls.includes("smooth")'),'normal motion uses smooth '+width);
    await call('Emulation.setEmulatedMedia',{features:[{name:'prefers-reduced-motion',value:'reduce'}]});
    await nav('/');
    await evaluate('document.querySelector("header button").focus()');await key('Enter','Enter',13);
    check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'),'Enter opens dropdown '+width);
    await key('Escape','Escape',27);await key('ArrowDown','ArrowDown',40);
    check(await evaluate('document.activeElement.getAttribute("href")==="/monitoreo-energetico"'),'ArrowDown focuses first solution '+width);
    await key('Tab','Tab',9);check(await evaluate('document.activeElement.getAttribute("href")==="/iot-industrial"'),'Tab navigates dropdown '+width);
    await key('Enter','Enter',13);await until('location.pathname==="/iot-industrial"&&!!document.querySelector("main")');
    check(await active()==='/iot-industrial','keyboard corporate navigation IoT '+width);
    await evaluate('document.querySelector("a[href=\\"/#proyectos\\"]").click()');await visible('proyectos');
    check(await evaluate('location.pathname==="/"'),'corporate projects reaches homepage '+width);
    await evaluate('document.querySelector("header > div > a[href=\\"/#contacto\\"]").click()');await visible('contacto');
    await evaluate('document.querySelector("a[aria-label=\\"Ir al inicio de PYP Tecnología\\"]").click()');await until('location.pathname==="/"&&location.hash===""&&!!document.querySelector("main")');
    check(true,'logo reaches home '+width);
  }
  if(!before)check(errors.length===0,'no runtime exceptions or console.error');
  fs.writeFileSync(path.join(base,before?'visual-before.json':'browser-results.json'),JSON.stringify({browser:'Edge headless',mode:before?'Before: PYP-011 compiled artifact':'After: PYP-012 compiled artifact',checks:results.length,results,snapshots,errors},null,2));
  console.log(JSON.stringify({before,checks:results.length,errors}));await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'browser-failure.json'),JSON.stringify({checksPassed:results.length,results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
