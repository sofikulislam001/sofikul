import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, GitFork, Star } from "lucide-react";
import { github } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Window from "../components/Window.jsx";

const TTL = 10 * 60 * 1000;

async function loadRepos(user) {
  const key = `gh:${user}`;
  try {
    const cached = JSON.parse(sessionStorage.getItem(key) || "null");
    if (cached && Date.now() - cached.t < TTL) return cached.repos;
  } catch {
    /* ignore */
  }
  const res = await fetch(`https://api.github.com/users/${user}/repos?sort=pushed&per_page=30`);
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const hide = (github.hide || []).map((h) => h.toLowerCase());
  const repos = (await res.json())
    .filter((r) => !r.fork && !hide.includes(String(r.name).toLowerCase()))
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, github.max || 6)
    .map((r) => ({
      id: r.id,
      name: r.name,
      url: r.html_url,
      desc: r.description || "",
      lang: r.language || "",
      stars: r.stargazers_count || 0,
      forks: r.forks_count || 0,
      pushed: r.pushed_at,
    }));
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), repos }));
  } catch {
    /* ignore */
  }
  return repos;
}

function ago(iso, lang) {
  const diff = (new Date(iso) - Date.now()) / 1000;
  const rtf = new Intl.RelativeTimeFormat(lang === "bn" ? "bn" : "en", { numeric: "auto" });
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [u, s] of units) if (Math.abs(diff) >= s) return rtf.format(Math.round(diff / s), u);
  return rtf.format(0, "second");
}

export default function GithubFeed() {
  const { ui, lang } = useLang();
  const g = ui.github;
  const [state, setState] = useState({ status: "loading", repos: [] });

  useEffect(() => {
    let alive = true;
    loadRepos(github.user)
      .then((repos) => alive && setState({ status: "ok", repos }))
      .catch(() => alive && setState({ status: "error", repos: [] }));
    return () => {
      alive = false;
    };
  }, []);

  const profileUrl = `https://github.com/${github.user}`;

  return (
    <section id="github" aria-labelledby="github-title" className="py-24">
      <div className="container-x">
        <SectionHeading index="04" eyebrow={ui.nav.github} title={ui.githubTitle} id="github-title" />
        <Reveal>
          <Window title={`~/github/${github.user}`}>
            <div className="p-6" aria-live="polite">
              <p className="mb-6 font-mono text-sm text-muted">{g.intro}</p>

              {state.status === "loading" && (
                <p className="font-mono text-sm text-accent">
                  &gt; {g.loading}
                  <span aria-hidden="true" className="caret" />
                </p>
              )}
              {state.status === "error" && (
                <p className="font-mono text-sm text-muted">
                  {g.error}{" "}
                  <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-accent hover:underline">
                    {g.viewAll}
                  </a>
                </p>
              )}
              {state.status === "ok" && state.repos.length === 0 && (
                <p className="font-mono text-sm text-muted">{g.empty}</p>
              )}

              {state.repos.length > 0 && (
                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {state.repos.map((r, i) => (
                    <motion.li
                      key={r.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.45, delay: i * 0.06 }}
                    >
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex h-full flex-col gap-3 rounded-lg border border-line bg-surface2/60 p-5 transition hover:-translate-y-1 hover:border-accent hover:shadow-[0_0_24px_rgb(var(--accent)/0.12)]"
                      >
                        <span className="flex items-center justify-between gap-3 font-mono text-sm text-accent">
                          <span className="truncate">{r.name}</span>
                          <ArrowUpRight size={16} aria-hidden="true" className="shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                        <span className="text-sm leading-relaxed text-muted">{r.desc || g.noDesc}</span>
                        <span className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-2 font-mono text-xs text-muted">
                          {r.lang && <span className="text-accent2">{r.lang}</span>}
                          {r.stars > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <Star size={12} aria-hidden="true" /> {r.stars}
                            </span>
                          )}
                          {r.forks > 0 && (
                            <span className="inline-flex items-center gap-1">
                              <GitFork size={12} aria-hidden="true" /> {r.forks}
                            </span>
                          )}
                          <span>
                            {g.updated} {ago(r.pushed, lang)}
                          </span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              )}

              <a
                href={profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[44px] items-center gap-2 font-mono text-sm text-accent hover:underline"
              >
                {g.viewAll} <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </Window>
        </Reveal>
      </div>
    </section>
  );
}
