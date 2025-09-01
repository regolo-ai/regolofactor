"use client";

interface ActionButtonsProps {
  onViewDiff: () => void;
  onDownloadDiff: () => void;
  onCopy: () => void;
  copied: boolean;
  disabled: boolean;
}

export default function ActionButtons({
  onViewDiff,
  onDownloadDiff,
  onCopy,
  copied,
  disabled,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2 pb-4">
      <button
        onClick={onViewDiff}
        disabled={disabled}
        className="px-3 py-1 bg-purple-700 hover:bg-purple-600 text-white text-sm rounded-md disabled:opacity-40 transition cursor-pointer"
      >
        👁️ View Diff
      </button>
      <button
        onClick={onDownloadDiff}
        disabled={disabled}
        className="px-3 py-1 bg-cyan-500 hover:bg-cyan-400 text-white text-sm rounded-md disabled:opacity-40 transition cursor-pointer"
      >
        📄 Download Diff
      </button>
      <button
        onClick={onCopy}
        disabled={disabled}
        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-sm rounded-md disabled:opacity-40 transition cursor-pointer hidden md:block"
      >
        {copied ? "✅ Copied!" : "📋 Copy"}
      </button>
    </div>
  );
}
