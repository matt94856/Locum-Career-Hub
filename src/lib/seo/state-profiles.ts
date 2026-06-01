import { getStateNameBySlug, stateNameToSlug } from "@/lib/us-state-slugs";
import { US_STATES } from "@/lib/states";

/** States not participating in the Interstate Medical Licensure Compact (physician IMLC) as commonly referenced for planning. */
const NON_IMLC_CODES = new Set(["CA", "OR", "MN", "MA", "MI", "VT", "NV", "NY", "NJ", "RI", "CT", "DC"]);

export type StateProfile = {
  slug: string;
  name: string;
  code: string;
  imlcEligible: boolean;
  licensingBoardLabel: string;
  majorMetros: string[];
  region: string;
  marketSnapshot: string;
  licensingPath: string;
  locumDemandNotes: string;
  travelVsLocal: string;
  seasonalNotes?: string;
  credentialingTips: string[];
};

const STATE_CODES: Record<string, string> = {
  Alabama: "AL",
  Alaska: "AK",
  Arizona: "AZ",
  Arkansas: "AR",
  California: "CA",
  Colorado: "CO",
  Connecticut: "CT",
  Delaware: "DE",
  "District of Columbia": "DC",
  Florida: "FL",
  Georgia: "GA",
  Hawaii: "HI",
  Idaho: "ID",
  Illinois: "IL",
  Indiana: "IN",
  Iowa: "IA",
  Kansas: "KS",
  Kentucky: "KY",
  Louisiana: "LA",
  Maine: "ME",
  Maryland: "MD",
  Massachusetts: "MA",
  Michigan: "MI",
  Minnesota: "MN",
  Mississippi: "MS",
  Missouri: "MO",
  Montana: "MT",
  Nebraska: "NE",
  Nevada: "NV",
  "New Hampshire": "NH",
  "New Jersey": "NJ",
  "New Mexico": "NM",
  "New York": "NY",
  "North Carolina": "NC",
  "North Dakota": "ND",
  Ohio: "OH",
  Oklahoma: "OK",
  Oregon: "OR",
  Pennsylvania: "PA",
  "Rhode Island": "RI",
  "South Carolina": "SC",
  "South Dakota": "SD",
  Tennessee: "TN",
  Texas: "TX",
  Utah: "UT",
  Vermont: "VT",
  Virginia: "VA",
  Washington: "WA",
  "West Virginia": "WV",
  Wisconsin: "WI",
  Wyoming: "WY",
};

const METROS: Record<string, string[]> = {
  alabama: ["Birmingham", "Huntsville", "Mobile"],
  alaska: ["Anchorage", "Fairbanks"],
  arizona: ["Phoenix", "Tucson", "Flagstaff"],
  arkansas: ["Little Rock", "Fayetteville"],
  california: ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
  colorado: ["Denver", "Colorado Springs"],
  connecticut: ["Hartford", "New Haven", "Stamford"],
  delaware: ["Wilmington", "Dover"],
  "district-of-columbia": ["Washington", "DC metro"],
  florida: ["Miami", "Tampa", "Orlando", "Jacksonville"],
  georgia: ["Atlanta", "Augusta", "Savannah"],
  hawaii: ["Honolulu", "Maui"],
  idaho: ["Boise", "Idaho Falls"],
  illinois: ["Chicago", "Springfield", "Peoria"],
  indiana: ["Indianapolis", "Fort Wayne"],
  iowa: ["Des Moines", "Iowa City"],
  kansas: ["Kansas City", "Wichita"],
  kentucky: ["Louisville", "Lexington"],
  louisiana: ["New Orleans", "Baton Rouge", "Shreveport"],
  maine: ["Portland", "Bangor"],
  maryland: ["Baltimore", "Bethesda", "Annapolis"],
  massachusetts: ["Boston", "Worcester"],
  michigan: ["Detroit", "Grand Rapids", "Ann Arbor"],
  minnesota: ["Minneapolis", "Rochester", "Duluth"],
  mississippi: ["Jackson", "Gulfport"],
  missouri: ["St. Louis", "Kansas City", "Springfield"],
  montana: ["Billings", "Missoula"],
  nebraska: ["Omaha", "Lincoln"],
  nevada: ["Las Vegas", "Reno"],
  "new-hampshire": ["Manchester", "Portsmouth"],
  "new-jersey": ["Newark", "Jersey City", "Camden"],
  "new-mexico": ["Albuquerque", "Santa Fe"],
  "new-york": ["New York City", "Buffalo", "Rochester", "Albany"],
  "north-carolina": ["Charlotte", "Raleigh", "Durham"],
  "north-dakota": ["Fargo", "Bismarck"],
  ohio: ["Cleveland", "Columbus", "Cincinnati"],
  oklahoma: ["Oklahoma City", "Tulsa"],
  oregon: ["Portland", "Eugene"],
  pennsylvania: ["Philadelphia", "Pittsburgh", "Harrisburg"],
  "rhode-island": ["Providence"],
  "south-carolina": ["Charleston", "Columbia", "Greenville"],
  "south-dakota": ["Sioux Falls", "Rapid City"],
  tennessee: ["Nashville", "Memphis", "Knoxville"],
  texas: ["Houston", "Dallas", "Austin", "San Antonio"],
  utah: ["Salt Lake City", "Provo"],
  vermont: ["Burlington"],
  virginia: ["Richmond", "Virginia Beach", "Northern Virginia"],
  washington: ["Seattle", "Spokane", "Tacoma"],
  "west-virginia": ["Charleston", "Morgantown"],
  wisconsin: ["Milwaukee", "Madison"],
  wyoming: ["Cheyenne", "Casper"],
};

