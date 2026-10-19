import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "../i18n.jsx";
import { setRain } from "../rain.js";

const CODE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

// Hidden surprise: up up down down left right left right b a.
export default function Konami() {
  const { ui } = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    let i = 0;
    let timer;
    const onKey = (e) => {
      const t = e.target;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = key === CODE[i] ? i + 1 : key === CODE[0] ? 1 : 0;
      if (i === CODE.length) {
        i = 0;
        setRain(true);
        setShow(true);
        clearTimeout(timer);
        timer = setTimeout(() => setShow(false), 3200);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(timer);
    };
  }, []);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed inset-x-0 top-24 z-[85] flex justify-center px-4">
      <AnimatePresence>
        {show && (
          <motion.p
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            data-text={ui.konami}
            className="glitch glass rounded-lg border border-accent px-6 py-4 font-mono text-sm text-accent shadow-[0_0_40px_rgb(var(--accent)/0.35)] sm:text-base"
          >
            {ui.konami}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
