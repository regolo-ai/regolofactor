"use client";

type Mode = "readability" | "performance" | "idiomatic" | "modularization";

interface HeaderProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  onRefactor: () => void;
}

export default function Header({ mode, setMode, onRefactor }: HeaderProps) {
  return (
    <header className="flex justify-center items-center p-4">
      <div className="flex justify-between w-full max-w-5xl">
        <div>
          <img src="regolo-logo.png" className="max-w-[130px] max-h-[32px]" />
          <div className="border-b grow pt-1"></div>
          <p className="text-green-300">
            RE<span className="text-white">GOLO</span>FACTOR
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="font-semibold mr-2">Refactor for: </label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as Mode)}
              className="p-2 px-4 border rounded"
            >
              <option value="readability">Readability</option>
              <option value="performance">Performance</option>
              <option value="idiomatic">Idiomatic</option>
              <option value="modularization">Modularization</option>
            </select>
          </div>
          <button
            onClick={onRefactor}
            className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-md transition"
          >
            🚀 Refactor Code
          </button>
        </div>
      </div>
    </header>
  );
}
