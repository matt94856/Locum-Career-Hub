import { describe, expect, it } from "vitest";
import {
  FEATURED_CARDIOLOGY_OPPORTUNITIES,
  opportunityFormSpecialty,
} from "./featured-cardiology-opportunities";
import { CAREER_STAGES, screensForSpecialty } from "./lead-lattice";
import {
  AVAILABILITY_OPTIONS,
  SPECIALTIES as CALCULATOR_SPECIALTIES,
  toLeadSpecialty,
} from "./locums-calculator/model";
import { CARDIOLOGY_SUBSPECIALTIES } from "./specialties";
import { US_STATES } from "./states";
import { PORTFOLIO_TOOLS } from "./tools/portfolio-tools";
import {
  evaluateLeadRequest,
  isToolOrPdfSource,
  skipLeadCaptcha,
  looksLikeHumanLead,
  shouldDropAsHoneypotBot,
} from "./lead-intake";

const CONTACT = {
  firstName: "Test",
  lastName: "Cardiologist",
  email: "test.physician@example.com",
  phone: "555-123-4567",
};

const EXPERIENCE_OPTIONS = [
  "Still in training",
  "0–2 years",
  "3–7 years",
  "8–15 years",
  "16+ years",
] as const;

const AVAILABILITY_FORM_OPTIONS = [
  "ASAP",
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "Exploring / no firm date",
] as const;

const TRAVEL_OPTIONS = ["yes", "no", "maybe"] as const;

function inquiryPayload(overrides: Record<string, unknown> = {}) {
  return {
    ...CONTACT,
    specialty: "General Cardiology",
    careerStage: "moonlighting",
    qualificationResponses: {},
    preferredStates: [],
    yearsExperience: "Not provided (quick submit)",
    availability: "Exploring / no firm date",
    travel: "maybe",
    clinicalNotes: null,
    smsOptIn: false,
    leadMagnet: true,
    formMode: "quick",
    pagePath: "/",
    attribution: {},
    recaptchaToken: "",
    faxLine: "",
    ...overrides,
  };
}

function featuredPayload(
  opportunity: (typeof FEATURED_CARDIOLOGY_OPPORTUNITIES)[number],
  overrides: Record<string, unknown> = {},
) {
  return {
    ...CONTACT,
    specialty: opportunityFormSpecialty(opportunity),
    preferredStates: [opportunity.state],
    yearsExperience: "Not collected on featured opportunity form",
    availability: "Interested—confirm assignment dates",
    travel: "Not collected—assignment-specific interest",
    clinicalNotes: null,
    formMode: "quick",
    smsOptIn: false,
    leadMagnet: false,
    pagePath: `/featured-cardiology-jobs/${opportunity.slug}`,
    source: `featured_opportunity_${opportunity.slug}`.slice(0, 100),
    opportunitySlug: opportunity.slug,
    qualificationResponses: {},
    attribution: {},
    recaptchaToken: "",
    faxLine: "",
    ...overrides,
  };
}

function pdfPayload(overrides: Record<string, unknown> = {}) {
  return {
    ...CONTACT,
    specialty: "Interventional Cardiology",
    preferredStates: ["Florida"],
    homeState: "Florida",
    availability: "Exploring / no firm date",
    formMode: "quick",
    source: "cardiologist_locums_calculator_pdf",
    pagePath: "/cardiologist-locums-calculator",
    attribution: {},
    calculatorProfile: { delivery: "pdf_report" },
    clinicalNotes: "Requested email/PDF of tool result (light gate).",
    ...overrides,
  };
}

function expectSave(payload: Record<string, unknown>, extra?: (value: Record<string, unknown>) => void) {
  const result = evaluateLeadRequest(payload);
  expect(result.outcome, JSON.stringify({ payload, result })).toBe("save");
  if (result.outcome === "save" && extra) extra(result.value as unknown as Record<string, unknown>);
}

