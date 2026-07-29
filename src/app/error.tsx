"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[app-error]", error);
  }, [error]);

  return (
    <main className="container-site flex min-h-[50vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">Something went wrong</p>
      <h1 className="mt-4 font-display text-3xl font-normal tracking-tight text-slate-950 sm:text-4xl">
        We could not load this page
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
        Please try again. If the problem continues, email us from the contact page and we will help from there.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={reset}>
          Try again
        </Button>
        <Button href="/" variant="secondary">
          Go home
        </Button>
        <Button href="/contact" variant="ghost">
          Contact
        </Button>
      </div>
    </main>
  );
}
