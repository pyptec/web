export default {
  lang: 'es-CO',
  title: 'PYP · Documentación técnica',
  description: 'Prompts, bitácora, arquitectura y evidencias del proyecto PYP',
  outDir: './.vitepress/dist',
  srcExclude: ['**/build-temporal/**'],
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Bitácora', link: '/BITACORA_DESARROLLO' },
      { text: 'Prompts', link: '/prompts/' },
    ],
    sidebar: [
      { text: 'Inicio', link: '/' },
      { text: 'Bitácora', link: '/BITACORA_DESARROLLO' },
      { text: 'Prompts', items: [
        { text: 'Índice', link: '/prompts/' },
        { text: 'PYP-001', link: '/prompts/PYP-001' },
        { text: 'PYP-002', link: '/prompts/PYP-002' },
        { text: 'PYP-004', link: '/prompts/PYP-004' },
        { text: 'PYP-005', link: '/prompts/PYP-005' },
        { text: 'PYP-005B', link: '/prompts/PYP-005B' },
        { text: 'PYP-006', link: '/prompts/PYP-006' },
        { text: 'PYP-007', link: '/prompts/PYP-007' },
        { text: 'PYP-008', link: '/prompts/PYP-008' },
      ] },
      { text: 'Arquitectura', link: '/arquitectura/' },
      { text: 'Evidencias', link: '/evidencias/' },
    ],
    search: { provider: 'local' },
  },
};
