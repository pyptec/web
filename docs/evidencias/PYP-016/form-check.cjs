const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9354',
  '--user-data-dir=' + path.join(base, 'browser-profile/form'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9354/json/list')).json(); break; } catch { await delay(100); }
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

  const submissions=[];let responseCode=200;
  await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  ws.addEventListener('message',event=>{
    const m=JSON.parse(event.data);if(m.method!=='Fetch.requestPaused')return;
    const {requestId,request}=m.params;
    if(!request.url.startsWith('http://127.0.0.1:5196/')){call('Fetch.failRequest',{requestId,errorReason:'BlockedByClient'});return;}
    if(request.method==='POST'){
      submissions.push({url:request.url,method:request.method,headers:request.headers,body:request.postData,responseCode});
      call('Fetch.fulfillRequest',{requestId,responseCode,responseHeaders:[{name:'Content-Type',value:'text/html; charset=utf-8'}],body:Buffer.from('<!doctype html><html lang="es"><title>Respuesta simulada local</title><body>SIMULACION LOCAL '+responseCode+'</body></html>').toString('base64')});
    }else call('Fetch.continueRequest',{requestId});
  });
  for(const width of [375,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    await call('Page.navigate',{url:'http://127.0.0.1:5196/'});
    await until('!!document.querySelector("#root form")');
    const schema=await evaluate(`(async()=>{
      const react=document.querySelector('#root form'),html=await(await fetch('/')).text();
      const doc=new DOMParser().parseFromString(html,'text/html'),stat=doc.querySelector('form');
      const describe=f=>({name:f.getAttribute('name'),method:f.getAttribute('method'),honeypot:f.getAttribute('netlify-honeypot'),fields:[...f.querySelectorAll('[name]')].map(e=>e.name).sort(),formName:f.querySelector('[name="form-name"]').value});
      return {react:describe(react),static:describe(stat),hidden:stat.hidden,detect:stat.getAttribute('data-netlify'),required:[...react.querySelectorAll('[required]')].map(e=>e.name).sort(),labels:[...react.querySelectorAll('input:not([type=hidden]),select,textarea')].every(e=>!!e.labels.length),hiddenTrap:getComputedStyle(react.querySelector('[name="bot-field"]').closest('p')).display==='none',singleVisible:document.querySelectorAll('#root form').length===1,overflow:document.documentElement.scrollWidth>innerWidth,utf8:doc.characterSet,text:react.textContent};
    })()`);
    check(JSON.stringify(schema.react)===JSON.stringify(schema.static),'static/React fields/name/method/honeypot match '+width);
    check(schema.hidden&&schema.detect==='true'&&schema.react.formName==='contacto-pyp','static detection contract '+width);
    check(schema.labels&&schema.hiddenTrap&&schema.singleVisible&&!schema.overflow,'labels, hidden honeypot, single visible form, mobile layout '+width);
    check(JSON.stringify(schema.required)===JSON.stringify(['correo','mensaje','nombre']),'required fields preserved '+width);
    check(schema.text.includes('Solución de interés')&&schema.text.includes('Solicitar evaluación')&&!schema.text.includes('\uFFFD'),'Spanish text preserved '+width);
    const before=submissions.length;
    await evaluate("document.querySelector('#root form').requestSubmit()");
    await delay(150);
    check(submissions.length===before,'empty form blocked before submission '+width);
    check(await evaluate("document.activeElement.name==='nombre'"),'required name focused '+width);
    await evaluate("document.querySelector('[id=contacto-nombre]').value='Prueba local';document.querySelector('[id=contacto-correo]').value='invalido';document.querySelector('[id=contacto-mensaje]').value='Mensaje local';document.querySelector('#root form').requestSubmit()");
    check(await evaluate("document.querySelector('#contacto-correo').validity.typeMismatch&&document.activeElement.name==='correo'"),'invalid email blocked '+width);
    check(submissions.length===before,'invalid email produced no POST '+width);
    await evaluate("document.querySelector('#contacto-correo').value='prueba@example.invalid';document.querySelector('#contacto-mensaje').value='';document.querySelector('#root form').requestSubmit()");
    check(await evaluate("document.activeElement.name==='mensaje'&&document.querySelector('#contacto-mensaje').validity.valueMissing"),'required message blocked '+width);
    await evaluate("document.querySelector('#contacto-nombre').focus()");
    await key('Tab','Tab',9);check(await evaluate("document.activeElement.name==='empresa'"),'keyboard name to company '+width);
    await key('Tab','Tab',9);check(await evaluate("document.activeElement.name==='correo'"),'keyboard company to email '+width);
    await evaluate("document.querySelector('#contacto-solucion').focus()");
    await key('ArrowDown','ArrowDown',40);check(await evaluate("!!document.querySelector('#contacto-solucion').value"),'keyboard selects solution '+width);
    await evaluate("document.querySelector('#contacto-nombre').value='José & PYP + prueba';document.querySelector('#contacto-empresa').value='Compañía Ñ';document.querySelector('#contacto-correo').value='prueba@example.invalid';document.querySelector('#contacto-solucion').value='energia';document.querySelector('#contacto-mensaje').value='Energía, acción & + = /';document.querySelector('#contacto-nombre').focus();document.querySelector('#contacto-nombre').scrollIntoView({block:'start',behavior:'instant'});");
    const image=await call('Page.captureScreenshot',{format:'png'});fs.writeFileSync(path.join(base,'contacto-'+width+'.png'),Buffer.from(image.data,'base64'));
    responseCode=width===375?200:500;
    await evaluate("document.querySelector('#root form').requestSubmit()");
    await until("document.body.textContent.includes('SIMULACION LOCAL')");
    check(submissions.length===before+1,'one native POST intercepted locally '+width);
    const sent=submissions.at(-1),params=new URLSearchParams(sent.body);
    check(sent.url==='http://127.0.0.1:5196/'&&sent.method==='POST','native same-origin POST '+width);
    check(params.get('form-name')==='contacto-pyp'&&params.get('nombre')==='José & PYP + prueba'&&params.get('empresa')==='Compañía Ñ'&&params.get('correo')==='prueba@example.invalid'&&params.get('solucion')==='energia'&&params.get('mensaje')==='Energía, acción & + = /'&&params.get('bot-field')==='','all seven fields encoded correctly '+width);
    check(await evaluate("document.body.textContent.includes('SIMULACION LOCAL "+responseCode+"')"),'native response navigation preserved '+responseCode);
  }
  fs.writeFileSync(path.join(base,'form-results.json'),JSON.stringify({browser:'Edge headless',mode:'Compiled local artifact; POST intercepted and simulated via CDP, never sent to Netlify',checks:results.length,results,submissions,limitations:'Synthetic 200/500 do not validate Netlify reception, spam filtering or production error/success pages.'},null,2));
  console.log('Browser checks passed: '+results.length);await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'form-failure.json'),JSON.stringify({checksPassed:results.length,results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
