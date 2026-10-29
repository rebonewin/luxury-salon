"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Star } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import SplitHeading from "@/components/ui/SplitHeading";
import { img } from "@/lib/images";
import { site } from "@/lib/site";

export default function HeroSection() {
  const reduce = useReducedMotion();
  const asset = img("hero");

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-cream">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={asset.src}
          alt="A bride with traditional gold and emerald jewellery, styled at Luxury Salon"
          fill
          sizes="100vw"
          quality={82}
          preload
          placeholder="blur"
          blurDataURL={asset.blurDataURL}
          className="object-cover object-[43%_28%] lg:object-[62%_center]"
        />
      </motion.div>

      <div className="absolute inset-0 bg-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/55" />

      <div className="shell relative flex flex-1 flex-col pb-7 pt-28 md:pb-9 md:pt-36">
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex items-center justify-between gap-6 text-[0.56rem] font-medium uppercase tracking-[0.24em] text-cream/50"
        >
          <span className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" />
            The Beauty Atelier
          </span>
          <span className="hidden md:block">Masuri · Meerut · India</span>
        </motion.div>

        <div className="mt-auto pt-20">
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="eyebrow text-gold-light"
          >
            Luxury Salon · Est. 2013
          </motion.p>

          <SplitHeading
            as="h1"
            trigger="mount"
            delay={0.55}
            lines={[
              "Beauty,",
              "style &",
              <em key="confidence" className="font-display text-gold-light">
                confidence.
              </em>,
            ]}
            className="mt-5 font-display text-[clamp(3.4rem,7.7vw,7.7rem)] leading-[0.9] tracking-[-0.03em]"
          />

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 grid gap-8 border-t border-cream/15 pt-7 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-12"
          >
            <p className="max-w-md text-[0.92rem] leading-[1.85] text-cream/65">
              A private beauty atelier for hair, skin and bridal artistry —
              where considered technique meets the quiet luxury of being looked
              after.
            </p>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
              <ButtonLink href="/contact#booking" variant="gold">
                Book an appointment
              </ButtonLink>
              <ButtonLink href="/services" variant="text-light">
                Explore services
              </ButtonLink>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.35 }}
          className="mt-9 hidden items-center justify-between gap-6 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-cream/40 sm:flex"
        >
          <span className="flex items-center gap-3">
            <span className="flex h-8 w-px overflow-hidden bg-cream/20">
              <span className="animate-scroll-cue block h-full w-full bg-gold" />
            </span>
            Scroll to discover
          </span>
          <span className="hidden md:block">
            {site.hours[0].days} · {site.hours[0].time}
          </span>
          <span className="flex items-center gap-2 text-cream/55">
            <span className="flex gap-0.5 text-gold-light" aria-hidden="true">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className="size-2.5"
                  fill="currentColor"
                  strokeWidth={0}
                />
              ))}
            </span>
            4.9 guest rating
          </span>
        </motion.div>
      </div>

      <div className="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 items-center gap-5 [writing-mode:vertical-rl] xl:flex">
        <span className="text-[0.56rem] font-medium uppercase tracking-[0.3em] text-cream/35">
          Hair · Skin · Bridal
        </span>
        <span className="h-14 w-px bg-cream/20" />
      </div>
    </section>
  );
}
