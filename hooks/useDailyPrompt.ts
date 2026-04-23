"use client";

import { useMemo } from "react";
import { getDailyPrompt } from "@/lib/prompts";

export function useDailyPrompt() {
  const prompt = useMemo(() => getDailyPrompt(new Date()), []);
  return prompt;
}
