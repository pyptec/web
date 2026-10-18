
import { useEffect } from "react";

import { getSeoPage } from "../data/seo.js";
import { getPageStructuredData } from "../data/structuredData.js";

function setMeta(attribute, key, content) {
  let element = document.head.querySelector(
    `meta[${attribute}="${key}"]`
  );

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

export default function Seo({ path }) {
  useEffect(() => {
    const page = getSeoPage(path);
    const canonical = page.canonical;

    document.title = page.title;

    setMeta("name", "description", page.description);
    setMeta("property", "og:title", page.title);
    setMeta("property", "og:description", page.description);
    setMeta("property", "og:url", canonical);
    setMeta("property", "og:image", page.image.url);
    setMeta("property", "og:image:type", page.image.type);
    setMeta("property", "og:image:width", page.image.width);
    setMeta("property", "og:image:height", page.image.height);
    setMeta("property", "og:image:alt", page.image.alt);

    let link = document.head.querySelector('link[rel="canonical"]');

    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }

    link.setAttribute("href", canonical);

    const structuredData = getPageStructuredData(path);
    let script = document.getElementById("page-structured-data");
    if (structuredData) {
      if (!script) {
        script = document.createElement("script");
        script.id = "page-structured-data";
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    } else {
      script?.remove();
    }
  }, [path]);

  return null;
}
