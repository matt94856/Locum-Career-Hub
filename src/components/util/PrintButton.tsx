"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button type="button" variant="secondary" className="w-full justify-center print:hidden" onClick={() => window.print()}>
      Print / Save as PDF
    </Button>
  );
}
