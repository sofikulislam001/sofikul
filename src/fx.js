// Occasional lightning. Components listen for the "fx:lightning" window event
// (the backdrop flashes, the audio engine rolls thunder). Never more than
// one strike per ~14 seconds, and each strike pulses at most twice.
export function startLightning(first = 6000) {
  let t = setTimeout(function strike() {
    if (!document.hidden) window.dispatchEvent(new CustomEvent("fx:lightning"));
    t = setTimeout(strike, 14000 + Math.random() * 18000);
  }, first);
  return () => clearTimeout(t);
}
