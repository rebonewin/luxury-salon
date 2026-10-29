"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useLenis } from "@/components/layout/SmoothScroll";
import { img } from "@/lib/images";
import type { GalleryItem } from "@/lib/site";

type LightboxProps = {
  items: GalleryItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({
  items,
  index,
  onClose,
  onNavigate,
}: LightboxProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);
  const lenis = useLenis();
  const reduce = useReducedMotion();

  const item = items[index];
  const asset = img(item.image);

  const goPrevious = useCallback(() => {
    onNavigate((index - 1 + items.length) % items.length);
  }, [index, items.length, onNavigate]);

  const goNext = useCallback(() => {
    onNavigate((index + 1) % items.length);
  }, [index, items.length, onNavigate]);

  useEffect(() => {
    restoreRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      restoreRef.current?.focus?.();
    };
  }, [lenis]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goPrevious();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "Tab") {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable || focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrevious, onClose]);

  return (
    <motion.div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.title}, fullscreen gallery viewer`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[200] flex flex-col bg-ink/95 text-cream backdrop-blur-md"
    >
      <div className="flex items-center justify-between border-b border-cream/10 px-4 py-4 md:px-8">
        <div className="flex items-baseline gap-3">
          <span className="eyebrow text-[0.55rem] text-gold-light">
            {item.category}
          </span>
          <span className="text-[0.58rem] font-medium tracking-[0.16em] text-cream/40">
            {String(index + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close fullscreen gallery"
          className="flex size-11 items-center justify-center border border-cream/25 text-cream transition-colors duration-300 hover:border-gold hover:bg-gold hover:text-ink"
        >
          <X aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-3 py-5 md:px-20 md:py-8"
        onClick={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
        <button
          type="button"
          onClick={goPrevious}
          aria-label="Previous image"
          className="absolute left-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-cream/25 bg-ink/40 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-ink md:left-6 md:size-12"
        >
          <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={item.image}
            initial={reduce ? false : { opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-full w-full max-w-5xl"
          >
            <Image
              src={asset.src}
              alt={item.alt}
              fill
              sizes="(min-width: 1024px) 80vw, 100vw"
              quality={82}
              placeholder="blur"
              blurDataURL={asset.blurDataURL}
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          aria-label="Next image"
          className="absolute right-2 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center border border-cream/25 bg-ink/40 text-cream backdrop-blur-sm transition-colors hover:border-gold hover:bg-gold hover:text-ink md:right-6 md:size-12"
        >
          <ArrowRight aria-hidden="true" className="size-4" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-4 border-t border-cream/10 px-4 py-4 sm:flex-row sm:items-end sm:justify-between md:px-8">
        <div>
          <h3 className="font-display text-2xl leading-tight">{item.title}</h3>
          <p className="mt-1 max-w-xl text-xs leading-relaxed text-cream/45">
            {item.alt}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4 sm:justify-end">
          <p className="eyebrow text-[0.48rem] text-cream/30">
            <span className="sm:hidden">Tap the arrows to browse</span>
            <span className="hidden sm:inline">
              Use ← → to browse · Esc to close
            </span>
          </p>
          <div className="flex items-center gap-2 sm:hidden">
            <button
              type="button"
              onClick={goPrevious}
              aria-label="Previous image"
              className="flex size-10 items-center justify-center border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold-light"
            >
              <ArrowLeft
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.5}
              />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next image"
              className="flex size-10 items-center justify-center border border-cream/25 text-cream transition-colors hover:border-gold hover:text-gold-light"
            >
              <ArrowRight
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
