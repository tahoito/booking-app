"use client";

import { useState } from "react";
import { Bell, ChevronRight } from "lucide-react";
import AppButton from "@/app/components/AppButton";
import SeatUseModal from "@/app/components/SeatUseModal";
import SeatStatusCard from "@/app/components/SeatStatusCard";

const seatStatuses = [
  { label: "空席", count: 16, total: 30, tone: "available" as const },
  { label: "使用中", count: 4, total: 30, tone: "unavailable" as const },
  { label: "利用不可", count: 5, total: 30, tone: "not-use" as const },
];

export default function HomePage() {
  const [isSeatUseModalOpen, setSeatUseModalOpen] = useState(false);
  const dateLabel = new Intl.DateTimeFormat("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(new Date());

  return (
    <main className="min-h-screen bg-bg text-text">
      <section className="bg-main px-6 pb-12 pt-12 text-bg">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-bg/80" aria-hidden="true" />
            <div>
              <p className="text-sm text-placeholder">2303047</p>
              <p className="text-lg font-semibold">Taho</p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full p-2 text-bg transition"
            aria-label="通知"
          >
            <Bell size={24} />
          </button>
        </header>

        <div className="mt-8">
          <AppButton
            variant="ghost"
            onClick={() => setSeatUseModalOpen(true)}
          >
            今すぐ席を利用する
          </AppButton>
        </div>
      </section>

      <section className="-mt-8 px-6">
        <div className="rounded-[24px] bg-card p-6 shadow-[0_18px_40px_-24px_rgba(0,0,0,0.45)]">
          <p className="text-[20px]">{dateLabel}</p>

          <div className="mt-4 rounded-[16px] border border-main/40 bg-bg p-4">
            <p className="text-[18px] text-main">利用状況</p>

            <div className="mt-4 space-y-4 text-sm text-text">
              <div>
                <p className="text-base">現在利用中</p>
                <p className="mt-1 text-sm text-placeholder">
                  現在使用している座席はありません
                </p>
              </div>
              <div>
                <p className="text-base">本日の予約</p>
                <p className="mt-1 text-sm text-placeholder">
                  本日予約している座席はありません
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <AppButton>座席を予約する</AppButton>
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 pt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-[20px] text-text">現在の座席状況</h2>
          <button
            type="button"
            className="flex items-center gap-1 text-main2"
          >
            <span className="text-base text-main">全て</span>
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4">
          {seatStatuses.map((status) => (
            <SeatStatusCard
              key={status.label}
              label={status.label}
              count={status.count}
              total={status.total}
              tone={status.tone}
            />
          ))}
        </div>
      </section>

      <SeatUseModal
        isOpen={isSeatUseModalOpen}
        onClose={() => setSeatUseModalOpen(false)}
        onConfirm={() => setSeatUseModalOpen(false)}
      />
    </main>
  );
}
