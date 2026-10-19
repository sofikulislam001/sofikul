import { createStore } from "./store.js";

// Ambient horror soundtrack, synthesized live with the Web Audio API (no audio
// file needed). It is OFF until the visitor opts in, because browsers block
// sound that starts without a click. Drop a file at public/audio/ambient.mp3
// to use your own loop instead of the generated drone.

function initial() {
  try {
    return localStorage.getItem("sound") === "on";
  } catch {
    return false;
  }
}

const store = createStore(initial(), (on) => {
  try {
    localStorage.setItem("sound", on ? "on" : "off");
  } catch {
    /* ignore */
  }
  if (on) start();
  else stop();
});

export const useSound = store.use;
export const soundOn = store.get;
export const setSound = (on) => store.set(Boolean(on));
export const toggleSound = () => store.set(!store.get());

let ctx = null;
let master = null;
let running = false;
let nodes = [];
let tm = {};
let customEl = null;
let customOk = false;

// Is there a user-supplied loop? (checked once, quietly)
fetch("/audio/ambient.mp3", { method: "HEAD" })
  .then((r) => {
    customOk = r.ok && (r.headers.get("content-type") || "").startsWith("audio");
  })
  .catch(() => {});

const rand = (a, b) => a + Math.random() * (b - a);

function noiseBuffer(c) {
  const len = c.sampleRate * 2;
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i += 1) d[i] = Math.random() * 2 - 1;
  return buf;
}

function lfo(freq, depth, target) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.frequency.value = freq;
  g.gain.value = depth;
  o.connect(g).connect(target);
  o.start();
  nodes.push(o);
}

function ambience() {
  // low, slightly out-of-tune drone
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 230;
  lp.Q.value = 5;
  const droneGain = ctx.createGain();
  droneGain.gain.value = 0.3;
  lp.connect(droneGain).connect(master);
  [
    [55, "sine", 0.5],
    [55.7, "sawtooth", 0.16],
    [82.4, "sine", 0.14],
    [116.5, "sine", 0.06],
  ].forEach(([f, type, v]) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.value = f;
    g.gain.value = v;
    o.connect(g).connect(lp);
    o.start();
    nodes.push(o);
  });
  lfo(0.07, 110, lp.frequency);
  lfo(0.05, 0.08, droneGain.gain);

  // wind and distant rain
  const buf = noiseBuffer(ctx);
  const wind = ctx.createBufferSource();
  wind.buffer = buf;
  wind.loop = true;
  const bp = ctx.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 520;
  bp.Q.value = 0.7;
  const windGain = ctx.createGain();
  windGain.gain.value = 0.07;
  wind.connect(bp).connect(windGain).connect(master);
  wind.start();
  nodes.push(wind);
  lfo(0.09, 260, bp.frequency);

  const rain = ctx.createBufferSource();
  rain.buffer = buf;
  rain.loop = true;
  rain.playbackRate.value = 1.3;
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 3200;
  const rainGain = ctx.createGain();
  rainGain.gain.value = 0.03;
  rain.connect(hp).connect(rainGain).connect(master);
  rain.start();
  nodes.push(rain);
}

function thump(when, vol) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(72, when);
  o.frequency.exponentialRampToValueAtTime(38, when + 0.18);
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(vol, when + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, when + 0.24);
  o.connect(g).connect(master);
  o.start(when);
  o.stop(when + 0.26);
}

function heartbeat() {
  if (!running) return;
  const t = ctx.currentTime + 0.05;
  thump(t, 0.5);
  thump(t + 0.28, 0.32);
  tm.heart = setTimeout(heartbeat, 1550);
}

function creak() {
  if (!running) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const bp = ctx.createBiquadFilter();
  const g = ctx.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(rand(120, 180), t);
  o.frequency.linearRampToValueAtTime(rand(70, 110), t + 1.4);
  bp.type = "bandpass";
  bp.frequency.value = rand(300, 520);
  bp.Q.value = 6;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.05, t + 0.4);
  g.gain.linearRampToValueAtTime(0.0001, t + 1.5);
  o.connect(bp).connect(g).connect(master);
  o.start(t);
  o.stop(t + 1.6);
  tm.creak = setTimeout(creak, rand(9000, 22000));
}

function thunder() {
  if (!running || !ctx) return;
  const t = ctx.currentTime;
  const src = ctx.createBufferSource();
  src.buffer = noiseBuffer(ctx);
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 170;
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(0.55, t + 0.2);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 3.6);
  src.connect(lp).connect(g).connect(master);
  src.start(t);
  src.stop(t + 3.8);
}

function blip() {
  if (!running || !ctx) return;
  const t = ctx.currentTime;
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = "triangle";
  o.frequency.setValueAtTime(680, t);
  o.frequency.exponentialRampToValueAtTime(300, t + 0.07);
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.08, t + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  o.connect(g).connect(master);
  o.start(t);
  o.stop(t + 0.1);
}

function start() {
  if (running) return;
  const AC = window.AudioContext || window.webkitAudioContext;
  if (!AC) return;
  try {
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);
    }
    if (ctx.resume) ctx.resume();
    running = true;
    const t = ctx.currentTime;
    master.gain.cancelScheduledValues(t);
    master.gain.setValueAtTime(master.gain.value, t);
    master.gain.linearRampToValueAtTime(0.6, t + 2.5);
    if (customOk) {
      customEl = new Audio("/audio/ambient.mp3");
      customEl.loop = true;
      customEl.volume = 0.5;
      customEl.play().catch(() => {});
    } else {
      ambience();
      heartbeat();
      tm.creak = setTimeout(creak, rand(5000, 12000));
    }
  } catch {
    running = false;
  }
}

function stop() {
  if (!running || !ctx) return;
  running = false;
  const t = ctx.currentTime;
  master.gain.cancelScheduledValues(t);
  master.gain.setValueAtTime(master.gain.value, t);
  master.gain.linearRampToValueAtTime(0, t + 0.6);
  Object.values(tm).forEach(clearTimeout);
  tm = {};
  if (customEl) {
    customEl.pause();
    customEl = null;
  }
  const dead = nodes;
  nodes = [];
  setTimeout(() => {
    dead.forEach((n) => {
      try {
        n.stop();
      } catch {
        /* already stopped */
      }
      try {
        n.disconnect();
      } catch {
        /* ignore */
      }
    });
  }, 800);
}

if (typeof window !== "undefined") {
  // A saved "on" preference starts on the first click/key/tap of the visit.
  const arm = () => {
    if (store.get()) start();
  };
  ["pointerdown", "keydown", "touchstart"].forEach((ev) =>
    window.addEventListener(ev, arm, { once: true, passive: true })
  );
  window.addEventListener("fx:lightning", () => {
    if (running) setTimeout(thunder, rand(350, 1200));
  });
  document.addEventListener(
    "click",
    (e) => {
      if (running && e.target.closest && e.target.closest("a,button,[role=button]")) blip();
    },
    true
  );
  document.addEventListener("visibilitychange", () => {
    if (!ctx) return;
    if (document.hidden) ctx.suspend();
    else if (running) ctx.resume();
  });
}
