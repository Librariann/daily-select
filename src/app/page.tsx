"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { 
  UtensilsCrossed, 
  Moon, 
  Scale, 
  CircleDot, 
  GitBranch, 
  ListChecks,
  ArrowRight,
  Circle,
  Hash,
  Users,
  Ticket,
  ListOrdered,
  Timer
} from "lucide-react";
import { ShareButton } from "@/components/ui/ShareButton";

const features = [
  {
    href: "/lunch",
    icon: UtensilsCrossed,
    title: "점심 뭐 먹지?",
    description: "오늘 점심 메뉴 고민 끝",
    color: "bg-orange-50 text-orange-500 dark:bg-orange-950 dark:text-orange-400",
    hoverColor: "hover:border-orange-200 dark:hover:border-orange-800",
  },
  {
    href: "/dinner",
    icon: Moon,
    title: "저녁 뭐 먹지?",
    description: "퇴근 후 메뉴 결정 끝",
    color: "bg-purple-50 text-purple-500 dark:bg-purple-950 dark:text-purple-400",
    hoverColor: "hover:border-purple-200 dark:hover:border-purple-800",
  },
  {
    href: "/yesno",
    icon: Circle,
    title: "Yes or No",
    description: "할까 말까? 동전이 결정",
    color: "bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-400",
    hoverColor: "hover:border-emerald-200 dark:hover:border-emerald-800",
  },
  {
    href: "/ab",
    icon: Scale,
    title: "A vs B",
    description: "둘 중 하나 골라드림",
    color: "bg-blue-50 text-blue-500 dark:bg-blue-950 dark:text-blue-400",
    hoverColor: "hover:border-blue-200 dark:hover:border-blue-800",
  },
  {
    href: "/number",
    icon: Hash,
    title: "숫자 뽑기",
    description: "로또, 순서, 번호 생성",
    color: "bg-indigo-50 text-indigo-500 dark:bg-indigo-950 dark:text-indigo-400",
    hoverColor: "hover:border-indigo-200 dark:hover:border-indigo-800",
  },
  {
    href: "/roulette",
    icon: CircleDot,
    title: "룰렛 돌리기",
    description: "운명의 룰렛을 돌려보세요",
    color: "bg-red-50 text-red-500 dark:bg-red-950 dark:text-red-400",
    hoverColor: "hover:border-red-200 dark:hover:border-red-800",
  },
  {
    href: "/ladder",
    icon: GitBranch,
    title: "사다리타기",
    description: "공정한 사다리 게임",
    color: "bg-green-50 text-green-500 dark:bg-green-950 dark:text-green-400",
    hoverColor: "hover:border-green-200 dark:hover:border-green-800",
  },
  {
    href: "/team",
    icon: Users,
    title: "팀 나누기",
    description: "랜덤으로 팀 배정",
    color: "bg-pink-50 text-pink-500 dark:bg-pink-950 dark:text-pink-400",
    hoverColor: "hover:border-pink-200 dark:hover:border-pink-800",
  },
  {
    href: "/draw",
    icon: Ticket,
    title: "제비뽑기",
    description: "당첨자를 공정하게 추첨",
    color: "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400",
    hoverColor: "hover:border-yellow-200 dark:hover:border-yellow-800",
  },
  {
    href: "/order",
    icon: ListOrdered,
    title: "순서 정하기",
    description: "발표순서, 줄세우기",
    color: "bg-cyan-50 text-cyan-500 dark:bg-cyan-950 dark:text-cyan-400",
    hoverColor: "hover:border-cyan-200 dark:hover:border-cyan-800",
  },
  {
    href: "/timer",
    icon: Timer,
    title: "타이머",
    description: "시간 제한이 필요할 때",
    color: "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
    hoverColor: "hover:border-slate-300 dark:hover:border-slate-600",
  },
  {
    href: "/todo",
    icon: ListChecks,
    title: "오늘 할 일 뽑기",
    description: "뭐부터 할지 정해드림",
    color: "bg-amber-50 text-amber-500 dark:bg-amber-950 dark:text-amber-400",
    hoverColor: "hover:border-amber-200 dark:hover:border-amber-800",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
          생각하기 귀찮을 때
          <br />
          <span className="text-indigo-500">그냥 누르세요</span>
        </h1>
        <p className="mb-6 text-lg text-slate-500 dark:text-slate-400">
          선택 장애 끝. 당신 대신 골라드립니다.
        </p>
        <ShareButton />
      </motion.div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {features.map((feature) => (
          <motion.div key={feature.href} variants={item}>
            <Link href={feature.href}>
              <div
                className={`group relative rounded-2xl border border-slate-100 bg-white p-5 transition-all duration-200 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 ${feature.hoverColor}`}
              >
                <div
                  className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h2 className="mb-1 text-base font-semibold text-slate-900 dark:text-white">
                  {feature.title}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{feature.description}</p>
                <div className="mt-3 flex items-center text-sm font-medium text-slate-400 transition-colors group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300">
                  시작하기
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
