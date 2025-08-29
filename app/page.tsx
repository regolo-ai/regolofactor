"use client";

import { useState } from "react";
import Header from "../components/Header";
import CodeSection from "../components/CodeSection";
import ActionButtons from "../components/ActionButtons";
import DiffModal from "../components/DiffModal";
import { generateDiffText, generateDiffLines, type DiffLine } from "../lib/diffUtils";

export default function Home() {
  const [inputCode, setInputCode] = useState("// Paste your code here");
  const [outputCode, setOutputCode] = useState("");
  const [mode, setMode] = useState<"readability" | "performance" | "idiomatic" | "modularization">("readability");
  const [copied, setCopied] = useState(false);
  const [showDiff, setShowDiff] = useState(false);
  const [diffContent, setDiffContent] = useState<DiffLine[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleRefactor() {
    setOutputCode("");
    setLoading(true);

    try {
      const res = await fetch("/api/refactor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: inputCode, mode }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) {
        setLoading(false);
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutputCode((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch (err) {
      console.error("Refactor failed:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCopy() {
    if (!outputCode) return;
    try {
      await navigator.clipboard.writeText(outputCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  function handleDownloadDiff() {
    if (!inputCode || !outputCode) return;
    const diffText = generateDiffText(inputCode, outputCode);

    const blob = new Blob([diffText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "refactor.diff";
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleViewDiff() {
    if (!inputCode || !outputCode) return;
    setDiffContent(generateDiffLines(inputCode, outputCode));
    setShowDiff(true);
  }

  return (
    <main className="pb-8">
      <Header mode={mode} setMode={setMode} onRefactor={handleRefactor} />

      <div className="flex flex-wrap flex-col justify-center items-center">
        <CodeSection title="ORIGINAL CODE" value={inputCode} setValue={setInputCode} />
        <CodeSection title="REFACTORED CODE" value={outputCode} setValue={setOutputCode} readOnly>
          <ActionButtons
            onViewDiff={handleViewDiff}
            onDownloadDiff={handleDownloadDiff}
            onCopy={handleCopy}
            copied={copied}
            disabled={!outputCode || loading}
          />
        </CodeSection>
      </div>

      <DiffModal
        isOpen={showDiff}
        diffContent={diffContent}
        onClose={() => setShowDiff(false)}
      />

      {loading && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
          <div className="flex flex-col items-center gap-3 text-white">
            <svg
              className="animate-spin h-10 w-10 text-green-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-xl font-semibold">Refactoring…</span>
          </div>
        </div>
      )}
    </main>
  );
}
