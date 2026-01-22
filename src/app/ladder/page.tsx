import { Metadata } from "next";
import { LadderGame } from "@/components/features/LadderGame";

export const metadata: Metadata = {
  title: "사다리타기",
  description: "공정한 사다리타기 게임! 누가 어떤 결과를 받을지 사다리로 결정하세요. 온라인 사다리게임, 벌칙 정하기",
  keywords: ["사다리타기", "사다리게임", "벌칙", "온라인 사다리", "공정한 선택", "랜덤", "게임", "결정"],
  openGraph: {
    title: "사다리타기 - 골라줘",
    description: "공정한 사다리타기 게임. 누가 어떤 결과를 받을지 사다리로 결정하세요.",
    url: "https://daily-select.com/ladder",
  },
  alternates: {
    canonical: "https://daily-select.com/ladder",
  },
};

export default function LadderPage() {
  return <LadderGame />;
}
