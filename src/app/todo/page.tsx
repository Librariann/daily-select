import { Metadata } from "next";
import { TodoPicker } from "@/components/features/TodoPicker";

export const metadata: Metadata = {
  title: "오늘 할 일 뽑기 - 골라줘",
  description: "뭐부터 할지 고민될 때, 랜덤으로 할 일을 뽑아드립니다.",
};

export default function TodoPage() {
  return <TodoPicker />;
}
