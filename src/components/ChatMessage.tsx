
import React from "react";
import { Message } from "../services/chatService";
import { cn } from "@/lib/utils";
import { BedDouble, Globe, Hotel, User } from "lucide-react";

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.type === "user";
  
  // Get the appropriate icon based on the message category
  const getIcon = () => {
    if (isUser) return <User className="h-5 w-5 text-white" />;
    
    switch (message.category) {
      case "room-service":
        return <BedDouble className="h-5 w-5 text-white" />;
      case "local-recommendations":
        return <Globe className="h-5 w-5 text-white" />;
      case "hotel-services":
      case "faq":
        return <Hotel className="h-5 w-5 text-white" />;
      default:
        return <Hotel className="h-5 w-5 text-white" />;
    }
  };

  // Format the timestamp to a readable format
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={cn(
      "flex gap-3 animate-slide-in",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      {/* Avatar */}
      <div className={cn(
        "flex items-center justify-center h-10 w-10 rounded-full shrink-0",
        isUser ? "bg-hotel-accent" : "bg-hotel-primary"
      )}>
        {getIcon()}
      </div>
      
      {/* Message bubble */}
      <div className={cn(
        "max-w-[80%] sm:max-w-[70%] p-4 rounded-xl",
        isUser 
          ? "bg-hotel-accent text-white rounded-tr-none" 
          : "bg-white shadow-md border border-gray-100 rounded-tl-none"
      )}>
        {/* Message content */}
        <div className="prose prose-sm">
          {message.isLoading ? (
            <div className="typing-indicator px-2">
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
            typeof message.content === "string" ? (
              message.content.split('\n').map((line, i) => (
                <React.Fragment key={i}>
                  {line}
                  {i < message.content.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))
            ) : (
              message.content
            )
          )}
        </div>
        
        {/* Timestamp */}
        <div className={cn(
          "text-xs mt-2",
          isUser ? "text-hotel-light/70" : "text-gray-400"
        )}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
