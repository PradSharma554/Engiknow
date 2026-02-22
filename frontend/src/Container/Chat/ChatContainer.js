"use client";

import { cloneElement, useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useChatAskMutation } from "@/Common/Queries/chatQueries";
import toast from "react-hot-toast";

export default function ChatContainer({ children }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I am Engiknow, your enterprise AI brain. How can I help you today?",
      sources: [],
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const mutation = useChatAskMutation({
    onSuccess: (data) => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
        },
      ]);
    },
    onError: (error) => {
      toast.error("Failed to get response");
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Sorry, I encountered an error while searching the company knowledge.",
          isError: true,
        },
      ]);
    },
  });

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || mutation.isPending) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);

    mutation.mutate({
      question: userMessage,
      workspaceId: user._id, // Using user ID as workspace for MVP
    });
  };

  const methods = {
    messages,
    input,
    setInput,
    handleSend,
    isLoading: mutation.isPending,
    messagesEndRef,
  };

  return cloneElement(children, { ...methods });
}
