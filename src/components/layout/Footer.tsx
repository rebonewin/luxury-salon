import Link from "next/link";
import {
  ArrowUp,
  ArrowUpRight,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import CopyrightYear from "@/components/layout/CopyrightYear";
import { navLinks, serviceCategories, site, whatsappHref } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-cream">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={{
          background:
            "radial-gradient(80% 60% at 15% 0%, rgba(173,135,82,0.15), transparent 60%)",
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 right-0 select-none font-display text-[26vw] leading-[0.7] tracking-[-0.05em] text-cream/[0.035]"
      >
        LUXURY
      </span>

      <div className="shell relative py-16 md:py-20 lg:py-24">
        <div className="flex flex-col gap-10 border-b border-cream/10 pb-14 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pb-16">
          <div>
            <p className="eyebrow text-gold-light/75">
              Luxury Salon — The Beauty Atelier
            </p>
            <p className="mt-6 max-w-3xl font-display text-[clamp(2.5rem,5.4vw,5.2rem)] leading-[0.98] tracking-[-0.02em]">
              A little more beautiful,{" "}
              <em className="text-gold-light">every time.</em>
            </p>
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            <ButtonLink href="/contact#booking" variant="gold">
              Book an appointment
            </ButtonLink>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-3 border border-cream/25 px-7 py-4 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors duration-500 hover:bg-cream hover:text-ink"
            >
              <MessageCircle
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.5}
              />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-[1.35fr_0.7fr_0.7fr_1.05fr] lg:gap-8">
          <div>
            <Link
              href="/"
              className="inline-flex flex-col leading-none transition-colors hover:text-gold-light"
              aria-label="Luxury Salon — home"
            >
              <span className="font-display text-2xl tracking-[0.16em]">
                LUXURY
              </span>
              <span className="mt-2 text-[0.46rem] font-medium uppercase tracking-[0.34em] text-cream/45">
                The Beauty Atelier
              </span>
            </Link>
            <p className="mt-6 max-w-xs text-sm leading-[1.85] text-cream/55">
              A private luxury salon in Masuri, Meerut, devoted to hair, skin
              and bridal artistry. Considered work, unhurried appointments and
              beauty that feels like you.
            </p>
            <a
              href={site.phoneHref}
              className="mt-6 inline-flex items-center gap-2.5 text-sm text-cream/80 transition-colors hover:text-gold-light"
            >
              <Phone
                aria-hidden="true"
                className="size-3.5 text-gold"
                strokeWidth={1.5}
              />
              {site.phoneDisplay}
            </a>
          </div>

          <div>
            <p className="eyebrow text-[0.6rem] text-cream/35">Explore</p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-line text-sm text-cream/70 transition-colors hover:text-gold-light"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[0.6rem] text-cream/35">Services</p>
            <ul className="mt-5 space-y-3">
              {serviceCategories.map((category) => (
                <li key={category.slug}>
                  <Link
                    href={`/services#${category.slug}`}
                    className="link-line text-sm text-cream/70 transition-colors hover:text-gold-light"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/gallery"
                  className="link-line text-sm text-cream/70 transition-colors hover:text-gold-light"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="eyebrow text-[0.6rem] text-cream/35">Visit</p>
            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 flex items-start gap-2.5 text-sm leading-[1.8] text-cream/70 transition-colors hover:text-gold-light"
            >
              <MapPin
                aria-hidden="true"
                className="mt-1 size-3.5 shrink-0 text-gold"
                strokeWidth={1.5}
              />
              <span>
                {site.address.street}
                <br />
                {site.address.locality}, {site.address.district}{" "}
                {site.address.postalCode}
              </span>
            </a>

            <div className="mt-6 border-t border-cream/10 pt-5">
              <p className="text-sm text-cream/70">{site.hours[0].days}</p>
              <p className="mt-1 text-sm text-cream/45">{site.hours[0].time}</p>
              <p className="mt-3 text-sm text-cream/70">{site.hours[1].days}</p>
              <p className="mt-1 text-sm text-cream/45">
                {site.hours[1].time}
              </p>
            </div>

            <a
              href={site.maps.directions}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[0.62rem] font-medium uppercase tracking-[0.18em] text-gold-light transition-colors hover:text-cream"
            >
              Get directions
              <ArrowUpRight
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-cream/10 pt-7 text-[0.6rem] uppercase tracking-[0.18em] text-cream/35 md:flex-row md:items-center md:justify-between">
          <p>© <CopyrightYear /> Luxury Salon. All rights reserved.</p>
          <p className="text-cream/25">Masuri · Meerut · Uttar Pradesh</p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 transition-colors hover:text-gold-light"
          >
            Back to top
            <ArrowUp
              aria-hidden="true"
              className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5"
              strokeWidth={1.5}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
