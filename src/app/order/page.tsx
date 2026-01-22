import { Metadata } from "next";
import { OrderPicker } from "@/components/features/OrderPicker";

export const metadata: Metadata = {
  title: "순서 정하기",
  description: "발표순서, 줄세우기, 면접순서를 랜덤으로 공정하게 정해드립니다! 편향 없는 순서 배정으로 공평하게",
  keywords: ["순서 정하기", "발표순서", "줄세우기", "면접순서", "랜덤 순서", "공정한 배정", "순서 배정"],
  openGraph: {
    title: "순서 정하기 - 골라줘",
    description: "발표순서, 줄세우기를 랜덤으로 공정하게 정해드립니다.",
    url: "https://daily-select.com/order",
  },
  alternates: {
    canonical: "https://daily-select.com/order",
  },
};

export default function OrderPage() {
  return <OrderPicker />;
}
