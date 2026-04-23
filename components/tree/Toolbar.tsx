"use client";

import { Plus, Lightbulb, Download, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import type { IssueNode } from "@/types";

let nodeCounter = 0;

function generateId() {
  nodeCounter++;
  return `node-${Date.now()}-${nodeCounter}`;
}

export default function Toolbar() {
  const { currentTree, addNode, currentPrompt, resetTree } = useAppStore();

  function handleAddIssue() {
    const yMax = Math.max(
      ...currentTree.nodes.map((n) => n.position.y),
      0
    );
    const xOffset = (currentTree.nodes.length % 3) * 220;
    const newNode: IssueNode = {
      id: generateId(),
      type: "issueNode",
      position: { x: 100 + xOffset, y: yMax + 120 },
      data: { label: "Sub-issue baru", nodeType: "issue" },
    };
    addNode(newNode);
  }

  function handleAddHypothesis() {
    const yMax = Math.max(
      ...currentTree.nodes.map((n) => n.position.y),
      0
    );
    const newNode: IssueNode = {
      id: generateId(),
      type: "issueNode",
      position: { x: 650, y: yMax + 120 },
      data: { label: "Hypothesis baru", nodeType: "hypothesis" },
    };
    addNode(newNode);
  }

  function handleExport() {
    const data = JSON.stringify(currentTree, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "issue-tree.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleReset() {
    if (currentPrompt) {
      resetTree(currentPrompt.text);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleAddIssue}>
        <Plus className="mr-1 h-4 w-4" />
        Issue Node
      </Button>
      <Button variant="outline" size="sm" onClick={handleAddHypothesis}>
        <Lightbulb className="mr-1 h-4 w-4" />
        Hypothesis
      </Button>
      <Button variant="outline" size="sm" onClick={handleExport}>
        <Download className="mr-1 h-4 w-4" />
        Export JSON
      </Button>
      <Button variant="ghost" size="sm" onClick={handleReset}>
        <RotateCcw className="mr-1 h-4 w-4" />
        Reset
      </Button>
    </div>
  );
}
