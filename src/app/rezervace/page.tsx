import Link from "next/link";
import type { Metadata } from "next";
import { FacebookIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { VoucherPurchase } from "@/components/ui/VoucherPurchase";
import { SubpageHero } from "@/components/ui/SubpageHero";
import { getReservationPrices, getContacts, getVoucherDiscount, getVoucherWindowSettings, getVoucherEligibleIds } from "@/lib/data";
import texts from "@/data/texts.json";
import { IMAGES } from "@/config/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: texts.meta.rezervace.title,
  description: texts.meta.rezervace.description,
};

export default async function RezervacePage() {
  const [prices, contacts, voucherDiscount, voucherWindow, voucherEligibleIds] = await Promise.all([
    getReservationPrices(),
    getContacts(),
    getVoucherDiscount(),
    getVoucherWindowSettings(),
    getVoucherEligibleIds(),
  ]);

  const individualPrices = prices.filter((p) => p.category === "individual");
  const groupPrices = prices.filter((p) => p.category === "group");
  const specialPrices = prices.filter((p) => p.category === "special");

  const phones = contacts.filter((c) => c.type === "phone");
  const email = contacts.find((c) => c.type === "email");
  const address = contacts.find((c) => c.type === "address");
  const facebook = contacts.find((c) => c.type === "facebook");
  const instagram = contacts.find((c) => c.type === "instagram");
  const hours = contacts.find((c) => c.type === "hours");

  return (
    <>
      {/* Hero */}
      <SubpageHero
        eyebrow={texts.rezervace.header.eyebrow}
        title={texts.rezervace.header.title}
        description={texts.rezervace.header.description}
        imageSrc={IMAGES.jolcavyuka}
        imageAlt="Rezervace výuky lyžování"
        imagePositionClass="object-[center_30%]"
        logoSrc={IMAGES.loga.sherpa}
        logoAlt="Sherpa Ski School"
        logoWidth={140}
        logoHeight={98}
      />

      {/* Pricing */}
      <section className="py-16 px-7 bg-surface">
        <div className="max-w-[1280px] mx-auto">
          <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
            {texts.rezervace.pricing.eyebrow}
          </span>
          <p className="text-[12px] text-ink-muted mb-2">
            {texts.rezervace.pricing.note}
          </p>
          <p className="text-[12px] text-ink-muted mb-8">
            Pro objednání lyžařské školy volejte na:{" "}
            <a href="tel:+420604220100" className="font-medium hover:text-accent transition-colors">
              +420 604 220 100
            </a>
            . Platba probíhá v kanceláři školy 20 minut před výukou.
          </p>

          <div className="space-y-8">
            {/* Individual */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                {texts.rezervace.pricing.individualTitle}
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {individualPrices.map((p, i) => (
                  <div
                    key={p.id}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < individualPrices.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.label}{p.duration && ` (${p.duration})`}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className="text-[15px] font-medium shrink-0">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Group */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                {texts.rezervace.pricing.groupTitle}
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {groupPrices.map((p, i) => (
                  <div
                    key={p.id}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < groupPrices.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.label}{p.duration && ` (${p.duration})`}</span>
                      {p.note && <span className="block text-[11px] text-ink-muted mt-0.5">{p.note}</span>}
                    </div>
                    <span className="text-[15px] font-medium shrink-0">{p.price}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Special */}
            <div>
              <h3 className="text-[16px] font-medium tracking-[-0.01em] mb-4">
                {texts.rezervace.pricing.specialTitle}
              </h3>
              <div className="border border-line rounded-[3px] bg-cream overflow-hidden">
                {specialPrices.map((p, i) => (
                  <div
                    key={p.id}
                    className={`px-5 py-4 flex items-center justify-between gap-4 ${
                      i < specialPrices.length - 1 ? "border-b border-line" : ""
                    }`}
                  >
                    <div>
                      <span className="block text-[13px]">{p.label}{p.duration && ` (${p.duration})`}</span>
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

      {/* Contact + Voucher */}
      <section className="py-16 px-7">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contacts */}
          <div>
            <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-6">
              {texts.rezervace.contact.eyebrow}
            </span>
            <div className="space-y-5">
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">{texts.rezervace.contact.labels.phone}</span>
                {phones.length > 0 ? phones.map((p) => (
                  <div key={p.id} className="mb-2 last:mb-0">
                    {p.label && p.label !== "Telefon" && (
                      <span className="block text-[11px] text-ink-muted mb-0.5">{p.label}</span>
                    )}
                    <a href={p.url} className="text-[18px] font-medium hover:text-accent transition-colors block">
                      {p.value}
                    </a>
                  </div>
                )) : (
                  <a href="tel:+420604681100" className="text-[18px] font-medium hover:text-accent transition-colors">
                    +420 604 681 100
                  </a>
                )}
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">{texts.rezervace.contact.labels.email}</span>
                <a href={email?.url || "mailto:sherpaski@sherpaski.cz"} className="text-[16px] hover:text-accent transition-colors">
                  {email?.value || "sherpaski@sherpaski.cz"}
                </a>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">{texts.rezervace.contact.labels.address}</span>
                <p className="text-[14px] text-ink-secondary">
                  {address?.value || "Skiaréna Karlov pod Pradědem, 793 26 Karlov pod Pradědem"}
                </p>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-1">{texts.rezervace.contact.labels.hours}</span>
                <p className="text-[14px] text-ink-secondary">
                  {hours?.value || "9:00 – 16:00"}, {texts.rezervace.contact.hoursNote}
                </p>
              </div>
              <div>
                <span className="block text-[11px] text-ink-muted uppercase tracking-[0.1em] mb-3">{texts.rezervace.contact.labels.social}</span>
                <div className="flex items-center gap-4">
                  {facebook && (
                    <a href={facebook.url} className="min-h-[44px] flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                      <FacebookIcon size={20} />
                      <span className="text-[13px]">{facebook.value}</span>
                    </a>
                  )}
                  {instagram && (
                    <a href={instagram.url} className="min-h-[44px] flex items-center gap-2 text-ink-secondary hover:text-accent transition-colors" target="_blank" rel="noopener noreferrer">
                      <InstagramIcon size={20} />
                      <span className="text-[13px]">{instagram.value}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Voucher */}
          <div>
            <VoucherPurchase
              prices={
                voucherEligibleIds.length > 0
                  ? [...individualPrices, ...groupPrices].filter((p) => voucherEligibleIds.includes(p.id))
                  : [...individualPrices, ...groupPrices]
              }
              discountPercent={voucherDiscount}
              voucherWindow={voucherWindow}
            />
          </div>
        </div>
      </section>
    </>
  );
}
