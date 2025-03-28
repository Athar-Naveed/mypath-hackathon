// ------------------------
// Imports
// ------------------------
import {Metadata} from "next";
// import NewChat from "./components/NewChat";
import ChatBotChat from "./components/ChatBotChat";

// ------------------------
// Chatbot Page details
// ------------------------
export const metadata: Metadata = {
  title: "PathAI | MyPath AI",
  description: "Connect with our AI-powered chatbot to get personalized guidance and support.",
  icons: "/Logo/logo.svg",
};
// ------------------------
// Chatbot code starts here
// ------------------------
export default function Chatbot() {
  return (
    <>
      <div className="grid">
        {/* <NewChat /> */}
        <ChatBotChat />
      </div>
    </>
  );
}
