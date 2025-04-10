
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mic, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isProcessing: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isProcessing }) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Focus textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isProcessing) {
      onSendMessage(message);
      setMessage("");
    }
  };

  // Handle keyboard shortcuts (Enter to send, Shift+Enter for new line)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Clear input field
  const handleClear = () => {
    setMessage("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="p-4 border-t border-gray-200 bg-white rounded-b-xl"
    >
      <div className="relative flex items-center">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask me anything about the hotel or local area..."
          className="min-h-[50px] max-h-[150px] pr-24 resize-none border-gray-300 focus-visible:ring-hotel-primary"
          disabled={isProcessing}
        />
        <div className="absolute right-2 flex items-center space-x-1">
          {message && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleClear}
              className="h-8 w-8 text-gray-400 hover:text-gray-500"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear</span>
            </Button>
          )}
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="h-8 w-8 text-gray-400 hover:text-gray-500"
          >
            <Mic className="h-4 w-4" />
            <span className="sr-only">Voice input</span>
          </Button>
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || isProcessing}
            className="h-8 w-8 bg-hotel-primary hover:bg-hotel-primary/90"
          >
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </div>
      <div className="flex justify-between mt-2 text-xs text-gray-500">
        <span>Press Enter to send, Shift+Enter for new line</span>
        <span className="text-right">{message.length} / 500</span>
      </div>
    </form>
  );
};

export default ChatInput;
