// Farmhouse night walk: a tiny 2D side-scroller drawn on canvas. The visitor
// carries a lantern through the dark; each building is a section of the site.
// Everything is drawn from code (no image files).

const TAU = Math.PI * 2;
const H = 720; // design height in world units
const G = 600; // ground line
const SPACING = 720;
const START_X = 260;

function mulberry(a) {
  let s = a;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* ---------- buildings: each draws itself around x, standing on the ground ---------- */
const DRAW = {
  about(c, x, t) {
    c.fillStyle = "#58392f";
    c.fillRect(x - 150, G - 190, 300, 190);
    c.strokeStyle = "rgba(0,0,0,.28)";
    c.lineWidth = 2;
    for (let i = 1; i < 10; i += 1) {
      c.beginPath();
      c.moveTo(x - 150, G - 190 + i * 19);
      c.lineTo(x + 150, G - 190 + i * 19);
      c.stroke();
    }
    c.fillStyle = "#2f1f24";
    c.beginPath();
    c.moveTo(x - 184, G - 186);
    c.lineTo(x, G - 312);
    c.lineTo(x + 184, G - 186);
    c.closePath();
    c.fill();
    c.fillStyle = "#43302f";
    c.fillRect(x + 70, G - 322, 26, 72);
    for (let i = 0; i < 5; i += 1) {
      const p = (t * 0.25 + i / 5) % 1;
      c.fillStyle = `rgba(190,190,200,${0.25 * (1 - p)})`;
      c.beginPath();
      c.arc(x + 83 + Math.sin(p * 5 + i) * 10, G - 328 - p * 90, 8 + p * 16, 0, TAU);
      c.fill();
    }
    const fl = 0.82 + 0.18 * Math.sin(t * 9) * Math.sin(t * 3.1);
    [[-100, -140], [44, -140]].forEach(([dx, dy]) => {
      c.fillStyle = `rgba(255,196,110,${fl})`;
      c.fillRect(x + dx, G + dy, 56, 60);
      c.strokeStyle = "#1a1012";
      c.lineWidth = 4;
      c.strokeRect(x + dx, G + dy, 56, 60);
      c.beginPath();
      c.moveTo(x + dx + 28, G + dy);
      c.lineTo(x + dx + 28, G + dy + 60);
      c.moveTo(x + dx, G + dy + 30);
      c.lineTo(x + dx + 56, G + dy + 30);
      c.stroke();
    });
    c.fillStyle = "#2a1a16";
    c.fillRect(x - 22, G - 100, 44, 100);
    c.fillStyle = "#e0b060";
    c.beginPath();
    c.arc(x + 12, G - 48, 3, 0, TAU);
    c.fill();
    c.fillStyle = "#3f2c26";
    c.fillRect(x - 172, G - 14, 344, 14);
    c.fillStyle = `rgba(255,170,80,${0.45 + 0.3 * Math.sin(t * 2)})`;
    c.beginPath();
    c.arc(x, G - 238, 12, 0, TAU);
    c.fill();
  },
  skills(c, x, t) {
    c.fillStyle = "#4b4a50";
    c.fillRect(x - 46, G - 50, 92, 50);
    c.strokeStyle = "rgba(0,0,0,.4)";
    c.lineWidth = 2;
    for (let i = 0; i < 3; i += 1) {
      c.beginPath();
      c.moveTo(x - 46, G - 38 + i * 14);
      c.lineTo(x + 46, G - 38 + i * 14);
      c.stroke();
    }
    c.fillStyle = "#1b1314";
    c.fillRect(x - 52, G - 56, 104, 10);
    c.fillStyle = "#4a3128";
    c.fillRect(x - 46, G - 150, 8, 100);
    c.fillRect(x + 38, G - 150, 8, 100);
    c.fillRect(x - 56, G - 162, 112, 8);
    c.fillStyle = "#2f1f24";
    c.beginPath();
    c.moveTo(x - 66, G - 160);
    c.lineTo(x, G - 206);
    c.lineTo(x + 66, G - 160);
    c.closePath();
    c.fill();
    c.strokeStyle = "#8d7a66";
    c.lineWidth = 2;
    const sw = Math.sin(t * 1.4) * 4;
    c.beginPath();
    c.moveTo(x, G - 156);
    c.lineTo(x + sw, G - 98);
    c.stroke();
    c.fillStyle = "#6b5445";
    c.fillRect(x + sw - 8, G - 98, 16, 14);
    c.fillStyle = `rgba(120,200,255,${0.3 + 0.15 * Math.sin(t * 3)})`;
    c.beginPath();
    c.ellipse(x, G - 52, 30, 6, 0, 0, TAU);
    c.fill();
  },
  projects(c, x, t) {
    c.fillStyle = "#7c2b2b";
    c.fillRect(x - 170, G - 170, 340, 170);
    c.strokeStyle = "rgba(0,0,0,.3)";
    c.lineWidth = 2;
    for (let i = -8; i <= 8; i += 1) {
      c.beginPath();
      c.moveTo(x + i * 20, G - 170);
      c.lineTo(x + i * 20, G);
      c.stroke();
    }
    c.fillStyle = "#3a1618";
    c.beginPath();
    c.moveTo(x - 190, G - 166);
    c.lineTo(x - 140, G - 262);
    c.lineTo(x, G - 296);
    c.lineTo(x + 140, G - 262);
    c.lineTo(x + 190, G - 166);
    c.closePath();
    c.fill();
    c.fillStyle = "#e8dccb";
    c.fillRect(x - 70, G - 120, 140, 120);
    c.fillStyle = "#4a1c1c";
    c.fillRect(x - 64, G - 114, 128, 114);
    c.strokeStyle = "#e8dccb";
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(x - 64, G - 114);
    c.lineTo(x + 64, G);
    c.moveTo(x + 64, G - 114);
    c.lineTo(x - 64, G);
    c.stroke();
    const ajar = 6 + 4 * Math.sin(t * 0.8);
    c.fillStyle = "#0a0405";
    c.fillRect(x - ajar / 2, G - 112, ajar, 110);
    c.fillStyle = `rgba(255,150,60,${0.35 + 0.25 * Math.sin(t * 2.3)})`;
    c.fillRect(x - 24, G - 224, 48, 40);
    c.strokeStyle = "#e8dccb";
    c.lineWidth = 4;
    c.strokeRect(x - 24, G - 224, 48, 40);
    c.beginPath();
    c.moveTo(x, G - 296);
    c.lineTo(x, G - 330);
    c.stroke();
    c.save();
    c.translate(x, G - 330);
    c.rotate(Math.sin(t * 0.9) * 0.5);
    c.fillStyle = "#1a1012";
    c.fillRect(-16, -3, 32, 6);
    c.restore();
  },
  github(c, x, t) {
    const sway = Math.sin(t * 0.8) * 0.03;
    c.fillStyle = "#5a4228";
    c.fillRect(x - 5, G - 210, 10, 210);
    c.save();
    c.translate(x, G - 170);
    c.rotate(sway);
    c.fillRect(-70, -5, 140, 10);
    c.fillStyle = "#b99a55";
    c.fillRect(-26, -8, 52, 80);
    for (let i = 0; i < 6; i += 1) c.fillRect(-26 + i * 9, 72, 5, 14 + (i % 2) * 8);
    c.fillRect(-84, -6, 18, 14);
    c.fillRect(66, -6, 18, 14);
    c.fillStyle = "#c9ab68";
    c.beginPath();
    c.arc(0, -34, 20, 0, TAU);
    c.fill();
    c.fillStyle = "#1a1012";
    c.beginPath();
    c.arc(-7, -37, 3, 0, TAU);
    c.arc(7, -37, 3, 0, TAU);
    c.fill();
    c.fillRect(-9, -26, 18, 3);
    c.fillStyle = "#2b1f22";
    c.fillRect(-34, -56, 68, 7);
    c.fillRect(-20, -86, 40, 32);
    c.restore();
    c.fillStyle = "#e8dccb";
    c.save();
    c.translate(x + 64, G - 214);
    c.rotate(0.08 + sway);
    c.fillRect(0, 0, 70, 26);
    c.fillStyle = "#1a1012";
    c.font = "bold 13px monospace";
    c.fillText("GITHUB", 8, 18);
    c.restore();
  },
  terminal(c, x, t) {
    c.fillStyle = "#4a443f";
    c.fillRect(x - 90, G - 110, 180, 110);
    c.fillStyle = "#2a2220";
    c.beginPath();
    c.moveTo(x - 104, G - 106);
    c.lineTo(x, G - 160);
    c.lineTo(x + 104, G - 106);
    c.closePath();
    c.fill();
    c.fillStyle = "#1a1210";
    c.fillRect(x + 40, G - 80, 34, 80);
    const f = 0.55 + 0.35 * Math.sin(t * 11) * Math.sin(t * 2.7);
    c.fillStyle = `rgba(120,255,170,${f})`;
    c.fillRect(x - 72, G - 90, 90, 56);
    c.strokeStyle = "#1a1210";
    c.lineWidth = 5;
    c.strokeRect(x - 72, G - 90, 90, 56);
    c.fillStyle = "rgba(0,0,0,.5)";
    c.font = "bold 12px monospace";
    c.fillText("> _", x - 62, G - 62);
    c.strokeStyle = "#8d7a66";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(x - 60, G - 130);
    c.lineTo(x - 60, G - 200);
    c.moveTo(x - 80, G - 186);
    c.lineTo(x - 40, G - 186);
    c.stroke();
  },
  faq(c, x, t) {
    c.fillStyle = "#5a4228";
    c.fillRect(x - 6, G - 230, 12, 230);
    const boards = [
      [-86, -210, 1, "?"],
      [-4, -170, -1, "??"],
      [-70, -130, 1, "???"],
    ];
    boards.forEach(([dx, dy, dir, label], i) => {
      c.save();
      c.translate(x, G + dy);
      c.rotate(Math.sin(t * 1.1 + i) * 0.03);
      c.fillStyle = "#8a6a43";
      c.beginPath();
      if (dir > 0) {
        c.moveTo(-70, 0);
        c.lineTo(70, 0);
        c.lineTo(88, 17);
        c.lineTo(70, 34);
        c.lineTo(-70, 34);
      } else {
        c.moveTo(70, 0);
        c.lineTo(-70, 0);
        c.lineTo(-88, 17);
        c.lineTo(-70, 34);
        c.lineTo(70, 34);
      }
      c.closePath();
      c.fill();
      c.fillStyle = "#1a1012";
      c.font = "bold 18px monospace";
      c.fillText(label, -10, 24);
      c.restore();
    });
    c.strokeStyle = "#1a1012";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(x + 6, G - 226);
    c.lineTo(x + 40, G - 226);
    c.lineTo(x + 40, G - 210);
    c.stroke();
    c.fillStyle = `rgba(255,190,100,${0.8 + 0.2 * Math.sin(t * 7)})`;
    c.fillRect(x + 32, G - 210, 16, 22);
  },
  contact(c, x, t) {
    c.fillStyle = "#4a3128";
    c.fillRect(x - 5, G - 120, 10, 120);
    c.fillStyle = "#3a4048";
    c.beginPath();
    c.moveTo(x - 36, G - 120);
    c.lineTo(x - 36, G - 158);
    c.quadraticCurveTo(x, G - 186, x + 36, G - 158);
    c.lineTo(x + 36, G - 120);
    c.closePath();
    c.fill();
    c.fillStyle = "#c22b36";
    c.fillRect(x + 36, G - 156 + Math.sin(t * 2) * 1.5, 6, 30);
    c.fillRect(x + 36, G - 156 + Math.sin(t * 2) * 1.5, 22, 10);
    c.fillStyle = "#e8dccb";
    c.fillRect(x - 24, G - 148, 30, 6);
    c.strokeStyle = "#8d7a66";
    c.lineWidth = 3;
    c.beginPath();
    c.moveTo(x - 5, G - 100);
    c.lineTo(x - 60, G - 100);
    c.lineTo(x - 60, G - 70);
    c.stroke();
    c.fillStyle = `rgba(255,180,90,${0.75 + 0.25 * Math.sin(t * 6)})`;
    c.beginPath();
    c.arc(x - 60, G - 62, 9, 0, TAU);
    c.fill();
  },
};

// Where each building's lamp glows through the darkness (offset from x, y above ground, radius).
const LAMP = {
  about: [0, 110, 270],
  skills: [0, 70, 170],
  projects: [0, 140, 250],
  github: [0, 130, 190],
  terminal: [-27, 62, 190],
  faq: [40, 200, 210],
  contact: [-60, 62, 190],
};

export function createGame(canvas, dark, opts) {
  const { pois, onNear, onEvent, onStep } = opts;
  const c = canvas.getContext("2d");
  const d = dark.getContext("2d");
  const placed = pois.map((p, i) => ({ ...p, x: START_X + 440 + i * SPACING }));
  const WORLD = (placed.length ? placed[placed.length - 1].x : START_X) + 760;

  let W = 0;
  let Hh = 0;
  let dpr = 1;
  let k = 1;
  let oy = 0;
  let viewW = 800;
  let raf = 0;
  let last = 0;
  let paused = false;

  const s = {
    px: START_X,
    face: 1,
    vx: 0,
    walk: 0,
    stepSign: 1,
    cam: 0,
    t: 0,
    l: false,
    r: false,
    run: false,
    near: null,
    strike: 6,
    flash: 0,
    lightOut: 0,
    ghost: { x: 0, show: false, stage: 0, fade: 0 },
    crows: [],
    crowsDone: false,
    eyes: [],
  };

  // static scenery
  const R = mulberry(11);
  const stars = Array.from({ length: 70 }, () => ({ x: R(), y: R() * 0.55, r: 0.6 + R() * 1.3, p: R() * 6 }));
  const trees = [];
  for (let x = -100; x < WORLD + 200; x += 90 + R() * 110) trees.push({ x, h: 150 + R() * 190, w: 7 + R() * 7, br: R() });
  const corn = [];
  for (let x = 0; x < WORLD; x += 13 + R() * 9) corn.push({ x, h: 120 + R() * 60, lean: (R() - 0.5) * 0.25, p: R() * 6 });
  const posts = [];
  for (let x = 40; x < WORLD; x += 70) posts.push(x);
  const tufts = Array.from({ length: Math.ceil(WORLD / 60) }, (_, i) => ({ x: i * 60 + R() * 40, h: 8 + R() * 14 }));
  const rain = Array.from({ length: 90 }, () => ({ x: R(), y: R(), v: 0.6 + R() * 0.6 }));
  // watching eyes, hidden in the corn between buildings
  for (let i = 0; i < placed.length - 1; i += 1) {
    s.eyes.push({ x: placed[i].x + SPACING / 2 + (R() - 0.5) * 120, y: G - 70 - R() * 50, p: R() * 20 });
  }
  const lastX = placed.length ? placed[placed.length - 1].x : START_X;

  function resize() {
    W = canvas.clientWidth;
    Hh = canvas.clientHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    [canvas, dark].forEach((cv) => {
      cv.width = Math.floor(W * dpr);
      cv.height = Math.floor(Hh * dpr);
    });
    k = Math.min(Hh / H, W / 600);
    oy = Hh - H * k;
    viewW = W / k;
  }

  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const sx = (wx) => (wx - s.cam) * k;
  const sy = (wy) => oy + wy * k;

  function emit(name, data) {
    if (onEvent) onEvent(name, data);
  }

  function update(dt) {
    s.t += dt;
    const dir = (s.r ? 1 : 0) - (s.l ? 1 : 0);
    const speed = s.run ? 270 : 150;
    const target = paused ? 0 : dir * speed;
    s.vx += (target - s.vx) * Math.min(1, dt * 9);
    if (Math.abs(s.vx) < 2) s.vx = 0;
    if (dir) s.face = dir;
    s.px = clamp(s.px + s.vx * dt, 90, WORLD - 140);
    s.walk += Math.abs(s.vx) * dt * 0.05;
    const sg = Math.sin(s.walk) >= 0 ? 1 : -1;
    if (sg !== s.stepSign && Math.abs(s.vx) > 20) {
      s.stepSign = sg;
      if (onStep) onStep(s.run);
    }
    const want = clamp(s.px - viewW * 0.4, 0, Math.max(0, WORLD - viewW));
    s.cam += (want - s.cam) * Math.min(1, dt * 5);

    let near = null;
    placed.forEach((p) => {
      if (Math.abs(p.x - s.px) < 120) near = p.id;
    });
    if (near !== s.near) {
      s.near = near;
      if (onNear) onNear(near);
    }

    s.strike -= dt;
    if (s.strike <= 0) {
      s.flash = 0.85;
      s.strike = 12 + Math.random() * 18;
      emit("lightning");
    }
    if (s.flash > 0) s.flash = Math.max(0, s.flash - dt);
    if (s.lightOut > 0) s.lightOut = Math.max(0, s.lightOut - dt);

    // ghost: stands ahead of you, vanishes when you get close
    const g = s.ghost;
    if (g.stage === 0 && s.px > placed[0]?.x + 600) {
      g.stage = 1;
      g.show = true;
      g.x = s.px + 520;
      emit("ghost-appear");
    } else if (g.stage === 2 && s.px > lastX - 1500) {
      g.stage = 3;
      g.show = true;
      g.x = Math.min(lastX - 260, s.px + 520);
      emit("ghost-appear");
    }
    if (g.show) {
      g.fade = Math.min(1, g.fade + dt * 0.8);
      if (Math.abs(g.x - s.px) < 300) {
        g.show = false;
        g.fade = 0;
        g.stage += 1;
        s.lightOut = 1.4;
        emit("ghost");
      }
    }

    // crows burst out of the barn once
    const barn = placed.find((p) => p.id === "projects");
    if (barn && !s.crowsDone && Math.abs(barn.x - s.px) < 420) {
      s.crowsDone = true;
      s.crows = Array.from({ length: 7 }, (_, i) => ({ x: barn.x - 40 + i * 12, y: G - 240, vx: 60 + i * 22, vy: -90 - i * 16, p: i }));
      emit("crows");
    }
    s.crows.forEach((b) => {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      b.vy += 8 * dt;
    });
    s.crows = s.crows.filter((b) => b.y > -200 && b.x < WORLD + 400);
  }

  function skyAndFar(w, h) {
    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, "#05070d");
    sky.addColorStop(0.62, "#140b12");
    sky.addColorStop(1, "#2a1114");
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);
    stars.forEach((st) => {
      c.globalAlpha = 0.35 + 0.5 * Math.abs(Math.sin(s.t * 0.8 + st.p));
      c.fillStyle = "#fff";
      c.fillRect(st.x * w, st.y * (oy + 440 * k), st.r, st.r);
    });
    c.globalAlpha = 1;
    const mx = w * 0.78 - s.cam * 0.02 * k;
    const my = oy + 110 * k;
    const halo = c.createRadialGradient(mx, my, 10, mx, my, 260 * k);
    halo.addColorStop(0, "rgba(255,70,80,.30)");
    halo.addColorStop(1, "rgba(255,70,80,0)");
    c.fillStyle = halo;
    c.fillRect(0, 0, w, h);
    c.fillStyle = "#eadfd2";
    c.beginPath();
    c.arc(mx, my, 44 * k, 0, TAU);
    c.fill();
    c.fillStyle = "rgba(160,140,130,.5)";
    c.beginPath();
    c.arc(mx - 12 * k, my - 8 * k, 8 * k, 0, TAU);
    c.arc(mx + 14 * k, my + 12 * k, 11 * k, 0, TAU);
    c.fill();
    // distant hills
    c.fillStyle = "#12090e";
    c.beginPath();
    c.moveTo(0, h);
    for (let px = 0; px <= w + 20; px += 20) {
      const wx = px / k + s.cam * 0.2;
      c.lineTo(px, oy + (G - 120 - 46 * Math.sin(wx * 0.004) - 24 * Math.sin(wx * 0.011)) * k);
    }
    c.lineTo(w, h);
    c.closePath();
    c.fill();
  }

  function drawTrees() {
    c.strokeStyle = "#0b0608";
    c.fillStyle = "#0b0608";
    const off = s.cam * 0.5;
    trees.forEach((t) => {
      const wx = t.x - off + s.cam;
      if (wx < s.cam - 120 || wx > s.cam + viewW + 120) return;
      c.lineWidth = t.w * k;
      c.beginPath();
      c.moveTo(sy0(wx), oy + (G - 30) * k);
      c.lineTo(sy0(wx), oy + (G - 30 - t.h) * k);
      c.stroke();
      c.lineWidth = Math.max(2, t.w * 0.45) * k;
      for (let i = 0; i < 4; i += 1) {
        const by = G - 30 - t.h * (0.4 + i * 0.17);
        const dir = i % 2 ? 1 : -1;
        c.beginPath();
        c.moveTo(sy0(wx), oy + by * k);
        c.lineTo(sy0(wx) + dir * (36 + t.br * 26) * k, oy + (by - 34 - t.br * 18) * k);
        c.stroke();
      }
    });
  }
  function sy0(wx) {
    return (wx - s.cam) * k;
  }

  function drawGround(w, h) {
    // corn (behind the buildings)
    c.strokeStyle = "#2a2a14";
    c.fillStyle = "#2a2a14";
    corn.forEach((st) => {
      if (st.x < s.cam - 40 || st.x > s.cam + viewW + 40) return;
      if (placed.some((p) => Math.abs(p.x - st.x) < 210)) return;
      const bx = sx(st.x);
      const by = sy(G);
      const sw = Math.sin(s.t * 1.3 + st.p) * 4 + st.lean * st.h;
      c.lineWidth = 3 * k;
      c.beginPath();
      c.moveTo(bx, by);
      c.quadraticCurveTo(bx + sw * 0.4 * k, by - st.h * 0.5 * k, bx + sw * k, by - st.h * k);
      c.stroke();
      c.beginPath();
      c.moveTo(bx + sw * 0.5 * k, by - st.h * 0.55 * k);
      c.lineTo(bx + (sw * 0.5 + 22) * k, by - st.h * 0.7 * k);
      c.moveTo(bx + sw * 0.5 * k, by - st.h * 0.45 * k);
      c.lineTo(bx + (sw * 0.5 - 22) * k, by - st.h * 0.62 * k);
      c.stroke();
    });
    // ground
    const gr = c.createLinearGradient(0, sy(G), 0, h);
    gr.addColorStop(0, "#2b2016");
    gr.addColorStop(1, "#120c0a");
    c.fillStyle = gr;
    c.fillRect(0, sy(G), w, h - sy(G) + 2);
    c.fillStyle = "#4a3828";
    c.fillRect(0, sy(G), w, 5 * k);
    c.fillStyle = "#1a2310";
    tufts.forEach((tu) => {
      if (tu.x < s.cam - 30 || tu.x > s.cam + viewW + 30) return;
      c.fillRect(sx(tu.x), sy(G) - tu.h * k + 6 * k, 3 * k, tu.h * k);
      c.fillRect(sx(tu.x) + 6 * k, sy(G) - tu.h * 0.7 * k + 6 * k, 3 * k, tu.h * 0.7 * k);
    });
    // fence
    c.fillStyle = "#3b2a22";
    posts.forEach((px) => {
      if (px < s.cam - 20 || px > s.cam + viewW + 20) return;
      if (placed.some((p) => Math.abs(p.x - px) < 200)) return;
      c.fillRect(sx(px), sy(G - 58), 6 * k, 58 * k);
    });
    c.fillRect(0, sy(G - 46), w, 4 * k);
    c.fillRect(0, sy(G - 26), w, 4 * k);
  }

  function drawPlayer() {
    const x = sx(s.px);
    const bob = Math.abs(Math.sin(s.walk)) * 3 * (Math.abs(s.vx) > 10 ? 1 : 0);
    const y = sy(G) - bob * k;
    const f = s.face;
    const sw = Math.sin(s.walk) * 14 * (Math.abs(s.vx) > 10 ? 1 : 0.0);
    c.save();
    c.translate(x, y);
    c.scale(k, k);
    c.fillStyle = "#1b1316";
    c.strokeStyle = "#1b1316";
    c.lineWidth = 8;
    c.lineCap = "round";
    c.beginPath();
    c.moveTo(-4, -34);
    c.lineTo(-4 + sw, 0);
    c.moveTo(4, -34);
    c.lineTo(4 - sw, 0);
    c.stroke();
    c.beginPath();
    c.roundRect(-13, -78, 26, 46, 8);
    c.fill();
    c.beginPath();
    c.arc(f * 1, -88, 11, 0, TAU);
    c.fill();
    c.fillStyle = "#2a1c1e";
    c.fillRect(-17, -97, 34, 5);
    c.beginPath();
    c.roundRect(-10, -108, 20, 13, 4);
    c.fill();
    // arm + lantern
    const sway = Math.sin(s.t * 3) * 2 + sw * 0.15;
    c.lineWidth = 6;
    c.beginPath();
    c.moveTo(f * 6, -68);
    c.lineTo(f * 24, -50);
    c.stroke();
    c.strokeStyle = "#e0b060";
    c.lineWidth = 2;
    c.beginPath();
    c.moveTo(f * 24, -50);
    c.lineTo(f * 24 + sway, -42);
    c.stroke();
    c.fillStyle = "#ffd488";
    c.fillRect(f * 24 + sway - 6, -42, 12, 16);
    c.restore();
  }

  function drawWeather(w, h) {
    c.strokeStyle = "rgba(190,210,230,.16)";
    c.lineWidth = 1;
    c.beginPath();
    rain.forEach((r) => {
      r.y += 0.014 * r.v * 60 * 0.016 * 4;
      if (r.y > 1) {
        r.y = 0;
        r.x = Math.random();
      }
      const x = r.x * w;
      const y = r.y * h;
      c.moveTo(x, y);
      c.lineTo(x - 5, y + 16);
    });
    c.stroke();
    for (let i = 0; i < 3; i += 1) {
      const fx = ((s.t * (10 + i * 7) + i * 500) % (w + 600)) - 300;
      const g2 = c.createRadialGradient(fx, sy(G - 20), 10, fx, sy(G - 20), 340 * k);
      g2.addColorStop(0, "rgba(170,185,185,.13)");
      g2.addColorStop(1, "rgba(170,185,185,0)");
      c.fillStyle = g2;
      c.fillRect(fx - 340 * k, sy(G - 360), 680 * k, 420 * k);
    }
    if (s.flash > 0) {
      const p = s.flash;
      const a = (p > 0.7 ? 0.22 : p > 0.5 ? 0.04 : p > 0.35 ? 0.26 : 0) * 1;
      if (a) {
        c.fillStyle = `rgba(200,220,255,${a})`;
        c.fillRect(0, 0, w, h);
      }
    }
  }

  function drawCrows() {
    c.strokeStyle = "#060304";
    c.lineWidth = 2.4 * k;
    s.crows.forEach((b) => {
      const fl = Math.sin(s.t * 18 + b.p) * 6;
      const x = sx(b.x);
      const y = sy(b.y);
      c.beginPath();
      c.moveTo(x - 12 * k, y + fl * k * 0.5);
      c.quadraticCurveTo(x - 5 * k, y - 8 * k + fl * k, x, y);
      c.quadraticCurveTo(x + 5 * k, y - 8 * k + fl * k, x + 12 * k, y + fl * k * 0.5);
      c.stroke();
    });
  }

  function drawGhost() {
    const g = s.ghost;
    if (!g.show) return;
    const x = sx(g.x);
    const y = sy(G);
    const fl = 0.55 + 0.25 * Math.sin(s.t * 7) + (Math.random() < 0.03 ? -0.4 : 0);
    c.save();
    c.translate(x, y);
    c.scale(k, k);
    c.globalAlpha = Math.max(0, fl) * g.fade;
    c.fillStyle = "#dcdcea";
    c.beginPath();
    c.moveTo(-26, 0);
    c.quadraticCurveTo(-30, -70, -14, -104);
    c.lineTo(14, -104);
    c.quadraticCurveTo(30, -70, 26, 0);
    for (let i = 0; i < 6; i += 1) c.lineTo(26 - i * 9, i % 2 ? 0 : 10);
    c.closePath();
    c.fill();
    c.beginPath();
    c.arc(0, -118, 15, 0, TAU);
    c.fill();
    c.fillStyle = "#06040a";
    c.beginPath();
    c.ellipse(-5.5, -120, 2.6, 4.5, 0, 0, TAU);
    c.ellipse(5.5, -120, 2.6, 4.5, 0, 0, TAU);
    c.fill();
    c.restore();
  }

  function render() {
    const w = W;
    const h = Hh;
    c.setTransform(dpr, 0, 0, dpr, 0, 0);
    c.clearRect(0, 0, w, h);
    skyAndFar(w, h);
    drawTrees();
    drawGround(w, h);
    placed.forEach((p) => {
      if (p.x < s.cam - 300 || p.x > s.cam + viewW + 300) return;
      c.save();
      c.translate(-s.cam * k, oy);
      c.scale(k, k);
      DRAW[p.id](c, p.x, s.t);
      c.restore();
    });
    // little mark on the ground in front of each door
    placed.forEach((p) => {
      if (p.x < s.cam - 100 || p.x > s.cam + viewW + 100) return;
      c.fillStyle = p.visited ? "rgba(255,200,120,.35)" : "rgba(255,52,66,.45)";
      c.fillRect(sx(p.x) - 30 * k, sy(G) + 8 * k, 60 * k, 3 * k);
    });
    drawGhost();
    drawPlayer();
    drawCrows();
    drawWeather(w, h);

    // darkness with light cut out
    d.setTransform(1, 0, 0, 1, 0, 0);
    d.globalCompositeOperation = "source-over";
    d.clearRect(0, 0, dark.width, dark.height);
    const fl = s.flash > 0.35 ? 0.4 : 0;
    d.fillStyle = `rgba(2,3,7,${0.88 - fl})`;
    d.fillRect(0, 0, dark.width, dark.height);
    d.globalCompositeOperation = "destination-out";
    const cut = (wx, wy, r, a) => {
      const X = sx(wx) * dpr;
      const Y = sy(wy) * dpr;
      const rr = r * k * dpr;
      const gr = d.createRadialGradient(X, Y, rr * 0.05, X, Y, rr);
      gr.addColorStop(0, `rgba(0,0,0,${a})`);
      gr.addColorStop(0.55, `rgba(0,0,0,${a * 0.55})`);
      gr.addColorStop(1, "rgba(0,0,0,0)");
      d.fillStyle = gr;
      d.fillRect(X - rr, Y - rr, rr * 2, rr * 2);
    };
    const jitter = s.lightOut > 0 ? (Math.random() < 0.5 ? 0.15 : 1) : 1;
    const lr = (290 + Math.sin(s.t * 9) * 6 + Math.sin(s.t * 3.7) * 5) * jitter;
    cut(s.px + s.face * 24, G - 36, lr, 0.97);
    cut(s.px, G - 60, 90, 0.5);
    placed.forEach((p) => {
      const [dx, dy, r] = LAMP[p.id];
      if (p.x + 400 < s.cam || p.x - 400 > s.cam + viewW) return;
      cut(p.x + dx, G - dy, r * (0.92 + 0.08 * Math.sin(s.t * 6 + p.x)), 0.78);
    });
    d.globalCompositeOperation = "source-over";
    // warm lantern tint + eyes in the dark
    const X = sx(s.px + s.face * 24) * dpr;
    const Y = sy(G - 36) * dpr;
    const wg = d.createRadialGradient(X, Y, 0, X, Y, 200 * k * dpr);
    wg.addColorStop(0, "rgba(255,170,80,.18)");
    wg.addColorStop(1, "rgba(255,170,80,0)");
    d.fillStyle = wg;
    d.fillRect(X - 200 * k * dpr, Y - 200 * k * dpr, 400 * k * dpr, 400 * k * dpr);
    s.eyes.forEach((e) => {
      const dist = Math.abs(e.x - s.px);
      if (dist < 230 || dist > 900) return;
      const cyc = (s.t + e.p) % 14;
      if (cyc > 6.5) return;
      const blink = cyc > 3.0 && cyc < 3.25 ? 0.1 : 1;
      const ex = sx(e.x) * dpr;
      const ey = sy(e.y) * dpr;
      d.fillStyle = `rgba(255,40,50,${0.9 * blink})`;
      d.shadowColor = "rgba(255,40,50,.9)";
      d.shadowBlur = 10 * dpr;
      d.beginPath();
      d.ellipse(ex - 7 * k * dpr, ey, 3.4 * k * dpr, 2 * k * dpr * blink + 0.4, 0, 0, TAU);
      d.ellipse(ex + 7 * k * dpr, ey, 3.4 * k * dpr, 2 * k * dpr * blink + 0.4, 0, 0, TAU);
      d.fill();
      d.shadowBlur = 0;
    });
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000 || 0);
    last = now;
    if (!document.hidden) {
      update(dt);
      render();
    }
    raf = requestAnimationFrame(frame);
  }

  return {
    start() {
      resize();
      window.addEventListener("resize", resize);
      last = performance.now();
      raf = requestAnimationFrame(frame);
    },
    stop() {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    },
    setInput(i) {
      if ("l" in i) s.l = i.l;
      if ("r" in i) s.r = i.r;
      if ("run" in i) s.run = i.run;
    },
    setPaused(v) {
      paused = v;
      if (v) {
        s.l = false;
        s.r = false;
      }
    },
    markVisited(id) {
      const p = placed.find((q) => q.id === id);
      if (p) p.visited = true;
    },
    teleport(id) {
      const p = placed.find((q) => q.id === id);
      if (!p) return;
      s.px = p.x - 150;
      s.face = 1;
      s.vx = 0;
      s.cam = clamp(s.px - viewW * 0.4, 0, Math.max(0, WORLD - viewW));
    },
    position: () => Math.round(s.px),
  };
}
