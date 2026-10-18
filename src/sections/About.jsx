import { MapPin } from "lucide-react";
import { about, profile } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function About() {
  const { ui, tx } = useLang();
  return (
    <section id="about" aria-labelledby="about-title" className="bg-deep py-24">
      <div className="container-x">
        <SectionHeading eyebrow={ui.aboutEyebrow} title={ui.aboutTitle} id="about-title" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
            {about.bio.map((p, i) => (
              <p key={i}>{tx(p)}</p>
            ))}
          </Reveal>

          {(profile.location || about.facts.length > 0) && (
            <Reveal delay={0.1}>
              <ul className="card flex flex-col gap-5 p-7">
                {profile.location && (
                  <li className="flex items-center gap-3">
                    <MapPin size={20} className="text-accent" aria-hidden="true" />
                    <span>{tx(profile.location)}</span>
                  </li>
                )}
                {about.facts.map((f, i) => (
                  <li key={i}>
                    <p className="text-sm text-muted">{tx(f.label)}</p>
                    <p className="font-semibold">{tx(f.value)}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
