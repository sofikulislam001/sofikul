import { ArrowUp } from "lucide-react";
import { profile } from "../data/content.js";
import SocialLinks from "../components/SocialLinks.jsx";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <p className="text-sm text-muted">
          &copy; {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <SocialLinks />
        <a
          href="#home"
          className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium hover:text-accent"
        >
          Back to top <ArrowUp size={16} aria-hidden="true" />
        </a>
      </div>
    </footer>
  );
}
