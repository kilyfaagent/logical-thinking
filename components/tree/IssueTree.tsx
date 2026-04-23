"use client";

import { useCallback, useMemo } from "react";
import {
  ReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  addEdge,
  applyNodeChanges,
  type Connection,
  type NodeChange,
  type NodeTypes,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useAppStore } from "@/lib/store";
import IssueNodeComponent from "./IssueNode";
import type { IssueNode } from "@/types";

const nodeTypes: NodeTypes = {
  issueNode: IssueNodeComponent,
};

export default function IssueTree() {
  const nodes = useAppStore((s) => s.currentTree.nodes);
  const edges = useAppStore((s) => s.currentTree.edges);
  const setNodes = useAppStore((s) => s.setNodes);
  const setEdges = useAppStore((s) => s.setEdges);

  const handleNodesChange = useCallback(
    (changes: NodeChange[]) => {
      const filtered = changes.filter((c) => c.type !== "remove");
      if (filtered.length === 0) return;
      const updated = applyNodeChanges(filtered, nodes) as IssueNode[];
      setNodes(updated);
    },
    [nodes, setNodes]
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges(
        addEdge(
          {
            ...connection,
            animated: true,
            style: { stroke: "var(--color-primary)", strokeWidth: 2 },
          },
          edges
        )
      );
    },
    [edges, setEdges]
  );

  const rfNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        type: n.type || "issueNode",
      })),
    [nodes]
  );

  return (
    <div className="h-full w-full rounded-lg border bg-background">
      <ReactFlow
        nodes={rfNodes}
        edges={edges}
        onNodesChange={handleNodesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        className="bg-dots-pattern"
      >
        <Controls position="bottom-left" />
        <Background variant={BackgroundVariant.Dots} gap={16} size={1} />
      </ReactFlow>
    </div>
  );
}
