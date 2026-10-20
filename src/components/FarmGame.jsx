import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, FileText, MapPin, X } from "lucide-react";
import { profile } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import { gameAudio, sfx } from "../audio.js";
import { setMode } from "../mode.js";
import { createGame } from "../game/engine.js";
import LangToggle from "./LangToggle.jsx";
import SoundToggle from "./SoundToggle.jsx";
import LogoMark from "./LogoMark.jsx";
import VhsTv from "./VhsTv.jsx";
import About from "../sections/About.jsx";
import Skills from "../sections/Skills.jsx";
import Projects from "../sections/Projects.jsx";
import GithubFeed from "../sections/GithubFeed.jsx";
import TerminalSection from "../sections/TerminalSection.jsx";
import Faq from "../sections/Faq.jsx";
import Contact from "../sections/Contact.jsx";

const ORDER = ["about", "skills", "projects", "github", "terminal", "faq", "contact"];
const SECTION = {
  about: About,
  skills: Skills,
  projects: Projects,
  github: GithubFeed,
  terminal: TerminalSection,
  faq: Faq,
  contact: Contact,
};

function Panel({ id, onClose }) {
  const { ui } = useLang();
  const Section = SECTION[id];
  const closeRef = useRef(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={ui.game.names[id]}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[88] overflow-y-auto bg-ground/95 backdrop-blur-sm"
    >
      <div className="glass sticky top-0 z-10 border-b border-line">
        <div className="container-x flex items-center justify-between gap-4 py-3">
          <p className="flex items-center gap-2 font-mono text-sm text-accent">
            <MapPin size={16} aria-hidden="true" /> {ui.game.names[id]}
          </p>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="btn btn-ghost !min-h-[44px] !py-2"
          >
            <X size={18} aria-hidden="true" /> {ui.game.back} [Esc]
          </button>
        </div>
      </div>
      <Section />
      {id === "about" && (
        <div className="container-x pb-24">
          <VhsTv />
        </div>
      )}
    </motion.div>
  );
}

