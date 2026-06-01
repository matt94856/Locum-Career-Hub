/** Redirect map for next.config — no `@/` imports. */
const LEGACY_SPECIALTY_TO_PATH: [string, string][] = [
  ["general-cardiology", "general"],
  ["interventional-cardiology", "interventional"],
  ["electrophysiology", "electrophysiology"],
  ["heart-failure", "heart-failure"],
  ["advanced-imaging", "cardiac-imaging"],
  ["structural-heart", "structural-heart"],
  ["preventive-cardiology", "preventive-cardiology"],
  ["pediatric-cardiology", "pediatric-cardiology"],
  ["adult-congenital-cardiology", "adult-congenital"],
];

export function buildCardiologyLocumJobsUrlRedirects() {
  const hubRedirects = [
    { source: "/cardiology-locum-jobs", destination: "/locum-jobs/cardiology", permanent: true as const },
    { source: "/specialties", destination: "/locum-jobs/cardiology", permanent: true as const },
  ];

  const specialtyRedirects = LEGACY_SPECIALTY_TO_PATH.flatMap(([legacy, path]) => [
    {
      source: `/specialties/${legacy}`,
      destination: `/locum-jobs/cardiology/${path}`,
      permanent: true as const,
    },
    {
      source: `/locum-${legacy}-jobs`,
      destination: `/locum-jobs/cardiology/${path}`,
      permanent: true as const,
    },
  ]);

  return [...hubRedirects, ...specialtyRedirects];
}

export function cardiologyGeneralPathRedirect() {
  return "/locum-jobs/cardiology/general" as const;
}
