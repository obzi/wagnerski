import { ServiceCard } from "../ui/ServiceCard";
import texts from "@/data/texts.json";
import { IMAGES } from "@/config/site";

const services = texts.home.services.items.map((s, i) => ({
  ...s,
  linkHref: ["/rezervace", "/skicamp", "/chcibytinstruktor/prihlaska"][i],
  imageSrc: [IMAGES.ucime, IMAGES.skicamptym, IMAGES.jolcakurz][i],
  imagePositionClass: ["", "object-[center_10%]", ""][i],
  reversed: i === 1,
}));

export function ServicesSection() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-10">
          {texts.home.services.eyebrow}
        </span>
        <div className="flex flex-col gap-[1px]">
          {services.map((s) => (
            <ServiceCard key={s.eyebrow} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
