"use client";

import { useState, createContext, useContext } from "react";
import { giveInstructions, createArticle } from "../api/chat";
import { useResourceContext } from "../contexts/ResourceContext";

interface Message {
  id: number;
  sender: string;
  text: string;
  type: "user" | "ai" | "error";
  //timestamp: string;
}

interface ChatContextProps {
  currentMessage: string;
  messages: Message[];
  isLoading: boolean;
  handleMessageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
  responseBufferMessage: string;
  setResponseBufferMessage: React.Dispatch<React.SetStateAction<string>>;
  handleGenerateArticle: () => Promise<void>;
}

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { getListOfSelectedFileId } = useResourceContext();
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [responseBufferMessage, setResponseBufferMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = async (): Promise<void> => {
    if (currentMessage.trim() === "") {
      return;
    }

    const userMessage = currentMessage.trim();

    setMessages((prevMessages: Message[]) => [...prevMessages, { id: Date.now(), sender: "You", text: userMessage, type: "user" }]);
    setCurrentMessage("");
    setIsLoading(true);

    try {
      const listOfSelectedFileId = getListOfSelectedFileId();
      const response = await giveInstructions(userMessage, listOfSelectedFileId, true);

      let aiResponseText = "ไม่พบการตอบกลับจาก AI";

      let accumulateBufferMessage = "";
      if (response.body) {
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        async function readStream(): Promise<void> {
          const { done, value } = await reader.read();
          if (done) {
            return;
          }
          const chunk = decoder.decode(value, { stream: true });
          const text = JSON.parse(chunk).response;
          accumulateBufferMessage += text;
          setResponseBufferMessage(accumulateBufferMessage);
          return readStream();
        }
        await readStream();
      }
      aiResponseText = accumulateBufferMessage || "ไม่พบการตอบกลับจาก AI";
      setResponseBufferMessage(""); // Clear the buffer message after response is complete

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, sender: "AI", text: aiResponseText, type: "ai" },
      ]);
    } catch (error: unknown) {
      console.error("Error sending message or getting AI response:", error);

      const errorMessage: string = error instanceof Error ? error.message : "Unknown error occurred";

      setMessages((prevMessages: Message[]) => [
        ...prevMessages,
        { id: Date.now() + 2, sender: "System", text: `เกิดข้อผิดพลาด: ${errorMessage}`, type: "error" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage();
    }
  };

  const handleGenerateArticle = async (): Promise<void> => {
    setIsLoading(true);

    try {
      const listOfSelectedFileId = getListOfSelectedFileId();
      const article = await createArticle(listOfSelectedFileId);
      // สมมุติว่าอยากโชว์เป็น message ใน chat เลย
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "AI",
          type: "ai",
          text: `Title : ${article.title}\n\nTags : ${article.tags}\n\nExpected duration : ${article.expectedDuration}\n\nContent : ${article.content}`,
          actions: [
            { label: "ใช้บทความนี้", action: "accept" },
          ],
        },
      ]);
    } catch (error) {
      console.error("Error generating article:", error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: "System",
          type: "error",
          text: `เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : "Unknown error"}`,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ChatContext.Provider value={{
      currentMessage,
      messages,
      isLoading,
      handleMessageChange,
      handleSendMessage,
      handleKeyPress,
      setCurrentMessage,
      responseBufferMessage,
      setResponseBufferMessage,
      handleGenerateArticle,
    }}>
      {children}
    </ChatContext.Provider>
  );
};
export const useChatContext = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};