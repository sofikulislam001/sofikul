import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { faq } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Faq() {
  const { ui, tx } = useLang();
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24">
      <div className="container-x">
        <SectionHeading index="05" eyebrow={ui.nav.faq} title={ui.faqTitle} id="faq-title" />
        <Reveal className="max-w-3xl">
          <div className="divide-y divide-line rounded-xl border border-line bg-surface/85">
            {faq.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <h3>
                    <button
                      type="button"
                      id={`faq-q-${i}`}
                      aria-expanded={isOpen}
                      aria-controls={`faq-a-${i}`}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="flex min-h-[60px] w-full items-center justify-between gap-4 px-5 py-4 text-left font-display text-lg font-semibold transition hover:text-accent sm:px-6 sm:text-xl"
                    >
                      <span>
                        <span className="mr-3 font-mono text-sm text-accent">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {tx(f.q)}
                      </span>
                      <Plus
                        size={22}
                        aria-hidden="true"
                        className={`shrink-0 text-accent transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      />
                    </button>
                  </h3>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-a-${i}`}
                        role="region"
                        aria-labelledby={`faq-q-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-6 text-lg leading-relaxed text-muted sm:pl-[3.75rem] sm:pr-6">
                          {tx(f.a)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
