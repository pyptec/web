import { createServer, preview } from 'vite';
import fs from 'node:fs';
import path from 'node:path';

const base = path.resolve('docs/evidencias/PYP-014');
const dev = await createServer({
  cacheDir: path.join(base,'build-temporal/vite-dev-cache'),
  server: { host:'127.0.0.1', port:5190, strictPort:true },
});
await dev.listen();
const built = await preview({
  build:{outDir:path.join(base,'build-temporal/comercial/dist')},
  preview:{host:'127.0.0.1',port:5191,strictPort:true},
});
await import('./static-server.cjs');
fs.writeFileSync(path.join(base,'servidores-locales.json'),JSON.stringify({pid:process.pid,dev:'http://127.0.0.1:5190',preview:'http://127.0.0.1:5191',staticArtifact:'http://127.0.0.1:5192',limitations:'Static server is an explicit local model, not Netlify CDN or CLI.'},null,2)+'\n');
console.log('PYP-014: desarrollo 5190, vite preview 5191, artefacto 5192; PID '+process.pid);
process.on('SIGINT',async()=>{await dev.close();built.httpServer.close();process.exit();});
