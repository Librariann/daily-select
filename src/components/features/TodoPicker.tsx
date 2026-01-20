"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, Plus, X, Sparkles, CheckCircle2 } from "lucide-react";
import { defaultTodos } from "@/lib/data/menus";

export function TodoPicker() {
  const [todos, setTodos] = useState<string[]>([...defaultTodos]);
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayTodo, setDisplayTodo] = useState("");

  const addTodo = () => {
    if (inputValue.trim() && !todos.includes(inputValue.trim())) {
      setTodos([...todos, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeTodo = (index: number) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const pickRandom = useCallback(() => {
    if (todos.length === 0 || isSpinning) return;
    
    setIsSpinning(true);
    setResult(null);

    let count = 0;
    const totalSpins = 15;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * todos.length);
      setDisplayTodo(todos[randomIndex]);
      count++;

      if (count >= totalSpins) {
        clearInterval(interval);
        const finalIndex = Math.floor(Math.random() * todos.length);
        const finalChoice = todos[finalIndex];
        setDisplayTodo(finalChoice);
        setResult(finalChoice);
        setIsSpinning(false);
      }
    }, 100);
  }, [isSpinning, todos]);

  const resetToDefault = () => {
    setTodos([...defaultTodos]);
    setResult(null);
  };

  return (
    <div className="mx-auto max-w-lg px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">오늘 할 일 뽑기</h1>
        <p className="text-slate-500">뭐부터 할지 고민될 때</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            할 일 목록 ({todos.length}개)
          </label>
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addTodo()}
              placeholder="할 일 추가"
              maxLength={30}
            />
            <Button onClick={addTodo} disabled={!inputValue.trim()}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-3 flex max-h-32 flex-wrap gap-2 overflow-y-auto">
            {todos.map((todo, index) => (
              <div
                key={index}
                className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700"
              >
                {todo}
                <button
                  onClick={() => removeTodo(index)}
                  className="ml-1 rounded-full p-0.5 hover:bg-slate-200"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
          </div>
          {todos.length === 0 && (
            <p className="mt-2 text-center text-sm text-slate-400">
              할 일을 추가하거나{" "}
              <button
                onClick={resetToDefault}
                className="text-indigo-500 hover:underline"
              >
                기본 목록 불러오기
              </button>
            </p>
          )}
        </div>

        <div className="mb-6 flex min-h-[120px] items-center justify-center">
          <AnimatePresence mode="wait">
            {!result && !isSpinning && (
              <motion.div
                key="placeholder"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-500">
                  <Sparkles className="h-8 w-8" />
                </div>
                <p className="text-slate-400">버튼을 눌러 할 일을 뽑아보세요</p>
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
                  key={displayTodo}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-2xl font-bold text-slate-900"
                >
                  {displayTodo}
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
                  className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-green-50 text-green-500"
                >
                  <CheckCircle2 className="h-10 w-10" />
                </motion.div>
                <p className="mb-2 text-sm font-medium text-slate-500">
                  지금 바로 해야 할 일
                </p>
                <p className="text-3xl font-bold text-slate-900">{result}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={pickRandom}
            disabled={todos.length === 0 || isSpinning}
            size="lg"
            className="flex-1"
          >
            {isSpinning ? (
              <RefreshCw className="mr-2 h-5 w-5 animate-spin" />
            ) : result ? (
              <RefreshCw className="mr-2 h-5 w-5" />
            ) : (
              <Sparkles className="mr-2 h-5 w-5" />
            )}
            {isSpinning ? "고르는 중..." : result ? "다시 뽑기" : "할 일 뽑기"}
          </Button>
          {todos.length > 0 && todos !== defaultTodos && (
            <Button onClick={resetToDefault} size="lg" variant="outline">
              초기화
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
