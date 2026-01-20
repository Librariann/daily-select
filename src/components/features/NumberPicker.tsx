"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Sparkles } from "lucide-react";

const PRESETS = [
  { label: "로또 (1~45 중 6개)", min: 1, max: 45, count: 6 },
  { label: "1~10 중 1개", min: 1, max: 10, count: 1 },
  { label: "1~100 중 1개", min: 1, max: 100, count: 1 },
];

export function NumberPicker() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(45);
  const [count, setCount] = useState(6);
  const [results, setResults] = useState<number[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [displayNumbers, setDisplayNumbers] = useState<number[]>([]);

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setMin(preset.min);
    setMax(preset.max);
    setCount(preset.count);
    setResults([]);
  };

  const generate = useCallback(() => {
    if (isGenerating) return;
    if (max - min + 1 < count) return;
    
    setIsGenerating(true);
    setResults([]);
    setDisplayNumbers([]);
    
    const finalNumbers: number[] = [];
    const available = Array.from({ length: max - min + 1 }, (_, i) => min + i);
    
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * available.length);
      finalNumbers.push(available[randomIndex]);
      available.splice(randomIndex, 1);
    }
    
    finalNumbers.sort((a, b) => a - b);
    
    let revealIndex = 0;
    const interval = setInterval(() => {
      if (revealIndex < count) {
        let shuffleCount = 0;
        const shuffleInterval = setInterval(() => {
          const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
          setDisplayNumbers(prev => {
            const newArr = [...prev];
            newArr[revealIndex] = randomNum;
            return newArr;
          });
          shuffleCount++;
          
          if (shuffleCount >= 8) {
            clearInterval(shuffleInterval);
            setDisplayNumbers(prev => {
              const newArr = [...prev];
              newArr[revealIndex] = finalNumbers[revealIndex];
              return newArr;
            });
          }
        }, 50);
        
        revealIndex++;
      } else {
        clearInterval(interval);
        setResults(finalNumbers);
        setIsGenerating(false);
      }
    }, 500);
  }, [isGenerating, min, max, count]);

  const isValid = max > min && count > 0 && count <= max - min + 1;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">숫자 뽑기</h1>
        <p className="text-slate-500">로또, 순서, 번호 뽑기 한 번에</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-slate-700">빠른 선택</p>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((preset, index) => (
              <button
                key={index}
                onClick={() => applyPreset(preset)}
                className="rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-200"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-3 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              최소
            </label>
            <Input
              type="number"
              value={min}
              onChange={(e) => setMin(Number(e.target.value))}
              min={1}
              max={999}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              최대
            </label>
            <Input
              type="number"
              value={max}
              onChange={(e) => setMax(Number(e.target.value))}
              min={1}
              max={999}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              개수
            </label>
            <Input
              type="number"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
              min={1}
              max={20}
            />
          </div>
        </div>

        <div className="mb-6 flex min-h-[120px] items-center justify-center">
          <AnimatePresence mode="wait">
            {displayNumbers.length === 0 && results.length === 0 && !isGenerating && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-500">
                  <Sparkles className="h-8 w-8" />
                </div>
                <p className="text-slate-400">버튼을 눌러 숫자를 뽑아보세요</p>
              </motion.div>
            )}

            {(displayNumbers.length > 0 || results.length > 0) && (
              <motion.div
                key="numbers"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap justify-center gap-3"
              >
                {(isGenerating ? displayNumbers : results).map((num, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: results.length > 0 ? index * 0.1 : 0 }}
                    className={`flex h-14 w-14 items-center justify-center rounded-full text-xl font-bold text-white shadow-lg ${
                      results.length > 0
                        ? "bg-gradient-to-br from-indigo-500 to-purple-600"
                        : "bg-slate-400"
                    }`}
                  >
                    {num}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {!isValid && (
          <p className="mb-4 text-center text-sm text-red-500">
            범위 내에서 뽑을 수 있는 개수를 확인해주세요
          </p>
        )}

        <Button
          onClick={generate}
          disabled={isGenerating || !isValid}
          size="lg"
          className="w-full"
        >
          {isGenerating ? (
            <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          {isGenerating ? "뽑는 중..." : results.length > 0 ? "다시 뽑기" : "숫자 뽑기"}
        </Button>
      </div>
    </div>
  );
}
