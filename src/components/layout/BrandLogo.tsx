import Image from "next/image";
import { SITE } from "@/lib/site";

type Props = {
  /** Tailwind size classes, e.g. h-9 w-9 or h-10 w-10 */
  className?: string;
  /** Set on header logo for LCP; omit in footer for lazy load. */
  priority?: boolean;
};

export function BrandLogo({ className = "h-9 w-9", priority = false }: Props) {
  return (
    <Image
      src="/logo.svg"
      alt={`${SITE.name} logo – physician locum tenens staffing`}
      width={160}
      height={160}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={`rounded-xl object-cover shadow-sm ${className}`.trim()}
    />
  );
}
