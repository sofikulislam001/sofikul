import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "../data/content.js";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";

function ProjectCard({ project, index }) {
  const [imgFailed, setImgFailed] = useState(false);
  const showImage = project.image && !imgFailed;

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
            alt={`Screenshot of ${project.title}`}
            loading="lazy"
            width="800"
            height="500"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center font-display text-5xl font-bold text-accent/40">
            {project.title.charAt(0)}
          </div>
        )}
        {project.placeholder && (
          <span className="glass absolute left-4 top-4 rounded-full border border-line px-3 py-1 text-xs text-muted">
            Placeholder
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-sm font-medium text-accent">{project.category}</p>
        <h3 className="font-display text-xl font-semibold">{project.title}</h3>
        <p className="leading-relaxed text-muted">{project.summary}</p>
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
                <ExternalLink size={16} aria-hidden="true" /> Live demo
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted hover:text-accent hover:underline"
              >
                <Github size={16} aria-hidden="true" /> Source code
              </a>
            )}
          </div>
        )}
      </div>
    </motion.li>
  );
}

export default function Projects() {
  const categories = useMemo(() => ["All", ...new Set(projects.map((p) => p.category))], []);
  const [filter, setFilter] = useState("All");
  const visible = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24">
      <div className="container-x">
        <SectionHeading eyebrow="Selected work" title="Featured projects" id="projects-title" />

        {categories.length > 2 && (
          <Reveal className="mb-10">
            <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-3">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-pressed={filter === c}
                  onClick={() => setFilter(c)}
                  className={`min-h-[44px] rounded-full border px-5 text-[15px] font-medium transition ${
                    filter === c
                      ? "border-accent bg-accent text-onaccent"
                      : "border-line text-muted hover:border-accent hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>
        )}

        <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
