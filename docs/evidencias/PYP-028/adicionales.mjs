import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import {execFileSync} from 'node:child_process';
const base='docs/evidencias/PYP-028',root=base+'/build-temporal/comercial';
const clg=fs.readFileSync(root+'/proyectos/clg/index.html','utf8'),home=fs.readFileSync(root+'/index.html','utf8');
const check=[];const add=(name,passed)=>check.push({name,passed:!!passed});
add('Hardware 4/4/4', ['4 entradas digitales acopladas','4 salidas de relé','4 entradas analógicas ADC'].every(x=>clg.includes(x)));
add('Caso clientes y cantidad',['47 dispositivos instalados','Alkosto y Ktronix','href="/#caso-clg"'].every(x=>clg.includes(x))&&home.includes('id="caso-clg"')&&home.includes('47 dispositivos CLG instalados'));
add('Enlaces contextuales',['/iot-industrial/','/automatizacion-edge/','/#contacto'].every(x=>clg.includes('href="'+x+'"')));
add('MQTT condicionado',clg.includes('Su implementación específica en CLG está pendiente de verificación'));
add('Sin divulgación de plataforma en HTML CLG',!/(raspberry|raspbian|broadcom|cortex|ubuntu|debian|linux|windows|procesador|sistema operativo)/i.test(clg));
add('Sin divulgación de plataforma en fuentes CLG',['src/pages/CLG.jsx','src/data/clg.js','src/data/clg-meta.js','src/data/structuredData.js'].every(p=>!/(raspberry|raspbian|broadcom|cortex|ubuntu|debian|linux|windows|procesador|sistema operativo)/i.test(fs.readFileSync(p,'utf8'))));
for(const p of ['index.html','package.json','package-lock.json','src/pages/IoTIndustrial.jsx','src/pages/AutomatizacionEdge.jsx','src/pages/MonitoreoEnergetico.jsx']){
 if(fs.existsSync(p))add('Archivo intacto '+p,execFileSync('git',['show','HEAD:'+p]).toString('utf8').replaceAll('\r\n','\n')===fs.readFileSync(p,'utf8').replaceAll('\r\n','\n'));
}
const initial=JSON.parse(fs.readFileSync(base+'/dist-inicial.json','utf8').replace(/^\uFEFF/,''));
const hash=p=>crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex').toUpperCase();
const files=fs.readdirSync('dist',{recursive:true}).filter(p=>fs.statSync(path.join('dist',p)).isFile());
add('17 archivos dist sin cambios',initial.length===17&&files.length===17&&initial.every(x=>hash(x.Path)===x.Hash));
fs.writeFileSync(base+'/comprobaciones-adicionales.json',JSON.stringify({checks:check,failures:check.filter(x=>!x.passed)},null,2));console.log(JSON.stringify(check));if(check.some(x=>!x.passed))process.exitCode=1;