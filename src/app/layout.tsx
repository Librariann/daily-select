import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "골라줘 - 선택 대신 해드립니다",
  description: "점심 메뉴, 저녁 메뉴, A vs B 선택, 룰렛, 사다리타기까지. 생각하기 귀찮을 때 그냥 누르세요.",
  keywords: ["랜덤 선택", "점심 메뉴 추천", "저녁 메뉴 추천", "룰렛", "사다리타기", "A vs B", "결정장애"],
   verification: {
    google: "wZ_BcpDz76WaEP6acUfBokG6DooVizkL7-TpOXa6yYw",
  },
  openGraph: {
    title: "골라줘 - 선택 대신 해드립니다",
    description: "생각하기 귀찮을 때 그냥 누르는 사이트",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950`}
      >
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
