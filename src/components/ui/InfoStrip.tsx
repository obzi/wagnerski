const items = [
  { label: "Sezóna", value: "Prosinec – Duben" },
  { label: "Lokalita", value: "Karlov pod Pradědem" },
  { label: "Instruktoři", value: "Výhradně MŠMT" },
  { label: "Telefon", value: "+420 604 681 100" },
];

export function InfoStrip() {
  return (
    <section className="bg-ink">
      <div className="max-w-[1280px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-px">
        {items.map((item) => (
          <div key={item.label} className="px-7 py-5">
            <span className="block text-[8px] uppercase tracking-[0.16em] text-white/40 mb-1.5">
              {item.label}
            </span>
            <span className="block text-[11px] text-white font-medium tracking-[0.02em]">
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
