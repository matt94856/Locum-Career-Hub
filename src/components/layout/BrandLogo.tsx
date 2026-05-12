import Image from "next/image";
import { BRAND_LOGO_URL, SITE } from "@/lib/site";

type Props = {
  /** Tailwind size classes, e.g. h-9 w-9 or h-10 w-10 */
  className?: string;
};

export function BrandLogo({ className = "h-9 w-9" }: Props) {
  return (
    <Image
      src={BRAND_LOGO_URL}
      alt={`${SITE.name} logo`}
      width={160}
      height={160}
      unoptimized
      className={`rounded-xl object-cover shadow-sm ${className}`.trim()}
    />
  );
}
