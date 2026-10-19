import { useSyncExternalStore } from "react";

// Tiny shared-state helper so any component (and the terminal) can read and
// change things like the accent color or the matrix rain.
export function createStore(initial, onChange) {
  let value = initial;
  const listeners = new Set();
  const get = () => value;
  const subscribe = (l) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };
  const set = (next) => {
    if (next === value) return;
    value = next;
    if (onChange) onChange(next);
    listeners.forEach((l) => l());
  };
  const use = () => useSyncExternalStore(subscribe, get);
  return { get, set, use };
}
