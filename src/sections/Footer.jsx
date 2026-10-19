import { ArrowUp } from "lucide-react";
import { profile } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import { setRain, useRain } from "../rain.js";
import SocialLinks from "../components/SocialLinks.jsx";

export default function Footer() {
  const { ui } = useLang();
  const rain = useRain();
  return (
    <footer className="border-t border-line bg-ground/80">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 lg:flex-row">
        <p className="font-mono text-sm text-muted">{ui.rights(new Date().getFullYear(), profile.name)}</p>
        <SocialLinks />
        <div className="flex flex-wrap items-center justify-center gap-5 font-mono text-sm">
          <button
            type="button"
            aria-pressed={rain}
            onClick={() => setRain(!rain)}
            className="min-h-[44px] text-muted hover:text-accent"
          >
            {ui.rainLabel(rain)}
          </button>
          <a href="#home" className="inline-flex min-h-[44px] items-center gap-2 hover:text-accent">
            {ui.backToTop} <ArrowUp size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
