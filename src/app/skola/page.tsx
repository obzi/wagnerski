import Image from "next/image";
import { SubpageHero } from "@/components/ui/SubpageHero";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lyžařská škola Sherpa | Wagner Ski Akademie",
  description:
    "Sherpa Ski School - výuka lyžování, snowboardu a telemarku v Jeseníkách. Individuální i skupinové lekce pro děti i dospělé. Pouze akreditovaní instruktoři MŠMT.",
};

const disciplines = [
  {
    title: "Lyžování",
    description:
      "Od prvních oblouků až po dynamický carving. Individuální přístup, moderní metodika a důraz na správnou techniku od začátku.",
    tags: ["Začátečníci", "Pokročilí", "Carving", "Děti"],
  },
  {
    title: "Snowboard",
    description:
      "Výuka snowboardu pro všechny úrovně. Bezpečný postup od základů po freestyle a freeride. Správné návyky od první hodiny.",
    tags: ["Začátečníci", "Pokročilí", "Freestyle"],
  },
  {
    title: "Telemark",
    description:
      "Klasický styl lyžování s volnou patou. Elegantní technika, která vás odliší na svahu. Pro ty, kteří hledají něco navíc.",
    tags: ["Všechny úrovně", "Speciální disciplína"],
  },
];

const features = [
  {
    title: "Pouze MŠMT instruktoři",
    text: "Žádní pomocníci ani brigádníci. Každý náš instruktor má platnou licenci MŠMT ČR a minimálně 5 let praxe.",
  },
  {
    title: "Individuální přístup",
    text: "Přizpůsobujeme tempo a metodu každému žákovi. Malé skupiny, maximálně 6 osob na instruktora.",
  },
  {
    title: "Moderní metodika",
    text: "Využíváme aktuální trendy ve výuce — video analýza, postupné budování dovedností, důraz na bezpečnost.",
  },
  {
    title: "Výuka pro děti od 3 let",
    text: "Speciální dětský program s hravým přístupem. Trpěliví instruktoři se zkušenostmi s nejmenšími lyžaři.",
  },
  {
    title: "26 let zkušeností",
    text: "Sherpa Ski School funguje od roku 1999. Přes 2 200 vyškolených instruktorů a tisíce spokojených žáků.",
  },
  {
    title: "Kompletní vybavení",
    text: "Možnost zapůjčení kvalitního lyžařského a snowboardového vybavení přímo na místě.",
  },
];

export default function SkolaPage() {
  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow="Sherpa Ski School"
        title="Lyžařská a snowboardová škola"
        description="Výuka lyžování, snowboardu a telemarku v Jeseníkách. Pouze akreditovaní instruktoři."
        imageSrc="https://images.unsplash.com/photo-1565992441121-4367c2967103?w=1600&q=85&fit=crop"
        imageAlt="Lyžařská škola Sherpa - výuka lyžování"
      />

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              O škole
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              Učíme lyžovat od roku 1999
            </h2>
            <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
              <p>
                Sherpa Ski School je lyžařská a snowboardová škola s více než 26letou tradicí.
                Sídlíme na Karlově pod Pradědem v Jeseníkách — jednom z nejspolehlivějších
                lyžařských středisek v ČR.
              </p>
              <p>
                Specializujeme se na individuální výuku s důrazem na správnou techniku.
                Naši instruktoři jsou výhradně držitelé licence MŠMT ČR — žádní pomocníci
                ani brigádníci. Za dobu existence jsme vyškolili přes 2 200 instruktorů
                a naučili lyžovat tisíce dětí i dospělých.
              </p>
            </div>
            <Link
              href="/rezervace"
              className="inline-block mt-8 bg-ink text-cream text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Rezervovat hodinu
            </Link>
          </div>
          <div className="relative aspect-[4/3] rounded-[3px] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=600&q=80&fit=crop"
              fill
              alt="Výuka lyžování dětí"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              draggable={false}
            />
          </div>
        </div>
      </section>

      {/* Disciplines */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Discipliny
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {disciplines.map((d) => (
              <div key={d.title} className="border border-line rounded-[3px] p-6 bg-cream">
                <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-3">
                  {d.title}
                </h3>
                <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
                  {d.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {d.tags.map((t) => (
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
            Proč Sherpa
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            Připraveni na svah?
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            Rezervujte si hodinu s jedním z našich instruktorů. Individuální výuka i skupinové lekce.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/rezervace"
              className="min-h-[44px] flex items-center bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Rezervovat hodinu
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
