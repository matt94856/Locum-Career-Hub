import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

const CARD_LINE =
  "Flexible physician careers, burnout-aware guidance, and locum tenens—with human-paced recruiting.";

export async function createBrandShareImage(): Promise<ImageResponse> {
  const logoPath = path.join(process.cwd(), "public", "logo.svg");
  const svg = await readFile(logoPath);
  const logoSrc = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 56,
          padding: 64,
          background: "linear-gradient(135deg, #020617 0%, #172554 38%, #1d4ed8 72%, #2563eb 100%)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- OG image pipeline; not a browser LCP path */}
        <img
          src={logoSrc}
          width={168}
          height={168}
          alt=""
          style={{ borderRadius: 36, flexShrink: 0 }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flex: 1,
            minWidth: 0,
          }}
        >
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -2,
              lineHeight: 1.05,
            }}
          >
            {SITE.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              color: "rgba(255,255,255,0.92)",
              lineHeight: 1.35,
              maxWidth: 880,
            }}
          >
            {CARD_LINE}
          </div>
          <div
            style={{
              marginTop: 32,
              fontSize: 22,
              color: "rgba(255,255,255,0.72)",
            }}
          >
            {SITE.domain}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
