"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, ListOrdered, RefreshCw, Shuffle } from "lucide-react";

export function OrderPicker() {
  const [members, setMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [orderedList, setOrderedList] = useState<string[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const addMember = () => {
    if (inputValue.trim() && !members.includes(inputValue.trim())) {
      setMembers([...members, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    setOrderedList([]);
  };

  const shuffle = () => {
    if (members.length < 2 || isShuffling) return;
    
    setIsShuffling(true);
    setOrderedList([]);
    
    setTimeout(() => {
      const shuffled = [...members].sort(() => Math.random() - 0.5);
      setOrderedList(shuffled);
      setIsShuffling(false);
    }, 800);
  };

  const reset = () => {
    setOrderedList([]);
  };

  const getMedalEmoji = (index: number) => {
    if (index === 0) return "🥇";
    if (index === 1) return "🥈";
    if (index === 2) return "🥉";
    return `${index + 1}`;
  };

  const isReady = members.length >= 2;

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900 dark:text-white">순서 정하기</h1>
        <p className="text-slate-500 dark:text-slate-400">발표순서, 줄세우기 한 번에</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {orderedList.length === 0 ? (
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
                  <p className="text-sm text-slate-400">참가자를 추가해주세요 (최소 2명)</p>
                )}
              </div>
            </div>

            <Button
              onClick={shuffle}
              disabled={!isReady || isShuffling}
              size="lg"
              className="w-full"
            >
              {isShuffling ? (
                <Shuffle className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <ListOrdered className="mr-2 h-5 w-5" />
              )}
              {isShuffling ? "섞는 중..." : "순서 정하기"}
            </Button>
          </>
        ) : (
          <>
            <div className="mb-6">
              <p className="mb-4 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
                순서가 정해졌습니다!
              </p>
              <div className="space-y-2">
                {orderedList.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`flex items-center gap-3 rounded-xl p-4 ${
                      index === 0
                        ? "bg-amber-50 dark:bg-amber-900/20"
                        : index === 1
                        ? "bg-slate-100 dark:bg-slate-800"
                        : index === 2
                        ? "bg-orange-50 dark:bg-orange-900/20"
                        : "bg-slate-50 dark:bg-slate-800/50"
                    }`}
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg font-bold shadow-sm dark:bg-slate-700">
                      {getMedalEmoji(index)}
                    </span>
                    <span className="text-lg font-medium text-slate-900 dark:text-white">
                      {member}
                    </span>
                    {index === 0 && (
                      <span className="ml-auto rounded-full bg-amber-500 px-2 py-0.5 text-xs font-bold text-white">
                        1등
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={shuffle} size="lg" className="flex-1">
                <RefreshCw className="mr-2 h-5 w-5" />
                다시 섞기
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
