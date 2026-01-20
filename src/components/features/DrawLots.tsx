"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Ticket, RefreshCw, Trophy, XCircle } from "lucide-react";

export function DrawLots() {
  const [members, setMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [winnerCount, setWinnerCount] = useState(1);
  const [winners, setWinners] = useState<string[]>([]);
  const [losers, setLosers] = useState<string[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const addMember = () => {
    if (inputValue.trim() && !members.includes(inputValue.trim())) {
      setMembers([...members, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    setShowResult(false);
  };

  const draw = () => {
    if (members.length < 2 || winnerCount >= members.length || isDrawing) return;
    
    setIsDrawing(true);
    setShowResult(false);
    setWinners([]);
    setLosers([]);
    
    setTimeout(() => {
      const shuffled = [...members].sort(() => Math.random() - 0.5);
      const newWinners = shuffled.slice(0, winnerCount);
      const newLosers = shuffled.slice(winnerCount);
      
      setWinners(newWinners);
      setLosers(newLosers);
      setShowResult(true);
      setIsDrawing(false);
    }, 1000);
  };

  const reset = () => {
    setShowResult(false);
    setWinners([]);
    setLosers([]);
  };

  const isReady = members.length >= 2 && winnerCount < members.length && winnerCount >= 1;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">제비뽑기</h1>
        <p className="text-slate-500 dark:text-slate-400">당첨자를 공정하게 뽑아드려요</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {!showResult ? (
          <>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                참가자 ({members.length}명)
              </label>
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addMember()}
                  placeholder="이름 입력 후 Enter"
                  maxLength={20}
                />
                <Button onClick={addMember} disabled={!inputValue.trim()}>
                  <Plus className="h-5 w-5" />
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {members.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    {member}
                    <button
                      onClick={() => removeMember(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                {members.length === 0 && (
                  <p className="text-sm text-slate-400">참가자를 추가해주세요</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                당첨자 수 ({members.length > 0 ? `최대 ${members.length - 1}명` : "참가자 먼저 추가"})
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setWinnerCount(Math.max(1, winnerCount - 1))}
                  disabled={winnerCount <= 1}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  -
                </button>
                <span className="w-12 text-center text-2xl font-bold text-slate-900 dark:text-white">
                  {winnerCount}
                </span>
                <button
                  onClick={() => setWinnerCount(Math.min(members.length - 1, winnerCount + 1))}
                  disabled={winnerCount >= members.length - 1 || members.length < 2}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-lg font-bold text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                >
                  +
                </button>
              </div>
            </div>

            <Button
              onClick={draw}
              disabled={!isReady || isDrawing}
              size="lg"
              className="w-full"
            >
              {isDrawing ? (
                <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Ticket className="mr-2 h-5 w-5" />
              )}
              {isDrawing ? "추첨 중..." : "제비 뽑기"}
            </Button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <div className="mb-4 rounded-xl bg-green-50 p-4 dark:bg-green-900/20">
                <div className="mb-2 flex items-center gap-2 text-green-700 dark:text-green-400">
                  <Trophy className="h-5 w-5" />
                  <span className="font-bold">당첨 ({winners.length}명)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {winners.map((winner, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-white shadow-sm"
                    >
                      🎉 {winner}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-4 dark:bg-slate-800">
                <div className="mb-2 flex items-center gap-2 text-slate-500 dark:text-slate-400">
                  <XCircle className="h-5 w-5" />
                  <span className="font-bold">꽝 ({losers.length}명)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {losers.map((loser, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: winners.length * 0.1 + index * 0.05 }}
                      className="rounded-full bg-slate-200 px-4 py-2 text-sm font-medium text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                    >
                      {loser}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={draw} size="lg" className="flex-1">
                <RefreshCw className="mr-2 h-5 w-5" />
                다시 뽑기
              </Button>
              <Button onClick={reset} size="lg" variant="outline" className="flex-1">
                처음부터
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
