import texts from "@/data/texts.json";

export function LocationGrid() {
  return (
    <div className="flex flex-wrap gap-5">
      {texts.locationGrid.items.map((item) => (
        <div
          key={item.title}
          className="inline-flex items-start gap-2.5 border border-line rounded-[3px] px-6 py-5"
        >
          <span className="w-[8px] h-[8px] rounded-full bg-green-500 shrink-0 mt-1.5 shadow-[0_0_0_3px_rgba(34,197,94,0.18)]" />
          <div>
            <span className="block text-[13px] text-ink tracking-[-0.01em]">{item.title}</span>
            {item.lines.map((line) => (
              <span key={line} className="block text-[11px] text-ink-muted mt-0.5">
                {line}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
