type Props = {
  answer: string;
  className?: string;
};

/** Phase 4 — concise answer-first block for AI and featured snippets. */
export function AnswerFirstBlock({ answer, className = "" }: Props) {
  return (
    <p
      className={`rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg ${className}`.trim()}
    >
      <span className="text-brand-800">Direct answer: </span>
      {answer}
    </p>
  );
}
