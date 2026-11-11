import {
  ArrowRight,
  BadgeCheck,
  Check,
  ChevronLeft,
  ChevronRight,
  Info,
  Minus,
  Plus,
  Quote,
  Sparkles,
  Star,
} from "lucide-react";
import { useState } from "react";
import { SectionEyebrow, Stars } from "@/components/Brand";
import { useSite } from "@/lib/hooks";
import { faqs, images, pricingPlans, testimonials } from "@/lib/site";
import { cn } from "@/utils/cn";

export function TestimonialsAndPricing() {
  const { openContact } = useSite();
  const [index, setIndex] = useState(0);
  const [reviewsOpen, setReviewsOpen] = useState(false);
  const active = testimonials[index];

  const move = (dir: number) =>
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-gradient-to-b from-lightblue/60 via-white to-white py-12 sm:py-14 lg:py-16"
    >
      <div className="container-site grid items-stretch gap-5 lg:grid-cols-[1.06fr_1fr]">
        {/* Testimonials */}
        <div className="relative overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-[0_26px_60px_-36px_rgba(2,13,53,0.8)] sm:p-6">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_100%_at_100%_0%,rgba(8,123,255,0.45),transparent_65%)]"
            aria-hidden="true"
          />
          <div className="diagonal-lines pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

          <div className="relative grid gap-5 md:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] md:items-center">
            <div>
              <SectionEyebrow tone="light">What Our Clients Say</SectionEyebrow>
              <h2 className="mt-2.5 font-display text-[23px] font-bold leading-[1.12] tracking-[-0.03em] text-white sm:text-[26px]">
                Trusted by Clients <span className="text-cyanbrand">Across the World</span>
              </h2>
              <p className="mt-2 text-[11.5px] text-white/60">Real stories. Real results.</p>
              <button
                type="button"
                onClick={() => setReviewsOpen((v) => !v)}
                aria-expanded={reviewsOpen}
                className="btn mt-4 bg-gradient-to-r from-royal to-electric px-4 py-2.5 text-[11.5px] text-white transition hover:-translate-y-0.5"
              >
                {reviewsOpen ? "Hide Reviews" : "Read More Reviews"}
                <ArrowRight
                  className={cn("h-3.5 w-3.5 transition-transform", reviewsOpen && "-rotate-90")}
                  aria-hidden="true"
                />
              </button>
              <div className="mt-4 flex items-center gap-2 border-t border-white/10 pt-3">
                <span className="flex -space-x-2" aria-hidden="true">
                  {images.avatars.map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="h-6 w-6 rounded-full border border-navy object-cover"
                      loading="lazy"
                    />
                  ))}
                </span>
                <span className="text-[10px] leading-tight text-white/55">
                  Client feedback shared with permission
                </span>
              </div>
            </div>

            <div className="relative">
              <div
                className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-cyanbrand/25 to-transparent blur-md"
                aria-hidden="true"
              />
              <div
                key={active.name}
                className="animate-fade-up relative rounded-xl bg-white p-4 text-navy shadow-[0_18px_40px_-22px_rgba(0,0,0,0.7)] sm:p-5"
              >
                <Quote className="h-5 w-5 fill-royal/15 text-royal" aria-hidden="true" />
                <blockquote className="mt-2 min-h-[80px] text-[12px] leading-relaxed text-slate-600 sm:min-h-[86px] sm:text-[12.5px]">
                  “{active.quote}”
                </blockquote>
                <div className="mt-3 flex items-end justify-between gap-3 border-t border-slate-100 pt-3">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={active.avatar}
                      alt={`Portrait of ${active.name}`}
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-lightblue"
                      width={320}
                      height={320}
                      loading="lazy"
                    />
                    <div>
                      <p className="font-display text-[11.5px] font-semibold leading-tight text-navy">
                        {active.name}
                      </p>
                      <p className="text-[10px] text-slate-500">{active.role}</p>
                    </div>
                  </div>
                  <Stars />
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5" aria-label="Testimonial pages">
                    {testimonials.map((t, i) => (
                      <button
                        key={t.name}
                        type="button"
                        onClick={() => setIndex(i)}
                        aria-label={`Show testimonial ${i + 1}`}
                        aria-current={i === index}
                        className={cn(
                          "h-1.5 rounded-full transition-all",
                          i === index ? "w-4 bg-royal" : "w-1.5 bg-slate-300 hover:bg-slate-400"
                        )}
                      />
                    ))}
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => move(-1)}
                      aria-label="Previous testimonial"
                      className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-royal hover:text-royal"
                    >
                      <ChevronLeft className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      onClick={() => move(1)}
                      aria-label="Next testimonial"
                      className="grid h-7 w-7 place-items-center rounded-full border border-slate-200 text-slate-500 transition hover:border-royal hover:text-royal"
                    >
                      <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="relative mt-4 flex items-start gap-1.5 border-t border-white/10 pt-3 text-[9.5px] leading-relaxed text-white/45">
            <Info className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
            Sample content for layout. Verified customer testimonials are published only with
            written permission.
          </p>

          {reviewsOpen && (
            <ul className="relative mt-4 grid gap-2.5 sm:grid-cols-2">
              {testimonials.map((t) => (
                <li key={t.name} className="rounded-xl bg-white/[0.07] p-3 ring-1 ring-white/10">
                  <Stars className="mb-1.5" />
                  <p className="text-[10.5px] leading-relaxed text-white/75">“{t.quote}”</p>
                  <p className="mt-2 font-display text-[10.5px] font-semibold text-white">
                    {t.name} <span className="font-normal text-white/45">· {t.role}</span>
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Pricing */}
        <div
          id="pricing"
          className="relative flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_55px_-38px_rgba(2,13,53,0.5)] sm:p-6"
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <SectionEyebrow>Our Pricing Plans</SectionEyebrow>
              <h2 className="mt-2 font-display text-[21px] font-bold leading-tight tracking-[-0.02em] text-navy sm:text-[24px]">
                Flexible plans for every need
              </h2>
            </div>
            <span className="hidden shrink-0 items-center gap-1 rounded-full bg-lightblue px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-royal sm:inline-flex">
              <Sparkles className="h-3 w-3" aria-hidden="true" /> Options
            </span>
          </div>

          <div className="mt-5 grid flex-1 gap-3 min-[420px]:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={cn(
                  "relative flex flex-col rounded-xl border px-2.5 pb-3 pt-4 text-center transition-all duration-300 hover:-translate-y-1",
                  plan.popular
                    ? "border-royal/45 bg-lightblue/70 shadow-[0_18px_36px_-26px_rgba(6,77,235,0.6)]"
                    : "border-slate-200 bg-white hover:border-electric/40"
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-royal to-electric px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-wider text-white shadow-sm">
                    Most Popular
                  </span>
                )}
                <h3 className="font-display text-[12.5px] font-semibold text-navy">{plan.name}</h3>
                <p className="mt-1 font-display text-[17px] font-bold leading-none tracking-tight text-navy">
                  {plan.price}
                </p>
                <p className="mt-1 text-[8.5px] uppercase tracking-wider text-slate-400">{plan.unit}</p>
                <ul className="mt-3 flex-1 space-y-1.5 border-t border-slate-200/70 pt-3 text-left">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-1.5 text-[9.5px] leading-snug text-slate-600">
                      <span className="mt-px grid h-3 w-3 shrink-0 place-items-center rounded-full bg-royal/10">
                        <Check className="h-2 w-2 text-royal" aria-hidden="true" strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openContact(`${plan.name} plan — ${plan.price}`)}
                  className={cn(
                    "btn mt-3 w-full px-2 py-2 text-[9.5px]",
                    plan.popular
                      ? "bg-gradient-to-r from-royal to-electric text-white shadow-[0_8px_18px_-10px_rgba(6,77,235,0.9)] hover:-translate-y-0.5"
                      : "border border-slate-200 bg-white text-navy hover:border-royal hover:text-royal"
                  )}
                >
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <p className="mt-3 flex items-start gap-1.5 text-[9.5px] leading-relaxed text-slate-400">
            <Info className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
            Illustrative pricing — final quotes are tailored to your scope.{" "}
            <button
              type="button"
              onClick={() => openContact("Custom quote")}
              className="font-semibold text-royal underline-offset-2 hover:underline"
            >
              Request a quote
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export function FaqAndCta() {
  const { openContact } = useSite();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? faqs : faqs.slice(0, 3);

  return (
    <section id="faq" className="relative overflow-hidden bg-white pb-14 sm:pb-16 lg:pb-20">
      <div className="container-site grid items-stretch gap-5 lg:grid-cols-[1.02fr_1fr]">
        {/* FAQ */}
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_22px_55px_-40px_rgba(2,13,53,0.45)] sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="font-display text-[21px] font-bold leading-tight tracking-[-0.02em] text-navy sm:text-[24px]">
                Frequently Asked <span className="text-royal">Questions</span>
              </h2>
              <p className="mt-1 text-[11px] text-slate-500">Find answers to common questions.</p>
            </div>
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              aria-expanded={showAll}
              className="btn self-start border border-royal/25 bg-lightblue px-3.5 py-2 text-[10.5px] text-royal transition hover:bg-royal hover:text-white"
            >
              {showAll ? "Show Less FAQs" : "View All FAQs"}
              <ArrowRight
                className={cn("h-3 w-3 transition-transform", showAll && "-rotate-90")}
                aria-hidden="true"
              />
            </button>
          </div>

          <ul className="mt-4 flex-1 divide-y divide-slate-100 border-y border-slate-100">
            {visible.map((faq) => {
              const faqIndex = faqs.findIndex((f) => f.q === faq.q);
              const isOpen = openFaq === faqIndex;
              return (
                <li key={faq.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : faqIndex)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faqIndex}`}
                    className="flex w-full items-center justify-between gap-4 py-3.5 text-left transition-colors hover:text-royal"
                  >
                    <span className="font-display text-[12px] font-medium leading-snug text-navy">
                      {faq.q}
                    </span>
                    <span
                      className={cn(
                        "grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-colors",
                        isOpen
                          ? "border-royal bg-royal text-white"
                          : "border-slate-200 bg-white text-slate-500"
                      )}
                    >
                      {isOpen ? (
                        <Minus className="h-3 w-3" aria-hidden="true" />
                      ) : (
                        <Plus className="h-3 w-3" aria-hidden="true" />
                      )}
                    </span>
                  </button>
                  <div
                    id={`faq-answer-${faqIndex}`}
                    className={cn(
                      "grid overflow-hidden transition-all duration-300",
                      isOpen ? "grid-rows-[1fr] pb-3.5 opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <p className="min-h-0 pr-8 text-[11.5px] leading-relaxed text-slate-500">
                      {faq.a}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <p className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
            <BadgeCheck className="h-3.5 w-3.5 text-royal" aria-hidden="true" />
            Still curious?{" "}
            <button
              type="button"
              onClick={() => openContact("FAQ follow-up")}
              className="font-semibold text-royal hover:underline"
            >
              Ask us directly
            </button>
          </p>
        </div>

        {/* CTA */}
        <div className="relative flex min-h-[260px] flex-col justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-royal via-electric to-[#043fb5] p-6 text-white shadow-[0_26px_60px_-30px_rgba(6,77,235,0.8)] sm:p-8">
          <div className="diagonal-lines absolute inset-0 opacity-40" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full border border-white/15"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full border border-white/20"
            aria-hidden="true"
          />
          <img
            src={images.megaphone}
            alt="Blue megaphone illustration"
            className="pointer-events-none absolute -bottom-6 -right-4 w-[220px] max-w-[55%] rounded-full object-cover opacity-90 [mask-image:radial-gradient(circle_at_60%_55%,#000_45%,transparent_72%)] sm:w-[260px]"
            loading="lazy"
            decoding="async"
            width={760}
            height={760}
          />
          <div className="relative max-w-[68%] sm:max-w-[62%]">
            <span className="eyebrow text-[9px] text-white/70">
              <span className="h-px w-4 bg-white/60" aria-hidden="true" /> Collaborate with us
            </span>
            <h2 className="mt-2 font-display text-[25px] font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-[31px]">
              Let&apos;s Work Together!
            </h2>
            <p className="mt-2 text-[12px] leading-relaxed text-white/85 sm:text-[13px]">
              Have a project in mind? Let&apos;s bring it to life.
            </p>
            <button
              type="button"
              onClick={() => openContact("Start a project")}
              className="btn mt-4 bg-white px-4 py-2.5 text-[11.5px] text-royal shadow-md transition hover:-translate-y-0.5 hover:bg-navy hover:text-white"
            >
              Start a Project <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
            <p className="mt-3 flex items-center gap-1 text-[9.5px] text-white/70">
              <Star className="h-3 w-3 fill-current text-amber-300" aria-hidden="true" />
              Free 30-minute discovery call
            </p>
          </div>
        </div>
      </div>

      <div className="container-site mt-10 flex items-center justify-between gap-4 text-[10.5px] text-slate-400">
        <span className="hidden items-center gap-2 sm:flex">
          <span className="h-px w-10 bg-slate-200" aria-hidden="true" /> Namijee Technologies
        </span>
        <span>Design · Development · Branding · Growth</span>
      </div>
    </section>
  );
}
