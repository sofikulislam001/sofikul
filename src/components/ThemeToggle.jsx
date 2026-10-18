import { Moon, Sun } from "lucide-react";
import { useLang } from "../i18n.jsx";

export default function ThemeToggle({ theme, onToggle }) {
  const { ui } = useLang();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={isDark ? ui.themeToLight : ui.themeToDark}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition hover:border-accent hover:text-accent"
    >
      {isDark ? <Sun size={20} aria-hidden="true" /> : <Moon size={20} aria-hidden="true" />}
    </button>
  );
}
