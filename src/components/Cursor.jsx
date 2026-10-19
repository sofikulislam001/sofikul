import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

const INTERACTIVE = "a, button, input, textarea, select, summary, [role='button']";

// A soft ring that trails the mouse and grows over clickable things.
// The normal cursor is kept. Only shown for mouse users, never on touch.
export default function Cursor() {
  const reduce = useReducedMotion();
  const ringRef = useRef(null);

  useEffect(() => {
    if (reduce) return undefined;
    if (!window.matchMedia("(pointer: fine)").matches) return undefined;
    const ring = ringRef.current;
    if (!ring) return undefined;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let raf = 0;
    let big = false;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
      ring.style.opacity = "1";
    };
    const onOver = (e) => {
      big = Boolean(e.target.closest && e.target.closest(INTERACTIVE));
    };
    const onLeave = () => {
      ring.style.opacity = "0";
    };
    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      const s = big ? 1.9 : 1;
      ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${s})`;
      ring.style.backgroundColor = big ? "rgb(var(--accent) / 0.12)" : "transparent";
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  if (reduce) return null;
  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-8 w-8 rounded-full border border-accent opacity-0 transition-[opacity,background-color] duration-200 [@media(pointer:fine)]:block"
    />
  );
}