describe("name Test is never treated as a bot", () => {
  it("saves first name Test / test on the homepage quick path", () => {
    for (const firstName of ["Test", "test", "TEST"]) {
      expectSave(inquiryPayload({ firstName }), (value) => {
        expect(value.first_name).toBe(firstName);
        expect(value.email).toBe("test.physician@example.com");
      });
    }
  });

  it("still saves when a password manager fills the honeypot on a complete Test lead", () => {
    expect(looksLikeHumanLead(inquiryPayload({ faxLine: "https://autofill.example" }))).toBe(true);
    expect(shouldDropAsHoneypotBot(inquiryPayload({ faxLine: "https://autofill.example" }))).toBe(false);
    expectSave(inquiryPayload({ faxLine: "company.example", companyWebsite: "https://pw-manager.example" }), (value) => {
      expect(value.metadata).toMatchObject({ honeypot_autofill: true });
    });
  });

  it("drops only incomplete honeypot spam, not Test + real contact", () => {
    expect(shouldDropAsHoneypotBot({ faxLine: "http://spam.test" })).toBe(true);
    expect(
      shouldDropAsHoneypotBot({
        firstName: "Test",
        lastName: "Bot",
        email: "not-an-email",
        phone: "1",
        faxLine: "http://spam.test",
      }),
    ).toBe(true);
    expect(evaluateLeadRequest({ faxLine: "http://spam.test" }).outcome).toBe("drop_honeypot");
  });
});

describe("LeadCaptureForm — every required and optional combination", () => {
  it("saves the homepage required-only submit (no optional accordion)", () => {
    expectSave(inquiryPayload(), (value) => {
      expect(value.preferred_states).toEqual([]);
      expect(value.years_experience).toBe("Not provided (quick submit)");
      expect(value.travel).toBe("maybe");
      expect(value.metadata).toMatchObject({ form_mode: "quick", career_stage: "moonlighting" });
    });
  });

  it("saves every cardiology subspecialty from the public form", () => {
    for (const specialty of CARDIOLOGY_SUBSPECIALTIES) {
      expectSave(inquiryPayload({ specialty }), (value) => {
        expect(value.specialty).toBe(specialty);
      });
    }
  });

  it("saves every career stage", () => {
    for (const stage of CAREER_STAGES) {
      expectSave(inquiryPayload({ careerStage: stage.id }), (value) => {
        expect(value.metadata).toMatchObject({ career_stage: stage.id });
      });
    }
  });

  it("saves experience-only, travel-only, and both-without-states (the former reject path)", () => {
    expectSave(
      inquiryPayload({
        yearsExperience: "3–7 years",
        travel: "",
        formMode: "quick",
      }),
      (value) => expect(value.years_experience).toBe("3–7 years"),
    );
    expectSave(
      inquiryPayload({
        yearsExperience: "",
        travel: "yes",
        formMode: "quick",
      }),
      (value) => expect(value.travel).toBe("yes"),
    );
    expectSave(
      inquiryPayload({
        yearsExperience: "8–15 years",
        travel: "maybe",
        preferredStates: [],
        formMode: "full",
      }),
      (value) => {
        expect(value.preferred_states).toEqual([]);
        expect(value.years_experience).toBe("8–15 years");
        expect(value.travel).toBe("maybe");
      },
    );
  });

  it("saves every experience, travel, and availability option with a preferred state", () => {
    for (const yearsExperience of EXPERIENCE_OPTIONS) {
      for (const travel of TRAVEL_OPTIONS) {
        expectSave(
          inquiryPayload({
            yearsExperience,
            travel,
            preferredStates: ["Ohio"],
            formMode: "full",
          }),
          (value) => {
            expect(value.years_experience).toBe(yearsExperience);
            expect(value.travel).toBe(travel);
            expect(value.preferred_states).toEqual(["Ohio"]);
          },
        );
      }
    }
    for (const availability of AVAILABILITY_FORM_OPTIONS) {
      expectSave(inquiryPayload({ availability }), (value) => {
        expect(value.availability).toBe(availability);
      });
    }
  });

  it("saves SMS / guide checkboxes, notes, and every US state as a preference", () => {
    expectSave(inquiryPayload({ smsOptIn: true, leadMagnet: false }), (value) => {
      expect(value.sms_opt_in).toBe(true);
      expect(value.lead_magnet).toBe(false);
    });
    expectSave(
      inquiryPayload({ clinicalNotes: "No solo STEMI. Weekends only." }),
      (value) => expect(value.metadata).toMatchObject({ clinical_notes: "No solo STEMI. Weekends only." }),
    );
    expectSave(inquiryPayload({ preferredStates: [...US_STATES] }), (value) => {
      expect(value.preferred_states).toHaveLength(US_STATES.length);
    });
  });

  it("saves optional screening answers for general, IC, and EP", () => {
    for (const specialty of ["General Cardiology", "Interventional Cardiology", "Electrophysiology"] as const) {
      const questions = screensForSpecialty(specialty);
      expect(questions.length).toBeGreaterThan(0);
      const qualificationResponses = Object.fromEntries(
        questions.map((question) => [question.id, question.options[0]]),
      );
      expectSave(inquiryPayload({ specialty, qualificationResponses }), (value) => {
        expect(value.metadata).toHaveProperty("qualification_responses");
      });
    }
  });

  it("rejects missing contact, short phone, and non-cardiology specialty", () => {
    expect(evaluateLeadRequest(inquiryPayload({ email: "not-an-email" })).outcome).toBe("reject");
    expect(evaluateLeadRequest(inquiryPayload({ phone: "555-12" })).outcome).toBe("reject");
    expect(evaluateLeadRequest(inquiryPayload({ firstName: "" })).outcome).toBe("reject");
    expect(evaluateLeadRequest(inquiryPayload({ specialty: "Family Medicine" })).outcome).toBe("reject");
  });

  it("keeps a valid lead when a junk preferred state is mixed in", () => {
    expectSave(inquiryPayload({ preferredStates: ["Ohio", "Narnia", "FL"] }), (value) => {
      expect(value.preferred_states).toEqual(["Ohio", "Florida"]);
    });
  });
});

