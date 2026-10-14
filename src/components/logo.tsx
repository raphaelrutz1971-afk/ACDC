import { site } from "@/content/site";

/** Wordmark: lowercase name with a highlighter stroke under the descender line. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex items-baseline text-[1.65rem] leading-none font-extrabold tracking-[-0.04em] ${className}`}
    >
      <span
        aria-hidden
        className="absolute bottom-[-0.16em] left-[-0.08em] h-[0.26em] w-[calc(100%+0.16em)] -skew-x-12 rounded-[2px] bg-marker"
      />
      <span className="relative text-ink">{site.name}</span>
      <span className="relative ml-0.5 text-fir">.</span>
    </span>
  );
}
