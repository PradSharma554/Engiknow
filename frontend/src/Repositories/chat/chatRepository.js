import api from "../../lib/api";

class ChatRepository {
  static instance = null;

  static getInstance() {
    if (!ChatRepository.instance) {
      ChatRepository.instance = new ChatRepository();
    }
    return ChatRepository.instance;
  }

  async askQuestion(question, workspaceId, chatId) {
    const { data } = await api.post("/chat/ask", {
      question,
      workspaceId,
      chatId,
    });
    return data;
  }

  async getChats(workspaceId) {
    const { data } = await api.get(`/chat/${workspaceId}`);
    return data;
  }

  async getChatById(chatId) {
    const { data } = await api.get(`/chat/session/${chatId}`);
    return data;
  }
}

export const chatRepository = ChatRepository.getInstance();
