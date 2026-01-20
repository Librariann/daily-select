import { Metadata } from "next";
import { TeamDivider } from "@/components/features/TeamDivider";

export const metadata: Metadata = {
  title: "팀 나누기 - 골라줘",
  description: "랜덤으로 공정하게 팀을 나눠드립니다. 체육, 회식, 게임 팀 구성에 딱!",
};

export default function TeamPage() {
  return <TeamDivider />;
}
