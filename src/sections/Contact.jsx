import { useState } from "react";
import { Mail, MessageCircle, Phone, Send } from "lucide-react";
import { contact } from "../data/content.js";
import { useLang } from "../i18n.jsx";
import Reveal from "../components/Reveal.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import SocialLinks from "../components/SocialLinks.jsx";
import Window from "../components/Window.jsx";

// Optional: a form service URL (for example Formspree). See README.
const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT;

const field =
  "min-h-[48px] w-full rounded-lg border border-line bg-ground/80 px-4 py-3 font-mono text-base text-ink placeholder:text-muted/70 focus:border-accent";

export default function Contact() {
  const { ui } = useLang();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error | mailto
  const hasEmail = Boolean(contact.email);
  const canSubmit = Boolean(ENDPOINT) || hasEmail;

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(data),
        });
        if (!res.ok) throw new Error("Request failed");
        form.reset();
        setStatus("sent");
      } catch {
        setStatus("error");
      }
      return;
    }

    // Fallback: open the visitor's email app with the message filled in.
    const subject = encodeURIComponent(ui.mailSubject(data.name));
    const body = encodeURIComponent(`${data.message}\n\n${data.name} (${data.email})`);
    window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24">
      <div className="container-x">
        <SectionHeading index="07" eyebrow={ui.nav.contact} title={ui.contactTitle} id="contact-title" />

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-muted">{ui.contactText}</p>
            <ul className="flex flex-col gap-4 font-mono text-sm sm:text-base">
              {contact.email && (
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="inline-flex min-h-[44px] items-center gap-3 break-all hover:text-accent"
                  >
                    <Mail size={20} className="shrink-0 text-accent" aria-hidden="true" /> {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a
                    href={`tel:${contact.phone}`}
                    className="inline-flex min-h-[44px] items-center gap-3 hover:text-accent"
                  >
                    <Phone size={20} className="text-accent" aria-hidden="true" /> {contact.phone}
                  </a>
                </li>
              )}
              {contact.whatsapp && (
                <li>
                  <a
                    href={`https://wa.me/${contact.whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center gap-3 hover:text-accent"
                  >
                    <MessageCircle size={20} className="text-accent" aria-hidden="true" /> {ui.whatsapp}
                  </a>
                </li>
              )}
            </ul>
            <SocialLinks />
          </Reveal>

          <Reveal delay={0.1}>
            <Window title="~/contact.sh">
              <form onSubmit={onSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
                {!canSubmit && (
                  <p role="status" className="rounded-lg border border-line bg-surface2 p-4 text-sm text-muted">
                    {ui.notConnected}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  <label htmlFor="c-name" className="font-mono text-sm text-muted">
                    <span className="text-accent">&gt;</span> {ui.nameLabel}
                  </label>
                  <input id="c-name" name="name" type="text" required autoComplete="name" placeholder={ui.namePh} className={field} disabled={!canSubmit} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-email" className="font-mono text-sm text-muted">
                    <span className="text-accent">&gt;</span> {ui.emailLabel}
                  </label>
                  <input id="c-email" name="email" type="email" required autoComplete="email" placeholder={ui.emailPh} className={field} disabled={!canSubmit} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="c-message" className="font-mono text-sm text-muted">
                    <span className="text-accent">&gt;</span> {ui.messageLabel}
                  </label>
                  <textarea id="c-message" name="message" required rows={5} placeholder={ui.messagePh} className={`${field} resize-y`} disabled={!canSubmit} />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0 disabled:hover:shadow-none"
                  disabled={!canSubmit || status === "sending"}
                >
                  {status === "sending" ? ui.sending : ui.send} <Send size={18} aria-hidden="true" />
                </button>

                <div aria-live="polite" className="min-h-[1.5rem] text-sm">
                  {status === "sent" && <p className="text-accent">{ui.sent}</p>}
                  {status === "error" && (
                    <p className="text-red-400">{hasEmail ? ui.errorWithEmail : ui.errorNoEmail}</p>
                  )}
                  {status === "mailto" && <p className="text-muted">{ui.mailtoNote}</p>}
                </div>
              </form>
            </Window>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
