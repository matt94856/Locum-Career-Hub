import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600 disabled:pointer-events-none disabled:opacity-50";

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
  className = "",
  ...props
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = `${base} ${variants[variant]} ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }

  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
