"use client";

import { Button } from "@/components/ui/Button";

export function PrintButton() {
  return (
    <Button type="button" variant="secondary" className="print:hidden" onClick={() => window.print()}>
      Print / Save as PDF
    </Button>
  );
}
