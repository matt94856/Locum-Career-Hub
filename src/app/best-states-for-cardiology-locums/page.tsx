import type { Metadata } from "next";
import { CardiologyCompensationGuide } from "@/components/marketing/CardiologyCompensationGuide";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, faqJsonLd, medicalWebPageJsonLd } from "@/lib/schema";
import { buildSerpMetadata } from "@/lib/serp-ctr";

const PATH = "/best-states-for-cardiology-locums";
const DESCRIPTION = "Compare the best states for cardiology locums using licensing, travel, assignment scope, schedule, and personal-fit criteria—not unsupported demand rankings.";
const FAQS = [
  { q: "What is the best state for a cardiologist doing locums?", a: "There is no universal best state. The right choice depends on active licenses, IMLC eligibility, desired scope, travel radius, schedule, family logistics, and the terms of a real available assignment." },
  { q: "Do I need a state license before speaking with a recruiter?", a: "Not always. Existing licenses can speed access, while IMLC or direct licensure may make other states realistic. Hospital privileging remains separate and can determine the actual start date." },
  { q: "Do rural cardiology locums always pay more?", a: "No. Harder-to-cover locations may offer premiums in some situations, but support, transfer pathways, call burden, travel time, cancellation terms, and assignment urgency must all be compared." },
];

export const metadata: Metadata = buildSerpMetadata({
  title: "Best States for Cardiology Locums: Decision Guide",
  description: DESCRIPTION,
  path: PATH,
  keywords: ["best states for cardiology locums", "cardiology locum jobs by state", "cardiologist licensing states"],
});

export default function BestStatesForCardiologyLocumsPage() {
  return (
    <>
      <JsonLd data={medicalWebPageJsonLd({ name: "Best States for Cardiology Locums", description: DESCRIPTION, path: PATH, keywords: ["best states for cardiology locums", "cardiology locums by state"], aboutTopics: ["Cardiology locum tenens", "Physician licensing", "Locum travel"] })} />
      <JsonLd data={faqJsonLd(FAQS)} />
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Best states for cardiology locums", path: PATH }])} />
      <CardiologyCompensationGuide
        eyebrow="State decision framework"
        title="Best States for Cardiology Locums"
        directAnswer="The best state is the one where a real assignment fits your license timeline, cardiology scope, call boundaries, travel radius, and life. Static “highest-paying state” lists often hide the assignment terms that determine whether an opportunity is actually attractive."
        sections={[
          { heading: "Score states against your real constraints", paragraphs: ["Start with active licenses and the dates you can work. Then compare travel time, housing, facility support, call, procedures, backup, transfer pathways, and cancellation language. Availability changes, so this guide does not label states as guaranteed demand hotspots."], bullets: ["License and credentialing feasibility", "Direct travel time and weather contingency", "Cath/EP/imaging privileges and recent case requirements", "Call, backup, transfer, and post-call rules", "Net economics after travel and unpaid time"] },
          { heading: "Ten useful state planning profiles", paragraphs: ["Florida: coastal travel and facility-specific credentialing. Texas: large-distance and multi-site planning. California: full-license lead times and travel economics. Pennsylvania: metro-to-regional travel and system privileging. Colorado and Montana: weather, backup, and transfer planning.", "Arizona: calendar and housing planning. Georgia: Atlanta-versus-regional travel. Tennessee: Nashville, Memphis, and Knoxville blocks. North Carolina: Charlotte and Triangle preferences. These are planning angles, not opening-volume claims."] },
          { heading: "IMLC is a pathway, not a blanket license", paragraphs: ["Eligible physicians may use the Interstate Medical Licensure Compact to pursue separate licenses from participating states more efficiently. Verify current participation and eligibility with official sources. Every assignment still requires the relevant state license and facility privileging."] },
        ]}
        faqs={FAQS}
        path={PATH}
      />
    </>
  );
}
