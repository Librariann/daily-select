import { Metadata } from "next";
import { Timer } from "@/components/features/Timer";

export const metadata: Metadata = {
  title: "타이머",
  description: "간단한 카운트다운 타이머! 프레젠테이션, 게임, 요리할 때 시간 제한이 필요할 때 사용하세요. 온라인 타이머",
  keywords: ["타이머", "카운트다운", "시간 제한", "온라인 타이머", "프레젠테이션", "게임", "요리", "스탑워치"],
  openGraph: {
    title: "타이머 - 골라줘",
    description: "간단한 카운트다운 타이머. 시간 제한이 필요할 때 사용하세요.",
    url: "https://daily-select.com/timer",
  },
  alternates: {
    canonical: "https://daily-select.com/timer",
  },
};

export default function TimerPage() {
  return <Timer />;
}
