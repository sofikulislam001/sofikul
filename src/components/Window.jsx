// A terminal-style window frame used for cards.
export default function Window({ title, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-xl border border-line bg-surface/85 ${className}`}>
      <div className="flex items-center gap-2 border-b border-line bg-surface2/90 px-4 py-3">
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-red-400/70" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-amber-300/70" />
        <span aria-hidden="true" className="h-3 w-3 rounded-full bg-accent/70" />
        <span className="ml-3 truncate font-mono text-xs text-muted">{title}</span>
      </div>
      {children}
    </div>
  );
}
