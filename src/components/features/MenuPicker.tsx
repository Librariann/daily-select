"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw, Sparkles } from "lucide-react";

interface MenuPickerProps {
  menus: string[];
  title: string;
  subtitle: string;
  accentColor: string;
}

export function MenuPicker({ menus, title, subtitle, accentColor }: MenuPickerProps) {
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayMenu, setDisplayMenu] = useState<string>("");

  const pickRandom = useCallback(() => {
    if (isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);

    let count = 0;
    const totalSpins = 20;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * menus.length);
      setDisplayMenu(menus[randomIndex]);
      count++;

      if (count >= totalSpins) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * menus.length);
        const finalChoice = menus[finalIndex];
        setDisplayMenu(finalChoice);
        setResult(finalChoice);
        setIsSpinning(false);
      }
    }, 80);
  }, [isSpinning, menus]);

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">{title}</h1>
        <p className="text-slate-500">{subtitle}</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex min-h-[120px] items-center justify-center">
          <AnimatePresence mode="wait">
            {!result && !isSpinning && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className={`mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl ${accentColor}`}>
                  <Sparkles className="h-8 w-8" />
                </div>
                <p className="text-slate-400">버튼을 눌러 메뉴를 뽑아보세요</p>
              </motion.div>
            )}

            {isSpinning && (
              <motion.div
                key="spinning"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center"
              >
                <motion.p
                  key={displayMenu}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-bold text-slate-900"
                >
                  {displayMenu}
                </motion.p>
              </motion.div>
            )}

            {result && !isSpinning && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.1, type: "spring", damping: 10 }}
                  className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl ${accentColor}`}
                >
                  <span className="text-3xl">🍽️</span>
                </motion.div>
                <p className="mb-2 text-sm font-medium text-slate-500">오늘의 선택</p>
                <p className="text-4xl font-bold text-slate-900">{result}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={pickRandom}
          disabled={isSpinning}
          size="lg"
          className="w-full"
        >
          {isSpinning ? (
            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
          ) : result ? (
            <RefreshCw className="mr-2 h-5 w-5" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          {isSpinning ? "고르는 중..." : result ? "다시 뽑기" : "메뉴 뽑기"}
        </Button>
      </div>
    </div>
  );
}
