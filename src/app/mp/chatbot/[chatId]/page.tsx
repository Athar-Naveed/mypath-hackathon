import {Metadata} from "next";
import ChatbotUI from "../components/ChatbotUI";

export const metadata: Metadata = {
  title: "PathAI | MyPath AI",
  description: "Connect with our AI-powered chatbot to get personalized guidance and support.",
  icons: "/Logo/logo.svg",
};

export default function Chat() {
  return (
    <>
      <div>
        <ChatbotUI />
      </div>
    </>
  );
}
