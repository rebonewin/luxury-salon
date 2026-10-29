"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type SplitHeadingProps = {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  once?: boolean;
  trigger?: "mount" | "view";
};

export default function SplitHeading({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  once = true,
  trigger = "view",
}: SplitHeadingProps) {
  const reduce = useReducedMotion();
  const Tag = as as ElementType;

  return (
    <Tag className={cn(className)}>
      {lines.map((line, index) => (
        <motion.span
          key={index}
          className={cn(
            "block overflow-hidden pb-[0.08em] -mb-[0.08em]",
            lineClassName,
          )}
          initial={reduce ? false : "hidden"}
          animate={
            reduce
              ? "visible"
              : trigger === "mount"
                ? "visible"
                : undefined
          }
          whileInView={
            reduce || trigger === "mount" ? undefined : "visible"
          }
          viewport={{ once, amount: 0.4 }}
        >
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "112%" },
              visible: {
                y: "0%",
                transition: {
                  duration: reduce ? 0 : 1.05,
                  delay: reduce ? 0 : delay + index * 0.09,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
          >
            {line}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}
