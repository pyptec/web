import { preview } from 'vite';
import fs from 'node:fs';
import path from 'node:path';
const base=path.resolve('docs/evidencias/PYP-017');
const server=await preview({build:{outDir:path.join(base,'build-temporal/comercial/dist')},preview:{host:'127.0.0.1',port:5198,strictPort:true}});
try {
  const results=[];
  for(const route of ['/','/monitoreo-energetico','/monitoreo-energetico/','/iot-industrial','/iot-industrial/','/automatizacion-edge','/automatizacion-edge/']){
    const response=await fetch('http://127.0.0.1:5198'+route,{redirect:'manual',headers:{Accept:'text/html'}});
    const html=await response.text();
    results.push({route,status:response.status,title:html.match(/<title>([\s\S]*?)<\/title>/)?.[1],canonical:html.match(/<link\b(?=[^>]*\brel="canonical")[^>]*href="([^"]+)"/)?.[1],location:response.headers.get('location')});
  }
  fs.writeFileSync(path.join(base,'vite-preview-rutas.json'),JSON.stringify({vite:'6.4.4',results,note:'Local preview only; not Netlify CDN.'},null,2)+'\n');
  console.log(JSON.stringify(results));
} finally { await new Promise(resolve=>server.httpServer.close(resolve)); }
