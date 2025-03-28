// ----------------------
// Imports
// ----------------------
import {Metadata} from "next";
import {Toaster} from "react-hot-toast";
import ChatSidebar from "./components/ChatSidebar";

// ----------------------
// Metadata
// ----------------------
export const metadata: Metadata = {
  title: "Messages | MyPath AI",
  description: "Messages platform is still in development. Stay tuned for more updates.",
  icons: "/Logo/logo.svg",
};

// ----------------------
// Messages code starts here
// ----------------------
export default function Messages() {
  return (
    <>
      <div className="flex h-screen bg-white dark:bg-dark-custom-dark-blue">
        {/* 
      // ----------------------
      // Chat History Sidebar 
      // ----------------------
      */}
        <ChatSidebar />
      </div>
      <Toaster />
    </>
  );
}
