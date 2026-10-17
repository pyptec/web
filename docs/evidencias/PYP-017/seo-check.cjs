const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9359',
  '--user-data-dir=' + path.join(base, 'browser-profile/seo'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 100; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9359/json/list')).json(); break; } catch { await delay(100); }
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

  const origin='http://127.0.0.1:5197',expected=JSON.parse(fs.readFileSync(path.join(base,'metadatos-esperados.json'))),snapshots=[],errors=[];
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.value||a.description).join(' '));});
  await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Fetch.requestPaused'){const ok=m.params.request.url.startsWith(origin+'/')&&m.params.request.method!=='POST';call(ok?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(ok?{}:{errorReason:'BlockedByClient'})});}});
  const getHead=String.raw`(doc)=>{
    const meta=(key)=>doc.querySelector('meta[property="'+key+'"]')?.content;
    return {title:doc.title,description:doc.querySelector('meta[name="description"]')?.content,canonical:doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),ogTitle:meta('og:title'),ogDescription:meta('og:description'),ogUrl:meta('og:url'),image:meta('og:image'),imageType:meta('og:image:type'),imageWidth:meta('og:image:width'),imageHeight:meta('og:image:height'),imageAlt:meta('og:image:alt'),duplicates:['og:title','og:description','og:url','og:image','og:image:type','og:image:width','og:image:height','og:image:alt'].some(key=>doc.querySelectorAll('meta[property="'+key+'"]').length!==1)||doc.querySelectorAll('meta[name=description]').length!==1||doc.querySelectorAll('link[rel=canonical]').length!==1,twitter:doc.querySelectorAll('meta[name^="twitter:"]').length};
  }`;
  const same=(h,p)=>h.title===p.title&&h.description===p.description&&h.canonical===p.canonical&&h.ogTitle===p.title&&h.ogDescription===p.description&&h.ogUrl===p.canonical&&h.image===p.image.url&&h.imageType===p.image.type&&h.imageWidth===String(p.image.width)&&h.imageHeight===String(p.image.height)&&h.imageAlt===p.image.alt&&!h.duplicates&&h.twitter===0;
  await call('Page.navigate',{url:origin+'/'});await until('!!document.querySelector("header")');
  for(const [route,page]of Object.entries(expected)){
    for(const suffix of route==='/'?['']:['','/']){
      const raw=await evaluate('(async()=>{const r=await fetch('+JSON.stringify(route+suffix)+');const html=await r.text();const doc=new DOMParser().parseFromString(html,"text/html"),f=doc.querySelector("form");return {status:r.status,head:('+getHead+')(doc),form:{name:f?.name,method:f?.getAttribute("method"),netlify:f?.getAttribute("data-netlify"),honeypot:f?.getAttribute("netlify-honeypot"),hidden:f?.hidden,fields:[...f.querySelectorAll("[name]")].map(e=>e.name).sort()},root:!!doc.querySelector("#root"),bundle:!!doc.querySelector("script[type=module][src]")};})()');
      check(raw.status===200&&same(raw.head,page),'raw HTML SEO without executing downloaded JavaScript '+route+suffix);
      check(raw.form.name==='contacto-pyp'&&raw.form.method==='POST'&&raw.form.netlify==='true'&&raw.form.honeypot==='bot-field'&&raw.form.hidden,'static Netlify detection markers '+route+suffix);
      check(JSON.stringify(raw.form.fields)===JSON.stringify(['bot-field','correo','empresa','form-name','mensaje','nombre','solucion']),'all Netlify fields preserved '+route+suffix);
      check(raw.root&&raw.bundle,'React entry preserved '+route+suffix);
      snapshots.push({test:'raw HTTP HTML',route:route+suffix,...raw});
    }
  }
  for(const width of [375,1440]){
    await call('Emulation.setDeviceMetricsOverride',{width,height:1000,deviceScaleFactor:1,mobile:width<640});
    for(const [route,page]of Object.entries(expected)){
      await call('Page.navigate',{url:origin+route});await until('location.pathname==='+JSON.stringify(route)+'&&!!document.querySelector("header")&&!!document.querySelector("main")');await delay(100);
      const h=await evaluate('('+getHead+')(document)');
      check(same(h,page),'React metadata match raw HTML '+route+' '+width);
      check(await evaluate('document.querySelectorAll("header").length===1&&document.documentElement.scrollWidth<=innerWidth'),'single header and no overflow '+route+' '+width);
      snapshots.push({test:'React direct route',route,width,...h});
    }
    for(const [route,page]of Object.entries(expected)){
      await evaluate('history.pushState({}, "", '+JSON.stringify(route)+');dispatchEvent(new PopStateEvent("popstate"));');
      await until('document.title==='+JSON.stringify(page.title));
      check(same(await evaluate('('+getHead+')(document)'),page),'client route updates all metadata without reload '+route+' '+width);
    }
    await evaluate('document.querySelector("a[href=\\"/#proyectos\\"]").click()');
    await until('location.pathname==="/"&&document.activeElement.id==="proyectos"');
    check(same(await evaluate('('+getHead+')(document)'),expected['/']),'corporate hash navigation retains canonical without fragment '+width);
  }
  const assets=await evaluate('(async()=>{const r=await fetch("/og-pyp.png"),blob=await r.blob(),bitmap=await createImageBitmap(blob);return{status:r.status,type:r.headers.get("content-type"),width:bitmap.width,height:bitmap.height,bytes:blob.size};})()');
  check(assets.status===200&&assets.type.includes('image/png')&&assets.width===1448&&assets.height===1086,'Open Graph image HTTP type and real dimensions');
  const sitemap=await evaluate('(async()=>{const r=await fetch("/sitemap.xml"),xml=await r.text(),doc=new DOMParser().parseFromString(xml,"application/xml");return{status:r.status,error:!!doc.querySelector("parsererror"),namespace:doc.documentElement.namespaceURI,urls:[...doc.getElementsByTagNameNS("http://www.sitemaps.org/schemas/sitemap/0.9","loc")].map(e=>e.textContent),lastmod:doc.getElementsByTagName("lastmod").length};})()');
  check(sitemap.status===200&&!sitemap.error&&sitemap.namespace==='http://www.sitemaps.org/schemas/sitemap/0.9','valid sitemap XML');
  check(JSON.stringify(sitemap.urls.sort())===JSON.stringify(Object.values(expected).map(p=>p.canonical).sort())&&sitemap.lastmod===0,'exact four canonical URLs without invented lastmod');
  const robots=await evaluate('(async()=>{const r=await fetch("/robots.txt");return{status:r.status,text:await r.text()}})()');
  check(robots.status===200&&robots.text.includes('Sitemap: https://pyptecnologia.com/sitemap.xml')&&robots.text.includes('Allow: /'),'robots permits crawling and points to official sitemap');
  check(errors.length===0,'no runtime exceptions or console.error');
  fs.writeFileSync(path.join(base,'seo-results.json'),JSON.stringify({checks:results.length,results,snapshots,image:assets,sitemap,robots,errors,limitations:'Local static server uses file/directory lookup before SPA fallback; this is not Netlify CDN/form processing. No production traffic or submissions.'},null,2));
  console.log(JSON.stringify({checks:results.length,errors}));await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'seo-failure.json'),JSON.stringify({results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
