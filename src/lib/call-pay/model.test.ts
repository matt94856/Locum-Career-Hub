import { describe, expect, it } from "vitest";
import { CALL_PAY_BANDS, compareCallPay, dayPay } from "./model";

describe("call pay structures", () => {
  it("keeps interventional and general rates separate", () => {
    expect(CALL_PAY_BANDS.interventional.flexibleDailyLow).toBe(3200);
    expect(CALL_PAY_BANDS.interventional.flexibleDailyHigh).toBe(3600);
    expect(CALL_PAY_BANDS.interventional.guaranteedDailyLow).toBe(3800);
    expect(CALL_PAY_BANDS.interventional.guaranteedDailyHigh).toBe(4200);
    expect(CALL_PAY_BANDS.interventional.callbackLow).toBe(400);
    expect(CALL_PAY_BANDS.interventional.callbackHigh).toBe(450);
    expect(CALL_PAY_BANDS.general.flexibleDailyLow).toBe(2200);
    expect(CALL_PAY_BANDS.general.flexibleDailyHigh).toBe(2800);
    expect(CALL_PAY_BANDS.general.callbackLow).toBe(275);
    expect(CALL_PAY_BANDS.general.callbackHigh).toBe(350);
    expect(CALL_PAY_BANDS.general.guaranteedDailyLow).toBe(2600);
    expect(CALL_PAY_BANDS.general.guaranteedDailyHigh).toBe(3200);
  });

  it("turns a busy 9-hour interventional day into $5,200 at the low end", () => {
    const pay = dayPay({ dailyRate: 3200, includedHours: 4, callbackRate: 400, hoursWorked: 9 });
    expect(pay.callbackHours).toBe(5);
    expect(pay.callbackPay).toBe(2000);
    expect(pay.total).toBe(5200);
  });

  it("pays the 0–4 structure more once the day is busy, and the 0–6 guarantee more when it is quiet", () => {
    const busy = compareCallPay("interventional", 9);
    expect(busy.flexible.low.total).toBe(5200);
    expect(busy.guaranteed.low.total).toBe(5000);
    expect(busy.winnerAtLowEnd).toBe("included-4");

    const quiet = compareCallPay("interventional", 3);
    expect(quiet.flexible.low.total).toBe(3200);
    expect(quiet.guaranteed.low.total).toBe(3800);
    expect(quiet.winnerAtLowEnd).toBe("included-6");
  });

  it("uses general callback of daily ÷ 8 and does not borrow interventional dollars", () => {
    const busy = compareCallPay("general", 9);
    expect(busy.flexible.low.total).toBe(2200 + 5 * 275);
    expect(busy.flexible.low.total).not.toBe(5200);
    expect(busy.winnerAtLowEnd).toBe("included-4");
    expect(compareCallPay("general", 3).winnerAtLowEnd).toBe("included-6");
  });
});
