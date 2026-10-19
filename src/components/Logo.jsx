import { profile } from "../data/content.js";
import { useLang } from "../i18n.jsx";

export default function Logo() {
  const { ui } = useLang();
  return (
    <a href="#home" aria-label={ui.logoLabel(profile.name)} className="flex items-center gap-3">
      {profile.logo ? (
        <img src={profile.logo} alt="" className="h-10 w-10 object-contain" />
      ) : (
        <span aria-hidden="true" className="font-mono text-xl font-bold text-accent">
          &lt;{profile.initials}/&gt;
        </span>
      )}
      <span className="hidden font-mono text-sm text-muted xl:block">{profile.handle}@portfolio</span>
    </a>
  );
}
