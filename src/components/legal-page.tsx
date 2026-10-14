export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-20 sm:px-8 md:py-28">
      <h1 className="text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink">
        {title}
      </h1>
      <div className="mt-12 space-y-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-ink [&_p]:mt-3 [&_p]:font-serif [&_p]:text-lg [&_p]:leading-relaxed [&_p]:text-muted">
        {children}
      </div>
    </div>
  );
}
