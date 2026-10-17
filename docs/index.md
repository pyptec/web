# Documentación técnica PYP

Documentación independiente del sitio comercial React/Vite.

- [Bitácora de desarrollo](./BITACORA_DESARROLLO.md)
- [Prompts](./prompts/index.md)
- [Arquitectura](./arquitectura/index.md)
- [Evidencias](./evidencias/index.md)

## Consulta local

Desde la raíz del repositorio:

```powershell
npm run docs
```

Abre http://127.0.0.1:5174/. Detén el servidor con Ctrl+C.

Para compilar: `npm run docs:build`. Para previsualizar lo compilado: `npm run docs:preview` y abre http://127.0.0.1:4174/.

La salida documental se guarda en docs/.vitepress/dist; no utiliza dist/ comercial. La búsqueda local se abre desde la barra superior.
