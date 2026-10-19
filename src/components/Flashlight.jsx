import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

// Dark vignette. On desktop a soft pool of light follows the mouse;
// elsewhere (touch / reduced motion) it stays a still vignette.
export default function Flashlight() {
  const ref = useRef(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !window.matchMedia("(pointer: fine)").matches) return undefined;
    const onMove = (e) => {
      el.style.setProperty("--fx", `${e.clientX}px`);
      el.style.setProperty("--fy", `${e.clientY}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce]);

  return <div ref={ref} aria-hidden="true" className="flashlight pointer-events-none fixed inset-0 z-[15]" />;
}