const REGION: Record<string, string> = {
  alabama: "Southeast",
  alaska: "Pacific",
  arizona: "Southwest",
  arkansas: "South",
  california: "West Coast",
  colorado: "Mountain West",
  connecticut: "Northeast",
  delaware: "Mid-Atlantic",
  "district-of-columbia": "Mid-Atlantic",
  florida: "Southeast",
  georgia: "Southeast",
  hawaii: "Pacific",
  idaho: "Mountain West",
  illinois: "Midwest",
  indiana: "Midwest",
  iowa: "Midwest",
  kansas: "Great Plains",
  kentucky: "South",
  louisiana: "South",
  maine: "Northeast",
  maryland: "Mid-Atlantic",
  massachusetts: "Northeast",
  michigan: "Midwest",
  minnesota: "Upper Midwest",
  mississippi: "South",
  missouri: "Midwest",
  montana: "Mountain West",
  nebraska: "Great Plains",
  nevada: "West",
  "new-hampshire": "Northeast",
  "new-jersey": "Mid-Atlantic",
  "new-mexico": "Southwest",
  "new-york": "Northeast",
  "north-carolina": "Southeast",
  "north-dakota": "Great Plains",
  ohio: "Midwest",
  oklahoma: "South",
  oregon: "West Coast",
  pennsylvania: "Mid-Atlantic",
  "rhode-island": "Northeast",
  "south-carolina": "Southeast",
  "south-dakota": "Great Plains",
  tennessee: "South",
  texas: "South",
  utah: "Mountain West",
  vermont: "Northeast",
  virginia: "Mid-Atlantic",
  washington: "Pacific Northwest",
  "west-virginia": "Appalachia",
  wisconsin: "Midwest",
  wyoming: "Mountain West",
};

function regionMarketLine(region: string, name: string): string {
  const lines: Record<string, string> = {
    Southeast: `${name} combines growing outpatient demand with hospital coverage gaps in both metro and community settings—locum demand often tracks snowbird migration and regional population shifts.`,
    Southwest: `${name} markets frequently mix seasonal volume swings with strong travel-locum interest; stipends and housing matter as much as headline rates.`,
    "West Coast": `${name} placements tend to be compliance-forward with longer credentialing timelines—plan early if you are targeting high-demand coastal metros.`,
    "Pacific Northwest": `${name} health systems often emphasize work-life boundaries and clear documentation; competition for desirable blocks can be high.`,
    Midwest: `${name} offers a blend of large-system roles and independent community hospitals—credentialing speed varies more by facility than by coast.`,
    Northeast: `${name} has dense metro demand and tight licensing timelines; suburban and community hospitals can be strong locum entry points.`,
    "Mid-Atlantic": `${name} pairs major metro depth with community hospital networks—licensing and privileging should be sequenced before you commit to start dates.`,
    South: `${name} rural and suburban hospitals often use locums for core specialty coverage; travel stipends and call clarity are central negotiation points.`,
    "Mountain West": `${name} assignments may include critical access sites with broader scope—confirm backup, transfer agreements, and call frequency.`,
    "Great Plains": `${name} frequently relies on locums for access expansion; plan multi-week blocks and clear travel logistics up front.`,
    Pacific: `${name} locum work may involve island or remote logistics—factor travel time and licensure lead times into your calendar.`,
    Appalachia: `${name} community hospitals often need reliable cross-specialty coverage; document backup and transfer paths before accepting solo roles.`,
    "Upper Midwest": `${name} mixes academic centers with community systems—winter weather can affect travel plans for locum blocks.`,
  };
  return lines[region] ?? `${name} locum demand varies by specialty and facility type; metro and community sites both use contract coverage when pipelines are thin.`;
}

