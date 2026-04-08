import { SubpageHero } from "@/components/ui/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getSkicampTerms } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Skicamp Alpy | WAGNER Ski and SNB akademie",
  description:
    "Zahraniční lyžařské a snowboardové kempy v Alpách. Ski, SNB, race a telemark v alpském terénu pro pokročilé lyžaře.",
};

const camps = [
  {
    title: "Ski Camp",
    description:
      "Intenzivní lyžařský kemp v alpském středisku. Technická příprava, carving, jízda v terénu. Pro pokročilé lyžaře, kteří chtějí posun na další úroveň.",
    tags: ["Pokročilí", "Carving", "Technika", "Alpy"],
  },
  {
    title: "SNB Camp",
    description:
      "Snowboardový kemp zaměřený na freestyle, freeride a techniku jízdy. Alpský terén nabízí podmínky, které v ČR nenajdete.",
    tags: ["Snowboard", "Freestyle", "Freeride", "Alpy"],
  },
  {
    title: "Race Camp",
    description:
      "Závodní příprava v alpském terénu. Slalom, obří slalom, super-G. Trénink s profesionálními trenéry a video analýzou.",
    tags: ["Závodní příprava", "Slalom", "GS", "Video analýza"],
  },
  {
    title: "Telemark Camp",
    description:
      "Telemarkový kemp pro všechny úrovně. Klasická technika volné paty v podmínkách, kde telemark vznikl — v alpském terénu.",
    tags: ["Telemark", "Všechny úrovně", "Alpy"],
  },
];

const features = [
  {
    title: "Alpský terén",
    text: "Střediska s nadmořskou výškou přes 2 500 m. Garantovaný sníh, dlouhé sjezdovky a podmínky, které ČR nenabízí.",
  },
  {
    title: "Profesionální vedení",
    text: "Kempy vedou výhradně instruktoři s licencí MŠMT a mezinárodními certifikacemi. Malé skupiny, individuální přístup.",
  },
  {
    title: "Video analýza",
    text: "Každý den video rozbor techniky. Vidíte svůj pokrok a přesně víte, na čem pracovat.",
  },
  {
    title: "Kompletní servis",
    text: "Doprava, ubytování, skipasy, pojištění. Stačí přijet a soustředit se na lyžování.",
  },
];

export default async function SkicampPage() {
  const terms = await getSkicampTerms();
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow="Skicamp Alpy"
        title="Zahraniční kempy v Alpách"
        description="Pro ty, kdo chtějí skutečný posun. Techniku vyladíme až na doraz."
        imageSrc="/images/asikaprun.jpg"
        imagePosition="center 75%"
        imageAlt="Skicamp v Alpách"
      />

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              O kempech
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              Kde se opravdu posunete
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              <p>
                Skicamp Alpy je pro ty, kteří chtějí víc než domácí kopce.
                Organizujeme lyžařské, snowboardové, závodní i telemarkové kempy
                v alpských střediscích s garantovaným sněhem a kilometry sjezdovek.
              </p>
              <p>
                Každý kemp vede tým zkušených instruktorů s licencí MŠMT
                a mezinárodními certifikacemi. Skupiny jsou malé, přístup individuální.
                Denní video rozbor techniky je samozřejmostí.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="/images/skicampnakaprunu.jpg"
              fill
              alt="Alpské hory"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Camp types */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Typy kempů
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {camps.map((c) => (
              <div key={c.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-3">
                  {c.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Proč jet s námi
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((f) => (
              <div key={f.title} className="border-l-2 border-accent pl-5 py-1">
                <h3 className="text-[14px] font-medium tracking-[-0.01em] mb-2">
                  {f.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  {f.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Termíny */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          {terms.length > 0 ? (
            <>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-8">
                Termíny kempů
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 text-left">
                {terms.map((t) => (
                  <div key={t.id} className="border border-white/20 rounded-[3px] p-5">
                    <span className="block text-[10px] uppercase tracking-[0.14em] text-white/50 mb-1">
                      {t.camp_type}
                    </span>
                    <span className="block text-[16px] font-medium mb-2">
                      {t.date_from} – {t.date_to}
                    </span>
                    <span className="block text-[13px] text-white/60 mb-1">{t.location}</span>
                    {t.price > 0 && (
                      <span className="block text-[14px] font-medium text-accent">
                        {t.price.toLocaleString("cs-CZ")} Kč
                      </span>
                    )}
                    {t.spots > 0 && (
                      <span className="block text-[11px] text-white/40 mt-1">
                        Volných míst: {t.spots}
                      </span>
                    )}
                    {t.note && (
                      <span className="block text-[11px] text-white/40 mt-1">{t.note}</span>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
                Termíny připravujeme
              </h2>
              <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
                Sledujte naše stránky a sociální sítě. Termíny kempů na další sezónu zveřejníme brzy.
              </p>
            </>
          )}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rezervace"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Kontaktujte nás
            </Link>
            <a
              href="tel:+420604681100"
              className="min-h-[44px] flex items-center text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              +420 604 681 100
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
