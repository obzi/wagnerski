export function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block text-[9px] uppercase tracking-[0.12em] text-ink-muted border border-line rounded-[2px] px-2.5 py-1">
      {children}
    </span>
  );
}
