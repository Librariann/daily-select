import { Metadata } from "next";
import { YesNo } from "@/components/features/YesNo";

export const metadata: Metadata = {
  title: "Yes or No 동전 던지기",
  description: "할까 말까 고민될 때, 동전 던지기로 결정하세요. 간단한 결정부터 중요한 선택까지 공정하게 결정!",
  keywords: ["Yes or No", "동전 던지기", "결정", "선택", "랜덤", "고민", "의사결정"],
  openGraph: {
    title: "Yes or No 동전 던지기 - 골라줘",
    description: "할까 말까 고민될 때, 동전 던지기로 결정하세요.",
    url: "https://chooseforme.space/yesno",
  },
  alternates: {
    canonical: "https://chooseforme.space/yesno",
  },
};

export default function YesNoPage() {
  return <YesNo />;
}
