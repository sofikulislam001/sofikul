import { Facebook, Github, Linkedin, Youtube, Link as LinkIcon } from "lucide-react";
import { socials } from "../data/content.js";

const icons = {
  github: Github,
  linkedin: Linkedin,
  facebook: Facebook,
  youtube: Youtube,
};

// Renders only the social links that have a real URL.
export default function SocialLinks({ className = "" }) {
  const active = socials.filter((s) => s.url);
  if (active.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-3 ${className}`}>
      {active.map((s) => {
        const Icon = icons[s.id] || LinkIcon;
        return (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-muted transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
            >
              <Icon size={20} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
