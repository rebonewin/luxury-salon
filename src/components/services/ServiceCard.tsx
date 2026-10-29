import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { img } from "@/lib/images";
import type { ServiceCategory } from "@/lib/site";

type ServiceCardProps = {
  category: ServiceCategory;
};

export default function ServiceCard({ category }: ServiceCardProps) {
  const asset = img(category.image);

  return (
    <Link
      href={`/services#${category.slug}`}
      className="group block"
      aria-label={`${category.name} services at Luxury Salon`}
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ink">
        <Image
          src={asset.src}
          alt={category.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          quality={82}
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.055]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-ink/10" />
        <div
          aria-hidden="true"
          className="absolute inset-0 ring-1 ring-inset ring-cream/15"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-cream/60 md:p-6">
          <span className="eyebrow">{category.number}</span>
          <span className="eyebrow text-[0.55rem]">
            {category.services.length} rituals
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="eyebrow text-gold-light">{category.eyebrow}</p>
          <div className="mt-2 flex items-end justify-between gap-4">
            <h3 className="font-display text-[2rem] leading-none text-cream md:text-[2.5rem]">
              {category.name}
            </h3>
            <span className="flex size-10 shrink-0 items-center justify-center border border-cream/30 text-cream transition-colors duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.4}
              />
            </span>
          </div>
        </div>

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-out group-hover:scale-x-100"
        />
      </div>

      <div className="mt-4 flex items-start justify-between gap-5 border-t border-ink/10 pt-4">
        <p className="text-[0.68rem] font-medium uppercase leading-relaxed tracking-[0.14em] text-stone">
          {category.services.map((service) => service.name).join(" · ")}
        </p>
        <span className="eyebrow shrink-0 text-[0.55rem] text-ink/40 transition-colors duration-300 group-hover:text-gold-deep">
          View
        </span>
      </div>
    </Link>
  );
}
