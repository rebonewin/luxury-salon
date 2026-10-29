import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems } from "@/lib/site";

const looks = [
  { ...galleryItems[0], aspect: "aspect-[3/4]", offset: "md:mt-0" },
  { ...galleryItems[2], aspect: "aspect-[4/5]", offset: "md:mt-16" },
  { ...galleryItems[4], aspect: "aspect-[3/4]", offset: "md:mt-7" },
];

export default function FeaturedLooks() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(70% 55% at 80% 10%, rgba(173,135,82,0.16), transparent 60%)",
        }}
      />

      <div className="shell relative">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            chapter="03"
            label="Featured Looks"
            lines={[
              "Portraits of",
              <em key="confidence" className="italic text-gold-light">
                confidence.
              </em>,
            ]}
            description="A few recent finishes from the atelier — bridal artistry, luminous skin and hair that moves beautifully long after you leave the chair."
            light
            className="max-w-2xl"
          />

          <Link
            href="/gallery"
            className="link-line shrink-0 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:text-gold-light"
          >
            View the gallery
          </Link>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-5 lg:gap-7">
          {looks.map((look, index) => (
            <Reveal
              key={look.image}
              delay={index * 0.08}
              className={look.offset}
            >
              <figure className="group">
                <div
                  className={`relative overflow-hidden bg-ink-soft ${look.aspect}`}
                >
                  <ParallaxImage
                    asset={look.image}
                    alt={look.alt}
                    className="h-full w-full"
                    sizes="(min-width: 640px) 33vw, 100vw"
                    strength={9}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-ink/10" />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 ring-1 ring-inset ring-cream/10"
                  />
                  <span className="absolute left-4 top-4 text-[0.58rem] font-medium uppercase tracking-[0.2em] text-cream/60">
                    0{index + 1}
                  </span>
                  <Link
                    href="/gallery"
                    aria-label={`View ${look.title} in the gallery`}
                    className="absolute bottom-4 right-4 flex size-10 items-center justify-center border border-cream/30 bg-ink/20 text-cream backdrop-blur-sm transition-colors duration-500 hover:border-gold hover:bg-gold hover:text-ink"
                  >
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.4}
                    />
                  </Link>
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-cream/10 pt-3">
                  <span className="text-sm text-cream/75">{look.title}</span>
                  <span className="eyebrow text-[0.52rem] text-cream/35">
                    {look.category}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-16 flex flex-col items-center gap-4 border-t border-cream/10 pt-8 text-center">
            <p className="max-w-md font-display text-xl leading-snug text-cream/70 md:text-2xl">
              Every face tells a different story. Yours deserves its own.
            </p>
            <Link
              href="/contact#booking"
              className="link-line text-[0.62rem] font-medium uppercase tracking-[0.2em] text-gold-light transition-colors hover:text-cream"
            >
              Begin your appointment
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
