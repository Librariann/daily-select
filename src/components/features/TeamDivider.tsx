"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X, Users, RefreshCw, Shuffle } from "lucide-react";

const TEAM_COLORS = [
  "bg-red-100 text-red-700 border-red-200",
  "bg-blue-100 text-blue-700 border-blue-200",
  "bg-green-100 text-green-700 border-green-200",
  "bg-yellow-100 text-yellow-700 border-yellow-200",
  "bg-purple-100 text-purple-700 border-purple-200",
  "bg-pink-100 text-pink-700 border-pink-200",
  "bg-indigo-100 text-indigo-700 border-indigo-200",
  "bg-orange-100 text-orange-700 border-orange-200",
  "bg-teal-100 text-teal-700 border-teal-200",
  "bg-cyan-100 text-cyan-700 border-cyan-200",
];

const TEAM_NAMES = ["A팀", "B팀", "C팀", "D팀", "E팀", "F팀", "G팀", "H팀", "I팀", "J팀"];

export function TeamDivider() {
  const [members, setMembers] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [teamCount, setTeamCount] = useState(2);
  const [teams, setTeams] = useState<string[][]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const addMember = () => {
    if (inputValue.trim() && !members.includes(inputValue.trim())) {
      setMembers([...members, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeMember = (index: number) => {
    setMembers(members.filter((_, i) => i !== index));
    setTeams([]);
  };

  const divideTeams = () => {
    if (members.length < teamCount || isShuffling) return;
    
    setIsShuffling(true);
    setTeams([]);
    
    setTimeout(() => {
      const shuffled = [...members].sort(() => Math.random() - 0.5);
      const newTeams: string[][] = Array.from({ length: teamCount }, () => []);
      
      shuffled.forEach((member, index) => {
        newTeams[index % teamCount].push(member);
      });
      
      setTeams(newTeams);
      setIsShuffling(false);
    }, 800);
  };

  const reset = () => {
    setTeams([]);
  };

  const isReady = members.length >= teamCount && teamCount >= 2;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-slate-900">팀 나누기</h1>
        <p className="text-slate-500">랜덤으로 공정하게 팀을 나눠드려요</p>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-white p-8 shadow-sm">
        {teams.length === 0 ? (
          <>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700">
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
                    className="flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                  >
                    {member}
                    <button
                      onClick={() => removeMember(index)}
                      className="ml-1 rounded-full p-0.5 hover:bg-slate-200"
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
              <label className="mb-2 block text-sm font-medium text-slate-700">
                팀 개수
              </label>
              <div className="flex flex-wrap gap-2">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => setTeamCount(num)}
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                      teamCount === num
                        ? "bg-indigo-500 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {!isReady && members.length > 0 && (
              <p className="mb-4 text-center text-sm text-slate-500">
                {members.length < teamCount
                  ? `최소 ${teamCount}명이 필요합니다 (현재 ${members.length}명)`
                  : "팀을 나눌 준비가 되었습니다"}
              </p>
            )}

            <Button
              onClick={divideTeams}
              disabled={!isReady || isShuffling}
              size="lg"
              className="w-full"
            >
              {isShuffling ? (
                <Shuffle className="mr-2 h-5 w-5 animate-spin" />
              ) : (
                <Users className="mr-2 h-5 w-5" />
              )}
              {isShuffling ? "섞는 중..." : "팀 나누기"}
            </Button>
          </>
        ) : (
          <>
            <div className="mb-6 grid gap-4 sm:grid-cols-2">
              {teams.map((team, teamIndex) => (
                <motion.div
                  key={teamIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: teamIndex * 0.1 }}
                  className={`rounded-xl border-2 p-4 ${TEAM_COLORS[teamIndex]}`}
                >
                  <h3 className="mb-3 text-lg font-bold">
                    {TEAM_NAMES[teamIndex]} ({team.length}명)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {team.map((member, memberIndex) => (
                      <motion.span
                        key={memberIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: teamIndex * 0.1 + memberIndex * 0.05 }}
                        className="rounded-full bg-white/80 px-3 py-1 text-sm font-medium shadow-sm"
                      >
                        {member}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button onClick={divideTeams} size="lg" className="flex-1">
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
