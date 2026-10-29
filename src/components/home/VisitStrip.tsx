import { ArrowUpRight, Clock, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { site } from "@/lib/site";

export default function VisitStrip() {
  return (
    <section className="border-t border-ink/10 bg-cream-light py-24 md:py-32">
      <div className="shell grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
        <div>
          <SectionHeading
            chapter="07"
            label="Visit"
            lines={[
              "Find us in",
              <em key="masuri" className="italic text-gold-deep">
                Masuri.
              </em>,
            ]}
            description="Tucked into Tejasvi Enclave on the Daurala–Masuri Road, the atelier is easy to reach and quiet once you step inside."
          />

          <Reveal delay={0.1}>
            <div className="mt-9 space-y-5 border-t border-ink/10 pt-7">
              <div className="flex items-start gap-4">
                <MapPin
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-gold-deep"
                  strokeWidth={1.4}
                />
                <div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone">
                    The atelier
                  </p>
                  <a
                    href={site.maps.directions}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 block max-w-xs text-sm leading-relaxed text-ink/75 transition-colors hover:text-gold-deep"
                  >
                    {site.address.full}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-gold-deep"
                  strokeWidth={1.4}
                />
                <div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone">
                    Opening hours
                  </p>
                  <p className="mt-1.5 text-sm text-ink/75">
                    {site.hours[0].days} · {site.hours[0].time}
                  </p>
                  <p className="mt-0.5 text-sm text-ink/45">
                    {site.hours[1].days} · {site.hours[1].time}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone
                  aria-hidden="true"
                  className="mt-0.5 size-4 shrink-0 text-gold-deep"
                  strokeWidth={1.4}
                />
                <div>
                  <p className="text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone">
                    Call us
                  </p>
                  <a
                    href={site.phoneHref}
                    className="mt-1.5 block text-sm text-ink/75 transition-colors hover:text-gold-deep"
                  >
                    {site.phoneDisplay}
                  </a>
                </div>
              </div>
            </div>

            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center gap-3 border border-ink/20 px-6 py-4 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-cream"
            >
              Open in Google Maps
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="relative border border-ink/10 bg-cream p-2">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand">
              <iframe
                title="Map showing the location of Luxury Salon in Masuri, Meerut"
                src={site.maps.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>
            <div className="pointer-events-none absolute left-5 top-5 border border-ink/10 bg-cream-light/95 px-4 py-3 backdrop-blur-sm">
              <p className="eyebrow text-[0.5rem] text-gold-deep">Luxury Salon</p>
              <p className="mt-1 text-[0.7rem] text-ink/70">
                Tejasvi Enclave · Masuri
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
