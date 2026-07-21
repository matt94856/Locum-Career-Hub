"use client";

import Link from "next/link";
import { trackDecisionToolEvent } from "@/lib/analytics-events";

export function TrackedToolLink({
  fromToolId,
  toToolId,
  href,
  className,
  children,
}: {
  fromToolId: string;
  toToolId: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackDecisionToolEvent(fromToolId, "related_tool_click", { destination_tool_id: toToolId })}
    >
      {children}
    </Link>
  );
}
