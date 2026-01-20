import { Metadata } from "next";
import { Timer } from "@/components/features/Timer";

export const metadata: Metadata = {
  title: "타이머 - 골라줘",
  description: "간단한 카운트다운 타이머. 시간 제한이 필요할 때 사용하세요.",
};

export default function TimerPage() {
  return <Timer />;
}
