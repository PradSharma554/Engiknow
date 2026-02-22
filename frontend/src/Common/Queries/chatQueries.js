import { useMutation } from "@tanstack/react-query";
import { chatRepository } from "../../Repositories/chat/chatRepository";

export function useChatAskMutation(options = {}) {
  return useMutation({
    mutationFn: ({ question, workspaceId }) =>
      chatRepository.askQuestion(question, workspaceId),
    ...options,
  });
}
