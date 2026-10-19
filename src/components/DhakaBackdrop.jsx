import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLang } from "../i18n.jsx";

// Full-page animated backdrop: a Dhaka night skyline drawn from scratch as SVG
// (high-rises, a mosque, tangled power lines, a rickshaw, crows, fog, lightning).
// To use a real photo or video instead, drop one of these in public/media/:
//   dhaka.mp4  (muted loop video)   or   dhaka.jpg  (slow zoom photo)

const FAR = "#24161a";
const MID = "#150c0f";
const NEAR = "#030607";
const WARM = "#ffd27a";

function rng(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function skyline(seed, minH, maxH, minW, maxW, gap) {
  const r = rng(seed);
  const out = [];
  let x = -30;
  while (x < 1630) {
    const w = minW + r() * (maxW - minW);
    const h = minH + r() * (maxH - minH);
    out.push({ x, w, h, ant: r() > 0.72 });
    x += w + r() * gap;
  }
  return out;
}

function windows(buildings, seed) {
  const r = rng(seed);
  const out = [];
  buildings.forEach((b, bi) => {
    const cols = Math.floor((b.w - 10) / 16);
    const rows = Math.floor((b.h - 20) / 24);
    for (let c = 0; c < cols; c += 1) {
      for (let rw = 0; rw < rows; rw += 1) {
        if (r() < 0.14) {
          out.push({
            k: `${bi}-${c}-${rw}`,
            x: b.x + 8 + c * 16,
            y: 900 - b.h + 14 + rw * 24,
            flick: r() < 0.1,
            d: r() * 6,
          });
        }
      }
    }
  });
  return out;
}

async function probe(url, prefix) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok && (res.headers.get("content-type") || "").startsWith(prefix);
  } catch {
    return false;
  }
}

function Layer({ x, children, className = "" }) {
  return (
    <motion.div style={{ x }} className={`absolute inset-y-0 -left-12 -right-12 ${className}`}>
      <svg
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMax slice"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        {children}
      </svg>
    </motion.div>
  );
}

