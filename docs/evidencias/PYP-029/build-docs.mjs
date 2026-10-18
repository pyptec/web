import {build} from 'vitepress';
import path from 'node:path';
const temporary=path.resolve('docs/evidencias/PYP-029/build-temporal');
await build('docs',{outDir:path.join(temporary,'documentacion'),onAfterConfigResolve(config){config.tempDir=path.join(temporary,'vitepress-ssr');config.cacheDir=path.join(temporary,'vitepress-cache');config.vite={...config.vite,cacheDir:path.join(temporary,'vitepress-vite-cache')};}});
