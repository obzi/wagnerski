import { ServiceCard } from "../ui/ServiceCard";

const services = [
  {
    eyebrow: "Sherpa Ski School",
    title: "Lyžařská a snowboardová škola",
    description:
      "Výuka lyžování, SNB a telemarku v Jeseníkách a okolí Olomouce.\nIndividuální i skupinová výuka pro děti i dospělé.\nŽádní pomocníci — pouze instruktoři s licencí.",
    tags: ["Lyžování", "Snowboard", "Telemark", "Carving", "Děti"],
    linkHref: "/rezervace",
    linkLabel: "Rezervovat hodinu",
    imageSrc: "/images/tym.jpeg",
    imageAlt: "Lyžařská škola Sherpa",
    reversed: false,
  },
  {
    eyebrow: "Skicamp",
    title: "Zahraniční kempy v Alpách",
    description:
      "Pro ty, kdo chtějí skutečný posun. Ski, SNB, race a telemark\nv alpském terénu. Techniku vyladíme až na doraz.",
    tags: ["Ski camp", "SNB camp", "Race camp", "Alpy", "Pokročilí"],
    linkHref: "/skicamp",
    linkLabel: "Termíny akcí",
    imageSrc: "/images/skicamptym.jpeg",
    imageAlt: "Skicamp v Alpách",
    reversed: true,
  },
  {
    eyebrow: "Chci být instruktor",
    title: "Kurzy MŠMT ČR s celoživotní licencí",
    description:
      "Akreditované kurzy D, C a IVSI. Školíme sami, od základů.\nJeden z nejrespektovanějších kurzů v ČR — každá dobrá\nlyžařská škola vás zaměstná.",
    tags: ["Kurz D", "Kurz C", "IVSI", "Licence doživotně"],
    linkHref: "/instruktor/prihlaska",
    linkLabel: "Přihláška",
    imageSrc: "/images/hobluj.jpeg",
    imageAlt: "Instruktorské kurzy",
    reversed: false,
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 px-7">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-10">
          Co nabízíme
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
