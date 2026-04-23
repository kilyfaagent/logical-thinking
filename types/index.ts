import type { Node, Edge } from "@xyflow/react";

export type NodeTag = "controllable" | "uncontrollable";

export type IssueNodeData = {
  label: string;
  tag?: NodeTag;
  nodeType: "root" | "issue" | "leaf" | "hypothesis";
};

export type IssueNode = Node<IssueNodeData>;

export type TreeSnapshot = {
  nodes: IssueNode[];
  edges: Edge[];
};

export type WorkoutEntry = {
  id: string;
  date: string;
  prompt: string;
  hypothesis: string;
  tree: TreeSnapshot;
  feedback?: AIFeedback;
  score?: number;
};

export type AIFeedback = {
  score: number;
  strengths: string[];
  improvements: string[];
  suggestion: string;
  raw: string;
};

export type Prompt = {
  id: number;
  category: string;
  text: string;
};
