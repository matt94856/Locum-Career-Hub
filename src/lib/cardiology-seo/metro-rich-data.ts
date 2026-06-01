import type { ContentSection } from "@/lib/cardiology-seo/types";
import { citySeoSlug } from "@/lib/cardiology-seo/slug-utils";

/** Top metros receiving unique, data-rich content (not templated rotation). */
export type MetroRichProfile = {
  city: string;
  state: string;
  stateSlug: string;
  populationNote: string;
  demandNote: string;
  healthSystems: string[];
  subspecialtyDemand: string;
  locumRateDrivers: string;
  lifestyleNote: string;
};

export const PRIORITY_METRO_SLUGS = new Set(
  [
    "miami",
    "orlando",
    "tampa",
    "jacksonville",
    "dallas",
    "houston",
    "austin",
    "atlanta",
    "chicago",
    "phoenix",
    "new-york",
    "los-angeles",
    "philadelphia",
    "boston",
    "san-francisco",
    "seattle",
    "denver",
    "charlotte",
    "nashville",
    "san-diego",
    "minneapolis",
    "detroit",
    "cleveland",
    "washington",
    "raleigh",
  ].map((c) => `${c}-cardiology-locum-jobs`),
);

export function isPriorityMetroSlug(slug: string): boolean {
  return PRIORITY_METRO_SLUGS.has(slug);
}

