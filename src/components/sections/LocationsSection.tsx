import { LocationGrid } from "../ui/LocationGrid";

export function LocationsSection() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-10">
          Kde nás najdete
        </span>
        <LocationGrid />
      </div>
    </section>
  );
}
