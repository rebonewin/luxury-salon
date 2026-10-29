import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink py-32 text-cream">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[38vw] leading-none tracking-[-0.06em] text-cream/[0.04]"
      >
        404
      </span>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 20% 20%, rgba(173,135,82,0.14), transparent 60%)",
        }}
      />

      <div className="shell relative">
        <div className="flex items-center gap-4 text-gold-light">
          <span className="eyebrow">404</span>
          <span className="h-px w-10 bg-gold-light/50" />
          <span className="eyebrow text-cream/50">Page not found</span>
        </div>

        <h1 className="mt-6 max-w-3xl font-display text-[clamp(2.8rem,6.4vw,6rem)] leading-[0.96] tracking-[-0.02em]">
          This page has
          <br />
          <em className="italic text-gold-light">stepped out.</em>
        </h1>

        <p className="mt-6 max-w-md text-[0.95rem] leading-[1.85] text-cream/55">
          The page you are looking for may have moved, or it may be taking a
          moment in the chair. Let us guide you back somewhere beautiful.
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 bg-gold px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:bg-gold-light"
          >
            Return home
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
          <Link
            href="/services"
            className="link-line text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream transition-colors hover:text-gold-light"
          >
            Explore services
          </Link>
          <Link
            href="/contact#booking"
            className="link-line text-[0.65rem] font-medium uppercase tracking-[0.2em] text-cream/60 transition-colors hover:text-gold-light"
          >
            Book an appointment
          </Link>
        </div>
      </div>
    </section>
  );
}
