"use client";

import React from "react";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { EditorView } from "@codemirror/view";

interface Props {
  value: string;
  setValue?: (val: string) => void;
  readOnly?: boolean;
}

export default function CodeEditor({ value, setValue, readOnly = false }: Props) {
  return (
    <div className="border-4 border-green-300 rounded-b">
      <CodeMirror
        value={value}
        height="400px"
        theme={dracula}
        extensions={[
          javascript(),
          EditorView.lineWrapping, // 👈 enables line wrapping
        ]}
        onChange={(val) => setValue && setValue(val)}
        editable={!readOnly}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          foldGutter: true,
        }}
      />
    </div>
  );
}
