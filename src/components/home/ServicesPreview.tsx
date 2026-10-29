import Link from "next/link";
import { Phone } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/services/ServiceCard";
import { serviceCategories, site } from "@/lib/site";

export default function ServicesPreview() {
  return (
    <section id="services" className="border-t border-ink/10 bg-cream py-24 md:py-32">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            chapter="02"
            label="The Menu"
            lines={[
              "Hair, skin &",
              <em key="bridal" className="italic text-gold-deep">
                bridal artistry.
              </em>,
            ]}
            description="Three disciplines, one standard of care. Every appointment begins with a proper consultation and ends with a finish that feels entirely your own."
            className="max-w-2xl"
          />

          <div className="flex shrink-0 flex-col gap-5 lg:items-end">
            <Link
              href="/services"
              className="link-line text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ink transition-colors hover:text-gold-deep"
            >
              View the full menu
            </Link>
            <a
              href={site.phoneHref}
              className="inline-flex items-center gap-2.5 text-sm text-ink/65 transition-colors hover:text-gold-deep"
            >
              <Phone
                aria-hidden="true"
                className="size-3.5 text-gold-deep"
                strokeWidth={1.5}
              />
              Not sure where to begin? {site.phoneDisplay}
            </a>
          </div>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {serviceCategories.map((category) => (
            <ServiceCard key={category.slug} category={category} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-ink/10 pt-6 text-[0.58rem] font-medium uppercase tracking-[0.16em] text-stone sm:flex-row sm:items-center sm:justify-between">
          <p>Starting prices from ₹1,200 · Consultation included</p>
          <p className="text-ink/60">{site.priceNote}</p>
        </div>
      </div>
    </section>
  );
}
