// The site's own logo mark: a hexagon with a glitching "S" (drawn as paths, so
// it needs no font). Follows the accent color. Same artwork as public/logo.svg.
const S = "M43 23 C43 15 21 15 21 25 C21 35 43 29 43 40 C43 50 21 49 21 41";

export default function LogoMark({ className = "h-10 w-10" }) {
  return (
    <svg viewBox="0 0 64 64" className={`logo-mark ${className}`} aria-hidden="true" focusable="false">
      <polygon
        points="32,3 58,18 58,46 32,61 6,46 6,18"
        style={{ fill: "rgb(var(--surface))", stroke: "rgb(var(--accent))" }}
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d={S} className="logo-ghost" fill="none" strokeWidth="5" strokeLinecap="round" style={{ stroke: "rgb(var(--accent2))" }} transform="translate(2 -1)" />
      <path d={S} fill="none" strokeWidth="5" strokeLinecap="round" style={{ stroke: "rgb(var(--accent))" }} />
      <circle cx="32" cy="8.5" r="1.8" style={{ fill: "rgb(var(--accent))" }} className="logo-eye" />
    </svg>
  );
}
