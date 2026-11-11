import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

type DialogState = {
  contactOpen: boolean;
  searchOpen: boolean;
  blogOpen: boolean;
  projectId: string | null;
  interest: string | undefined;
  openContact: (interest?: string) => void;
  closeContact: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openBlog: () => void;
  closeBlog: () => void;
  openProject: (id: string) => void;
  closeProject: () => void;
};

export const SiteContext = createContext<DialogState | null>(null);

export function useSite() {
  const ctx = useContext(SiteContext);
  if (!ctx) throw new Error("useSite must be used within a SiteProvider");
  return ctx;
}

export function useDialogState(): DialogState {
  const [contactOpen, setContactOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [blogOpen, setBlogOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [interest, setInterest] = useState<string | undefined>(undefined);

  return useMemo(
    () => ({
      contactOpen,
      searchOpen,
      blogOpen,
      projectId,
      interest,
      openContact: (value?: string) => {
        setInterest(value);
        setContactOpen(true);
      },
      closeContact: () => setContactOpen(false),
      openSearch: () => setSearchOpen(true),
      closeSearch: () => setSearchOpen(false),
      openBlog: () => setBlogOpen(true),
      closeBlog: () => setBlogOpen(false),
      openProject: (id: string) => setProjectId(id),
      closeProject: () => setProjectId(null),
    }),
    [contactOpen, searchOpen, blogOpen, projectId, interest]
  );
}

/** Highlights the nav item for the section currently in view. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  const idsRef = useRef(ids);
  idsRef.current = ids;

  useEffect(() => {
    const onScroll = () => {
      const offset = 140;
      let current = idsRef.current[0];
      for (const id of idsRef.current) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}

export function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

/** Locks page scroll while a modal/drawer is open. */
export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const top = el.getBoundingClientRect().top + window.scrollY - 78;
  window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
}

export function whatsappLink(message: string) {
  return `https://wa.me/2348089104995?text=${encodeURIComponent(message)}`;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}
