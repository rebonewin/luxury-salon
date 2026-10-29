"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, MapPin, MessageCircle, Phone } from "lucide-react";
import { navLinks, site, whatsappHref } from "@/lib/site";
import { useLenis } from "@/components/layout/SmoothScroll";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 32);
      setProgress(scrollable > 0 ? Math.min(1, window.scrollY / scrollable) : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  useEffect(() => {
    const closeMenu = () => setOpen(false);
    window.addEventListener("popstate", closeMenu);
    return () => window.removeEventListener("popstate", closeMenu);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      lenis?.start();
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, lenis]);

  const solid = scrolled && !open;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[80] transition-[background-color,color,border-color,backdrop-filter] duration-500",
        solid
          ? "border-b border-ink/10 bg-cream-light/95 text-ink backdrop-blur-md"
          : "border-b border-transparent bg-transparent text-cream",
      )}
    >
      <div
        className={cn(
          "shell flex items-center justify-between transition-[height] duration-500",
          solid ? "h-16 lg:h-[4.5rem]" : "h-20 lg:h-24",
        )}
      >
        <Link
          href="/"
          className="group flex shrink-0 flex-col leading-none"
          aria-label="Luxury Salon — return to the home page"
        >
          <span className="font-display text-[1.5rem] tracking-[0.16em] transition-colors duration-500 group-hover:text-gold sm:text-[1.65rem]">
            LUXURY
          </span>
          <span className="mt-1.5 text-[0.46rem] font-medium uppercase tracking-[0.34em] opacity-55">
            The Beauty Atelier
          </span>
        </Link>

        <nav
          aria-label="Primary navigation"
          className="hidden items-center gap-8 lg:flex xl:gap-11"
        >
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "eyebrow relative py-2 transition-colors duration-300",
                  active
                    ? solid
                      ? "text-gold-deep"
                      : "text-gold-light"
                    : "hover:text-gold",
                )}
              >
                {link.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rotate-45 bg-gold transition-opacity duration-300",
                    active ? "opacity-100" : "opacity-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <a
            href={site.phoneHref}
            className="eyebrow hidden items-center gap-2 transition-colors duration-300 hover:text-gold xl:inline-flex"
          >
            <Phone aria-hidden="true" className="size-3" strokeWidth={1.5} />
            {site.phoneDisplay}
          </a>
          <Link
            href="/contact#booking"
            className={cn(
              "group inline-flex items-center gap-2.5 px-5 py-3 text-[0.62rem] font-medium uppercase tracking-[0.22em] transition-colors duration-500",
              solid
                ? "bg-ink text-cream hover:bg-gold hover:text-ink"
                : "bg-cream text-ink hover:bg-gold",
            )}
          >
            Book now
            <ArrowUpRight
              aria-hidden="true"
              className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="relative flex size-11 items-center justify-center lg:hidden"
        >
          <span className="flex w-6 flex-col gap-[7px]">
            <span
              className={cn(
                "h-px w-full bg-current transition-transform duration-300",
                open && "translate-y-[4px] rotate-45",
              )}
            />
            <span
              className={cn(
                "h-px w-full bg-current transition-transform duration-300",
                open && "-translate-y-[4px] -rotate-45",
              )}
            />
          </span>
        </button>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
      />
    </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain bg-ink text-cream lg:hidden"
            data-lenis-prevent
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 opacity-70"
              style={{
                background:
                  "radial-gradient(120% 70% at 85% 0%, rgba(173,135,82,0.22), transparent 55%)",
              }}
            />
            <div className="shell relative flex min-h-[100svh] flex-col pb-10 pt-28">
              <p className="eyebrow text-gold-light/70">Menu</p>

              <nav
                aria-label="Mobile navigation"
                className="mt-5 flex flex-col border-t border-cream/10"
              >
                {navLinks.map((link, index) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 22 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.55,
                        delay: 0.06 + index * 0.045,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className="group flex items-baseline justify-between border-b border-cream/10 py-[1.05rem]"
                      >
                        <span
                          className={cn(
                            "font-display text-[clamp(2.3rem,10vw,3.4rem)] leading-none transition-colors duration-300",
                            active
                              ? "text-gold-light"
                              : "text-cream group-hover:text-gold-light",
                          )}
                        >
                          {link.label}
                        </span>
                        <span className="eyebrow text-[0.55rem] text-cream/35">
                          0{index + 1}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.34 }}
                className="mt-auto grid gap-7 pt-10 text-cream/70"
              >
                <div className="flex flex-wrap gap-x-8 gap-y-3">
                  <a
                    href={site.phoneHref}
                    className="inline-flex items-center gap-2.5 text-sm transition-colors hover:text-gold-light"
                  >
                    <Phone
                      aria-hidden="true"
                      className="size-3.5 text-gold"
                      strokeWidth={1.5}
                    />
                    {site.phoneDisplay}
                  </a>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm transition-colors hover:text-gold-light"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      className="size-3.5 text-gold"
                      strokeWidth={1.5}
                    />
                    WhatsApp
                  </a>
                </div>

                <a
                  href={site.maps.directions}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-xs items-start gap-2.5 text-sm leading-relaxed transition-colors hover:text-gold-light"
                >
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 size-3.5 shrink-0 text-gold"
                    strokeWidth={1.5}
                  />
                  {site.address.full}
                </a>

                <div className="border-t border-cream/10 pt-5">
                  <p className="eyebrow text-[0.55rem] text-cream/35">Hours</p>
                  <p className="mt-2 text-sm">{site.hours[0].days} · {site.hours[0].time}</p>
                  <p className="mt-1 text-sm text-cream/45">
                    {site.hours[1].days} · By appointment
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
