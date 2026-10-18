import fs from 'node:fs';
const base='docs/evidencias/PYP-027';const {origin}=JSON.parse(fs.readFileSync(base+'/servidor-local.json'));
fs.writeFileSync(base+'/navegador.mjs',fs.readFileSync('docs/evidencias/PYP-025/navegador.mjs','utf8').replaceAll('PYP-025','PYP-027').replaceAll('9363','9367').replaceAll('http://127.0.0.1:50255',origin).replaceAll('375','390'));
