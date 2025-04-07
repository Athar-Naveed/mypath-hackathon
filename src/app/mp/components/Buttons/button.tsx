"use client";
import {Tooltip} from "@mui/material";
import {useMainAppStore} from "../../store/mainAppStore";
import {useChatbotStore} from "../../store/chatbotStore";
const Button = ({title, icon}: {title: string; icon: any}) => {
  const {showChatHistory, setShowChatHistory} = useMainAppStore();
  const {setNewChat, setFetchChat} = useChatbotStore();
  const handleButton = () => {
    switch (title) {
      case "Chat History":
        setNewChat(false);
        setFetchChat(true);
        setShowChatHistory(!showChatHistory);
        break;
      case "New Chat":
        setNewChat(true);
        setFetchChat(false);

        window.location.href = "/mp/chatbot";
        break;
      default:
        return;
    }
  };
  return (
    <>
      <Tooltip title={title} arrow={true} placement="bottom">
        <button onClick={handleButton}>
          <div className="text-dark-custom-dark-blue dark:text-white">{icon}</div>
        </button>
      </Tooltip>
    </>
  );
};

export default Button;