describe("OpportunityInterestForm — every featured job", () => {
  it("saves required-only and fully optional payloads for each featured opportunity", () => {
    expect(FEATURED_CARDIOLOGY_OPPORTUNITIES.length).toBeGreaterThan(0);
    for (const opportunity of FEATURED_CARDIOLOGY_OPPORTUNITIES) {
      expectSave(featuredPayload(opportunity), (value) => {
        expect(value.specialty).toBe(opportunityFormSpecialty(opportunity));
        expect(value.preferred_states).toEqual([opportunity.state]);
        expect(value.source).toBe(`featured_opportunity_${opportunity.slug}`.slice(0, 100));
        expect(value.metadata).toMatchObject({
          opportunity_slug: opportunity.slug,
          form_mode: "quick",
        });
      });

      const qualificationResponses = Object.fromEntries(
        opportunity.screeningQuestions.map((question) => [question.id, question.options[0]]),
      );
      expectSave(
        featuredPayload(opportunity, {
          availability: "ASAP",
          clinicalNotes: "Can start after current block.",
          smsOptIn: true,
          qualificationResponses,
        }),
        (value) => {
          expect(value.availability).toBe("ASAP");
          expect(value.sms_opt_in).toBe(true);
          expect(value.metadata).toHaveProperty("qualification_responses");
        },
      );
    }
  });

  it("saves email-only or phone-only contact for a featured job", () => {
    const opportunity = FEATURED_CARDIOLOGY_OPPORTUNITIES[0];
    expectSave(
      featuredPayload(opportunity, { lastName: "", phone: "" }),
      (value) => {
        expect(value.email).toBe("test.physician@example.com");
        expect(value.phone).toBe("not-provided");
        expect(value.last_name).toBe("Not provided");
        expect(value.metadata).toMatchObject({
          request_type: "opportunity_details",
          contact_via: "email",
        });
      },
    );
    expectSave(
      featuredPayload(opportunity, { lastName: "", email: "" }),
      (value) => {
        expect(value.email).toBe("not-provided");
        expect(value.phone).toBe("555-123-4567");
        expect(value.metadata).toMatchObject({ contact_via: "phone" });
      },
    );
    expect(evaluateLeadRequest(featuredPayload(opportunity, { email: "", phone: "" })).outcome).toBe(
      "reject",
    );
    expect(skipLeadCaptcha(`featured_opportunity_${opportunity.slug}`)).toBe(true);
  });
});

