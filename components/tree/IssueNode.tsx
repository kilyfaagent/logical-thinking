"use client";

import { memo, useState, useCallback } from "react";
import { Handle, Position, type NodeProps } from "@xyflow/react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IssueNodeData } from "@/types";
import { useAppStore } from "@/lib/store";

function IssueNodeComponent({ id, data }: NodeProps) {
  const nodeData = data as unknown as IssueNodeData;
  const [editing, setEditing] = useState(false);
  const [localLabel, setLocalLabel] = useState(nodeData.label);
  const updateNodeData = useAppStore((s) => s.updateNodeData);
  const removeNode = useAppStore((s) => s.removeNode);

  const handleCommit = useCallback(() => {
    setEditing(false);
    updateNodeData(id, { label: localLabel });
  }, [id, localLabel, updateNodeData]);

  const isRoot = nodeData.nodeType === "root";
  const isHypothesis = nodeData.nodeType === "hypothesis";
  const tag = nodeData.tag;

  const bgColor = isRoot
    ? "bg-primary text-primary-foreground"
    : isHypothesis
    ? "bg-violet-100 border-violet-400 text-violet-900"
    : tag === "controllable"
    ? "bg-emerald-50 border-emerald-400"
    : tag === "uncontrollable"
    ? "bg-red-50 border-red-400"
    : "bg-card border-border";

  return (
    <div
      className={cn(
        "relative min-w-[160px] max-w-[280px] rounded-lg border-2 px-4 py-3 shadow-sm transition-shadow hover:shadow-md",
        bgColor
      )}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-primary !w-3 !h-3"
      />

      {editing ? (
        <textarea
          autoFocus
          value={localLabel}
          onChange={(e) => setLocalLabel(e.target.value)}
          onBlur={handleCommit}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleCommit();
            }
          }}
          className="w-full resize-none rounded border bg-transparent px-1 py-0.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          rows={2}
        />
      ) : (
        <div
          onDoubleClick={() => {
            if (!isRoot) setEditing(true);
          }}
          className="text-sm leading-snug break-words cursor-default select-none"
        >
          {nodeData.label}
        </div>
      )}

      {!isRoot && !isHypothesis && (
        <div className="mt-2 flex items-center gap-1.5">
          <button
            onClick={() =>
              updateNodeData(id, {
                tag: tag === "controllable" ? undefined : "controllable",
              })
            }
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors",
              tag === "controllable"
                ? "bg-emerald-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-emerald-100"
            )}
          >
            C
          </button>
          <button
            onClick={() =>
              updateNodeData(id, {
                tag: tag === "uncontrollable" ? undefined : "uncontrollable",
              })
            }
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors",
              tag === "uncontrollable"
                ? "bg-red-500 text-white"
                : "bg-muted text-muted-foreground hover:bg-red-100"
            )}
          >
            U
          </button>
        </div>
      )}

      {!isRoot && (
        <button
          onClick={() => removeNode(id)}
          className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:opacity-100 [div:hover>&]:opacity-100"
          title="Hapus node"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      )}

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-primary !w-3 !h-3"
      />
    </div>
  );
}

export default memo(IssueNodeComponent);
