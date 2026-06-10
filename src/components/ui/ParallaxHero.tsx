"use client";

import { useRef, useState, useEffect } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import texts from "@/data/texts.json";
import { IMAGES } from "@/config/site";

export function ParallaxHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 700], [0, 200]);
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    setIsMobile(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(!e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <section ref={ref} className="relative h-[calc(100svh-52px)] min-h-[480px] overflow-hidden">
      <motion.div
        style={prefersReducedMotion ? {} : { y }}
        className="absolute inset-0 scale-[1.2]"
      >
        <Image
          src={IMAGES.petroblouk}
          fill
          alt={texts.home.hero.imageAlt}
          className="object-cover"
          style={{
            objectPosition: isMobile ? "35% 50%" : "100% 75%",
            transform: isMobile ? "translateY(-15%)" : undefined,
          }}
          priority
          sizes="100vw"
          draggable={false}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(8,10,6)]/40 via-[rgb(8,10,6)]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[rgb(8,10,6)]/20 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-7 sm:px-9 pb-6 sm:pb-[48px] max-w-[1280px] mx-auto">
        {texts.home.hero.brandLine && (
          <span className="text-[10px] uppercase tracking-[0.16em] text-ink/70 mb-5">
            {texts.home.hero.brandLine}
          </span>
        )}

        <h1 className="text-[30px] sm:text-[56px] font-normal tracking-[-0.03em] leading-[1.08] text-white mb-4 sm:mb-5" style={{ textShadow: '0 0 40px rgba(0,0,0,0.75), 0 0 18px rgba(0,0,0,0.55), 0 2px 6px rgba(0,0,0,0.9)' }}>
          {texts.home.hero.titleLine1}
          {texts.home.hero.titleLine2 && (
            <>
              <br />
              {texts.home.hero.titleLine2}
            </>
          )}
          {texts.home.hero.titleAccent && (
            <>
              <br />
              <span className="text-ink/70 italic">{texts.home.hero.titleAccent}</span>
            </>
          )}
        </h1>

        <p className="text-[13px] sm:text-[14px] text-white leading-[1.65] max-w-md mb-5 sm:mb-8" style={{ textShadow: '0 0 20px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}>
          {texts.home.hero.subtitleLine1}
          {texts.home.hero.subtitleLine2 && (
            <>
              <br />
              {texts.home.hero.subtitleLine2}
            </>
          )}
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/rezervace"
            className="bg-ink text-cream text-[11px] uppercase tracking-[0.14em] px-6 py-3 rounded-[2px] hover:opacity-90 transition-opacity min-h-[44px] flex items-center"
          >
            {texts.home.hero.ctaPrimary}
          </Link>
          <Link
            href="/skicamp"
            className="text-[13px] text-white/90 hover:text-white transition-colors tracking-[0.06em] min-h-[44px] flex items-center underline underline-offset-4 decoration-white/40 hover:decoration-white/80"
            style={{ textShadow: '0 0 16px rgba(0,0,0,0.8), 0 1px 4px rgba(0,0,0,0.9)' }}
          >
            {texts.home.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
