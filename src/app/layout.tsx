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
  metadataBase: new URL('https://daily-select.com'),
  title: {
    default: "골라줘 - 선택 대신 해드립니다",
    template: "%s | 골라줘"
  },
  description: "점심 메뉴, 저녁 메뉴, A vs B 선택, 룰렛, 사다리타기까지. 생각하기 귀찮을 때 그냥 누르세요. 선택 장애 해결사.",
  keywords: [
    "랜덤 선택", "점심 메뉴 추천", "저녁 메뉴 추천", "룰렛", "사다리타기", 
    "A vs B", "결정장애", "선택장애", "메뉴 추천", "랜덤", "골라줘",
    "Yes or No", "제비뽑기", "팀 나누기", "순서 정하기", "타이머"
  ],
  authors: [{ name: "골라줘팀" }],
  creator: "골라줘",
  publisher: "골라줘",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "wZ_BcpDz76WaEP6acUfBokG6DooVizkL7-TpOXa6yYw",
  },
  other: {
    "google-adsense-account": "ca-pub-9234827645030095",
  },
  openGraph: {
    title: "골라줘 - 선택 대신 해드립니다",
    description: "점심 메뉴, 저녁 메뉴, 룰렛, 사다리타기까지. 생각하기 귀찮을 때 그냥 누르세요.",
    type: "website",
    locale: "ko_KR",
    url: "https://daily-select.com",
    siteName: "골라줘",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "골라줘 - 선택 대신 해드립니다"
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "골라줘 - 선택 대신 해드립니다",
    description: "생각하기 귀찮을 때 그냥 누르는 사이트",
    creator: "@daily_select",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://daily-select.com",
  },
  category: "utility",
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
