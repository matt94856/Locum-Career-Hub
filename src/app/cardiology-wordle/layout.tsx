import type { ReactNode } from "react";
import "@/components/tools/cardiology-wordle.css";

export default function HeartleLayout({ children }: { children: ReactNode }) {
  return <div className="heartle-root">{children}</div>;
}
