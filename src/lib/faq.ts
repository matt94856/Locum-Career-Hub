export type FaqItem = { q: string; a: string };

export const HOME_FAQ: FaqItem[] = [
  {
    q: "What is locum tenens?",
    a: "Locum tenens assignments are contract roles that help facilities maintain coverage while giving physicians schedule control, travel options, and competitive weekly rates.",
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
    a: "Many physicians use locums to reset clinical joy, reduce administrative load, and rebuild boundaries. We match you to cultures and volumes aligned with your goals.",
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
