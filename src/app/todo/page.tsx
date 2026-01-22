import { Metadata } from "next";
import { TodoPicker } from "@/components/features/TodoPicker";

export const metadata: Metadata = {
  title: "오늘 할 일 뽑기",
  description: "뭐부터 할지 고민될 때, 랜덤으로 할 일을 뽑아드립니다! 우선순위 정하기, 업무 순서 정하기에 최적화",
  keywords: ["할 일 뽑기", "우선순위", "업무 순서", "랜덤 선택", "생산성", "일정 관리", "태스크", "투두"],
  openGraph: {
    title: "오늘 할 일 뽑기 - 골라줘",
    description: "뭐부터 할지 고민될 때, 랜덤으로 할 일을 뽑아드립니다.",
    url: "https://daily-select.com/todo",
  },
  alternates: {
    canonical: "https://daily-select.com/todo",
  },
};

export default function TodoPage() {
  return <TodoPicker />;
}
