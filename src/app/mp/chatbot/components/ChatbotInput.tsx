"use client";
import {Tooltip} from "@mui/material";
import {GlobeIcon, Send, Trash2Icon, WandSparkles} from "lucide-react";
import {useCallback, useEffect, useRef, useState} from "react";
import {useChatbotStore} from "../../store/chatbotStore";
import {ChatbotMessageType} from "@/types";
import {socket} from "@/lib/socketClient";
import stateStore from "@/store/zuStore";
import {chatbotChat, clearChat, visualizer} from "../../mpHandler/chatbotChatHandler";
import {dropUpOptions, oneChabotMessage} from "../../components/global/constants";
import ConfirmationModal from "../../components/Modal/ConfirmationModal";
import DropUp from "../../components/Dropdown/dropUp";
import quizStore from "@/store/quizStore";
import QuizModal from "../../components/Quiz/quiz";
const ChatbotInputField = () => {
  const store = stateStore();
  const {
    thinking,
    remainingWords,
    allowedWords,
    inputMessage,
    setInputMessage,
    setRemainingWords,
    setMessages,
    setThinking,
  } = useChatbotStore();
  const {showQuiz, setQuiz, setShowQuiz} = quizStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [internet, setInternet] = useState(false);
  const [atDropdown, setAtDropdown] = useState(false);
  const [deleteChat, setDeleteChat] = useState<boolean>(false);
  const [isQuiz, setIsQuiz] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  // ------------------------
  // Focus the input field when the screen is first loaded
  // ------------------------

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  // ------------------------
  // Focus the input field whenever the chatbot receives a response
  // Commenting to increase the performance
  // ------------------------
  // useEffect(() => {
  //   if (!thinking) {
  //     textareaRef.current?.focus();
  //   }
  // }, [thinking]);

  // ------------------------
  // Setting dynamic height for the user input field
  // ------------------------
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 150)}px`;
    };

    const handleResize = () => requestAnimationFrame(adjustHeight);
    handleResize();
  }, [inputMessage]);

  // -----------------------
  // Actual send message function starts here
  // -----------------------
  const handleSendMessage = async () => {
    // -----------------------
    // Trimming chat for sending messages to chatbot
    // -----------------------
    const trimmedMessage = inputMessage.trim();
    if (trimmedMessage === "") return;
    let newMessage: ChatbotMessageType;

    if (inputMessage.startsWith("@quiz") || inputMessage.startsWith("quiz")) {
      newMessage = {
        role: "user",
        category: "quiz",
        content: inputMessage,
      };
    } else {
      const trimmedMessage = inputMessage.trim();
      newMessage = {
        role: "user",
        category: "chat",
        content: trimmedMessage,
      };
    }

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    const thinkingMessage: ChatbotMessageType = {
      role: "PathAI",
      category: "chat",
      content: "Thinking",
    };

    // -----------------------
    // pre-requisites starts here
    // -----------------------
    setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
    setThinking(true);
    setInputMessage("");
    setRemainingWords(3000);
    // -----------------------
    // pre-requisites ends here
    // -----------------------

    try {
      const botResponse = await chatbotChat(newMessage, store);

      if (
        botResponse.category === "quiz" &&
        typeof botResponse.content === "object" &&
        "quiz" in botResponse.content
      ) {
        setQuiz(botResponse.content.quiz); // Access quiz data safely
        setShowQuiz(); // Make the quiz visible
      }

      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Thinking"),
        botResponse,
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Thinking"),
        {
          role: "PathAI",
          category: "chat",
          content: "Sorry, an error occurred. Please try again.",
        },
      ]);
    } finally {
      setThinking(false);
      setIsQuiz(false);
    }
  };

  const handleInputMessage = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setInputMessage(value);
    setSelectedIndex(0);
    if (e.target.value === "@") {
      setAtDropdown(true);
      setIsQuiz(true);
    }
    // -----------------------
    // Count words: Split by spaces and filter out empty entries
    // -----------------------
    const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
    setRemainingWords(allowedWords - wordCount);
  }, []);
  // -----------------------
  // When the enter is pressed the message will be sent, else the cursor will be moved to the new line
  // -----------------------
  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (atDropdown) {
        e.preventDefault();
        handleDropupOption(dropUpOptions[selectedIndex].title);
      } else if (remainingWords <= allowedWords && remainingWords >= 0) {
        e.preventDefault();
        handleSendMessage();
      }
    } else if (e.key === "ArrowDown" && atDropdown) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % dropUpOptions.length);
    } else if (e.key === "ArrowUp" && atDropdown) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + dropUpOptions.length) % dropUpOptions.length);
    } else if (e.key === "Escape" && atDropdown) {
      e.preventDefault();
      setAtDropdown(false);
    }
  };

  // -----------------------
  // Generating visualization
  // -----------------------
  const handleVisualizer = async () => {
    try {
      const thinkingMessage: ChatbotMessageType = {
        role: "PathAI",
        category: "visualization",
        content: "Visualizing",
      };

      setMessages((prevMessages) => [...prevMessages, thinkingMessage]);
      setThinking(true);

      const visualizationResponse: ChatbotMessageType = await visualizer(store);

      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Visualizing"),
        visualizationResponse,
      ]);
    } catch (error) {
      const errorMessage: ChatbotMessageType = oneChabotMessage(
        "PathAI",
        "visualize",
        "Sorry, an error occurred while trying to visualize. Please try again.",
      );
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Visualizing"),
        errorMessage,
      ]);
    } finally {
      setThinking(false);
    }
  };
  const confirmClear = () => setDeleteChat(true);
  const closeModal = () => setDeleteChat(false);
  // ------------------
  // Clearing Chat function
  // ------------------
  const handleClearChat = async () => {
    try {
      const message: ChatbotMessageType = oneChabotMessage(
        "PathAI",
        "chat",
        "Erasing...",
      ) as ChatbotMessageType;
      setThinking(true);
      setMessages((prevMessages) => [
        ...prevMessages.filter((msg) => msg.content !== "Erasing"),
        message,
        // {
        //   role: "PathAI",
        //   content: "Erasing",
        //   createdAt: date,
        //   updatedAt: date,
        // },
      ]);

      const resp = await clearChat();

      if (resp?.status === 200) {
        location.reload();
      }
    } catch (error) {
      console.error("Error clearing chat:", error);
    } finally {
      setThinking(false);
    }
  };
  const handleDropupOption = (option: string) => {
    setAtDropdown(false);
    setInputMessage("@" + option);
    textareaRef.current?.focus();
  };
  const handleSetInternet = () => setInternet(!internet);
  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 max-w-xl lg:max-w-3xl mx-auto md:px-4 pb-2 lg:pb-6">
        <div className="flex flex-col relative border rounded-xl border-dark-custom-blue-stroke dark:border-dark-custom-blue-stroke bg-white dark:bg-dark-custom-blue p-1 lg:p-2">
          <textarea
            disabled={thinking}
            ref={textareaRef}
            value={inputMessage}
            onChange={handleInputMessage}
            onKeyDown={handleKeyPress}
            className={`${isQuiz ? "text-blue-500" : "text-black dark:text-dark-primary-text"} bg-white dark:bg-dark-custom-blue min-h-10 w-full p-3 outline-none resize-none overflow-y-scroll`}
            placeholder="Message PathAI"
            rows={1}
          />
          <div
            className={`text-sm text-red-500 ${remainingWords < 0 ? "absolute" : "hidden"} bottom-2 right-14 sm:right-20`}
          >
            Token limit reached: {remainingWords}/{allowedWords}
          </div>
          <div className="flex justify-between items-center pt-2">
            <div className="left flex">
              <Tooltip title="Visualize response" placement="top">
                <button
                  disabled={thinking}
                  onClick={handleVisualizer}
                  className="chatIconButton group"
                  aria-label="Visualize button"
                >
                  <WandSparkles className="chatIcon" />
                  <span className="chatSpan">Visualize</span>
                </button>
              </Tooltip>
              {/*               
              <Tooltip title="Internet Search" placement="top">
                <button
                  disabled={thinking}
                  onClick={handleSetInternet}
                  className={`${internet && "bg-slate-100"} chatIconButton group`}
                  aria-label="internet search"
                >
                  <GlobeIcon className="chatIcon" />
                  <span
                    className={`${internet ? "flex" : "hidden group-hover:flex"} text-xs font-semibold`}
                  >
                    Search Internet
                  </span>
                </button>
              </Tooltip>
              */}
              <Tooltip title="Clear Chat" placement="top">
                <button
                  disabled={thinking}
                  onClick={confirmClear}
                  className="chatIconButton group"
                  aria-label="clear chat"
                >
                  <Trash2Icon className="chatIcon" />
                  <span className="chatSpan">Clear Chat</span>
                </button>
              </Tooltip>
            </div>
            <div className="right">
              <Tooltip title="Send Message" placement="top">
                <button
                  disabled={thinking}
                  onClick={handleSendMessage}
                  className="chatIconButton group"
                  aria-label="Send message"
                >
                  <Send className="chatIcon" />
                  <span className="chatSpan">Send</span>
                </button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
      {deleteChat && (
        <ConfirmationModal
          isOpen={deleteChat}
          onClose={closeModal}
          onConfirm={() => {
            handleClearChat();
            closeModal();
          }}
        />
      )}
      {showQuiz && <QuizModal />}
      {atDropdown && (
        <DropUp
          dropUpOptions={dropUpOptions}
          selectedIndex={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          handleDropUpOption={handleDropupOption}
        />
      )}
    </>
  );
};

export default ChatbotInputField;
