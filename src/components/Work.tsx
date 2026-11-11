import { ArrowRight, ArrowUpRight, Images } from "lucide-react";
import { useState } from "react";
import { SectionEyebrow } from "@/components/Brand";
import { useSite } from "@/lib/hooks";
import { processSteps, projects } from "@/lib/site";
import { cn } from "@/utils/cn";

export function Portfolio() {
  const { openProject, openContact } = useSite();
  const [expanded, setExpanded] = useState(false);

  const visible = expanded ? projects : projects.filter((p) => p.featured);

  return (
    <section id="portfolio" className="relative overflow-hidden bg-navy py-14 text-white sm:py-16 lg:py-20">
      <div
        className="absolute inset-0 bg-[linear-gradient(105deg,#020d35_0%,#031438_55%,#04295f_100%)]"
        aria-hidden="true"
      />
      <div className="dot-grid absolute inset-y-0 right-0 w-1/3 opacity-[0.18]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-electric/20 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-site relative grid gap-8 lg:grid-cols-[235px_1fr] lg:items-center">
        <div>
          <SectionEyebrow tone="light">Our Work</SectionEyebrow>
          <h2 className="mt-2.5 font-display text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[38px]">
            Portfolio
          </h2>
          <p className="mt-2 max-w-[210px] text-[12.5px] leading-relaxed text-white/65">
            A glimpse of our recent projects.
          </p>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            className="btn mt-5 bg-gradient-to-r from-royal to-electric px-5 py-2.5 text-[12.5px] text-white shadow-[0_12px_26px_-14px_rgba(8,123,255,0.9)] transition hover:-translate-y-0.5"
          >
            {expanded ? "Show Less" : "View Portfolio"}
            <ArrowRight
              className={cn("h-3.5 w-3.5 transition-transform", expanded && "-rotate-90")}
              aria-hidden="true"
            />
          </button>
          <button
            type="button"
            onClick={() => openContact("Portfolio enquiry")}
            className="mt-3 flex items-center gap-2 text-[11.5px] font-medium text-cyanbrand/90 hover:text-white"
          >
            <Images className="h-3.5 w-3.5" aria-hidden="true" />
            Start a project like these
          </button>
          <p className="mt-4 max-w-[210px] text-[10px] leading-relaxed text-white/40">
            Illustrative showcase. Client work is published with permission only.
          </p>
        </div>

        <ul className="grid grid-cols-2 gap-3 sm:gap-3.5 lg:grid-cols-4">
          {visible.map((project) => (
            <li key={project.id}>
              <button
                type="button"
                onClick={() => openProject(project.id)}
                className="group relative block w-full overflow-hidden rounded-xl border-[3px] border-white/90 bg-white text-left shadow-[0_18px_36px_-22px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-cyanbrand focus-visible:border-cyanbrand"
                aria-label={`View project: ${project.title} — ${project.category}`}
              >
                <span className="relative block aspect-[4/3] overflow-hidden rounded-[7px] bg-slate-100">
                  <img
                    src={project.image}
                    alt={`${project.title} — ${project.category} project preview`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                    width={800}
                    height={600}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/10 to-transparent opacity-90" />
                  <span className="absolute inset-x-2.5 bottom-2 text-white">
                    <span className="block text-[8px] font-semibold uppercase tracking-[0.14em] text-cyanbrand">
                      {project.category}
                    </span>
                    <span className="mt-0.5 block font-display text-[11.5px] font-semibold leading-tight">
                      {project.title}
                    </span>
                  </span>
                  <span className="absolute right-2 top-2 grid h-7 w-7 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div className="container-site">
        <div className="max-w-xl">
          <SectionEyebrow>How We Work</SectionEyebrow>
          <h2 className="mt-2.5 section-title">Our Working Process</h2>
          <p className="mt-2 section-copy">A simple and effective process to get you started.</p>
        </div>

        <ol className="relative mt-9 grid gap-7 sm:grid-cols-2 sm:gap-8 lg:grid-cols-6 lg:gap-0">
          {processSteps.map((step, index) => {
            const isLast = index === processSteps.length - 1;
            return (
              <li key={step.title} className="relative flex gap-4 lg:flex-col lg:items-center lg:gap-3 lg:text-center">
                {/* vertical connector on mobile */}
                {!isLast && (
                  <span
                    className="absolute left-[19px] top-11 h-[calc(100%+8px)] w-px bg-slate-200 sm:hidden"
                    aria-hidden="true"
                  />
                )}

                <span
                  className={cn(
                    "relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border font-display text-[14px] font-bold transition-colors",
                    isLast
                      ? "border-navy bg-navy text-white shadow-[0_10px_20px_-12px_rgba(2,13,53,0.8)]"
                      : "border-slate-300 bg-white text-navy"
                  )}
                >
                  {index + 1}
                </span>

                {!isLast && (
                  <span
                    className="absolute left-[calc(50%+26px)] top-5 hidden w-[calc(100%-52px)] items-center lg:flex"
                    aria-hidden="true"
                  >
                    <span className="h-px flex-1 border-t border-dashed border-slate-300" />
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" className="ml-1 shrink-0">
                      <path d="M1 1.5 5 4.5 1 7.5" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                )}

                <div className="lg:mt-0.5">
                  <h3 className="font-display text-[13.5px] font-semibold leading-tight text-navy">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-[11.5px] leading-snug text-slate-500">
                    {step.copy}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
