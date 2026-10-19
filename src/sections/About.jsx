import { MapPin } from "lucide-react";
import { about, profile } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Window from "../components/Window.jsx";

export default function About() {
  const { ui, tx } = useLang();
  const hasSide = Boolean(profile.location) || about.facts.length > 0;

  return (
    <section id="about" aria-labelledby="about-title" className="py-24">
      <div className="container-x">
        <SectionHeading index="01" eyebrow={ui.nav.about} title={ui.aboutTitle} id="about-title" />
        <div className={`grid gap-8 ${hasSide ? "lg:grid-cols-[1.3fr_0.7fr]" : ""}`}>
          <Reveal>
            <Window title="~/about.txt">
              <div className="flex flex-col gap-5 p-6 text-lg leading-relaxed text-ink/90 sm:p-8">
                {about.bio.map((p, i) => (
                  <p key={i}>{tx(p)}</p>
                ))}
              </div>
            </Window>
          </Reveal>

          {hasSide && (
            <Reveal delay={0.1}>
              <Window title="~/info.json">
                <ul className="flex flex-col gap-5 p-6 sm:p-8">
                  {profile.location && (
                    <li className="flex items-center gap-3">
                      <MapPin size={20} className="text-accent" aria-hidden="true" />
                      <span>{tx(profile.location)}</span>
                    </li>
                  )}
                  {about.facts.map((f, i) => (
                    <li key={i}>
                      <p className="font-mono text-sm text-muted">{tx(f.label)}</p>
                      <p className="font-semibold">{tx(f.value)}</p>
                    </li>
                  ))}
                </ul>
              </Window>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
