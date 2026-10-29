import { Plus } from "lucide-react";

type FaqListProps = {
  items: readonly { q: string; a: string }[];
};

export default function FaqList({ items }: FaqListProps) {
  return (
    <div className="border-t border-ink/10">
      {items.map((item) => (
        <details key={item.q} className="group border-b border-ink/10">
          <summary className="flex cursor-pointer items-start justify-between gap-6 py-5 focus-visible:outline-offset-4 md:py-6">
            <span className="text-[0.92rem] leading-relaxed text-ink/80 transition-colors group-hover:text-ink md:text-[0.98rem]">
              {item.q}
            </span>
            <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center border border-ink/15 text-ink/45 transition-colors duration-300 group-open:border-gold-deep group-open:text-gold-deep">
              <Plus
                aria-hidden="true"
                className="faq-icon size-3.5 transition-transform duration-300"
                strokeWidth={1.5}
              />
            </span>
          </summary>
          <div className="pb-6 pr-10">
            <p className="max-w-2xl text-sm leading-[1.85] text-ink/55">
              {item.a}
            </p>
          </div>
        </details>
      ))}
    </div>
  );
}
