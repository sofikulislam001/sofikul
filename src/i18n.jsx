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
  const [lang, setLangState] = useState(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next) => {
    if (next !== "en" && next !== "bn") return;
    try {
      localStorage.setItem("lang", next);
    } catch {
      /* ignore */
    }
    setLangState(next);
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "bn" : "en"), [lang, setLang]);

  const value = useMemo(
    () => ({
      lang,
      toggle,
      setLang,
      ui: ui[lang],
      // Picks the right language from { en, bn } content; plain strings pass through.
      tx: (v) => (v && typeof v === "object" && !Array.isArray(v) ? v[lang] ?? v.en : v),
    }),
    [lang, toggle, setLang]
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  return useContext(LangContext);
}
