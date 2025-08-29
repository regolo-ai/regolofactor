"use client";

import type { DiffLine } from "../lib/diffUtils";

interface DiffModalProps {
  isOpen: boolean;
  diffContent: DiffLine[];
  onClose: () => void;
}

export default function DiffModal({ isOpen, diffContent, onClose }: DiffModalProps) {
  if (!isOpen) return null;

  function getClass(type: DiffLine["type"]) {
    if (type === "added") return "text-green-400";
    if (type === "removed") return "text-red-400";
    return "text-stone-300";
  }

  function getPrefix(type: DiffLine["type"]) {
    if (type === "added") return "+";
    if (type === "removed") return "-";
    return " ";
  }

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 cursor-pointer"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-stone-900 text-white max-w-4xl w-full rounded shadow-lg p-4 overflow-y-auto max-h-[80vh] border-2 border-stone-400 cursor-text"
      >
        <div className="flex justify-between items-center border-b border-stone-400 pb-2 mb-4">
          <h2 className="font-bold text-lg">👁️ View Diff</h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-red-400 text-lg cursor-pointer"
          >
            ✖
          </button>
        </div>

        <pre className="text-sm font-mono whitespace-pre-wrap px-8">
          {diffContent.map((line, idx) => (
            <div key={idx} className={getClass(line.type)}>
              {getPrefix(line.type)}
              {line.value}
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
