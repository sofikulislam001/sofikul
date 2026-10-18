import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function Navbar({ items, theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  // Style change after scrolling a little.
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

  // Close the mobile menu with Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = (id) =>
    `rounded-full px-4 py-2 text-[15px] font-medium transition ${
      active === id ? "text-accent" : "text-muted hover:text-ink"
    }`;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass border-b border-line py-3" : "py-5"
      }`}
    >
      <nav className="container-x flex items-center justify-between gap-4" aria-label="Main">
        <Logo />

        <ul className="hidden items-center gap-1 md:flex">
          {items.map((i) => (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                className={linkClass(i.id)}
                aria-current={active === i.id ? "true" : undefined}
              >
                {i.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a href="#contact" className="btn btn-primary hidden !min-h-[44px] !py-2 md:inline-flex">
            Contact me
          </a>
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
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
            className="glass container-x mt-3 rounded-3xl border border-line p-4 md:hidden"
          >
            <ul className="flex flex-col">
              {items.map((i) => (
                <li key={i.id}>
                  <a
                    href={`#${i.id}`}
                    onClick={() => setOpen(false)}
                    className={`block min-h-[48px] rounded-2xl px-4 py-3 text-lg font-medium ${
                      active === i.id ? "text-accent" : "text-ink"
                    }`}
                  >
                    {i.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="btn btn-primary mt-3 w-full"
            >
              Contact me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
