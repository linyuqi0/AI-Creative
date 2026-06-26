"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Grid, List, Heart, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { creativeItems } from "@/data/mock";
import { formatNumber } from "@/lib/utils";
import { cn } from "@/lib/utils";

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

  const filteredItems = creativeItems.filter(
    (item) => item.category === category || category === "all"
  );

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

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 sm:max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder={`搜索${title}...`} className="pl-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            筛选
          </Button>
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
      </div>

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
                  <Heart className="h-3.5 w-3.5" />
                  {formatNumber(item.likes)}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3.5 w-3.5" />
                  {formatNumber(item.downloads)}
                </span>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
