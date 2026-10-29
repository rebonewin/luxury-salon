import Image from "next/image";
import type { ReactNode } from "react";
import SplitHeading from "@/components/ui/SplitHeading";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  chapter: string;
  label: string;
  lines: ReactNode[];
  description: string;
  image: ImageKey;
  imageAlt: string;
  imageClassName?: string;
  meta?: { label: string; value: string }[];
  children?: ReactNode;
  className?: string;
};

export default function PageHero({
  chapter,
  label,
  lines,
  description,
  image,
  imageAlt,
  imageClassName,
  meta,
  children,
  className,
}: PageHeroProps) {
  const asset = img(image);

  return (
    <section
      className={cn(
        "relative flex min-h-[76svh] items-end overflow-hidden bg-ink pb-12 pt-32 text-cream md:pb-14 md:pt-40",
        className,
      )}
    >
      <Image
        src={asset.src}
        alt={imageAlt}
        fill
        sizes="100vw"
        quality={82}
        preload
        placeholder="blur"
        blurDataURL={asset.blurDataURL}
        className={cn("object-cover opacity-80", imageClassName)}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/45" />

      <div className="shell relative w-full">
        <div className="max-w-4xl">
          <div className="flex items-center gap-4 text-gold-light">
            <span className="eyebrow">{chapter}</span>
            <span className="h-px w-10 bg-gold-light/50" />
            <span className="eyebrow text-cream/55">{label}</span>
          </div>

          <SplitHeading
            as="h1"
            trigger="mount"
            lines={lines}
            className="mt-6 font-display text-[clamp(2.9rem,6.6vw,6.6rem)] leading-[0.94] tracking-[-0.02em]"
          />

          <p className="mt-6 max-w-xl text-[0.95rem] leading-[1.85] text-cream/65">
            {description}
          </p>

          {children ? <div className="mt-8">{children}</div> : null}
        </div>

        {meta?.length ? (
          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-cream/15 pt-6 sm:flex sm:flex-wrap sm:gap-12">
            {meta.map((item) => (
              <div key={item.label}>
                <p className="eyebrow text-[0.55rem] text-cream/35">
                  {item.label}
                </p>
                <p className="mt-2 text-sm text-cream/75">{item.value}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
