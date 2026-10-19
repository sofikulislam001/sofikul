import { useLang } from "../i18n.jsx";

// Switches the whole site between English and Bangla.
export default function LangToggle() {
  const { ui, lang, toggle } = useLang();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={ui.langLabel}
      className="flex h-11 min-w-[44px] items-center justify-center rounded-lg border border-line px-3 font-mono text-sm font-medium text-ink transition hover:border-accent hover:text-accent"
    >
      <span lang={lang === "en" ? "bn" : "en"}>{ui.langButton}</span>
    </button>
  );
}
