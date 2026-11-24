import Link from "next/link";

export const INQUIRY_PRIVACY_GUARANTEE =
  "Your information is secure and never shared.";

type Tone = "light" | "dark";

type Props = {
  className?: string;
  tone?: Tone;
  /** Compact one-line version for tight job cards. */
  compact?: boolean;
};

function LockIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M6.25 8.5V6.75a3.75 3.75 0 0 1 7.5 0V8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <rect
        x="4.25"
        y="8.5"
        width="11.5"
        height="8.25"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

export function InquiryPrivacyGuarantee({
  className = "",
  tone = "light",
  compact = false,
}: Props) {
  const isDark = tone === "dark";
  const text = isDark ? "text-slate-300" : "text-slate-600";
  const strong = isDark ? "text-white" : "text-slate-900";
  const link = isDark
    ? "font-semibold text-brand-200 hover:underline"
    : "font-semibold text-brand-700 hover:underline";
  const icon = isDark ? "text-brand-200" : "text-brand-700";

  return (
    <p
      className={`flex items-start gap-2 text-xs leading-relaxed ${text} ${className}`.trim()}
      data-inquiry-privacy-guarantee=""
    >
      <LockIcon className={`mt-0.5 size-4 shrink-0 ${icon}`} />
      <span>
        <strong className={`font-semibold ${strong}`}>Guarantee:</strong>{" "}
        {INQUIRY_PRIVACY_GUARANTEE}
        {compact ? null : " We never sell your details or pass them to other staffing firms."}{" "}
        <Link href="/privacy" className={link}>
          Privacy Policy
        </Link>
        .
      </span>
    </p>
  );
}
