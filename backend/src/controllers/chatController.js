import { getEmbeddings, askGemini } from "../services/aiService.js";
import { querySimilarity } from "../services/pineconeService.js";
import ChatSession from "../models/ChatSession.js";

// @desc    Ask a question to Engiknow (RAG Pipeline)
// @route   POST /api/chat/ask
// @access  Private
export const askQuestion = async (req, res) => {
  try {
    const { question, workspaceId, chatId } = req.body;

    if (!question || !workspaceId) {
      return res
        .status(400)
        .json({ message: "Question and workspaceId are required." });
    }

    // Load previous session context if chatId is provided
    let chatSession;
    let priorMemory = "";
    if (chatId) {
      chatSession = await ChatSession.findOne({
        _id: chatId,
        userId: req.user._id,
      });
      if (chatSession) {
        // Collect previous messages for context
        const lastFew = chatSession.messages.slice(-4); // last 4 messages
        priorMemory = lastFew
          .map(
            (m) => `${m.role === "user" ? "User" : "Engiknow"}: ${m.content}`,
          )
          .join("\n");
      }
    }

    // Step 1: Turn the user's question into 768-dim embeddings (Wait, we use 3072 dim natively now)
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

    // Include prior chat memory into the prompt context
    if (priorMemory) {
      context = `Previous Conversation context:\n${priorMemory}\n\nRetrieved Knowledge Context:\n${context}`;
    }

    // Step 4: Pass the Context + Question to Gemini
    const answer = await askGemini(question, context);

    // Step 5: Save to ChatSession memory
    if (!chatSession) {
      chatSession = new ChatSession({
        userId: req.user._id,
        workspaceId,
        title: question.substring(0, 40) + "...",
        messages: [],
      });
    }

    chatSession.messages.push({ role: "user", content: question });
    chatSession.messages.push({ role: "ai", content: answer, sources });
    await chatSession.save();

    // Step 6: Send the formulated answer and the citations back
    res.status(200).json({
      chatId: chatSession._id,
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

// @desc    Get all chat sessions for user
// @route   GET /api/chat/:workspaceId
// @access  Private
export const getChats = async (req, res) => {
  try {
    const { workspaceId } = req.params;
    const chats = await ChatSession.find({ workspaceId, userId: req.user._id })
      .select("title updatedAt createdAt")
      .sort({ updatedAt: -1 });
    res.status(200).json(chats);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chats", error: error.message });
  }
};

// @desc    Get chat session details
// @route   GET /api/chat/session/:chatId
// @access  Private
export const getChatById = async (req, res) => {
  try {
    const { chatId } = req.params;
    const chat = await ChatSession.findOne({
      _id: chatId,
      userId: req.user._id,
    });
    if (!chat) return res.status(404).json({ message: "Chat not found" });
    res.status(200).json(chat);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching chat", error: error.message });
  }
};
