import fs from 'node:fs';import path from'node:path';import{createHash}from'node:crypto';import{SEO_PAGES,getSeoPage}from'../../../src/data/seo.js';
const base='docs/evidencias/PYP-037',round=process.argv[2]||'final',root=path.resolve(base,'build-temporal/comercial');
const read=async url=>{try{const r=await fetch(url,{headers:{'Cache-Control':'no-cache'},signal:AbortSignal.timeout(20000)}),bytes=Buffer.from(await r.arrayBuffer());return {url,finalUrl:r.url,status:r.status,type:r.headers.get('content-type'),server:r.headers.get('server'),bytes:bytes.length,hash:createHash('sha256').update(bytes).digest('hex'),text:bytes.toString('utf8')};}catch(e){return{url,error:e.message};}};
const meta=(html,key)=>html.match(new RegExp('<meta\\b[^>]*(?:name|property)="'+key+'"[^>]*content="([^"]*)"','i'))?.[1];
const schema=html=>[...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
const pages=await Promise.all(Object.keys(SEO_PAGES).map(async route=>{
 const page=getSeoPage(route),r=await read(page.canonical),html=r.text||'',local=fs.readFileSync(path.join(root,route==='/'?'':route,'index.html'),'utf8');
 const extract=(h,re)=>h.match(re)?.[1]||null;
 const canonical=extract(html,/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"/i),title=extract(html,/<title[^>]*>([\s\S]*?)<\/title>/i),h1=extract(html,/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
 const assets=[...local.matchAll(/(?:src|href)="(\/assets\/[^"?#]+\.(?:js|css))"/g)].map(m=>m[1]);
 let schemasEqual=false;try{schemasEqual=JSON.stringify(schema(html))===JSON.stringify(schema(local));}catch{}
 delete r.text;
 return {...r,route,canonical,title,h1,matchesCanonical:canonical===page.canonical,matchesTitle:title===extract(local,/<title[^>]*>([\s\S]*?)<\/title>/i),matchesHeading:h1===extract(local,/<h1\b[^>]*>([\s\S]*?)<\/h1>/i),matchesMeta:['description','og:title','og:description','og:url','og:image'].every(k=>meta(html,k)===meta(local,k)),schemasEqual,matchesMain:extract(html,/(<main\b[^>]*>[\s\S]*?<\/main>)/)===extract(local,/(<main\b[^>]*>[\s\S]*?<\/main>)/),matchesBuildAssets:assets.every(a=>html.includes(a))};
}));
const resources=new Set(['/sitemap.xml','/rpi-mdfr-infografia.png']);
for(const route of Object.keys(SEO_PAGES)){const local=fs.readFileSync(path.join(root,route==='/'?'':route,'index.html'),'utf8');for(const m of local.matchAll(/(?:src|href)="(\/(?:assets\/|rpi-mdfr-infografia\.png)[^"?#]*)/g))resources.add(m[1]);}
const requests=[];
for(let i=0;i<[...resources].length;i+=5){requests.push(...await Promise.all([...resources].slice(i,i+5).map(async resource=>{const r=await read('https://pyptecnologia.com'+resource),local=path.join(root,resource);if(resource==='/sitemap.xml')r.routes=[...(r.text||'').matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);delete r.text;r.resource=resource;r.matchesLocal=fs.existsSync(local)&&r.hash===createHash('sha256').update(fs.readFileSync(local)).digest('hex');return r;})));}
const publicMatches=pages.every(p=>p.status===200&&p.matchesCanonical&&p.matchesTitle&&p.matchesHeading&&p.matchesMeta&&p.schemasEqual&&p.matchesMain&&p.matchesBuildAssets)&&requests.every(r=>r.status===200&&r.matchesLocal);
const output={date:new Date().toISOString(),root,publishedBuildMatches:publicMatches,pages,requests,limits:'HTTP y comparación del artefacto; no certifica recepción GA4/formulario ni SHA del proveedor. HTTP 200 con fallback no cuenta como página nueva. No se envían formularios.'};
fs.writeFileSync(base+'/http-produccion-'+round+'.json',JSON.stringify(output,null,2)+'\n');console.log(JSON.stringify({publishedBuildMatches:publicMatches,pages:pages.map(p=>({route:p.route,status:p.status,title:p.title,matchesBuild:p.matchesBuildAssets,error:p.error})),resources:requests.length},null,2));
