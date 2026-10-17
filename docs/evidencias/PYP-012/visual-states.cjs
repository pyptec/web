const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9344',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9344/json/list')).json(); break; } catch { await delay(100); }
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

  const states=[];
  const luminance=rgb=>rgb.map(x=>x/255).map(x=>x<=0.04045?x/12.92:((x+0.055)/1.055)**2.4).reduce((s,x,i)=>s+x*[.2126,.7152,.0722][i],0);
  for(const width of [375,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    for(const route of ['/','/monitoreo-energetico']){
      await call('Page.navigate',{url:'http://127.0.0.1:5183'+route});await until('location.pathname==='+JSON.stringify(route)+'&&!!document.querySelector("header button")');await delay(300);
      await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:999});
      const rect=await evaluate('(()=>{const r=document.querySelector("header button").getBoundingClientRect();return{x:r.x+r.width/2,y:r.y+r.height/2}})()');
      await call('Input.dispatchMouseEvent',{type:'mouseMoved',...rect});await until('getComputedStyle(document.querySelector("header button")).color==="rgb(65, 109, 19)"');await delay(150);
      const hover=await evaluate('(()=>{const s=getComputedStyle(document.querySelector("header button"));return{background:s.backgroundColor,color:s.color}})()');
      check(hover.background==='rgba(166, 206, 57, 0.2)'&&hover.color==='rgb(65, 109, 19)','hover green background and text '+route+' '+width+' '+JSON.stringify(hover));
      await call('Input.dispatchMouseEvent',{type:'mouseMoved',x:0,y:999});
      await evaluate('document.querySelector("header button").focus()');await key('Tab','Tab',9);await key('Tab','Tab',9);
      await evaluate('document.querySelector("header button").focus()');
      const focus=await evaluate('(()=>{const b=document.querySelector("header button"),s=getComputedStyle(b);return{visible:b.matches(":focus-visible"),outlineStyle:s.outlineStyle,outlineWidth:s.outlineWidth,color:s.color,background:s.backgroundColor}})()');
      check(focus.visible&&parseFloat(focus.outlineWidth)>=2&&focus.outlineStyle!=='none','keyboard visible outline '+route+' '+width);
      // Conservative opaque-white composition of the existing 20% corporate green.
      const rgb=focus.color.match(/\d+/g).slice(0,3).map(Number),bg=[166,206,57].map(x=>x*.2+255*.8);
      const values=[luminance(rgb),luminance(bg)].sort((a,b)=>a-b),ratio=(values[1]+.05)/(values[0]+.05);
      check(ratio>=4.5,'text contrast at least 4.5:1 '+route+' '+width);
      states.push({width,route,hover,focus,contrast:ratio});
    }
  }
  fs.writeFileSync(path.join(base,'visual-states.json'),JSON.stringify({checks:results.length,results,states,note:'Contrast computed against corporate green at 20% composited on white; supplemental local check, not WCAG certification.'},null,2));
  console.log('Visual state checks: '+results.length);await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'visual-states-failure.json'),JSON.stringify({results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
