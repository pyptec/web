import { SITE_URL, getSeoPage } from "./seo.js";

export function getPageStructuredData(pathname) {
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
      {
        "@type": "Product",
        "@id": page.canonical + "#producto",
        name: "CLG — Cliente Ganador",
        description: page.description,
        url: page.canonical,
        image: page.image.url,
        brand: { "@type": "Brand", name: "PYP" },
        manufacturer: { "@id": SITE_URL + "/#organization" },
      },
    ],
  };
}
