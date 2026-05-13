/** Google Analytics 4 measurement ID (public). Override with `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Netlify / `.env.local`. */
export const GA_MEASUREMENT_ID =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim()) || "G-X61CN8CDJ6";
