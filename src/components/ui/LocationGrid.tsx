import texts from "@/data/texts.json";

export function LocationGrid() {
  return (
    <div className="inline-flex items-center gap-2.5 border border-line rounded-[3px] px-6 py-5">
      <span className="w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
      <div>
        <span className="block text-[13px] text-ink tracking-[-0.01em]">{texts.locationGrid.name}</span>
        <span className="block text-[11px] text-ink-muted mt-0.5">{texts.locationGrid.region}</span>
      </div>
    </div>
  );
}
