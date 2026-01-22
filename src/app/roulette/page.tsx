import { Metadata } from "next";
import { Roulette } from "@/components/features/Roulette";

export const metadata: Metadata = {
  title: "룰렛 돌리기",
  description: "나만의 룰렛을 만들어 돌려보세요! 운명의 선택을 룰렛에 맡기고 랜덤하게 결정하세요. 온라인 룰렛 게임",
  keywords: ["룰렛", "룰렛 돌리기", "랜덤 선택", "운명", "선택", "결정", "온라인 룰렛", "랜덤 게임"],
  openGraph: {
    title: "룰렛 돌리기 - 골라줘",
    description: "나만의 룰렛을 만들어 돌려보세요. 운명의 선택을 룰렛에 맡기세요.",
    url: "https://daily-select.com/roulette",
  },
  alternates: {
    canonical: "https://daily-select.com/roulette",
  },
};

export default function RoulettePage() {
  return <Roulette />;
}
