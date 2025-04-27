// -----------------------
// Imports
// -----------------------
import {ChatbotMessageType} from "@/types";
import Cookies from "js-cookie";
import axios from "axios";
// import stateStore from "@/store/zuStore";
import {StateType} from "@/types";
import {useChatbotStore} from "../store/chatbotStore";

// -----------------------
// Fetching chatbot's chat history
// -----------------------
export const fetchChatHistory = async (sessionID: string | undefined) => {
  const response = await fetch(`/api/chatbotChatHistory?sessionID=${sessionID}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    next: {revalidate: 6000},
  });

  const responseData = await response.json();

  if (!response.ok) {
    if (response.status === 401) {
      Cookies.remove("serviceToken");
      setTimeout(() => location.reload(), 3000);
    }
    throw new Error(responseData.message || "Failed to fetch chat history");
  }

  // Transform the conversation history
  const normalizedMessages: ChatbotMessageType[] = responseData.conversation_history.flatMap(
    (entry: any) => [
      {
        role: "user",
        content: entry.user_prompt,
        conversation_id: sessionID,
        category: "chat",
      },
      ...entry.turn_events.map((event: any) => ({
        role: "PathAI",
        content: event.content,
        conversation_id: sessionID,
        category: "chat",
        // Add visualization if available in your data
        visualization: event.visualization,
      })),
    ],
  );

  return normalizedMessages;
};

export const createChatbotChat = async () => {
  const response = await fetch("/api/createChatbotChat", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responseMessage = await response.json();
  return responseMessage;
};

// -----------------------
// Sending message to chatbot
// -----------------------
export const chatbotChat = async (message: ChatbotMessageType, store: StateType) => {
  // code to check for paid users
  // const allowUser:boolean = getUserType(store,"chat");
  // console.log(`allowUser: ${JSON.stringify(allowUser)}`)
  // if (!allowUser) {
  //   const botMessage: ChatbotMessageType = {
  //     role: "PathAI",
  //     content: "You have reached your request limit",
  //   };
  //   return botMessage;
  // }

  const response = await fetch("/api/chatbot", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  const responseMessage = await response.json();
  console.log(`responseMessage: ${JSON.stringify(responseMessage)}`);
  // Handle token expiration (keeps the same behavior)
  if (responseMessage.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 3000);
    const botMessage: ChatbotMessageType = {
      conversation_id: message.conversation_id,
      role: "PathAI",
      category: message.category,
      content: "Session expired. Logging you in again.",
    };
    return botMessage;
  }

  // Handle rate limiting (keeps the same behavior)
  if (responseMessage.status === 429) {
    const botMessage: ChatbotMessageType = {
      conversation_id: message.conversation_id,
      role: "PathAI",
      category: message.category,
      content: "Resource Exhausted! Please try after some time",
    };
    return botMessage;
  }

  // Successful response with category handling
  if (response.status === 200) {
    return response.status;
  }

  // Fallback error message
  const botMessage: ChatbotMessageType = {
    conversation_id: message.conversation_id,
    role: "PathAI",
    category: message.category, // Preserve original category
    content: "Please Try Sending Message Again",
  };
  return botMessage;
};

// -----------------------
// Generating visualization
// -----------------------

export const visualizer = async (store: StateType) => {
  const sessionID = useChatbotStore().sessionID;
  // code to check for paid users
  // const allowUser:boolean = getUserType(store,"visualize");
  // console.log(`allowUser visual: ${JSON.stringify(allowUser)}`)
  // if (!allowUser) {
  //   const botMessage: ChatbotMessageType = {
  //     role: "PathAI",
  //     content: "You have reached your request limit",
  //   };

  //   return botMessage;
  // }
  const resp = await axios.get("/api/visualize");

  if (resp.status === 200) {
    const botMessage: ChatbotMessageType = {
      conversation_id: sessionID,
      role: "PathAI",
      category: "visualize",
      visualization: resp.data.message,
    };
    return botMessage;
  } else if (resp.status === 401) {
    Cookies.remove("serviceToken");
    setTimeout(() => location.reload(), 6000);
    const botMessage: ChatbotMessageType = {
      conversation_id: sessionID,
      role: "PathAI",
      category: "visualize",
      content: "Session expired. Logging you in again.",
    }; // Return a fallback message
    return botMessage;
  } else if (resp.status === 429) {
    const botMessage: ChatbotMessageType = {
      conversation_id: sessionID,
      role: "PathAI",
      category: "visualize",
      content: "Resource Exhausted!. Please try after some time",
    }; // Return a fallback message
    return botMessage;
  } else {
    const botMessage: ChatbotMessageType = {
      conversation_id: sessionID,
      role: "PathAI",
      category: "visualize",
      content: "Please Try Generating Visualization Again",
    };

    return botMessage;
  }
};
interface MeaningFetchType {
  message: string;
  status: number;
}

// -----------------------
// Fetching meaning
// -----------------------
export const meaningFetcher = async (word: string): Promise<MeaningFetchType> => {
  try {
    const resp = await axios.post(
      "/api/visualize",
      {
        text: word,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return {message: resp.data.message.definition, status: resp.status};
  } catch (error) {
    return {message: error as string, status: 500};
  }
};

export const clearChat = async () => {
  try {
    const resp = await fetch("/api/chatbot", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (resp.status === 200) {
      return {message: "Chat history cleared", status: resp.status};
    }
  } catch (error) {
    return {message: error, status: 500};
  }
};
