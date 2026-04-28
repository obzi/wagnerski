"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import texts from "@/data/texts.json";

export function ParallaxQuote() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const prefersReducedMotion = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="relative h-[360px] overflow-hidden">
      <motion.div
        style={prefersReducedMotion ? {} : { y }}
        className="absolute inset-[-16%] scale-110"
      >
        <Image
          src="/images/petroblouk.jpeg"
          fill
          alt={texts.home.quote.imageAlt}
          className="object-cover"
          sizes="100vw"
          draggable={false}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[rgb(8,10,6)]/55" />

      <div className="relative z-10 h-full flex items-center px-7 sm:px-9 max-w-[1280px] mx-auto">
        <div>
          <p className="font-serif text-[20px] sm:text-[26px] text-white leading-[1.5] tracking-[-0.01em] max-w-2xl">
            {texts.home.quote.line1}
            <br />
            <span className="text-white/50 italic">{texts.home.quote.line2}</span>
            <br />
            {texts.home.quote.line3}
            <br />
            {texts.home.quote.line4}
          </p>
          <p className="mt-5 text-[11px] text-white/40 tracking-[0.06em]">
            {texts.home.quote.author}
          </p>
        </div>
      </div>
    </section>
  );
}
