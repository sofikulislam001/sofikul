import Reveal from "./Reveal.jsx";
import Emph from "./Emph.jsx";
import Scramble from "./Scramble.jsx";

export default function SectionHeading({ index, eyebrow, title, id }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-3">
      <p className="font-mono text-sm uppercase tracking-[0.16em] text-accent">
        <Scramble text={`${index ? `// ${index} ` : "// "}${eyebrow}`} />
      </p>
      <h2
        id={id}
        className="font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
      >
        <Emph text={title} />
      </h2>
    </Reveal>
  );
}
