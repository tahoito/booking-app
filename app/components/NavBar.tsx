"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";
import { Home, Map, Plus, User } from "lucide-react";

type Item = {
  href: string;
  label: string;
  Icon: ComponentType<{ className?: string; size?: number }>;
  variant?: "ring";
};

const items: Item[] = [
  { href: "/", label: "ホーム", Icon: Home },
  { href: "/list", label: "座席一覧", Icon: Map },
  { href: "/reserve", label: "予約する", Icon: Plus, variant: "ring" },
  { href: "/mypage", label: "マイページ", Icon: User },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-main shadow-[0_-10px_30px_-20px_rgba(0,47,108,0.85)]">
      <div className="mx-auto max-w-[520px] px-6 pb-[env(safe-area-inset-bottom)]">
        <ul className="flex items-center justify-between py-3">
          {items.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            const tone = isActive ? "text-bg" : "text-placeholder";
            const icon = <item.Icon size={30} className={tone} />;

            return (
              <li key={item.href} className="flex-1">
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className="flex flex-col items-center gap-1"
                >
                  {item.variant === "ring" ? (
                    <span
                      className={`flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 ${
                        isActive ? "border-bg" : "border-placeholder"
                      }`}
                    >
                      {icon}
                    </span>
                  ) : (
                    <span className="flex h-[30px] w-[30px] items-center justify-center">
                      {icon}
                    </span>
                  )}
                  <span className={`${tone} text-[8px]`}>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
