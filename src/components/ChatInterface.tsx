
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import { processMessage, Message } from "../services/chatService";
import { welcomeMessage } from "../utils/mockData";
import { toast } from "sonner";
import { 
  BedDouble, 
  Coffee, 
  Compass, 
  HelpCircle, 
  Hotel, 
  MapPin 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInterface: React.FC = () => {
  // State for messages and processing status
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Ref for message container to enable auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Function to scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending a new message
  const handleSendMessage = async (content: string) => {
    // Create user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content,
      timestamp: new Date().toISOString()
    };
    
    // Add user message to chat
    setMessages(prev => [...prev, userMessage]);
    
    // Create loading message
    const loadingMessage: Message = {
      id: "loading-" + Date.now().toString(),
      type: "bot",
      content: "",
      timestamp: new Date().toISOString(),
      isLoading: true
    };
    
    setIsProcessing(true);
    
    // Add loading message
    setMessages(prev => [...prev, loadingMessage]);
    
    try {
      // Process the message
      const response = await processMessage(content);
      
      // Remove loading message and add the response
      setMessages(prev => 
        prev.filter(msg => msg.id !== loadingMessage.id).concat(response)
      );
    } catch (error) {
      console.error("Error processing message:", error);
      toast.error("Failed to process your message");
      
      // Remove loading message on error
      setMessages(prev => prev.filter(msg => msg.id !== loadingMessage.id));
    } finally {
      setIsProcessing(false);
    }
  };

  // Quick action buttons for common requests
  const quickActions = [
    { icon: <Coffee size={14} />, text: "Room Service Menu", action: () => handleSendMessage("Show me the room service menu") },
    { icon: <MapPin size={14} />, text: "Local Attractions", action: () => handleSendMessage("What are some nearby attractions?") },
    { icon: <BedDouble size={14} />, text: "Housekeeping", action: () => handleSendMessage("I need housekeeping service") },
    { icon: <Hotel size={14} />, text: "Hotel Amenities", action: () => handleSendMessage("What amenities does the hotel offer?") },
    { icon: <HelpCircle size={14} />, text: "FAQs", action: () => handleSendMessage("What time is checkout?") },
    { icon: <Compass size={14} />, text: "Transportation", action: () => handleSendMessage("How can I arrange transportation?") }
  ];

  return (
    <div className="chat-container">
      {/* Header component */}
      <Header />
      
      {/* Message container */}
      <div className="message-container">
        {/* Quick action buttons */}
        <div className="flex flex-wrap gap-2 mb-6 px-2">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="bg-white border-gray-200 hover:bg-gray-50 text-xs flex items-center gap-1.5"
              onClick={action.action}
              disabled={isProcessing}
            >
              {action.icon}
              {action.text}
            </Button>
          ))}
        </div>
        
        {/* Messages */}
        {messages.map(message => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {/* Empty div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
    </div>
  );
};

export default ChatInterface;
