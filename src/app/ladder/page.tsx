import { Metadata } from "next";
import { LadderGame } from "@/components/features/LadderGame";

export const metadata: Metadata = {
  title: "사다리타기 - 골라줘",
  description: "공정한 사다리타기 게임. 누가 어떤 결과를 받을지 사다리로 결정하세요.",
};

export default function LadderPage() {
  return <LadderGame />;
}
