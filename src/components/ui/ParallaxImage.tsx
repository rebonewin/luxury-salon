"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { img, type ImageKey } from "@/lib/images";
import { cn } from "@/lib/utils";

type ParallaxImageProps = {
  asset: ImageKey;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  strength?: number;
  preload?: boolean;
  quality?: 75 | 82;
};

export default function ParallaxImage({
  asset,
  alt,
  className,
  imageClassName,
  sizes = "(min-width: 1024px) 45vw, 100vw",
  strength = 10,
  preload = false,
  quality = 82,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const src = img(asset);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const frame = frameRef.current;
    const image = imageRef.current;
    if (!frame || !image) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        image,
        { yPercent: -strength / 2 },
        {
          yPercent: strength / 2,
          ease: "none",
          scrollTrigger: {
            trigger: frame,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    }, frame);

    return () => context.revert();
  }, [strength]);

  return (
    <div
      ref={frameRef}
      className={cn("relative overflow-hidden bg-sand", className)}
    >
      <Image
        ref={imageRef}
        src={src.src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        preload={preload}
        placeholder="blur"
        blurDataURL={src.blurDataURL}
        className={cn(
          "scale-[1.16] object-cover will-change-transform",
          imageClassName,
        )}
      />
    </div>
  );
}
