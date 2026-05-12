export type FaqItem = { q: string; a: string };

export const HOME_FAQ: FaqItem[] = [
  {
    q: "I am burned out, but I am not sure I want locums. Is it okay to reach out?",
    a: "Yes. Many physicians start by describing what feels broken—schedule, autonomy, politics, income pressure—and we explore options together. Locum tenens is one tool; it is not a requirement to have a useful conversation.",
  },
  {
    q: "What is locum tenens—in plain language?",
    a: "Contract clinical coverage that helps facilities stay staffed while giving physicians clearer time boundaries, travel optionality, and often less standing administrative load than traditional employed roles.",
  },
  {
    q: "How quickly can I start?",
    a: "Timelines vary by credentialing and privilege requirements. Many physicians begin within weeks for straightforward placements; complex sites may take longer. We map realistic dates up front.",
  },
  {
    q: "Do you support licensing and credentialing?",
    a: "Yes. Our team coordinates licensing workflows, payer enrollment when applicable, and privileging packets so you can focus on patient care—not paperwork.",
  },
  {
    q: "Can I choose my schedule?",
    a: "Absolutely. We prioritize blocks that match your availability—week-on/week-off, weekends-only moonlighting, seasonal coverage, or gradual retirement schedules.",
  },
  {
    q: "Is locums a fit if I am burned out?",
    a: "It can be—for some clinicians, short blocks reduce chronic overload while they stabilize. Fit depends on volume, culture, and what you need clinically. We prioritize sustainable pacing over “just take more shifts.”",
  },
];

export const FAQ_PAGE: FaqItem[] = [
  ...HOME_FAQ,
  {
    q: "How does compensation work?",
    a: "You typically receive weekly or biweekly payments with transparent rate cards. We discuss stipends, travel, lodging, and malpractice coverage before you commit.",
  },
  {
    q: "Can I work locums while employed full-time?",
    a: "Often yes, depending on your employment agreement and non-compete terms. We recommend a quick review with counsel; we then align moonlighting shifts that stay compliant.",
  },
  {
    q: "What malpractice coverage is provided?",
    a: "Most assignments include facility-provided or agency-arranged malpractice insurance. Details are confirmed in writing prior to your start date.",
  },
];
