import Image from "next/image";

interface TeamCardProps {
  name: string;
  roles: string;
  badges: string[];
  imageSrc: string;
}

export function TeamCard({ name, roles, badges, imageSrc }: TeamCardProps) {
  return (
    <div className="border border-line rounded-[3px] overflow-hidden">
      <div className="relative h-[160px]">
        <Image
          src={imageSrc}
          fill
          alt={name}
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 33vw"
          draggable={false}
        />
      </div>
      <div className="p-5">
        <h3 className="text-[14px] font-normal tracking-[-0.01em] mb-1.5">{name}</h3>
        <p className="text-[11px] text-ink-secondary leading-[1.6] mb-3">{roles}</p>
        <div className="flex flex-wrap gap-2">
          {badges.map((b) => (
            <span
              key={b}
              className="text-[9px] uppercase tracking-[0.1em] text-ink-muted bg-surface px-2 py-0.5 rounded-[2px]"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
