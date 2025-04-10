"use client";
import AgentButton from "../../components/Buttons/agentButton";
import {agents} from "../../components/global/constants";
import ChatbotInputField from "./ChatbotInput";
import {useChatbotStore} from "../../store/chatbotStore";

const NewChat = () => {
  const {agentName, setAgentName} = useChatbotStore();

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
      <ChatbotInputField />
    </div>
  );
};

export default NewChat;
