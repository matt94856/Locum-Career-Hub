/** Cardiology subspecialties — only populations we recruit (MD/DO cardiologists). */
export const CARDIOLOGY_SUBSPECIALTIES = [
  "General Cardiology",
  "Interventional Cardiology",
  "Electrophysiology",
  "Heart Failure",
  "Advanced Imaging",
  "Structural Heart",
  "Preventive Cardiology",
  "Pediatric Cardiology",
] as const;

export type CardiologySubspecialty = (typeof CARDIOLOGY_SUBSPECIALTIES)[number];

/** @deprecated Use CARDIOLOGY_SUBSPECIALTIES — kept for imports during migration. */
export const SPECIALTIES = CARDIOLOGY_SUBSPECIALTIES;

export type Specialty = CardiologySubspecialty;

export const CARDIOLOGY_PARENT_LABEL = "Cardiology" as const;
