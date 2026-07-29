export default function Loading() {
  return (
    <div className="container-site flex min-h-[40vh] items-center justify-center py-20" role="status" aria-live="polite">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-pulse rounded-full bg-brand-200" aria-hidden />
        <p className="mt-4 text-sm font-medium text-slate-600">Loading…</p>
      </div>
    </div>
  );
}
