import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { ui } from "./data/ui.js";

const LangContext = createContext(null);

function initialLang() {
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "bn") return saved;
  } catch {
    /* storage can be unavailable; fall back to English */
  }
  return "en";
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const toggle = useCallback(() => {
    const next = lang === "en" ? "bn" : "en";
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
    setLang(next);
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      toggle,
      ui: ui[lang],
      // Picks the right language from { en, bn } content; plain strings pass through.
      tx: (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.en : v),
    }),
    [lang, toggle]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
