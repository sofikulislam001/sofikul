import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import Terminal from "../components/Terminal.jsx";

export default function TerminalSection() {
  const { ui } = useLang();
  return (
    <section id="terminal" aria-labelledby="terminal-title" className="py-24">
      <div className="container-x">
        <SectionHeading index="04" eyebrow={ui.nav.terminal} title={ui.terminalTitle} id="terminal-title" />
        <Reveal>
          <p className="mb-6 max-w-2xl font-mono text-sm text-muted">{ui.term.hint}</p>
          <Terminal />
        </Reveal>
      </div>
    </section>
  );
}
