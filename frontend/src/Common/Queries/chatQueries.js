import { useMutation, useQuery } from "@tanstack/react-query";
import { chatRepository } from "../../Repositories/chat/chatRepository";

export function useChatAskMutation(options = {}) {
  return useMutation({
    mutationFn: ({ question, workspaceId, chatId }) =>
      chatRepository.askQuestion(question, workspaceId, chatId),
    ...options,
  });
}

export function useGetChats(workspaceId, options = {}) {
  return useQuery({
    queryKey: ["chats", workspaceId],
    queryFn: () => chatRepository.getChats(workspaceId),
    enabled: !!workspaceId,
    ...options,
  });
}

export function useGetChatById(chatId, options = {}) {
  return useQuery({
    queryKey: ["chatSession", chatId],
    queryFn: () => chatRepository.getChatById(chatId),
    enabled: !!chatId,
    ...options,
  });
}
