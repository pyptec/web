const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9356',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9356/json/list')).json(); break; } catch { await delay(100); }
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

  const origin='http://127.0.0.1:5196',states=[];
  await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Fetch.requestPaused'){const ok=m.params.request.url.startsWith(origin+'/')&&m.params.request.method!=='POST';call(ok?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(ok?{}:{errorReason:'BlockedByClient'})});}});
  for(const width of [375,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    for(const [route,slug]of [['/','inicio'],['/monitoreo-energetico','monitoreo'],['/iot-industrial','iot'],['/automatizacion-edge','edge']]){
      await call('Page.navigate',{url:origin+route});await until('location.pathname==='+JSON.stringify(route)+'&&!!document.querySelector("header img")&&!!document.querySelector("h1")');
      await evaluate('(async()=>{await document.querySelector("header img").decode();await document.fonts.ready;await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));})()');
      const state=await evaluate('(()=>{const i=document.querySelector("header img"),r=i.getBoundingClientRect();return{src:i.getAttribute("src"),complete:i.complete,naturalWidth:i.naturalWidth,width:r.width,height:r.height,overflow:document.documentElement.scrollWidth>innerWidth}})()');
      check(state.complete&&state.naturalWidth>0&&state.width>0&&state.height>0,'official logo decoded and visible '+route+' '+width);
      check(!state.overflow,'stable layout no horizontal overflow '+route+' '+width);
      states.push({route,width,...state});
      if(route==='/'||route==='/monitoreo-energetico'){const shot=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(base,'estable-'+slug+'-'+width+'.png'),Buffer.from(shot.data,'base64'));}
    }
  }
  fs.writeFileSync(path.join(base,'visual-results.json'),JSON.stringify({checks:results.length,results,states,note:'Supplementary verification after waiting for logo decode and fonts; earlier screenshots can be captured before image load.'},null,2));
  console.log('Stable visual checks: '+results.length);await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'visual-failure.json'),JSON.stringify({results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