export default function DhakaBackdrop() {
  const { ui } = useLang();
  const reduce = useReducedMotion();
  const flashRef = useRef(null);
  const [media, setMedia] = useState(null); // null | {kind:"video"|"image", src}

  const far = useMemo(() => skyline(7, 150, 340, 50, 110, 8), []);
  const mid = useMemo(() => skyline(21, 200, 470, 60, 130, 14), []);
  const lit = useMemo(() => windows(mid, 5), [mid]);

  // optional user media
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!reduce && (await probe("/media/dhaka.mp4", "video"))) alive && setMedia({ kind: "video", src: "/media/dhaka.mp4" });
      else if (await probe("/media/dhaka.jpg", "image")) alive && setMedia({ kind: "image", src: "/media/dhaka.jpg" });
    })();
    return () => {
      alive = false;
    };
  }, [reduce]);

  // mouse parallax + scroll fade
  const mx = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const farX = useTransform(sx, (v) => v * -6);
  const midX = useTransform(sx, (v) => v * -14);
  const nearX = useTransform(sx, (v) => v * -26);
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 800], [1, 0.42]);

  useEffect(() => {
    if (reduce) return undefined;
    const onMove = (e) => mx.set((e.clientX / window.innerWidth - 0.5) * 2);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx]);

  // lightning flash (kept gentle: low opacity, two pulses)
  useEffect(() => {
    if (reduce) return undefined;
    const onStrike = () => {
      const el = flashRef.current;
      if (!el || !el.animate) return;
      el.animate(
        [{ opacity: 0 }, { opacity: 0.2 }, { opacity: 0.03 }, { opacity: 0.26 }, { opacity: 0 }],
        { duration: 800, easing: "ease-out" }
      );
    };
    window.addEventListener("fx:lightning", onStrike);
    return () => window.removeEventListener("fx:lightning", onStrike);
  }, [reduce]);

  const poles = [120, 560, 1000, 1440];

  return (
    <div aria-hidden="true" className="bk pointer-events-none fixed inset-0 z-0 overflow-hidden bg-ground">
      <motion.div style={{ opacity: fade }} className="absolute inset-0">
        {/* sky */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 45% at 50% 100%, rgb(var(--accent) / 0.38), transparent 72%), linear-gradient(to bottom, #04060a 0%, #0a1015 60%, #0d171b 100%)",
          }}
        />

        {media?.kind === "video" && (
          <video
            src={media.src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        )}
        {media?.kind === "image" && (
          <div
            className="bk-zoom absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${media.src})` }}
          />
        )}

        {!media && (
          <div className="bk-breathe absolute inset-0">
            {/* moon + stars */}
            <svg
              viewBox="0 0 1600 900"
              preserveAspectRatio="xMidYMax slice"
              className="absolute inset-0 h-full w-full"
              focusable="false"
            >
              <defs>
                <radialGradient id="bk-halo" cx="50%" cy="50%" r="50%">
                  <stop offset="0" style={{ stopColor: "rgb(var(--accent) / 0.28)" }} />
                  <stop offset="1" style={{ stopColor: "rgb(var(--accent) / 0)" }} />
                </radialGradient>
              </defs>
              <circle cx="1220" cy="170" r="230" fill="url(#bk-halo)" />
              <circle cx="1220" cy="170" r="62" fill="#e9dfd6" opacity="0.92" />
              <circle cx="1202" cy="156" r="10" fill="#cfc3b8" opacity="0.6" />
              <circle cx="1240" cy="190" r="14" fill="#cfc3b8" opacity="0.45" />
              {Array.from({ length: 34 }, (_, i) => {
                const r = rng(i + 40);
                return (
                  <circle
                    key={i}
                    cx={r() * 1600}
                    cy={r() * 420}
                    r={0.8 + r() * 1.2}
                    fill="#fff"
                    className="bk-tw"
                    style={{ animationDelay: `${r() * 5}s` }}
                  />
                );
              })}
            </svg>

            <Layer x={farX}>
              <g fill={FAR}>
                {far.map((b, i) => (
                  <g key={i}>
                    <rect x={b.x} y={900 - b.h} width={b.w} height={b.h} />
                    {b.ant && <rect x={b.x + b.w / 2 - 1} y={900 - b.h - 34} width="2" height="34" />}
                  </g>
                ))}
                {/* mosque */}
                <rect x="930" y="690" width="180" height="210" />
                <path d="M958 690 A62 62 0 0 1 1082 690 Z" />
                <rect x="1018" y="606" width="4" height="26" />
                <circle cx="1020" cy="602" r="6" />
                <rect x="918" y="540" width="13" height="360" />
                <rect x="1109" y="540" width="13" height="360" />
                <path d="M914 540 h21 l-10.5 -30 z" />
                <path d="M1105 540 h21 l-10.5 -30 z" />
              </g>
              <path d="M1008 800 v-20 a12 12 0 0 1 24 0 v20 z" fill={WARM} opacity="0.55" className="bk-flick" />
              <path d="M968 800 v-14 a9 9 0 0 1 18 0 v14 z" fill={WARM} opacity="0.35" />
              <path d="M1054 800 v-14 a9 9 0 0 1 18 0 v14 z" fill={WARM} opacity="0.35" />
            </Layer>

            <div className="bk-fog bk-fog1 absolute inset-x-0 bottom-0 h-3/5" />

            <Layer x={midX}>
              <g fill={MID}>
                {mid.map((b, i) => (
                  <g key={i}>
                    <rect x={b.x} y={900 - b.h} width={b.w} height={b.h} />
                    {b.ant && <rect x={b.x + b.w * 0.3} y={900 - b.h - 22} width="3" height="22" />}
                  </g>
                ))}
              </g>
              <g fill={WARM}>
                {lit.map((w) => (
                  <rect
                    key={w.k}
                    x={w.x}
                    y={w.y}
                    width="7"
                    height="10"
                    opacity="0.65"
                    className={w.flick ? "bk-flick" : undefined}
                    style={w.flick ? { animationDelay: `${w.d}s` } : undefined}
                  />
                ))}
              </g>
              {/* something watching from a dark window */}
              <g className="bk-eyes" style={{ fill: "rgb(var(--accent))" }}>
                <circle cx="338" cy="612" r="3.6" />
                <circle cx="354" cy="612" r="3.6" />
              </g>
            </Layer>

            <div className="bk-fog bk-fog2 absolute inset-x-0 bottom-0 h-2/5" />

            <Layer x={nearX}>
              {/* power poles and the famously tangled wires */}
              <g fill={NEAR}>
                {poles.map((px) => (
                  <g key={px}>
                    <rect x={px - 4} y="400" width="8" height="500" />
                    <rect x={px - 34} y="424" width="68" height="5" />
                    <rect x={px - 24} y="456" width="48" height="5" />
                  </g>
                ))}
              </g>
              <g fill="none" stroke={NEAR} strokeWidth="1.7" className="bk-sway">
                {poles.slice(0, -1).map((px, i) => {
                  const nx = poles[i + 1];
                  const mxp = (px + nx) / 2;
                  return (
                    <g key={px}>
                      <path d={`M${px + 30} 426 Q${mxp} 500 ${nx - 30} 426`} />
                      <path d={`M${px + 24} 458 Q${mxp} 540 ${nx - 24} 458`} />
                      <path d={`M${px - 30} 426 Q${mxp} 470 ${nx + 30} 426`} />
                      <path d={`M${px + 10} 440 C${px + 90} 520 ${mxp - 30} 420 ${mxp} 500 S${nx - 90} 480 ${nx - 10} 440`} />
                    </g>
                  );
                })}
              </g>
              {/* crows */}
              {[0, 1, 2].map((i) => (
                <g key={i} transform={`translate(0 ${120 + i * 46})`}>
                  <g className="bk-bird" style={{ animationDelay: `${-i * 13}s` }}>
                    <path d="M0 0 q9 -9 18 0 q9 -9 18 0" fill="none" stroke={NEAR} strokeWidth="2.2" strokeLinecap="round" />
                  </g>
                </g>
              ))}
              {/* rickshaw rolling by */}
              <g transform="translate(300 880)">
                <g className="bk-rick" fill={NEAR} stroke={NEAR}>
                  <circle cx="0" cy="0" r="17" fill="none" strokeWidth="3" />
                  <circle cx="74" cy="0" r="17" fill="none" strokeWidth="3" />
                  <path d="M34 -22 q22 -32 50 -6 l0 26 h-50 z" stroke="none" />
                  <rect x="30" y="-6" width="56" height="8" stroke="none" />
                  <circle cx="-6" cy="-52" r="7" stroke="none" />
                  <path d="M-6 -44 L-2 -20 L24 -22 M-4 -34 L18 -38" fill="none" strokeWidth="3.5" strokeLinecap="round" />
                </g>
              </g>
              <rect x="0" y="886" width="1600" height="14" fill={NEAR} />
            </Layer>
          </div>
        )}

        {/* readability: darken top and bottom edges */}
        <div className="absolute inset-0 bg-gradient-to-b from-ground/55 via-transparent to-ground/45" />
        <div ref={flashRef} className="absolute inset-0 bg-[rgb(190,215,255)] opacity-0 mix-blend-screen" />
      </motion.div>

      <p className="absolute bottom-3 right-4 hidden font-mono text-[10px] tracking-widest text-muted/70 sm:block">
        {ui.dhaka}
      </p>
    </div>
  );
}
