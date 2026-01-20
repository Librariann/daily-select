import { Metadata } from "next";
import { ABSelector } from "@/components/features/ABSelector";

export const metadata: Metadata = {
  title: "A vs B 선택기 - 골라줘",
  description: "둘 중 하나 고민될 때, 랜덤으로 골라드립니다.",
};

export default function ABPage() {
  return <ABSelector />;
}
