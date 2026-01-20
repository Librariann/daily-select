import { Metadata } from "next";
import { DrawLots } from "@/components/features/DrawLots";

export const metadata: Metadata = {
  title: "제비뽑기 - 골라줘",
  description: "당첨자를 공정하게 뽑아드립니다. 회식 계산, 벌칙 정하기에 딱!",
};

export default function DrawPage() {
  return <DrawLots />;
}
