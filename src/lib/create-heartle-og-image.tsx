import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

const TILES = [
  { letter: "H", color: "#6aaa64" },
  { letter: "E", color: "#c9b458" },
  { letter: "A", color: "#6aaa64" },
  { letter: "R", color: "#787c7e" },
  { letter: "T", color: "#6aaa64" },
  { letter: "L", color: "#c9b458" },
  { letter: "E", color: "#6aaa64" },
] as const;

export async function createHeartleShareImage(): Promise<ImageResponse> {
  const photoPath = path.join(process.cwd(), "public", "heartle-og-photo.jpg");
  const photo = await readFile(photoPath);
  const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          background: "#1c1917",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- OG image pipeline; not a browser LCP path */}
        <img
          src={photoSrc}
          width={1200}
          height={630}
          alt=""
          style={{ position: "absolute", top: 0, left: 0, width: 1200, height: 630, objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 1200,
            height: 630,
            display: "flex",
            background:
              "linear-gradient(180deg, rgba(28,25,23,0.28) 0%, rgba(28,25,23,0.18) 38%, rgba(15,23,42,0.72) 100%)",
          }}
        />
        <div
          style={{
            position: "relative",
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "48px 56px 44px",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#fecdd3",
            }}
          >
            Daily heart puzzle
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
            <div style={{ display: "flex", gap: 10 }}>
              {TILES.map((tile, index) => (
                <div
                  key={`${tile.letter}-${index}`}
                  style={{
                    display: "flex",
                    width: 92,
                    height: 92,
                    alignItems: "center",
                    justifyContent: "center",
                    background: tile.color,
                    color: "#ffffff",
                    fontSize: 48,
                    fontWeight: 800,
                    letterSpacing: 1,
                    borderRadius: 10,
                  }}
                >
                  {tile.letter}
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 28,
                fontSize: 36,
                fontWeight: 700,
                color: "#ffffff",
                letterSpacing: -0.5,
                lineHeight: 1.15,
              }}
            >
              I did the Heartle today. Can you beat this score?
            </div>
            <div
              style={{
                display: "flex",
                marginTop: 14,
                fontSize: 22,
                color: "rgba(255,255,255,0.82)",
              }}
            >
              locumcareerhub.com/cardiology-wordle
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
