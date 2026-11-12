import {
  ArrowUpRight,
  BarChart3,
  Boxes,
  Brush,
  CheckCircle2,
  Code2,
  Compass,
  Eye,
  Gem,
  Globe2,
  GraduationCap,
  Handshake,
  Headphones,
  Layers,
  Lightbulb,
  Megaphone,
  MonitorSmartphone,
  Palette,
  PenTool,
  Rocket,
  RocketIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Timer,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import aboutImg from "@/assets/about.jpg";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import megaphoneImg from "@/assets/megaphone.jpg";
import workBrand from "@/assets/work-brand.jpg";
import workLanding from "@/assets/work-landing.jpg";
import workPoster from "@/assets/work-poster.jpg";
import workVideo from "@/assets/work-video.jpg";
import workWeb from "@/assets/work-web.jpg";

export const images = {
  about: aboutImg,
  megaphone: megaphoneImg,
  avatars: [avatar1, avatar2, avatar3, avatar4],
};

/* ------------------------------------------------------------------ */
/* Company configuration — edit these values to update the live site.  */
/* ------------------------------------------------------------------ */
export const company = {
  name: "Namijee Technologies",
  tagline: "Innovating Today... Empowering Tomorrow.",
  phoneDisplay: "+234 808 910 4995",
  phoneHref: "+2348089104995",
  whatsapp: "2348089104995",
  email: import.meta.env.VITE_COMPANY_EMAIL || "namijeetechnologies@gmail.com",
  location: "Nigeria",
  hours: "Mon – Fri · 8:00am – 8:00pm WAT",
  socials: {
    facebook: "https://www.facebook.com/namijeetechnologies",
    instagram: "https://www.instagram.com/namijeetechnologies",
    x: "https://x.com/namijeetechnologies",
    youtube: "https://www.youtube.com/@namijeetechnologies",
  },
};

/**
 * Optional backend endpoints. When set (as VITE_ env vars at build time)
 * forms POST JSON to these URLs. When unset, the contact form hands the
 * enquiry to WhatsApp and the newsletter stores the address locally.
 */
export const endpoints = {
  contact: import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined,
  newsletter: import.meta.env.VITE_NEWSLETTER_ENDPOINT as string | undefined,
};

export type NavItem = { label: string; href?: string; action?: "services" | "blog" };

export const navItems: NavItem[] = [
  { label: "Home", href: "#home" },
  { label: "Services", action: "services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Blog", action: "blog" },
  { label: "Contact", href: "#contact" },
];

export type Service = {
  id: string;
  title: string;
  shortTitle: string;
  icon: LucideIcon;
  description: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    id: "web",
    title: "Website Design & Development",
    shortTitle: "Website Development",
    icon: Globe2,
    description: "Modern, responsive and SEO-friendly websites that perform.",
    bullets: [
      "Business websites",
      "E-commerce websites",
      "Responsive web development",
      "Website maintenance",
      "Website redesign",
    ],
  },
  {
    id: "video",
    title: "Video Editing & Motion Graphics",
    shortTitle: "Video & Motion",
    icon: MonitorSmartphone,
    description: "Engaging video content that brings your ideas to life.",
    bullets: [
      "Promotional videos",
      "Social media video editing",
      "Motion graphics",
      "Logo animations",
      "Explainer videos",
    ],
  },
  {
    id: "landing",
    title: "Landing Page Design",
    shortTitle: "Landing Pages",
    icon: Rocket,
    description: "High-converting landing pages built to capture leads.",
    bullets: [
      "Sales landing pages",
      "Lead generation pages",
      "Product landing pages",
      "Campaign landing pages",
      "Conversion optimisation",
    ],
  },
  {
    id: "brand",
    title: "Graphic Design & Branding",
    shortTitle: "Graphic & Branding",
    icon: Palette,
    description: "Memorable designs that build and elevate your brand.",
    bullets: [
      "Flyers and posters",
      "Business cards",
      "Logos and brand identity",
      "Social media designs",
      "Brochures and banners",
    ],
  },
  {
    id: "software",
    title: "Software & IT Solutions",
    shortTitle: "Software & IT",
    icon: Code2,
    description: "Smart software and reliable IT solutions for your business.",
    bullets: [
      "Custom software development",
      "Business management systems",
      "Web applications",
      "Database solutions",
      "Technical support",
    ],
  },
  {
    id: "marketing",
    title: "Digital Marketing & Social Media",
    shortTitle: "Digital Marketing",
    icon: Megaphone,
    description: "Grow your online presence with strategy-led marketing.",
    bullets: [
      "Social media management",
      "Content creation",
      "Digital advertising",
      "Brand promotion",
      "Social media strategy",
    ],
  },
];

