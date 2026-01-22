import { Metadata } from "next";
import { MenuPicker } from "@/components/features/MenuPicker";
import { lunchMenus } from "@/lib/data/menus";

export const metadata: Metadata = {
  title: "점심 메뉴 추천",
  description: "오늘 점심 뭐 먹지? 한식, 중식, 일식, 양식 등 다양한 점심 메뉴를 랜덤으로 추천해드립니다. 점심 고민 끝!",
  keywords: ["점심 메뉴", "점심 추천", "메뉴 추천", "랜덤 메뉴", "점심 고민", "오늘 점심"],
  openGraph: {
    title: "점심 메뉴 추천 - 골라줘",
    description: "오늘 점심 뭐 먹지? 랜덤으로 점심 메뉴를 추천해드립니다.",
    url: "https://chooseforme.space/lunch",
  },
  alternates: {
    canonical: "https://chooseforme.space/lunch",
  },
};

export default function LunchPage() {
  return (
    <MenuPicker
      menus={lunchMenus}
      title="점심 뭐 먹지?"
      subtitle="버튼 하나로 점심 메뉴 고민 끝"
      accentColor="bg-orange-50 text-orange-500"
    />
  );
}
