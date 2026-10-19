import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { graphemes } from "../lib/text.js";

export default function Typewriter({
  text,
  speed = 45,
  delay = 0,
  start = true,
  keepCaret = false,
  className = "",
}) {
  const reduce = useReducedMotion();
  const chars = useMemo(() => graphemes(text), [text]);
  const [n, setN] = useState(0);

  useEffect(() => {
    if (reduce) {
      setN(chars.length);
      return undefined;
    }
    setN(0);
    if (!start) return undefined;
    let i = 0;
    let id;
    const t = setTimeout(() => {
      id = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= chars.length) clearInterval(id);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(t);
      clearInterval(id);
    };
  }, [chars, speed, delay, start, reduce]);

  const done = n >= chars.length;
  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{chars.slice(0, n).join("")}</span>
      <span aria-hidden="true" className={`caret ${done && !keepCaret ? "caret-hide" : ""}`} />
    </span>
  );
}