export const aboutCards = [
  {
    title: "Our Mission",
    icon: Target,
    copy: "To deliver top-notch digital solutions that create real value.",
  },
  {
    title: "Our Vision",
    icon: Eye,
    copy: "To be a leading tech brand known for innovation and excellence.",
  },
  {
    title: "Our Values",
    icon: Gem,
    copy: "Quality, Integrity, Innovation and Customer Satisfaction.",
  },
];

export const whyChooseUs = [
  { title: "Professional Quality", icon: Gem, copy: "Crafted to a high standard." },
  { title: "On-Time Delivery", icon: Timer, copy: "Deadlines we take seriously." },
  { title: "Reliable Support", icon: Headphones, copy: "Real people, ready to help." },
  { title: "Innovative Solutions", icon: Lightbulb, copy: "Fresh thinking, applied well." },
  { title: "Affordable Pricing", icon: Wallet, copy: "Value at every budget." },
];

export type Project = {
  id: string;
  title: string;
  client: string;
  category: "Web Design" | "Graphic Design" | "Video Editing" | "Branding" | "Landing Page";
  image: string;
  summary: string;
  description: string;
  deliverables: string[];
  year: string;
  accent: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    id: "meridian",
    title: "Meridian Commerce",
    client: "Meridian Retail",
    category: "Web Design",
    image: workWeb,
    summary: "A conversion-focused online store for a growing retail brand.",
    description:
      "We rebuilt Meridian's online store around a mobile-first catalogue, a cleaner checkout and a content system the team can update without a developer. Page load times dropped and enquiries started arriving from organic search within weeks.",
    deliverables: ["UX & UI design", "Responsive build", "Checkout integration", "SEO foundations"],
    year: "2025",
    accent: "from-electric to-cyanbrand",
    featured: true,
  },
  {
    id: "aurora",
    title: "Aurora Brand Suite",
    client: "Aurora Foods",
    category: "Branding",
    image: workBrand,
    summary: "Identity design and print collateral for a premium food brand.",
    description:
      "A complete visual identity: logo, colour system, typography, packaging direction and stationery. The suite gives Aurora a confident, consistent look across shelves, events and social media.",
    deliverables: ["Logo & mark", "Brand guidelines", "Stationery", "Packaging direction"],
    year: "2025",
    accent: "from-royal to-electric",
    featured: true,
  },
  {
    id: "cinematic",
    title: "Cinematic Product Edit",
    client: "Studio Nova",
    category: "Video Editing",
    image: workVideo,
    summary: "A polished launch film with motion graphics and sound design.",
    description:
      "We cut a 60-second launch film from raw product footage, adding motion titles, colour grading and a sound mix. The result was a campaign-ready set of edits for social, web and in-store screens.",
    deliverables: ["Editing & grading", "Motion graphics", "Sound mix", "Social cut-downs"],
    year: "2026",
    accent: "from-cyanbrand to-royal",
    featured: true,
  },
  {
    id: "bold",
    title: "Bold Futures Campaign",
    client: "Bold Futures",
    category: "Graphic Design",
    image: workPoster,
    summary: "A poster and social campaign built on strong typography.",
    description:
      "A visual campaign for a youth leadership programme, spanning print posters, outdoor placements and a social template kit. The system keeps the message bold while staying quick for the in-house team to adapt.",
    deliverables: ["Campaign concept", "Poster series", "Social kit", "Print-ready artwork"],
    year: "2025",
    accent: "from-electric to-royal",
    featured: true,
  },
  {
    id: "northstar",
    title: "Northstar Lead Funnel",
    client: "Northstar Consulting",
    category: "Landing Page",
    image: workLanding,
    summary: "A focused landing page that turns visitors into qualified leads.",
    description:
      "Research, copy structure, design and build of a single-purpose lead generation page. Clear hierarchy, a short form and fast loading on mobile made the campaign easy to measure and refine.",
    deliverables: ["Message strategy", "Landing page design", "Form integration", "Analytics setup"],
    year: "2026",
    accent: "from-royal to-cyanbrand",
    featured: false,
  },
  {
    id: "lumen",
    title: "Lumen Portfolio Site",
    client: "Lumen Studio",
    category: "Web Design",
    image: workWeb,
    summary: "A minimal portfolio experience for a design studio.",
    description:
      "A quiet, image-led portfolio with generous whitespace and smooth case-study transitions. Content is fully editable, so new work can be published in minutes.",
    deliverables: ["Art direction", "Portfolio UI", "CMS setup", "Performance tuning"],
    year: "2026",
    accent: "from-electric to-royal",
    featured: false,
  },
];

