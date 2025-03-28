"use client";
// -------------------------------
// Imports
// -------------------------------
import stateStore from "@/store/zuStore";
import {useState, useEffect, useRef} from "react";
import {MainChatProps, MessageType} from "@/types";
import Cookies from "js-cookie";
import {ArrowLeft, Send, SmilePlus} from "lucide-react";
import Loader from "../../components/Loaders/Loader";
import ChatMessages from "../../components/Cards/Chat/ChatMessages";
import FriendProfile from "./FriendProfile";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import UserImage from "../../components/UserImage";
// -------------------------------
// Main user chat code starts here
// -------------------------------
const MainChat = ({ updateLastMessage }:MainChatProps) => {
  const {
    user, // Current user data
    selectedChat, // Zustand state for selected chat
    setSelectedChat,
    setMessages: setStateMessages, // Zustand state for chat messages
    friendProfile, // Zustand state for toggling friend profile
    setFriendProfile,
  } = stateStore();
  const [message, setMessage] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const [isSocketOpen, setIsSocketOpen] = useState(false);
  const [isEmojiOpen, setIsEmojiOpen] = useState(false);

  // -------------------------------
  // Connecting web socket
  // -------------------------------
  const connectWebSocket = () => {
    const token = Cookies.get("serviceToken");
    if (!token) {
      console.error("No service token found.");
      return null;
    }

    const ws = new WebSocket(`wss://campuscompanionserver.fly.dev/v1/ws?token=${token}`);

    ws.onopen = () => {
      setIsSocketOpen(true);
    };
    
    ws.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        const newMessage: MessageType = {
          id: parsedData.id || Date.now().toString(),
          fromId: parsedData.fromId,
          toId: parsedData.toId,
          content: parsedData.content,
          createdAt: new Date(parsedData.createdAt || Date.now()),
          read: parsedData.read || false,
        };
        setStateMessages((prevMessages: MessageType[]) => [...prevMessages, newMessage]);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.onerror = (error) => console.error("WebSocket error:", error);
    ws.onclose = () => {
      setIsSocketOpen(false);
    };
    
    return ws;
  };
  
  // -------------------------------
  // Call Function: Connecting web socket here
  // -------------------------------
  useEffect(() => {
    socketRef.current = connectWebSocket();
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);
  
   // -------------------------------
  // Handling message submission
  // -------------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedChat) {
      const newMessage = message.trim();

      // Send the message to the server
      await sendPrivateMessage(selectedChat.friendId, newMessage);

      // Update the sidebar with the latest message
      updateLastMessage(selectedChat.friendId, newMessage, new Date());

      // Clear the input field
      setMessage("");
    }
  };

  // -------------------------------
  // Sending private messages
  // -------------------------------
  async function sendPrivateMessage(toId: string, content: string) {
    // Reconnect if the socket is not open
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.log("Reconnecting to WebSocket...");
      socketRef.current = connectWebSocket();

      // Wait for the connection to open
      await new Promise((resolve) => {
        if (socketRef.current) {
          socketRef.current.onopen = () => resolve(true);
        }
      });
    }

    // Send the message via WebSocket
    if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
      const wsMessage = {
        type: "private_message", // Message type
        fromId: user?.id || "", // Sender ID
        toId: toId, // Recipient ID
        content: content, // Message content
        createdAt: new Date(), // Timestamp
        read: false, // Read status
      };
      socketRef.current.send(JSON.stringify(wsMessage)); // Send message as JSON
    }
  }

  const handleBackChat = () => setSelectedChat(null);
  const handleFriendClick = () => setFriendProfile(!friendProfile);
  const handleEmoji = () => setIsEmojiOpen(!isEmojiOpen);
  const handleEmojiClick = (emojiObject: any) => {
    // Append emoji to the input field value
    setMessage((prevMessage) => prevMessage + emojiObject.native);
  };
  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {selectedChat && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackChat}
                className="lg:hidden text-dark-custom-dark-blue dark:text-light-light-white"
                aria-label="Toggle chat history"
              >
                <ArrowLeft size={24} />
              </button>
              <div
                className="cursor-pointer"
                onClick={handleFriendClick}
              >
                <UserImage {...selectedChat} />
              </div>
              <div
              onClick={handleFriendClick}
              >
                <h2 className="font-medium text-dark-custom-dark-blue dark:text-light-light-white cursor-pointer">
                  {selectedChat?.friendName || ""}
                </h2>
                {/* <p className="text-sm text-gray-400">Online</p> */}
              </div>
            </div>
          )}
        </div>

        {chatLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader size={32} color="white" />
          </div>
        ) : (
          <ChatMessages />
        )}

        <form
          onSubmit={handleSubmit}
          className="md:pb-4 lg:p-4 bottom-0 border-t border-gray-200 dark:border-gray-800"
        >
          <div className="flex items-end gap-2">
            <div className="">
              <SmilePlus
                className="text-dark-custom-dark-blue dark:text-dark-primary-text ml-4 cursor-pointer absolute md:relative bottom-3"
                onClick={handleEmoji}
              />
              {isEmojiOpen && (
                <div className="absolute max-w-[250px] bottom-20">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiClick}
                    className="bg-dark-primary-text dark:bg-dark-custom-dark-blue overflow-x-scroll"
                  />
                </div>
              )}
            </div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 bg-transparent border text-dark-custom-dark-blue dark:text-light-light-white border-dark-custom-dark-blue dark:border-slate-700 rounded-lg pl-9 md:pl-2 pr-2 py-2.5 focus:outline-none"
            />
            <button
              type="submit"
              className="p-2 bg-dark-logo-primary rounded-full transition-all hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Send message"
            >
              <Send className="text-light-light-white size-5" />
            </button>
          </div>
        </form>
      </div>
      {friendProfile && (
        <FriendProfile
          // bio={user?.bio}
          selectedChat={selectedChat}
          setFriend={setFriendProfile}
          setSelectChat={setSelectedChat}
        />
      )}
    </>
  );
};

export default MainChat;
