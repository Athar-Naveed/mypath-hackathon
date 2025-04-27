"use client";
// ------------------------
// Imports
// ------------------------
import {useRef, useEffect} from "react";
import {HighlightPopover} from "@omsimos/react-highlight-popover";
import renderPopover from "./Popover";
import ChatbotMessages from "./Messages";
import {useChatbotStore} from "../../store/chatbotStore";
import {oneChabotMessage} from "../../components/global/constants";
import {ChatbotMessageType} from "@/types";
import {fetchChatHistory} from "../../mpHandler/chatbotChatHandler";
import ChatbotInputField from "./ChatbotInput";
// Chatbot chat code starts here
// ------------------------
const ChatBotChat = () => {
  const {newChat, fetchChat, sessionID, setMessages} = useChatbotStore();

  // ------------------------
  // Fetching chat  here
  // ------------------------

  useEffect(() => {
    if (!newChat && fetchChat) {
      const fetchChats = async () => {
        try {
          const message: ChatbotMessageType = oneChabotMessage(
            newChat,
            sessionID,
            "PathAI",
            "chat",
            "Just Wait! Fetching your chats; if any...",
          ) as ChatbotMessageType;
          setMessages([message]);
          const resp = await fetchChatHistory(sessionID);

          const greetMessage: ChatbotMessageType = oneChabotMessage(
            newChat,
            sessionID,
            "PathAI",
            "chat",
            "Hi there! Up for something new.",
          ) as ChatbotMessageType;
          if (resp.length <= 0) {
            setMessages([greetMessage]);
          } else {
            const initialMessage: ChatbotMessageType[] = [greetMessage];
            setMessages([...initialMessage, ...resp]);
          }
        } catch (error) {
          const message: ChatbotMessageType = oneChabotMessage(
            newChat,
            sessionID,
            "PathAI",
            "chat",
            "The chatbot got chills🥶 while fetching your chats! Please try refreshing the page!",
          ) as ChatbotMessageType;
          setMessages([message]);
        }
      };

      // ------------------------
      // Function call here: Fetching chat history
      // ------------------------
      fetchChats();
    }
  }, [newChat]);

  // useEffect(() => {
  //   if (!socket.connected) {
  //     // socket.connect();
  //   }

  //   socket.on("receiveMessage", (data) => {
  //     console.log(`Received message: ${JSON.stringify(data)}`);

  //     setMessages((prev) => {
  //       const lastMessage = prev[prev.length - 1];

  //       // Convert `message` to `text` to match frontend state structure
  //       const newMessage: ChatbotMessageType = {
  //         role: "PathAI",
  //         content: data.message,
  //       };

  //       // Remove thinking message and add new message
  //       return [...prev.filter((msg) => msg.content !== "Thinking"), newMessage];
  //     });
  //   });

  //   return () => {
  //     socket.off("message");
  //     socket.disconnect();
  //   };
  // }, []);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  return (
    <>
      <div className="sm:mx-4 md:mx-20 lg:mx-28 md:w-[35rem] lg:w-[47rem] xl:w-[47rem] max-w-3xl xl:mx-auto pt-10">
        {/* 
          // ------------------
          // Chatbot message display field
          // ------------------
          */}

        <HighlightPopover renderPopover={renderPopover}>
          <div className="flex flex-col h-[95vh]" ref={chatContainerRef}>
            <ChatbotMessages />
          </div>
        </HighlightPopover>
        {/* 
          // -----------------------
          // Chatbot input field
          // -----------------------
          */}
        <ChatbotInputField />
      </div>
    </>
  );
};

export default ChatBotChat;
