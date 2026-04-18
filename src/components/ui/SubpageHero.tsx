import Image from "next/image";

interface SubpageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  imagePositionClass?: string;
  logoSrc?: string;
  logoAlt?: string;
  logoWidth?: number;
  logoHeight?: number;
}

export function SubpageHero({
  eyebrow,
  title,
  description,
  imageSrc,
  imageAlt,
  imagePositionClass = "object-center",
  logoSrc,
  logoAlt,
  logoWidth = 120,
  logoHeight = 48,
}: SubpageHeroProps) {
  return (
    <section className="relative h-[50vh] min-h-[360px] overflow-hidden">
      <Image
        src={imageSrc}
        fill
        alt={imageAlt}
        className={`object-cover ${imagePositionClass}`}
        priority
        sizes="100vw"
        draggable={false}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-[rgb(8,10,6)]/80 to-[rgb(8,10,6)]/30"
      />
      {logoSrc && (
        <div className="absolute top-6 left-7 sm:left-9 z-10">
          <Image
            src={logoSrc}
            width={logoWidth}
            height={logoHeight}
            alt={logoAlt || ""}
            className="brightness-0 invert opacity-70"
            draggable={false}
          />
        </div>
      )}
      <div className="relative z-10 h-full flex flex-col justify-end px-7 sm:px-9 pb-10 max-w-[1280px] mx-auto">
        <span className="text-[10px] uppercase tracking-[0.16em] text-white/70 mb-3">
          {eyebrow}
        </span>
        <h1 className="text-[32px] sm:text-[48px] font-normal tracking-[-0.03em] leading-[1.1] text-white mb-3">
          {title}
        </h1>
        {description && (
          <p className="text-[14px] text-white/70 max-w-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
