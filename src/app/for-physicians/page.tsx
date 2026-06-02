import { permanentRedirect } from "next/navigation";

/** Merged into homepage — cardiologist-only site needs no separate hub. */
export default function ForPhysiciansRedirect() {
  permanentRedirect("/");
}
