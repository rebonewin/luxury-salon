import type { Metadata } from "next";
import PageHero from "@/components/ui/PageHero";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import ClosingCta from "@/components/ui/ClosingCta";
import { galleryItems } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gallery — Bridal, Hair & Skin Work",
  description:
    "Explore a curated gallery of bridal artistry, colour work, skin rituals and moments inside Luxury Salon — a luxury salon in Masuri, Meerut.",
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "Gallery — Luxury Salon, The Beauty Atelier",
    description:
      "A curated book of bridal, hair and skin work from the Luxury Salon atelier in Masuri, Meerut.",
    url: "/gallery",
    images: ["/images/gallery/01-veil.webp"],
  },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        chapter="Gallery"
        label="Selected Work"
        lines={[
          "A book of",
          <em key="days" className="italic text-gold-light">
            beautiful days.
          </em>,
        ]}
        description="Bridal portraits, colour studies and quiet moments from the atelier. Every face is different; every finish is made for the person in the chair."
        image="veil"
        imageAlt="Bride in a gold veil and traditional jewellery, styled at Luxury Salon"
        meta={[
          { label: "Selected works", value: `${galleryItems.length} images` },
          { label: "Focus", value: "Bridal · Hair · Skin" },
          { label: "Updated", value: "Seasonally" },
        ]}
      />

      <GalleryGrid items={galleryItems} />

      <ClosingCta
        eyebrow="Your turn"
        lines={[
          "Seen something",
          <em key="love" className="italic text-gold-deep">
            you love?
          </em>,
        ]}
        description="Save the image, bring it to your consultation, and we will translate the feeling for your hair, skin tone and the occasion."
      />
    </>
  );
}
