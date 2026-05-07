import { cn } from "@/core/utils/cn";

type SectionHeaderProps = {
  title: string;
  subtitle?: string;
  description?: string;
  centered?: boolean;
  className?: string;
};

export function SectionHeader({
  title,
  subtitle,
  description,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <header
      className={cn(
        "mb-12",
        centered && "text-center",
        className
      )}
    >
      {subtitle && (
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-bronze">
          {subtitle}
        </p>
      )}

      <h2 className="mt-3 font-heading text-4xl font-bold text-charcoal md:text-5xl">
        {title}
      </h2>

      {description && (
        <p className="mt-5 max-w-2xl text-lg text-charcoal/70 leading-relaxed">
          {description}
        </p>
      )}
    </header>
  );
}