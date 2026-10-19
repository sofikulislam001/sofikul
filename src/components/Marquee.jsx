import { skills } from "../data/content.js";

// Decorative scrolling strip of the technologies listed in the Skills section.
export default function Marquee() {
  const items = [...new Set(skills.flatMap((g) => g.items))];
  if (items.length === 0) return null;
  const group = (
    <ul className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center font-mono text-sm text-muted sm:text-base">
          <span className="px-6">{t}</span>
          <span className="text-accent">/</span>
        </li>
      ))}
    </ul>
  );
  return (
    <div aria-hidden="true" className="marquee overflow-hidden border-y border-line bg-surface/60 py-4">
      <div className="marquee-track">
        {group}
        {group}
      </div>
    </div>
  );
}
