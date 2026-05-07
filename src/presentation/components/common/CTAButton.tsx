import Link from "next/link";
import { cn } from "@/core/utils/cn";

type CTAButtonProps = {
  href?: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
  type?: "button" | "submit";
};

export function CTAButton({
  href,
  children,
  variant = "primary",
  className,
  type = "button",
}: CTAButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-savannah/70 focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal",
    variant === "primary" &&
      "bg-forest text-ivory hover:bg-olive shadow-lg shadow-forest/20",
    variant === "secondary" &&
      "bg-savannah text-charcoal hover:bg-bronze hover:text-ivory",
    variant === "outline" &&
      "border border-forest text-forest hover:bg-forest hover:text-ivory",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
}