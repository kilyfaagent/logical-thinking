"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { IssueNode, TreeSnapshot, WorkoutEntry, AIFeedback, Prompt } from "@/types";
import type { Edge } from "@xyflow/react";

function createRootNode(label: string): IssueNode {
  return {
    id: "root",
    type: "issueNode",
    position: { x: 400, y: 50 },
    data: { label, nodeType: "root" },
  };
}

interface AppState {
  currentPrompt: Prompt | null;
  currentTree: TreeSnapshot;
  hypothesis: string;
  history: WorkoutEntry[];
  streak: number;
  lastTrainingDate: string | null;
  currentWorkoutId: string | null;
  feedbackLoading: boolean;
  currentFeedback: AIFeedback | null;

  setPrompt: (prompt: Prompt) => void;
  setNodes: (nodes: IssueNode[]) => void;
  setEdges: (edges: Edge[]) => void;
  setHypothesis: (h: string) => void;
  addNode: (node: IssueNode) => void;
  updateNodeData: (id: string, data: Partial<IssueNode["data"]>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: Edge) => void;
  resetTree: (problemLabel: string) => void;
  startWorkout: (prompt: Prompt) => void;
  saveWorkout: () => void;
  setFeedback: (fb: AIFeedback) => void;
  setFeedbackLoading: (v: boolean) => void;
  deleteWorkout: (id: string) => void;
  loadWorkout: (entry: WorkoutEntry) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentPrompt: null,
      currentTree: { nodes: [], edges: [] },
      hypothesis: "",
      history: [],
      streak: 0,
      lastTrainingDate: null,
      currentWorkoutId: null,
      feedbackLoading: false,
      currentFeedback: null,

      setPrompt: (prompt) => set({ currentPrompt: prompt }),

      setNodes: (nodes) =>
        set((s) => ({ currentTree: { ...s.currentTree, nodes } })),

      setEdges: (edges) =>
        set((s) => ({ currentTree: { ...s.currentTree, edges } })),

      setHypothesis: (hypothesis) => set({ hypothesis }),

      addNode: (node) =>
        set((s) => ({
          currentTree: {
            ...s.currentTree,
            nodes: [...s.currentTree.nodes, node],
          },
        })),

      updateNodeData: (id, data) =>
        set((s) => ({
          currentTree: {
            ...s.currentTree,
            nodes: s.currentTree.nodes.map((n) =>
              n.id === id ? { ...n, data: { ...n.data, ...data } } : n
            ),
          },
        })),

      removeNode: (id) =>
        set((s) => ({
          currentTree: {
            nodes: s.currentTree.nodes.filter((n) => n.id !== id),
            edges: s.currentTree.edges.filter(
              (e) => e.source !== id && e.target !== id
            ),
          },
        })),

      addEdge: (edge) =>
        set((s) => ({
          currentTree: {
            ...s.currentTree,
            edges: [...s.currentTree.edges, edge],
          },
        })),

      resetTree: (problemLabel) =>
        set({
          currentTree: {
            nodes: [createRootNode(problemLabel)],
            edges: [],
          },
          hypothesis: "",
          currentFeedback: null,
        }),

      startWorkout: (prompt) => {
        const id = `workout-${Date.now()}`;
        set({
          currentPrompt: prompt,
          currentWorkoutId: id,
          currentTree: {
            nodes: [createRootNode(prompt.text)],
            edges: [],
          },
          hypothesis: "",
          currentFeedback: null,
        });
      },

      saveWorkout: () => {
        const s = get();
        if (!s.currentPrompt || !s.currentWorkoutId) return;

        const today = new Date().toDateString();
        const entry: WorkoutEntry = {
          id: s.currentWorkoutId,
          date: new Date().toISOString(),
          prompt: s.currentPrompt.text,
          hypothesis: s.hypothesis,
          tree: s.currentTree,
          feedback: s.currentFeedback ?? undefined,
          score: s.currentFeedback?.score,
        };

        const existingIdx = s.history.findIndex((h) => h.id === s.currentWorkoutId);
        const newHistory =
          existingIdx >= 0
            ? s.history.map((h, i) => (i === existingIdx ? entry : h))
            : [entry, ...s.history];

        let newStreak = s.streak;
        if (s.lastTrainingDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          if (s.lastTrainingDate === yesterday.toDateString()) {
            newStreak = s.streak + 1;
          } else {
            newStreak = 1;
          }
        }

        set({
          history: newHistory,
          streak: newStreak,
          lastTrainingDate: today,
        });
      },

      setFeedback: (fb) => set({ currentFeedback: fb }),
      setFeedbackLoading: (v) => set({ feedbackLoading: v }),

      deleteWorkout: (id) =>
        set((s) => ({ history: s.history.filter((h) => h.id !== id) })),

      loadWorkout: (entry) =>
        set({
          currentPrompt: { id: 0, category: "", text: entry.prompt },
          currentWorkoutId: entry.id,
          currentTree: entry.tree,
          hypothesis: entry.hypothesis,
          currentFeedback: entry.feedback ?? null,
        }),
    }),
    {
      name: "heliview-daily-store",
    }
  )
);
