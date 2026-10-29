import type { Metadata } from "next";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import FaqList from "@/components/ui/FaqList";
import BookingSection from "@/components/booking/BookingSection";
import { contactFaqs, site, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Booking — Masuri, Meerut",
  description:
    "Book an appointment at Luxury Salon in Masuri, Meerut. Call +91 99176 54510, message us on WhatsApp, or send a booking request for hair, beauty and bridal services.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Booking — Luxury Salon, The Beauty Atelier",
    description:
      "Request an appointment at Luxury Salon in Masuri, Meerut. Call or message us on WhatsApp.",
    url: "/contact",
    images: ["/images/salon/salon-wide.webp"],
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        chapter="Contact"
        label="Appointments"
        lines={[
          "Let's begin with",
          <em key="conversation" className="italic text-gold-light">
            a conversation.
          </em>,
        ]}
        description="Tell us what you have in mind — a cut, a colour, a facial, or your wedding day. We will help you choose the right service and find a time that suits you."
        image="salonWide"
        imageAlt="The softly lit interior of Luxury Salon, Masuri"
        meta={[
          { label: "Call", value: site.phoneDisplay },
          { label: "Hours", value: "Tue – Sun · 10:00 – 20:00" },
          { label: "Find us", value: "Masuri, Meerut" },
        ]}
      >
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={site.phoneHref}
            className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-gold-light"
          >
            <Phone aria-hidden="true" className="size-3.5" strokeWidth={1.5} />
            Call the atelier
          </a>
          <a
            href={whatsappHref()}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 border border-cream/30 px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-cream hover:text-ink"
          >
            <MessageCircle
              aria-hidden="true"
              className="size-3.5"
              strokeWidth={1.5}
            />
            WhatsApp us
          </a>
        </div>
      </PageHero>

      <BookingSection />

      <section className="border-t border-ink/10 bg-cream py-16 md:py-20">
        <div className="shell grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
          <Reveal>
            <p className="eyebrow text-gold-deep">Find us</p>
            <h2 className="mt-4 font-display text-[clamp(2.2rem,3.8vw,3.4rem)] leading-[1.02] text-ink">
              Tejasvi Enclave,
              <br />
              <em className="italic text-gold-deep">Masuri.</em>
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-[1.85] text-ink/55">
              {site.address.full}
            </p>
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="link-line mt-5 inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ink transition-colors hover:text-gold-deep"
            >
              Get directions
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.5}
              />
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border border-ink/10 bg-cream-light p-2">
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-sand">
                <iframe
                  title="Google Map showing Luxury Salon at Tejasvi Enclave, Masuri, Meerut"
                  src={site.maps.embed}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-cream-light py-24 md:py-28">
        <div className="shell grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
          <div>
            <SectionHeading
              chapter="Questions"
              label="Before You Arrive"
              lines={[
                "A few useful",
                <em key="answers" className="italic text-gold-deep">
                  answers.
                </em>,
              ]}
              description="Everything you need to know before your first visit. If we have missed something, call us — a real person will answer."
            />
            <Reveal delay={0.12}>
              <div className="mt-8 flex flex-col gap-3 border-t border-ink/10 pt-6">
                <a
                  href={site.phoneHref}
                  className="inline-flex items-center gap-2.5 text-sm text-ink/65 transition-colors hover:text-gold-deep"
                >
                  <Phone
                    aria-hidden="true"
                    className="size-3.5 text-gold-deep"
                    strokeWidth={1.5}
                  />
                  {site.phoneDisplay}
                </a>
                <p className="max-w-xs text-[0.56rem] font-medium uppercase leading-[1.9] tracking-[0.14em] text-stone">
                  {site.cancellationNote}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.08}>
            <FaqList items={contactFaqs} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
