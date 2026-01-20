"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function YesNo() {
  const [result, setResult] = useState<"yes" | "no" | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipCount, setFlipCount] = useState(0);

  const flip = useCallback(() => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setResult(null);
    
    let count = 0;
    const totalFlips = 10;
    
    const interval = setInterval(() => {
      setFlipCount(prev => prev + 1);
      count++;
      
      if (count >= totalFlips) {
        clearInterval(interval);
        const finalResult = Math.random() < 0.5 ? "yes" : "no";
        setResult(finalResult);
        setIsFlipping(false);
      }
    }, 150);
  }, [isFlipping]);

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">Yes or No</h1>
        <p className="text-slate-500">할까 말까? 동전에게 물어보세요</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-8 flex min-h-[200px] items-center justify-center">
          <AnimatePresence mode="wait">
            {!result && !isFlipping && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-lg">
                  <span className="text-4xl">🪙</span>
                </div>
                <p className="text-slate-400">버튼을 눌러 동전을 던져보세요</p>
              </motion.div>
            )}

            {isFlipping && (
              <motion.div
                key="flipping"
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    rotateY: flipCount * 180,
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 0.15 }}
                  className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-amber-200 to-amber-400 shadow-xl"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <span className="text-4xl">🪙</span>
                </motion.div>
              </motion.div>
            )}

            {result && !isFlipping && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.5, rotateY: 180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ type: "spring", damping: 12 }}
                className="text-center"
              >
                <motion.div
                  initial={{ y: -20 }}
                  animate={{ y: 0 }}
                  className={`mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full shadow-xl ${
                    result === "yes" 
                      ? "bg-gradient-to-br from-green-400 to-green-600" 
                      : "bg-gradient-to-br from-red-400 to-red-600"
                  }`}
                >
                  <span className="text-5xl font-bold text-white">
                    {result === "yes" ? "O" : "X"}
                  </span>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-4xl font-bold ${
                    result === "yes" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result === "yes" ? "YES!" : "NO!"}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mt-2 text-slate-500"
                >
                  {result === "yes" ? "해!" : "하지마!"}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Button
          onClick={flip}
          disabled={isFlipping}
          size="lg"
          className="w-full"
        >
          {isFlipping ? (
            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <span className="mr-2">🪙</span>
          )}
          {isFlipping ? "던지는 중..." : result ? "다시 던지기" : "동전 던지기"}
        </Button>
      </div>
    </div>
  );
}
