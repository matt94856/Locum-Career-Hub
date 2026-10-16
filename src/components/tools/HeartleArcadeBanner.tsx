"use client";

import Link from "next/link";
import { Press_Start_2P } from "next/font/google";
import { trackCtaClick, trackDecisionToolEvent } from "@/lib/analytics-events";
import { CARDIOLOGY_WORDLE_TOOL_ID } from "@/lib/cardiology-wordle/daily";

const pixel = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const CABINETS = [
  {
    href: "/interventional-cardiology-locums-pay",
    code: "IC",
    role: "Cath lab",
    label: "Play interventional cardiology pay arcade",
    className: "is-ic",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M5 27c6.5-6.2 9.2-12.4 11.2-18.2"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="18.4" cy="7.2" r="4.1" fill="#ff3b3b" stroke="#ffe08a" strokeWidth="1.5" />
        <path d="M18.4 5.4v3.6M16.6 7.2h3.6" stroke="#fff7d6" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/non-invasive-cardiology-locums-pay",
    code: "NIC",
    role: "Echo",
    label: "Play non-invasive cardiology pay arcade",
    className: "is-nic",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          d="M16 26s-7.4-5.1-7.4-11.1A4.6 4.6 0 0 1 16 11.2a4.6 4.6 0 0 1 7.4 3.7C23.4 20.9 16 26 16 26Z"
          fill="#7dfff0"
          stroke="#e8fffb"
          strokeWidth="1.2"
        />
        <path d="M16 8.2c5.4 1.6 9.4 5.8 10.6 11.2" fill="none" stroke="#b8fff6" strokeWidth="1.4" />
        <path d="M16 8.2c3.4 1 6 3.6 7.2 7" fill="none" stroke="#b8fff6" strokeWidth="1.4" opacity="0.7" />
        <path d="M16 8.2c1.8.55 3.2 1.9 4 3.8" fill="none" stroke="#b8fff6" strokeWidth="1.4" opacity="0.45" />
      </svg>
    ),
  },
  {
    href: "/ep-cardiology-locums-pay",
    code: "EP",
    role: "Rhythm",
    label: "Play EP cardiology pay arcade",
    className: "is-ep",
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <polyline
          points="2 18 8.5 18 10.4 8 12.8 25 15.1 18 21 18"
          fill="none"
          stroke="#3b0764"
          strokeWidth="2.2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path d="M20.2 6.2 16.8 14h4.1l-5.3 11.6 3.8-8.6h-4.1Z" fill="#a3ff4d" stroke="#3b0764" strokeWidth="1" />
      </svg>
    ),
  },
] as const;

export function HeartleArcadeBanner() {
  return (
    <aside className="heartle-ad" aria-label="Locum tenens pay arcade">
      <div className="heartle-ad-lights" aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span key={index} />
        ))}
      </div>
      <div className="heartle-ad-inner">
        <div className="heartle-ad-copy">
          <p className={`heartle-ad-kicker ${pixel.className}`}>Play the arcade pay estimator</p>
          <p className="heartle-ad-headline">See how much you could earn from locum tenens</p>
        </div>
        <div className="heartle-ad-cabinets">
          {CABINETS.map((cabinet) => (
            <Link
              key={cabinet.href}
              href={cabinet.href}
              className={`heartle-cab ${cabinet.className}`}
              aria-label={cabinet.label}
              onClick={() => {
                trackDecisionToolEvent(CARDIOLOGY_WORDLE_TOOL_ID, "related_tool_click", { link_url: cabinet.href });
                trackCtaClick(`wordle_ad_${cabinet.code.toLowerCase()}`, cabinet.href);
              }}
            >
              <span className="heartle-cab-icon">{cabinet.icon}</span>
              <span className="heartle-cab-text">
                <span className="heartle-cab-code">{cabinet.code}</span>
                <span className="heartle-cab-role">{cabinet.role}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
