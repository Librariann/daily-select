import { Metadata } from "next";
import { MenuPicker } from "@/components/features/MenuPicker";
import { lunchMenus } from "@/lib/data/menus";

export const metadata: Metadata = {
  title: "점심 메뉴 추천 - 골라줘",
  description: "오늘 점심 뭐 먹지? 랜덤으로 점심 메뉴를 추천해드립니다.",
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
