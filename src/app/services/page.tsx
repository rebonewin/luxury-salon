import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Clock, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import FaqList from "@/components/ui/FaqList";
import ClosingCta from "@/components/ui/ClosingCta";
import { serviceCategories, serviceFaqs, site, whatsappHref } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services — Hair, Beauty & Bridal",
  description:
    "Explore the Luxury Salon service menu: precision haircuts, colour and treatments, facials and makeup, plus bridal artistry and wedding packages in Masuri, Meerut.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services — Luxury Salon, The Beauty Atelier",
    description:
      "Hair, beauty and bridal services, delivered with an unhurried, personal approach in Masuri, Meerut.",
    url: "/services",
    images: ["/images/services/hair-styling.webp"],
  },
};

const experience = [
  {
    number: "01",
    title: "The consultation",
    body: "A proper conversation about your hair history, skin, routine and the look you have in mind. We listen before we begin.",
  },
  {
    number: "02",
    title: "The ritual",
    body: "Unhurried time with a specialist, professional products and a finish considered from every angle — not just the front mirror.",
  },
  {
    number: "03",
    title: "The aftercare",
    body: "A clear plan for keeping the look at home, honest product advice and an open invitation to return with questions.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        chapter="Services"
        label="The Menu"
        lines={[
          "Hair, beauty &",
          <em key="bridal" className="italic text-gold-light">
            bridal artistry.
          </em>,
        ]}
        description="A considered menu rather than an endless one. Each service is shaped around your hair, skin and the occasion — always beginning with a consultation."
        image="styling"
        imageAlt="Glossy, hand-styled waves created at our Masuri atelier"
        meta={[
          { label: "Consultation", value: "Included with every visit" },
          { label: "Starting from", value: "₹1,200" },
          { label: "Appointments", value: "Private, one-to-one" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="/contact#booking"
            className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-gold-light"
          >
            Book a consultation
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
          <a
            href={site.phoneHref}
            className="link-line text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:text-gold-light"
          >
            Call {site.phoneDisplay}
          </a>
        </div>
      </PageHero>

      <div className="sticky top-16 z-30 border-b border-ink/10 bg-cream-light/95 backdrop-blur-md">
        <div className="shell flex items-center justify-between gap-6 py-2">
          <nav
            aria-label="Service categories"
            className="no-scrollbar flex items-center gap-1 overflow-x-auto"
          >
            {serviceCategories.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="whitespace-nowrap px-4 py-2.5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-ink/55 transition-colors hover:bg-ink/5 hover:text-ink"
              >
                {category.name}
              </a>
            ))}
          </nav>
          <a
            href={site.phoneHref}
            className="eyebrow hidden shrink-0 items-center gap-2 text-[0.55rem] text-ink/50 transition-colors hover:text-gold-deep sm:inline-flex"
          >
            <Phone aria-hidden="true" className="size-3" strokeWidth={1.5} />
            {site.phoneDisplay}
          </a>
        </div>
      </div>

      <div>
        {serviceCategories.map((category, categoryIndex) => (
          <section
            key={category.slug}
            id={category.slug}
            className={cn(
              "scroll-mt-28 border-b border-ink/10 py-16 md:py-24",
              categoryIndex % 2 === 1 ? "bg-cream" : "bg-cream-light",
            )}
          >
            <div className="shell grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:gap-16">
              <div className="lg:sticky lg:top-32 lg:self-start">
                <ParallaxImage
                  asset={category.image}
                  alt={category.imageAlt}
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  strength={9}
                />
                <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/10 pt-3">
                  <span className="eyebrow text-[0.52rem] text-stone">
                    {category.eyebrow}
                  </span>
                  <span className="eyebrow text-[0.52rem] text-ink/35">
                    {category.services.length} services
                  </span>
                </div>
              </div>

              <div>
                <Reveal>
                  <div className="flex items-center gap-4 text-gold-deep">
                    <span className="eyebrow">{category.number}</span>
                    <span className="h-px w-10 bg-gold-deep/40" />
                    <span className="eyebrow text-stone">{category.name}</span>
                  </div>
                </Reveal>

                <Reveal delay={0.06}>
                  <h2 className="mt-5 max-w-2xl font-display text-[clamp(2.4rem,4.4vw,3.9rem)] leading-[1.02] tracking-[-0.02em] text-ink">
                    {category.title}
                  </h2>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-5 max-w-2xl text-[0.93rem] leading-[1.9] text-ink/60">
                    {category.description}
                  </p>
                </Reveal>

                <ul className="mt-10 border-t border-ink/10">
                  {category.services.map((service) => (
                    <li
                      key={service.name}
                      className="group border-b border-ink/10 py-6 md:py-7"
                    >
                      <div className="grid gap-4 sm:grid-cols-[auto_1fr_auto] sm:gap-6">
                        <span className="pt-1.5 text-[0.58rem] font-medium tracking-[0.18em] text-gold-deep">
                          {service.number}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
                            <h3 className="font-display text-[1.65rem] leading-tight text-ink md:text-[2rem]">
                              {service.name}
                            </h3>
                            <span className="text-[0.6rem] font-medium uppercase tracking-[0.16em] text-ink/55">
                              {service.price}
                            </span>
                          </div>
                          <p className="mt-2 max-w-xl text-sm leading-[1.8] text-ink/50">
                            {service.description}
                          </p>
                          <div className="mt-4 flex flex-wrap items-center gap-4 text-[0.54rem] font-medium uppercase tracking-[0.15em] text-stone">
                            <span className="inline-flex items-center gap-1.5">
                              <Clock
                                aria-hidden="true"
                                className="size-3 text-gold-deep"
                                strokeWidth={1.5}
                              />
                              {service.duration}
                            </span>
                            <span className="h-3 w-px bg-ink/15" />
                            <Link
                              href="/contact#booking"
                              className="link-line text-gold-deep transition-colors hover:text-ink"
                            >
                              Book this service
                            </Link>
                          </div>
                        </div>
                        <Link
                          href="/contact#booking"
                          aria-label={`Book ${service.name}`}
                          className="hidden size-10 items-center justify-center border border-ink/20 text-ink/60 transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream sm:flex"
                        >
                          <ArrowUpRight
                            aria-hidden="true"
                            className="size-4"
                            strokeWidth={1.4}
                          />
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 max-w-xl text-[0.6rem] font-medium uppercase leading-[1.9] tracking-[0.12em] text-stone">
                  {site.priceNote}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      <section className="relative overflow-hidden bg-ink py-20 text-cream md:py-24">
        <div className="shell">
          <SectionHeading
            chapter="The Visit"
            label="What to Expect"
            lines={[
              "Considered from",
              <em key="first" className="italic text-gold-light">
                the first hello.
              </em>,
            ]}
            description="No rushed chairs, no guesswork. Just a clear, calm process designed around you."
            light
            className="max-w-2xl"
          />

          <div className="mt-12 grid gap-8 border-t border-cream/10 pt-8 md:grid-cols-3 md:gap-10">
            {experience.map((step) => (
              <Reveal key={step.number}>
                <p className="font-display text-2xl text-gold-light/60">
                  {step.number}
                </p>
                <h3 className="mt-4 font-display text-2xl text-cream">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-sm text-sm leading-[1.85] text-cream/50">
                  {step.body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-light py-24 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <div>
            <SectionHeading
              chapter="Questions"
              label="Before You Book"
              lines={[
                "Good to",
                <em key="know" className="italic text-gold-deep">
                  know.
                </em>,
              ]}
              description="A few things guests usually ask before their first appointment. If your question is not here, call us — we are happy to talk it through."
            />

            <Reveal delay={0.15}>
              <div className="mt-8 border border-ink/10 bg-cream p-6">
                <p className="eyebrow text-[0.52rem] text-stone">
                  Still deciding?
                </p>
                <p className="mt-3 font-display text-2xl leading-snug text-ink">
                  We are happy to help you choose.
                </p>
                <div className="mt-5 flex flex-col gap-3">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2.5 text-sm text-ink/70 transition-colors hover:text-gold-deep"
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-3.5 text-gold-deep"
                      strokeWidth={1.5}
                    />
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-ink/70 transition-colors hover:text-gold-deep"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="size-3.5 text-gold-deep"
                      strokeWidth={1.5}
                    />
                    Message us on WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <FaqList items={serviceFaqs} />
          </Reveal>
        </div>
      </section>

      <ClosingCta
        eyebrow="Appointments"
        lines={[
          "A ritual worth",
          <em key="time" className="italic text-gold-deep">
            making time for.
          </em>,
        ]}
        description="Choose a service, share a preferred date, and we will take care of the rest — beginning with a personal consultation."
      />
    </>
  );
}
