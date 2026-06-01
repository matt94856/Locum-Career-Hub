import type { Metadata } from "next";
import { CardiologyLocumJobsHubView } from "@/components/marketing/CardiologyLocumJobsHubView";
import { buildCardiologyHubSerpMetadata } from "@/lib/serp-ctr";

export const metadata: Metadata = buildCardiologyHubSerpMetadata();

export default function CardiologyLocumJobsHubPage() {
  return <CardiologyLocumJobsHubView />;
}
