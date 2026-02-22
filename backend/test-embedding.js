import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
async function run() {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  try {
    const result = await model.embedContent("Hello world");
    console.log("text-embedding-004 success:", result.embedding.values.length);
  } catch(e) { console.error("text-embedding-004 fail:", e.message); }

  const model2 = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
  try {
    const result2 = await model2.embedContent("Hello world");
    console.log("gemini-embedding-001 success:", result2.embedding.values.length);
  } catch(e) { console.error("gemini-embedding-001 fail:", e.message); }
}
run();
