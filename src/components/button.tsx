import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.95rem] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-fir text-on-fir shadow-[inset_0_-2px_0_rgb(0_0_0/0.18)] hover:bg-fir-strong hover:shadow-[inset_0_-2px_0_rgb(0_0_0/0.18),0_0_0_4px_var(--marker)]",
  secondary:
    "border border-rule-strong text-ink hover:border-ink hover:bg-surface",
  ghost: "text-ink underline-offset-4 hover:underline",
};

export function buttonClasses(variant: Variant = "primary", extra = "") {
  return `${base} ${variants[variant]} ${extra}`;
}

export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClasses(variant, className)} {...props} />;
}
