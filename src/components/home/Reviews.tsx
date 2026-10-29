"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, Star } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { reviews } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Reviews() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const review = reviews[index];

  useEffect(() => {
    if (paused || reduce) return;

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % reviews.length);
    }, 8500);

    return () => window.clearInterval(timer);
  }, [paused, reduce, index]);

  const previous = () =>
    setIndex((current) => (current - 1 + reviews.length) % reviews.length);
  const next = () => setIndex((current) => (current + 1) % reviews.length);

  return (
    <section className="relative overflow-hidden bg-cream py-24 md:py-32">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-6 top-6 select-none font-display text-[26rem] leading-none text-ink/[0.035]"
      >
        “
      </span>

      <div className="shell relative">
        <div className="flex flex-col gap-9 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            chapter="05"
            label="Kind Words"
            lines={[
              "Said with",
              <em key="confidence" className="italic text-gold-deep">
                confidence.
              </em>,
            ]}
            description="The measure of our work is how you feel when you leave. These are a few notes from guests who have trusted us with their hair, skin and biggest days."
            className="max-w-2xl"
          />

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={previous}
              aria-label="Previous review"
              className="flex size-11 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              <ArrowLeft aria-hidden="true" className="size-4" strokeWidth={1.4} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next review"
              className="flex size-11 items-center justify-center border border-ink/20 text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-cream"
            >
              <ArrowRight
                aria-hidden="true"
                className="size-4"
                strokeWidth={1.4}
              />
            </button>
          </div>
        </div>

        <div className="mt-12 grid gap-10 border-t border-ink/10 pt-10 lg:grid-cols-[0.28fr_1fr] lg:gap-20">
          <div className="flex flex-col justify-between gap-9">
            <div>
              <p className="font-display text-4xl text-ink">
                0{index + 1}
                <span className="text-ink/50"> / 0{reviews.length}</span>
              </p>
              <div className="mt-5 flex gap-1.5">
                {reviews.map((item, itemIndex) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setIndex(itemIndex)}
                    aria-label={`Read review ${itemIndex + 1} by ${item.name}`}
                    aria-current={itemIndex === index ? "true" : undefined}
                    className={cn(
                      "h-px w-7 transition-all duration-500",
                      itemIndex === index
                        ? "bg-gold-deep"
                        : "bg-ink/15 hover:bg-ink/35",
                    )}
                  />
                ))}
              </div>
            </div>
            <p className="hidden max-w-[13rem] text-[0.58rem] font-medium uppercase leading-[1.9] tracking-[0.16em] text-stone lg:block">
              Unedited notes from our guests, shared with permission.
            </p>
          </div>

          <div
            className="flex min-h-[18rem] items-center md:min-h-[21rem]"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
            aria-live="polite"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.blockquote
                key={index}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="w-full"
              >
                <div
                  className="flex gap-1 text-gold-deep"
                  role="img"
                  aria-label="Rated 5 out of 5"
                >
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      aria-hidden="true"
                      className="size-3"
                      fill="currentColor"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                <p className="mt-5 font-display text-[clamp(1.6rem,3.1vw,2.8rem)] leading-[1.32] tracking-[-0.01em] text-ink">
                  <span aria-hidden="true" className="text-gold-deep">
                    “
                  </span>
                  {review.quote}
                  <span aria-hidden="true" className="text-gold-deep">
                    ”
                  </span>
                </p>

                <footer className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <cite className="flex items-center gap-4 not-italic">
                    <span
                      aria-hidden="true"
                      className="flex size-10 items-center justify-center rounded-full border border-gold-deep/30 font-display text-sm text-gold-deep"
                    >
                      {review.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-medium text-ink">
                        {review.name}
                      </span>
                      <span className="mt-0.5 block text-[0.55rem] font-medium uppercase tracking-[0.16em] text-stone">
                        {review.service}
                      </span>
                    </span>
                  </cite>
                  <span className="h-px flex-1 bg-ink/10" />
                  <span className="eyebrow text-[0.52rem] text-stone">
                    Verified guest
                  </span>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
