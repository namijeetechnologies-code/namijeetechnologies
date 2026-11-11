import {
  ArrowRight,
  ChevronDown,
  Menu,
  Phone,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ArrowLink, Logo } from "@/components/Brand";
import { useActiveSection, useBodyLock, useScrolled, useSite } from "@/lib/hooks";
import { company, navItems, services } from "@/lib/site";
import { cn } from "@/utils/cn";

const sectionIds = [
  "home",
  "about",
  "services",
  "portfolio",
  "process",
  "testimonials",
  "pricing",
  "faq",
  "contact",
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(sectionIds);
  const { openContact, openSearch, openBlog } = useSite();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useBodyLock(mobileOpen);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setServicesOpen(false);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  const go = (href?: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServices(false);
    if (href) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleNav = (label: string, href?: string, action?: string) => {
    if (action === "blog") {
      setMobileOpen(false);
      openBlog();
      return;
    }
    if (action === "services") {
      go("#services");
      return;
    }
    if (label === "Contact") {
      setMobileOpen(false);
      openContact("General enquiry");
      return;
    }
    go(href);
  };

  const desktopActive = (label: string) => {
    if (label === "Home") return active === "home";
    if (label === "About") return active === "about";
    if (label === "Services") return active === "services";
    if (label === "Portfolio") return active === "portfolio";
    return false;
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to main content
      </a>

      <header
        id="site-header"
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
          scrolled
            ? "border-white/10 bg-navy/95 shadow-[0_10px_40px_-20px_rgba(2,13,53,0.9)] backdrop-blur-xl"
            : "border-white/5 bg-navy/80 backdrop-blur-md"
        )}
      >
        <div className="container-site flex h-[72px] items-center justify-between gap-4 sm:h-[78px]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              go("#home");
            }}
            className="shrink-0 rounded-lg"
            aria-label="Namijee Technologies — back to top"
          >
            <Logo />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
            {navItems.map((item) => {
              if (item.label === "Services") {
                return (
                  <div
                    key={item.label}
                    ref={dropdownRef}
                    className="relative"
                    onMouseEnter={() => {
                      window.clearTimeout(closeTimer.current);
                      setServicesOpen(true);
                    }}
                    onMouseLeave={() => {
                      closeTimer.current = window.setTimeout(() => setServicesOpen(false), 140);
                    }}
                  >
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-menu"
                      aria-haspopup="true"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={cn(
                        "nav-link inline-flex items-center gap-1",
                        (desktopActive("Services") || servicesOpen) && "nav-link-active"
                      )}
                    >
                      Services
                      <ChevronDown
                        className={cn("h-3.5 w-3.5 transition-transform", servicesOpen && "rotate-180")}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id="services-menu"
                      className={cn(
                        "absolute left-1/2 top-[calc(100%+14px)] w-[540px] -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2.5 shadow-[0_30px_70px_-30px_rgba(2,13,53,0.6)] transition-all duration-200",
                        servicesOpen
                          ? "visible translate-y-0 opacity-100"
                          : "pointer-events-none invisible -translate-y-1 opacity-0"
                      )}
                    >
                      <div className="grid grid-cols-2 gap-1">
                        {services.map((s) => (
                          <a
                            key={s.id}
                            href="#services"
                            onClick={(e) => {
                              e.preventDefault();
                              go("#services");
                            }}
                            className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-lightblue"
                          >
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-lightblue text-royal transition-colors group-hover:bg-royal group-hover:text-white">
                              <s.icon className="h-4.5 w-4.5" aria-hidden="true" />
                            </span>
                            <span>
                              <span className="block font-display text-[13px] font-semibold leading-tight text-navy">
                                {s.shortTitle}
                              </span>
                              <span className="mt-1 block text-[11.5px] leading-snug text-slate-500">
                                {s.description}
                              </span>
                            </span>
                          </a>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => openContact("Service enquiry")}
                        className="mt-1 flex w-full items-center justify-between rounded-xl bg-navy px-4 py-2.5 font-display text-[12px] font-semibold text-white transition-colors hover:bg-royal"
                      >
                        Need something custom? Talk to us
                        <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href ?? "#"}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav(item.label, item.href, item.action);
                  }}
                  aria-current={desktopActive(item.label) ? "page" : undefined}
                  className={cn("nav-link", desktopActive(item.label) && "nav-link-active")}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={openSearch}
              aria-label="Search the website"
              className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => openContact("Get started")}
              className="btn hidden bg-gradient-to-r from-royal to-electric px-5 py-2.5 text-white shadow-[0_10px_24px_-12px_rgba(8,123,255,0.9)] transition hover:-translate-y-0.5 sm:inline-flex"
            >
              Get Started
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/20 text-white lg:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-[70] lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-navy-900/70 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className={cn(
            "absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-navy shadow-2xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <Logo imgClassName="w-[150px]" />
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white"
            >
              <X className="h-4.5 w-4.5" aria-hidden="true" />
            </button>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-4 py-5">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  {item.label === "Services" ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => setMobileServices((v) => !v)}
                        aria-expanded={mobileServices}
                        className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-display text-[15px] font-medium text-white/90 hover:bg-white/5"
                      >
                        Services
                        <ChevronDown
                          className={cn("h-4 w-4 transition-transform", mobileServices && "rotate-180")}
                          aria-hidden="true"
                        />
                      </button>
                      <div
                        className={cn(
                          "grid overflow-hidden transition-all duration-300",
                          mobileServices ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                        )}
                      >
                        <div className="min-h-0">
                          <ul className="ml-3 mt-1 space-y-0.5 border-l border-white/10 pl-3">
                            {services.map((s) => (
                              <li key={s.id}>
                                <button
                                  type="button"
                                  onClick={() => go("#services")}
                                  className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-[13px] text-white/75 hover:bg-white/5 hover:text-white"
                                >
                                  <s.icon className="h-4 w-4 text-cyanbrand" aria-hidden="true" />
                                  {s.shortTitle}
                                </button>
                              </li>
                            ))}
                            <li>
                              <button
                                type="button"
                                onClick={() => {
                                  setMobileOpen(false);
                                  openContact("Service enquiry");
                                }}
                                className="flex w-full items-center gap-2 px-3 py-2.5 text-left text-[13px] font-semibold text-cyanbrand"
                              >
                                Request a custom quote
                                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleNav(item.label, item.href, item.action)}
                      className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-display text-[15px] font-medium text-white/90 hover:bg-white/5"
                    >
                      {item.label}
                      <ArrowRight className="h-4 w-4 text-white/30" aria-hidden="true" />
                    </button>
                  )}
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-3 border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openSearch();
                }}
                className="flex w-full items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-left text-[13px] text-white/80"
              >
                <Search className="h-4 w-4" aria-hidden="true" /> Search the site
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  openContact("Get started");
                }}
                className="btn w-full bg-gradient-to-r from-royal to-electric px-5 py-3.5 text-white"
              >
                Get Started <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
              <a
                href={`tel:${company.phoneHref}`}
                className="flex items-center justify-center gap-2 pt-1 text-[12.5px] text-white/65"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" /> {company.phoneDisplay}
              </a>
            </div>
          </nav>

          <div className="border-t border-white/10 px-5 py-4">
            <ArrowLink className="text-[11.5px] text-cyanbrand">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              {company.tagline}
            </ArrowLink>
          </div>
        </div>
      </div>
    </>
  );
}