function buildProfile(name: string): StateProfile {
  const slug = stateNameToSlug(name);
  const code = STATE_CODES[name] ?? "";
  const imlcEligible = code ? !NON_IMLC_CODES.has(code) : true;
  const region = REGION[slug] ?? "United States";
  const metros = METROS[slug] ?? [name];
  const board = code ? `${name} medical board` : `${name} licensing authority`;

  const licensingPath = imlcEligible
    ? `Physicians with a primary license in another IMLC member state may pursue a faster pathway to ${name} licensure via the compact—still verify specialty-specific rules and timeline with the ${board}.`
    : `${name} typically requires a full state license application (not compact-eligible for most physicians). Start early: primary-source verification, transcripts, and references often set the critical path.`;

  const travelVsLocal = metros.length > 2
    ? `Many clinicians split time between travel blocks to ${metros.slice(0, 2).join(" or ")} and local coverage near home—distance should match recovery needs, not just rate.`
    : `Travel and local block options both exist; confirm housing, stipends, and commute assumptions before signing.`;

  const seasonal =
    slug === "florida" || slug === "arizona"
      ? "Winter seasonal volume can tighten calendars—book credentialing and desired blocks early."
      : slug === "alaska" || slug === "montana" || slug === "wyoming"
        ? "Weather and remote logistics can shift start dates—build buffer into travel plans."
        : undefined;

  return {
    slug,
    name,
    code,
    imlcEligible,
    licensingBoardLabel: board,
    majorMetros: metros,
    region,
    marketSnapshot: regionMarketLine(region, name),
    licensingPath,
    locumDemandNotes: `Cardiology locum demand in ${name} often clusters around inpatient consult, cath lab, clinic, and imaging read pools—interventional and EP roles require site-specific privileging and STEMI or lab capabilities confirmed in writing.`,
    travelVsLocal,
    seasonalNotes: seasonal,
    credentialingTips: [
      `Confirm whether the facility uses a central credentialing body or local privileging—${name} systems vary.`,
      "Request written expectations for census, call, and backup before you accept a rate.",
      imlcEligible
        ? "If you hold a compact-eligible license elsewhere, ask whether compact licensure applies to your specialty and assignment type."
        : "Plan for full state licensure lead time; interim telehealth roles may still require separate approvals.",
    ],
  };
}

const PROFILES: StateProfile[] = US_STATES.map((name) => buildProfile(name));
const bySlug = new Map(PROFILES.map((p) => [p.slug, p]));

export function getStateProfile(slug: string): StateProfile | undefined {
  if (bySlug.has(slug)) return bySlug.get(slug);
  const name = getStateNameBySlug(slug);
  return name ? buildProfile(name) : undefined;
}

export function getStateProfileSections(profile: StateProfile): { h2: string; paragraphs: string[] }[] {
  const metroLine =
    profile.majorMetros.length > 0
      ? `Common assignment metros and hubs include ${profile.majorMetros.join(", ")}—demand still exists outside these cities in community and critical access settings.`
      : "";

  const sections: { h2: string; paragraphs: string[] }[] = [
    {
      h2: `${profile.name} locum market snapshot`,
      paragraphs: [profile.marketSnapshot, profile.locumDemandNotes, metroLine].filter(Boolean),
    },
    {
      h2: `Licensing and the ${profile.licensingBoardLabel}`,
      paragraphs: [
        profile.licensingPath,
        profile.imlcEligible
          ? `${profile.name} is commonly approached via IMLC for eligible physicians, but each assignment still requires facility privileging and payer enrollment where applicable.`
          : `${profile.name} licensing is not compact-eligible for most physicians—treat licensure as a gating item on your timeline, not an afterthought.`,
      ],
    },
    {
      h2: "Travel blocks vs local coverage",
      paragraphs: [profile.travelVsLocal],
    },
  ];

  if (profile.seasonalNotes) {
    sections.push({
      h2: "Seasonal planning",
      paragraphs: [profile.seasonalNotes],
    });
  }

  sections.push({
    h2: "Credentialing tips that save weeks",
    paragraphs: profile.credentialingTips,
  });

  return sections;
}