export default function FarmGame({ items }) {
  const { ui } = useLang();
  const places = useMemo(() => ORDER.filter((id) => items.some((i) => i.id === id)), [items]);
  const canvasRef = useRef(null);
  const darkRef = useRef(null);
  const gameRef = useRef(null);
  const wrapRef = useRef(null);
  const [near, setNear] = useState(null);
  const [open, setOpen] = useState(null);
  const [menu, setMenu] = useState(false);
  const [seen, setSeen] = useState(() => new Set());
  const [hint, setHint] = useState(true);
  const openRef = useRef(null);
  openRef.current = open;
  const nearRef = useRef(null);
  nearRef.current = near;

  const openPlace = useCallback((id) => {
    const g = gameRef.current;
    if (!g) return;
    g.setPaused(true);
    g.markVisited(id);
    sfx.door();
    setSeen((prev) => new Set(prev).add(id));
    setHint(false);
    setMenu(false);
    setOpen(id);
  }, []);

  const closePlace = useCallback(() => {
    setOpen(null);
    gameRef.current?.setPaused(false);
    sfx.chime();
    wrapRef.current?.focus();
  }, []);

  const travel = useCallback(
    (id) => {
      gameRef.current?.teleport(id);
      openPlace(id);
    },
    [openPlace]
  );

  // engine
  useEffect(() => {
    const game = createGame(canvasRef.current, darkRef.current, {
      pois: places.map((id) => ({ id })),
      onNear: setNear,
      onStep: (run) => sfx.step(run),
      onEvent: (name) => {
        if (name === "lightning") window.dispatchEvent(new CustomEvent("fx:lightning"));
        if (name === "ghost") sfx.whisper();
        if (name === "ghost-appear") sfx.chime();
        if (name === "crows") sfx.caw();
      },
    });
    gameRef.current = game;
    game.start();
    gameAudio(true);
    return () => {
      game.stop();
      gameAudio(false);
      gameRef.current = null;
    };
  }, [places]);

  // keyboard
  useEffect(() => {
    const typing = (e) => {
      const t = e.target;
      return t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable);
    };
    const down = (e) => {
      if (openRef.current || typing(e) || e.ctrlKey || e.metaKey || e.altKey) return;
      const g = gameRef.current;
      const k = e.key;
      if (k === "ArrowLeft" || k === "a" || k === "A") {
        g?.setInput({ l: true });
        setHint(false);
        e.preventDefault();
      } else if (k === "ArrowRight" || k === "d" || k === "D") {
        g?.setInput({ r: true });
        setHint(false);
        e.preventDefault();
      } else if (k === "Shift") g?.setInput({ run: true });
      else if ((k === "e" || k === "E" || (k === "Enter" && document.activeElement === document.body)) && nearRef.current) {
        openPlace(nearRef.current);
        e.preventDefault();
      }
    };
    const up = (e) => {
      const g = gameRef.current;
      const k = e.key;
      if (k === "ArrowLeft" || k === "a" || k === "A") g?.setInput({ l: false });
      else if (k === "ArrowRight" || k === "d" || k === "D") g?.setInput({ r: false });
      else if (k === "Shift") g?.setInput({ run: false });
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
  }, [openPlace]);

  // the terminal's "goto" / "hire" commands
  useEffect(() => {
    const onGoto = (e) => {
      const id = e.detail;
      if (places.includes(id)) travel(id);
    };
    window.addEventListener("farm:goto", onGoto);
    return () => window.removeEventListener("farm:goto", onGoto);
  }, [places, travel]);

  useEffect(() => {
    const id = setTimeout(() => setHint(false), 12000);
    return () => clearTimeout(id);
  }, []);

  const hold = (key) => ({
    onPointerDown: (e) => {
      e.preventDefault();
      gameRef.current?.setInput({ [key]: true });
      setHint(false);
    },
    onPointerUp: () => gameRef.current?.setInput({ [key]: false }),
    onPointerLeave: () => gameRef.current?.setInput({ [key]: false }),
    onPointerCancel: () => gameRef.current?.setInput({ [key]: false }),
  });

  const allFound = seen.size >= places.length;
  const touchBtn =
    "flex h-16 w-16 select-none items-center justify-center rounded-full border border-accent bg-surface/80 text-accent active:bg-accent active:text-onaccent [touch-action:none]";

  return (
    <div
      ref={wrapRef}
      tabIndex={-1}
      className="fixed inset-0 z-[40] overflow-hidden bg-ground outline-none"
      data-near={near || ""}
      data-open={open || ""}
    >
      <h1 className="sr-only">
        {profile.name} - {ui.game.title}
      </h1>
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      <canvas ref={darkRef} aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />

      {/* screen-reader / keyboard route to every place */}
      <nav className="sr-only" aria-label={ui.game.placesTitle}>
        <ul>
          {places.map((id) => (
            <li key={id}>
              <button type="button" onClick={() => travel(id)}>
                {ui.game.names[id]}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* top bar */}
      <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-3 p-4">
        <div className="glass flex items-center gap-3 rounded-xl border border-line px-3 py-2">
          <LogoMark className="h-9 w-9" />
          <div className="font-mono text-xs">
            <p className="text-ink">{profile.name}</p>
            <p className="text-accent" aria-live="polite">
              {ui.game.discovered(seen.size, places.length)}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LangToggle />
          <SoundToggle />
          <div className="relative">
            <button
              type="button"
              onClick={() => setMenu((m) => !m)}
              aria-expanded={menu}
              className="glass flex h-11 items-center gap-2 rounded-lg border border-line px-3 font-mono text-sm text-accent hover:border-accent"
            >
              <MapPin size={18} aria-hidden="true" />
              <span className="hidden sm:inline">{ui.game.places}</span>
            </button>
            {menu && (
              <ul className="glass absolute right-0 mt-2 w-56 overflow-hidden rounded-xl border border-line">
                <li className="border-b border-line px-4 py-2 font-mono text-xs text-muted">{ui.game.placesTitle}</li>
                {places.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      onClick={() => travel(id)}
                      className="flex min-h-[44px] w-full items-center justify-between px-4 text-left font-mono text-sm hover:bg-accent/10 hover:text-accent"
                    >
                      {ui.game.names[id]}
                      {seen.has(id) && <span aria-hidden="true" className="text-accent">✓</span>}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button
            type="button"
            onClick={() => setMode("classic")}
            className="glass flex h-11 items-center gap-2 rounded-lg border border-line px-3 font-mono text-sm text-muted hover:border-accent hover:text-accent"
          >
            <FileText size={18} aria-hidden="true" />
            <span className="hidden md:inline">{ui.classicView}</span>
            <span className="sr-only md:hidden">{ui.classicView}</span>
          </button>
        </div>
      </div>

      {/* intro / controls hint */}
      <AnimatePresence>
        {hint && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pointer-events-none absolute inset-x-0 top-1/4 z-10 flex flex-col items-center gap-3 px-6 text-center"
          >
            <p className="glitch font-display text-3xl font-bold sm:text-5xl" data-text={ui.game.intro}>
              {ui.game.intro}
            </p>
            <p className="font-mono text-sm text-muted">
              <span className="[@media(pointer:coarse)]:hidden">{ui.game.hint}</span>
              <span className="hidden [@media(pointer:coarse)]:inline">{ui.game.hintTouch}</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* all found */}
      <AnimatePresence>
        {allFound && !open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="glass absolute left-1/2 top-24 z-10 flex -translate-x-1/2 flex-col items-center gap-3 rounded-xl border border-accent px-6 py-4 text-center"
          >
            <p className="font-mono text-sm text-accent">{ui.game.all}</p>
            {places.includes("contact") && (
              <button type="button" onClick={() => travel("contact")} className="btn btn-primary !min-h-[44px] !py-2">
                {ui.game.goMail}
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* door prompt */}
      <div className="absolute inset-x-0 bottom-28 z-10 flex justify-center px-4 sm:bottom-16">
        <AnimatePresence>
          {near && !open && (
            <motion.button
              key={near}
              type="button"
              onClick={() => openPlace(near)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="btn btn-primary"
            >
              <span aria-hidden="true" className="rounded border border-onaccent/40 px-1.5 font-mono text-xs">E</span>
              {ui.game.names[near]} · {ui.game.enter}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* touch controls */}
      <div className="absolute inset-x-0 bottom-6 z-10 hidden items-center justify-between px-6 [@media(pointer:coarse)]:flex">
        <div className="flex gap-4">
          <button type="button" aria-label={ui.game.left} className={touchBtn} {...hold("l")}>
            <ArrowLeft size={28} aria-hidden="true" />
          </button>
          <button type="button" aria-label={ui.game.right} className={touchBtn} {...hold("r")}>
            <ArrowRight size={28} aria-hidden="true" />
          </button>
        </div>
        <button type="button" className={`${touchBtn} !w-auto px-5 font-mono text-xs`} {...hold("run")}>
          {ui.game.run}
        </button>
      </div>

      <AnimatePresence>{open && <Panel key={open} id={open} onClose={closePlace} />}</AnimatePresence>
    </div>
  );
}
