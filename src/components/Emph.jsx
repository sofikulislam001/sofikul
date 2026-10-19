// Renders text where *starred* words get the accent italic style.
export default function Emph({ text }) {
  const parts = String(text).split("*");
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <em key={i} className="font-serif font-normal italic text-accent">
            {p}
          </em>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}
