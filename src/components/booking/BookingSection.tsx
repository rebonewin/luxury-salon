import { ArrowUpRight, Clock, MapPin, MessageCircle, Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import BookingForm from "@/components/booking/BookingForm";
import { site, whatsappHref } from "@/lib/site";

export default function BookingSection() {
  return (
    <section
      id="booking"
      className="scroll-mt-24 bg-cream-light py-20 md:py-28"
    >
      <div className="shell">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            chapter="Booking"
            label="Request an Appointment"
            lines={[
              "Tell us what",
              <em key="mind" className="italic text-gold-deep">
                you have in mind.
              </em>,
            ]}
            description="Share a few details and we will confirm your appointment personally. Prefer to speak to someone? Call or message us — we are happy to help."
            className="max-w-2xl"
          />
          <p className="shrink-0 text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.16em] text-stone">
            Usually confirmed within
            <br />
            two hours during salon hours.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal>
            <BookingForm />
          </Reveal>

          <Reveal delay={0.08}>
            <aside className="flex h-full flex-col bg-ink p-7 text-cream md:p-9">
              <p className="eyebrow text-[0.55rem] text-gold-light/70">
                Prefer to talk?
              </p>
              <h3 className="mt-4 font-display text-[2rem] leading-tight text-cream md:text-[2.4rem]">
                We are a phone call away.
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-[1.85] text-cream/50">
                For same-day appointments, bridal enquiries or a quick question
                about a service, call us directly.
              </p>

              <div className="mt-7 space-y-3">
                <a
                  href={site.phoneHref}
                  className="group flex items-center justify-between gap-4 border border-cream/20 px-5 py-4 transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
                >
                  <span className="flex items-center gap-3 text-sm">
                    <Phone
                      aria-hidden="true"
                      className="size-4 text-gold group-hover:text-ink"
                      strokeWidth={1.5}
                    />
                    {site.phoneDisplay}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 opacity-50"
                    strokeWidth={1.5}
                  />
                </a>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between gap-4 bg-gold px-5 py-4 text-ink transition-colors duration-300 hover:bg-gold-light"
                >
                  <span className="flex items-center gap-3 text-sm">
                    <MessageCircle
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.5}
                    />
                    Message on WhatsApp
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 opacity-50"
                    strokeWidth={1.5}
                  />
                </a>
              </div>

              <div className="mt-8 border-t border-cream/10 pt-6">
                <div className="flex items-start gap-3.5">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-gold"
                    strokeWidth={1.4}
                  />
                  <div>
                    <p className="text-[0.52rem] font-medium uppercase tracking-[0.16em] text-cream/35">
                      The atelier
                    </p>
                    <a
                      href={site.maps.directions}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1.5 block text-sm leading-[1.8] text-cream/70 transition-colors hover:text-gold-light"
                    >
                      {site.address.full}
                    </a>
                  </div>
                </div>

                <div className="mt-5 flex items-start gap-3.5">
                  <Clock
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-gold"
                    strokeWidth={1.4}
                  />
                  <div>
                    <p className="text-[0.52rem] font-medium uppercase tracking-[0.16em] text-cream/35">
                      Hours
                    </p>
                    <p className="mt-1.5 text-sm text-cream/70">
                      {site.hours[0].days} · {site.hours[0].time}
                    </p>
                    <p className="mt-0.5 text-sm text-cream/40">
                      {site.hours[1].days} · {site.hours[1].time}
                    </p>
                  </div>
                </div>
              </div>

              <p className="mt-auto pt-8 text-[0.56rem] font-medium uppercase leading-[1.9] tracking-[0.14em] text-cream/30">
                {site.hoursNote}
              </p>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
