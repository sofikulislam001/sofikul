import { createStore } from "./store.js";

// "game" = walk around the farm, "classic" = the normal scrolling site.
// People who prefer reduced motion start in classic.
function initial() {
  try {
    const saved = localStorage.getItem("mode");
    if (saved === "game" || saved === "classic") return saved;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "classic";
    if (new URLSearchParams(window.location.search).has("classic")) return "classic";
  } catch {
    /* storage can be unavailable; use the default */
  }
  return "game";
}

const store = createStore(initial(), (m) => {
  try {
    localStorage.setItem("mode", m);
  } catch {
    /* ignore */
  }
});

export const useMode = store.use;
export const setMode = (m) => store.set(m === "classic" ? "classic" : "game");
export const toggleMode = () => store.set(store.get() === "game" ? "classic" : "game");
