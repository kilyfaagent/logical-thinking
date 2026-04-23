"use client";

import { useState } from "react";
import { Bot, Loader2, Key, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useAppStore } from "@/lib/store";
import { toast } from "sonner";

const SYSTEM_PROMPT = `Kamu adalah Senior Partner di Deloitte dengan 15+ tahun pengalaman di Business Understanding dan Digital Transformation.

Analisis Issue Tree user dengan standar Big 4:
1. Apakah struktur tree sudah Top-Down dan MECE?
2. Seberapa tajam hypothesis-nya?
3. Berapa efektif pemisahan Controllable vs Uncontrollable?
4. Apakah root cause sudah operational dan actionable untuk solusi IT?

Berikan:
- Skor keseluruhan 1-100
- 3 kekuatan utama
- 3 area improvement yang spesifik
- 1 saran konkret untuk memperbaiki tree ini

Format jawaban dalam JSON:
{
  "score": number,
  "strengths": ["...", "...", "..."],
  "improvements": ["...", "...", "..."],
  "suggestion": "..."
}

Jawab dalam bahasa Indonesia, santai tapi profesional seperti mentor senior.`;

export default function AIFeedbackPanel() {
  const {
    currentTree,
    currentPrompt,
    hypothesis,
    currentFeedback,
    feedbackLoading,
    setFeedback,
    setFeedbackLoading,
    saveWorkout,
  } = useAppStore();

  const [apiKey, setApiKey] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("heliview-ai-key") || "";
    }
    return "";
  });
  const [showKeyInput, setShowKeyInput] = useState(false);

  const controllableCount = currentTree.nodes.filter(
    (n) => n.data.tag === "controllable"
  ).length;
  const uncontrollableCount = currentTree.nodes.filter(
    (n) => n.data.tag === "uncontrollable"
  ).length;
  const totalNonRoot = currentTree.nodes.filter(
    (n) => n.data.nodeType !== "root"
  ).length;
  const controllablePercent =
    totalNonRoot > 0 ? Math.round((controllableCount / totalNonRoot) * 100) : 0;

  async function handleRequestFeedback() {
    if (!apiKey) {
      setShowKeyInput(true);
      toast.error("Masukkan API key terlebih dahulu");
      return;
    }

    if (currentTree.nodes.length < 2) {
      toast.error("Tambahkan minimal 1 node selain root");
      return;
    }

    setFeedbackLoading(true);

    const payload = {
      problem: currentPrompt?.text || "",
      hypothesis,
      issueTree: currentTree,
      controllableCount,
      totalNodes: currentTree.nodes.length,
    };

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            {
              role: "user",
              content: `Analisis issue tree berikut:\n\n${JSON.stringify(payload, null, 2)}`,
            },
          ],
          temperature: 0.7,
          response_format: { type: "json_object" },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          (errData as Record<string, Record<string, string>>)?.error?.message || `API error ${res.status}`
        );
      }

      const data = await res.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error("Empty response from AI");

      const parsed = JSON.parse(content);
      const fb = {
        score: parsed.score ?? 0,
        strengths: parsed.strengths ?? [],
        improvements: parsed.improvements ?? [],
        suggestion: parsed.suggestion ?? "",
        raw: content,
      };

      setFeedback(fb);
      saveWorkout();
      toast.success("Feedback AI berhasil!");
    } catch (err) {
      toast.error(`Gagal: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setFeedbackLoading(false);
    }
  }

  function saveApiKey() {
    localStorage.setItem("heliview-ai-key", apiKey);
    setShowKeyInput(false);
    toast.success("API key tersimpan di browser");
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <Bot className="h-4 w-4" />
            Tree Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Total nodes</span>
            <span className="font-semibold">{currentTree.nodes.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Edges</span>
            <span className="font-semibold">{currentTree.edges.length}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-emerald-600">Controllable</span>
            <span className="font-semibold">{controllableCount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-red-600">Uncontrollable</span>
            <span className="font-semibold">{uncontrollableCount}</span>
          </div>
          {totalNonRoot > 0 && (
            <div>
              <div className="mb-1 flex justify-between text-xs text-muted-foreground">
                <span>% Controllable</span>
                <span>{controllablePercent}%</span>
              </div>
              <Progress value={controllablePercent} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {showKeyInput && (
        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Key className="h-4 w-4" />
              OpenAI API Key
            </div>
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
              className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button size="sm" onClick={saveApiKey} className="w-full">
              Simpan Key
            </Button>
          </CardContent>
        </Card>
      )}

      <Button
        onClick={handleRequestFeedback}
        disabled={feedbackLoading}
        className="w-full"
        size="lg"
      >
        {feedbackLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Send className="mr-2 h-4 w-4" />
        )}
        Minta Feedback AI
      </Button>

      {!showKeyInput && (
        <button
          onClick={() => setShowKeyInput(true)}
          className="w-full text-center text-xs text-muted-foreground hover:underline"
        >
          {apiKey ? "Ganti API key" : "Set API key"}
        </button>
      )}

      {currentFeedback && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between text-base">
              <span>Hasil Feedback</span>
              <Badge
                variant={
                  currentFeedback.score >= 70
                    ? "default"
                    : currentFeedback.score >= 40
                    ? "secondary"
                    : "destructive"
                }
                className="text-lg px-3"
              >
                {currentFeedback.score}/100
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="mb-2 text-sm font-semibold text-emerald-700">
                Kekuatan
              </h4>
              <ul className="space-y-1">
                {currentFeedback.strengths.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    &bull; {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-amber-700">
                Area Improvement
              </h4>
              <ul className="space-y-1">
                {currentFeedback.improvements.map((s, i) => (
                  <li key={i} className="text-sm text-muted-foreground">
                    &bull; {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 text-sm font-semibold text-blue-700">
                Saran Konkret
              </h4>
              <p className="text-sm text-muted-foreground">
                {currentFeedback.suggestion}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
