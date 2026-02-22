import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
async function run() {
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
  try {
    const result = await model.embedContent("Hello world");
    console.log(result.embedding.values.length);
  } catch(e) { console.error(e.message); }
}
run();
