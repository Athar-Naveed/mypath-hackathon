import ChatbotInputField from "./ChatbotInput";

const NewChat = () => {
  return (
    <>
      <div className="h-screen mx-auto text-center w-full grid items-center justify-center text-dark-custom-dark-blue dark:text-white">
        <div className="heading">
          <h1 className="text-3xl my-2">Welcome to PathAI</h1>
          <p> Connect with our AI-powered chatbot to get personalized guidance and support.</p>
        </div>
        <ChatbotInputField />
      </div>
    </>
  );
};
export default NewChat;
