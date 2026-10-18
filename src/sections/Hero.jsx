import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { profile, stats } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import SocialLinks from "../components/SocialLinks.jsx";

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const word = {
  hidden: { y: "110%" },
  show: { y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { ui, tx } = useLang();
  const greeting = ui.greeting(profile.firstName);
  const words = greeting.split(" ");

  return (
    <section id="home" className="relative overflow-hidden pb-20 pt-32 sm:pt-40">
      {/* soft moving background shapes */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="blob-a absolute -left-24 top-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="blob-b absolute -right-20 top-40 h-80 w-80 rounded-full bg-accent2/20 blur-3xl" />
      </div>

      <div className="container-x grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col gap-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow"
          >
            {tx(profile.role)}
          </motion.p>

          {/* key makes the headline replay when the language changes */}
          <motion.h1
            key={greeting}
            variants={container}
            initial="hidden"
            animate="show"
            aria-label={greeting}
            className="font-display text-5xl font-bold leading-[1.1] tracking-tight sm:text-6xl lg:text-7xl"
          >
            {words.map((w, i) => (
              <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-2 align-bottom" aria-hidden="true">
                <motion.span variants={word} className="inline-block">
                  {i === words.length - 1 ? (
                    <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                      {w}
                    </span>
                  ) : (
                    w
                  )}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="max-w-xl text-lg leading-relaxed text-muted sm:text-xl"
          >
            {tx(profile.intro)}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-wrap gap-4">
              <a href="#projects" className="btn btn-primary">
                {ui.viewProjects} <ArrowRight size={18} aria-hidden="true" />
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
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-sm"
        >
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-3 rounded-[11rem_11rem_2.5rem_2.5rem] bg-gradient-to-b from-accent/40 to-accent2/20 blur-xl"
            />
            <div className="card relative aspect-[4/5] overflow-hidden rounded-[11rem_11rem_2rem_2rem] bg-surface2">
              <img
                src={profile.photo}
                alt={ui.portrait(profile.name)}
                width="598"
                height="598"
                className="h-full w-full object-cover object-top"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith(profile.photoPlaceholder)) {
                    e.currentTarget.src = profile.photoPlaceholder;
                  }
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
