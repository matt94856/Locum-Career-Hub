"use client";

import { trackBookingClick, trackCtaClick } from "@/lib/analytics-events";
import { SITE } from "@/lib/site";

type Props = {
  source: string;
  className?: string;
  showEmail?: boolean;
  onDark?: boolean;
};

export function ContactFallbacks({
  source,
  className = "text-sm leading-6 text-slate-500",
  showEmail = false,
  onDark = false,
}: Props) {
  const linkClass = onDark
    ? "font-medium text-white underline-offset-2 hover:underline"
    : "font-medium text-slate-700 underline-offset-2 hover:underline";

  return (
    <div className={className}>
      <p>
        If you can&apos;t submit the form,{" "}
        <a
          className={linkClass}
          href={`tel:${SITE.phoneTel}`}
          onClick={() => trackCtaClick(`call_${source}`, `tel:${SITE.phoneTel}`)}
        >
          call
        </a>{" "}
        or{" "}
        <a
          className={linkClass}
          href={SITE.smsHref}
          onClick={() => trackCtaClick(`text_${source}`, SITE.smsHref)}
        >
          text
        </a>{" "}
        {SITE.phoneDisplay}
        {SITE.calendlyUrl ? (
          <>
            , or{" "}
            <a
              className={linkClass}
              href={SITE.calendlyUrl}
              onClick={() => {
                trackCtaClick(`book_call_${source}`, SITE.calendlyUrl);
                trackBookingClick(source);
              }}
            >
              schedule a Calendly call
            </a>
          </>
        ) : null}
        .
      </p>
      {showEmail ? (
        <p className="mt-2">
          Prefer email?{" "}
          <a
            className={linkClass}
            href={`mailto:${SITE.email}`}
            onClick={() => trackCtaClick(`email_${source}`, `mailto:${SITE.email}`)}
          >
            {SITE.email}
          </a>
        </p>
      ) : null}
    </div>
  );
}
