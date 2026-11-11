import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";
import { SectionEyebrow, Stars } from "@/components/Brand";
import { isValidEmail, useBodyLock, useScrolled, useSite, whatsappLink } from "@/lib/hooks";
import {
  blogPosts,
  company,
  endpoints,
  faqs,
  projects,
  services,
} from "@/lib/site";
import { cn } from "@/utils/cn";

/* ------------------------------------------------------------------ */
/* Shared modal shell                                                  */
/* ------------------------------------------------------------------ */
function Modal({
  open,
  onClose,
  label,
  children,
  className,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  useBodyLock(open);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const nodes = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => {
      const firstField = panelRef.current?.querySelector<HTMLElement>(
        "input:not([type=hidden]), select, textarea, button"
      );
      firstField?.focus();
    }, 60);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = originalOverflow;
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6">
      <div
        className="absolute inset-0 bg-navy-900/75 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={label}
        className={cn(
          "animate-fade-up relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl bg-white shadow-2xl sm:max-h-[88dvh] sm:rounded-2xl",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close dialog"
      className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/10 text-navy ring-1 ring-navy/10 transition hover:bg-navy hover:text-white"
    >
      <X className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Contact / project enquiry                                           */
/* ------------------------------------------------------------------ */
type FormValues = {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
};

const emptyForm: FormValues = {
  name: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
};

export function ContactDialog() {
  const { contactOpen, closeContact, interest } = useSite();
  const [values, setValues] = useState<FormValues>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [fallbackLink, setFallbackLink] = useState<string>("");

  useEffect(() => {
    if (!contactOpen) return;
    setStatus("idle");
    setErrors({});
    setValues({ ...emptyForm, message: interest ? `I'm interested in ${interest}.` : "" });
    setFallbackLink("");
  }, [contactOpen, interest]);

  const set = (key: keyof FormValues) => (value: string) => {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validate = () => {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (values.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!isValidEmail(values.email)) next.email = "Enter a valid email address.";
    if (values.phone && values.phone.replace(/[^\d+]/g, "").length < 7)
      next.phone = "Enter a valid phone number.";
    if (!values.service) next.service = "Select the service you need.";
    if (values.message.trim().length < 10) next.message = "A short brief helps us reply properly (10+ characters).";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) {
      const firstError = document.querySelector<HTMLElement>('[aria-invalid="true"]');
      firstError?.focus();
      return;
    }
    setStatus("sending");

    const summary = [
      `New enquiry — Namijee Technologies`,
      `Name: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Phone: ${values.phone}` : null,
      `Service: ${values.service}`,
      values.budget ? `Budget: ${values.budget}` : null,
      "",
      values.message,
    ]
      .filter(Boolean)
      .join("\n");

    const waLink = whatsappLink(summary);
    setFallbackLink(waLink);

    try {
      if (endpoints.contact) {
        const res = await fetch(endpoints.contact, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ ...values, source: "website-contact-modal" }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        // No backend configured: save the brief locally and hand off to WhatsApp.
        const drafts = JSON.parse(localStorage.getItem("namijee-enquiries") || "[]");
        drafts.push({ ...values, createdAt: new Date().toISOString() });
        localStorage.setItem("namijee-enquiries", JSON.stringify(drafts.slice(-20)));
        await new Promise((resolve) => setTimeout(resolve, 700));
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const openWhatsApp = () => {
    window.open(fallbackLink || whatsappLink("Hello Namijee Technologies, I'd like to discuss a project."), "_blank", "noopener,noreferrer");
  };

  return (
    <Modal open={contactOpen} onClose={closeContact} label="Contact Namijee Technologies" className="max-w-[860px]">
      <div className="grid md:grid-cols-[1.08fr_0.92fr]">
        <div className="p-5 sm:p-7">
          <SectionEyebrow>Start a Project</SectionEyebrow>
          <h2 className="mt-2 font-display text-[24px] font-bold leading-tight tracking-[-0.03em] text-navy">
            Tell us what you&apos;re building
          </h2>
          <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-500">
            Share a few details and we&apos;ll reply within one business day with next steps.
          </p>

          {status === "success" ? (
            <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5" role="status">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-emerald-500 text-white">
                <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-3 font-display text-[17px] font-semibold text-navy">Thanks, {values.name.split(" ")[0] || "friend"}!</h3>
              <p className="mt-1.5 text-[12.5px] leading-relaxed text-slate-600">
                {endpoints.contact
                  ? "Your brief has been received. We'll be in touch shortly."
                  : "Your brief is saved and ready in WhatsApp so we can talk right away."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {!endpoints.contact && (
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="btn bg-emerald-500 px-4 py-2.5 text-[12px] text-white hover:bg-emerald-600"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" /> Open WhatsApp
                  </button>
                )}
                <a
                  href={`mailto:${company.email}?subject=${encodeURIComponent("Project enquiry")}`}
                  className="btn-outline px-4 py-2.5 text-[12px]"
                >
                  <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email us
                </a>
                <button type="button" onClick={closeContact} className="btn px-4 py-2.5 text-[12px] text-slate-500 hover:text-navy">
                  Close
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-3.5">
              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="field-label">
                    Full name <span className="text-royal">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    autoComplete="name"
                    className="field"
                    placeholder="Your name"
                    value={values.name}
                    onChange={(e) => set("name")(e.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "err-name" : undefined}
                  />
                  {errors.name && (
                    <p id="err-name" className="mt-1 text-[10.5px] text-red-500">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="contact-email" className="field-label">
                    Email address <span className="text-royal">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="field"
                    placeholder="you@company.com"
                    value={values.email}
                    onChange={(e) => set("email")(e.target.value)}
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "err-email" : undefined}
                  />
                  {errors.email && (
                    <p id="err-email" className="mt-1 text-[10.5px] text-red-500">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3.5 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-phone" className="field-label">
                    Phone <span className="font-normal text-slate-400">(optional)</span>
                  </label>
                  <input
                    id="contact-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className="field"
                    placeholder="+234 ..."
                    value={values.phone}
                    onChange={(e) => set("phone")(e.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errors.phone && <p className="mt-1 text-[10.5px] text-red-500">{errors.phone}</p>}
                </div>
                <div>
                  <label htmlFor="contact-budget" className="field-label">
                    Budget range
                  </label>
                  <select
                    id="contact-budget"
                    name="budget"
                    className="field"
                    value={values.budget}
                    onChange={(e) => set("budget")(e.target.value)}
                  >
                    <option value="">Select a range</option>
                    <option>Under ₦100,000</option>
                    <option>₦100,000 – ₦300,000</option>
                    <option>₦300,000 – ₦700,000</option>
                    <option>₦700,000+</option>
                    <option>Not sure yet</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-service" className="field-label">
                  Service needed <span className="text-royal">*</span>
                </label>
                <select
                  id="contact-service"
                  name="service"
                  className="field"
                  value={values.service}
                  onChange={(e) => set("service")(e.target.value)}
                  aria-invalid={Boolean(errors.service)}
                  aria-describedby={errors.service ? "err-service" : undefined}
                >
                  <option value="">Choose a service</option>
                  {services.map((s) => (
                    <option key={s.id} value={s.title}>{s.title}</option>
                  ))}
                  <option value="Pricing plan enquiry">Pricing plan enquiry</option>
                  <option value="General enquiry">General enquiry</option>
                </select>
                {errors.service && (
                  <p id="err-service" className="mt-1 text-[10.5px] text-red-500">{errors.service}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="field-label">
                  Project details <span className="text-royal">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={3}
                  className="field resize-none"
                  placeholder="What are you working on, and when would you like to launch?"
                  value={values.message}
                  onChange={(e) => set("message")(e.target.value)}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? "err-message" : undefined}
                />
                {errors.message && (
                  <p id="err-message" className="mt-1 text-[10.5px] text-red-500">{errors.message}</p>
                )}
              </div>

              {status === "error" && (
                <p role="alert" className="rounded-lg bg-red-50 p-3 text-[11.5px] text-red-600">
                  We couldn&apos;t send that just now. Please try again, or email {company.email}.
                </p>
              )}

              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <button type="submit" disabled={status === "sending"} className="btn-primary px-5 py-3 text-[12.5px]">
                  {status === "sending" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending...
                    </>
                  ) : (
                    <>
                      Send Enquiry <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    window.open(
                      whatsappLink(
                        `Hello Namijee Technologies, I'd like to discuss a project.${interest ? ` (${interest})` : ""}`
                      ),
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  className="btn border border-emerald-200 bg-emerald-50 px-4 py-3 text-[12px] text-emerald-700 hover:bg-emerald-100"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp
                </button>
              </div>
              <p className="flex items-start gap-1.5 text-[10px] leading-relaxed text-slate-400">
                <ShieldCheck className="mt-px h-3 w-3 shrink-0" aria-hidden="true" />
                Your details are used only to respond to this enquiry. We never sell your data.
              </p>
            </form>
          )}
        </div>

        {/* Sidebar */}
        <aside className="relative hidden overflow-hidden bg-navy p-6 text-white md:block">
          <div className="diagonal-lines absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-electric/30 blur-3xl" aria-hidden="true" />
          <div className="relative">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-electric to-cyanbrand text-white">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="mt-4 font-display text-[18px] font-semibold leading-snug text-white">
              Let&apos;s build something worth sharing.
            </h3>
            <p className="mt-2 text-[11.5px] leading-relaxed text-white/60">
              Strategy, design and development under one roof — with clear milestones from day one.
            </p>
            <ul className="mt-5 space-y-2.5 text-[11px] text-white/75">
              {["Free 30-minute discovery call", "Fixed-price proposal in 2 business days", "Direct access to your project lead"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-px h-3.5 w-3.5 shrink-0 text-cyanbrand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 space-y-2.5 border-t border-white/10 pt-5 text-[11.5px]">
              <a href={`tel:${company.phoneHref}`} className="flex items-center gap-2 text-white/80 hover:text-cyanbrand">
                <Phone className="h-3.5 w-3.5 text-cyanbrand" aria-hidden="true" /> {company.phoneDisplay}
              </a>
              <a href={`mailto:${company.email}`} className="flex items-start gap-2 break-all text-white/80 hover:text-cyanbrand">
                <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0 text-cyanbrand" aria-hidden="true" /> {company.email}
              </a>
              <p className="flex items-center gap-2 text-white/80">
                <MapPin className="h-3.5 w-3.5 text-cyanbrand" aria-hidden="true" /> {company.location}
              </p>
              <p className="flex items-center gap-2 text-white/80">
                <Clock className="h-3.5 w-3.5 text-cyanbrand" aria-hidden="true" /> {company.hours}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Project preview                                                     */
/* ------------------------------------------------------------------ */
export function ProjectDialog() {
  const { projectId, closeProject, openContact } = useSite();
  const project = projects.find((p) => p.id === projectId) ?? null;

  return (
    <Modal open={Boolean(project)} onClose={closeProject} label={project ? `Project: ${project.title}` : "Project"} className="max-w-[860px]">
      {project && (
        <div>
          <div className="relative h-[210px] overflow-hidden sm:h-[280px]">
            <img src={project.image} alt={`${project.title} preview`} className="h-full w-full object-cover" width={800} height={600} />
            <span className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/25 to-navy/10" />
            <button
              type="button"
              onClick={closeProject}
              aria-label="Close project preview"
              className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-navy transition hover:bg-white"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
            <div className="absolute inset-x-0 bottom-0 p-5">
              <span className="pill-label bg-white/15 text-cyanbrand backdrop-blur-sm">{project.category}</span>
              <h2 className="mt-2 font-display text-[24px] font-bold leading-tight text-white sm:text-[30px]">
                {project.title}
              </h2>
              <p className="mt-1 flex items-center gap-2 text-[11px] text-white/70">
                <span>{project.client}</span>
                <span className="h-1 w-1 rounded-full bg-white/40" aria-hidden="true" />
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3 w-3" aria-hidden="true" /> {project.year}
                </span>
              </p>
            </div>
          </div>

          <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1.4fr_0.6fr]">
            <div>
              <SectionEyebrow>Project Overview</SectionEyebrow>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{project.description}</p>
              <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-mist p-3 text-[10.5px] leading-relaxed text-slate-500">
                <Sparkles className="mt-px h-3.5 w-3.5 shrink-0 text-royal" aria-hidden="true" />
                {project.summary} Presented as an illustrative case study.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button type="button" onClick={() => { closeProject(); openContact(`A project like ${project.title}`); }} className="btn-primary px-5 py-2.5 text-[12px]">
                  Start a similar project <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button type="button" onClick={closeProject} className="btn-outline px-4 py-2.5 text-[12px]">
                  Browse more work
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-display text-[12px] font-semibold uppercase tracking-[0.14em] text-navy">Deliverables</h3>
              <ul className="mt-2.5 space-y-2">
                {project.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 border-b border-slate-100 pb-2 text-[11.5px] text-slate-600">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-electric" aria-hidden="true" /> {d}
                  </li>
                ))}
              </ul>
              <a href={`mailto:${company.email}?subject=${encodeURIComponent(`Portfolio enquiry: ${project.title}`)}`} className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-royal hover:text-electric">
                <Mail className="h-3.5 w-3.5" aria-hidden="true" /> Email about this work
              </a>
            </div>
          </div>
        </div>
      )}
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Search                                                              */
/* ------------------------------------------------------------------ */
export function SearchDialog() {
  const { searchOpen, closeSearch, openContact, openProject } = useSite();
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (searchOpen) setQuery("");
  }, [searchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as { id: string; label: string; meta: string; action: () => void; icon: typeof FileText }[];

    const serviceResults = services
      .filter((s) => `${s.title} ${s.description} ${s.bullets.join(" ")}`.toLowerCase().includes(q))
      .map((s) => ({
        id: `s-${s.id}`,
        label: s.title,
        meta: "Service",
        icon: s.icon,
        action: () => {
          closeSearch();
          document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
        },
      }));

    const projectResults = projects
      .filter((p) => `${p.title} ${p.category} ${p.summary}`.toLowerCase().includes(q))
      .map((p) => ({
        id: `p-${p.id}`,
        label: `${p.title} — ${p.category}`,
        meta: "Portfolio project",
        icon: Sparkles,
        action: () => {
          closeSearch();
          openProject(p.id);
        },
      }));

    const faqResults = faqs
      .filter((f) => `${f.q} ${f.a}`.toLowerCase().includes(q))
      .map((f, i) => ({
        id: `f-${i}`,
        label: f.q,
        meta: "FAQ",
        icon: FileText,
        action: () => {
          closeSearch();
          document.getElementById("faq")?.scrollIntoView({ behavior: "smooth" });
        },
      }));

    return [...serviceResults, ...projectResults, ...faqResults].slice(0, 8);
  }, [query, closeSearch, openProject]);

  return (
    <Modal open={searchOpen} onClose={closeSearch} label="Search Namijee Technologies" className="max-w-[560px]">
      <div className="p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <SectionEyebrow>Search</SectionEyebrow>
          <CloseButton onClick={closeSearch} />
        </div>
        <h2 className="mt-1.5 pr-8 font-display text-[20px] font-bold text-navy">Find what you need</h2>

        <div className="relative mt-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">Search services, projects and FAQs</label>
          <input
            id="site-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, projects, FAQs..."
            className="field pl-10"
            autoComplete="off"
          />
        </div>

        <div className="mt-4">
          {!query.trim() ? (
            <div>
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.14em] text-slate-400">Quick links</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {["Website development", "Branding", "Video editing", "Pricing", "Portfolio"].map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term === "Pricing" ? "plan" : term)}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-600 transition hover:border-royal hover:text-royal"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length ? (
            <ul className="space-y-1.5" aria-live="polite">
              {results.map((result) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={result.action}
                    className="group flex w-full items-center gap-3 rounded-xl border border-transparent p-2.5 text-left transition hover:border-slate-200 hover:bg-mist"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-lightblue text-royal">
                      <result.icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[12.5px] font-medium text-navy">{result.label}</span>
                      <span className="block text-[10px] text-slate-400">{result.meta}</span>
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-slate-300 transition group-hover:text-royal" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="rounded-xl bg-mist p-5 text-center">
              <p className="text-[12.5px] font-medium text-navy">No matches for “{query}”.</p>
              <p className="mt-1 text-[11.5px] text-slate-500">Try a different keyword, or ask us directly.</p>
              <button
                type="button"
                onClick={() => { closeSearch(); openContact(`Question about ${query}`); }}
                className="btn-primary mt-3 px-4 py-2.5 text-[11.5px]"
              >
                Ask our team
              </button>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Blog / insights                                                     */
/* ------------------------------------------------------------------ */
export function BlogDialog() {
  const { blogOpen, closeBlog, openContact } = useSite();

  return (
    <Modal open={blogOpen} onClose={closeBlog} label="Namijee Technologies insights" className="max-w-[720px]">
      <div className="p-5 sm:p-7">
        <div className="flex items-start justify-between">
          <div>
            <SectionEyebrow>Insights &amp; Resources</SectionEyebrow>
            <h2 className="mt-1.5 font-display text-[24px] font-bold leading-tight text-navy">The Namijee Journal</h2>
            <p className="mt-1 text-[12px] text-slate-500">
              Practical thinking on design, technology and digital growth.
            </p>
          </div>
          <CloseButton onClick={closeBlog} />
        </div>

        <p className="mt-4 flex items-start gap-1.5 rounded-lg bg-lightblue/70 p-3 text-[10.5px] leading-relaxed text-royal">
          <Sparkles className="mt-px h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          Our full blog is launching soon. These previews are sample topics — request the full article or
          suggest one you would like to read.
        </p>

        <ul className="mt-4 space-y-2.5">
          {blogPosts.map((post) => (
            <li key={post.title} className="group rounded-xl border border-slate-200 p-4 transition hover:border-electric/50 hover:bg-mist">
              <div className="flex flex-wrap items-center gap-2 text-[10px]">
                <span className="rounded-full bg-lightblue px-2.5 py-0.5 font-semibold text-royal">{post.category}</span>
                <span className="text-slate-400">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-slate-400">
                  <Clock className="h-3 w-3" aria-hidden="true" /> {post.read}
                </span>
              </div>
              <h3 className="mt-2 font-display text-[14.5px] font-semibold leading-snug text-navy">{post.title}</h3>
              <p className="mt-1 text-[11.5px] leading-relaxed text-slate-500">{post.excerpt}</p>
              <button
                type="button"
                onClick={() => { closeBlog(); openContact(`Blog article: ${post.title}`); }}
                className="link-more mt-2 text-[11px]"
              >
                Request this article <ArrowRight className="h-3 w-3" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => { closeBlog(); openContact("Newsletter and blog"); }}
          className="btn-primary mt-4 w-full px-4 py-3 text-[12px]"
        >
          <Mail className="h-4 w-4" aria-hidden="true" /> Get articles by email
        </button>
      </div>
    </Modal>
  );
}

/* ------------------------------------------------------------------ */
/* Floating actions                                                    */
/* ------------------------------------------------------------------ */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.04 3C8.87 3 3.04 8.83 3.04 16c0 2.29.6 4.52 1.74 6.49L3 29l6.68-1.75A13 13 0 0 0 16.04 29c7.17 0 13-5.83 13-13s-5.83-13-13-13Zm0 23.76c-2.05 0-4.06-.55-5.82-1.6l-.42-.25-4.32 1.13 1.15-4.21-.27-.43A10.73 10.73 0 0 1 5.28 16c0-5.93 4.83-10.76 10.76-10.76S26.8 10.07 26.8 16s-4.83 10.76-10.76 10.76Zm5.9-8.06c-.32-.16-1.91-.94-2.21-1.05-.3-.11-.51-.16-.73.16-.21.32-.84 1.05-1.03 1.27-.19.21-.38.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.91-1.79-2.23-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.73-1.75-1-2.4-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.11 1.08-1.11 2.63 0 1.55 1.14 3.05 1.3 3.26.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.46.21 2.01.13.61-.09 1.91-.78 2.18-1.54.27-.75.27-1.4.19-1.54-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

export function FloatingActions() {
  const scrolled = useScrolled(600);

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6">
      {scrolled && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-white text-navy shadow-lg transition hover:-translate-y-0.5 hover:text-royal"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
      <a
        href={whatsappLink("Hello Namijee Technologies, I'd like to discuss a project.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Namijee Technologies on WhatsApp"
        className="group inline-flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-3 text-white shadow-[0_14px_30px_-12px_rgba(37,211,102,0.8)] transition hover:-translate-y-0.5 hover:bg-[#1ebe5b]"
      >
        <WhatsAppGlyph className="h-5 w-5" />
        <span className="hidden font-display text-[11.5px] font-semibold sm:inline">Chat on WhatsApp</span>
      </a>
    </div>
  );
}

export { Stars };
