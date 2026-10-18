import { services } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

export default function Services() {
  const { ui, tx } = useLang();
  return (
    <section id="services" aria-labelledby="services-title" className="bg-deep py-24">
      <div className="container-x">
        <SectionHeading eyebrow={ui.servicesEyebrow} title={ui.servicesTitle} id="services-title" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <div className="card h-full p-7 transition hover:-translate-y-1 hover:border-accent">
                <h3 className="mb-3 font-display text-xl font-semibold">{tx(s.title)}</h3>
                <p className="leading-relaxed text-muted">{tx(s.text)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
