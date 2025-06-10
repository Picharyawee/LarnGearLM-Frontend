import { useState } from "react";
import { giveInstructions } from "../api/resource";

interface Message {
  id: number;
  sender: string;
  text: string;
  type: "user" | "ai" | "error";
  //timestamp: string;
}

interface APIResponse {
  response?: string;
  message?: {
    content: string;
  };
}

interface UseChatReturn {
  currentMessage: string;
  messages: Message[];
  isLoading: boolean;
  handleMessageChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSendMessage: () => Promise<void>;
  handleKeyPress: (event: React.KeyboardEvent<HTMLElement>) => void;
  setCurrentMessage: React.Dispatch<React.SetStateAction<string>>;
}

export const useChat = (): UseChatReturn => {
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // // Ref สำหรับการเลื่อน scroll ไปยังข้อความล่าสุด
  // const messagesEndRef = useRef(null);

  // // ฟังก์ชันสำหรับการเลื่อน scroll ลงไปด้านล่างสุด
  // const scrollToBottom = () => {
  //   messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
  // };

  // // เมื่อ messages มีการเปลี่ยนแปลง ให้เลื่อน scroll ลง
  // useEffect(() => {
  //   scrollToBottom();
  // }, [messages]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    setCurrentMessage(event.target.value);
  };

  const handleSendMessage = async (): Promise<void> => {
    if(currentMessage.trim() === ""){
      return;
    }

    const userMessage = currentMessage.trim();

    setMessages((prevMessages: Message[]) => [...prevMessages, { id: Date.now(), sender: "You", text: userMessage, type: "user" }]);
    setCurrentMessage("");
    setIsLoading(true);

    try{
      const response = await giveInstructions(userMessage, []); //TODO [] with something like ["LeoTreasure.pdf", AnaCoffee.pdf"]

      let aiResponseText = "ไม่พบการตอบกลับจาก AI";

      if (response.data) {
        aiResponseText = response.data.response
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now() + 1, sender: "AI", text: aiResponseText, type: "ai" },
      ]);
    } catch (error: unknown){
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
    if(event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      handleSendMessage();
    }
  };

  return {
    currentMessage,
    messages,
    isLoading,
    handleMessageChange,
    handleSendMessage,
    handleKeyPress,
    setCurrentMessage
  };
};