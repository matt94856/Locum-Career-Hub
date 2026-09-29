import { buildOpenJobOpportunity } from "./build-opportunity";
import { OPEN_JOB_DRAFTS } from "./catalog";

export { OPEN_JOB_DRAFTS } from "./catalog";
export { buildOpenJobOpportunity } from "./build-opportunity";
export type { OpenJobDraft, OpenJobKind, OpenJobTrack } from "./types";

export const OPEN_JOB_OPPORTUNITIES = OPEN_JOB_DRAFTS.map(buildOpenJobOpportunity);
