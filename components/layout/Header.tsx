"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brain, History, LayoutDashboard, Flame } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/workout", label: "Latihan", icon: Brain },
  { href: "/history", label: "History", icon: History },
];

export default function Header() {
  const pathname = usePathname();
  const streak = useAppStore((s) => s.streak);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <Brain className="h-6 w-6 text-primary" />
          <span>HeliView Daily</span>
        </Link>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}

          {streak > 0 && (
            <div className="ml-3 flex items-center gap-1 rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-700">
              <Flame className="h-4 w-4" />
              {streak}
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
