"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import texts from "@/data/texts.json";

export function ParallaxHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 700], [0, 200]);

  return (
    <section ref={ref} className="relative h-[calc(100svh-52px)] min-h-[480px] overflow-hidden">
      <motion.div
        style={prefersReducedMotion ? {} : { y }}
        className="absolute inset-0 scale-[1.2]"
      >
        <Image
          src="/images/petroblouk.jpeg"
          fill
          alt={texts.home.hero.imageAlt}
          className="object-cover object-[40%_90%] sm:object-[100%_90%]"
          priority
          sizes="100vw"
          draggable={false}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-[rgb(8,10,6)]/40 via-[rgb(8,10,6)]/10 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-gradient-to-t from-[rgb(8,10,6)]/20 to-transparent" />

      <div className="relative z-10 h-full flex flex-col justify-end px-7 sm:px-9 pb-6 sm:pb-[48px] max-w-[1280px] mx-auto">
        <span className="text-[10px] uppercase tracking-[0.16em] text-ink/70 mb-5">
          {texts.home.hero.brandLine}
        </span>

        <h1 className="text-[30px] sm:text-[56px] font-normal tracking-[-0.03em] leading-[1.08] text-ink mb-4 sm:mb-5">
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

        <p className="text-[13px] sm:text-[14px] text-ink/70 leading-[1.65] max-w-md mb-5 sm:mb-8">
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
            className="text-[12px] text-ink/70 hover:text-ink transition-colors tracking-[0.06em] min-h-[44px] flex items-center"
          >
            {texts.home.hero.ctaSecondary}
          </Link>
        </div>
      </div>
    </section>
  );
}
