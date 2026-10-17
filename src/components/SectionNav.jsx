import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { scrollToSection } from "../utils/scrollToSection.js";

export default function SectionNav({ links, ariaLabel = "Secciones de esta página" }) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash) scrollToSection(location.hash);
  }, [location.key, location.hash]);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash) scrollToSection(window.location.hash);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleClick = (event) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    navigate(event.currentTarget.getAttribute("href"));
  };

  return (
    <nav aria-label={ariaLabel} className="border-t border-gray-200 bg-[#F5F5F5]">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-5 md:px-6">
        <span aria-hidden="true" className="shrink-0 text-xs font-medium text-gray-500">En esta página</span>
        <ul className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto whitespace-nowrap px-1 py-2 text-sm">
          {links.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <a
                href={href}
                onClick={handleClick}
                onFocus={(event) => event.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" })}
                className="block scroll-mx-1 rounded-md px-3 py-1.5 text-[#416D13] underline-offset-4 hover:bg-white hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#416D13]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
