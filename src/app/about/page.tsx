import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import SplitHeading from "@/components/ui/SplitHeading";
import ClosingCta from "@/components/ui/ClosingCta";
import { reasons, stats, timeline, values } from "@/lib/site";

export const metadata: Metadata = {
  title: "About — The Atelier in Masuri, Meerut",
  description:
    "Meet Luxury Salon — a private luxury salon in Masuri, Meerut, built on unhurried appointments, specialist hair, skin and bridal artistry, and beauty that feels like you.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About — Luxury Salon, The Beauty Atelier",
    description:
      "A private luxury salon in Masuri, Meerut, devoted to hair, skin and bridal artistry.",
    url: "/about",
    images: ["/images/salon/salon-wide.webp"],
  },
};

const disciplines = [
  {
    number: "01",
    slug: "hair",
    name: "Hair artistry",
    body: "Cutting, colour and restorative care led by stylists who train continuously in modern technique and understand how hair behaves in real life.",
    tags: "Precision cutting · Colour correction · Treatments",
  },
  {
    number: "02",
    slug: "beauty",
    name: "Skin therapy",
    body: "Facials, exfoliation and ongoing skin guidance grounded in skin health — never a quick fix or a one-size ritual.",
    tags: "Skin analysis · Facials · Home care",
  },
  {
    number: "03",
    slug: "bridal",
    name: "Bridal artistry",
    body: "Trials, timelines and on-the-day artistry for brides who want to feel calm, photographed beautifully and completely themselves.",
    tags: "Bridal trials · Wedding day · Family",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        chapter="About"
        label="The Atelier"
        lines={[
          "The beauty",
          <em key="name" className="italic text-gold-light">
            behind the name.
          </em>,
        ]}
        description="A small, private salon in Masuri with a simple belief: the best beauty work begins with listening, takes its time, and never asks you to be someone else."
        image="portrait"
        imageAlt="A bridal beauty portrait created at Luxury Salon"
        imageClassName="object-[50%_36%]"
        meta={[
          { label: "Established", value: "2013" },
          { label: "Brides styled", value: "500+" },
          { label: "Based in", value: "Masuri, Meerut" },
        ]}
      />

      <section className="bg-cream-light py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <div className="flex items-center gap-4 text-gold-deep">
                <span className="eyebrow">01</span>
                <span className="h-px w-10 bg-gold-deep/40" />
                <span className="eyebrow text-stone">Our Story</span>
              </div>
            </Reveal>
            <SplitHeading
              lines={[
                "A salon built on",
                "a quieter idea",
                <em key="luxury" className="italic text-gold-deep">
                  of luxury.
                </em>,
              ]}
              className="mt-6 font-display text-[clamp(2.5rem,4.6vw,4.4rem)] leading-[0.98] tracking-[-0.02em] text-ink"
            />
          </div>

          <div className="max-w-2xl">
            <Reveal>
              <p className="font-display text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.5] text-ink/80">
                Luxury Salon began with a small frustration: beautiful work was
                everywhere, but the experience of getting it rarely felt
                personal.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 text-[0.95rem] leading-[1.9] text-ink/60">
                Too many chairs, too much noise, too little time to ask
                questions. We built the opposite — a private atelier in Masuri
                where one appointment receives proper attention, where hair,
                skin and bridal artistry sit under one roof, and where the
                result is designed for your real life, not just a photograph.
              </p>
              <p className="mt-4 text-[0.95rem] leading-[1.9] text-ink/60">
                More than a decade later, that idea still guides every detail:
                the light, the products, the pace, the people. Nothing loud.
                Nothing rushed. Just work that makes you feel more like
                yourself.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-8 font-display text-xl italic text-gold-deep">
                — The Luxury Salon team
              </p>
              <Link
                href="/services"
                className="link-line mt-8 inline-flex text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
              >
                Explore the service menu
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="shell mt-16 md:mt-20">
          <Reveal>
            <ParallaxImage
              asset="salonWide"
              alt="Warm light, styling chairs and considered details inside Luxury Salon"
              className="aspect-[16/10] w-full md:aspect-[21/9]"
              sizes="100vw"
              strength={8}
            />
            <div className="mt-4 flex flex-col gap-2 border-t border-ink/10 pt-3 sm:flex-row sm:items-center sm:justify-between">
              <span className="eyebrow text-[0.52rem] text-stone">
                The atelier · Masuri, Meerut
              </span>
              <span className="text-[0.52rem] font-medium uppercase tracking-[0.16em] text-ink/35">
                Photographed in natural light
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream">
        <div className="shell grid grid-cols-2 divide-x divide-ink/10 py-12 md:grid-cols-4 md:py-14">
          {stats.map((stat) => (
            <div key={stat.label} className="px-5 first:pl-0 md:px-8">
              <p className="font-display text-[clamp(2rem,3.6vw,3.2rem)] leading-none text-ink">
                {stat.value}
              </p>
              <p className="mt-3 text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-cream-light py-24 md:py-32">
        <div className="shell">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              chapter="02"
              label="Our Philosophy"
              lines={[
                "Beauty, with",
                <em key="intention" className="italic text-gold-deep">
                  intention.
                </em>,
              ]}
              description="Three principles guide every appointment, every product choice and every finish."
              className="max-w-2xl"
            />
            <p className="max-w-xs text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.16em] text-stone">
              Luxury is not more. It is better considered.
            </p>
          </div>

          <div className="mt-14 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-3 md:gap-8">
            {values.map((value, index) => (
              <Reveal key={value.number} delay={index * 0.06}>
                <p className="font-display text-3xl text-gold-deep/60">
                  {value.number}
                </p>
                <h3 className="mt-5 font-display text-2xl text-ink md:text-[1.75rem]">
                  {value.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-[1.9] text-ink/55">
                  {value.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-24 md:py-32">
        <div className="shell">
          <SectionHeading
            chapter="03"
            label="The Journey"
            lines={[
              "A decade of",
              <em key="practice" className="italic text-gold-deep">
                practice.
              </em>,
            ]}
            description="A small timeline of the choices that shaped the atelier — and the promise that has not changed."
            className="max-w-2xl"
          />

          <div className="mt-14 grid gap-10 border-t border-ink/10 pt-10 md:grid-cols-4 md:gap-7">
            {timeline.map((item, index) => (
              <Reveal key={item.marker} delay={index * 0.05}>
                <div className="flex items-center gap-3">
                  <span className="size-1.5 rotate-45 bg-gold-deep" />
                  <p className="eyebrow text-[0.5rem] text-gold-deep">
                    {item.marker}
                  </p>
                </div>
                <h3 className="mt-5 font-display text-[1.55rem] leading-tight text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-[1.85] text-ink/55">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-70"
          style={{
            background:
              "radial-gradient(65% 55% at 88% 8%, rgba(173,135,82,0.16), transparent 60%)",
          }}
        />
        <div className="shell relative">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              chapter="04"
              label="Why Luxury Salon"
              lines={[
                "Why guests",
                <em key="return" className="italic text-gold-light">
                  return.
                </em>,
              ]}
              description="The details that make the experience feel different — and worth coming back for."
              light
              className="max-w-2xl"
            />
            <p className="max-w-xs text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.16em] text-cream/35">
              Six quiet standards we do not compromise on.
            </p>
          </div>

          <div className="mt-14 grid border-t border-cream/10 md:grid-cols-2">
            {reasons.map((reason, index) => (
              <Reveal
                key={reason.title}
                delay={(index % 2) * 0.05}
                className="border-b border-cream/10 md:odd:border-r md:odd:pr-10 md:even:pl-10"
              >
                <div className="py-7 md:py-8">
                  <p className="text-[0.58rem] font-medium tracking-[0.18em] text-gold-light/60">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-4 font-display text-xl text-cream md:text-2xl">
                    {reason.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-[1.85] text-cream/50">
                    {reason.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-light py-24 md:py-32">
        <div className="shell grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading
              chapter="05"
              label="The Hands"
              lines={[
                "Specialists",
                <em key="residence" className="italic text-gold-deep">
                  in residence.
                </em>,
              ]}
              description="Our team is deliberately small. Each discipline is led by someone who lives in their craft, trains continuously and works with a light, considered hand."
            />
            <Reveal delay={0.12}>
              <p className="mt-7 max-w-md text-sm leading-[1.9] text-ink/50">
                Over twelve years, that approach has earned the trust of more
                than five hundred brides and a loyal community of guests who
                return for the work — and stay for the calm.
              </p>
              <Link
                href="/contact#booking"
                className="link-line mt-7 inline-flex text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
              >
                Meet us in the chair
              </Link>
            </Reveal>
          </div>

          <div className="border-t border-ink/10">
            {disciplines.map((discipline) => (
              <Reveal key={discipline.number}>
                <div className="group border-b border-ink/10 py-6 md:py-8">
                  <div className="flex items-start gap-4 md:gap-6">
                    <span className="pt-1.5 text-[0.58rem] font-medium tracking-[0.18em] text-gold-deep">
                      {discipline.number}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="font-display text-[1.7rem] leading-tight text-ink md:text-[2rem]">
                          {discipline.name}
                        </h3>
                        <Link
                          href={`/services#${discipline.slug}`}
                          className="eyebrow text-[0.5rem] text-ink/35 transition-colors group-hover:text-gold-deep"
                        >
                          Explore
                        </Link>
                      </div>
                      <p className="mt-3 max-w-xl text-sm leading-[1.85] text-ink/55">
                        {discipline.body}
                      </p>
                      <p className="mt-4 text-[0.52rem] font-medium uppercase tracking-[0.15em] text-stone">
                        {discipline.tags}
                      </p>
                    </div>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="mt-1.5 hidden size-4 shrink-0 text-ink/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-gold-deep sm:block"
                      strokeWidth={1.4}
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ClosingCta
        eyebrow="Visit the atelier"
        lines={[
          "Come as you are.",
          <em key="leave" className="italic text-gold-deep">
            Leave a little more you.
          </em>,
        ]}
        description="A first appointment is simply a conversation. Tell us what you have in mind and we will take it from there."
      />
    </>
  );
}
