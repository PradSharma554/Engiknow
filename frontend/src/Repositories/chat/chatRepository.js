import api from "../../lib/api";

class ChatRepository {
  static instance = null;

  static getInstance() {
    if (!ChatRepository.instance) {
      ChatRepository.instance = new ChatRepository();
    }
    return ChatRepository.instance;
  }

  async askQuestion(question, workspaceId) {
    const { data } = await api.post("/chat/ask", { question, workspaceId });
    return data;
  }
}

export const chatRepository = ChatRepository.getInstance();
