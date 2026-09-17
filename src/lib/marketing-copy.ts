/** Shared conversion copy: warm, specific, short. Not job-board hype. */

export const FORM_EYEBROW = "Cardiologists only";

export const FORM_TITLE = "Let’s find the right locum block";

export const FORM_SUBTITLE =
  "Work that pays well, with the freedom to schedule around your life.";

export const FORM_CHIPS = ["About 2 minutes", "No spam", "Plain answers if nothing fits"] as const;

export function formSubtitleForPlace(place?: string) {
  if (!place) return FORM_SUBTITLE;
  return `We’ll start in ${place}. Lucrative blocks, on a schedule you control.`;
}
