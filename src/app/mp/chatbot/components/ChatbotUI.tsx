// ------------------------
// Imports
// ------------------------
"use client";
import ChatHistoryModal from "../../components/Modal/ChatHistoryModal";
import {useMainAppStore} from "../../store/mainAppStore";
// import {useState} from "react";
import NewChat from "./NewChat";
import ChatBotChat from "./ChatBotChat";
// import ChatBotChat from "./ChatBotChat";
import NewUserModal from "../../components/Modal/NewUserModal";
import {useChatbotStore} from "../../store/chatbotStore";

const ChatbotUI = () => {
  // const [newUser, checkNewUser] = useState<boolean>(true);
  const {showChatHistory, setShowChatHistory} = useMainAppStore();
  const {sessionID} = useChatbotStore();
  return (
    <>
      <div className="grid">
        {!sessionID ? <NewChat /> : <ChatBotChat />}
        {/* {!newUser ? <ChatBotChat /> : <NewUserModal checkNewUser={checkNewUser} />} */}
        {/* <ChatBotChat /> */}
        {showChatHistory && <ChatHistoryModal setShowChatHistory={setShowChatHistory} />}
      </div>
    </>
  );
};
export default ChatbotUI;
