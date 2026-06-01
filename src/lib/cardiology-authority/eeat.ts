import type { EeatMeta } from "@/lib/cardiology-authority/types";

export const CARDIOLOGY_RECRUITER = {
  name: "Matthew Fuller",
  role: "Cardiology Locum Tenens Recruiter",
  bio: "Matthew Fuller recruits board-certified cardiologists for locum tenens assignments nationwide. He focuses on documented call, cath lab scope, privileging timelines, and transparent compensation drivers—not generic job-board blasts.",
  credentials: "Physician recruiting · Cardiology subspecialty placement · Locum tenens credentialing coordination",
} as const;

export const MEDICAL_REVIEWER = {
  name: "Locum Career Hub Editorial Review",
  credentials: "Cardiology career content reviewed for physician-facing accuracy, YMYL compliance, and recruiter-disclosure clarity",
} as const;

const DEFAULT_SOURCES = [
  { label: "American College of Cardiology (ACC)", href: "https://www.acc.org/" },
  { label: "American Heart Association (AHA)", href: "https://www.heart.org/" },
  { label: "American Board of Internal Medicine (ABIM) — Cardiovascular Disease", href: "https://www.abim.org/" },
] as const;

export function defaultEeatMeta(lastUpdated = "2026-06-01"): EeatMeta {
  return {
    author: CARDIOLOGY_RECRUITER.name,
    authorRole: CARDIOLOGY_RECRUITER.role,
    reviewer: MEDICAL_REVIEWER.name,
    reviewerCredentials: MEDICAL_REVIEWER.credentials,
    lastUpdated,
    sources: [...DEFAULT_SOURCES],
  };
}

export const EDITORIAL_POLICY = {
  title: "Editorial Policy",
  path: "/editorial-policy",
  description:
    "How Locum Career Hub creates cardiologist-focused locum tenens content—accuracy standards, recruiter disclosures, and YMYL compliance.",
};

export const CONTENT_REVIEW_POLICY = {
  title: "Content Review Policy",
  path: "/content-review-policy",
  description:
    "Our process for reviewing cardiology career and locum tenens content for physician accuracy, clarity, and ethical recruiting standards.",
};
