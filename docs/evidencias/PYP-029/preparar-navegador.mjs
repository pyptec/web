import fs from 'node:fs';
const base='docs/evidencias/PYP-029';
const {origin}=JSON.parse(fs.readFileSync(base+'/servidor-local.json'));
const p=base+'/navegador.mjs',source=fs.readFileSync(p,'utf8');
const previous=source.match(/url:['"](http:\/\/127\.0\.0\.1:\d+)/)?.[1];
if(!previous)throw Error('No se encuentra el origen local de la prueba');
fs.writeFileSync(p,source.replaceAll(previous,origin));