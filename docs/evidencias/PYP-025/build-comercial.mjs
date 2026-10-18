import {build} from 'vite';
import path from 'node:path';
const base=path.resolve('docs/evidencias/PYP-025/build-temporal');
await build({cacheDir:path.join(base,'vite-cache'),build:{outDir:path.join(base,'comercial'),emptyOutDir:false}});
