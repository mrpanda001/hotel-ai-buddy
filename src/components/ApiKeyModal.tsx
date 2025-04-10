
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Key } from "lucide-react";

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ isOpen, onClose }) => {
  const [apiKey, setApiKey] = useState("");
  
  // Check if API key exists in local storage on mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("perplexity_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);
  
  const handleSave = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter a valid API key");
      return;
    }
    
    localStorage.setItem("perplexity_api_key", apiKey);
    toast.success("API key saved successfully");
    onClose();
  };
  
  const handleClear = () => {
    localStorage.removeItem("perplexity_api_key");
    setApiKey("");
    toast.info("API key removed");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Key size={18} /> Perplexity API Configuration
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="text-sm text-gray-500">
            <p>Enter your Perplexity API key to enable advanced AI responses.</p>
            <p className="mt-1">Your API key is stored locally in your browser and never sent to our servers.</p>
          </div>
          
          <Input
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter Perplexity API Key"
            className="w-full"
            type="password"
          />
          
          <div className="text-xs text-gray-400">
            <p>Don't have an API key? <a href="https://docs.perplexity.ai/docs/getting-started" target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Get one from Perplexity</a></p>
          </div>
        </div>
        
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button variant="outline" onClick={handleClear}>Clear Key</Button>
          <div className="space-x-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Key</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ApiKeyModal;
