"use client";
import AgentButton from "../../components/Buttons/agentButton";
import {agents} from "../../components/global/constants";
import ChatbotInputField from "./ChatbotInput";
import {useChatbotStore} from "../../store/chatbotStore";
import {createChatbotChat} from "../../mpHandler/chatbotChatHandler";
import {socket} from "@/lib/socketClient";
import Cookies from "js-cookie";
const NewChat = () => {
  const {agentName, setAgentName, setSessionID, setMessages} = useChatbotStore();
  const token = Cookies.get("serviceToken");
  return (
    <div className="h-screen mx-auto text-center w-full grid items-center justify-center text-dark-custom-dark-blue dark:text-white">
      <div className="intro">
        <div className="heading">
          <h1 className="text-3xl my-2">Welcome to PathAI</h1>
          <p>Connect with our AI-powered chatbot to get personalized guidance and support.</p>
        </div>
        <div className="agents">
          <ul className="flex items-center justify-center m-4 gap-4">
            {agents.map((link, index) => (
              <li key={index} className="flex items-center gap-2">
                <AgentButton
                  title={link.title}
                  icon={<link.icon />}
                  desc={link.desc}
                  active={agentName === link.title}
                  onClick={() => setAgentName(link.title)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="btn">
        <button
          className="bg-dark-logo-primary text-white px-4 py-2 rounded"
          onClick={async () => {
            const sessionID = await createChatbotChat();
            setMessages([]);
            setSessionID(sessionID.message);
            socket.emit("join_room", {
              user_id: token,
              chat_id: sessionID.message,
            });
          }}
        >
          Start Chat
        </button>
      </div>
      {/* <ChatbotInputField /> */}
    </div>
  );
};

export default NewChat;
