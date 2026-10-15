import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

function Line({
  text,
  size,
  weight = 700,
  color = "#3b1d0b",
  gap = 12,
}: {
  text: string;
  size: number;
  weight?: number;
  color?: string;
  gap?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {text.split(/\s+/).filter(Boolean).map((word, index) => (
        <div
          key={`${word}-${index}`}
          style={{
            display: "flex",
            fontSize: size,
            fontWeight: weight,
            color,
            marginRight: gap,
            lineHeight: 1.15,
          }}
        >
          {word}
        </div>
      ))}
    </div>
  );
}

export async function createArcadeShareImage(input: {
  title: string;
  stat: string;
  subtitle?: string;
}): Promise<ImageResponse> {
  const specialty = input.title.trim() || "Cardiology";
  const range = input.stat.replace(/\/day$/i, "").trim() || "Pay range";
  const rank = input.subtitle?.trim() || "Directional daily range";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          background: "#1a0e07",
          padding: 22,
        }}
      >
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            background: "#5a3418",
            border: "8px solid #c9a227",
            padding: "16px 20px 20px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 10 }}>
            {["1", "2", "3", "4", "5", "6", "7"].map((id) => (
              <div
                key={id}
                style={{
                  width: 18,
                  height: 18,
                  borderRadius: 999,
                  background: "#ffe08a",
                  border: "2px solid #8a5a12",
                }}
              />
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Line text="Locum Career Hub | Pay Arcade" size={22} color="#ffe08a" gap={10} />
          </div>
          <div
            style={{
              display: "flex",
              flex: 1,
              marginTop: 14,
              background: "#2a180c",
              border: "8px solid #d4af37",
              padding: 18,
            }}
          >
            <div
              style={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                background: "#fff4d6",
                border: "3px dashed #9a3412",
                padding: "26px 34px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Line text="PAY TICKET" size={20} weight={800} color="#7a3410" gap={10} />
                <Line text={SITE.domain} size={20} color="#7a3410" gap={8} />
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Line text="SPECIALTY" size={18} weight={800} color="#92400e" />
                <div style={{ display: "flex", marginTop: 4 }}>
                  <Line text={specialty} size={46} />
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <Line text="PAY EXPECTATION" size={18} weight={800} color="#92400e" />
                <div style={{ display: "flex", marginTop: 6 }}>
                  <Line text={range} size={70} weight={800} gap={8} />
                </div>
                <div style={{ display: "flex", marginTop: 10 }}>
                  <Line text={`a day · ${rank}`} size={26} color="#7a3410" gap={10} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
