import { describe, expect, it } from "vitest";
import { estimateIcDailyRange } from "./model";
import { icPayRangeLabel, icPaySharePayload } from "./share";

describe("IC pay arcade share", () => {
  it("puts specialty and a daily range on the share card, not a weekly formula", () => {
    const estimate = estimateIcDailyRange({
      experience: "mid",
      stemi: "independent",
      skill: "core",
      call: "nights",
      access: "one_state",
    });
    const share = icPaySharePayload(estimate);
    expect(share.title).toMatch(/Interventional Cardiology/i);
    expect(share.stat).toContain("/day");
    expect(share.text).toMatch(/Pay expectation/);
    expect(share.text).not.toMatch(/÷|weekly salary/i);
    expect(share.url).toContain("/s?");
    expect(share.url).toContain("p=i");
    expect(icPayRangeLabel(estimate)).toMatch(/\$3,\d{3}–\$\d/);
  });
});
