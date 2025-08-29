import { NextResponse } from "next/server";
import { getRegoloClient } from "@/lib/regolo";

type RefactorMode = "readability" | "performance" | "idiomatic" | "modularization";

type RefactorRequest = {
  code: string;
  mode: RefactorMode;
};

const prompts: Record<RefactorMode, string> = {
  readability: `You are RegoloFactor AI. Refactor code with the following goal: Refactor for Readability. Simplify complex expressions, improve variable names, reduce nested logic, and enhance code clarity without altering functionality. Only return valid code. Do not explain, only output code.`,
  performance: `You are RegoloFactor AI. Refactor code with the following goal: Refactor for Performance. Optimize algorithms, reduce time/space complexity, minimize redundant operations, and eliminate bottlenecks. Only return valid code. Do not explain, only output code.`,
  idiomatic: `You are RegoloFactor AI. Refactor code with the following goal: Refactor for Idiomatic. Use standard library patterns, follow language conventions, eliminate anti-patterns, and ensure code aligns with community best practices. Only return valid code. Do not explain, only output code.`,
  modularization: `You are RegoloFactor AI. Refactor code with the following goal: Refactor for Modularization. Split monolithic code into smaller, reusable functions/classes, reduce duplication, and improve maintainability through clear separation of concerns. Only return valid code. Do not explain, only output code.`,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, mode } = body;

    const client = getRegoloClient();

    const stream = await client.chat.completions.stream({
      model: "qwen3-coder-30b",
      messages: [
        { role: "system", content: prompts[mode] },
        { role: "user", content: code },
      ],
      temperature: 0.2,
    });

    const encoder = new TextEncoder();
    const responseStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const text = chunk.choices[0]?.delta?.content || "";
          if (text) controller.enqueue(encoder.encode(text));
        }
        controller.close();
      },
    });

    return new Response(responseStream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to refactor code", details: String(err) },
      { status: 500 }
    );
  }
}

