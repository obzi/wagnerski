"use client";

import { useState } from "react";
import type { ReservationPrice } from "@/lib/supabase";

interface VoucherPurchaseProps {
  prices: ReservationPrice[];
  discountPercent: number;
}

type Step = "select" | "form" | "success";

export function VoucherPurchase({ prices, discountPercent }: VoucherPurchaseProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedPrice, setSelectedPrice] = useState<ReservationPrice | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [voucherCode, setVoucherCode] = useState("");
  const [error, setError] = useState("");

  const discount = discountPercent / 100;

  const getDiscountedPrice = (priceStr: string) => {
    const num = parseInt(priceStr.replace(/\D/g, ""), 10);
    return Math.round(num * (1 - discount));
  };

  const handleSelect = (price: ReservationPrice) => {
    setSelectedPrice(price);
    setStep("form");
    setError("");
  };

  const handlePurchase = async () => {
    if (!selectedPrice || !name.trim() || !email.trim()) {
      setError("Vyplňte prosím všechna pole.");
      return;
    }

    setLoading(true);
    setError("");

    const originalPrice = parseInt(selectedPrice.price.replace(/\D/g, ""), 10);
    const discountedPrice = getDiscountedPrice(selectedPrice.price);
    const durationMinutes = parseInt(selectedPrice.duration?.replace(/\D/g, "") || "50", 10);

    try {
      const purchaseRes = await fetch("/api/voucher/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceLabel: `${selectedPrice.label} (${selectedPrice.duration})`,
          durationMinutes,
          originalPrice,
          discountedPrice,
          buyerName: name,
          buyerEmail: email,
        }),
      });

      const { voucher, error: purchaseError } = await purchaseRes.json();
      if (purchaseError || !voucher) throw new Error(purchaseError);

      await fetch("/api/voucher/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: voucher.code,
          serviceLabel: voucher.service_label,
          discountedPrice: voucher.discounted_price,
          buyerName: voucher.buyer_name,
          buyerEmail: voucher.buyer_email,
          validFrom: voucher.valid_from,
          validUntil: voucher.valid_until,
        }),
      });

      setVoucherCode(voucher.code);
      setStep("success");
    } catch {
      setError("Něco se pokazilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPdf = () => {
    if (!selectedPrice || !voucherCode) return;
    const discountedPrice = getDiscountedPrice(selectedPrice.price);
    const now = new Date().toISOString();
    const validUntil = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();
    const params = new URLSearchParams({
      code: voucherCode,
      serviceLabel: `${selectedPrice.label} (${selectedPrice.duration})`,
      discountedPrice: String(discountedPrice),
      buyerName: name,
      validFrom: now,
      validUntil,
    });
    window.open(`/api/voucher/pdf?${params}`, "_blank");
  };

  if (step === "success") {
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
          Voucher zakoupen
        </span>
        <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-2">
          Děkujeme!
        </h2>
        <p className="text-[13px] text-ink-secondary leading-[1.6] mb-4">
          Váš voucher byl vytvořen a odeslán na <strong>{email}</strong>.
        </p>
        <div className="bg-ink text-cream py-3 px-6 inline-block rounded-[2px] mb-4">
          <span className="text-[10px] uppercase tracking-[0.14em] block mb-1 text-white/50">Kód</span>
          <span className="text-[20px] tracking-[0.1em] font-mono">{voucherCode}</span>
        </div>
        <p className="text-[11px] text-ink-muted mb-4">
          Platný Po–Pá, 11:00–14:00 · 14 dní od nákupu
        </p>
        <button
          onClick={handleDownloadPdf}
          className="min-h-[44px] bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] hover:opacity-90 transition-opacity"
        >
          Stáhnout PDF
        </button>
      </div>
    );
  }

  if (step === "form" && selectedPrice) {
    const discountedPrice = getDiscountedPrice(selectedPrice.price);
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface">
        <button
          onClick={() => setStep("select")}
          className="text-[11px] text-ink-muted hover:text-ink transition-colors mb-4"
        >
          ← Zpět na výběr
        </button>
        <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-1">
          {selectedPrice.label}
        </h2>
        <p className="text-[13px] text-ink-secondary mb-1">
          {selectedPrice.duration}
        </p>
        <div className="flex items-baseline gap-3 mb-6">
          <span className="text-[11px] text-ink-muted line-through">{selectedPrice.price}</span>
          <span className="text-[18px] font-medium text-accent">{discountedPrice.toLocaleString("cs-CZ")} Kč</span>
          <span className="text-[10px] uppercase tracking-[0.1em] text-accent">−{discountPercent} %</span>
        </div>
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
              Jméno a příjmení
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
              placeholder="Jan Novák"
            />
          </div>
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
              placeholder="jan@email.cz"
            />
          </div>
        </div>
        <p className="text-[11px] text-ink-muted mb-4">
          Platný Po–Pá, 11:00–14:00 · 14 dní od nákupu
        </p>
        {error && (
          <p className="text-[12px] text-red-600 mb-4">{error}</p>
        )}
        <button
          onClick={handlePurchase}
          disabled={loading}
          className="min-h-[44px] w-full bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? "Zpracovávám..." : "Zakoupit voucher"}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-[20px] font-normal tracking-[-0.01em] mb-2">
        Zvýhodněné vouchery
      </h2>
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-[13px] text-accent font-medium">−{discountPercent} % sleva</span>
        <span className="text-[11px] text-ink-muted">· Po–Pá, 11:00–14:00</span>
      </div>
      <div className="space-y-3">
        {prices.map((p) => {
          const discounted = getDiscountedPrice(p.price);
          return (
            <button
              key={p.id}
              onClick={() => handleSelect(p)}
              className="w-full border border-line rounded-[3px] p-4 bg-cream hover:border-accent transition-colors text-left flex items-center justify-between gap-4"
            >
              <div>
                <span className="block text-[13px]">{p.label}</span>
                <span className="block text-[11px] text-ink-muted">{p.duration}</span>
              </div>
              <div className="text-right">
                <span className="block text-[11px] text-ink-muted line-through">{p.price}</span>
                <span className="block text-[15px] font-medium text-accent">
                  {discounted.toLocaleString("cs-CZ")} Kč
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