const METRO_PROFILES: MetroRichProfile[] = [
  {
    city: "Miami",
    state: "FL",
    stateSlug: "florida",
    populationNote:
      "South Florida’s large Medicare-age population and international referral patterns sustain high cardiology volume year-round, with seasonal surges in winter months.",
    demandNote:
      "Hospital systems frequently need locum cardiologists for cath lab coverage, weekend consult services, and clinic overflow when employed groups are at capacity.",
    healthSystems: [
      "Jackson Health System and University of Miami Health (academic/quaternary referral patterns)",
      "Baptist Health South Florida (multi-hospital network)",
      "HCA Florida and Tenet-affiliated hospitals in Miami-Dade and Broward",
      "Mount Sinai Medical Center (Miami Beach)",
    ],
    subspecialtyDemand:
      "Interventional and general cardiology locums are most common; structural heart and EP blocks appear when programs expand valve or device clinics.",
    locumRateDrivers:
      "STEMI call, cath lab activation windows, bilingual clinic panels, and winter-season volume often increase weekly locum packages—not guaranteed rates.",
    lifestyleNote:
      "Travel stipends and housing near Miami Beach vs mainland hospitals materially affect net take-home; document commute time to each campus.",
  },
  {
    city: "Orlando",
    state: "FL",
    stateSlug: "florida",
    populationNote:
      "Central Florida’s rapid population growth drives outpatient cardiology demand and inpatient consult volume at regional medical centers.",
    demandNote:
      "Tourism and retiree migration create steady echo, stress testing, and heart failure consult needs—locums often cover vacation gaps and new service launches.",
    healthSystems: [
      "AdventHealth Orlando (large integrated network)",
      "Orlando Health (Heart & Vascular Institute)",
      "HCA Florida hospitals in Greater Orlando",
      "Nemours and pediatric-adjacent cardiology referrals in the region",
    ],
    subspecialtyDemand: "General cardiology clinic blocks and inpatient consults lead; interventional locums support cath lab expansion.",
    locumRateDrivers: "Call frequency, clinic panel size, and same-day stress lab supervision expectations.",
    lifestyleNote: "Assignments cluster along I-4 corridor hospitals—clarify which campuses you will round at daily.",
  },
  {
    city: "Tampa",
    state: "FL",
    stateSlug: "florida",
    populationNote:
      "Tampa Bay combines retiree cardiology demand with a growing employed physician base along the Gulf Coast.",
    demandNote:
      "Locum cardiologists often cover BayCare and Tampa General-adjacent programs during leave or recruitment gaps.",
    healthSystems: [
      "Tampa General Hospital (tertiary referrals)",
      "BayCare Health System",
      "AdventHealth Tampa and Wesley Chapel campuses",
      "HCA West Florida hospitals",
    ],
    subspecialtyDemand: "Heart failure and interventional coverage requests increase when structural programs grow.",
    locumRateDrivers: "Weekend call, PCI backup rules, and multi-campus driving time.",
    lifestyleNote: "Pinellas vs Hillsborough assignments differ in traffic and housing costs—specify preferred side of the bay.",
  },
  {
    city: "Jacksonville",
    state: "FL",
    stateSlug: "florida",
    populationNote:
      "Jacksonville’s expansive geography means cardiologists often cover wide hospital catchment areas with stroke and cardiac co-management.",
    demandNote:
      "Military, retiree, and logistics-industry populations create steady general cardiology and imaging read demand.",
    healthSystems: [
      "Mayo Clinic Florida campus (specialty referral hub—not affiliated with Locum Career Hub)",
      "Baptist Health Jacksonville",
      "Ascension St. Vincent’s",
      "HCA Florida Memorial and Orange Park",
    ],
    subspecialtyDemand: "General and invasive cardiologists; EP locums when device clinic backlogs grow.",
    locumRateDrivers: "Consult census caps, echo read pools, and night call for inpatient services.",
    lifestyleNote: "Mayo-adjacent roles may have distinct credentialing paths—confirm which entity employs the locum contract.",
  },
  {
    city: "Dallas",
    state: "TX",
    stateSlug: "texas",
    populationNote:
      "DFW is one of the fastest-growing US metros with dense suburban hospital construction and employer-sponsored cardiology groups.",
    demandNote:
      "High interventional and general cardiology locum demand across Baylor Scott & White, Texas Health, and Medical City networks.",
    healthSystems: [
      "Baylor Scott & White Health (North Texas)",
      "Texas Health Resources",
      "Medical City Healthcare (HCA)",
      "UT Southwestern-affiliated hospitals (academic referral)",
    ],
    subspecialtyDemand: "Interventional cardiology locums for cath lab and STEMI programs; clinic-heavy general blocks in suburbs.",
    locumRateDrivers: "STEMI activation, add-on PCI cases, and multi-hospital call.",
    lifestyleNote: "Dallas–Fort Worth locums may span 45+ minute drives—stipulate primary campus and max commute.",
  },
  {
    city: "Houston",
    state: "TX",
    stateSlug: "texas",
    populationNote:
      "Houston’s Texas Medical Center ecosystem creates referral complexity and subspecialty depth uncommon in mid-size markets.",
    demandNote:
      "Locum cardiologists support community hospitals outside the medical center and inner-loop programs needing temporary PCI or HF coverage.",
    healthSystems: [
      "Houston Methodist (flagship system—not affiliated with Locum Career Hub)",
      "Memorial Hermann Health System",
      "HCA Houston Healthcare",
      "MD Anderson-adjacent cardiotoxicity and cardio-oncology consult patterns in referral networks",
    ],
    subspecialtyDemand: "Interventional, HF, and imaging reads; strong EP device clinic demand in suburbs.",
    locumRateDrivers: "TMC-adjacent roles vs community hospital roles differ sharply in acuity and pay drivers.",
    lifestyleNote: "Flood-prone weather and hurricane season can affect travel blocks—review cancellation clauses.",
  },
  {
    city: "Austin",
    state: "TX",
    stateSlug: "texas",
    populationNote:
      "Austin’s tech-driven population skews younger, but rapid in-migration increases outpatient cardiology and preventive demand.",
    demandNote:
      "Ascension Dell Seton and St. David’s networks use locums for consult services and cath lab backup.",
    healthSystems: [
      "Ascension Seton / Dell Seton Medical Center",
      "St. David’s HealthCare (HCA)",
      "Baylor Scott & White extensions into Austin metro",
    ],
    subspecialtyDemand: "General cardiology and preventive clinics; interventional when suburban cath labs expand.",
    locumRateDrivers: "Clinic panel growth, prior-auth load, and limited housing supply affecting stipends.",
    lifestyleNote: "Locums popular for physicians wanting Texas license without Houston-level call intensity—verify actual call rules.",
  },
  {
    city: "Atlanta",
    state: "GA",
    stateSlug: "georgia",
    populationNote:
      "Metro Atlanta’s diverse population and I-285 hospital ring create steady inpatient cardiology consult volume.",
    demandNote:
      "Locum demand spikes when large employed groups lose physicians to retirement or private equity transitions.",
    healthSystems: [
      "Emory Healthcare (academic referral)",
      "Piedmont Healthcare",
      "Wellstar Health System",
      "Northside Hospital",
    ],
    subspecialtyDemand: "General, interventional, and EP; imaging read pools for echo-heavy groups.",
    locumRateDrivers: "Traffic between north and south campuses, weekend call, and clinic saturation.",
    lifestyleNote: "Specify OTP vs ITP preference—commute times vary widely.",
  },
  {
    city: "Chicago",
    state: "IL",
    stateSlug: "illinois",
    populationNote:
      "Chicagoland’s dense hospital market mixes academic, safety-net, and suburban community cardiology programs.",
    demandNote:
      "Winter staffing gaps and high-acuity inpatient census drive locum consult and cath lab needs.",
    healthSystems: [
      "Advocate Aurora Health",
      "Northwestern Medicine",
      "Rush University System for Health",
      "Ascension Illinois and AMITA Health footprints",
    ],
    subspecialtyDemand: "Interventional for STEMI networks; general for suburban clinic blocks.",
    locumRateDrivers: "Call pay, snow-related cancellation policies, and multi-site privileges.",
    lifestyleNote: "Illinois license required—no IMLC compact shortcut; plan lead time.",
  },
  {
    city: "Phoenix",
    state: "AZ",
    stateSlug: "arizona",
    populationNote:
      "Phoenix metro retirement migration sustains high outpatient cardiology and structural heart program growth.",
    demandNote:
      "Snowbird season increases winter locum demand for general and interventional cardiologists.",
    healthSystems: [
      "Banner Health",
      "HonorHealth",
      "Mayo Clinic Arizona (referral hub)",
      "Dignity Health / CommonSpirit Arizona",
    ],
    subspecialtyDemand: "General clinic, imaging reads, and cath lab; structural heart when TAVR volumes grow.",
    locumRateDrivers: "Seasonal volume, dry climate travel ease, and weekend clinic extensions.",
    lifestyleNote: "Summer vs winter stipend needs differ—ask about seasonality in contract.",
  },
  {
    city: "New York",
    state: "NY",
    stateSlug: "new-york",
    populationNote:
      "NYC’s five-borough system and Long Island/Westchester extensions create one of the deepest cardiology labor markets in the US.",
    demandNote:
      "Academic, safety-net, and private groups all use locums—credentialing timelines are longer but pay drivers can be higher.",
    healthSystems: [
      "NewYork-Presbyterian network",
      "Mount Sinai Health System",
      "NYU Langone Health",
      "Montefiore / Einstein and Northwell Health footprints",
    ],
    subspecialtyDemand: "Every subspecialty; interventional and HF especially competitive to staff.",
    locumRateDrivers: "Call burden, case mix, malpractice limits, and housing stipends dominate packages.",
    lifestyleNote: "New York license is non-compact—budget extra weeks for licensure and privileging.",
  },
  {
    city: "Los Angeles",
    state: "CA",
    stateSlug: "california",
    populationNote:
      "LA County’s size and traffic patterns make local vs travel locum decisions especially important for cardiologists.",
    demandNote:
      "Kaiser, Cedars-adjacent networks, UCLA, and Providence programs intermittently need locum coverage.",
    healthSystems: [
      "Kaiser Permanente Southern California (staffing model differs from fee-for-service locums)",
      "Cedars-Sinai affiliate hospitals",
      "UCLA Health and USC Keck referral networks",
      "Providence and Dignity hospitals in LA basin",
    ],
    subspecialtyDemand: "Imaging reads, clinic, and interventional; strong demand for Spanish-proficient clinicians in some sites.",
    locumRateDrivers: "California license timing, tail malpractice, and high housing stipends.",
    lifestyleNote: "California is not IMLC—plan licensing early for multi-month blocks.",
  },
  {
    city: "Philadelphia",
    state: "PA",
    stateSlug: "pennsylvania",
    populationNote:
      "Greater Philadelphia blends academic referral (Penn, Jefferson) with large community hospital rings in PA and NJ.",
    demandNote:
      "Locum cardiologists cover Main Line suburbs and city safety-net hospitals when census spikes.",
    healthSystems: [
      "Penn Medicine",
      "Jefferson Health",
      "Main Line Health",
      "Tower Health and Trinity Health Mid-Atlantic",
    ],
    subspecialtyDemand: "General and interventional; structural programs growing in suburbs.",
    locumRateDrivers: "Cross-river licensing if NJ sites included, call, and academic vs community case mix.",
    lifestyleNote: "Clarify whether assignment includes New Jersey campuses requiring separate license.",
  },
  {
    city: "Boston",
    state: "MA",
    stateSlug: "massachusetts",
    populationNote:
      "Boston’s academic density raises credentialing bars but also creates referral depth for subspecialty locums.",
    demandNote:
      "Partners and Beth Israel Lahey networks plus community hospitals use locums for call relief.",
    healthSystems: [
      "Mass General Brigham",
      "Beth Israel Lahey Health",
      "Boston Medical Center (safety-net)",
      "Steward and Tenet community hospitals in MA",
    ],
    subspecialtyDemand: "HF, interventional, and imaging; EP device clinics in suburbs.",
    locumRateDrivers: "Fellowship expectations, research time protected or not, and winter weather.",
    lifestyleNote: "Massachusetts is not IMLC—license lead times matter.",
  },
  {
    city: "San Francisco",
    state: "CA",
    stateSlug: "california",
    populationNote:
      "Bay Area cardiology emphasizes tech-enabled care, imaging, and high cost of living adjustments in packages.",
    demandNote:
      "Locums support peninsula hospitals and East Bay systems when groups lose physicians to retirement.",
    healthSystems: [
      "UCSF Health",
      "Sutter Health",
      "Stanford Medicine affiliate hospitals",
      "Kaiser Northern California (distinct employment models)",
    ],
    subspecialtyDemand: "Imaging, general clinic, and interventional; telecardiology reads for regional pools.",
    locumRateDrivers: "Housing stipends often dominate negotiations due to COL.",
    lifestyleNote: "Document BART vs driving expectations between campuses.",
  },
  {
    city: "Seattle",
    state: "WA",
    stateSlug: "washington",
    populationNote:
      "Puget Sound growth drives cardiology demand across Swedish, Providence, and UW Medicine networks.",
    demandNote:
      "Locum need rises with population influx and employed physician shortages in suburban clinics.",
    healthSystems: [
      "UW Medicine / Harborview",
      "Providence Swedish",
      "Kaiser Permanente Washington",
      "MultiCare in Tacoma corridor",
    ],
    subspecialtyDemand: "General, imaging, and interventional; HF in tertiary centers.",
    locumRateDrivers: "Call, licensing timeline, and housing near downtown vs Eastside.",
    lifestyleNote: "Washington license required—verify compact status changes with your counsel.",
  },
  {
    city: "Denver",
    state: "CO",
    stateSlug: "colorado",
    populationNote:
      "Front Range population growth supports outpatient cardiology and mountain-referral interventional programs.",
    demandNote:
      "HealthONE, UCHealth, and SCL Health footprints recruit locums for cath lab and clinic.",
    healthSystems: [
      "UCHealth University of Colorado",
      "HealthONE (HCA)",
      "SCL Health / Intermountain",
      "Denver Health (safety-net)",
    ],
    subspecialtyDemand: "Interventional for PCI networks; general for mountain community outreach clinics.",
    locumRateDrivers: "Altitude-related patient complexity minimal for cardiologists but travel to mountain sites may apply.",
    lifestyleNote: "Some assignments include Colorado Springs commute—define campuses.",
  },
  {
    city: "Charlotte",
    state: "NC",
    stateSlug: "north-carolina",
    populationNote:
      "Charlotte’s banking-hub growth fuels suburban hospital expansion and cardiology group consolidation.",
    demandNote:
      "Atrium Health (Advocate) and Novant footprints frequently need locum inpatient and cath lab support.",
    healthSystems: [
      "Advocate Health (Atrium) Carolinas",
      "Novant Health",
      "HCA North Carolina divisions",
    ],
    subspecialtyDemand: "General and interventional; preventive cardiology in affluent suburbs.",
    locumRateDrivers: "Weekend call and rapid population growth in Union/Mecklenburg counties.",
    lifestyleNote: "Carolinas license with IMLC eligibility for many physicians—still verify.",
  },
  {
    city: "Nashville",
    state: "TN",
    stateSlug: "tennessee",
    populationNote:
      "Nashville’s healthcare employer concentration creates competitive cardiology recruitment and periodic locum gaps.",
    demandNote:
      "HCA corporate presence plus Vanderbilt referral network shapes local locum market.",
    healthSystems: [
      "Vanderbilt University Medical Center",
      "HCA Tristar divisions",
      "Saint Thomas Health (Ascension)",
    ],
    subspecialtyDemand: "General clinic and hospital consults; interventional when suburban cath labs expand.",
    locumRateDrivers: "Music-city travel desirability can lower stipend pressure but call still drives pay.",
    lifestyleNote: "Tennessee IMLC participation helps multi-state locum planners.",
  },
  {
    city: "San Diego",
    state: "CA",
    stateSlug: "california",
    populationNote:
      "San Diego county military and retiree mix sustains cardiology volume with mild climate year-round.",
    demandNote:
      "Scripps, Sharp, and UC San Diego networks use locums for clinic and cath lab coverage.",
    healthSystems: [
      "Scripps Health",
      "Sharp HealthCare",
      "UC San Diego Health",
      "Kaiser San Diego",
    ],
    subspecialtyDemand: "General, interventional, and imaging; veterans-system adjacent referrals.",
    locumRateDrivers: "California licensing, housing near coast, and call.",
    lifestyleNote: "Border proximity—confirm no cross-border Mexico call expectations.",
  },
  {
    city: "Minneapolis",
    state: "MN",
    stateSlug: "minnesota",
    populationNote:
      "Twin Cities cardiology is anchored by Fairview, Allina, and Mayo referral patterns from greater Minnesota.",
    demandNote:
      "Winter leave coverage and cath lab expansion drive locum postings.",
    healthSystems: [
      "M Health Fairview",
      "Allina Health",
      "HealthPartners",
      "Hennepin Healthcare",
    ],
    subspecialtyDemand: "General, interventional, and imaging reads.",
    locumRateDrivers: "Winter weather, call, and Minnesota license (non-IMLC).",
    lifestyleNote: "Plan cold-weather travel contingencies in contracts.",
  },
  {
    city: "Detroit",
    state: "MI",
    stateSlug: "michigan",
    populationNote:
      "Metro Detroit’s cardiology burden reflects socioeconomic risk factors and high inpatient acuity at safety-net and community hospitals.",
    demandNote:
      "Henry Ford, Corewell (Beaumont), and Trinity Health MI use locums for consult and cath lab relief.",
    healthSystems: [
      "Henry Ford Health",
      "Corewell Health",
      "Trinity Health Michigan",
      "Detroit Medical Center",
    ],
    subspecialtyDemand: "General and interventional; HF in urban centers.",
    locumRateDrivers: "Acuity, call, and Michigan license timelines.",
    lifestyleNote: "Clarify suburban vs downtown campus security and parking logistics.",
  },
  {
    city: "Cleveland",
    state: "OH",
    stateSlug: "ohio",
    populationNote:
      "Cleveland Clinic’s national brand influences regional referral patterns though community hospitals maintain separate staffing needs.",
    demandNote:
      "Locums support community hospitals in Northeast Ohio when employed physicians depart for Cleveland Clinic or coastal markets.",
    healthSystems: [
      "Cleveland Clinic (flagship—not affiliated with Locum Career Hub)",
      "University Hospitals",
      "MetroHealth System",
      "Summa Health and Mercy footprints",
    ],
    subspecialtyDemand: "Interventional and general; imaging read pools.",
    locumRateDrivers: "Lake-effect weather travel issues and call frequency.",
    lifestyleNote: "Do not assume Cleveland Clinic employment—contracts are with hiring entities named in writing.",
  },
  {
    city: "Washington",
    state: "DC",
    stateSlug: "district-of-columbia",
    populationNote:
      "DC, Northern Virginia, and suburban Maryland function as one cardiology labor market with federal employee insurance mix.",
    demandNote:
      "MedStar, Inova, and Johns Hopkins-adjacent networks pull locums for policy-season volume and physician leave.",
    healthSystems: [
      "MedStar Health (DC + MD)",
      "Inova Health System (Virginia)",
      "George Washington University Hospital",
      "Children’s National for pediatric cardiology referrals",
    ],
    subspecialtyDemand: "General, interventional, and HF; government employee-heavy clinics.",
    locumRateDrivers: "Multi-state licenses if crossing DC/VA/MD, call, and security credentialing at federal-adjacent sites.",
    lifestyleNote: "Clarify which state license qualifies for each campus.",
  },
  {
    city: "Raleigh",
    state: "NC",
    stateSlug: "north-carolina",
    populationNote:
      "Research Triangle growth drives young and retiree cardiology demand with expanding suburban hospitals.",
    demandNote:
      "Duke and UNC referral networks surround community hospitals needing locum coverage.",
    healthSystems: [
      "Duke Health (referral hub)",
      "UNC Health affiliate community sites",
      "WakeMed",
      "Duke-adjacent Rex/UNC REX footprints",
    ],
    subspecialtyDemand: "General clinic and consults; interventional in growing suburbs.",
    locumRateDrivers: "Rapid population growth and competitive employed market.",
    lifestyleNote: "Triangle traffic between Durham, Raleigh, and Chapel Hill affects daily campus choice.",
  },
];

