import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Terminal as TerminalIcon } from "lucide-react";
import { profile, stats } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Emph from "../components/Emph.jsx";
import Typewriter from "../components/Typewriter.jsx";
import SocialLinks from "../components/SocialLinks.jsx";

export default function Hero({ active }) {
  const { ui, tx } = useLang();
  const reduce = useReducedMotion();
  const ref = useRef(null);

  // Soft glow that follows the pointer (skipped for reduced motion).
  const onMove = (e) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const greeting = ui.greeting(profile.firstName);
  const reveal = (delay) => ({
    initial: { opacity: 0, y: 14 },
    animate: active ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="home"
      ref={ref}
      onPointerMove={onMove}
      className="hero-glow relative overflow-hidden pb-24 pt-32 sm:pt-40"
    >
      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col gap-7">
          <p className="font-mono text-sm text-muted sm:text-base">
            <span className="text-accent">{profile.handle}@portfolio</span>
            <span>:</span>
            <span className="text-accent2">~</span>
            <span>$ </span>
            <Typewriter text="whoami" start={active} delay={250} speed={80} />
          </p>

          <motion.h1
            {...reveal(0.15)}
            data-text={greeting.replace(/\*/g, "")}
            className="glitch font-display text-5xl font-bold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl"
          >
            <Emph text={greeting} />
          </motion.h1>

          <p className="font-mono text-lg text-accent sm:text-xl">
            <span aria-hidden="true">&gt; </span>
            <Typewriter text={tx(profile.role)} start={active} delay={900} speed={36} keepCaret />
          </p>

          <motion.p
            {...reveal(0.45)}
            className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {tx(profile.intro)}
          </motion.p>

          <motion.div {...reveal(0.6)} className="flex flex-col gap-5">
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn btn-primary">
                {ui.viewProjects} <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href="#terminal" className="btn btn-ghost">
                <TerminalIcon size={18} aria-hidden="true" /> {ui.tryTerminal}
              </a>
              <a href="#contact" className="btn btn-ghost">
                {ui.contactMe}
              </a>
              {profile.cvFile && (
                <a href={profile.cvFile} download className="btn btn-ghost">
                  <Download size={18} aria-hidden="true" /> {ui.downloadCv}
                </a>
              )}
            </div>
            <SocialLinks />
          </motion.div>

          {stats.length > 0 && (
            <dl className="mt-4 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
              {stats.map((s, i) => (
                <div key={i}>
                  <dd className="font-display text-3xl font-bold">{s.value}</dd>
                  <dt className="text-sm text-muted">{tx(s.label)}</dt>
                </div>
              ))}
            </dl>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative p-3">
            {/* corner brackets */}
            <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-accent" />
            <span aria-hidden="true" className="absolute right-0 top-0 h-6 w-6 border-r-2 border-t-2 border-accent" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 h-6 w-6 border-b-2 border-l-2 border-accent" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 h-6 w-6 border-b-2 border-r-2 border-accent" />

            <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-line bg-surface2">
              <img
                src={profile.photo}
                alt={ui.portrait(profile.name)}
                width="598"
                height="598"
                className="h-full w-full object-cover object-top grayscale-[0.8] contrast-110 transition duration-500 hover:grayscale-0"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith(profile.photoPlaceholder)) {
                    e.currentTarget.src = profile.photoPlaceholder;
                  }
                }}
              />
              <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
              <div aria-hidden="true" className="scan-sweep" />
            </div>
          </div>
          <p className="mt-3 text-center font-mono text-xs text-muted">// {profile.name}</p>
        </motion.div>
      </div>
    </section>
  );
}
