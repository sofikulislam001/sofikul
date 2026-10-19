// Original animated cover art for project cards. Each cover is a small SVG
// scene that follows the accent color. Animations are defined in index.css
// (classes starting with "cv-") and stop for reduced-motion users.

const font = { fontFamily: '"JetBrains Mono", ui-monospace, monospace' };
const surface = { fill: "rgb(var(--surface))", stroke: "rgb(var(--line))" };

function LostFound() {
  const pins = [
    [110, 105, 0],
    [262, 80, 0.9],
    [312, 168, 1.8],
    [72, 182, 2.6],
  ];
  return (
    <>
      <defs>
        <pattern id="cv-lf-dots" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity=".25" />
        </pattern>
      </defs>
      <rect width="400" height="250" fill="url(#cv-lf-dots)" />
      <g stroke="currentColor" strokeOpacity=".22" strokeWidth="2" fill="none" strokeLinecap="round">
        <path d="M-10 190 C80 150 140 210 230 160 S350 110 410 130" />
        <path d="M60 -10 C90 60 70 120 130 170 S200 240 210 270" />
        <path d="M250 -10 C270 50 330 70 340 140" />
      </g>
      {pins.map(([x, y, d]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="7" fill="none" stroke="currentColor" strokeWidth="2" className="cv-ping" style={{ animationDelay: `${d}s` }} />
          <circle cx={x} cy={y} r="5" fill="currentColor" />
          <path d={`M${x} ${y + 5} v9`} stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </g>
      ))}
      <g className="cv-scan text-accent2">
        <circle cx="150" cy="118" r="30" fill="currentColor" fillOpacity=".08" stroke="currentColor" strokeWidth="3" />
        <path d="M172 141 L196 166" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      </g>
      <g className="cv-pulse">
        <rect x="262" y="196" width="112" height="34" rx="8" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".6" />
        <path d="M276 213 l6 6 l11 -12" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="304" y="207" width="56" height="5" rx="2.5" fill="currentColor" opacity=".7" />
        <rect x="304" y="217" width="38" height="5" rx="2.5" fill="currentColor" opacity=".4" />
      </g>
    </>
  );
}

function PortfolioCover() {
  const lines = [
    ["$ whoami", "cv-s1"],
    ["> Sofikul Islam", "cv-s2"],
    ["$ ls projects/", "cv-s3"],
    ["lost-found  portfolio", "cv-s4"],
    ["$ cat skills.txt", "cv-s5"],
  ];
  return (
    <>
      <rect x="48" y="30" width="304" height="190" rx="12" style={surface} />
      <path d="M48 42 a12 12 0 0 1 12 -12 h280 a12 12 0 0 1 12 12 v18 h-304 z" fill="currentColor" fillOpacity=".1" />
      <circle cx="66" cy="45" r="4" fill="currentColor" opacity=".9" />
      <circle cx="80" cy="45" r="4" fill="currentColor" opacity=".5" />
      <circle cx="94" cy="45" r="4" fill="currentColor" opacity=".25" />
      {lines.map(([t, cls], i) => (
        <text key={t} x="64" y={92 + i * 26} fontSize="13" fill="currentColor" className={cls} style={font}>
          {t}
        </text>
      ))}
      <rect x="64" y="196" width="8" height="14" fill="currentColor" className="cv-blink" />
      <text x="262" y="196" fontSize="26" fill="currentColor" opacity=".18" style={font}>{"</>"}</text>
    </>
  );
}

function TaskBoard() {
  const cols = [40, 150, 260];
  const cards = { 40: [66, 102], 150: [66, 102], 260: [66] };
  return (
    <>
      {cols.map((x) => (
        <g key={x}>
          <rect x={x} y="34" width="100" height="184" rx="10" style={surface} />
          <rect x={x + 12} y="46" width="44" height="6" rx="3" fill="currentColor" opacity=".8" />
          {cards[x].map((y) => (
            <g key={y}>
              <rect x={x + 10} y={y} width="80" height="28" rx="6" fill="currentColor" fillOpacity=".1" stroke="currentColor" strokeOpacity=".3" />
              <rect x={x + 18} y={y + 8} width="44" height="4" rx="2" fill="currentColor" opacity=".55" />
              <rect x={x + 18} y={y + 16} width="28" height="4" rx="2" fill="currentColor" opacity=".3" />
            </g>
          ))}
        </g>
      ))}
      <g className="cv-move text-accent2">
        <rect x="50" y="138" width="80" height="28" rx="6" fill="currentColor" fillOpacity=".25" stroke="currentColor" />
        <rect x="58" y="146" width="44" height="4" rx="2" fill="currentColor" opacity=".9" />
        <rect x="58" y="154" width="28" height="4" rx="2" fill="currentColor" opacity=".5" />
        <circle cx="118" cy="152" r="5" fill="currentColor" />
      </g>
    </>
  );
}

