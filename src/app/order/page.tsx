import { Metadata } from "next";
import { OrderPicker } from "@/components/features/OrderPicker";

export const metadata: Metadata = {
  title: "순서 정하기 - 골라줘",
  description: "발표순서, 줄세우기를 랜덤으로 공정하게 정해드립니다.",
};

export default function OrderPage() {
  return <OrderPicker />;
}
