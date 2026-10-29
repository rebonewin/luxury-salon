import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type ButtonVariant =
  | "gold"
  | "dark"
  | "light"
  | "outline"
  | "ghost"
  | "text"
  | "text-light";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  arrow?: boolean;
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "group inline-flex items-center justify-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.2em] transition-colors duration-500";

const variants: Record<ButtonVariant, string> = {
  gold: "bg-gold px-7 py-4 text-ink hover:bg-gold-light",
  dark: "bg-ink px-7 py-4 text-cream hover:bg-gold hover:text-ink",
  light:
    "border border-cream/35 px-7 py-4 text-cream hover:bg-cream hover:text-ink",
  outline:
    "border border-ink/25 px-7 py-4 text-ink hover:bg-ink hover:text-cream",
  ghost: "px-0 py-1 text-ink hover:text-gold-deep",
  text: "link-line px-0 py-1 text-ink hover:text-gold-deep",
  "text-light": "link-line px-0 py-1 text-cream hover:text-gold-light",
};

export default function ButtonLink({
  href,
  children,
  variant = "gold",
  className,
  arrow = true,
  external = false,
  ariaLabel,
}: ButtonLinkProps) {
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow ? (
        <ArrowUpRight
          aria-hidden="true"
          className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={1.5}
        />
      ) : null}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        aria-label={ariaLabel}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
