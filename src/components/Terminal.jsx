import { useEffect, useRef, useState } from "react";
import { about, contact, profile, projects, skills, socials } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import { setAccent } from "../accent.js";
import { setRain } from "../rain.js";
import { setSound } from "../audio.js";
import { scrollToId } from "../scroll.js";
import Window from "./Window.jsx";

const FILES = ["about.txt", "skills.txt", "projects.txt", "contact.txt", "secret.txt"];
const GOTO = ["about", "skills", "projects", "github", "terminal", "faq", "contact"];
const CHIPS = ["help", "about", "skills", "projects", "contact"];

// A small working terminal. Every command reads from src/data/content.js,
// so it always shows the same facts as the rest of the site.
export default function Terminal() {
  const { ui, tx, setLang } = useLang();
  const t = ui.term;
  const [lines, setLines] = useState([]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef(null);
  const outRef = useRef(null);

  useEffect(() => {
    const el = outRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  function exec(raw) {
    const cmdline = raw.trim();
    if (!cmdline) return;
    const [cmdRaw, ...rest] = cmdline.split(/\s+/);
    const cmd = cmdRaw.toLowerCase();
    const arg = rest.join(" ").trim();

    const out = [];
    const text = (s, kind = "out") => out.push({ kind, text: s });
    const link = (s, href) => out.push({ kind: "out", text: s, href });
    const activeSocials = socials.filter((s) => s.url);
    let clear = false;

    const run = {
      help() {
        text(t.helpIntro);
        Object.entries(t.desc).forEach(([k, v]) => text(`  ${k.padEnd(9)}${v}`));
      },
      whoami() {
        text(profile.name);
        text(tx(profile.role));
      },
      about() {
        about.bio.forEach((p) => text(tx(p)));
      },
      skills() {
        skills.forEach((g) => text(`${tx(g.title)}: ${g.items.join(", ")}`));
      },
      projects() {
        projects.forEach((p, i) => {
          text(`${i + 1}. ${tx(p.title)}`);
          text(`   ${tx(p.summary)}`);
          if (p.source) link(`   ${ui.sourceCode}: ${p.source}`, p.source);
          if (p.live) link(`   ${ui.liveDemo}: ${p.live}`, p.live);
        });
      },
      contact() {
        let any = false;
        if (contact.email) {
          link(`email: ${contact.email}`, `mailto:${contact.email}`);
          any = true;
        }
        if (contact.phone) {
          link(`phone: ${contact.phone}`, `tel:${contact.phone}`);
          any = true;
        }
        if (contact.whatsapp) {
          link(`whatsapp: https://wa.me/${contact.whatsapp}`, `https://wa.me/${contact.whatsapp}`);
          any = true;
        }
        activeSocials.forEach((s) => {
          link(`${s.label.toLowerCase()}: ${s.url}`, s.url);
          any = true;
        });
        if (!any) text(t.none);
      },
      social() {
        if (activeSocials.length === 0) text(t.none);
        activeSocials.forEach((s) => link(`${s.label}: ${s.url}`, s.url));
      },
      ls() {
        text(FILES.join("  "));
      },
      cat() {
        if (!arg) {
          text(t.usageCat, "err");
          return;
        }
        const name = arg.replace(/^\.?\//, "").toLowerCase();
        if (name === "about.txt") run.about();
        else if (name === "skills.txt") run.skills();
        else if (name === "projects.txt") run.projects();
        else if (name === "contact.txt") run.contact();
        else if (name === "secret.txt") text(t.secret);
        else text(t.noFile(arg), "err");
      },
      lang() {
        const l = arg.toLowerCase();
        if (l === "en" || l === "bn") {
          setLang(l);
          text(t.langDone(l));
        } else text(t.langUsage, "err");
      },
      accent() {
        const c = arg.toLowerCase();
        if (setAccent(c)) text(t.accentDone(c));
        else text(t.accentUsage, "err");
      },
      rain() {
        const v = arg.toLowerCase();
        if (v === "on") {
          setRain(true);
          text(t.rainOn);
        } else if (v === "off") {
          setRain(false);
          text(t.rainOff);
        } else text(t.rainUsage, "err");
      },
      sound() {
        const v = arg.toLowerCase();
        if (v === "on") {
          setSound(true);
          text(t.soundOn);
        } else if (v === "off") {
          setSound(false);
          text(t.soundOff);
        } else text(t.soundUsage, "err");
      },
      matrix() {
        setRain(true);
        text(t.rainOn);
      },
      goto() {
        const id = arg.toLowerCase();
        if (!GOTO.includes(id) || !document.getElementById(id)) {
          text(t.gotoUsage, "err");
          return;
        }
        text(t.gotoDone(id));
        setTimeout(() => scrollToId(id), 300);
      },
      hire() {
        text(t.hire);
        setTimeout(() => scrollToId("contact"), 700);
      },
      sudo() {
        text(t.sudo, "err");
      },
      rm() {
        text(t.rm, "err");
      },
      date() {
        text(new Date().toString());
      },
      echo() {
        text(arg);
      },
      clear() {
        clear = true;
      },
    };

    if (Object.prototype.hasOwnProperty.call(run, cmd)) run[cmd]();
    else text(t.notFound(cmdRaw), "err");

    setLines((prev) => (clear ? [] : [...prev, { kind: "in", text: cmdline }, ...out].slice(-200)));
    setHistory((h) => [...h, cmdline]);
    setHIdx(-1);
  }

  function onSubmit(e) {
    e.preventDefault();
    exec(value);
    setValue("");
  }

  function onKeyDown(e) {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = hIdx === -1 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(next);
      setValue(history[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx === -1) return;
      const next = hIdx + 1;
      if (next >= history.length) {
        setHIdx(-1);
        setValue("");
      } else {
        setHIdx(next);
        setValue(history[next]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const names = [...Object.keys(t.desc), "matrix", "date", "echo"];
      const matches = names.filter((n) => value && n.startsWith(value.toLowerCase()));
      if (matches.length === 1) setValue(matches[0]);
    }
  }

  return (
    <Window title="visitor@sofikul: ~">
      <div
        className="p-4 sm:p-6"
        onClick={(e) => {
          if (!e.target.closest("a,button")) inputRef.current?.focus();
        }}
      >
        <div
          ref={outRef}
          role="log"
          data-lenis-prevent
          aria-label={t.outputLabel}
          tabIndex={0}
          className="h-[340px] overflow-y-auto pr-2 font-mono text-sm leading-relaxed"
        >
          <p className="mb-2 text-muted">{t.welcome}</p>
          {lines.map((l, i) =>
            l.kind === "in" ? (
              <p key={i} className="break-words">
                <span className="text-accent">{t.prompt}</span> {l.text}
              </p>
            ) : (
              <p
                key={i}
                className={`whitespace-pre-wrap break-words ${
                  l.kind === "err" ? "text-red-400" : "text-ink/90"
                }`}
              >
                {l.href ? (
                  <a
                    href={l.href}
                    target={l.href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2"
                  >
                    {l.text}
                  </a>
                ) : (
                  l.text
                )}
              </p>
            )
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-3 flex items-center gap-2 border-t border-line pt-3 font-mono">
          <label htmlFor="term-input" className="shrink-0 text-sm text-accent">
            <span className="sr-only">{t.inputLabel}: </span>
            {t.prompt}
          </label>
          <input
            id="term-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            type="text"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            className="min-h-[44px] min-w-0 flex-1 bg-transparent text-base text-ink placeholder:text-muted/60"
            placeholder="help"
          />
        </form>

        <div className="mt-3 flex flex-wrap gap-2">
          {CHIPS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => exec(c)}
              className="min-h-[44px] rounded-lg border border-line px-4 font-mono text-sm text-muted transition hover:border-accent hover:text-accent"
            >
              {c}
            </button>
          ))}
        </div>
      </div>
    </Window>
  );
}
