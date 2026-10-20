import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useLang } from "../i18n.jsx";

// An old TV in the farmhouse. It plays /media/tv.mp4 if you add one,
// otherwise a generated VHS tape (static, tracking lines, creepy captions).
export default function VhsTv() {
  const { ui } = useLang();
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [video, setVideo] = useState(false);
  const lines = ui.game.tvLines;
  const linesRef = useRef(lines);
  linesRef.current = lines;

  useEffect(() => {
    let alive = true;
    fetch("/media/tv.mp4", { method: "HEAD" })
      .then((r) => alive && setVideo(r.ok && (r.headers.get("content-type") || "").startsWith("video")))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const cv = ref.current;
    if (video || !cv) return undefined;
    const c = cv.getContext("2d");
    const w = (cv.width = 320);
    const h = (cv.height = 200);
    let raf = 0;
    let t0 = performance.now();
    const draw = (now) => {
      const t = (now - t0) / 1000;
      const img = c.createImageData(w, h);
      const d = img.data;
      const amt = reduce ? 0.35 : 0.5 + 0.3 * Math.sin(t * 2.3);
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255 * amt;
        d[i] = v * 0.85;
        d[i + 1] = v;
        d[i + 2] = v * 0.9;
        d[i + 3] = 255;
      }
      c.putImageData(img, 0, 0);
      const L = linesRef.current;
      const idx = Math.floor(t / 2.6) % L.length;
      c.fillStyle = "rgba(0,0,0,.55)";
      c.fillRect(0, 84, w, 36);
      c.fillStyle = "#e9ffe9";
      c.font = "bold 20px monospace";
      c.textAlign = "center";
      c.fillText(L[idx], w / 2 + (Math.random() < 0.06 ? 4 : 0), 110);
      c.textAlign = "left";
      c.font = "12px monospace";
      c.fillStyle = "#ff4b55";
      if (Math.floor(t * 2) % 2 === 0) c.fillText("● REC", 12, 22);
      c.fillStyle = "#e9ffe9";
      c.fillText(`00:${String(Math.floor(t) % 60).padStart(2, "0")}`, 262, 22);
      const ty = (t * 60) % (h + 40) - 20;
      c.fillStyle = "rgba(255,255,255,.12)";
      c.fillRect(0, ty, w, 10);
      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [video, reduce]);

  return (
    <figure className="mx-auto mt-12 max-w-md">
      <div className="rounded-2xl border-4 border-line bg-surface2 p-4 shadow-[0_0_40px_rgb(var(--accent)/0.15)]">
        <div className="relative overflow-hidden rounded-lg border border-line bg-black">
          {video ? (
            <video src="/media/tv.mp4" autoPlay muted loop playsInline className="aspect-[8/5] w-full object-cover" />
          ) : (
            <canvas ref={ref} aria-hidden="true" className="aspect-[8/5] w-full" />
          )}
          <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0" />
        </div>
        <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted">
          <span>{ui.game.tvTitle}</span>
          <span aria-hidden="true" className="flex gap-2">
            <i className="h-3 w-3 rounded-full bg-accent/70" />
            <i className="h-3 w-3 rounded-full bg-line" />
          </span>
        </div>
      </div>
    </figure>
  );
}
