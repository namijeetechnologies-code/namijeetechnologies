import { ArrowRight, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Logo } from "@/components/Brand";
import { isValidEmail, whatsappLink } from "@/lib/hooks";
import { useSite } from "@/lib/hooks";
import { company, endpoints, services } from "@/lib/site";

const quickLinks = ["Home", "Services", "Portfolio", "About", "Blog", "Contact"] as const;

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.657l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M13.5 21v-7.2h2.6l.4-3h-3V8.9c0-.87.25-1.46 1.5-1.46h1.6V4.75A21 21 0 0 0 14.3 4.6c-2.3 0-3.9 1.4-3.9 4v2.2H7.9v3h2.5V21h3.1Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" className={className}>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M21.6 7.2a2.6 2.6 0 0 0-1.83-1.84C18.15 4.9 12 4.9 12 4.9s-6.15 0-7.77.46A2.6 2.6 0 0 0 2.4 7.2 27 27 0 0 0 2 12a27 27 0 0 0 .4 4.8 2.6 2.6 0 0 0 1.83 1.84c1.62.46 7.77.46 7.77.46s6.15 0 7.77-.46a2.6 2.6 0 0 0 1.83-1.84A27 27 0 0 0 22 12a27 27 0 0 0-.4-4.8ZM10 15.2V8.8L15.5 12 10 15.2Z" />
    </svg>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError(null);
    setState("loading");

    try {
      if (endpoints.newsletter) {
        const res = await fetch(endpoints.newsletter, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: email.trim(), source: "website-footer" }),
        });
        if (!res.ok) throw new Error("Subscription failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 650));
        const key = "namijee-newsletter-subscribers";
        const list: string[] = JSON.parse(localStorage.getItem(key) || "[]");
        if (!list.includes(email.trim().toLowerCase())) {
          list.push(email.trim().toLowerCase());
          localStorage.setItem(key, JSON.stringify(list));
        }
      }
      setState("success");
      setEmail("");
    } catch {
      setState("idle");
      setError("Something went wrong. Please try again or email us directly.");
    }
  }

  return (
    <div>
      <h3 className="font-display text-[13px] font-semibold text-white">Subscribe to our Newsletter</h3>
      <p className="mt-2 text-[11px] leading-relaxed text-white/50">
        Practical digital insights, once a month. No spam.
      </p>

      {state === "success" ? (
        <div
          role="status"
          className="mt-3 rounded-xl border border-cyanbrand/30 bg-cyanbrand/10 p-3 text-[11.5px] leading-relaxed text-white"
        >
          <p className="flex items-center gap-2 font-semibold">
            <Send className="h-3.5 w-3.5 text-cyanbrand" aria-hidden="true" /> You&apos;re subscribed!
          </p>
          <p className="mt-1 text-white/60">
            Thanks for joining. Look out for the next Namijee monthly note.
          </p>
          <button
            type="button"
            onClick={() => setState("idle")}
            className="mt-2 text-[10.5px] font-semibold text-cyanbrand underline-offset-2 hover:underline"
          >
            Add another email
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="mt-3" noValidate>
          <label htmlFor="newsletter-email" className="sr-only">
            Email address
          </label>
          <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white p-1 focus-within:ring-2 focus-within:ring-cyanbrand/60">
            <input
              id="newsletter-email"
              type="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Your email address"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "newsletter-error" : undefined}
              className="w-full min-w-0 rounded-full bg-transparent px-2.5 py-2 text-[11px] text-navy placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              disabled={state === "loading"}
              className="btn shrink-0 bg-gradient-to-r from-royal to-electric px-3.5 py-2.5 text-[10.5px] text-white disabled:opacity-80"
            >
              {state === "loading" ? (
                <>
                  <Loader2 className="h-3 w-3 animate-spin" aria-hidden="true" /> Sending
                </>
              ) : (
                "Subscribe"
              )}
            </button>
          </div>
          {error && (
            <p id="newsletter-error" role="alert" className="mt-2 text-[10.5px] text-red-300">
              {error}
            </p>
          )}
          <p className="mt-2 text-[9.5px] leading-relaxed text-white/35">
            By subscribing you agree to receive occasional emails from Namijee Technologies.
          </p>
        </form>
      )}
    </div>
  );
}

