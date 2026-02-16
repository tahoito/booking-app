"use client";

import { useEffect, useState } from "react";
import { ChevronDown, X } from "lucide-react";
import AppButton from "@/app/components/AppButton";

type SeatUseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const durationOptions = [30, 60, 90];

export default function SeatUseModal({
  isOpen,
  onClose,
  onConfirm,
}: SeatUseModalProps) {
  const [peopleCount, setPeopleCount] = useState("1");
  const [duration, setDuration] = useState(90);
  const [isTimeSpecified, setIsTimeSpecified] = useState(false);
  const [timeSlot, setTimeSlot] = useState("");

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <button
        type="button"
        aria-label="モーダルを閉じる"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="seat-use-modal-title"
        className="relative w-full max-w-md rounded-t-[28px] rounded-b-none bg-bg px-6 pb-8 pt-8 text-text shadow-[0_-18px_50px_-24px_rgba(0,0,0,0.45)]"
      >
        <button
          type="button"
          aria-label="モーダルを閉じる"
          className="absolute right-4 top-4 rounded-full p-2 text-text/70 transition hover:text-text"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2
          id="seat-use-modal-title"
          className="text-center text-xl text-text"
        >
          今すぐ利用開始
        </h2>

        <div className="mt-7 space-y-6">
          <div className="space-y-2">
            <p className="text-base">利用人数</p>
            <div className="relative">
              <select
                value={peopleCount}
                onChange={(event) => setPeopleCount(event.target.value)}
                className="w-full appearance-none rounded-[10px] border border-main/40 bg-white px-4 py-3 text-base text-text outline-none transition focus:border-main focus:ring-2 focus:ring-main/20"
              >
                <option value="1">1人</option>
                <option value="2">2人</option>
                <option value="3">3人</option>
                <option value="4">4人</option>
                <option value="5">5人</option>
                <option value="6">6人</option>
              </select>
              <ChevronDown
                size={20}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text/70"
              />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-base">利用時間</p>
            <div className="grid grid-cols-3 gap-3">
              {durationOptions.map((minutes) => {
                const isSelected = duration === minutes;
                const isDisabled = isTimeSpecified;
                let buttonStyle = "border border-main bg-white text-text";

                if (isDisabled) {
                  buttonStyle =
                    "border border-main/20 bg-bg text-text/50 cursor-not-allowed";
                } else if (isSelected) {
                  buttonStyle =
                    "bg-main text-bg shadow-[0_12px_20px_-12px_rgba(0,47,108,0.6)]";
                }

                return (
                  <button
                    key={minutes}
                    type="button"
                    onClick={() => setDuration(minutes)}
                    disabled={isDisabled}
                    className={`h-12 rounded-[10px] text-base font-medium transition ${buttonStyle}`}
                  >
                    {minutes}分間
                  </button>
                );
              })}
            </div>
          </div>

          <div className={`space-y-2 ${isTimeSpecified ? "" : "opacity-50"}`}>
            <button
              type="button"
              onClick={() => setIsTimeSpecified((prev) => !prev)}
              className="flex items-center gap-3 text-base font-medium"
            >
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                  isTimeSpecified ? "border-main" : "border-main/40"
                }`}
              >
                <span
                  className={`h-3.5 w-3.5 rounded-full ${
                    isTimeSpecified ? "bg-main" : "bg-transparent"
                  }`}
                />
              </span>
              <span>時刻指定</span>
            </button>

            <div className="relative">
              <select
                value={timeSlot}
                onChange={(event) => setTimeSlot(event.target.value)}
                disabled={!isTimeSpecified}
                className="w-full appearance-none rounded-[10px] border border-main/20 bg-white px-4 py-3 text-base text-text outline-none transition focus:border-main focus:ring-2 focus:ring-main/20 disabled:cursor-not-allowed disabled:border-main/10 disabled:bg-bg/60 disabled:text-text/50"
              >
                <option value="">選択してください</option>
                <option value="10:00">10:00</option>
                <option value="10:30">10:30</option>
                <option value="11:00">11:00</option>
              </select>
              <ChevronDown
                size={20}
                className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-text/70"
              />
            </div>
          </div>
        </div>

        <div className="mt-9">
          <AppButton onClick={onConfirm} className="h-[58px] text-[17px]">
            座席を選択する
          </AppButton>
        </div>
      </div>
    </div>
  );
}
