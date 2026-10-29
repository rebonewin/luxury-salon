import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  className?: string;
  light?: boolean;
};

export default function Marquee({
  items,
  className,
  light = false,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "marquee overflow-hidden border-y py-5",
        light
          ? "border-ink/10 bg-cream text-ink"
          : "border-cream/10 bg-ink text-cream",
        className,
      )}
      aria-label={items.join(" · ")}
    >
      <div className="animate-marquee flex w-max items-center">
        {[0, 1].map((group) => (
          <div
            key={group}
            aria-hidden={group === 1}
            className="flex shrink-0 items-center"
          >
            {items.map((item, index) => (
              <span
                key={`${group}-${item}-${index}`}
                className="flex items-center"
              >
                <span className="whitespace-nowrap px-7 font-display text-[1.15rem] tracking-[0.02em] md:px-10 md:text-[1.35rem]">
                  {item}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "size-1.5 rotate-45",
                    light ? "bg-gold-deep/70" : "bg-gold",
                  )}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
