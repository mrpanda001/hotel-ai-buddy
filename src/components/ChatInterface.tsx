
import React, { useState, useEffect, useRef } from "react";
import Header from "./Header";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import ApiKeyModal from "./ApiKeyModal";
import { processMessage, Message } from "../services/chatService";
import { welcomeMessage } from "../utils/mockData";
import { toast } from "sonner";
import { 
  BedDouble, 
  Coffee, 
  Compass, 
  HelpCircle, 
  Hotel, 
  MapPin,
  Trash2,
  RefreshCw,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInterface: React.FC = () => {
  // State for messages and processing status
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  
  // Ref for message container to enable auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);

  // Check if API key exists on mount
  useEffect(() => {
    const apiKey = localStorage.getItem("perplexity_api_key");
    if (!apiKey) {
      // Show API key modal on first load if no key exists
      setShowApiKeyModal(true);
    }
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (!isProcessing) {
      scrollToBottom();
    }
  }, [messages, isProcessing]);

  // Show scroll button when not at bottom
  useEffect(() => {
    const handleScroll = () => {
      if (messageContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messageContainerRef.current;
        const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
        setShowScrollButton(!isAtBottom);
      }
    };

    const messageContainer = messageContainerRef.current;
    if (messageContainer) {
      messageContainer.addEventListener('scroll', handleScroll);
      return () => messageContainer.removeEventListener('scroll', handleScroll);
    }
  }, []);

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

  // Clear chat history
  const handleClearChat = () => {
    setMessages([welcomeMessage]);
    toast.success("Chat history cleared");
  };

  // Handle opening API key modal
  const handleOpenApiModal = () => {
    setShowApiKeyModal(true);
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
    <div className="chat-container h-full flex flex-col">
      {/* Header component */}
      <Header />
      
      {/* Message container */}
      <div 
        className="message-container flex-grow overflow-y-auto p-4"
        ref={messageContainerRef}
      >
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
        <div className="space-y-6">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
        
        {/* Empty div for scrolling to bottom */}
        <div ref={messagesEndRef} />
      </div>

      {/* Utility buttons */}
      <div className="px-4 pt-2 pb-2 flex justify-between border-t border-gray-100">
        <Button
          variant="ghost" 
          size="sm"
          className="text-gray-500 hover:text-gray-700"
          onClick={handleOpenApiModal}
        >
          <Settings size={16} className="mr-1" />
          API Settings
        </Button>
        
        <div className="flex space-x-2">
          <Button
            variant="ghost" 
            size="sm"
            className="text-gray-500 hover:text-gray-700"
            onClick={handleClearChat}
            disabled={messages.length <= 1 || isProcessing}
          >
            <Trash2 size={16} className="mr-1" />
            Clear chat
          </Button>
          
          {showScrollButton && (
            <Button
              variant="ghost" 
              size="sm" 
              className="text-gray-500 hover:text-gray-700"
              onClick={scrollToBottom}
            >
              <RefreshCw size={16} className="mr-1" />
              Latest messages
            </Button>
          )}
        </div>
      </div>
      
      {/* Chat input */}
      <ChatInput onSendMessage={handleSendMessage} isProcessing={isProcessing} />
      
      {/* API Key Modal */}
      <ApiKeyModal 
        isOpen={showApiKeyModal} 
        onClose={() => setShowApiKeyModal(false)} 
      />
    </div>
  );
};

export default ChatInterface;
