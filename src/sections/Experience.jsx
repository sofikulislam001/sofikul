import { experience } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="bg-deep py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Journey" title="Experience & education" id="exp-title" />
        <ol className="flex max-w-3xl flex-col border-l border-line">
          {experience.map((e, i) => (
            <Reveal key={`${e.period}-${e.title}`} delay={i * 0.08}>
              <li className="relative pb-10 pl-8 last:pb-0">
                <span
                  aria-hidden="true"
                  className="absolute -left-[7px] top-2 h-3 w-3 rounded-full bg-accent"
                />
                <p className="text-sm font-semibold text-accent">{e.period}</p>
                <h3 className="font-display text-xl font-semibold">{e.title}</h3>
                <p className="text-muted">{e.place}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
