import Image from "next/image";

interface GalleryImage {
  src: string;
  alt: string;
}

interface GalleryProps {
  images: GalleryImage[];
  eyebrow?: string;
}

export function Gallery({ images, eyebrow = "Galerie" }: GalleryProps) {
  if (images.length === 0) return null;
  return (
    <section className="py-16 px-7 bg-surface">
      <div className="max-w-[1280px] mx-auto">
        <span className="block text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-8">
          {eyebrow}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-[3px] overflow-hidden bg-cream">
              <Image
                src={img.src}
                fill
                alt={img.alt}
                className="object-cover hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 420px"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
