import { describe, expect, it } from "vitest";
import { isQuizComplete, LOCUM_FIT_MAX_SCORE, LOCUM_FIT_QUESTIONS, scoreLocumFitQuiz } from "./model";

const strongAnswers = {
  energy: "empty",
  drain: "call",
  protect: "off",
  travel: "go",
  identity: "break",
  paymodel: "fine",
  timing: "soon",
  specialty: "ic",
};

describe("locum fit quiz", () => {
  it("has eight questions and a two-minute length", () => {
    expect(LOCUM_FIT_QUESTIONS).toHaveLength(8);
    expect(LOCUM_FIT_MAX_SCORE).toBe(23);
  });

  it("scores a burned-out interventional cardiologist as a strong locums fit", () => {
    const result = scoreLocumFitQuiz(strongAnswers);
    expect(isQuizComplete(strongAnswers)).toBe(true);
    expect(result.band).toBe("strong");
    expect(result.percent).toBeGreaterThanOrEqual(82);
    expect(result.specialty).toBe("Interventional Cardiology");
    expect(result.careerStage).toBe("locums-primary");
    expect(result.availability).toBe("1–3 months");
    expect(result.travelInterest).toBe("yes");
    expect(result.burnedOut).toBe(true);
    expect(result.notes).toContain("running on fumes");
  });

  it("caps fit when the clinical work itself is the problem", () => {
    const result = scoreLocumFitQuiz({
      ...strongAnswers,
      drain: "medicine",
    });
    expect(result.medicineFlag).toBe(true);
    expect(result.band).toBe("mixed");
    expect(result.reasons.some((line) => /clinical work itself/.test(line))).toBe(true);
  });

  it("keeps a stable employed cardiologist in the employed band", () => {
    const result = scoreLocumFitQuiz({
      energy: "steady",
      drain: "none",
      protect: "same",
      travel: "no",
      identity: "lost",
      paymodel: "w2",
      timing: "explore",
      specialty: "nic",
    });
    expect(result.band).toBe("employed");
    expect(result.percent).toBeLessThanOrEqual(38);
    expect(result.specialty).toBe("General Cardiology");
    expect(result.careerStage).toBe("moonlighting");
  });
});
