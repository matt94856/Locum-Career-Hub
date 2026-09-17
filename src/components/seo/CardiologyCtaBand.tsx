import { LeadConversionBand } from "@/components/sections/LeadConversionBand";

export type CtaVariant =
  | "recruiter"
  | "opportunities"
  | "salary"
  | "compare";

const VARIANTS: Record<CtaVariant, { headline: string; subline: string }> = {
  recruiter: {
    headline: "Let’s find the right locum block",
    subline: "Work that pays well, on a schedule you control. Cardiologists only.",
  },
  opportunities: {
    headline: "See locum blocks that actually fit",
    subline: "Documented coverage—not a job-board blast.",
  },
  salary: {
    headline: "Want pay context for your subspecialty?",
    subline: "Directional drivers and stipends—not a guaranteed rate on a webpage.",
  },
  compare: {
    headline: "Compare locum vs employed",
    subline: "Call, cath lab, and credentialing—before you decide.",
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
