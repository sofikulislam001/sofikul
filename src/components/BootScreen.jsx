import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLang } from "../i18n.jsx";
import { profile } from "../data/content.js";
import LogoMark from "./LogoMark.jsx";
import { setSound } from "../audio.js";
import { setMode } from "../mode.js";

const DURATION = 3400;

// Short "booting" intro. Can be skipped with the button, Esc, Enter or Space.
export default function BootScreen({ onDone }) {
  const { ui } = useLang();
  const [pct, setPct] = useState(0);
  const [ready, setReady] = useState(false);
  const doneRef = useRef(false);
  const enter = (withSound) => {
    if (withSound) setSound(true); // must run inside the click so the browser allows audio
    finish();
  };

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    onDone();
  };

  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    let timer = 0;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      setPct(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setReady(true);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") finish();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lines = ui.boot;
  const visible = lines.filter((_, i) => pct >= (i / lines.length) * 100);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={ui.bootTitle}
      className="fixed inset-0 z-[90] flex flex-col justify-between bg-ground p-6 font-mono sm:p-10"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between gap-4 text-xs text-muted sm:text-sm">
        <span>{profile.handle}@portfolio</span>
        <button
          type="button"
          autoFocus
          onClick={finish}
          className="min-h-[44px] rounded-lg border border-line px-4 hover:border-accent hover:text-accent"
        >
          {ui.bootSkip} [Esc]
        </button>
      </div>

      <div className="flex flex-col gap-8">
        <ul className="flex flex-col gap-1 text-sm text-muted sm:text-base">
          {visible.map((l, i) => (
            <li key={i}>
              <span className="text-accent">[ OK ]</span> {l}
            </li>
          ))}
        </ul>
        <div>
          <LogoMark className="boot-logo mb-6 h-16 w-16 sm:h-20 sm:w-20" />
          <p className="font-display text-7xl font-bold tabular-nums text-ink sm:text-9xl">
            {String(pct).padStart(3, "0")}
            <span className="text-accent">%</span>
          </p>
          <div className="mt-4 h-1 w-full overflow-hidden rounded bg-line">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
          {ready && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 flex flex-col gap-4"
            >
              <div className="flex flex-wrap gap-4">
                <button type="button" onClick={() => enter(true)} className="btn btn-primary">
                  [ {ui.enterSound} ]
                </button>
                <button type="button" onClick={() => enter(false)} className="btn btn-ghost">
                  {ui.enterSilent}
                </button>
              </div>
              <p className="text-xs text-muted">{ui.bootHint}</p>
              <button
                type="button"
                onClick={() => {
                  setMode("classic");
                  finish();
                }}
                className="self-start font-mono text-xs text-muted underline hover:text-accent"
              >
                {ui.classicView}
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <p className="text-xs text-muted sm:text-sm">
        {profile.name.toUpperCase()} // {ui.bootTitle}
      </p>
    </motion.div>
  );
}
