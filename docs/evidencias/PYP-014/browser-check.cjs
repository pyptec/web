const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const base = __dirname;
const browser = spawn('C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', [
  '--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check',
  '--disable-extensions', '--remote-debugging-port=9346',
  '--user-data-dir=' + path.join(base, 'browser-profile'), 'about:blank',
], { windowsHide: true, stdio: 'ignore' });
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
let ws;
const results = [];
const check = (condition, message) => { if (!condition) throw Error(message); results.push(message); };
(async () => {
  let targets;
  for (let i = 0; i < 300; i++) {
    try { targets = await (await fetch('http://127.0.0.1:9346/json/list')).json(); break; } catch { await delay(100); }
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
  const until = async expression => { for (let i = 0; i < 300; i++) { if (await evaluate(expression)) return; await delay(50); } throw Error('Timeout: ' + expression); };
  const visit = async route => { await call('Page.navigate', { url: 'http://127.0.0.1:5179' + route }); await until('!!document.querySelector("header button[aria-controls]") && !!document.querySelector("h1")'); await delay(80); };
  const key = async (name, code, virtual) => { await call('Input.dispatchKeyEvent', { type: name === 'Enter' ? 'keyDown' : 'rawKeyDown', key: name, code, windowsVirtualKeyCode: virtual, nativeVirtualKeyCode: virtual, ...(name === 'Enter' ? {text: '\r', unmodifiedText: '\r'} : {}) }); await call('Input.dispatchKeyEvent', { type: 'keyUp', key: name, code, windowsVirtualKeyCode: virtual }); await delay(50); };
  const click = async selector => { const r = await evaluate('(()=>{const r=document.querySelector(' + JSON.stringify(selector) + ').getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()'); await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...r }); await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...r }); await delay(80); };
  await call('Page.enable');
  await call('Runtime.enable');

  const {SEO_PAGES,getSeoPage}=await import('../../../src/data/seo.js');
  const routes=['/','/monitoreo-energetico','/monitoreo-energetico/','/iot-industrial','/iot-industrial/','/automatizacion-edge','/automatizacion-edge/'];
  const environments=[{name:'desarrollo',origin:'http://127.0.0.1:5190'},{name:'preview',origin:'http://127.0.0.1:5191'},{name:'artefacto',origin:'http://127.0.0.1:5192'}];
  const rows=[],assets=[],errors=[];
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Runtime.exceptionThrown')errors.push(m.params.exceptionDetails.exception?.description||m.params.exceptionDetails.text);if(m.method==='Runtime.consoleAPICalled'&&m.params.type==='error')errors.push(m.params.args.map(a=>a.value||a.description).join(' '));});
  await call('Fetch.enable',{patterns:[{urlPattern:'*',requestStage:'Request'}]});
  ws.addEventListener('message',event=>{const m=JSON.parse(event.data);if(m.method==='Fetch.requestPaused'){const ok=environments.some(e=>m.params.request.url.startsWith(e.origin+'/'))&&m.params.request.method!=='POST';call(ok?'Fetch.continueRequest':'Fetch.failRequest',{requestId:m.params.requestId,...(ok?{}:{errorReason:'BlockedByClient'})});}});
  const head=String.raw`doc=>{
    const meta=key=>doc.querySelector('meta[property="'+key+'"]')?.content;
    return {title:doc.title,description:doc.querySelector('meta[name="description"]')?.content,canonical:doc.querySelector('link[rel="canonical"]')?.getAttribute('href'),ogTitle:meta('og:title'),ogDescription:meta('og:description'),ogUrl:meta('og:url'),image:meta('og:image'),imageType:meta('og:image:type'),imageWidth:meta('og:image:width'),imageHeight:meta('og:image:height'),imageAlt:meta('og:image:alt'),duplicates:['og:title','og:description','og:url','og:image'].some(key=>doc.querySelectorAll('meta[property="'+key+'"]').length!==1)||doc.querySelectorAll('meta[name=description]').length!==1||doc.querySelectorAll('link[rel=canonical]').length!==1};
  }`;
  const expected=p=>({title:p.title,description:p.description,canonical:p.canonical,ogTitle:p.title,ogDescription:p.description,ogUrl:p.canonical,image:p.image.url,imageType:p.image.type,imageWidth:String(p.image.width),imageHeight:String(p.image.height),imageAlt:p.image.alt,duplicates:false});
  await call('Emulation.setDeviceMetricsOverride',{width:1440,height:1000,deviceScaleFactor:1,mobile:false});
  for(const env of environments){
    for(const route of routes){
      const response=await fetch(env.origin+route,{redirect:'manual',headers:{Accept:'text/html'}}),html=await response.text();
      const slug=route==='/'?'inicio':route.slice(1).replace(/\/$/,'')+(route.endsWith('/')?'-con-barra':'-sin-barra');
      const folder=path.join(base,'html-inicial',env.name);fs.mkdirSync(folder,{recursive:true});fs.writeFileSync(path.join(folder,slug+'.html'),html);
      await call('Page.navigate',{url:env.origin+route});
      const normalized=route.replace(/\/+$/,'')||'/',page=getSeoPage(normalized);
      await until('location.pathname==='+JSON.stringify(route)+'&&!!document.querySelector("main")&&!!document.querySelector("h1")&&document.title==='+JSON.stringify(page.title));
      const raw=await evaluate('(()=>{const doc=new DOMParser().parseFromString('+JSON.stringify(html)+',"text/html"),f=doc.querySelector("form");return {head:('+head+')(doc),form:{name:f?.name,method:f?.getAttribute("method"),netlify:f?.getAttribute("data-netlify"),honeypot:f?.getAttribute("netlify-honeypot"),hidden:f?.hidden,fields:[...f.querySelectorAll("[name]")].map(e=>e.name).sort()},root:!!doc.querySelector("#root")};})()');
      const mounted=await evaluate('({head:('+head+')(document),main:!!document.querySelector("main"),heading:document.querySelector("h1").textContent,headers:document.querySelectorAll("header").length,path:location.pathname,active:document.querySelector("header a[aria-current=page]")?.getAttribute("href")||null})');
      const expectedInitialRoute=env.name==='desarrollo'||(env.name==='preview'&&route!=='/'&&!route.endsWith('/'))?'/':normalized;
      const initialMatches=JSON.stringify(raw.head)===JSON.stringify(expected(page));
      check(response.status===200,'HTTP 200 '+env.name+' '+route);
      check(JSON.stringify(raw.head)===JSON.stringify(expected(getSeoPage(expectedInitialRoute))),'initial HTML matches measured environment behavior '+env.name+' '+route);
      check(JSON.stringify(mounted.head)===JSON.stringify(expected(page)),'React metadata correct '+env.name+' '+route);
      check(mounted.main&&mounted.heading&&mounted.headers===1&&mounted.path===route,'React Router renders without blank page or redirect '+env.name+' '+route);
      check(normalized==='/'?mounted.active===null:mounted.active===normalized,'active route correct '+env.name+' '+route);
      check(raw.form.name==='contacto-pyp'&&raw.form.method==='POST'&&raw.form.netlify==='true'&&raw.form.honeypot==='bot-field'&&raw.form.hidden&&JSON.stringify(raw.form.fields)===JSON.stringify(['bot-field','correo','empresa','form-name','mensaje','nombre','solucion']),'static Netlify definition complete '+env.name+' '+route);
      rows.push({environment:env.name,url:route,status:response.status,location:response.headers.get('location'),contentType:response.headers.get('content-type'),initialMatchesRequestedRoute:initialMatches,initialMetadataRoute:expectedInitialRoute,raw,mounted,htmlFile:'html-inicial/'+env.name+'/'+slug+'.html'});
    }
    const root=env.origin+'/';await call('Page.navigate',{url:root});await until('!!document.querySelector("main")&&location.hash===""');
    for(const route of Object.keys(SEO_PAGES)){
      await evaluate('history.pushState({}, "", '+JSON.stringify(route)+');dispatchEvent(new PopStateEvent("popstate"));');
      await until('document.title==='+JSON.stringify(getSeoPage(route).title));
      check(JSON.stringify(await evaluate('('+head+')(document)'))===JSON.stringify(expected(getSeoPage(route))),'client route metadata updates '+env.name+' '+route);
    }
    const sitemapResponse=await fetch(env.origin+'/sitemap.xml'),xml=await sitemapResponse.text();
    const sitemap=await evaluate('(()=>{const doc=new DOMParser().parseFromString('+JSON.stringify(xml)+',"application/xml");return{error:!!doc.querySelector("parsererror"),namespace:doc.documentElement.namespaceURI,urls:[...doc.getElementsByTagNameNS("http://www.sitemaps.org/schemas/sitemap/0.9","loc")].map(e=>e.textContent).sort(),lastmod:doc.getElementsByTagName("lastmod").length}})()');
    check(sitemapResponse.status===200&&!sitemap.error&&sitemap.namespace==='http://www.sitemaps.org/schemas/sitemap/0.9'&&sitemap.lastmod===0&&JSON.stringify(sitemap.urls)===JSON.stringify(Object.keys(SEO_PAGES).map(r=>getSeoPage(r).canonical).sort()),'sitemap XML equals four canonical URLs '+env.name);
    const robots=await(await fetch(env.origin+'/robots.txt')).text();
    check(robots.includes('Allow: /')&&robots.includes('Sitemap: https://pyptecnologia.com/sitemap.xml'),'robots references official sitemap '+env.name);
    const image=await fetch(env.origin+'/og-pyp.png');
    check(image.status===200&&image.headers.get('content-type').includes('image/png'),'Open Graph image available '+env.name);
    assets.push({environment:env.name,sitemap,robots,imageStatus:image.status,imageType:image.headers.get('content-type')});
  }
  check(errors.length===0,'no runtime exceptions or console.error across environments');
  fs.writeFileSync(path.join(base,'comparacion-entornos.json'),JSON.stringify({checks:results.length,results,rows,assets,errors,limitations:'Dev and Vite preview are measured; static server is only file/directory lookup before fallback, not Netlify CDN. No production requests or form submissions.'},null,2));
  console.log(JSON.stringify({checks:results.length,rows:rows.map(r=>({env:r.environment,url:r.url,status:r.status,initialMatches:r.initialMatchesRequestedRoute})),errors}));await call('Browser.close');
})().catch(error=>{fs.writeFileSync(path.join(base,'browser-failure.json'),JSON.stringify({results,error:error.message},null,2));console.error(error);process.exitCode=1;}).finally(()=>{ws?.close();browser.kill();});
