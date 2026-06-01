import { LeadConversionBand } from "@/components/sections/LeadConversionBand";

export type CtaVariant =
  | "recruiter"
  | "opportunities"
  | "salary"
  | "compare";

const VARIANTS: Record<CtaVariant, { headline: string; subline: string }> = {
  recruiter: {
    headline: "Talk with a cardiology recruiter",
    subline: "Share subspecialty, states, and boundaries—cardiologist-only follow-up within one business day.",
  },
  opportunities: {
    headline: "Explore current cardiology opportunities",
    subline: "We match documented locum blocks—not generic job-board blasts.",
  },
  salary: {
    headline: "Request salary context for your subspecialty",
    subline: "Directional pay drivers and stipends—never guaranteed rates on a webpage.",
  },
  compare: {
    headline: "Compare locum and permanent cardiology options",
    subline: "Structured questions on call, cath lab scope, and credentialing before you decide.",
  },
};

type Props = {
  variant?: CtaVariant;
  className?: string;
};

/** Phase 9 conversion bands with physician-focused copy variants. */
export function CardiologyCtaBand({ variant = "recruiter", className = "" }: Props) {
  const copy = VARIANTS[variant];
  return <LeadConversionBand headline={copy.headline} subline={copy.subline} className={className} />;
}
