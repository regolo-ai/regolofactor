"use client";

interface RefactorOverlayProps {
  visible: boolean;
}

export default function RefactorOverlay({ visible }: RefactorOverlayProps) {
  if (!visible) return null;

  return (
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
  );
}
