import type { ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50 rounded-full";

const sizes: Record<Size, string> = {
  sm: "min-h-9 px-3.5 py-2 text-xs",
  md: "min-h-11 px-4 py-2.5 text-sm",
  lg: "min-h-12 px-5 py-3 text-sm",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-600 text-white shadow-sm hover:bg-brand-700 active:bg-brand-800",
  secondary:
    "border border-slate-200 bg-white text-slate-900 shadow-sm hover:border-brand-200 hover:bg-brand-50",
  ghost: "text-slate-700 hover:bg-slate-100",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  title,
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  title?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`.trim();

  if (href) {
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={cls} title={title}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer" title={title}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} title={title} {...props}>
      {children}
    </button>
  );
}
