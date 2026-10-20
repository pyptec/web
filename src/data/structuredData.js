import { SITE_URL, getSeoPage } from "./seo.js";

export function getPageStructuredData(pathname) {
  if (pathname.replace(/\/+$/, "") === "/proyectos/rpi-mdfr") {
    const page = getSeoPage("/proyectos/rpi-mdfr");
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage", "@id": page.canonical + "#webpage",
          name: page.title, description: page.description, url: page.canonical, inLanguage: "es-CO",
          isPartOf: { "@id": SITE_URL + "/#website" },
          publisher: { "@id": SITE_URL + "/#organization" },
          breadcrumb: { "@id": page.canonical + "#breadcrumb" },
          primaryImageOfPage: { "@type": "ImageObject", url: page.image.url, width: page.image.width, height: page.image.height },
        },
        {
          "@type": "BreadcrumbList", "@id": page.canonical + "#breadcrumb",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL + "/" },
            { "@type": "ListItem", position: 2, name: "Proyectos", item: SITE_URL + "/#proyectos" },
            { "@type": "ListItem", position: 3, name: "RPI-MDFR", item: page.canonical },
          ],
        },
      ],
    };
  }
  if (pathname.replace(/\/+$/, "") !== "/proyectos/clg") return null;
  const page = getSeoPage("/proyectos/clg");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": page.canonical + "#breadcrumb",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: "Proyectos", item: SITE_URL + "/#proyectos" },
          { "@type": "ListItem", position: 3, name: "CLG", item: page.canonical },
        ],
      },
    ],
  };
}
