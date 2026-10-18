import { profile } from "../data/content.js";
import { useLang } from "../i18n.jsx";

export default function Logo() {
  const { ui } = useLang();
  return (
    <a href="#home" aria-label={ui.logoLabel(profile.name)} className="flex items-center gap-3">
      {profile.logo ? (
        <img src={profile.logo} alt="" className="h-10 w-10 object-contain" />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent font-display text-base font-bold text-onaccent"
        >
          {profile.initials}
        </span>
      )}
      <span className="hidden font-display text-lg font-semibold tracking-tight lg:block">
        {profile.name}
      </span>
    </a>
  );
}
