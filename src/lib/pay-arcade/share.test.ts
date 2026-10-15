import { describe, expect, it } from "vitest";
import { estimateIcDailyRange } from "@/lib/ic-pay/model";
import { payArcadeSharePayload } from "./share";

describe("pay arcade share", () => {
  it("points LinkedIn at an arcade ticket image", () => {
    const estimate = estimateIcDailyRange({
      experience: "mid",
      stemi: "independent",
      skill: "core",
      call: "nights",
      access: "one_state",
    });
    const share = payArcadeSharePayload({
      specialty: "Interventional Cardiology",
      path: "/interventional-cardiology-locums-pay",
      estimate,
    });
    expect(share.imagePath).toContain("/api/og?");
    expect(share.imagePath).toContain("style=arcade");
    expect(share.url).toContain("p=i");
  });
});
