const locations = [
  { name: "Karlov pod Pradědem", region: "Jeseníky · Skiaréna" },
  { name: "Hlubočky u Olomouce", region: "Střední Morava" },
  { name: "Skiareál Kouty", region: "Jeseníky" },
  { name: "Malá Morávka · Praděd", region: "Jeseníky" },
  { name: "Klínovec", region: "Krušné hory" },
  { name: "Olešnice u Brna", region: "Jihomoravský kraj" },
];

export function LocationGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-line rounded-[3px]">
      {locations.map((loc, i) => (
        <div
          key={loc.name}
          className={`px-6 py-5 ${
            i < locations.length - (locations.length % 3 || 3) ? "border-b border-line" : ""
          } ${(i + 1) % 3 !== 0 ? "lg:border-r lg:border-line" : ""} ${
            i % 2 === 0 ? "sm:border-r sm:border-line lg:border-r-0" : ""
          }`}
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
