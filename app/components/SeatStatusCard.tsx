"use client";

type SeatStatus = {
  label: string;
  count: number;
  total: number;
  tone: "available" | "unavailable" | "not-use";
};

const toneStyles: Record<SeatStatus["tone"], string> = {
  available: "bg-available",
  unavailable: "bg-unavailable",
  "not-use": "bg-not-use",
};

export default function SeatStatusCard({ label, count, total, tone }: SeatStatus) {
  return (
    <div className="rounded-[20px] border border-main/40 bg-bg p-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3">
        <span
          className={`h-4 w-4 rounded-full ${toneStyles[tone]}`}
          aria-hidden="true"
        />
        <span className="text-base text-main">{label}</span>
      </div>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-[41px] font-medium text-main">{count}</span>
        <span className="text-base font-medium text-text">/{total}</span>
      </div>
    </div>
  );
}
