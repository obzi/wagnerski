const locations = [
  { name: "Karlov pod Pradědem", region: "Jeseníky · Skiaréna" },
];

export function LocationGrid() {
  return (
    <div className="inline-flex border border-line rounded-[3px]">
      {locations.map((loc) => (
        <div
          key={loc.name}
          className="px-6 py-5"
        >
          <div className="flex items-start gap-2.5">
            <span className="mt-1.5 w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
            <div>
              <span className="block text-[13px] text-ink tracking-[-0.01em]">{loc.name}</span>
              <span className="block text-[11px] text-ink-muted mt-0.5">{loc.region}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
