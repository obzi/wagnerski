import Link from "next/link";
import type { Metadata } from "next";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { individualPrices, specialPrices, groupPrices } from "@/data/pricing";

export const metadata: Metadata = {
  title: "Rezervace | WAGNER Ski and SNB akademie",
  description:
    "Rezervujte si hodinu lyžování nebo snowboardu. Ceník individuální a skupinové výuky. Kontakty na Sherpa Ski School.",
};

export default function RezervacePage() {
  return (
    <>
      {/* Header */}
      <section className="bg-ink text-white pt-[28px] pb-12 px-7">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[10px] uppercase tracking-[0.16em] text-white/50 mb-4">
            Rezervace
          </span>
          <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] mb-4">
            Rezervujte si hodinu
          </h1>
          <p className="text-[14px] text-white/60 max-w-lg leading-[1.6]">
            Zavolejte nám nebo napište. Domluvíme termín, instruktora i disciplínu přesně podle vašich potřeb.
          </p>
        </div>
      </section>

      {/* Contact + Voucher */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contacts */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Kontakt
            </span>
            <div className="space-y-5">
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">Telefon</span>
                <a href="tel:+420604681100" className="text-[18px] font-medium hover:text-accent transition-colors">
                  +420 604 681 100
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">E-mail</span>
                <a href="mailto:sherpaski@sherpaski.cz" className="text-[16px] hover:text-accent transition-colors">
                  sherpaski@sherpaski.cz
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">Adresa</span>
                <p className="text-[14px] text-ink-secondary">
                  Skiaréna Karlov pod Pradědem<br />
                  793 26 Karlov pod Pradědem
                </p>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-3">Sociální sítě</span>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/Sherpaski.cz"
                    className="min-h-[44px] flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon size={20} />
                    <span className="text-[13px]">Sherpaski.cz</span>
                  </a>
                  <a
                    href="https://www.instagram.com/terapielyzovanim/"
                    className="min-h-[44px] flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon size={20} />
                    <span className="text-[13px]">@terapielyzovanim</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Voucher */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              Online rezervace
            </span>
            <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
              <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-3">
                Koupit hodinu přes voucher
              </h2>
              <p className="text-[13px] text-ink-secondary leading-[1.6] mb-6">
                Zakupte si vouchery na výuku online. Ideální i jako dárek.
              </p>
              <button
                disabled
                className="min-h-[44px] bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] opacity-50 cursor-not-allowed"
              >
                Připravujeme
              </button>
              <p className="text-[11px] text-ink-muted mt-3">
                Online prodej voucherů bude brzy k dispozici.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            Ceník výuky
          </span>
          <p className="text-[12px] text-ink-muted mb-8">
            Skipas je zahrnut ve všech cenách. Jedna vyučovací hodina = 50 minut.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Individual */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                Individuální výuka (1–2 osoby)
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {individualPrices.map((p, i) => (
                  <div
                    key={p.service}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < individualPrices.length - 1 ? "border-b border-line" : ""
                    } ${p.highlight ? "bg-accent/5" : ""}`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.service}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className={`text-[15px] font-medium shrink-0 ${p.highlight ? "text-accent" : ""}`}>
                      {p.price}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                Skupinová výuka (3+ osob)
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden mb-8">
                {groupPrices.map((p) => (
                  <div key={p.service} className="px-5 py-4 flex items-center justify-between gap-4">
                    <div>
                      <span className="block text-[13px]">{p.service}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className="text-[15px] font-medium shrink-0">{p.price}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                Speciální programy
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {specialPrices.map((p, i) => (
                  <div
                    key={p.service}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < specialPrices.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.service}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className="text-[15px] font-medium shrink-0">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
