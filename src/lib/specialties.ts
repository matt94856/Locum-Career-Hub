export const SPECIALTIES = [
  "Hospitalist Medicine",
  "Emergency Medicine",
  "Anesthesiology & CRNA",
  "Family Medicine",
  "Internal Medicine",
  "Psychiatry",
  "Radiology",
  "Surgery & Orthopedics",
  "OB/GYN",
  "Pediatrics",
  "Cardiology",
  "Urgent Care",
  "Telehealth",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];
