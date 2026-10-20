import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { startAnalytics, recordPage, recordContactClick } from "../lib/analytics.js";

export default function Analytics() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    startAnalytics();
    document.addEventListener("click", recordContactClick);
    return () => document.removeEventListener("click", recordContactClick);
  }, []);
  useEffect(() => { recordPage(pathname, search); }, [pathname, search]);
  return null;
}
