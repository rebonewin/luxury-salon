import type { ReactNode } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import ButtonLink from "@/components/ui/ButtonLink";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";
import { whatsappHref } from "@/lib/site";

type ClosingCtaProps = {
  eyebrow: string;
  lines: ReactNode[];
  description?: string;
};

export default function ClosingCta({
  eyebrow,
  lines,
  description,
}: ClosingCtaProps) {
  return (
    <section className="border-t border-ink/10 bg-cream py-20 md:py-24">
      <div className="shell flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
        <div className="max-w-3xl">
          <Reveal>
            <p className="eyebrow text-gold-deep">{eyebrow}</p>
          </Reveal>
          <SplitHeading
            lines={lines}
            className="mt-5 font-display text-[clamp(2.4rem,4.8vw,4.6rem)] leading-[0.97] tracking-[-0.02em] text-ink"
          />
          {description ? (
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-lg text-sm leading-[1.85] text-ink/55">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>

        <Reveal delay={0.12} className="shrink-0">
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/contact#booking" variant="dark">
              Book an appointment
            </ButtonLink>
            <a
              href={whatsappHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 border border-ink/20 px-6 py-4 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors duration-500 hover:border-ink hover:bg-ink hover:text-cream"
            >
              <MessageCircle
                aria-hidden="true"
                className="size-3.5"
                strokeWidth={1.5}
              />
              WhatsApp
              <ArrowUpRight
                aria-hidden="true"
                className="size-3 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
