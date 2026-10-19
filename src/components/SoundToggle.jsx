import { Volume2, VolumeX } from "lucide-react";
import { toggleSound, useSound } from "../audio.js";
import { useLang } from "../i18n.jsx";

export default function SoundToggle() {
  const { ui } = useLang();
  const on = useSound();
  const Icon = on ? Volume2 : VolumeX;
  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-pressed={on}
      aria-label={ui.soundLabel(on)}
      title={ui.soundLabel(on)}
      className={`flex h-11 w-11 items-center justify-center rounded-lg border transition hover:border-accent ${
        on ? "border-accent text-accent" : "border-line text-muted"
      }`}
    >
      <Icon size={20} aria-hidden="true" />
    </button>
  );
}
