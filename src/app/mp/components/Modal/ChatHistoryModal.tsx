"use client";

import {useState, useEffect, useRef} from "react";
import {
  Search,
  Plus,
  X,
  MessageSquare,
  ExternalLink,
  Clock,
  Calendar,
  History,
  Trash2,
} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import {DeleteButton, MoreButton, ShareButton} from "../CopyButton";

interface ChatItem {
  id: string;
  title: string;
  date: string;
  preview?: string;
}

const ChatHistoryModal = ({setShowChatHistory}: {setShowChatHistory: (value: boolean) => void}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Sample chat data
  const recentChats: ChatItem[] = [
    {
      id: "1",
      title: "New conversation",
      date: "7 days ago",
      preview:
        "This is a new conversation that was started recently. You discussed AI development and machine learning concepts.",
    },
  ];

  const olderChats: ChatItem[] = [
    {
      id: "2",
      title: "TypeScript Error: Property 'asset' Fix",
      date: "2025-03-23",
      preview:
        "We discussed how to fix the TypeScript error related to the 'asset' property and implemented a solution using type guards.",
    },
    {
      id: "3",
      title: "Physics and Math Jokes with MyPath",
      date: "2025-03-22",
      preview:
        "A fun conversation about physics and math jokes, including some classics about Newton, Einstein, and mathematical paradoxes.",
    },
    {
      id: "4",
      title: "MATLAB Image Processing: Adding Intensity",
      date: "2025-03-21",
      preview:
        "We explored MATLAB image processing techniques, focusing on how to adjust image intensity and apply various filters.",
    },
    {
      id: "5",
      title: "FastAPI Image Handling and Database Storage",
      date: "2025-03-12",
      preview:
        "Discussion about implementing efficient image handling in FastAPI and storing images in databases with proper optimization.",
    },
    {
      id: "6",
      title: "Open-Source Models for Business Consulting",
      date: "2025-03-06",
      preview:
        "Exploration of various open-source models that can be applied to business consulting scenarios and decision-making processes.",
    },
    {
      id: "7",
      title: "Animated Dropdown with TailwindCSS",
      date: "2025-03-06",
      preview:
        "Tutorial on creating smooth animated dropdowns using TailwindCSS and minimal JavaScript for modern web interfaces.",
    },
    {
      id: "8",
      title: "Button Component with Gradient Hover Effect",
      date: "2025-03-04",
      preview:
        "Step-by-step guide to creating an elegant button component with a gradient hover effect using CSS and React.",
    },
    {
      id: "9",
      title: "Button Component with Gradient Hover Effect",
      date: "2025-03-04",
      preview:
        "Step-by-step guide to creating an elegant button component with a gradient hover effect using CSS and React.",
    },
    {
      id: "10",
      title: "Button Component with Gradient Hover Effect",
      date: "2025-03-04",
      preview:
        "Step-by-step guide to creating an elegant button component with a gradient hover effect using CSS and React.",
    },
  ];

  // Filter chats based on search query
  const filteredRecentChats = recentChats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const filteredOlderChats = olderChats.filter((chat) =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // Get selected chat details
  const selectedChatDetails = [...recentChats, ...olderChats].find(
    (chat) => chat.id === selectedChat,
  );

  // Focus search input on mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setShowChatHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowChatHistory]);

  // Handle escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowChatHistory(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [setShowChatHistory]);

  const handleSelectChat = (chatId: string) => {
    setSelectedChat(chatId);
    // In a real app, you might want to load the chat content here
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className="fixed inset-0 bg-black/30 dark:bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      >
        <motion.div
          ref={modalRef}
          initial={{scale: 0.95, opacity: 0}}
          animate={{scale: 1, opacity: 1}}
          transition={{type: "spring", damping: 25, stiffness: 300}}
          className="bg-white/90 dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-5xl h-[75vh] flex overflow-hidden border border-gray-200 dark:border-gray-800"
          aria-modal="true"
          role="dialog"
          aria-labelledby="chat-history-title"
        >
          {/* Left panel - Chat list */}
          <div className="w-full md:w-1/2 lg:w-2/5 border-r border-gray-200 dark:border-gray-800 flex flex-col">
            {/* Search header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-800">
              <div className="relative">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 pl-10 pr-4 rounded-xl text-dark-custom-dark-blue dark:text-white/80 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Chat list content */}
            <div className="flex-1 overflow-y-auto scroll-container">
              {/* Recent chats section */}
              {filteredRecentChats.length > 0 && (
                <div className="mt-3">
                  <div className="px-4 py-2 flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Last 7 Days
                    </h3>
                  </div>
                  <ul className="mt-1">
                    {filteredRecentChats.map((chat) => (
                      <li
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className={`group cursor-pointer text-dark-custom-dark-blue dark:text-white/80 w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors ${
                          selectedChat === chat.id
                            ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-500"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-sm ${selectedChat === chat.id ? "font-medium text-blue-600 dark:text-blue-400" : ""}`}
                        >
                          {chat.title}
                        </span>
                        <span
                          className={`hidden group-hover:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full`}
                        >
                          <ShareButton />
                          <DeleteButton />
                          <MoreButton />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Older chats section */}
              {filteredOlderChats.length > 0 && (
                <div className="mt-3">
                  <div className="px-4 py-2 flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 dark:text-gray-500" />
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      This Year
                    </h3>
                  </div>
                  <ul className="mt-1">
                    {filteredOlderChats.map((chat) => (
                      <li
                        key={chat.id}
                        onClick={() => handleSelectChat(chat.id)}
                        className={`group cursor-pointer text-dark-custom-dark-blue dark:text-white/80 w-full flex justify-between items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800/70 transition-colors ${
                          selectedChat === chat.id
                            ? "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 dark:border-blue-500"
                            : ""
                        }`}
                      >
                        <span
                          className={`text-sm text-left ${selectedChat === chat.id ? "font-medium text-blue-600 dark:text-blue-400" : ""}`}
                        >
                          {chat.title}
                        </span>
                        <span className="hidden group-hover:flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          <ShareButton />
                          <DeleteButton />
                          <MoreButton />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* No results */}
              {searchQuery &&
                filteredRecentChats.length === 0 &&
                filteredOlderChats.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-60 px-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                      <Search className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      No conversations found
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 max-w-xs">
                      We couldn't find any conversations matching "{searchQuery}"
                    </p>
                    <button
                      onClick={() => setSearchQuery("")}
                      className="mt-4 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
                    >
                      Clear search
                    </button>
                  </div>
                )}
            </div>
          </div>

          {/* Right panel - Preview */}
          <div className="hidden md:flex md:w-1/2 lg:w-3/5 flex-col bg-gray-50 dark:bg-gray-800/50 relative">
            {selectedChat ? (
              <motion.div
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.2}}
                className="flex flex-col h-full"
              >
                {/* Preview header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700/50">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
                    {selectedChatDetails?.title}
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                  </p>
                </div>

                {/* Preview content */}
                <div className="flex-1 p-6 overflow-y-auto custom-scrollbar">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-5 shadow-sm border border-gray-200 dark:border-gray-700/50">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {selectedChatDetails?.preview}
                    </p>
                  </div>

                  {/* Sample message bubbles */}
                  <div className="mt-8 space-y-6">
                    <div className="flex items-start justify-end flex-row-reverse gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                          U
                        </span>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-2xl rounded-tl-none px-4 py-3 max-w-md">
                        <p className="text-gray-800 dark:text-gray-200">
                          How can I implement this feature in my application?
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 justify-start flex-row-reverse">
                      <div className="bg-blue-500 dark:bg-blue-600 rounded-2xl rounded-tr-none px-4 py-3 max-w-md">
                        <p className="text-white">
                          I can help you implement that feature. Let's break it down into steps...
                        </p>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-700 flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-medium text-sm">AI</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Preview footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700/50">
                  <button
                    onClick={() => setShowChatHistory(false)}
                    className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white py-2.5 px-5 rounded-xl transition-colors font-medium shadow-sm"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>Continue conversation</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                className="flex flex-col items-center justify-center h-full text-center p-6"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
                  <History className="h-10 w-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                  Select a conversation to preview
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm">
                  Choose from your chat history or create a new conversation to get started
                </p>
              </motion.div>
            )}
          </div>

          {/* Close button - Top right */}
          <button
            onClick={() => setShowChatHistory(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatHistoryModal;
