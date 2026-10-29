import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Reveal from "@/components/ui/Reveal";
import SplitHeading from "@/components/ui/SplitHeading";

type SectionHeadingProps = {
  chapter: string;
  label: string;
  lines: ReactNode[];
  description?: string;
  light?: boolean;
  align?: "left" | "center";
  className?: string;
  headingClassName?: string;
  children?: ReactNode;
};

export default function SectionHeading({
  chapter,
  label,
  lines,
  description,
  light = false,
  align = "left",
  className,
  headingClassName,
  children,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col",
        centered && "items-center text-center",
        className,
      )}
    >
      <Reveal className={cn("w-full", centered && "flex justify-center")}>
        <div
          className={cn(
            "flex items-center gap-4",
            light ? "text-gold-light" : "text-gold-deep",
          )}
        >
          <span className="eyebrow">{chapter}</span>
          <span
            className={cn(
              "h-px w-10",
              light ? "bg-gold-light/50" : "bg-gold-deep/40",
            )}
          />
          <span
            className={cn(
              "eyebrow",
              light ? "text-cream/60" : "text-stone",
            )}
          >
            {label}
          </span>
        </div>
      </Reveal>

      <SplitHeading
        lines={lines}
        className={cn(
          "mt-7 max-w-4xl font-display text-[clamp(2.6rem,5.8vw,5.8rem)] leading-[0.97]",
          light ? "text-cream" : "text-ink",
          centered && "mx-auto",
          headingClassName,
        )}
      />

      {description ? (
        <Reveal delay={0.12} className={cn("mt-7", centered && "mx-auto")}>
          <p
            className={cn(
              "max-w-xl text-[0.95rem] leading-[1.8]",
              light ? "text-cream/60" : "text-ink/60",
            )}
          >
            {description}
          </p>
        </Reveal>
      ) : null}

      {children ? (
        <Reveal delay={0.2} className={cn("mt-9", centered && "mx-auto")}>
          {children}
        </Reveal>
      ) : null}
    </div>
  );
}
