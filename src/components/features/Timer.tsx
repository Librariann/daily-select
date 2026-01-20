"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, Bell } from "lucide-react";

const PRESETS = [
  { label: "30초", seconds: 30 },
  { label: "1분", seconds: 60 },
  { label: "3분", seconds: 180 },
  { label: "5분", seconds: 300 },
  { label: "10분", seconds: 600 },
  { label: "15분", seconds: 900 },
];

export function Timer() {
  const [totalSeconds, setTotalSeconds] = useState(60);
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;

  const start = useCallback(() => {
    if (remainingSeconds <= 0) return;
    setIsRunning(true);
    setIsFinished(false);
  }, [remainingSeconds]);

  const pause = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setIsRunning(false);
    setIsFinished(false);
    setRemainingSeconds(totalSeconds);
  };

  const setPreset = (seconds: number) => {
    setTotalSeconds(seconds);
    setRemainingSeconds(seconds);
    setIsRunning(false);
    setIsFinished(false);
  };

  const adjustTime = (delta: number) => {
    const newTotal = Math.max(10, Math.min(3600, totalSeconds + delta));
    setTotalSeconds(newTotal);
    if (!isRunning) {
      setRemainingSeconds(newTotal);
    }
  };

  useEffect(() => {
    if (isRunning && remainingSeconds > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, remainingSeconds]);

  useEffect(() => {
    if (isFinished) {
      try {
        const audio = new Audio("data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onp+dlIZyX1RdZ3eCjpSVkYV4altXXGRwiZGZmpOIe25hWFpgboWQmZqVi350ZV1cYW2Bj5mZlIt/c2VcXGBtgI+ZmpWLf3RmXVxhboGQmZqVi390Zl1cYW6BkJmZlYt/dGZdXGFugZCZmZWLf3RmXlxhboGQmZmVi390Zl5cYW6BkJmZlYt/dGZeXGFugZCZmZWLf3RmXlxhboGQmZmVi390Zl5cYW6BkJmZlYt/dGZeXGFugZCZmZWLf3RmXlxhboGQmZmVi390Zl5cYW6BkJmZlYt/dGZeXGFu");
        audio.play().catch(() => {});
      } catch {
        // Audio not supported
      }
    }
  }, [isFinished]);

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">타이머</h1>
        <p className="text-slate-500 dark:text-slate-400">시간 제한이 필요할 때</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <p className="mb-3 text-center text-sm font-medium text-slate-500 dark:text-slate-400">빠른 설정</p>
          <div className="flex flex-wrap justify-center gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.seconds}
                onClick={() => setPreset(preset.seconds)}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  totalSeconds === preset.seconds && !isRunning
                    ? "bg-indigo-500 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative mb-8 flex justify-center">
          <div className="relative">
            <svg className="h-48 w-48 -rotate-90 transform">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                className="text-slate-100 dark:text-slate-800"
              />
              <motion.circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                className={isFinished ? "text-red-500" : "text-indigo-500"}
                strokeDasharray={553}
                animate={{ strokeDashoffset: 553 - (553 * progress) / 100 }}
                transition={{ duration: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span
                key={remainingSeconds}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                className={`text-5xl font-bold ${
                  isFinished 
                    ? "text-red-500" 
                    : remainingSeconds <= 10 && isRunning
                    ? "text-amber-500"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                {formatTime(remainingSeconds)}
              </motion.span>
              {isFinished && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 flex items-center gap-1 text-red-500"
                >
                  <Bell className="h-4 w-4" />
                  <span className="text-sm font-medium">시간 종료!</span>
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {!isRunning && !isFinished && (
          <div className="mb-6 flex items-center justify-center gap-4">
            <button
              onClick={() => adjustTime(-10)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              -
            </button>
            <span className="text-sm text-slate-500 dark:text-slate-400">10초씩 조절</span>
            <button
              onClick={() => adjustTime(10)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            >
              +
            </button>
          </div>
        )}

        <div className="flex gap-3">
          {!isRunning ? (
            <Button
              onClick={isFinished ? reset : start}
              size="lg"
              className="flex-1"
              disabled={remainingSeconds <= 0 && !isFinished}
            >
              {isFinished ? (
                <>
                  <RotateCcw className="mr-2 h-5 w-5" />
                  다시 시작
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  시작
                </>
              )}
            </Button>
          ) : (
            <Button onClick={pause} size="lg" variant="secondary" className="flex-1">
              <Pause className="mr-2 h-5 w-5" />
              일시정지
            </Button>
          )}
          {(isRunning || remainingSeconds !== totalSeconds) && (
            <Button onClick={reset} size="lg" variant="outline">
              <RotateCcw className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
