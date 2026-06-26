"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Heart,
  Download,
  Share2,
  ArrowLeft,
  Tag,
  User,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { creativeItems } from "@/data/mock";
import { formatNumber } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

export default function ItemDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();
  const [activeTab, setActiveTab] = useState<"preview" | "prompt" | "info">(
    "preview"
  );

  const item = creativeItems.find((i) => i.id === id);
  const isFavorite = item ? favorites.includes(item.id) : false;

  const relatedItems = creativeItems
    .filter((i) => i.id !== id && i.category === item?.category)
    .slice(0, 4);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h2 className="text-xl font-semibold">作品不存在</h2>
        <p className="mt-2 text-muted-foreground">
          你访问的作品可能已被删除或不存在
        </p>
        <Button className="mt-6" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        className="gap-2"
        onClick={() => router.back()}
      >
        <ArrowLeft className="h-4 w-4" />
        返回
      </Button>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-2xl border bg-card"
          >
            <div className="flex border-b">
              {[
                { id: "preview", label: "预览" },
                { id: "prompt", label: "提示词" },
                { id: "info", label: "详情" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-b-2 border-primary text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="p-4">
              {activeTab === "preview" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="relative aspect-video overflow-hidden rounded-xl bg-muted"
                >
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </motion.div>
              )}

              {activeTab === "prompt" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="rounded-xl bg-muted p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium">生成提示词</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          navigator.clipboard.writeText(item.description)
                        }
                      >
                        复制
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {item.description}，高品质，详细，8K分辨率，专业摄影，电影级灯光，
                      精致的细节，构图精美，艺术风格...
                    </p>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium text-primary">
                      <Sparkles className="h-4 w-4" />
                      AI 优化建议
                    </div>
                    <p className="text-sm text-muted-foreground">
                      尝试添加更多细节描述，如具体的光线、角度、色彩风格等，可以获得更精准的生成效果。
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "info" && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">分类</p>
                      <p className="mt-1 font-medium">{item.category}</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">发布时间</p>
                      <p className="mt-1 font-medium">{item.createdAt}</p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">点赞数</p>
                      <p className="mt-1 font-medium">
                        {formatNumber(item.likes)}
                      </p>
                    </div>
                    <div className="rounded-xl bg-muted p-4">
                      <p className="text-sm text-muted-foreground">下载数</p>
                      <p className="mt-1 font-medium">
                        {formatNumber(item.downloads)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardContent className="p-6">
                <h1 className="text-xl font-bold">{item.title}</h1>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{item.author}</p>
                    <p className="text-xs text-muted-foreground">创作者</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      <Tag className="h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="lg">
                    <Download className="h-4 w-4" />
                    下载素材
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    size="lg"
                    onClick={() => toggleFavorite(item.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
                    />
                    {isFavorite ? "已收藏" : "收藏"}
                  </Button>
                  <Button variant="outline" className="w-full" size="lg">
                    <Share2 className="h-4 w-4" />
                    分享
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {relatedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="mb-4 font-semibold">相关推荐</h3>
              <div className="grid grid-cols-2 gap-3">
                {relatedItems.map((related) => (
                  <a
                    key={related.id}
                    href={`/item/${related.id}`}
                    className="group overflow-hidden rounded-lg border"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={related.thumbnail}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-2">
                      <p className="truncate text-xs font-medium">
                        {related.title}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
