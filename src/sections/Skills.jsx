import { skills } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Window from "../components/Window.jsx";

const slug = (t) =>
  String(typeof t === "object" ? t.en : t)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

export default function Skills() {
  const { ui, tx } = useLang();
  return (
    <section id="skills" aria-labelledby="skills-title" className="py-24">
      <div className="container-x">
        <SectionHeading index="02" eyebrow={ui.nav.skills} title={ui.skillsTitle} id="skills-title" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Window title={`~/skills/${slug(group.title)}`} className="h-full">
                <div className="p-6">
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{tx(group.title)}</h3>
                    {group.placeholder && (
                      <span className="rounded-md border border-line px-2 py-1 font-mono text-xs text-muted">
                        {ui.placeholder}
                      </span>
                    )}
                  </div>
                  <ul className="flex flex-wrap gap-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-line bg-surface2 px-3 py-1.5 font-mono text-sm transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                      >
                        <span className="text-accent">&gt;</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Window>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
