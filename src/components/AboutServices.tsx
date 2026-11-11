import { ArrowRight, Check, ChevronDown, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import { SectionEyebrow } from "@/components/Brand";
import { useSite } from "@/lib/hooks";
import { aboutCards, images, services, whyChooseUs } from "@/lib/site";
import { cn } from "@/utils/cn";

export function About() {
  const { openContact } = useSite();

  return (
    <section id="about" className="relative overflow-hidden bg-gradient-to-b from-white via-white to-lightblue/70">
      <div
        className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-cyanbrand/10 blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative py-14 sm:py-16 lg:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[280px_1fr_270px] lg:gap-6">
          <div>
            <span className="pill-label">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> About Us
            </span>
            <h2 className="mt-4 font-display text-[32px] font-bold leading-tight tracking-[-0.03em] text-navy sm:text-[38px]">
              Who <span className="text-royal">We Are</span>
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-slate-600">
              Namijee Technologies is a creative and innovative digital solutions company,
              committed to helping individuals and businesses thrive in the digital world.
            </p>
            <button
              type="button"
              onClick={() => openContact("About Namijee Technologies")}
              className="btn-outline mt-5 px-5 py-2.5 text-[12.5px]"
            >
              Learn More <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>

            <div className="mt-6 hidden items-center gap-3 lg:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-royal/10">
                <Star className="h-4 w-4 fill-royal text-royal" aria-hidden="true" />
              </span>
              <p className="text-[11px] leading-snug text-slate-500">
                <span className="block font-display font-semibold text-navy">Built around you</span>
                Every engagement starts with listening.
              </p>
            </div>
          </div>

          <ul className="grid gap-3.5 sm:grid-cols-3">
            {aboutCards.map((card) => (
              <li
                key={card.title}
                className="group flex h-full flex-col items-center rounded-2xl border border-slate-200/90 bg-white px-4 py-5 text-center shadow-[0_14px_36px_-28px_rgba(2,13,53,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-[0_22px_44px_-26px_rgba(6,77,235,0.45)]"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-lightblue to-white text-royal ring-1 ring-royal/10 transition-colors duration-300 group-hover:from-royal group-hover:to-electric group-hover:text-white">
                  <card.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-3 font-display text-[14px] font-semibold leading-tight text-navy">
                  {card.title}
                </h3>
                <p className="mt-1.5 text-[11.5px] leading-relaxed text-slate-500">{card.copy}</p>
              </li>
            ))}
          </ul>

          <div className="relative mx-auto w-full max-w-[300px] lg:max-w-none">
            <div
              className="absolute -right-3 -top-3 h-[98%] w-full rotate-3 rounded-[22px] bg-gradient-to-br from-royal via-electric to-cyanbrand opacity-90"
              aria-hidden="true"
            />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border-4 border-white shadow-[0_24px_50px_-28px_rgba(2,13,53,0.6)] lg:aspect-auto lg:h-[318px]">
              <img
                src={images.about}
                alt="A smiling Namijee Technologies professional working on a laptop"
                className="h-full w-full object-cover object-[center_22%]"
                loading="lazy"
                decoding="async"
                width={800}
                height={1200}
              />
              <span className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-navy/80 to-transparent" />
              <span className="absolute bottom-3 left-3 rounded-full border border-white/30 bg-white/15 px-2.5 py-1 text-[9px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur-md">
                Nigeria · Serving worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const { openContact } = useSite();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-navy py-14 text-white sm:py-16 lg:py-20"
    >
      <div className="absolute inset-0 bg-[linear-gradient(118deg,#020d35_0%,#041640_45%,#064deb_115%)]" aria-hidden="true" />
      <div className="diagonal-lines absolute inset-0 opacity-50" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-24 top-1/2 h-[420px] w-[420px] rounded-full bg-cyanbrand/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-royal/40 blur-[100px]"
        aria-hidden="true"
      />

      <div className="container-site relative">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-xl">
            <SectionEyebrow tone="light">Our Services</SectionEyebrow>
            <h2 className="mt-2.5 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-white sm:text-[38px]">
              What We Offer
            </h2>
            <p className="mt-2 text-[13.5px] leading-relaxed text-white/70">
              Comprehensive digital services to meet your needs.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openContact("Service catalogue")}
            className="btn self-start border border-white/25 bg-white/10 px-5 py-2.5 text-[12.5px] text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/20 sm:self-auto"
          >
            View All Services <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <ul className="mt-7 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => {
            const open = openId === service.id;
            return (
              <li key={service.id} className="flex">
                <div
                  className={cn(
                    "group flex w-full flex-col rounded-2xl border bg-white p-4 shadow-[0_16px_34px_-26px_rgba(2,13,53,0.8)] transition-all duration-300",
                    open
                      ? "border-electric/70 shadow-[0_24px_50px_-24px_rgba(0,200,255,0.55)]"
                      : "border-white/40 hover:-translate-y-1 hover:border-electric/50 hover:shadow-[0_24px_50px_-26px_rgba(8,123,255,0.7)]"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={`service-panel-${service.id}`}
                    onClick={() => setOpenId(open ? null : service.id)}
                    className="flex flex-1 items-start gap-3 text-left"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-lightblue to-white text-royal ring-1 ring-royal/10 transition-colors duration-300 group-hover:from-royal group-hover:to-electric group-hover:text-white">
                      <service.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-[13px] font-semibold leading-[1.25] text-navy">
                        {service.title}
                      </span>
                      <span className="mt-1.5 block text-[11.5px] leading-snug text-slate-500">
                        {service.description}
                      </span>
                    </span>
                    <ChevronDown
                      className={cn(
                        "ml-auto mt-1 h-3.5 w-3.5 shrink-0 text-slate-400 transition-transform",
                        open && "rotate-180 text-royal"
                      )}
                      aria-hidden="true"
                    />
                  </button>

                  <div
                    id={`service-panel-${service.id}`}
                    className={cn(
                      "grid overflow-hidden transition-all duration-300",
                      open ? "mt-3 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    )}
                  >
                    <div className="min-h-0">
                      <ul className="space-y-1.5 rounded-lg bg-mist p-3">
                        {service.bullets.map((bullet) => (
                          <li key={bullet} className="flex items-start gap-2 text-[11px] text-slate-600">
                            <Check className="mt-0.5 h-3 w-3 shrink-0 text-electric" aria-hidden="true" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => openContact(service.title)}
                        className="mt-3 inline-flex items-center gap-1.5 font-display text-[11px] font-semibold text-royal hover:text-electric"
                      >
                        Request this service <ArrowRight className="h-3 w-3" aria-hidden="true" />
                      </button>
                    </div>
                  </div>

                  {!open && (
                    <button
                      type="button"
                      onClick={() => setOpenId(service.id)}
                      className="link-more mt-2.5 self-start text-[10.5px]"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      Learn More <ArrowRight className="h-3 w-3" aria-hidden="true" />
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export function WhyChooseUs() {
  const { openContact } = useSite();

  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute left-1/3 top-0 h-64 w-64 rounded-full bg-lightblue blur-3xl"
        aria-hidden="true"
      />
      <div className="container-site relative grid items-center gap-9 lg:grid-cols-[280px_1fr] lg:gap-10">
        <div>
          <SectionEyebrow>Why Choose Us</SectionEyebrow>
          <h2 className="mt-2.5 section-title">
            <span className="text-royal">Your Success</span>
            <br />
            Our Priority
          </h2>
          <p className="mt-3 max-w-[250px] text-[13px] leading-relaxed text-slate-600">
            We go beyond just delivering services — we build long-term partnerships.
          </p>
          <button
            type="button"
            onClick={() => openContact("Get started")}
            className="btn-primary mt-5 px-5 py-2.5 text-[12.5px]"
          >
            Get Started <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>

        <ul className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-3 lg:grid-cols-5 lg:gap-0 lg:divide-x lg:divide-slate-200">
          {whyChooseUs.map((feature, index) => (
            <li
              key={feature.title}
              className={cn(
                "group flex flex-col items-center px-1 text-center lg:px-3",
                index === whyChooseUs.length - 1 && "col-span-2 sm:col-span-1"
              )}
            >
              <span className="relative grid h-12 w-12 place-items-center rounded-full bg-lightblue text-royal transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-royal group-hover:to-electric group-hover:text-white">
                <span className="absolute inset-0 rounded-full ring-1 ring-royal/10" aria-hidden="true" />
                <feature.icon className="h-5.5 w-5.5" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-[12.5px] font-semibold leading-tight text-navy">
                {feature.title.split(" ")[0]}
                <br />
                {feature.title.split(" ").slice(1).join(" ")}
              </h3>
              <p className="mt-1.5 max-w-[130px] text-[10.5px] leading-snug text-slate-500">
                {feature.copy}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-site mt-10">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      </div>
    </section>
  );
}
