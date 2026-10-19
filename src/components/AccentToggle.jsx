import { Palette } from "lucide-react";
import { nextAccent, useAccent } from "../accent.js";
import { useLang } from "../i18n.jsx";

// Cycles the accent color: green -> cyan -> amber -> pink.
export default function AccentToggle() {
  const { ui } = useLang();
  const accent = useAccent();
  return (
    <button
      type="button"
      onClick={nextAccent}
      aria-label={ui.accentLabel(accent)}
      className="flex h-11 w-11 items-center justify-center rounded-lg border border-line text-accent transition hover:border-accent"
    >
      <Palette size={20} aria-hidden="true" />
    </button>
  );
}
