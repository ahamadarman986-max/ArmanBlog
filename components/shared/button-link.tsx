import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ className, variant = "primary", ...props }: ButtonLinkProps) {
  return (
    <Link
      className={cn(
        "focus-ring inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition",
        variant === "primary" && "bg-ink text-white hover:bg-gold dark:bg-white dark:text-ink",
        variant === "secondary" && "border border-black/10 bg-white text-ink hover:border-gold hover:text-gold dark:border-white/10 dark:bg-white/5 dark:text-white",
        variant === "ghost" && "text-ink hover:text-gold dark:text-white",
        className
      )}
      {...props}
    />
  );
}
