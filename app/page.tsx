"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Brain, Flame, Target, TrendingUp, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Heatmap from "@/components/dashboard/Heatmap";
import { useAppStore } from "@/lib/store";
import { useDailyPrompt } from "@/hooks/useDailyPrompt";

export default function DashboardPage() {
  const router = useRouter();
  const dailyPrompt = useDailyPrompt();
  const { streak, history, startWorkout } = useAppStore();

  const totalWorkouts = history.length;
  const avgScore =
    history.filter((h) => h.score).length > 0
      ? Math.round(
          history.reduce((acc, h) => acc + (h.score ?? 0), 0) /
            history.filter((h) => h.score).length
        )
      : 0;

  function handleStart() {
    startWorkout(dailyPrompt);
    router.push("/workout");
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">HeliView Daily</h1>
        <p className="mt-2 text-muted-foreground">
          Personal gym untuk melatih Big 4 problem-solving setiap hari
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Streak</CardTitle>
            <Flame className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{streak} hari</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Total Latihan
            </CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWorkouts}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">
              Rata-rata Skor
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {avgScore > 0 ? avgScore : "-"}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="pt-6">
          <Heatmap />
        </CardContent>
      </Card>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Dumbbell className="h-5 w-5" />
            Prompt Hari Ini
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-1 text-xs font-semibold uppercase text-muted-foreground">
            {dailyPrompt.category}
          </p>
          <p className="mb-6 text-base leading-relaxed">
            {dailyPrompt.text}
          </p>
          <Button size="lg" className="w-full sm:w-auto" onClick={handleStart}>
            <Brain className="mr-2 h-5 w-5" />
            Mulai Latihan Hari Ini
          </Button>
        </CardContent>
      </Card>

      {history.length > 0 && (
        <div className="text-center">
          <Link
            href="/history"
            className="text-sm text-muted-foreground underline-offset-4 hover:underline"
          >
            Lihat semua riwayat latihan &rarr;
          </Link>
        </div>
      )}
    </div>
  );
}
