import type { Dictionary } from "@/content/dictionaries";
import { SectionHeading } from "./section-heading";

export function Process({ t }: { t: Dictionary["process"] }) {
  return (
    <section aria-labelledby="ablauf" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-32">
      <SectionHeading id="ablauf" title={t.title} intro={t.intro} />
      <ol className="mt-16 grid gap-px overflow-hidden rounded-[6px] border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4">
        {t.steps.map((step, i) => (
          <li key={step.title} className="flex flex-col bg-paper p-7">
            <span
              aria-hidden
              className="text-6xl leading-none font-extrabold tracking-[-0.05em] text-transparent [-webkit-text-stroke:1.5px_var(--fir)]"
            >
              {i + 1}
            </span>
            <h3 className="mt-10 text-xl font-bold tracking-tight text-ink">
              <span className="sr-only">{i + 1}. </span>
              {step.title}
            </h3>
            <p className="mt-2 font-serif text-[1.05rem] leading-relaxed text-muted">{step.text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
