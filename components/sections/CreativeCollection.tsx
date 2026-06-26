"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Download, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { creativeItems } from "@/data/mock";
import { formatNumber, cn } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

export function CreativeCollection() {
  const { toggleFavorite, isFavorite } = useFavorites();

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold md:text-2xl">创意集</h2>
        <Link
          href="/inspiration"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          更多灵感
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {creativeItems.slice(0, 5).map((item) => (
          <motion.div key={item.id} variants={itemVariants}>
            <Card className="group h-full overflow-hidden">
              <Link href={`/item/${item.id}`}>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-2 left-2 right-2 flex translate-y-2 items-center justify-between text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="flex items-center gap-3 text-xs">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleFavorite(item.id);
                        }}
                        className={cn(
                          "flex items-center gap-1 transition-colors",
                          isFavorite(item.id) ? "text-rose-400" : ""
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
                  </div>
                  <div className="absolute left-2 top-2">
                    <span className="rounded-full bg-white/90 px-2 py-0.5 text-xs font-medium text-muted-foreground backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>
                </div>
              </Link>
              <div className="p-3">
                <Link href={`/item/${item.id}`}>
                  <h3 className="truncate text-sm font-medium">{item.title}</h3>
                  <p className="mt-1 truncate text-xs text-muted-foreground">
                    by {item.author}
                  </p>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
