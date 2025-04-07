"use client";
import {usePathname} from "next/navigation";
import ChatHistoryModal from "../../components/Modal/ChatHistoryModal";
import {useMainAppStore} from "../../store/mainAppStore";
// import {useState} from "react";
import NewChat from "./NewChat";
import ChatBotChat from "./ChatBotChat";
// import ChatBotChat from "./ChatBotChat";
// import NewUserModal from "../../components/Modal/NewUserModal";
// ------------------------
// Imports
// ------------------------

const ChatbotUI = () => {
  //   const [newUser, checkNewUser] = useState<boolean>(true);
  const {showChatHistory, setShowChatHistory} = useMainAppStore();

  const path = usePathname().split("/")[3];
  return (
    <>
      <div className="grid">
        {!path ? <NewChat /> : <ChatBotChat />}
        {/* {!newUser ? <ChatBotChat /> : <NewUserModal checkNewUser={checkNewUser} />} */}
        {/* <ChatBotChat /> */}
        {showChatHistory && <ChatHistoryModal setShowChatHistory={setShowChatHistory} />}
      </div>
    </>
  );
};
export default ChatbotUI;
