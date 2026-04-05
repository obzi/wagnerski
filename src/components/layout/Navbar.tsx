"use client";

import { useState } from "react";
import Link from "next/link";

const links = [
  { href: "/skola", label: "Škola" },
  { href: "/skicamp", label: "Skicamp" },
  { href: "/instruktor", label: "Instruktor" },
  { href: "/o-nas", label: "O nás" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-cream border-b border-line">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-7 py-3">
        <Link href="/" className="flex flex-col">
          <span className="text-[11px] uppercase tracking-[0.2em] text-ink font-normal">
            Wagner Ski
          </span>
          <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted">
            Akademie · Sherpa · Skicamp
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[11px] uppercase tracking-[0.14em] text-ink-secondary hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/rezervace"
            className="bg-ink text-cream text-[10px] uppercase tracking-[0.14em] px-5 py-[9px] rounded-[2px] hover:opacity-90 transition-opacity"
          >
            Rezervovat
          </Link>
        </div>

        <button
          className="md:hidden text-ink p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <svg width="20" height="14" viewBox="0 0 20 14" fill="none">
            {open ? (
              <>
                <line x1="2" y1="2" x2="18" y2="12" stroke="currentColor" strokeWidth="1.2" />
                <line x1="2" y1="12" x2="18" y2="2" stroke="currentColor" strokeWidth="1.2" />
              </>
            ) : (
              <>
                <line x1="0" y1="1" x2="20" y2="1" stroke="currentColor" strokeWidth="1.2" />
                <line x1="0" y1="7" x2="20" y2="7" stroke="currentColor" strokeWidth="1.2" />
                <line x1="0" y1="13" x2="20" y2="13" stroke="currentColor" strokeWidth="1.2" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-cream border-t border-line px-7 pb-6 pt-4">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-3 text-[12px] uppercase tracking-[0.14em] text-ink-secondary"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/rezervace"
            className="inline-block mt-3 bg-ink text-cream text-[10px] uppercase tracking-[0.14em] px-5 py-[9px] rounded-[2px]"
            onClick={() => setOpen(false)}
          >
            Rezervovat
          </Link>
        </div>
      )}
    </nav>
  );
}
