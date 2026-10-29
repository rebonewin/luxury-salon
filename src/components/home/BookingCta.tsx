import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import ParallaxImage from "@/components/ui/ParallaxImage";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { site, whatsappHref } from "@/lib/site";

export default function BookingCta() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div className="absolute inset-0">
        <ParallaxImage
          asset="salonWide"
          alt=""
          className="h-full w-full"
          imageClassName="opacity-45"
          sizes="100vw"
          strength={14}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/40" />

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.65fr] lg:items-end lg:gap-20">
          <div>
            <Reveal>
              <div className="flex items-center gap-4 text-gold-light">
                <span className="eyebrow">06</span>
                <span className="h-px w-10 bg-gold-light/50" />
                <span className="eyebrow text-cream/55">Appointments</span>
              </div>
            </Reveal>

            <SplitHeading
              lines={[
                "Your chair",
                <em key="waiting" className="italic text-gold-light">
                  is waiting.
                </em>,
              ]}
              className="mt-6 font-display text-[clamp(2.8rem,5.8vw,5.6rem)] leading-[0.96] tracking-[-0.02em]"
            />

            <Reveal delay={0.1}>
              <p className="mt-6 max-w-lg text-[0.95rem] leading-[1.85] text-cream/60">
                Tell us a little about what you have in mind. We will confirm
                your appointment personally, usually within two hours during
                salon hours.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                <ButtonLink href="/contact#booking" variant="gold">
                  Book an appointment
                </ButtonLink>
                <a
                  href={whatsappHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 border border-cream/25 px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-cream hover:text-ink"
                >
                  <MessageCircle
                    aria-hidden="true"
                    className="size-3.5"
                    strokeWidth={1.5}
                  />
                  WhatsApp us
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.22}>
              <p className="mt-7 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-cream/35">
                {site.cancellationNote}
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <div className="border border-cream/15 bg-ink/35 p-7 backdrop-blur-sm md:p-8">
              <p className="eyebrow text-[0.55rem] text-gold-light/70">
                At a glance
              </p>
              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3.5 border-b border-cream/10 pb-5">
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold"
                    strokeWidth={1.4}
                  />
                  <div>
                    <p className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-cream/35">
                      Call the atelier
                    </p>
                    <a
                      href={site.phoneHref}
                      className="mt-1 block text-sm text-cream/80 transition-colors hover:text-gold-light"
                    >
                      {site.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 border-b border-cream/10 pb-5">
                  <MapPin
                    aria-hidden="true"
                    className="mt-0.5 size-4 shrink-0 text-gold"
                    strokeWidth={1.4}
                  />
                  <div>
                    <p className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-cream/35">
                      Find us
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-cream/80">
                      {site.address.street}, {site.address.locality},{" "}
                      {site.address.district}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-cream/35">
                    Salon hours
                  </p>
                  <p className="mt-1 text-sm text-cream/80">
                    {site.hours[0].days} · {site.hours[0].time}
                  </p>
                  <p className="mt-1 text-sm text-cream/50">
                    {site.hours[1].days} · {site.hours[1].time}
                  </p>
                </div>
              </div>

              <a
                href={site.maps.directions}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center gap-2 border-t border-cream/10 pt-5 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-cream"
              >
                Get directions
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5"
                  strokeWidth={1.5}
                />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
