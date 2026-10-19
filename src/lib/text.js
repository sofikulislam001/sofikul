// Split text into visible characters (so Bangla letters are never cut in half).
export function graphemes(text) {
  const s = String(text);
  if (typeof Intl !== "undefined" && Intl.Segmenter) {
    return [...new Intl.Segmenter(undefined, { granularity: "grapheme" }).segment(s)].map(
      (x) => x.segment
    );
  }
  return Array.from(s);
}

const SYMBOLS = "01<>/{}[]#$%&*+=?ABCDEFabcdef";

export function randomSymbol() {
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

// A same-length string of random symbols (spaces are kept).
export function scrambled(text) {
  return graphemes(text)
    .map((c) => (c === " " ? " " : randomSymbol()))
    .join("");
}
