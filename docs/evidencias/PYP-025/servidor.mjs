import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
export function artifactServer(root){
const absolute=path.resolve(root);
return http.createServer((req,res)=>{
if(!['GET','HEAD'].includes(req.method)){res.writeHead(405);res.end();return;}
let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);}catch{res.writeHead(400);res.end();return;}
let file=path.resolve(absolute,'.'+pathname);
if(file!==absolute&&!file.startsWith(absolute+path.sep)){res.writeHead(403);res.end();return;}
if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
if(!fs.existsSync(file)){if(path.extname(pathname)){res.writeHead(404);res.end();return;}file=path.join(absolute,'index.html');}
const types={'.html':'text/html; charset=utf-8','.js':'application/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp'};
res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
res.setHeader('Cache-Control','no-store');res.writeHead(200);res.end(req.method==='HEAD'?undefined:fs.readFileSync(file));
});}
