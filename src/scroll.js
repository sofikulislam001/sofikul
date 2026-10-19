// Shared access to the smooth-scroll instance so buttons, links and the
// terminal can all scroll the same way.
let lenis = null;

export function setLenis(instance) {
  lenis = instance;
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return false;
  if (lenis) lenis.scrollTo(el, { offset: 0 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}
