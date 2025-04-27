"use client";
import Image from "next/image";
import {useState, useRef, useEffect, memo} from "react";
import {ChatbotMessageType, Role} from "@/types";
import CustomMarkdown from "../../components/global/ReactMarkdown";
import {CopyButton, ShareButton, ThumbsDown, ThumbsUp} from "../../components/CopyButton";
import {ChevronDown} from "lucide-react";
import {socket} from "@/lib/socketClient";
import {useChatbotStore} from "../../store/chatbotStore";
import Cookies from "js-cookie";
const ChatbotMessages = memo(() => {
  // const [timer, setTimer] = useState<number>(0);
  const token = Cookies.get("serviceToken");
  const {messages, setMessages, sessionID} = useChatbotStore();
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
  };

  useEffect(scrollToBottom, [messages]);

  // useEffect(() => {
  //   let startTime: number;

  //   if (thinking) {
  //     startTime = Date.now();
  //     const interval = setInterval(() => {
  //       const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
  //       setTimer(elapsedSeconds);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   } else {
  //     setTimer(0);
  //   }
  // }, [thinking]);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const {scrollTop, scrollHeight, clientHeight} = scrollContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
      setIsButtonVisible(!isNearBottom);
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    const handleRoomJoined = (room: string) => {
      console.log(`Joined room: ${JSON.stringify(room)}`);
    };

    const handleResponseChunk = (data: {role: Role; chunk: string}) => {
      setMessages((prev) => {
        const lastMessage = prev[prev.length - 1];

        const newMessage = {
          content: data.chunk,
          role: data.role,
          conversation_id: sessionID,
          category: "chat",
        };

        if (lastMessage?.role === "PathAI") {
          // Append the new chunk to the last message's content
          return prev.map((msg, index) =>
            index === prev.length - 1 ? {...msg, content: msg.content + newMessage.content} : msg,
          );
        }

        // If there's no previous PathAI message, add as a new message
        return [...prev, newMessage];
      });
    };
    socket.emit("join_room", {
      user_id: token,
      chat_id: sessionID,
    });
    socket.on("room_joined", handleRoomJoined);
    socket.on("response_chunk", handleResponseChunk);

    // Cleanup: Remove event listeners when the effect re-runs or component unmounts
    return () => {
      socket.off("room_joined", handleRoomJoined);
      socket.off("response_chunk", handleResponseChunk);
    };
  }, [sessionID]);
  return (
    <>
      <div
        className="flex-1 py-8 lg:px-8 xl:pr-14 xl:pl-0 space-y-6 mx-auto mb-20 md:mb-32 sm:w-[35rem] md:w-[39rem] lg:w-[50rem] scroll-container"
        ref={scrollContainerRef}
      >
        {messages.map((message: any, index: number) => (
          <div
            key={index}
            className={`flex ${message.role !== "PathAI" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`inline-block rounded-xl break-words overflow-x-scroll scroll-container p-1 ${
                message.role !== "PathAI"
                  ? "text-light-light-black max-w-2xl lg:max-w-xl"
                  : "text-light-light-black dark:text-dark-primary-text max-w-xs sm:max-w-xl lg:max-w-3xl"
              }`}
            >
              {message.role !== "PathAI" ? (
                <div className="grid items-center gap-2 justify-end">
                  {/* User Message */}
                  <div className="whitespace-pre-wrap py-2 px-4 lg:p-4 rounded-xl bg-[#E6EFFF]">
                    <bdi>{message.content}</bdi>
                  </div>

                  {/* Copy Button outside the chat bubble */}
                  <div className="flex justify-end">
                    <CopyButton selection={message.content} />
                  </div>
                </div>
              ) : (
                // : message.content === "Thinking" && thinking ? (
                //   // Thinking Spinner
                //   <div className="flex items-center space-x-2">
                //     <div className="loader animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                //     <span className="text-gray-500 dark:text-gray-300">Thinking... {timer}s</span>
                //   </div>
                // ) : message.content === "Erasing" && thinking ? (
                //   // Thinking Spinner
                //   <div className="flex items-center space-x-2">
                //     <Image
                //       src={"/assets/images/widget/trash/trash.gif"}
                //       width={150}
                //       height={150}
                //       alt={"Clearing Chat"}
                //       unoptimized={true}
                //     />
                //   </div>
                // ) : message.content === "Visualizing" && thinking ? (
                //   // Visualization Spinner
                //   <div className="flex items-center space-x-2">
                //     <div className="loader animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                //     <span className="text-gray-500 dark:text-gray-300">
                //       Generating Visualization... {timer}s
                //     </span>
                //   </div>
                // )
                <>
                  <div className="flex items-center gap-1">
                    <Image
                      src="/Logo/logo.svg"
                      width={60}
                      height={60}
                      alt="MyPath AI"
                      className=""
                      priority={false}
                    />
                    <p className="text-lg font-sans">PathAI</p>
                  </div>

                  <div className={`grid gap-3 px-1 max-w-full group`}>
                    {/* Display both text content and visualization if available */}
                    {message.content && (
                      <div className="chatbot">
                        <bdi className="leading-10">
                          <CustomMarkdown content={message.content} />
                        </bdi>
                        <div className="flex items-center gap-2">
                          <div className="icon">
                            <CopyButton selection={message.content} />
                          </div>
                          <div className="icon">
                            <ShareButton />
                          </div>
                          <div className="icon">
                            <ThumbsUp />
                          </div>
                          <div className="icon">
                            <ThumbsDown />
                          </div>
                        </div>
                      </div>
                    )}
                    {message.visualization && (
                      <div className="video mt-4">
                        <video
                          controls
                          className="w-full rounded-lg"
                          src={`/api/visualize/${message.visualization}`}
                        >
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {/*
      // ------------------------ 
      // Scroll to Bottom Button 
      // ------------------------
      */}
      {isButtonVisible && (
        <button
          className="fixed bottom-[9rem] left-1/2 transform -translate-x-1/2 bg-dark-logo-primary text-white rounded-full p-2 shadow-lg hover:scale-110 transition-transform"
          onClick={scrollToBottom}
        >
          <ChevronDown />
        </button>
      )}
    </>
  );
});

export default ChatbotMessages;