const byCitySlug = new Map(METRO_PROFILES.map((m) => [citySeoSlug(m.city), m]));

export function getMetroRichProfile(citySlug: string): MetroRichProfile | undefined {
  return byCitySlug.get(citySlug);
}

export function buildMetroRichSections(profile: MetroRichProfile): ContentSection[] {
  const geo = `${profile.city}, ${profile.state}`;
  return [
    {
      h2: `Cardiology demand in ${geo}`,
      paragraphs: [profile.populationNote, profile.demandNote],
    },
    {
      h2: "Hospital and health system landscape (educational)",
      paragraphs: [
        `Major employers and referral centers commonly discussed in ${profile.city} include: ${profile.healthSystems.join("; ")}.`,
        "Locum Career Hub is not affiliated with these organizations. We help cardiologists evaluate independent locum opportunities that may exist at similar facility types in the region.",
      ],
    },
    {
      h2: "Subspecialty mix for locum cardiologists",
      paragraphs: [profile.subspecialtyDemand, profile.lifestyleNote],
    },
    {
      h2: "What drives locum compensation here (not a guarantee)",
      paragraphs: [
        profile.locumRateDrivers,
        "Use our locum salary estimator for directional ranges, then compare written offers that document call, STEMI responsibility, and clinic panel size.",
      ],
    },
  ];
}
