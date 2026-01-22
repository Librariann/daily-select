import { Metadata } from "next";
import { DrawLots } from "@/components/features/DrawLots";

export const metadata: Metadata = {
  title: "제비뽑기",
  description: "당첨자를 공정하게 뽑아드립니다! 회식 계산, 벌칙 정하기, 추첨 이벤트에 딱! 온라인 제비뽑기",
  keywords: ["제비뽑기", "추첨", "당첨자", "벌칙", "회식", "랜덤 선택", "공정한 추첨", "온라인 추첨"],
  openGraph: {
    title: "제비뽑기 - 골라줘",
    description: "당첨자를 공정하게 뽑아드립니다. 회식 계산, 벌칙 정하기에 딱!",
    url: "https://daily-select.com/draw",
  },
  alternates: {
    canonical: "https://daily-select.com/draw",
  },
};

export default function DrawPage() {
  return <DrawLots />;
}
