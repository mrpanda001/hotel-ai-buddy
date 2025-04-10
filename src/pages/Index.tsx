
import React from "react";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-hotel-primary">Hotel AI Smart Concierge</h1>
          <p className="text-gray-600 mt-2">Your personal assistant for room service and local recommendations</p>
        </div>
        
        <ChatInterface />
        
        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2025 Grand Azure Hotel & Spa. All rights reserved.</p>
          <p className="mt-1">Powered by AI Smart Concierge</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
