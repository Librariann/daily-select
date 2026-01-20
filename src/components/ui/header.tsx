"use client";

import { useState } from "react";
import Link from "next/link";
import { Dices, Menu, X } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const navItems = [
  { href: "/lunch", label: "점심" },
  { href: "/dinner", label: "저녁" },
  { href: "/yesno", label: "Yes/No" },
  { href: "/ab", label: "A vs B" },
  { href: "/number", label: "숫자" },
  { href: "/roulette", label: "룰렛" },
  { href: "/ladder", label: "사다리" },
  { href: "/team", label: "팀" },
  { href: "/draw", label: "제비" },
  { href: "/order", label: "순서" },
  { href: "/timer", label: "타이머" },
  { href: "/todo", label: "할일" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-xl font-bold text-slate-900 transition-colors hover:text-slate-700 dark:text-white dark:hover:text-slate-300"
          onClick={() => setIsOpen(false)}
        >
          <Dices className="h-6 w-6 text-indigo-500" />
          <span>골라줘</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-2 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 dark:border-slate-800 dark:bg-slate-900 md:hidden">
          <nav className="grid grid-cols-4 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-lg bg-slate-50 px-3 py-3 text-center text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
