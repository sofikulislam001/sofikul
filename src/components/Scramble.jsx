import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { graphemes, randomSymbol, scrambled } from "../lib/text.js";

// "Decodes" text from random symbols into the real words when it scrolls into view.
export default function Scramble({ text, className = "" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [out, setOut] = useState(() => scrambled(text));

  useEffect(() => {
    if (reduce) {
      setOut(text);
      return undefined;
    }
    if (!inView) {
      setOut(scrambled(text));
      return undefined;
    }
    const chars = graphemes(text);
    const total = 26;
    let frame = 0;
    const id = setInterval(() => {
      frame += 1;
      const reveal = Math.floor((chars.length * frame) / total);
      setOut(chars.map((c, i) => (i < reveal || c === " " ? c : randomSymbol())).join(""));
      if (frame >= total) {
        clearInterval(id);
        setOut(text);
      }
    }, 32);
    return () => clearInterval(id);
  }, [inView, text, reduce]);

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{out}</span>
    </span>
  );
}
