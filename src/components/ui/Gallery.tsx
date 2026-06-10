"use client";

import { useState, useRef, useCallback } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  eyebrow?: string;
}

function encodeImagePath(src: string): string {
  return src
    .split("/")
    .map((segment) => encodeURIComponent(segment).replace(/%2F/g, "/"))
    .join("/");
}

export function Gallery({ images, eyebrow = "Galerie" }: GalleryProps) {
  const [current, setCurrent] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % images.length);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  if (images.length === 0) return null;

  return (
    <section className="py-16 px-7 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
          {eyebrow}
        </span>

        <div className="relative select-none">
          {/* Slides */}
          <div
            className="relative overflow-hidden rounded-[3px] bg-cream"
            style={{ aspectRatio: "16/8" }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {images.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-500"
                style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={encodeImagePath(img.src)}
                  alt={img.alt}
                  draggable={false}
                  onContextMenu={(e) => e.preventDefault()}
                  className="w-full h-full object-cover pointer-events-none select-none"
                  style={{ WebkitUserDrag: "none" } as React.CSSProperties}
                />
              </div>
            ))}

            {/* Invisible overlay prevents right-click on images */}
            <div className="absolute inset-0 z-10" onContextMenu={(e) => e.preventDefault()} />

            {/* Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-colors text-[20px] leading-none"
                  aria-label="Předchozí"
                >
                  ‹
                </button>
                <button
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-black/40 hover:bg-black/65 text-white flex items-center justify-center transition-colors text-[20px] leading-none"
                  aria-label="Další"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* Dots */}
          {images.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? "w-4 h-1.5 bg-ink"
                      : "w-1.5 h-1.5 bg-ink/25 hover:bg-ink/50"
                  }`}
                  aria-label={`Snímek ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
