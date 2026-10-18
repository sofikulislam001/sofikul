import { skills } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Skills() {
  const { ui, tx } = useLang();
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow={ui.skillsEyebrow} title={ui.skillsTitle} id="skills-title" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card h-full p-7">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <h3 className="font-display text-xl font-semibold">{tx(group.title)}</h3>
                  {group.placeholder && (
                    <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                      {ui.placeholder}
                    </span>
                  )}
                </div>
                <ul className="flex flex-wrap gap-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-line bg-surface2 px-4 py-2 text-[15px] transition hover:-translate-y-0.5 hover:border-accent"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
