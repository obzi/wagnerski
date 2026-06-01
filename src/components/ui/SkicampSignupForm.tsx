"use client";

import { useState } from "react";
import type { SkicampTerm } from "@/lib/supabase";
import texts from "@/data/texts.json";

interface SkicampSignupFormProps {
  terms: SkicampTerm[];
}

export function SkicampSignupForm({ terms }: SkicampSignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedTerm, setSelectedTerm] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const t = texts.skicampSignup;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError(t.errors.fillAll);
      return;
    }

    setLoading(true);
    setError("");

    const term = terms.find((t) => t.id === selectedTerm);

    try {
      const res = await fetch("/api/skicamp-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          campType: term ? `${term.camp_type} — ${term.date_from} – ${term.date_to}` : "Neuvedeno",
          campDate: term ? `${term.date_from} – ${term.date_to}` : "",
          note,
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess(true);
    } catch {
      setError(t.errors.generic);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
          {t.success.eyebrow}
        </span>
        <h3 className="text-[20px] font-normal tracking-[-0.01em] mb-2">
          {t.success.title}
        </h3>
        <p className="text-[13px] text-ink-secondary leading-[1.6]">
          {t.success.description}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line rounded-[3px] p-8 bg-surface">
      <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-6">
        {t.title}
      </h3>
      <div className="space-y-4 mb-6">
        {terms.length > 0 && (
          <div>
            <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
              {t.form.termLabel}
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            >
              <option value="">{t.form.termPlaceholder}</option>
              {terms.map((term) => (
                <option key={term.id} value={term.id}>
                  {term.camp_type} — {term.date_from} – {term.date_to} ({term.location})
                </option>
              ))}
            </select>
          </div>
        )}
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            {t.form.nameLabel}
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder={t.form.namePlaceholder}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            {t.form.emailLabel}
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder={t.form.emailPlaceholder}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            {t.form.phoneLabel}
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder={t.form.phonePlaceholder}
          />
        </div>
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            {t.form.noteLabel}
          </label>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={3}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent resize-none"
            placeholder={t.form.notePlaceholder}
          />
        </div>
      </div>
      {error && (
        <p className="text-[12px] text-red-600 mb-4">{error}</p>
      )}
      <button
        type="submit"
        disabled={loading}
        className="min-h-[44px] w-full bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-8 py-[12px] rounded-[2px] hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {loading ? t.form.submitting : t.form.submitButton}
      </button>
    </form>
  );
}
