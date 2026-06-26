import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppLayout } from "@/components/layout/AppLayout";

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
        <AppLayout>{children}</AppLayout>
      </body>
    </html>
  );
}
