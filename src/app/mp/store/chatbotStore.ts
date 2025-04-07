import {ChatbotChatType} from "@/types";
import {create} from "zustand";
import {persist} from "zustand/middleware";

export const useChatbotStore = create<ChatbotChatType>()(
  persist(
    (set) => ({
      newChat: true,
      fetchChat: false,
      thinking: false,
      allowedWords: 600,
      remainingWords: 600,
      messages: [],
      inputMessage: "",
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
