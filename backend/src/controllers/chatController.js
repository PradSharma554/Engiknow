import { getEmbeddings, askGemini } from "../services/aiService.js";
import { querySimilarity } from "../services/pineconeService.js";

// @desc    Ask a question to Engiknow (RAG Pipeline)
// @route   POST /api/chat/ask
// @access  Private
export const askQuestion = async (req, res) => {
  try {
    const { question, workspaceId } = req.body;

    if (!question || !workspaceId) {
      return res
        .status(400)
        .json({ message: "Question and workspaceId are required." });
    }

    // Step 1: Turn the user's question into 768-dim embeddings
    const queryVector = await getEmbeddings(question);

    // Step 2: Query Pinecone for similar chunks matching the workspace
    const similarChunks = await querySimilarity(queryVector, workspaceId, 5);

    // Step 3: Extract the text from the matching chunks to build Context
    let context = "";
    const sources = [];

    if (similarChunks && similarChunks.length > 0) {
      similarChunks.forEach((match, idx) => {
        // Lowered score threshold (~0.4+) to allow more forgiving semantic search in MVP
        if (match.score > 0.4) {
          context += `[Source ${idx + 1}]: ${match.metadata.text}\n`;
          sources.push({
            score: match.score,
            documentId: match.metadata.documentId,
            sourceText: match.metadata.text,
          });
        }
      });
    }

    // Step 4: Pass the Context + Question to Gemini
    const answer = await askGemini(question, context);

    // Step 5: Send the formulated answer and the citations back
    res.status(200).json({
      answer,
      sources, // Frontend can display "Where did this come from?"
      hasContext: context.length > 0,
    });
  } catch (error) {
    console.error("Chat Error:", error);
    res
      .status(500)
      .json({ message: "Error processing question", error: error.message });
  }
};
