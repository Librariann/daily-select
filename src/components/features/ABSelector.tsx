"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Swords } from "lucide-react";

export function ABSelector() {
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [result, setResult] = useState<"A" | "B" | null>(null);
  const [isSelecting, setIsSelecting] = useState(false);

  const selectRandom = () => {
    if (!optionA.trim() || !optionB.trim() || isSelecting) return;

    setIsSelecting(true);
    setResult(null);

    let count = 0;
    const totalFlips = 15;
    const interval = setInterval(() => {
      setResult(count % 2 === 0 ? "A" : "B");
      count++;

      if (count >= totalFlips) {
        clearInterval(interval);
        const finalChoice = Math.random() < 0.5 ? "A" : "B";
        setResult(finalChoice);
        setIsSelecting(false);
      }
    }, 100);
  };

  const reset = () => {
    setResult(null);
    setOptionA("");
    setOptionB("");
  };

  const winner = result === "A" ? optionA : result === "B" ? optionB : null;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">A vs B</h1>
        <p className="text-slate-500">둘 중 하나, 대신 골라드립니다</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              선택지 A
            </label>
            <Input
              value={optionA}
              onChange={(e) => setOptionA(e.target.value)}
              placeholder="첫 번째 선택지를 입력하세요"
              disabled={isSelecting}
            />
          </div>
          <div className="flex items-center justify-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
              <Swords className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              선택지 B
            </label>
            <Input
              value={optionB}
              onChange={(e) => setOptionB(e.target.value)}
              placeholder="두 번째 선택지를 입력하세요"
              disabled={isSelecting}
            />
          </div>
        </div>

        <div className="mb-6 flex min-h-[100px] items-center justify-center">
          <AnimatePresence mode="wait">
            {!result && !isSelecting && (
              <motion.p
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-slate-400"
              >
                두 선택지를 입력하고 버튼을 눌러보세요
              </motion.p>
            )}

            {isSelecting && (
              <motion.div
                key="selecting"
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 0.3, 
                    repeat: Infinity 
                  }}
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold ${
                    result === "A" 
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {result}
                </motion.div>
              </motion.div>
            )}

            {result && !isSelecting && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="text-center"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", damping: 10 }}
                  className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl ${
                    result === "A" 
                      ? "bg-blue-100 text-blue-600" 
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  <span className="text-3xl">🏆</span>
                </motion.div>
                <p className="mb-1 text-sm font-medium text-slate-500">
                  승자는...
                </p>
                <p className="text-3xl font-bold text-slate-900">{winner}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          {result && !isSelecting ? (
            <>
              <Button
                onClick={selectRandom}
                size="lg"
                className="flex-1"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                다시 선택
              </Button>
              <Button
                onClick={reset}
                size="lg"
                variant="outline"
                className="flex-1"
              >
                새로 입력
              </Button>
            </>
          ) : (
            <Button
              onClick={selectRandom}
              disabled={!optionA.trim() || !optionB.trim() || isSelecting}
              size="lg"
              className="w-full"
            >
              {isSelecting ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Swords className="mr-2 h-5 w-5" />
              )}
              {isSelecting ? "선택 중..." : "골라줘!"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
