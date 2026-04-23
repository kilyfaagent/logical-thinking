"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw, Save, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import IssueTree from "@/components/tree/IssueTree";
import Toolbar from "@/components/tree/Toolbar";
import AIFeedbackPanel from "@/components/feedback/AIFeedbackPanel";
import { useAppStore } from "@/lib/store";
import { getRandomPrompt } from "@/lib/prompts";
import { toast } from "sonner";

export default function WorkoutPage() {
  const router = useRouter();
  const {
    currentPrompt,
    hypothesis,
    setHypothesis,
    startWorkout,
    saveWorkout,
  } = useAppStore();

  useEffect(() => {
    if (!currentPrompt) {
      router.replace("/");
    }
  }, [currentPrompt, router]);

  if (!currentPrompt) return null;

  function handleChangePrompt() {
    const newPrompt = getRandomPrompt(currentPrompt!.id);
    startWorkout(newPrompt);
  }

  function handleSave() {
    saveWorkout();
    toast.success("Latihan tersimpan!");
  }

  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col lg:flex-row">
      {/* Left Panel */}
      <div className="w-full border-r lg:w-80">
        <ScrollArea className="h-full">
          <div className="space-y-4 p-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/")}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Dashboard
            </Button>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Problem Statement</CardTitle>
                  <Badge variant="secondary" className="text-[10px]">
                    {currentPrompt.category}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {currentPrompt.text}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-3"
                  onClick={handleChangePrompt}
                >
                  <RefreshCw className="mr-1 h-3 w-3" />
                  Ganti Prompt
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Hypothesis</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Tulis hipotesis awal kamu di sini..."
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  rows={4}
                  className="text-sm"
                />
              </CardContent>
            </Card>

            <Separator />

            <AIFeedbackPanel />

            <Button
              variant="outline"
              className="w-full"
              onClick={handleSave}
            >
              <Save className="mr-2 h-4 w-4" />
              Simpan Latihan
            </Button>
          </div>
        </ScrollArea>
      </div>

      {/* Center - Tree Canvas */}
      <div className="flex flex-1 flex-col">
        <div className="border-b px-4 py-2">
          <Toolbar />
        </div>
        <div className="flex-1">
          <IssueTree />
        </div>
      </div>
    </div>
  );
}
