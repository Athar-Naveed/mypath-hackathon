export const maxDuration = 60; // this is for the chatbot api request timeout; It is because we are on the free plan of vercel.
import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

// ------------------------
// Chatbots server URL
// ------------------------
const apiUrl = process.env.PRODUCTION_CHATBOT_API_URL;

// ------------------------
// Extracting jwt token from cookies
// ------------------------
async function getToken() {
  const cookie = await cookies();
  return cookie.get("serviceToken")?.value;
}

// ------------------------
// 1 universal function for all get/post api requests
// ------------------------
async function fetchChatbotData(url: string, method: string, body?: any) {
  const token = await getToken();
  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return response.json();
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    const chatbotData = await fetchChatbotData(`${apiUrl}/chat`, "POST", data);
    if (chatbotData.detail != undefined && chatbotData.detail.status === 401) {
      return NextResponse.json({message: chatbotData.detail.message, status: 401}, {status: 401});
    }

    return NextResponse.json({message: chatbotData.message, status: 200}, {status: 200});
  } catch (error: any) {
    console.error("Error in chatbot API request:", error);
    return NextResponse.json({message: "Chatbot request failed.", status: 500}, {status: 500});
  }
}

// ------------------------
// Fetching user chats with chatbot
// ------------------------
export async function GET() {
  try {
    const token = await getToken();
    const chatbotDat = await fetch(`${apiUrl}/get_conversation_history`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const chatbotData = await chatbotDat.json();
    if (chatbotData.detail != undefined && chatbotData.detail.status === 401) {
      return NextResponse.json({message: chatbotData.detail.message, status: 401}, {status: 401});
    }

    return NextResponse.json(
      {message: chatbotData.conversation_history, status: 200},
      {status: 200},
    );
  } catch (error: any) {
    console.error("Error in chatbot API request:", error);
    return NextResponse.json({message: "Chatbot request failed.", status: 500}, {status: 500});
  }
}

export async function DELETE() {
  try {
    const chatbotData = await fetchChatbotData(`${apiUrl}/delete_conversation_history`, "DELETE");
    if (chatbotData.detail != undefined && chatbotData.detail.status === 401) {
      return NextResponse.json({message: chatbotData.detail.message, status: 401}, {status: 401});
    }

    return NextResponse.json(
      {message: chatbotData.conversation_history, status: 200},
      {status: 200},
    );
  } catch (error: any) {
    console.error("Error in chatbot API request:", error);
    return NextResponse.json({message: "Chatbot request failed.", status: 500}, {status: 500});
  }
}
