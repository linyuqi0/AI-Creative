"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Image,
  Sparkles,
  Lightbulb,
  Smile,
  Video,
  Music,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/data/mock";

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="h-5 w-5" />,
  Image: <Image className="h-5 w-5" />,
  Sparkles: <Sparkles className="h-5 w-5" />,
  Lightbulb: <Lightbulb className="h-5 w-5" />,
  Smile: <Smile className="h-5 w-5" />,
  Video: <Video className="h-5 w-5" />,
  Music: <Music className="h-5 w-5" />,
  Heart: <Heart className="h-5 w-5" />,
};

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-64 flex-col border-r bg-sidebar md:flex">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg font-bold">AI创意素材</span>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname?.startsWith(item.href));
          return (
            <Link
              key={item.id}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              {iconMap[item.icon]}
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t p-4">
        <div className="rounded-lg bg-gradient-to-br from-primary/10 to-purple-500/10 p-4">
          <p className="text-sm font-medium">升级 Pro</p>
          <p className="mt-1 text-xs text-muted-foreground">
            解锁全部功能和素材
          </p>
          <button className="mt-3 w-full rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground hover:bg-primary/90">
            立即升级
          </button>
        </div>
      </div>
    </aside>
  );
}
