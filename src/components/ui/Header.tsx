"use client";

import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  label: string;
  onBack?: () => void;
  right?: React.ReactNode;
}

export function Header({ label, onBack, right }: HeaderProps) {
  return (
    <header className="relative z-20 flex h-14 shrink-0 items-center justify-between border-b border-border bg-bg px-5">
      <div className="flex min-w-11 items-center">
        {onBack ? (
          <button
            type="button"
            onClick={onBack}
            aria-label="Back"
            className="-ml-2 flex h-11 w-11 items-center justify-center text-text transition-colors active:text-primary"
          >
            <ArrowLeft size={20} strokeWidth={1.75} />
          </button>
        ) : null}
      </div>
      <span className="text-[13px] font-medium tracking-wide text-text-muted uppercase">
        {label}
      </span>
      <div className="flex min-w-11 items-center justify-end">{right}</div>
    </header>
  );
}
