export function SectionHeading({
  id,
  title,
  intro,
}: {
  id: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="grid gap-5 md:grid-cols-12 md:items-end">
      <h2
        id={id}
        className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-ink md:col-span-6"
      >
        {title}
      </h2>
      {intro && (
        <p className="max-w-xl font-serif text-lg leading-relaxed text-muted md:col-span-5 md:col-start-8">
          {intro}
        </p>
      )}
    </div>
  );
}