export default function Footer() {
  const { openContact, openBlog } = useSite();
  const year = 2026;

  const handleQuick = (label: string) => {
    if (label === "Blog") return openBlog();
    if (label === "Contact") return openContact("General enquiry");
    const el = document.querySelector(`#${label.toLowerCase()}`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-navy text-white">
      <div className="diagonal-lines absolute inset-0 opacity-30" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/70 to-transparent" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-royal/25 blur-[110px]"
        aria-hidden="true"
      />

      <div className="container-site relative py-12 sm:py-14">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.8fr_1.15fr_1.05fr_1.15fr] lg:gap-7">
          {/* Brand */}
          <div>
            <span className="inline-flex rounded-xl">
              <Logo imgClassName="w-[175px]" />
            </span>
            <p className="mt-3 max-w-[220px] font-display text-[12px] leading-relaxed text-white/55">
              {company.tagline}
            </p>
            <p className="mt-3 max-w-[230px] text-[11px] leading-relaxed text-white/40">
              A creative and innovative digital solutions company helping brands thrive online.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <a
                href={company.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Namijee Technologies on Facebook"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/75 transition hover:bg-royal hover:text-white"
              >
                <FacebookIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={company.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Namijee Technologies on Instagram"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/75 transition hover:bg-royal hover:text-white"
              >
                <InstagramIcon className="h-3.5 w-3.5" />
              </a>
              <a
                href={company.socials.x}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Namijee Technologies on X"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/75 transition hover:bg-royal hover:text-white"
              >
                <XIcon className="h-3 w-3" />
              </a>
              <a
                href={company.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Namijee Technologies on YouTube"
                className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white/75 transition hover:bg-royal hover:text-white"
              >
                <YoutubeIcon className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h3 className="font-display text-[13px] font-semibold text-white">Quick Links</h3>
            <ul className="mt-3 space-y-2">
              {quickLinks.map((label) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => handleQuick(label)}
                    className="group inline-flex items-center gap-1.5 text-[11.5px] text-white/55 transition hover:text-cyanbrand"
                  >
                    <ArrowRight className="h-3 w-3 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-cyanbrand" aria-hidden="true" />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="font-display text-[13px] font-semibold text-white">Our Services</h3>
            <ul className="mt-3 space-y-2">
              {services.map((service) => (
                <li key={service.id}>
                  <button
                    type="button"
                    onClick={() => openContact(service.title)}
                    className="group inline-flex items-start gap-1.5 text-left text-[11.5px] leading-snug text-white/55 transition hover:text-cyanbrand"
                  >
                    <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-white/25 transition group-hover:translate-x-0.5 group-hover:text-cyanbrand" aria-hidden="true" />
                    {service.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-[13px] font-semibold text-white">Contact Us</h3>
            <ul className="mt-3 space-y-2.5 text-[11.5px] text-white/55">
              <li>
                <a href={`tel:${company.phoneHref}`} className="group flex items-center gap-2 hover:text-cyanbrand">
                  <Phone className="h-3.5 w-3.5 shrink-0 text-cyanbrand" aria-hidden="true" />
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${company.email}`} className="group flex items-center gap-2 break-all hover:text-cyanbrand">
                  <Mail className="h-3.5 w-3.5 shrink-0 text-cyanbrand" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5 shrink-0 text-cyanbrand" aria-hidden="true" />
                {company.location}
              </li>
              <li className="flex items-center gap-2">
                <span className="grid h-3.5 w-3.5 shrink-0 place-items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                </span>
                {company.hours}
              </li>
            </ul>
            <a
              href={whatsappLink("Hello Namijee Technologies, I'd like to discuss a project.")}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-[10.5px] font-semibold text-emerald-300 transition hover:bg-emerald-400/20"
            >
              <Phone className="h-3 w-3" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>

          <Newsletter />
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-2 py-4 text-center sm:flex-row sm:text-left">
          <p className="text-[10.5px] text-white/45">
            © {year} Namijee Technologies. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[10.5px] text-white/40">
            <button type="button" onClick={() => openContact("Privacy enquiry")} className="hover:text-white">
              Privacy
            </button>
            <button type="button" onClick={() => openContact("Terms enquiry")} className="hover:text-white">
              Terms
            </button>
            <span className="hidden h-3 w-px bg-white/15 sm:block" aria-hidden="true" />
            <span>Designed with ♥ for a better digital world.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
