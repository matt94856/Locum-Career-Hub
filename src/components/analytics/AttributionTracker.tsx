"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { readLeadAttribution } from "@/lib/attribution";

/** Preserves first- and last-touch attribution before a visitor reaches a form. */
export function AttributionTracker() {
  const pathname = usePathname();

  useEffect(() => {
    readLeadAttribution();
  }, [pathname]);

  return null;
}
