export function displayShareHostPath(url: string) {
  try {
    const parsed = new URL(url, "https://www.locumcareerhub.com");
    const host = parsed.host.replace(/^www\./, "");
    return decodeURIComponent(`${host}${parsed.pathname}${parsed.search}`);
  } catch {
    return url.replace(/^https?:\/\/(www\.)?/, "");
  }
}

/** Phone-safe share URL: wraps instead of overflowing the screen. */
export function ShareLinkChip({ url, className = "" }: { url: string; className?: string }) {
  return (
    <a
      href={url}
      className={`inline-block max-w-full break-all rounded-xl bg-brand-50 px-3 py-2 font-mono text-[13px] leading-5 text-brand-800 ring-1 ring-brand-100 hover:bg-brand-100 ${className}`}
    >
      {displayShareHostPath(url)}
    </a>
  );
}
