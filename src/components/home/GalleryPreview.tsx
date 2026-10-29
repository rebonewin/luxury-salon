import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { img } from "@/lib/images";
import { galleryItems } from "@/lib/site";

const previewItems = [
  galleryItems[0],
  galleryItems[5],
  galleryItems[6],
  galleryItems[8],
  galleryItems[7],
  galleryItems[9],
];

export default function GalleryPreview() {
  return (
    <section className="bg-cream-light py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            chapter="04"
            label="The Gallery"
            lines={[
              "A study in",
              <em key="light" className="italic text-gold-deep">
                light & detail.
              </em>,
            ]}
            description="Bridal moments, colour work and quiet rituals, photographed in the atelier. A small selection from our ever-growing book of work."
            className="max-w-2xl"
          />

          <Link
            href="/gallery"
            className="link-line shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
          >
            Explore all work
          </Link>
        </div>

        <div className="mt-12 columns-2 gap-3 md:columns-3 lg:gap-4">
          {previewItems.map((item, index) => {
            const asset = img(item.image);

            return (
              <Reveal
                key={item.image}
                delay={(index % 3) * 0.06}
                className="mb-3 break-inside-avoid lg:mb-4"
              >
                <Link
                  href="/gallery"
                  className="group relative block overflow-hidden bg-sand"
                  aria-label={`View ${item.title} in the gallery`}
                >
                  <Image
                    src={asset.src}
                    alt={item.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    quality={82}
                    placeholder="blur"
                    blurDataURL={asset.blurDataURL}
                    className="h-auto w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/5 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="eyebrow text-[0.52rem] text-gold-light">
                      {item.category}
                    </p>
                    <div className="mt-1.5 flex items-end justify-between gap-3">
                      <span className="font-display text-lg leading-tight text-cream md:text-xl">
                        {item.title}
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-3.5 shrink-0 text-cream/60 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-light"
                        strokeWidth={1.5}
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <div className="mt-10 flex justify-center">
            <Link
              href="/gallery"
              className="group inline-flex items-center gap-3 border border-ink/20 px-7 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-cream"
            >
              View the full gallery
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
