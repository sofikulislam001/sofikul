import { createStore } from "./store.js";

function initial() {
  try {
    const saved = localStorage.getItem("rain");
    if (saved === "on") return true;
    if (saved === "off") return false;
  } catch {
    /* storage can be unavailable; use the default */
  }
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

const store = createStore(initial(), (on) => {
  try {
    localStorage.setItem("rain", on ? "on" : "off");
  } catch {
    /* ignore */
  }
});

export const useRain = store.use;
export const setRain = (on) => store.set(Boolean(on));
