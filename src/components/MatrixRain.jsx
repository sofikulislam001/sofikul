import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { useAccent } from "../accent.js";
import { useRain } from "../rain.js";

const CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワン0123456789ABCDEF<>/{}[];=+*";

// Falling-characters background. Pauses when the tab is hidden and is
// switched off for people who prefer reduced motion.
export default function MatrixRain() {
  const on = useRain();
  const accent = useAccent();
  const reduce = useReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    if (!on || reduce) return undefined;
    const canvas = ref.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rgb = getComputedStyle(document.documentElement)
      .getPropertyValue("--accent")
      .trim()
      .split(/\s+/)
      .join(",");
    let size = window.innerWidth < 640 ? 18 : 16;
    let w = 0;
    let h = 0;
    let drops = [];
    let raf = 0;
    let last = 0;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      size = w < 640 ? 18 : 16;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "rgb(5,8,10)";
      ctx.fillRect(0, 0, w, h);
      const cols = Math.ceil(w / size);
      drops = Array.from({ length: cols }, () => Math.floor(Math.random() * -(h / size)));
    };

    const frame = (now) => {
      raf = requestAnimationFrame(frame);
      if (document.hidden || now - last < 45) return;
      last = now;
      ctx.fillStyle = "rgba(5,8,10,0.13)";
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${size}px "JetBrains Mono", monospace`;
      for (let i = 0; i < drops.length; i += 1) {
        const y = drops[i] * size;
        if (y > 0) {
          ctx.fillStyle = `rgba(${rgb},0.95)`;
          ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * size, y);
        }
        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    };

    resize();
    raf = requestAnimationFrame(frame);
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(resize, 150);
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, [on, reduce, accent]);

  if (!on || reduce) return null;
  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-[0.17]"
    />
  );
}
