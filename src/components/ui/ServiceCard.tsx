import Link from "next/link";
import Image from "next/image";
import { Tag } from "./Tag";

interface ServiceCardProps {
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  linkHref: string;
  linkLabel: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
}

export function ServiceCard({
  eyebrow,
  title,
  description,
  tags,
  linkHref,
  linkLabel,
  imageSrc,
  imageAlt,
  reversed,
}: ServiceCardProps) {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-[5fr_4fr] gap-0`}
    >
      <div className={`bg-surface p-8 sm:p-10 flex flex-col justify-center ${reversed ? "md:order-2" : ""}`}>
        <span className="text-[9px] uppercase tracking-[0.16em] text-ink-muted mb-4">
          {eyebrow}
        </span>
        <h2 className="text-[24px] sm:text-[28px] font-normal tracking-[-0.02em] leading-[1.2] mb-4">
          {title}
        </h2>
        <p className="text-[13px] text-ink-secondary leading-[1.65] mb-5 whitespace-pre-line">
          {description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((t) => (
            <Tag key={t}>{t}</Tag>
          ))}
        </div>
        <Link
          href={linkHref}
          className="text-[11px] uppercase tracking-[0.14em] text-ink hover:text-ink-secondary transition-colors min-h-[44px] flex items-center"
        >
          {linkLabel} →
        </Link>
      </div>

      <div className={`relative aspect-[4/3] md:aspect-auto overflow-hidden group ${reversed ? "md:order-1" : ""}`}>
        <Image
          src={imageSrc}
          fill
          alt={imageAlt}
          className="object-cover transition-transform duration-[400ms] group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 44vw"
          draggable={false}
        />
      </div>
    </div>
  );
}
