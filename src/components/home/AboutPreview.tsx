import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { stats, values } from "@/lib/site";

export default function AboutPreview() {
  return (
    <section className="relative overflow-hidden bg-cream-light py-24 md:py-32 lg:py-40">
      <div className="shell grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 xl:gap-28">
        <div className="order-2 lg:order-1">
          <Reveal>
            <div className="flex items-center gap-4 text-gold-deep">
              <span className="eyebrow">01</span>
              <span className="h-px w-10 bg-gold-deep/40" />
              <span className="eyebrow text-stone">The Atelier</span>
            </div>
          </Reveal>

          <SplitHeading
            lines={[
              "A quieter",
              <em key="luxury" className="italic text-gold-deep">
                kind of luxury.
              </em>,
            ]}
            className="mt-7 font-display text-[clamp(2.6rem,5vw,4.8rem)] leading-[0.98] tracking-[-0.02em] text-ink"
          />

          <Reveal delay={0.1}>
            <p className="mt-7 max-w-lg text-[0.95rem] leading-[1.9] text-ink/65">
              Luxury Salon was created for the woman who wants more than an
              appointment. Here, the light is soft, the pace is unhurried, and
              every detail — from the consultation to the final finish — is
              considered around you.
            </p>
            <p className="mt-4 max-w-lg text-[0.95rem] leading-[1.9] text-ink/65">
              We are a small team of hair, skin and bridal specialists working
              under one roof in Masuri. One guest at a time. No noise. Just
              beautiful, personal work.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <ul className="mt-9 space-y-0 border-t border-ink/10">
              {values.map((value) => (
                <li key={value.number}>
                  <Link
                    href="/about"
                    className="group flex items-center justify-between gap-6 border-b border-ink/10 py-4"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[0.6rem] font-medium tracking-[0.18em] text-gold-deep">
                        {value.number}
                      </span>
                      <span className="text-sm text-ink/75 transition-colors duration-300 group-hover:text-ink">
                        {value.title}
                      </span>
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 text-ink/30 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep"
                      strokeWidth={1.4}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-wrap items-end gap-x-10 gap-y-6">
              <Link
                href="/about"
                className="link-line text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
              >
                Our story
              </Link>
              <div className="flex gap-8 sm:gap-10">
                {stats.slice(0, 3).map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-2xl text-ink">{stat.value}</p>
                    <p className="mt-1 text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <div className="relative ml-auto w-[88%] max-w-[34rem]">
            <div
              aria-hidden="true"
              className="absolute -left-5 -top-5 h-full w-full border border-gold/40 md:-left-7 md:-top-7"
            />
            <ParallaxImage
              asset="salonFloor"
              alt="The warm, softly lit interior of Luxury Salon in Masuri"
              className="relative aspect-[4/5] w-full"
              sizes="(min-width: 1024px) 40vw, 88vw"
            />

            <div className="absolute -bottom-10 -left-8 w-32 border-[6px] border-cream-light shadow-sm md:-bottom-12 md:-left-12 md:w-44">
              <ParallaxImage
                asset="portrait"
                alt="A bridal beauty portrait created at Luxury Salon"
                className="aspect-[3/4] w-full"
                sizes="(min-width: 768px) 12rem, 8rem"
                strength={8}
              />
            </div>

            <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 items-center gap-4 [writing-mode:vertical-rl] md:flex">
              <span className="h-12 w-px bg-gold/50" />
              <span className="text-[0.52rem] font-medium uppercase tracking-[0.3em] text-stone">
                Since 2013 · Masuri
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
