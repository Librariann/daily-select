import { Metadata } from "next";
import { MenuPicker } from "@/components/features/MenuPicker";
import { dinnerMenus } from "@/lib/data/menus";

export const metadata: Metadata = {
  title: "저녁 메뉴 추천",
  description: "오늘 저녁 뭐 먹지? 퇴근 후 저녁 메뉴 고민을 한 번에 해결해드립니다. 다양한 저녁 메뉴 랜덤 추천!",
  keywords: ["저녁 메뉴", "저녁 추천", "메뉴 추천", "랜덤 메뉴", "저녁 고민", "오늘 저녁"],
  openGraph: {
    title: "저녁 메뉴 추천 - 골라줘",
    description: "오늘 저녁 뭐 먹지? 랜덤으로 저녁 메뉴를 추천해드립니다.",
    url: "https://chooseforme.space/dinner",
  },
  alternates: {
    canonical: "https://chooseforme.space/dinner",
  },
};

export default function DinnerPage() {
  return (
    <MenuPicker
      menus={dinnerMenus}
      title="저녁 뭐 먹지?"
      subtitle="퇴근 후 메뉴 고민은 이제 그만"
      accentColor="bg-purple-50 text-purple-500"
    />
  );
}
