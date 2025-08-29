"use client";

import CodeEditor from "./CodeEditor";

interface CodeSectionProps {
  title: string;
  value: string;
  setValue?: (val: string) => void;
  readOnly?: boolean;
  children?: React.ReactNode; // for action buttons
}

export default function CodeSection({
  title,
  value,
  setValue,
  readOnly,
  children,
}: CodeSectionProps) {
  return (
    <div className="w-full max-w-5xl">
      <div className="flex items-end justify-between mt-4">
        <h3 className="bg-green-300 text-black text-xs font-bold p-2 inline-block">
          {title}
        </h3>
        {children}
      </div>
      <CodeEditor value={value} setValue={setValue!} readOnly={readOnly} />
    </div>
  );
}
