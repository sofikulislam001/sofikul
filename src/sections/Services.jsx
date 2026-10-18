import { services } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Services() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-deep py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Services" title="How I can help" id="services-title" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08}>
              <div className="card h-full p-7 transition hover:-translate-y-1 hover:border-accent">
                <h3 className="mb-3 font-display text-xl font-semibold">{s.title}</h3>
                <p className="leading-relaxed text-muted">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
