import { useEffect, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { experience, faq, github, projects, services, skills } from "./data/content.js";
import { useLang } from "./i18n.jsx";
import DhakaBackdrop from "./components/DhakaBackdrop.jsx";
import Flashlight from "./components/Flashlight.jsx";
import { startLightning } from "./fx.js";
import Cursor from "./components/Cursor.jsx";
import Konami from "./components/Konami.jsx";
import { setLenis } from "./scroll.js";
import { useMode } from "./mode.js";
import FarmGame from "./components/FarmGame.jsx";
import BootScreen from "./components/BootScreen.jsx";
import MatrixRain from "./components/MatrixRain.jsx";
import Marquee from "./components/Marquee.jsx";
import Navbar from "./components/Navbar.jsx";
import ScrollHud from "./components/ScrollHud.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Services from "./sections/Services.jsx";
import Projects from "./sections/Projects.jsx";
import GithubFeed from "./sections/GithubFeed.jsx";
import TerminalSection from "./sections/TerminalSection.jsx";
import Experience from "./sections/Experience.jsx";
import Faq from "./sections/Faq.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

// Sections with no content are skipped automatically (and left out of the menu).
const navItems = [
  { id: "about", show: true },
  { id: "skills", show: skills.length > 0 },
  { id: "services", show: services.length > 0 },
  { id: "projects", show: projects.length > 0 },
  { id: "github", show: Boolean(github.user) },
  { id: "terminal", show: true },
  { id: "experience", show: experience.length > 0 },
  { id: "faq", show: faq.length > 0 },
  { id: "contact", show: true },
].filter((i) => i.show);

const has = (id) => navItems.some((i) => i.id === id);

// The boot intro plays once per browser session and never for reduced-motion users.
function shouldBoot() {
  try {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    if (sessionStorage.getItem("booted") === "1") return false;
  } catch {
    /* if storage is blocked, just play the intro */
  }
  return true;
}

let lenisRef = null;

export default function App() {
  const { ui } = useLang();
  const [booting, setBooting] = useState(shouldBoot);
  const mode = useMode();
  const game = mode === "game";

  // Smooth inertia scrolling (skipped for reduced-motion users).
  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }
    if (reduce) return undefined;
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: 0 } });
    lenisRef = lenis;
    setLenis(lenis);
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      lenisRef = null;
      setLenis(null);
    };
  }, []);

  // Occasional lightning over the skyline (off for reduced motion).
  useEffect(() => {
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      /* ignore */
    }
    if (reduce || booting || game) return undefined;
    return startLightning();
  }, [booting, game]);

  // Freeze scrolling behind the boot intro.
  useEffect(() => {
    if (!lenisRef) return;
    if (booting || game) lenisRef.stop();
    else lenisRef.start();
  }, [booting, game]);

  const finishBoot = () => {
    try {
      sessionStorage.setItem("booted", "1");
    } catch {
      /* ignore */
    }
    setBooting(false);
  };

  return (
    <MotionConfig reducedMotion="user">
      {!game && <DhakaBackdrop />}
      {!game && <MatrixRain />}
      {!game && <Flashlight />}
      <Cursor />
      <Konami />
      <div aria-hidden="true" className="crt" />

      <AnimatePresence>{booting && <BootScreen key="boot" onDone={finishBoot} />}</AnimatePresence>

      {game && !booting && <FarmGame items={navItems} />}

      {!game && (
      <div inert={booting ? "" : undefined} className="relative z-10">
        <ScrollHud />
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-accent focus:px-5 focus:py-3 focus:text-onaccent"
        >
          {ui.skip}
        </a>
        <Navbar items={navItems} />
        <main>
          <Hero active={!booting} />
          <Marquee />
          <About />
          {has("skills") && <Skills />}
          {has("services") && <Services />}
          {has("projects") && <Projects />}
          {has("github") && <GithubFeed />}
          <TerminalSection />
          {has("experience") && <Experience />}
          {has("faq") && <Faq />}
          <Contact />
        </main>
        <Footer />
      </div>
      )}
    </MotionConfig>
  );
}
