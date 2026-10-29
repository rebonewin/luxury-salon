"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Expand } from "lucide-react";
import Lightbox from "@/components/gallery/Lightbox";
import { img } from "@/lib/images";
import { galleryFilters, type GalleryItem } from "@/lib/site";
import { cn } from "@/lib/utils";

type GalleryFilter = (typeof galleryFilters)[number];

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryFilter>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () =>
      active === "All"
        ? items
        : items.filter((item) => item.category === active),
    [active, items],
  );

  const counts = useMemo(() => {
    const result: Record<string, number> = { All: items.length };
    for (const filter of galleryFilters) {
      if (filter === "All") continue;
      result[filter] = items.filter((item) => item.category === filter).length;
    }
    return result;
  }, [items]);

  return (
    <>
      <div className="sticky top-16 z-30 border-y border-ink/10 bg-cream-light/95 backdrop-blur-md">
        <div className="shell flex items-center justify-between gap-4">
          <div
            role="group"
            aria-label="Filter the gallery"
            className="no-scrollbar flex items-center gap-1 overflow-x-auto py-2"
          >
            {galleryFilters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => {
                  setActive(filter);
                  setLightboxIndex(null);
                }}
                aria-pressed={active === filter}
                className={cn(
                  "whitespace-nowrap px-4 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300",
                  active === filter
                    ? "bg-ink text-cream"
                    : "text-ink/50 hover:bg-ink/5 hover:text-ink",
                )}
              >
                {filter}
                <span
                  className={cn(
                    "ml-2 text-[0.48rem]",
                    active === filter ? "text-gold-light/70" : "text-ink/30",
                  )}
                >
                  {counts[filter]}
                </span>
              </button>
            ))}
          </div>
          <p className="eyebrow hidden shrink-0 text-[0.5rem] text-stone sm:block">
            {filtered.length} {filtered.length === 1 ? "work" : "works"}
          </p>
        </div>
      </div>

      <div className="shell py-10 md:py-14">
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45 }}
          className="columns-1 gap-3 sm:columns-2 lg:columns-3 lg:gap-4"
        >
          {filtered.map((item, index) => {
            const asset = img(item.image);

            return (
              <div
                key={item.image}
                className="mb-3 break-inside-avoid lg:mb-4"
              >
                <motion.button
                  type="button"
                  onClick={() => setLightboxIndex(index)}
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: Math.min(index * 0.04, 0.28),
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group relative block w-full overflow-hidden bg-sand text-left"
                  aria-label={`Open ${item.title} — ${item.category} in the fullscreen viewer`}
                >
                  <Image
                    src={asset.src}
                    alt={item.alt}
                    width={asset.width}
                    height={asset.height}
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    quality={82}
                    placeholder="blur"
                    blurDataURL={asset.blurDataURL}
                    className="h-auto w-full object-cover transition-transform duration-[1.25s] ease-out group-hover:scale-[1.045]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 ring-1 ring-inset ring-cream/15 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <span className="absolute right-4 top-4 flex size-9 items-center justify-center border border-cream/35 bg-ink/25 text-cream backdrop-blur-sm transition-all duration-500 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                    <Expand
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={1.5}
                    />
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                    <p className="eyebrow text-[0.5rem] text-gold-light">
                      {item.category}
                    </p>
                    <div className="mt-1.5 flex items-end justify-between gap-4">
                      <h3 className="font-display text-lg leading-tight text-cream md:text-xl">
                        {item.title}
                      </h3>
                      <span className="text-[0.5rem] font-medium tracking-[0.16em] text-cream/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>
                </motion.button>
              </div>
            );
          })}
        </motion.div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center text-sm text-stone">
            New work in this category is on its way. Please check back soon.
          </p>
        ) : null}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null ? (
          <Lightbox
            items={filtered}
            index={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
