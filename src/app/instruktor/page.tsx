import { ProtectedImage } from "@/components/ui/ProtectedImage";
import { Tag } from "@/components/ui/Tag";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kurzy pro instruktory | Wagner Ski Akademie",
  description:
    "Akreditované kurzy MŠMT ČR pro instruktory lyžování a snowboardu. Kurz D (60 hod), Kurz C (70-100 hod), prolongace. Celoživotní licence.",
};

const courses = [
  {
    level: "Kurz D",
    subtitle: "Instruktor základního lyžování / snowboardu (IZL/IZS)",
    hours: "60 hodin",
    description:
      "Základní kurz pro budoucí instruktory. Akreditace MŠMT ČR č. 18064/2024-2. Po úspěšném absolvování získáte celoživotní licenci platnou v celé ČR.",
    tags: ["MŠMT akreditace", "60 hodin", "Celoživotní licence"],
    date: "16. – 21. prosince 2025",
    location: "Karlov pod Pradědem",
  },
  {
    level: "Kurz C",
    subtitle: "Instruktor lyžování / snowboardu (IZL/IZS) — vyšší kvalifikace",
    hours: "70–100 hodin",
    description:
      "Navazující kurz pro držitele licence D. Rozšíření kompetencí, prohloubení metodiky výuky a techniky. Vyšší kvalifikační stupeň.",
    tags: ["MŠMT akreditace", "70–100 hodin", "Navazující"],
    date: "5. – 10. ledna 2026",
    location: "Karlov pod Pradědem",
  },
  {
    level: "Prolongace",
    subtitle: "Prodloužení platnosti licence",
    hours: "3 dny",
    description:
      "Pro instruktory s expirující licencí. Aktualizace metodiky, nové trendy ve výuce, obnovení certifikace.",
    tags: ["Obnovení licence", "3 dny"],
    date: "19. – 21. prosince 2025",
    location: "Karlov pod Pradědem",
  },
];

const included = [
  "Ubytování v hotelovém komplexu s polopenzí",
  "Skipasy po celou dobu kurzu",
  "Výukové materiály a skripta",
  "Odborné přednášky (psychologie, horská služba, Freeride World Tour)",
  "Celoživotně platná certifikace v celé ČR",
  "Bonusový carvingový workshop",
  "Speciální tričko absolventa",
  "Možnost wellness v hotelu",
];

export default function InstruktorPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[360px] overflow-hidden mt-[52px]">
        <ProtectedImage
          src="https://images.unsplash.com/photo-1491555103944-7c647fd857e6?w=1600&q=85&fit=crop"
          fill
          alt="Instruktorský kurz lyžování"
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(8,10,6,0.8) 0%, rgba(8,10,6,0.3) 100%)",
          }}
        />
        <div className="relative z-10 h-full flex flex-col justify-end px-7 sm:px-9 pb-10 max-w-[1280px] mx-auto">
          <span className="text-[10px] uppercase tracking-[0.16em] text-white/70 mb-3">
            Chci byt instruktor
          </span>
          <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] text-white mb-3">
            Kurzy MŠMT s celoživotní licencí
          </h1>
          <p className="text-[14px] text-white/70 max-w-lg">
            Akreditované kurzy pro instruktory lyžování a snowboardu. Školíme sami, od základů.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto max-w-3xl">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
            O kurzech
          </span>
          <div className="space-y-4 text-[14px] text-ink-secondary leading-[1.7]">
            <p>
              Pořádáme jedny z nejrespektovanějších instruktorských kurzů v České republice.
              Za více než 26 let jsme vyškolili přes 2 229 instruktorů, kteří dnes učí
              v lyžařských školách po celé ČR i v zahraničí.
            </p>
            <p>
              Kurzy vedou zkušení školitelé v čele s Ing. Petrem Wagnerem — držitelem
              IVSI Card Gold, profesionálním instruktorem a trenérem. Důraz klademe
              na praxi, reálné situace a moderní metodiku výuky.
            </p>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Nabidka kurzu
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {courses.map((c) => (
              <div
                key={c.level}
                className="border border-line rounded-[3px] bg-cream p-6 flex flex-col"
              >
                <span className="text-[10px] uppercase tracking-[0.14em] text-accent font-medium mb-2">
                  {c.hours}
                </span>
                <h3 className="text-[20px] font-normal tracking-[-0.01em] mb-1">
                  {c.level}
                </h3>
                <p className="text-[12px] text-ink-muted mb-4">{c.subtitle}</p>
                <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4 flex-1">
                  {c.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {c.tags.map((t) => (
                    <Tag key={t}>{t}</Tag>
                  ))}
                </div>
                <div className="border-t border-line pt-4 mt-auto space-y-1.5">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-ink-muted">Termín</span>
                    <span className="font-medium">{c.date}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-ink-muted">Místo</span>
                    <span className="font-medium">{c.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Cenik
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-6">
              All-inclusive cena
            </h2>
            <div className="space-y-4">
              <div className="border border-line rounded-[3px] p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-[16px] font-medium">Premium balíček</h3>
                  <span className="text-[20px] font-normal text-accent">16 900 Kč</span>
                </div>
                <p className="text-[12px] text-ink-muted mb-3">
                  Při platbě do 10. 12. — jinak 22 900 Kč na místě
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  Zahrnuje ubytování, polopenzi, skipasy, materiály, přednášky
                  a celoživotní certifikaci.
                </p>
              </div>
              <div className="border border-line rounded-[3px] p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-[16px] font-medium">Bez ubytování</h3>
                  <span className="text-[20px] font-normal text-accent">7 200 Kč</span>
                </div>
                <p className="text-[12px] text-ink-muted mb-3">
                  Pro ty, kteří si zajistí ubytování sami
                </p>
                <p className="text-[13px] text-ink-secondary leading-[1.6]">
                  Plná výuka, materiály a certifikace. Plná refundace při
                  celosezónním zaměstnání.
                </p>
              </div>
            </div>
          </div>

          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Co je v cene
            </span>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[13px] text-ink-secondary">
                  <span className="mt-1.5 w-[6px] h-[6px] rounded-full bg-accent shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-7 bg-ink text-white">
        <div className="max-w-[1280px] mx-auto text-center">
          <h2 className="text-[28px] sm:text-[36px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
            Staň se instruktorem
          </h2>
          <p className="text-[14px] text-white/60 leading-[1.6] mb-8 max-w-md mx-auto">
            Přihlas se na kurz a získej celoživotní licenci. Každá dobrá lyžařská škola tě zaměstná.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/instruktor/prihlaska"
              className="bg-white text-ink text-[10px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Přihláška na kurz
            </Link>
            <a
              href="mailto:sherpaski@sherpaski.cz"
              className="text-[12px] text-white/60 hover:text-white/90 transition-colors"
            >
              sherpaski@sherpaski.cz
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
