import { Metadata } from "next";
import { NumberPicker } from "@/components/features/NumberPicker";

export const metadata: Metadata = {
  title: "숫자 뽑기 - 골라줘",
  description: "로또 번호, 랜덤 숫자, 순서 정하기. 원하는 범위에서 숫자를 뽑아보세요.",
};

export default function NumberPage() {
  return <NumberPicker />;
}
