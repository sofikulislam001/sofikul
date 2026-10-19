import { createStore } from "./store.js";

export const ACCENTS = ["green", "cyan", "amber", "pink"];

function initial() {
  try {
    const saved = localStorage.getItem("accent");
    if (ACCENTS.includes(saved)) return saved;
  } catch {
    /* storage can be unavailable; use the default */
  }
  return "green";
}

const store = createStore(initial(), (name) => {
  document.documentElement.setAttribute("data-accent", name);
  try {
    localStorage.setItem("accent", name);
  } catch {
    /* ignore */
  }
});

document.documentElement.setAttribute("data-accent", store.get());

export const useAccent = store.use;

// Returns true if the name was valid.
export function setAccent(name) {
  if (!ACCENTS.includes(name)) return false;
  store.set(name);
  return true;
}

export function nextAccent() {
  setAccent(ACCENTS[(ACCENTS.indexOf(store.get()) + 1) % ACCENTS.length]);
}
