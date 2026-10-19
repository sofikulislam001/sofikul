import { profile } from "../data/content.js";
import LogoMark from "./LogoMark.jsx";
import { useLang } from "../i18n.jsx";

export default function Logo() {
  const { ui } = useLang();
  return (
    <a href="#home" aria-label={ui.logoLabel(profile.name)} className="flex items-center gap-3">
      {profile.logo ? (
        <img src={profile.logo} alt="" className="h-10 w-10 object-contain" />
      ) : (
        <LogoMark />
      )}
      <span className="hidden font-mono text-sm text-muted sm:block">
        <span className="text-ink">{profile.name}</span>
        <span className="hidden text-xs xl:block">{profile.handle}@portfolio</span>
      </span>
    </a>
  );
}
