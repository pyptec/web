import fs from 'node:fs';
const base='docs/evidencias/PYP-025';
const {origin}=JSON.parse(fs.readFileSync(base+'/servidor-local.json'));
let browser=fs.readFileSync('docs/evidencias/PYP-021/navegador.mjs','utf8')
.replaceAll('docs/evidencias/PYP-021',base).replaceAll('9361','9363')
.replaceAll('https://pyptecnologia.com',origin)
.replaceAll('location.hostname==="pyptecnologia.com"','location.hostname==="127.0.0.1"')
.replace("'/automatizacion-edge/'];","'/automatizacion-edge/','/proyectos/clg','/proyectos/clg/'];")
.replace("route.slice(1))+'-'+width","route.slice(1).replaceAll('/','-'))+'-'+width");
browser=browser.replace("await delay(500);};", "await until('document.readyState===\"complete\"');await ev('document.fonts.ready.then(()=>true)');await delay(150);};");
const audit="({h1Count:document.querySelectorAll('h1').length,duplicateIds:[...document.querySelectorAll('[id]')].map(e=>e.id).filter((x,i,a)=>a.indexOf(x)!==i),images:[...document.querySelectorAll('main img')].map(i=>({src:i.getAttribute('src'),alt:i.getAttribute('alt'),width:i.getAttribute('width'),height:i.getAttribute('height'),loading:i.loading,complete:i.complete,naturalWidth:i.naturalWidth})),json:[...document.querySelectorAll('script[type=\"application/ld+json\"]')].map(s=>JSON.parse(s.textContent)),vitals:window.__pypVitals||null})";
const marker="await click('header button[aria-controls]');state.menuOpened=";
if(!browser.includes(marker))throw Error('Marcador navegador no encontrado');
browser=browser.replace(marker,"state.contentAudit=await ev("+JSON.stringify(audit)+");\n"+marker);
const perf="(()=>{window.__pypVitals={lcp:null,cls:0};try{new PerformanceObserver(list=>{for(const e of list.getEntries())window.__pypVitals.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__pypVitals.cls+=e.value}).observe({type:'layout-shift',buffered:true})}catch{}})()";
browser=browser.replace("const routes=[","await call('Page.addScriptToEvaluateOnNewDocument',{source:"+JSON.stringify(perf)+"});\nconst routes=[");
const extra="\ncontext={width:768,route:'/proyectos/clg/'};\nawait call('Emulation.setDeviceMetricsOverride',{width:768,height:1000,deviceScaleFactor:1,mobile:false});\nawait visit('/proyectos/clg/');\nsave('tablet.json',await ev('({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,h1s:document.querySelectorAll(\"h1\").length})'));\nfs.writeFileSync(base+'/pagina-clg-768.png',Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'));\ncontext={width:375,route:'clg-no-javascript'};\nawait call('Emulation.setDeviceMetricsOverride',{width:375,height:1000,deviceScaleFactor:1,mobile:true});\nawait call('Emulation.setScriptExecutionDisabled',{value:true});\nawait call('Page.navigate',{url:ORIGIN+'/proyectos/clg/'});\nawait delay(1200);\nsave('sin-javascript.json',await ev('({h1:document.querySelector(\"h1\")?.textContent,faq:document.querySelectorAll(\"#preguntas-clg dt\").length,text:document.querySelector(\"main\")?.innerText,canonical:document.querySelector(\"link[rel=canonical]\")?.href,hasProjectLink:!!document.querySelector(\"a[href=\\\\\"/#proyectos\\\\\"]\")})'));\nfs.writeFileSync(base+'/clg-sin-javascript-375.png',Buffer.from((await call('Page.captureScreenshot',{format:'png'})).data,'base64'));\nawait call('Emulation.setScriptExecutionDisabled',{value:false});\n".replace('ORIGIN',JSON.stringify(origin));
browser=browser.replace("save('navegador.json',",extra+"\nsave('navegador.json',");
fs.writeFileSync(base+'/navegador.mjs',browser);
