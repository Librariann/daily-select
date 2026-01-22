import { Metadata } from "next";
import { TeamDivider } from "@/components/features/TeamDivider";

export const metadata: Metadata = {
  title: "팀 나누기",
  description: "랜덤으로 공정하게 팀을 나눠드립니다! 체육, 회식, 게임, 프로젝트 팀 구성에 딱! 편향 없는 팀 배정",
  keywords: ["팀 나누기", "팀 구성", "랜덤 팀", "공정한 배정", "체육", "게임", "프로젝트", "팀 배정"],
  openGraph: {
    title: "팀 나누기 - 골라줘",
    description: "랜덤으로 공정하게 팀을 나눠드립니다. 체육, 회식, 게임 팀 구성에 딱!",
    url: "https://daily-select.com/team",
  },
  alternates: {
    canonical: "https://daily-select.com/team",
  },
};

export default function TeamPage() {
  return <TeamDivider />;
}