function Dashboard() {
  const bars = [40, 70, 52, 96, 64, 110, 84];
  return (
    <>
      <path d="M40 210 H360 M40 170 H360 M40 130 H360 M40 90 H360 M40 50 H360" fill="none" strokeWidth="1" style={{ stroke: "rgb(var(--line))" }} />
      {bars.map((h, i) => (
        <rect
          key={i}
          x={52 + i * 40}
          y={210 - h}
          width="24"
          height={h}
          rx="4"
          fill="currentColor"
          opacity=".55"
          className="cv-grow"
          style={{ animationDelay: `${i * 0.12}s`, transformOrigin: "50% 100%" }}
        />
      ))}
      <g className="text-accent2">
        <path
          d="M52 160 L92 140 L132 150 L172 100 L212 120 L252 80 L292 96 L332 60"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="420"
          className="cv-draw"
        />
        <circle cx="332" cy="60" r="5" fill="currentColor" className="cv-pulse" />
      </g>
      <circle cx="70" cy="46" r="18" fill="none" strokeWidth="6" style={{ stroke: "rgb(var(--line))" }} />
      <circle cx="70" cy="46" r="18" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeDasharray="70 44" className="cv-spin" />
      <rect x="100" y="38" width="60" height="6" rx="3" fill="currentColor" opacity=".7" />
      <rect x="100" y="50" width="38" height="5" rx="2.5" fill="currentColor" opacity=".35" />
    </>
  );
}

function Chat() {
  return (
    <>
      <g className="cv-pulse">
        <path d="M191 38 v-6 a9 9 0 0 1 18 0 v6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <rect x="186" y="38" width="28" height="20" rx="5" fill="currentColor" />
      </g>
      <g className="cv-s1">
        <rect x="50" y="72" width="150" height="30" rx="14" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".4" />
        <rect x="64" y="83" width="92" height="5" rx="2.5" fill="currentColor" opacity=".6" />
        <rect x="64" y="92" width="58" height="4" rx="2" fill="currentColor" opacity=".3" />
      </g>
      <g className="cv-s2 text-accent2">
        <rect x="170" y="112" width="180" height="30" rx="14" fill="currentColor" fillOpacity=".22" stroke="currentColor" strokeOpacity=".7" />
        <rect x="186" y="123" width="120" height="5" rx="2.5" fill="currentColor" opacity=".8" />
        <rect x="186" y="132" width="70" height="4" rx="2" fill="currentColor" opacity=".4" />
      </g>
      <g className="cv-s3">
        <rect x="50" y="152" width="110" height="30" rx="14" fill="currentColor" fillOpacity=".12" stroke="currentColor" strokeOpacity=".4" />
        <rect x="64" y="163" width="66" height="5" rx="2.5" fill="currentColor" opacity=".6" />
        <rect x="64" y="172" width="40" height="4" rx="2" fill="currentColor" opacity=".3" />
      </g>
      <g className="cv-s4 text-accent2">
        <rect x="250" y="192" width="100" height="30" rx="14" fill="currentColor" fillOpacity=".15" stroke="currentColor" strokeOpacity=".6" />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={280 + i * 20} cy="207" r="4" fill="currentColor" className="cv-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
        ))}
      </g>
    </>
  );
}

function Radar() {
  const blips = [
    [250, 80, 0],
    [160, 160, 1.6],
    [290, 150, 3.1],
    [225, 190, 4.5],
  ];
  return (
    <>
      <defs>
        <radialGradient id="cv-rd" gradientUnits="userSpaceOnUse" cx="200" cy="125" r="95">
          <stop offset="0" stopColor="currentColor" stopOpacity=".55" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g fill="none" stroke="currentColor" strokeOpacity=".35">
        <circle cx="200" cy="125" r="30" />
        <circle cx="200" cy="125" r="60" />
        <circle cx="200" cy="125" r="90" />
        <path d="M200 30 V220 M105 125 H295" strokeOpacity=".2" />
      </g>
      <g className="cv-sweep" style={{ transformOrigin: "200px 125px", transformBox: "view-box" }}>
        <path d="M200 125 L200 35 A90 90 0 0 1 268.94 67.15 Z" fill="url(#cv-rd)" />
        <path d="M200 125 L268.94 67.15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <g className="text-accent2">
        {blips.map(([x, y, d]) => (
          <circle key={`${x}-${y}`} cx={x} cy={y} r="4.5" fill="currentColor" className="cv-blip" style={{ animationDelay: `${d}s` }} />
        ))}
      </g>
      <circle cx="200" cy="125" r="3.5" fill="currentColor" />
    </>
  );
}

const COVERS = {
  lostfound: LostFound,
  portfolio: PortfolioCover,
  taskboard: TaskBoard,
  dashboard: Dashboard,
  chat: Chat,
  radar: Radar,
};

export function hasCover(name) {
  return Boolean(COVERS[name]);
}

export default function Cover({ name }) {
  const Scene = COVERS[name];
  if (!Scene) return null;
  return (
    <svg
      viewBox="0 0 400 250"
      preserveAspectRatio="xMidYMid slice"
      className="cv h-full w-full text-accent"
      aria-hidden="true"
      focusable="false"
    >
      <Scene />
    </svg>
  );
}
