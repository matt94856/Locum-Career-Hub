import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/** Google Search favicon: square, ≥48×48 recommended; generated from brand logo. */
export const size = { width: 48, height: 48 };
export const contentType = "image/png";

export default async function Icon() {
  const logoPath = path.join(process.cwd(), "public", "logo.svg");
  const svg = await readFile(logoPath);
  const logoSrc = `data:image/svg+xml;base64,${svg.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1d4ed8 0%, #2563eb 100%)",
          borderRadius: 10,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- favicon pipeline */}
        <img src={logoSrc} width={40} height={40} alt="" />
      </div>
    ),
    { ...size },
  );
}
