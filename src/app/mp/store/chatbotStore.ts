import {ChatbotChatType} from "@/types";
import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useChatbotStore = create<ChatbotChatType>()(
  persist(
    (set) => ({
      sessionID: undefined,
      newChat: true,
      fetchChat: false,
      agentName: "",
      thinking: false,
      deepThink: "",
      allowedWords: 600,
      remainingWords: 600,
      messages: [],
      inputMessage: "",
      setSessionID: (sessionId) => set({sessionID: sessionId}),
      setAgentName: (name) => set({agentName: name}),
      setDeepThink: (deepThink) => set({deepThink}),
      setNewChat: (value: boolean) => set({newChat: value}),
      setFetchChat: (value: boolean) => set({fetchChat: value}),
      setThinking: (thinking) => set({thinking}),
      setRemainingWords: (remainingWords) => set({remainingWords}),
      // Modified to handle both direct arrays and updater functions
      setMessages: (messages) =>
        set((state) => ({
          messages: typeof messages === "function" ? messages(state.messages) : messages,
        })),
      setInputMessage: (inputMessage) =>
        set((state) => ({
          inputMessage:
            typeof inputMessage === "function"
              ? inputMessage(state.inputMessage ?? "")
              : inputMessage,
        })),
    }),
    {
      name: "chatbot-store", // Key for localStorage
    },
  ),
);
