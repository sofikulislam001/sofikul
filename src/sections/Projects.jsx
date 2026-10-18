import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

function ProjectCard({ project, index }) {
  const { ui, tx } = useLang();
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = project.image && !imgFailed;
  const title = tx(project.title);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="card group flex flex-col overflow-hidden transition duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-xl hover:shadow-accent/10"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface2">
        {showImage ? (
          <img
            src={project.image}
            alt={ui.screenshotOf(title)}
            loading="lazy"
            width="800"
            height="500"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-accent/40"
          >
            {title.charAt(0)}
          </div>
        )}
        {project.placeholder && (
          <span className="glass absolute left-4 top-4 rounded-full border border-line px-3 py-1 text-xs text-muted">
            {ui.placeholder}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-sm font-medium text-accent">{tx(project.category)}</p>
        <h3 className="font-display text-xl font-semibold">{title}</h3>
        <p className="leading-relaxed text-muted">{tx(project.summary)}</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {project.tags.map((t, i) => (
            <li key={`${t}-${i}`} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
              {t}
            </li>
          ))}
        </ul>
        {(project.live || project.source) && (
          <div className="mt-auto flex flex-wrap gap-5 pt-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent hover:underline"
              >
                <ExternalLink size={16} aria-hidden="true" /> {ui.liveDemo}
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted hover:text-accent hover:underline"
              >
                <Github size={16} aria-hidden="true" /> {ui.sourceCode}
              </a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
}

export default function Projects() {
  const { ui, tx } = useLang();
  // Filter keys are the English category names; labels are shown in the current language.
  const categories = useMemo(() => {
    const seen = new Map();
    projects.forEach((p) => {
      const key = typeof p.category === "object" ? p.category.en : p.category;
      if (!seen.has(key)) seen.set(key, p.category);
    });
    return [...seen.entries()];
  }, []);
  const [filter, setFilter] = useState("All");
  const keyOf = (p) => (typeof p.category === "object" ? p.category.en : p.category);
  const visible = filter === "All" ? projects : projects.filter((p) => keyOf(p) === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow={ui.projectsEyebrow} title={ui.projectsTitle} id="projects-title" />

        {categories.length > 1 && (
          <Reveal className="mb-10">
            <div role="group" aria-label={ui.filterLabel} className="flex flex-wrap gap-3">
              {[["All", ui.filterAll], ...categories.map(([key, label]) => [key, tx(label)])].map(
                ([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={filter === key}
                    onClick={() => setFilter(key)}
                    className={`min-h-[44px] rounded-full border px-5 text-[15px] font-medium transition ${
                      filter === key
                        ? "border-accent bg-accent text-onaccent"
                        : "border-line text-muted hover:border-accent hover:text-ink"
                    }`}
                  >
                    {label}
                  </button>
                )
              )}
            </div>
          </Reveal>
        )}

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={keyOf(p) + i + (typeof p.title === "object" ? p.title.en : p.title)} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
