import { MapPin } from "lucide-react";
import { about, profile } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-deep py-24">
      <div className="container-x">
        <SectionHeading eyebrow="About me" title="A bit about who I am" id="about-title" />
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr]">
          <Reveal className="flex flex-col gap-5 text-lg leading-relaxed text-muted">
            {about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </Reveal>

          {(profile.location || about.facts.length > 0) && (
            <Reveal delay={0.1}>
              <ul className="card flex flex-col gap-5 p-7">
                {profile.location && (
                  <li className="flex items-center gap-3">
                    <MapPin size={20} className="text-accent" aria-hidden="true" />
                    <span>{profile.location}</span>
                  </li>
                )}
                {about.facts.map((f) => (
                  <li key={f.label}>
                    <p className="text-sm text-muted">{f.label}</p>
                    <p className="font-semibold">{f.value}</p>
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
