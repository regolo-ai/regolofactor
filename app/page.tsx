"use client";

import { useState } from "react";
import Header from "../components/Header";
import CodeSection from "../components/CodeSection";
import ActionButtons from "../components/ActionButtons";
import DiffModal from "../components/DiffModal";
import RefactorOverlay from "../components/RefactorOverlay"; // 👈 import
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

      <RefactorOverlay visible={loading} />
    </main>
  );
}
