import fs from 'node:fs';
const base='docs/evidencias/PYP-028';
const {origin}=JSON.parse(fs.readFileSync(base+'/servidor-local.json'));
const p=base+'/navegador.mjs';
fs.writeFileSync(p,fs.readFileSync(p,'utf8').replaceAll('http://127.0.0.1:58215',origin));