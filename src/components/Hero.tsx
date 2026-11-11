import { ArrowRight, Pause, Play, Sparkles } from "lucide-react";
import { ArrowLink } from "@/components/Brand";
import { useSite } from "@/lib/hooks";
import logo from "@/assets/logo.jpg";
import emblem from "@/assets/emblem.jpg";
import heroBg from "@/assets/hero-bg.jpg";

export default function Hero() {
  const { openContact } = useSite();

  return (
    <section id="home" className="relative overflow-hidden bg-navy text-white">
      {/* Background layers */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover object-right opacity-60"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/35" />
        <div className="absolute inset-0 bg-[radial-gradient(90%_120%_at_75%_10%,rgba(8,123,255,0.32),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/60" />
        <div className="diagonal-lines absolute inset-0 opacity-40" />
      </div>

      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-royal/30 blur-[110px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-cyanbrand/20 blur-[120px]" />
      <div className="dot-grid pointer-events-none absolute bottom-24 left-1/2 hidden h-24 w-40 opacity-30 lg:block" />

      <div className="container-site relative grid gap-12 pb-24 pt-28 sm:pt-32 lg:grid-cols-[1.02fr_1fr] lg:items-center lg:gap-8 lg:pb-28 lg:pt-36">
        <div className="animate-fade-up max-w-[580px]">
          <p className="eyebrow gap-2.5 text-[10px] text-white/70 sm:text-[10.5px]">
            <span className="grid h-4 w-4 place-items-center rounded-[4px] bg-gradient-to-br from-cyanbrand to-electric text-[8px] font-bold text-white">
              N
            </span>
            Innovation <span className="text-cyanbrand">•</span> Solutions
            <span className="text-cyanbrand">•</span> A Smarter Tomorrow
          </p>

          <h1 className="mt-5 font-display text-[33px] font-bold leading-[1.06] tracking-[-0.03em] text-white sm:text-[44px] lg:text-[46px]">
            Your Trusted Partner in
            <span className="hero-title-glow mt-1 block text-[44px] font-extrabold leading-[1.02] sm:text-[64px] lg:text-[68px]">
              Digital Solutions
            </span>
          </h1>

          <p className="mt-5 max-w-[490px] text-[14.5px] leading-relaxed text-white/80 sm:text-[15.5px]">
            We design, develop and deliver innovative digital solutions that help you grow,
            work smarter and achieve more.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => openContact("Get started")}
              className="btn-primary"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <a href="#services" className="btn-ghost-light group">
              Explore Our Services
              <span className="grid h-6 w-6 place-items-center rounded-full border border-white/50 bg-white/10 transition-colors group-hover:bg-cyanbrand group-hover:text-navy">
                <Play className="ml-0.5 h-2.5 w-2.5 fill-current" aria-hidden="true" />
              </span>
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11.5px] text-white/60">
            <span className="inline-flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-cyanbrand" aria-hidden="true" />
              Design-led thinking
            </span>
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
            <span>Built for growth</span>
            <span className="h-1 w-1 rounded-full bg-white/30" aria-hidden="true" />
            <span>Delivered on time</span>
          </div>
        </div>

        {/* Device mockups */}
        <div className="relative mx-auto w-full max-w-[560px] lg:mt-4" aria-label="Namijee Technologies website shown on a laptop and smartphone">
          <div className="pointer-events-none absolute inset-x-6 top-4 bottom-10 rounded-[40px] bg-gradient-to-br from-electric/40 via-cyanbrand/20 to-transparent blur-2xl" />

          <div className="relative animate-float">
            <div className="relative rounded-[18px] border border-white/25 bg-gradient-to-b from-[#16264c] to-[#050f2d] p-[7px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.85)]">
              <div className="overflow-hidden rounded-[12px] border border-white/10 bg-[#03102f]">
                <div className="flex items-center gap-2 border-b border-white/10 bg-[#081838] px-3 py-2">
                  <span className="flex gap-1" aria-hidden="true">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ff6b6b]/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#ffd166]/80" />
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]/80" />
                  </span>
                  <span className="mx-auto flex w-full max-w-[200px] items-center justify-center gap-1 rounded-full bg-white/5 px-2 py-0.5 text-[7px] text-white/50">
                    <span className="h-1 w-1 rounded-full bg-cyanbrand" aria-hidden="true" />
                    namijeetechnologies.com
                  </span>
                  <Pause className="h-2 w-2 text-white/30" aria-hidden="true" />
                </div>

                <div className="dot-grid relative flex flex-col items-center px-6 py-8 text-center">
                  <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_20%,rgba(8,123,255,0.35),transparent_70%)]" />
                  <img
                    src={logo}
                    alt="Namijee Technologies brand mark"
                    className="brand-glow relative w-[210px] sm:w-[240px]"
                    width={1300}
                    height={469}
                  />
                  <p className="relative mt-3 font-display text-[9px] font-medium uppercase tracking-[0.18em] text-cyanbrand/90">
                    Innovating Today... Empowering Tomorrow.
                  </p>
                  <div className="relative mt-4 flex flex-wrap justify-center gap-1.5">
                    {["Web Design", "Branding", "Software", "Marketing"].map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/15 bg-white/10 px-2 py-1 text-[7px] font-medium text-white/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="relative mt-5 flex items-center gap-1.5">
                    <span className="rounded-full bg-gradient-to-r from-electric to-cyanbrand px-3 py-1 text-[7px] font-semibold text-white">
                      Get Started
                    </span>
                    <span className="rounded-full border border-white/25 px-3 py-1 text-[7px] font-semibold text-white/70">
                      Our Services
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Laptop base */}
            <div className="relative mx-auto h-[11px] w-[calc(100%+34px)] -translate-x-[17px] rounded-b-[12px] border-x border-b border-white/20 bg-gradient-to-b from-[#c7d2e4] via-[#8fa0bb] to-[#5f708c] shadow-[0_16px_30px_-14px_rgba(0,0,0,0.8)]">
              <span className="absolute left-1/2 top-0 h-[3px] w-14 -translate-x-1/2 rounded-b-md bg-[#3f4e69]" />
            </div>
          </div>

          {/* Phone */}
          <div className="absolute -bottom-6 right-0 w-[72px] rotate-3 rounded-[16px] border-[3px] border-[#283a63] bg-[#050f2d] p-[3px] shadow-[0_24px_40px_-16px_rgba(0,0,0,0.9)] sm:-bottom-8 sm:w-[88px] lg:-right-3">
            <div className="overflow-hidden rounded-[12px] bg-gradient-to-b from-[#071c4d] via-[#05307f] to-[#064deb] px-1 pb-3 pt-2 text-center">
              <span className="mx-auto mb-2 block h-[3px] w-6 rounded-full bg-white/30" />
              <img src={emblem} alt="" aria-hidden="true" className="brand-glow w-full" />
              <p className="mt-1.5 text-[4.5px] font-medium uppercase tracking-[0.1em] text-cyanbrand">
                Innovating Today
              </p>
              <span className="mt-2 inline-block rounded-full bg-white px-2 py-0.5 text-[4.5px] font-bold text-royal">
                Let&apos;s Talk
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute -left-4 top-8 hidden rounded-xl border border-white/15 bg-white/10 px-3 py-2 text-[10px] font-medium text-white backdrop-blur-md sm:block">
            <ArrowLink className="text-white/85">Digital-first</ArrowLink>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 leading-none" aria-hidden="true">
        <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="h-[38px] w-full sm:h-[54px]">
          <path d="M0,58 C260,4 760,84 1440,26 L1440,70 L0,70 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  );
}
