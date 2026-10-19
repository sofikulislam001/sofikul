import { experience } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Experience() {
  const { ui, tx } = useLang();
  return (
    <section id="experience" aria-labelledby="exp-title" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow={ui.nav.experience} title={ui.expTitle} id="exp-title" />
        <ol className="flex max-w-3xl flex-col border-l border-line">
          {experience.map((e, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <li className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent"
                />
                <p className="font-mono text-sm text-accent">{e.period}</p>
                <h3 className="font-display text-xl font-semibold">{tx(e.title)}</h3>
                <p className="text-muted">{tx(e.place)}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
