"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/core/utils/cn";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={item.question}
            className="rounded-2xl border border-charcoal/10 bg-white"
          >
            <button
              type="button"
              onClick={() => setActiveIndex(isActive ? null : index)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left"
              aria-expanded={isActive}
            >
              <span className="font-semibold text-charcoal">
                {item.question}
              </span>

              <ChevronDown
                size={20}
                className={cn(
                  "shrink-0 transition-transform",
                  isActive && "rotate-180"
                )}
              />
            </button>

            {isActive && (
              <div className="px-5 pb-5 text-sm leading-6 text-charcoal/70">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}