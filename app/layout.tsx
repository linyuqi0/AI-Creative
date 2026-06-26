import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI创意素材 - 一站式AI创意素材平台",
  description:
    "AI创意素材平台，提供海量AI生成素材、提示词模板、灵感图库、表情包工厂、数字人视频生成、音乐生成器等功能。",
  keywords: ["AI素材", "AI创意", "提示词", "表情包", "AI视频", "AI音乐", "灵感图库"],
  authors: [{ name: "AI Creative Studio" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://linyuqi0.github.io/AI-Creative/",
    title: "AI创意素材 - 一站式AI创意素材平台",
    description:
      "AI创意素材平台，提供海量AI生成素材、提示词模板、灵感图库、表情包工厂、数字人视频生成、音乐生成器等功能。",
    siteName: "AI创意素材",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI创意素材 - 一站式AI创意素材平台",
    description:
      "AI创意素材平台，提供海量AI生成素材、提示词模板、灵感图库、表情包工厂、数字人视频生成、音乐生成器等功能。",
  },
  manifest: "/manifest.json",
  themeColor: "#7c3aed",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className={inter.className}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-1 flex-col">
            <Header />
            <main className="flex-1 p-4 md:p-6 lg:p-8">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
