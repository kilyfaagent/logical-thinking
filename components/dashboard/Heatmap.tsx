"use client";

import { useMemo } from "react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Heatmap() {
  const history = useAppStore((s) => s.history);

  const days = useMemo(() => {
    const result: { date: string; count: number; label: string }[] = [];
    const today = new Date();
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toDateString();
      const count = history.filter(
        (h) => new Date(h.date).toDateString() === dateStr
      ).length;
      result.push({
        date: dateStr,
        count,
        label: d.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
      });
    }
    return result;
  }, [history]);

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-muted-foreground">
        Aktivitas 30 Hari Terakhir
      </h3>
      <div className="flex flex-wrap gap-1.5">
        {days.map((day) => (
          <Tooltip key={day.date}>
            <TooltipTrigger
              className={cn(
                "h-8 w-8 rounded-sm border transition-colors",
                day.count === 0
                  ? "bg-muted border-muted"
                  : day.count === 1
                  ? "bg-emerald-200 border-emerald-300"
                  : day.count === 2
                  ? "bg-emerald-400 border-emerald-500"
                  : "bg-emerald-600 border-emerald-700"
              )}
            />
            <TooltipContent>
              <p>
                {day.label}: {day.count} latihan
              </p>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