describe("PdfEmailGate — calculator and decision-tool PDFs", () => {
  it("treats calculator and decision-tool PDF sources as captcha/phone-optional", () => {
    expect(isToolOrPdfSource("cardiologist_locums_calculator_pdf")).toBe(true);
    for (const tool of PORTFOLIO_TOOLS) {
      expect(isToolOrPdfSource(`decision_tool_${tool.id}_pdf`)).toBe(true);
      expect(isToolOrPdfSource(`decision_tool_${tool.id}`)).toBe(true);
    }
  });

  it("saves every calculator specialty and availability, with or without phone", () => {
    for (const specialty of CALCULATOR_SPECIALTIES) {
      for (const availability of AVAILABILITY_OPTIONS) {
        expectSave(
          pdfPayload({
            specialty: toLeadSpecialty(specialty),
            availability,
            phone: "",
            preferredStates: ["Texas", "Florida"],
          }),
          (value) => {
            expect(value.specialty).toBe(toLeadSpecialty(specialty));
            expect(value.availability).toBe(availability);
            expect(value.phone).toBe("not-provided");
          },
        );
      }
    }
  });

  it("saves a PDF request when homeState is a USPS code or junk", () => {
    expectSave(pdfPayload({ homeState: "FL", preferredStates: ["fl"] }), (value) => {
      expect(value.preferred_states).toEqual(["Florida"]);
      expect(value.metadata).toMatchObject({ home_state: "Florida" });
    });
    expectSave(pdfPayload({ homeState: "not a state", preferredStates: ["Florida"] }), (value) => {
      expect(value.metadata).not.toHaveProperty("home_state");
      expect(value.preferred_states).toEqual(["Florida"]);
    });
  });

  it("saves a PDF request from every decision tool", () => {
    for (const tool of PORTFOLIO_TOOLS) {
      expectSave(
        pdfPayload({
          source: `decision_tool_${tool.id}_pdf`,
          specialty: "General Cardiology",
          pagePath: tool.path,
        }),
        (value) => expect(value.source).toBe(`decision_tool_${tool.id}_pdf`),
      );
    }
  });
});

describe("PortfolioDecisionTool ReportGate", () => {
  it("saves a single-name Test submit and every specialty/tool pair", () => {
    for (const tool of PORTFOLIO_TOOLS) {
      for (const specialty of CARDIOLOGY_SUBSPECIALTIES) {
        expectSave(
          {
            firstName: "Test",
            lastName: "Not provided",
            email: "test.physician@example.com",
            phone: "5551234567",
            specialty,
            preferredStates: ["Florida"],
            homeState: "Florida",
            availability: "Exploring / no firm date",
            formMode: "quick",
            source: `decision_tool_${tool.id}`,
            pagePath: tool.path,
            attribution: {},
            calculatorProfile: { toolId: tool.id },
          },
          (value) => {
            expect(value.first_name).toBe("Test");
            expect(value.last_name).toBe("Not provided");
            expect(value.specialty).toBe(specialty);
          },
        );
      }
    }
  });
});
