const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9337',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9337/json/list')).json(); break; } catch { await delay(100); }
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
  const routes = ['/monitoreo-energetico', '/iot-industrial', '/automatizacion-edge'];
  for (const width of [320, 375, 768, 1024, 1440]) {
    await call('Emulation.setDeviceMetricsOverride', { width, height: 1000, deviceScaleFactor: 1, mobile: width < 640 });
    for (const route of routes) {
      await visit(route);
      check(await evaluate('document.querySelectorAll("header").length===1'), width + ' ' + route + ': one header');
      check(await evaluate('document.documentElement.scrollWidth<=innerWidth'), width + ' ' + route + ': no horizontal overflow');
      check(await evaluate('(()=>{const r=document.querySelector("header a[href$=contacto]").getBoundingClientRect();return r.top>=0&&r.right<=innerWidth&&r.bottom<=innerHeight})()'), width + ' ' + route + ': Hablemos visible');
      await click('header button[aria-controls]');
      check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'), width + ' ' + route + ': mouse opens menu');
      check(await evaluate('document.querySelector("header nav[aria-label^=Navegación] ul a[aria-current=page]").getAttribute("href")===' + JSON.stringify(route)), width + ' ' + route + ': correct active solution');
      check(await evaluate('(()=>{const r=document.querySelector("header nav[aria-label^=Navegación] ul").getBoundingClientRect();return r.width>0&&r.left>=0&&r.right<=innerWidth&&r.bottom<=innerHeight})()'), width + ' ' + route + ': dropdown fits viewport');
      check(await evaluate('document.querySelectorAll("header nav[aria-label^=Navegación] ul a").length===3'), width + ' ' + route + ': three existing solutions');
      if ((width === 320 && route === '/automatizacion-edge') || (width === 1440 && route === '/monitoreo-energetico')) {
        const image = await call('Page.captureScreenshot', { format: 'png' });
        fs.writeFileSync(path.join(base, 'corporate-' + width + '.png'), Buffer.from(image.data, 'base64'));
      }
      await key('Escape', 'Escape', 27);
      check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="false"&&document.activeElement===document.querySelector("header button")'), width + ' ' + route + ': Escape closes and restores focus');
      await key('Enter', 'Enter', 13);
      check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="true"'), width + ' ' + route + ': Enter opens');
      await key('ArrowDown', 'ArrowDown', 40);
      check(await evaluate('document.activeElement===document.querySelector("header nav[aria-label^=Navegación] ul a")'), width + ' ' + route + ': ArrowDown focuses first solution');
      await key('Tab', 'Tab', 9);
      check(await evaluate('document.activeElement===document.querySelectorAll("header nav[aria-label^=Navegación] ul a")[1]'), width + ' ' + route + ': Tab reaches next solution');
      await key('Tab', 'Tab', 9); await key('Tab', 'Tab', 9);
      check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="false"'), width + ' ' + route + ': Tab out closes menu');
      await click('header button');
      await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, x: 1, y: 1 });
      await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, x: 1, y: 1 });
      await delay(50);
      check(await evaluate('document.querySelector("header button").getAttribute("aria-expanded")==="false"'), width + ' ' + route + ': outside click closes');
    }
  }
  await call('Emulation.setDeviceMetricsOverride', { width: 1440, height: 1000, deviceScaleFactor: 1, mobile: false });
  for (const id of ['proyectos', 'tecnologia', 'contacto']) {
    await visit('/iot-industrial');
    await click('header a[href="/#' + id + '"]');
    await until('location.pathname==="/"&&location.hash==="#' + id + '"&&document.activeElement.id==="' + id + '"');
    await delay(1200);
    check(await evaluate('(()=>{const r=document.getElementById(' + JSON.stringify(id) + ').getBoundingClientRect();return r.top>=document.querySelector("header").getBoundingClientRect().bottom-2&&r.top<innerHeight})()'), 'Homepage #' + id + ': reached, focused and visible below sticky header');
  }
  await visit('/automatizacion-edge');
  await click('header a[href="#j1939"]'); await delay(1200);
  check(await evaluate('location.hash==="#j1939"&&document.activeElement.id==="j1939"&&document.getElementById("j1939").getBoundingClientRect().top>=document.querySelector("header").getBoundingClientRect().bottom-2'), 'Edge CAN/J1939 local anchor preserved and visible');
  await visit('/monitoreo-energetico'); await click('header button'); await click('header nav[aria-label^=Navegación] ul a[href="/iot-industrial"]');
  await until('location.pathname==="/iot-industrial"&&!!document.querySelector("header button")');
  check(true, 'Solution link navigates Monitoreo -> IoT');
  check(await evaluate('(()=>{const a=document.querySelector("header a[target=_blank]");return a.href==="https://iotrack.com.co/"&&a.rel.includes("noopener")&&a.rel.includes("noreferrer")})()'), 'Platform external link target and rel preserved');
  fs.writeFileSync(path.join(base, 'corporate-results.json'), JSON.stringify({ browser: 'Microsoft Edge headless via CDP', checks: results.length, results }, null, 2));
  console.log('Browser checks passed: ' + results.length);
  await call('Browser.close');
})().catch(error => {
  fs.writeFileSync(path.join(base, 'corporate-results.json'), JSON.stringify({ checksPassed: results.length, results, error: error.message }, null, 2));
  console.error(error);
  process.exitCode = 1;
}).finally(() => { ws?.close(); browser.kill(); });
