"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Heart, Download, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { creativeItems } from "@/data/mock";
import { formatNumber, cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import Link from "next/link";

interface CategoryPageProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  category: string;
}

export function CategoryPageTemplate({
  title,
  description,
  icon,
  iconBg,
  iconColor,
  category,
}: CategoryPageProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "popular" | "downloads">(
    "latest"
  );
  const { toggleFavorite, isFavorite } = useFavorites();

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    creativeItems.forEach((item) => {
      if (category === "all" || item.category === category) {
        item.tags.forEach((tag) => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [category]);

  const filteredItems = useMemo(() => {
    let items = creativeItems.filter(
      (item) => category === "all" || item.category === category
    );

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      items = items.filter(
        (item) =>
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          item.author.toLowerCase().includes(query)
      );
    }

    if (selectedTags.length > 0) {
      items = items.filter((item) =>
        selectedTags.some((tag) => item.tags.includes(tag))
      );
    }

    switch (sortBy) {
      case "popular":
        items = [...items].sort((a, b) => b.likes - a.likes);
        break;
      case "downloads":
        items = [...items].sort((a, b) => b.downloads - a.downloads);
        break;
      case "latest":
      default:
        items = [...items].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return items;
  }, [category, searchQuery, selectedTags, sortBy]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setSortBy("latest");
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-8"
      >
        <div className="flex items-start gap-4">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-xl",
              iconBg,
              iconColor
            )}
          >
            {icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
            <p className="mt-2 text-muted-foreground">{description}</p>
          </div>
        </div>
      </motion.div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 sm:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={`搜索${title}...`}
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as typeof sortBy)
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <option value="latest">最新发布</option>
              <option value="popular">最受欢迎</option>
              <option value="downloads">下载最多</option>
            </select>
            <div className="flex rounded-md border">
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "rounded-none rounded-l-md",
                  viewMode === "grid" && "bg-accent"
                )}
                onClick={() => setViewMode("grid")}
                title="网格视图"
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
                title="列表视图"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">
              标签筛选:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium transition-colors",
                  selectedTags.includes(tag)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {tag}
              </button>
            ))}
            {selectedTags.length > 0 && (
              <button
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                清除筛选
              </button>
            )}
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        共 {filteredItems.length} 个结果
        {(searchQuery || selectedTags.length > 0) && " （已筛选）"}
      </div>

      {filteredItems.length > 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={cn(
            "grid gap-4",
            viewMode === "grid"
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          )}
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="group h-full overflow-hidden">
                <Link href={`/item/${item.id}`}>
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
                    <div
                      className={cn("flex-1 p-4", viewMode === "grid" && "hidden")}
                    >
                      <h3 className="font-medium">{item.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className={cn("p-3", viewMode === "list" && "hidden")}>
                  <Link href={`/item/${item.id}`}>
                    <h3 className="truncate text-sm font-medium">
                      {item.title}
                    </h3>
                    <p className="mt-1 truncate text-xs text-muted-foreground">
                      by {item.author}
                    </p>
                  </Link>
                </div>
                <div className="flex items-center justify-between border-t px-3 py-2 text-xs text-muted-foreground">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                    className={cn(
                      "flex items-center gap-1 transition-colors",
                      isFavorite(item.id)
                        ? "text-rose-500"
                        : "hover:text-rose-500"
                    )}
                  >
                    <Heart
                      className={cn(
                        "h-3.5 w-3.5",
                        isFavorite(item.id) && "fill-current"
                      )}
                    />
                    {formatNumber(item.likes)}
                  </button>
                  <span className="flex items-center gap-1">
                    <Download className="h-3.5 w-3.5" />
                    {formatNumber(item.downloads)}
                  </span>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-16 text-center"
        >
          <Search className="mb-4 h-12 w-12 text-muted-foreground/50" />
          <h3 className="text-lg font-semibold">未找到相关内容</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            尝试调整搜索关键词或筛选条件
          </p>
          <Button variant="outline" className="mt-6" onClick={clearFilters}>
            清除筛选条件
          </Button>
        </motion.div>
      )}
    </div>
  );
}
