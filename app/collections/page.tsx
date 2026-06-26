"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, Grid, List, Download, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { creativeItems } from "@/data/mock";
import { formatNumber, cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

export default function CollectionsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { favorites, removeFavorite } = useFavorites();

  const favoriteItems = creativeItems.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-rose-50 to-pink-50 p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-rose-100 text-rose-600">
            <Heart className="h-7 w-7 fill-current" />
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">我的收藏</h1>
            <p className="mt-2 text-muted-foreground">
              收藏你喜欢的创意作品，随时查看和下载。共收藏 {favoriteItems.length} 个作品
            </p>
          </div>
        </div>
      </motion.div>

      {favoriteItems.length > 0 ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              共 {favoriteItems.length} 个收藏
            </p>
            <div className="flex rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none rounded-l-md",
                  viewMode === "grid" && "bg-accent"
                )}
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none rounded-r-md",
                  viewMode === "list" && "bg-accent"
                )}
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "grid gap-4",
              viewMode === "grid"
                ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-1"
            )}
          >
            {favoriteItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group h-full overflow-hidden">
                  <div
                    className={cn(
                      "overflow-hidden",
                      viewMode === "list" ? "flex" : "aspect-[4/3]"
                    )}
                  >
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={cn(
                        "object-cover transition-transform duration-300 group-hover:scale-105",
                        viewMode === "list"
                          ? "h-32 w-48 flex-shrink-0"
                          : "h-full w-full"
                      )}
                      loading="lazy"
                    />
                    <div className={cn("flex-1 p-4", viewMode === "grid" && "hidden")}>
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <div className={cn("p-3", viewMode === "list" && "hidden")}>
                    <h3 className="truncate text-sm font-medium">{item.title}</h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      by {item.author}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                      {formatNumber(item.likes)}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => removeFavorite(item.id)}
                        className="text-muted-foreground transition-colors hover:text-destructive"
                        title="取消收藏"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                      <span className="flex items-center gap-1">
                        <Download className="h-3.5 w-3.5" />
                        {formatNumber(item.downloads)}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-16 text-center"
        >
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Heart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">暂无收藏</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            浏览创意作品，点击心形图标收藏你喜欢的内容
          </p>
          <Button className="mt-6" asChild>
            <a href="/materials">去发现作品</a>
          </Button>
        </motion.div>
      )}
    </div>
  );
}
