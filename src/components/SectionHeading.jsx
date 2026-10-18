import Reveal from "./Reveal.jsx";

export default function SectionHeading({ eyebrow, title, id }) {
  return (
    <Reveal className="mb-12 flex flex-col gap-3">
      <p className="eyebrow">{eyebrow}</p>
      <h2
        id={id}
        className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
      >
        {title}
      </h2>
    </Reveal>
  );
}
