let pendingFrame;

// Shared by corporate links and local navigation, including direct hash URLs.
export function scrollToSection(href) {
  window.cancelAnimationFrame(pendingFrame);
  let id;
  try {
    id = decodeURIComponent(href.split("#")[1] || "");
  } catch (error) {
    // Ignore malformed URL fragments without inventing a section destination.
    if (error instanceof URIError) return;
    throw error;
  }
  if (!id) return;
  const pathname = window.location.pathname;
  const hash = window.location.hash;
  const started = performance.now();

  const scrollWhenReady = () => {
    // A later navigation must never scroll the previous page's section.
    if (window.location.pathname !== pathname || window.location.hash !== hash) return;
    const target = document.getElementById(id);
    if (!target) {
      if (performance.now() - started < 2000) pendingFrame = window.requestAnimationFrame(scrollWhenReady);
      return;
    }

    const headerHeight = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - headerHeight - 16,
      behavior: reducedMotion ? "instant" : "smooth",
    });
    if (!target.hasAttribute("tabindex")) {
      target.setAttribute("tabindex", "-1");
      target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
    }
    target.focus({ preventScroll: true });
  };

  pendingFrame = window.requestAnimationFrame(scrollWhenReady);
}
