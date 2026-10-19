import { useState } from "react";
import { motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";

// Thin progress bar on top and a small scroll percentage readout (desktop).
export default function ScrollHud() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const [pct, setPct] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => setPct(Math.round(v * 100)));

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-accent"
        style={{ scaleX }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none fixed bottom-5 left-5 z-40 hidden font-mono text-xs text-muted lg:block"
      >
        SCROLL {String(pct).padStart(3, "0")}%
      </div>
    </>
  );
}
