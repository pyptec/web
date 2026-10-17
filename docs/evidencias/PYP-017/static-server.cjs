const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, 'build-temporal/comercial/dist');
const mime = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css', '.png':'image/png', '.webp':'image/webp', '.jpeg':'image/jpeg', '.jpg':'image/jpeg', '.xml':'application/xml; charset=utf-8', '.txt':'text/plain; charset=utf-8' };
http.createServer((request,response)=>{
  if (!['GET','HEAD'].includes(request.method)) { response.writeHead(405);response.end();return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url,'http://127.0.0.1').pathname); }
  catch { response.writeHead(400);response.end();return; }
  const candidate = path.resolve(root,'.'+pathname);
  if (candidate !== root && !candidate.startsWith(root+path.sep)) { response.writeHead(403);response.end();return; }
  const candidates = [candidate,path.join(candidate,'index.html')];
  const file = candidates.find(f=>fs.existsSync(f)&&fs.statSync(f).isFile()) || path.join(root,'index.html');
  response.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});
  if(request.method==='HEAD')response.end();else fs.createReadStream(file).pipe(response);
}).listen(5197,'127.0.0.1',()=>console.log('Static artifact file/directory lookup before SPA fallback: http://127.0.0.1:5197'));
