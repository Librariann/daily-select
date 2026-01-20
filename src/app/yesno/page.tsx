import { Metadata } from "next";
import { YesNo } from "@/components/features/YesNo";

export const metadata: Metadata = {
  title: "Yes or No - 골라줘",
  description: "할까 말까 고민될 때, 동전 던지기로 결정하세요.",
};

export default function YesNoPage() {
  return <YesNo />;
}
