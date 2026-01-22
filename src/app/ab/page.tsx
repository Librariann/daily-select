import { Metadata } from "next";
import { ABSelector } from "@/components/features/ABSelector";

export const metadata: Metadata = {
  title: "A vs B 선택기",
  description: "둘 중 하나 고민될 때, A와 B 중에서 랜덤으로 골라드립니다. 공정한 선택, 빠른 결정!",
  keywords: ["A vs B", "선택기", "둘 중 하나", "랜덤 선택", "결정장애", "고민", "선택", "결정"],
  openGraph: {
    title: "A vs B 선택기 - 골라줘",
    description: "둘 중 하나 고민될 때, 랜덤으로 골라드립니다.",
    url: "https://daily-select.com/ab",
  },
  alternates: {
    canonical: "https://daily-select.com/ab",
  },
};

export default function ABPage() {
  return <ABSelector />;
}