export const processSteps = [
  { title: "Consultation", copy: "Understand your needs.", icon: Compass },
  { title: "Planning", copy: "Plan the right solution.", icon: Layers },
  { title: "Design", copy: "Create awesome designs.", icon: PenTool },
  { title: "Development", copy: "Bring it to life.", icon: Code2 },
  { title: "Review", copy: "Ensure your satisfaction.", icon: Search },
  { title: "Delivery", copy: "On time, always.", icon: RocketIcon },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
};

/** Sample content for layout purposes — replace with verified client feedback. */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Namijee Technologies delivered beyond our expectations. Their creativity and professionalism are unmatched.",
    name: "Ahmad Yusuf",
    role: "Business Owner",
    avatar: avatar1,
    rating: 5,
  },
  {
    quote:
      "Our new website finally reflects the quality of our work. Clear communication from the first call to launch day.",
    name: "Grace Nwosu",
    role: "Marketing Director",
    avatar: avatar2,
    rating: 5,
  },
  {
    quote:
      "The branding suite gave us a confident, consistent identity. Every deliverable arrived on schedule and ready to use.",
    name: "Daniel Adeyemi",
    role: "Founder, Aurora Foods",
    avatar: avatar3,
    rating: 5,
  },
  {
    quote:
      "Fast, thoughtful and genuinely invested in the outcome. The landing page has become our best performing campaign.",
    name: "Chiamaka Obi",
    role: "Startup Founder",
    avatar: avatar4,
    rating: 5,
  },
];

export const pricingPlans = [
  {
    id: "basic",
    name: "Basic",
    price: "₦50,000",
    unit: "/ Project",
    description: "Ideal for a focused first launch.",
    features: ["Standard Design", "Basic Support", "2 revision rounds", "Mobile responsive"],
    cta: "Get Started",
    popular: false,
  },
  {
    id: "professional",
    name: "Professional",
    price: "₦100,000",
    unit: "/ Project",
    description: "For brands ready to scale.",
    features: ["Advanced Features", "Priority Support", "4 revision rounds", "SEO setup"],
    cta: "Get Started",
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "₦200,000+",
    unit: "/ Project",
    description: "Custom builds and ongoing care.",
    features: ["Custom Solution", "Dedicated Support", "Unlimited revisions", "SLA-backed maintenance"],
    cta: "Contact Us",
    popular: false,
  },
];

export const faqs = [
  {
    q: "What services does Namijee Technologies offer?",
    a: "We offer website design and development, landing pages, graphic design and branding, video editing and motion graphics, software and IT solutions, and digital marketing and social media management. Engagements can cover a single deliverable or an end-to-end digital launch.",
  },
  {
    q: "How can I get a quote?",
    a: "Share a short brief through our contact form, email or WhatsApp. We will review your goals, timeline and scope, then send a written proposal with a fixed price and clear deliverables — usually within two business days.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "Yes. Every project ends with a handover and included support window. After that, you can choose a monthly care plan covering updates, security checks, small content changes and priority response times.",
  },
  {
    q: "How long does a project take?",
    a: "A landing page typically takes 1–2 weeks, a full website 3–6 weeks, and branding or video projects 2–4 weeks depending on scope. You receive a milestone schedule before work begins so expectations are clear from day one.",
  },
  {
    q: "How can I start a project?",
    a: "Use the “Start a Project” button, call +234 808 910 4995, or send us an email. We will set up a short discovery call, confirm the scope and share the next steps. No commitment is required for the initial consultation.",
  },
];

export const blogPosts = [
  {
    category: "Web Strategy",
    title: "What actually makes a business website convert?",
    excerpt:
      "Speed, clarity and one obvious next step matter more than decoration. Here is the checklist we use before every launch.",
    read: "5 min read",
    date: "Jan 2026",
  },
  {
    category: "Branding",
    title: "Building a brand system you can actually use",
    excerpt:
      "A logo is only the beginning. Colour, type, tone and templates are what keep a brand consistent as it grows.",
    read: "4 min read",
    date: "Feb 2026",
  },
  {
    category: "Digital Marketing",
    title: "A simple monthly content rhythm for small teams",
    excerpt:
      "You do not need to post every day. This repeatable cadence keeps your channels active without burning out your team.",
    read: "6 min read",
    date: "Mar 2026",
  },
];

export const illustrations = {
  ArrowUpRight,
  ArrowUpRightAlt: ArrowUpRight,
  box: Boxes,
  brush: Brush,
  graduation: GraduationCap,
  sparkles: Sparkles,
  shield: ShieldCheck,
  check: CheckCircle2,
  handshake: Handshake,
  chart: BarChart3,
  compass: Compass,
};
