"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Image,
  Sparkles,
  Lightbulb,
  Smile,
  Video,
  Music,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toolCards } from "@/data/mock";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ReactNode> = {
  Image: <Image className="h-6 w-6" />,
  Sparkles: <Sparkles className="h-6 w-6" />,
  Lightbulb: <Lightbulb className="h-6 w-6" />,
  Smile: <Smile className="h-6 w-6" />,
  Video: <Video className="h-6 w-6" />,
  Music: <Music className="h-6 w-6" />,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function ToolsSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
      <h2 className="text-xl font-bold md:text-2xl">今日推荐</h2>
        <Link
          href="/materials"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          查看全部
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {toolCards.map((tool, index) => (
          <motion.div key={tool.id} variants={item}>
            <Link href={tool.href}>
              <Card className="h-full cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardContent className="p-6">
                  <div
                    className={cn(
                      "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl",
                      tool.bgColor,
                      tool.color
                    )}
                  >
                    {iconMap[tool.icon]}
                  </div>
                  <h3 className="text-lg font-semibold">{tool.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tool.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">
                      {tool.stats.label}
                    </span>
                    <span className="text-sm font-semibold text-primary">
                      {tool.stats.value}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
