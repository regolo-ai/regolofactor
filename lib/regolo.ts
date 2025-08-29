import OpenAI from "openai";

if (!process.env.REGOLO_API_KEY) {
  throw new Error("Missing REGOLO_API_KEY in environment");
}

export function getRegoloClient() {
  return new OpenAI({
    apiKey: process.env.REGOLO_API_KEY,
    baseURL: "https://api.regolo.ai/v1",
  });
}
