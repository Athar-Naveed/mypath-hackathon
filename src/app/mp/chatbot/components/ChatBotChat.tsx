"use client";
// ------------------------
// Imports
// ------------------------
import {useRef, useEffect} from "react";
import {HighlightPopover} from "@omsimos/react-highlight-popover";
import renderPopover from "./Popover";
import ChatbotMessages from "./Messages";
import stateStore from "@/store/zuStore";
import {socket} from "@/lib/socketClient";
import ChatbotInputField from "./ChatbotInput";
import {useChatbotStore} from "../../store/chatbotStore";
import {oneChabotMessage} from "../../components/global/constants";
import {ChatbotMessageType} from "@/types";
import {fetchChatHistory} from "../../mpHandler/chatbotChatHandler";

// ------------------------
// Chatbot chat code starts here
// ------------------------
const ChatBotChat = () => {
  const store = stateStore();
  const {newChat, thinking, messages, fetchChat, setMessages} = useChatbotStore();

  // ------------------------
  // Fetching chat  here
  // ------------------------

  useEffect(() => {
    console.log(`new chat: ${newChat} -- fetch chat: ${fetchChat}`);
    if (!newChat && fetchChat) {
      const fetchChats = async () => {
        try {
          const message: ChatbotMessageType = oneChabotMessage(
            "PathAI",
            "chat",
            "Just Wait! Fetching your chats; if any...",
          ) as ChatbotMessageType;
          setMessages([message]);
          const resp = await fetchChatHistory();

          const greetMessage: ChatbotMessageType = oneChabotMessage(
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
            <ChatbotMessages messages={messages} thinking={thinking} />
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
