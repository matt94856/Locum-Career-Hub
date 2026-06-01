export function slugifyPart(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function citySeoSlug(city: string): string {
  return `${slugifyPart(city)}-cardiology-locum-jobs`;
}

export function legacyCardiologyLocumsSlug(city: string, stateSlug: string): string {
  return `cardiologist-locum-jobs-${slugifyPart(city)}-${stateSlug}`;
}

export function stateSalarySlug(stateSlug: string): string {
  return `cardiologist-salary-${stateSlug}`;
}
