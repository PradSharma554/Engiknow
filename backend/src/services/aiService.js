import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

/**
 * Get embeddings for a piece of text using the Gemini embedding model
 */
export const getEmbeddings = async (text) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-embedding-001" });
    const result = await model.embedContent(text);
    const embedding = result.embedding;
    return embedding.values; // Returns an array of 3072 floats
  } catch (error) {
    console.error("Gemini Embedding Error:", error);
    throw new Error("Failed to generate embeddings.");
  }
};

/**
 * Ask a question using Gemini with optional context (RAG)
 */
export const askGemini = async (prompt, context = "") => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let finalPrompt = prompt;
    if (context) {
      finalPrompt = `You are Engiknow, an enterprise AI assistant. Answer the user's question based strictly on the provided context. If the context does not contain the answer, say "I don't have enough information to answer that based on the current company knowledge."\n\nContext:\n${context}\n\nQuestion:\n${prompt}`;
    }

    const result = await model.generateContent(finalPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Generation Error:", error);
    throw new Error("Failed to generate answer.");
  }
};
