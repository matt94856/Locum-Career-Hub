import type { ArticleBlock } from "@/lib/blog-types";

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="article-body space-y-6">
      {blocks.map((block, idx) => {
        const key = `${idx}-${block.type}`;
        switch (block.type) {
          case "p":
            return (
              <p key={key} className="text-base leading-relaxed text-slate-700">
                {block.text}
              </p>
            );
          case "h2":
            return (
              <h2
                key={key}
                className="scroll-mt-24 pt-4 font-display text-2xl font-semibold tracking-tight text-slate-950"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={key} className="pt-2 font-display text-lg font-semibold tracking-tight text-slate-900">
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={key} className="list-disc space-y-2 pl-5 text-base leading-relaxed text-slate-700">
                {block.items.map((item, li) => (
                  <li key={`${key}-li-${li}`}>{item}</li>
                ))}
              </ul>
            );
          case "callout": {
            const styles =
              block.variant === "legal"
                ? "border-slate-200 bg-slate-50 text-slate-700"
                : "border-brand-100 bg-brand-50/60 text-slate-800";
            return (
              <aside
                key={key}
                className={`rounded-2xl border p-5 text-sm leading-relaxed ${styles}`}
                aria-label={block.title}
              >
                <p className="font-semibold text-slate-900">{block.title}</p>
                <p className="mt-2">{block.text}</p>
              </aside>
            );
          }
          default:
            return null;
        }
      })}
    </div>
  );
}
