import { useCallback, useState } from "react";
import { MotionConfig } from "framer-motion";
import { experience, projects, services, skills } from "./data/content.js";
import { useLang } from "./i18n.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Skills from "./sections/Skills.jsx";
import Services from "./sections/Services.jsx";
import Projects from "./sections/Projects.jsx";
import Experience from "./sections/Experience.jsx";
import Contact from "./sections/Contact.jsx";
import Footer from "./sections/Footer.jsx";

// Sections with no content are skipped automatically (and left out of the menu).
const navItems = [
  { id: "about", show: true },
  { id: "skills", show: skills.length > 0 },
  { id: "services", show: services.length > 0 },
  { id: "projects", show: projects.length > 0 },
  { id: "experience", show: experience.length > 0 },
  { id: "contact", show: true },
].filter((i) => i.show);

const has = (id) => navItems.some((i) => i.id === id);

export default function App() {
  const { ui } = useLang();
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage can be unavailable; the theme still switches for this visit */
    }
    setTheme(next);
  }, [theme]);

  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-5 focus:py-3 focus:text-onaccent"
      >
        {ui.skip}
      </a>
      <Navbar items={navItems} theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        {has("skills") && <Skills />}
        {has("services") && <Services />}
        {has("projects") && <Projects />}
        {has("experience") && <Experience />}
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
