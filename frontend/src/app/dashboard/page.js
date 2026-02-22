"use client";

import { useState, useRef, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { Send, Bot, User as UserIcon, Loader2, Info } from "lucide-react";
import toast from "react-hot-toast";

export default function ChatPage() {
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
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const { data } = await api.post("/chat/ask", {
        question: userMessage,
        // using the user's ID as a dummy workspace ID for MVP to satisfy backend
        workspaceId: user._id,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.answer,
          sources: data.sources || [],
        },
      ]);
    } catch (error) {
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950/50">
      <div className="p-6 border-b border-slate-800/60 bg-slate-900/50 backdrop-blur top-0 z-10 sticky">
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Omni-Search Interface
        </h1>
        <p className="text-sm text-slate-400">
          Ask questions across all ingested company knowledge.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex gap-4 max-w-4xl mx-auto ${msg.role === "user" ? "flex-row-reverse" : ""}`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === "user"
                  ? "bg-indigo-600"
                  : "bg-slate-800 border border-slate-700"
              }`}
            >
              {msg.role === "user" ? (
                <UserIcon className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-blue-400" />
              )}
            </div>

            {/* Bubble */}
            <div
              className={`flex flex-col gap-2 ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div
                className={`px-5 py-3.5 rounded-2xl ${
                  msg.role === "user"
                    ? "bg-blue-600 text-white rounded-tr-sm"
                    : msg.isError
                      ? "bg-red-950/50 text-red-200 border border-red-900/50 rounded-tl-sm"
                      : "bg-slate-800/80 text-slate-100 border border-slate-700/50 rounded-tl-sm"
                }`}
              >
                <p className="whitespace-pre-wrap leading-relaxed">
                  {msg.content}
                </p>
              </div>

              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2 text-xs bg-slate-800/40 border border-slate-700/40 rounded-lg p-3 w-full max-w-xl">
                  <div className="flex items-center gap-1.5 text-blue-400 mb-2 font-medium">
                    <Info className="w-3.5 h-3.5" /> Sources Cited
                  </div>
                  <ul className="space-y-2">
                    {msg.sources.map((src, i) => (
                      <li
                        key={i}
                        className="text-slate-400 border-l-2 border-slate-600 pl-2"
                      >
                        <span className="line-clamp-2">{src.sourceText}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-4 max-w-4xl mx-auto">
            <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
              <Bot className="w-5 h-5 text-blue-400 animate-pulse" />
            </div>
            <div className="bg-slate-800/80 px-5 py-4 rounded-2xl rounded-tl-sm flex items-center gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
              <span className="text-slate-400 text-sm">
                Searching knowledge base...
              </span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-slate-900/80 border-t border-slate-800 backdrop-blur sticky bottom-0">
        <form
          onSubmit={handleSend}
          className="max-w-4xl mx-auto relative flex items-center"
        >
          <input
            type="text"
            className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl pl-4 pr-14 py-4 text-slate-100 placeholder:text-slate-500 outline-none transition-all shadow-inner"
            placeholder="Ask anything about the company..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
