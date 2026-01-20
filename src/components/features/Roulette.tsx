"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Plus, X, Play } from "lucide-react";

const COLORS = [
  "#6366f1",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

export function Roulette() {
  const [items, setItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const spinCount = useRef(0);

  const addItem = () => {
    if (inputValue.trim() && items.length < 8) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const spin = () => {
    if (items.length < 2 || isSpinning) return;

    setIsSpinning(true);
    setResult(null);

    const spins = 5 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const totalRotation = spins * 360 + randomAngle;
    
    spinCount.current += 1;
    const newRotation = rotation + totalRotation;
    setRotation(newRotation);

    setTimeout(() => {
      const normalizedAngle = (360 - (newRotation % 360)) % 360;
      const segmentAngle = 360 / items.length;
      const winningIndex = Math.floor(normalizedAngle / segmentAngle);
      setResult(items[winningIndex]);
      setIsSpinning(false);
    }, 4000);
  };

  const reset = () => {
    setItems([]);
    setResult(null);
    setRotation(0);
  };

  const segmentAngle = items.length > 0 ? 360 / items.length : 0;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">룰렛 돌리기</h1>
        <p className="text-slate-500">운명의 룰렛을 돌려보세요</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        {items.length < 2 ? (
          <div className="mb-6">
            <p className="mb-4 text-center text-sm text-slate-500">
              최소 2개의 항목을 추가해주세요 (최대 8개)
            </p>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addItem()}
                placeholder="항목 입력"
                maxLength={20}
              />
              <Button onClick={addItem} disabled={!inputValue.trim()}>
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            {items.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-white"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  >
                    {item}
                    <button
                      onClick={() => removeItem(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="relative mb-6 flex justify-center">
              <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1">
                <div className="h-0 w-0 border-l-[12px] border-r-[12px] border-t-[20px] border-l-transparent border-r-transparent border-t-slate-900" />
              </div>
              
              <motion.div
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: [0.2, 0.8, 0.2, 1] }}
                className="relative h-64 w-64"
              >
                <svg viewBox="0 0 100 100" className="h-full w-full drop-shadow-lg">
                  {items.map((item, index) => {
                    const startAngle = index * segmentAngle - 90;
                    const endAngle = (index + 1) * segmentAngle - 90;
                    const startRad = (startAngle * Math.PI) / 180;
                    const endRad = (endAngle * Math.PI) / 180;
                    
                    const x1 = 50 + 50 * Math.cos(startRad);
                    const y1 = 50 + 50 * Math.sin(startRad);
                    const x2 = 50 + 50 * Math.cos(endRad);
                    const y2 = 50 + 50 * Math.sin(endRad);
                    
                    const largeArc = segmentAngle > 180 ? 1 : 0;
                    
                    const midAngle = ((startAngle + endAngle) / 2 * Math.PI) / 180;
                    const textX = 50 + 30 * Math.cos(midAngle);
                    const textY = 50 + 30 * Math.sin(midAngle);
                    
                    return (
                      <g key={index}>
                        <path
                          d={`M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArc} 1 ${x2} ${y2} Z`}
                          fill={COLORS[index % COLORS.length]}
                          stroke="white"
                          strokeWidth="0.5"
                        />
                        <text
                          x={textX}
                          y={textY}
                          fill="white"
                          fontSize="6"
                          fontWeight="bold"
                          textAnchor="middle"
                          dominantBaseline="middle"
                          transform={`rotate(${(startAngle + endAngle) / 2 + 90}, ${textX}, ${textY})`}
                        >
                          {item.length > 6 ? item.slice(0, 6) + "..." : item}
                        </text>
                      </g>
                    );
                  })}
                  <circle cx="50" cy="50" r="8" fill="white" />
                  <circle cx="50" cy="50" r="6" fill="#1e293b" />
                </svg>
              </motion.div>
            </div>

            <div className="mb-4 flex flex-wrap justify-center gap-2">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 rounded-full px-3 py-1 text-sm text-white"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                >
                  {item}
                  {!isSpinning && (
                    <button
                      onClick={() => removeItem(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-white/20"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              ))}
              {items.length < 8 && !isSpinning && (
                <div className="flex gap-1">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addItem()}
                    placeholder="추가"
                    className="h-8 w-24 text-sm"
                    maxLength={20}
                  />
                  <Button 
                    onClick={addItem} 
                    disabled={!inputValue.trim()}
                    size="sm"
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            <AnimatePresence>
              {result && !isSpinning && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 rounded-xl bg-slate-50 p-4 text-center"
                >
                  <p className="mb-1 text-sm text-slate-500">결과</p>
                  <p className="text-2xl font-bold text-slate-900">{result}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex gap-3">
              <Button
                onClick={spin}
                disabled={isSpinning}
                size="lg"
                className="flex-1"
              >
                {isSpinning ? (
                  <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Play className="mr-2 h-5 w-5" />
                )}
                {isSpinning ? "돌아가는 중..." : result ? "다시 돌리기" : "돌리기"}
              </Button>
              {!isSpinning && (
                <Button onClick={reset} size="lg" variant="outline">
                  초기화
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
