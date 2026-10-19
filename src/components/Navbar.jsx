import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import LangToggle from "./LangToggle.jsx";
import AccentToggle from "./AccentToggle.jsx";
import { useLang } from "../i18n.jsx";

export default function Navbar({ items }) {
  const { ui } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = ["home", ...items.map((i) => i.id)];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id) =>
    `rounded-lg px-3 py-2 font-mono text-sm transition ${
      active === id ? "text-accent" : "text-muted hover:text-ink"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-line py-3" : "py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-4" aria-label={ui.mainNav}>
        <Logo />

        <ul className="hidden items-center gap-1 lg:flex">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={linkClass(i.id)}
                aria-current={active === i.id ? "true" : undefined}
              >
                {active === i.id ? "> " : ""}
                {ui.nav[i.id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 sm:gap-3">
          <LangToggle />
          <AccentToggle />
          <a href="#contact" className="btn btn-primary hidden !min-h-[44px] !py-2 xl:inline-flex">
            {ui.contactMe}
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-lg border border-line lg:hidden"
            aria-label={open ? ui.closeMenu : ui.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="glass container-x mt-3 rounded-2xl border border-line p-4 lg:hidden"
          >
            <ul className="flex flex-col">
              {items.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={() => setOpen(false)}
                    className={`block min-h-[48px] rounded-lg px-4 py-3 font-mono text-lg ${
                      active === i.id ? "text-accent" : "text-ink"
                    }`}
                  >
                    <span className="text-accent">$ </span>
                    {ui.nav[i.id]}
                  </a>
                </li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-3 w-full">
              {ui.contactMe}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
