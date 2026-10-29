import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import FeaturedLooks from "@/components/home/FeaturedLooks";
import GalleryPreview from "@/components/home/GalleryPreview";
import Reviews from "@/components/home/Reviews";
import BookingCta from "@/components/home/BookingCta";
import VisitStrip from "@/components/home/VisitStrip";
import Marquee from "@/components/ui/Marquee";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const marqueeItems = [
  "Hair Artistry",
  "Skin Rituals",
  "Bridal Couture",
  "Considered Colour",
  "Private Appointments",
  "Masuri · Meerut",
];

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <Marquee items={marqueeItems} light />
      <AboutPreview />
      <ServicesPreview />
      <FeaturedLooks />
      <GalleryPreview />
      <Reviews />
      <BookingCta />
      <VisitStrip />
    </>
  );
}
