type Props = {
  answer: string;
  className?: string;
  /** Optional speakable CSS selector id for schema SpeakableSpecification */
  speakableId?: string;
};

/** Answer-first block optimized for featured snippets and AI overview grounding. */
export function AnswerFirstBlock({ answer, className = "", speakableId = "direct-answer" }: Props) {
  return (
    <p
      id={speakableId}
      data-speakable="true"
      itemProp="abstract"
      className={`rounded-2xl border border-brand-100 bg-white/90 p-4 text-base font-medium leading-relaxed text-slate-800 shadow-sm sm:p-5 sm:text-lg ${className}`.trim()}
    >
      <span className="text-brand-800">Direct answer: </span>
      {answer}
    </p>
  );
}
