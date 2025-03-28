"use client";
// -----------------------------
// Imports
// -----------------------------
import { useState, useEffect } from "react";

import ChatHistoryCard from "../../components/Cards/Chat/ChatHistoryCard";
import ChatHistoryLoader from "../../components/Loaders/Skeletons/ChatHistoryLoader";
import { ChatHistoryType } from "@/types";
import { fetchChats } from "../../mpHandler/chat/ChatHandler";
import stateStore from "@/store/zuStore";
import MainChat from "./MainChat";
import { useWindowSize } from "../../components/WindowSize";
import { useRouter } from "next/navigation";

// -----------------------------
// Chat Sidebar code starts here
// -----------------------------
const ChatSidebar = () => {
  // -----------------------------
  // Setting vars
  // -----------------------------
  const [loading, setLoading] = useState(true); // For loading state
  const width = useWindowSize(); // To get window size for responsiveness
  const [chats, setChats] = useState<ChatHistoryType[]>([]); // Store chat histories
  const { selectedChat } = stateStore(); // Zustand state for selected chat
  const router = useRouter(); // Router for page navigation/refresh

  // -----------------------------
  // Function to update the last message in a chat
  // -----------------------------
  const updateLastMessage = (chatId: string, lastMessage: string, lastMessageTime: Date) => {
    setChats((prevChats) =>
      prevChats.map((chat) =>
        chat.friendId === chatId
          ? { ...chat, lastMessage, lastMessageTime }
          : chat
      )
    );
  };

  // -----------------------------
  // Fetching chats here
  // -----------------------------
  const handleFetchChatHistories = async () => {
    try {
      const res = await fetchChats(); // API call to fetch chats
      if (res) {
        setChats(res);
        router.refresh(); // Refresh router state
      }
    } catch (err) {
      console.error("Error fetching chat histories:", err); // Log any fetch errors
    } finally {
      setLoading(false); // Stop loader
    }
  };

  // -----------------------------
  // Function call: Fetching chats here
  // -----------------------------
  useEffect(() => {
    handleFetchChatHistories();
  }, []);

  return (
    <>
      {/* Render sidebar if no chat is selected or on larger screens */}
      {(width > 768 || (width <= 768 && !selectedChat)) && (
        <div className="w-full md:w-80 border-r border-slate-200 dark:border-slate-700 flex flex-col absolute md:relative z-10 transition-all duration-300 ease-in-out">
          <div className="p-4 lg:p-[26px] border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
            <h2 className="font-semibold text-lg text-dark-custom-dark-blue dark:text-light-light-white ml-6 sm:ml-8 lg:ml-1">
              Your messages
            </h2>
          </div>
          <div className="py-4"></div>
          <div className="flex-1 overflow-y-auto">
            {loading
              ? Array.from({ length: 5 }).map((_, index) => <ChatHistoryLoader key={index} />) // Show loaders during fetch
              : chats.map((chat) => (
                  <ChatHistoryCard key={chat.friendId} chat={chat} /> // Render chat cards
                ))}
          </div>
        </div>
      )}

      {/* Render main chat or placeholder */}
      {selectedChat ? (
        <MainChat updateLastMessage={updateLastMessage} /> // Pass updateLastMessage to MainChat
      ) : (
        <div className="hidden md:flex items-center justify-center w-full">
          <h2 className="text-lg text-dark-custom-dark-blue dark:text-light-light-white">
            Select a chat to view messages
          </h2>
        </div>
      )}
    </>
  );
};

export default ChatSidebar;
