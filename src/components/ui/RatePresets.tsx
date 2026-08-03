"use client";

import { RatePreset } from "@/lib/rfq-data";
import { formatINR } from "@/lib/currency";

export function RatePresets({
  presets,
  activeValue,
  onSelect,
}: {
  presets: RatePreset[];
  activeValue: number | null;
  onSelect: (value: number) => void;
}) {
  return (
    <div role="group" aria-label="Price reference">
      <p className="text-[11px] font-medium tracking-wide text-text-muted uppercase">
        Price reference
      </p>
      <div className="mt-2 grid grid-cols-2 gap-2.5">
        {presets.map((preset) => {
          const active = activeValue === preset.value;
          return (
            <button
              key={preset.label}
              type="button"
              onClick={() => onSelect(preset.value)}
              aria-pressed={active}
              className={`rounded-[4px] border bg-[#FCFAF5] px-3 py-2.5 text-left transition-colors duration-150 ${
                active ? "border-[#FFD75D]" : "border-[#E6E6E6]"
              }`}
            >
              <span className="block text-[11px] text-text-muted">{preset.label}</span>
              <span className="mt-0.5 block text-[14px] font-semibold text-text tabular-nums">
                {formatINR(preset.value)}{" "}
                <span className="text-[12px] font-normal text-text-muted">/MT</span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
