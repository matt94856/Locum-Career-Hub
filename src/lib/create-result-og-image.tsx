import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export async function createResultShareImage(input: {
  title: string;
  stat: string;
  subtitle?: string;
  eyebrow?: string;
}): Promise<ImageResponse> {
  const eyebrow = input.eyebrow?.trim() || "Cardiologist locums";
  const subtitle = input.subtitle?.trim() || SITE.domain;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 56,
          background: "#020617",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#93c5fd",
            }}
          >
            {eyebrow}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "rgba(255,255,255,0.55)" }}>{SITE.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              display: "flex",
              fontSize: 36,
              fontWeight: 600,
              color: "rgba(255,255,255,0.88)",
              lineHeight: 1.2,
              maxWidth: 1000,
            }}
          >
            {input.title}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              fontWeight: 700,
              color: "#ffffff",
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {input.stat}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderTop: "1px solid rgba(148,163,184,0.35)",
            paddingTop: 28,
          }}
        >
          <div style={{ display: "flex", fontSize: 24, color: "rgba(255,255,255,0.7)", maxWidth: 780 }}>
            {subtitle}
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#93c5fd" }}>{SITE.domain}</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
