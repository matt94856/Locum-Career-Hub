import type { Metadata } from "next";
import { CardiologyLocumJobsHubView } from "@/components/marketing/CardiologyLocumJobsHubView";
import {
  CARDIOLOGY_HUB_DESCRIPTION,
  CARDIOLOGY_HUB_PATH,
  CARDIOLOGY_HUB_TITLE,
} from "@/lib/seo/cardiology-locum-jobs-config";
import { buildSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildSerpMetadata({
  title: CARDIOLOGY_HUB_TITLE,
  description: CARDIOLOGY_HUB_DESCRIPTION,
  path: CARDIOLOGY_HUB_PATH,
  keywords: ["locum cardiologist jobs", "cardiology locum tenens", "cardiologist recruiting", "locum cardiology jobs"],
});

export default function CardiologyLocumJobsHubPage() {
  return <CardiologyLocumJobsHubView />;
}
