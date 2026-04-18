"use client";

import { useState, useEffect } from "react";
import type { InstructorCourse } from "@/lib/supabase";

interface CourseSignupFormProps {
  courses: InstructorCourse[];
  preselectedCourseId?: string;
}

export function CourseSignupForm({ courses, preselectedCourseId }: CourseSignupFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(preselectedCourseId ?? "");
  useEffect(() => {
    if (preselectedCourseId) setSelectedCourse(preselectedCourseId);
  }, [preselectedCourseId]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !selectedCourse) {
      setError("Vyplňte prosím všechna pole.");
      return;
    }

    setLoading(true);
    setError("");

    const course = courses.find((c) => c.id === selectedCourse);

    try {
      const res = await fetch("/api/course-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          courseLevel: course?.level ?? selectedCourse,
          courseDate: course?.date ?? "",
        }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSuccess(true);
    } catch {
      setError("Něco se pokazilo. Zkuste to prosím znovu.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="border border-line rounded-[3px] p-8 bg-surface text-center">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-accent mb-4">
          Přihláška odeslána
        </span>
        <h3 className="text-[20px] font-normal tracking-[-0.01em] mb-2">
          Děkujeme!
        </h3>
        <p className="text-[13px] text-ink-secondary leading-[1.6]">
          Vaše přihláška byla odeslána. Ozveme se vám s dalšími informacemi.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="border border-line rounded-[3px] p-8 bg-surface">
      <h3 className="text-[18px] font-normal tracking-[-0.01em] mb-6">
        Přihláška na kurz
      </h3>
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Kurz
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
          >
            <option value="">Vyberte kurz...</option>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.level} — {c.date} ({c.location})
              </option>
            ))}
          </select>
        </div>
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
        <div>
          <label className="block text-[11px] uppercase tracking-[0.1em] text-ink-muted mb-1">
            Telefon
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border border-line rounded-[2px] px-4 py-3 text-[14px] bg-cream focus:outline-none focus:border-accent"
            placeholder="+420 123 456 789"
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
        {loading ? "Odesílám..." : "Odeslat přihlášku"}
      </button>
    </form>
  );
}
