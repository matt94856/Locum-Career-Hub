type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center" }: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-3xl ${alignCls}`}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">{eyebrow}</p>
      ) : null}
      <h2 className="mt-3 font-display text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p
          className={`mt-3 text-sm leading-relaxed text-slate-600 sm:mt-4 sm:text-base ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
