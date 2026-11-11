import { Star } from "lucide-react";
import type { ReactNode } from "react";
import logo from "@/assets/logo.jpg";
import { cn } from "@/utils/cn";

export function Logo({
  className,
  imgClassName,
  variant = "dark",
}: {
  className?: string;
  imgClassName?: string;
  variant?: "dark" | "light";
}) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <img
        src={logo}
        alt="Namijee Technologies — innovation, solutions, a smarter tomorrow"
        width={1300}
        height={469}
        className={cn(
          "h-auto w-[150px] select-none object-contain sm:w-[170px] lg:w-[182px]",
          variant === "dark" && "brand-glow",
          imgClassName
        )}
        loading="eager"
        decoding="async"
      />
    </span>
  );
}

export function SectionEyebrow({
  children,
  tone = "dark",
  icon,
  className,
}: {
  children: ReactNode;
  tone?: "dark" | "light";
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "eyebrow",
        tone === "light" ? "text-cyanbrand" : "text-royal",
        className
      )}
    >
      {icon ?? (
        <span
          aria-hidden="true"
          className={cn(
            "h-px w-5",
            tone === "light" ? "bg-cyanbrand/80" : "bg-royal/70"
          )}
        />
      )}
      {children}
    </span>
  );
}

export function Stars({ count = 5, className }: { count?: number; className?: string }) {
  return (
    <span
      className={cn("inline-flex items-center gap-0.5 text-amber-400", className)}
      role="img"
      aria-label={`${count} out of 5 stars`}
    >
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} aria-hidden="true" />
      ))}
    </span>
  );
}

export function ArrowLink({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      {children}
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
        <path
          d="M2.6 7h8.2M7.4 3.4 11 7l-3.6 3.6"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
