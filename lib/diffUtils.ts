import { diffLines } from "diff";

export type DiffLine = {
  type: "added" | "removed" | "context";
  value: string;
};

export function generateDiffLines(input: string, output: string): DiffLine[] {
  const diff = diffLines(input, output);
  const result: DiffLine[] = [];

  diff.forEach((part) => {
    const type: DiffLine["type"] = part.added
      ? "added"
      : part.removed
      ? "removed"
      : "context";

    const lines = part.value.split("\n");

    lines.forEach((line) => {
      if (line !== "") {
        result.push({ type, value: line });
      }
    });
  });

  return result;
}
