import { GoogleGenAI } from "@google/genai";
import { config } from "dotenv";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: "Explain how AI works",
  });
  console.log(response.text);
}

await main();