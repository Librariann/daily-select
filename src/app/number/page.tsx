import { Metadata } from "next";
import { NumberPicker } from "@/components/features/NumberPicker";

export const metadata: Metadata = {
  title: "숫자 뽑기",
  description: "로또 번호, 랜덤 숫자, 순서 정하기까지! 원하는 범위에서 숫자를 랜덤으로 뽑아보세요. 번호 생성기",
  keywords: ["숫자 뽑기", "랜덤 숫자", "로또 번호", "번호 생성", "순서", "랜덤", "숫자 생성기", "번호"],
  openGraph: {
    title: "숫자 뽑기 - 골라줘",
    description: "로또 번호, 랜덤 숫자, 순서 정하기. 원하는 범위에서 숫자를 뽑아보세요.",
    url: "https://daily-select.com/number",
  },
  alternates: {
    canonical: "https://daily-select.com/number",
  },
};

export default function NumberPage() {
  return <NumberPicker />;
}
