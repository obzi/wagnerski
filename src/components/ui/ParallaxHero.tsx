"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import { ProtectedImage } from "./ProtectedImage";
import Link from "next/link";

export function ParallaxHero() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollY, [0, 700], [0, 200]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[480px] overflow-hidden">
      <motion.div
        style={prefersReducedMotion ? {} : { y }}
        className="absolute inset-0 scale-110"
      >
        <ProtectedImage
          src="https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1600&q=85&fit=crop"
          fill
          alt="Lyžař v horách"
          className="object-cover object-[center_35%]"
          priority
          sizes="100vw"
        />
      </motion.div>

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(165deg, rgba(8,10,6,0.85) 0%, rgba(8,10,6,0.50) 55%, rgba(8,10,6,0.15) 100%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-[200px]"
        style={{
          background: "linear-gradient(to top, rgba(8,10,6,0.75), transparent)",
        }}
      />

      <div className="relative z-10 h-full flex flex-col justify-end px-7 sm:px-9 pb-6 sm:pb-[48px] pt-[60px] max-w-[1280px] mx-auto">
        <span className="text-[10px] uppercase tracking-[0.16em] text-white/70 mb-5 drop-shadow-md">
          Lyžařská akademie · Morava · od roku 2005
        </span>

        <h1 className="text-[30px] sm:text-[56px] font-normal tracking-[-0.03em] leading-[1.08] text-white mb-4 sm:mb-5 drop-shadow-lg">
          Lyžovat se
          <br />
          naučíš.
          <br />
          <span className="text-white/80 italic">Pořádně.</span>
        </h1>

        <p className="text-[13px] sm:text-[14px] text-white/80 leading-[1.65] max-w-md mb-5 sm:mb-8 drop-shadow-md">
          Sherpa Ski School, Skicamp Alpy, kurzy MŠMT.
          <br />
          Jen akreditovaní instruktoři — žádní pomocníci.
        </p>

        <div className="flex items-center gap-6">
          <Link
            href="/rezervace"
            className="bg-white text-ink text-[11px] uppercase tracking-[0.14em] px-6 py-[10px] rounded-[2px] hover:opacity-90 transition-opacity shadow-lg"
          >
            Rezervovat hodinu
          </Link>
          <Link
            href="/skicamp"
            className="text-[12px] text-white/80 hover:text-white transition-colors tracking-[0.06em] drop-shadow-md"
          >
            Skicamp Alpy →
          </Link>
        </div>
      </div>
    </section>
  );
}
