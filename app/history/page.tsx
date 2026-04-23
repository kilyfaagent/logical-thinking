"use client";

import { useRouter } from "next/navigation";
import { Trash2, ExternalLink, Calendar, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

export default function HistoryPage() {
  const router = useRouter();
  const { history, deleteWorkout, loadWorkout } = useAppStore();

  function handleOpen(entry: (typeof history)[number]) {
    loadWorkout(entry);
    router.push("/workout");
  }

  function handleDelete(id: string) {
    deleteWorkout(id);
    toast.success("Latihan dihapus");
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold tracking-tight">
        Riwayat Latihan
      </h1>

      {history.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-muted-foreground">
            Belum ada riwayat latihan. Mulai latihan pertamamu dari Dashboard!
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => (
            <Card key={entry.id} className="transition-shadow hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString("id-ID", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <CardTitle className="text-sm font-medium leading-snug">
                      {entry.prompt}
                    </CardTitle>
                  </div>
                  {entry.score !== undefined && (
                    <Badge
                      variant={
                        entry.score >= 70
                          ? "default"
                          : entry.score >= 40
                          ? "secondary"
                          : "destructive"
                      }
                      className="flex items-center gap-1"
                    >
                      <Award className="h-3 w-3" />
                      {entry.score}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>
                    {entry.tree.nodes.length} nodes &bull;{" "}
                    {entry.tree.edges.length} edges
                  </span>
                  {entry.hypothesis && (
                    <>
                      <span>&bull;</span>
                      <span className="truncate max-w-[200px]">
                        H: {entry.hypothesis}
                      </span>
                    </>
                  )}
                </div>
                <div className="mt-3 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpen(entry)}
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    Buka
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(entry.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="mr-1 h-3 w-3" />
                    Hapus
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
