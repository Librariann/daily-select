import { Metadata } from "next";
import { Roulette } from "@/components/features/Roulette";

export const metadata: Metadata = {
  title: "룰렛 돌리기 - 골라줘",
  description: "나만의 룰렛을 만들어 돌려보세요. 운명의 선택을 룰렛에 맡기세요.",
};

export default function RoulettePage() {
  return <Roulette />;
}
