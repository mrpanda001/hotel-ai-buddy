
import { toast } from "sonner";
import {
  hotel,
  roomServiceMenu,
  localAttractions,
  hotelServices,
  faq,
  responseCategories
} from "../utils/mockData";

export interface Message {
  id: string;
  type: "user" | "bot";
  content: string | JSX.Element;
  timestamp: string;
  category?: string;
  isLoading?: boolean;
}

// Helper function to generate a unique ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
};

// Process user messages and generate appropriate responses
export const processMessage = async (message: string): Promise<Message> => {
  // Convert message to lowercase for easier matching
  const messageLower = message.toLowerCase();
  
  // Simulate API request delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  try {
    // Determine the category of the message
    const category = determineCategory(messageLower);
    
    // Generate response based on the category
    const response = generateResponse(messageLower, category);
    
    return {
      id: generateId(),
      type: "bot",
      content: response,
      timestamp: new Date().toISOString(),
      category
    };
  } catch (error) {
    console.error("Error processing message:", error);
    toast.error("Sorry, I couldn't process your request");
    
    return {
      id: generateId(),
      type: "bot",
      content: "I apologize, but I'm having trouble processing your request right now. Please try again or contact the front desk for immediate assistance.",
      timestamp: new Date().toISOString(),
      category: "general"
    };
  }
};

// Determine the category of the user's message
const determineCategory = (message: string): string => {
  // Keywords for each category
  const keywords = {
    "room-service": ["food", "eat", "hungry", "breakfast", "lunch", "dinner", "menu", "order", "room service", "drink", "beverage"],
    "local-recommendations": ["visit", "see", "tour", "attraction", "place", "go", "recommend", "nearby", "local", "restaurant", "shop", "mall"],
    "hotel-services": ["service", "spa", "gym", "pool", "fitness", "business", "laundry", "housekeeping", "concierge", "towel", "clean"],
    "faq": ["check-out", "checkout", "check out", "wifi", "parking", "breakfast time", "check-in", "checkin", "check in", "airport", "shuttle"]
  };
  
  // Check each category
  for (const [category, categoryKeywords] of Object.entries(keywords)) {
    if (categoryKeywords.some(keyword => message.includes(keyword))) {
      return category;
    }
  }
  
  // Default to general if no specific category is matched
  return "general";
};

// Generate response based on the category and user message
const generateResponse = (message: string, category: string): string => {
  switch (category) {
    case "room-service":
      return handleRoomServiceQuery(message);
    
    case "local-recommendations":
      return handleLocalRecommendationsQuery(message);
    
    case "hotel-services":
      return handleHotelServicesQuery(message);
    
    case "faq":
      return handleFaqQuery(message);
    
    default:
      return handleGeneralQuery(message);
  }
};

// Handle room service related queries
const handleRoomServiceQuery = (message: string): string => {
  if (message.includes("menu") || message.includes("what") || message.includes("options")) {
    const menuItems = roomServiceMenu.map(category => {
      const items = category.items.map(item => `${item.name} ($${item.price})`).join(", ");
      return `${category.category}: ${items}`;
    }).join("\n\n");
    
    return `Here's our room service menu:\n\n${menuItems}\n\nTo order, please let me know which items you'd like and any special requests.`;
  } 
  
  if (message.includes("order")) {
    return "To place an order, please specify the items you would like from our menu. Your order will be delivered to your room within 30-45 minutes.";
  }
  
  if (message.includes("time") || message.includes("hours")) {
    return "Room service is available 24 hours a day. Our full menu is available from 6:00 AM to 11:00 PM, and a limited overnight menu is available from 11:00 PM to 6:00 AM.";
  }
  
  return "Our room service offers a variety of dining options delivered directly to your room. Would you like to see our menu, place an order, or have any other questions about our food and beverage options?";
};

// Handle local recommendations queries
const handleLocalRecommendationsQuery = (message: string): string => {
  if (message.includes("restaurant") || message.includes("food") || message.includes("eat")) {
    return "There are several excellent restaurants nearby. Some popular options include:\n\n" +
      "1. Sky on 57 - Fine dining with panoramic views (0.3 km)\n" +
      "2. Satay by the Bay - Local street food in an outdoor setting (1.0 km)\n" +
      "3. Violet Oon - Authentic Singaporean cuisine (0.7 km)\n" +
      "4. Waku Ghin - Japanese-inspired tasting menu (0.4 km)\n\n" +
      "Would you like me to arrange a reservation for any of these restaurants?";
  }
  
  if (message.includes("shop") || message.includes("mall") || message.includes("shopping")) {
    return "For shopping, I recommend:\n\n" +
      "1. The Shoppes at Marina Bay Sands - Luxury shopping mall (0.5 km)\n" +
      "2. Orchard Road - Singapore's premier shopping district (3.2 km by taxi)\n" +
      "3. Raffles City Shopping Centre - Mixed retail (1.8 km)\n" +
      "4. Bugis Street - Bargain shopping and street market (2.5 km)\n\n" +
      "Our concierge can provide you with directions to any of these locations.";
  }
  
  // Default response for attractions
  const attractionsList = localAttractions.map(attraction => 
    `${attraction.name} (${attraction.distance}) - ${attraction.description}`
  ).join("\n\n");
  
  return `Here are some popular attractions near our hotel:\n\n${attractionsList}\n\nWould you like more information about any of these places or assistance with tickets?`;
};

// Handle hotel services queries
const handleHotelServicesQuery = (message: string): string => {
  // Check for specific service inquiries
  for (const service of hotelServices) {
    if (message.includes(service.name.toLowerCase())) {
      return `${service.name}: ${service.description}. Would you like to schedule this service or learn more about it?`;
    }
  }
  
  // Handle requests for towels, cleaning, etc.
  if (message.includes("towel") || message.includes("extra")) {
    return "I'd be happy to arrange for extra towels to be delivered to your room. How many would you like, and when would you prefer them delivered?";
  }
  
  if (message.includes("clean") || message.includes("housekeeping")) {
    return "Housekeeping service is provided daily between 8:00 AM and 8:00 PM. If you would like to request housekeeping at a specific time or have special requests, please let me know.";
  }
  
  // Default response listing available services
  const servicesList = hotelServices.map(service => 
    `${service.name} - ${service.description}`
  ).join("\n\n");
  
  return `Here are the services available at our hotel:\n\n${servicesList}\n\nCan I help you schedule any of these services?`;
};

// Handle FAQ queries
const handleFaqQuery = (message: string): string => {
  // Check for matches with FAQ questions
  for (const item of faq) {
    const questionLower = item.question.toLowerCase();
    if (message.includes(questionLower) || 
        questionLower.split(' ').some(word => message.includes(word) && word.length > 3)) {
      return item.answer;
    }
  }
  
  // Handle common specific questions that might not be in the FAQ
  if (message.includes("breakfast") && (message.includes("time") || message.includes("when") || message.includes("hour"))) {
    return "Breakfast is served in our main restaurant, Azure Dining, from 6:30 AM to 10:30 AM on weekdays and until 11:00 AM on weekends.";
  }
  
  if (message.includes("wifi") || message.includes("internet") || message.includes("connection")) {
    return "Complimentary Wi-Fi is available throughout the hotel. Connect to 'Grand Azure Wi-Fi' and enter your room number and last name to access.";
  }
  
  // Default response with common FAQs
  const faqList = faq.map(item => 
    `Q: ${item.question}\nA: ${item.answer}`
  ).slice(0, 3).join("\n\n");
  
  return `Here are some frequently asked questions:\n\n${faqList}\n\nDo you have any other questions about your stay?`;
};

// Handle general queries
const handleGeneralQuery = (message: string): string => {
  if (message.includes("hello") || message.includes("hi") || message.includes("hey") || message === "hi" || message === "hello") {
    return `Hello! Welcome to ${hotel.name}. How can I assist you today? You can ask about room service, local attractions, hotel amenities, or any other questions about your stay.`;
  }
  
  if (message.includes("thank")) {
    return "You're welcome! It's my pleasure to assist you. Is there anything else I can help you with?";
  }
  
  if (message.includes("goodbye") || message.includes("bye")) {
    return "Thank you for chatting with me. Enjoy your stay at Grand Azure Hotel & Spa! If you need anything else, I'm available 24/7.";
  }
  
  if (message.includes("help") || message.includes("how") || message.includes("what can you")) {
    return "I can help you with various aspects of your stay, including:\n\n" +
      "- Ordering room service\n" +
      "- Providing information about hotel amenities\n" +
      "- Recommending local attractions and restaurants\n" +
      "- Answering questions about hotel policies\n" +
      "- Scheduling services like housekeeping or spa appointments\n\n" +
      "Just let me know what you need assistance with!";
  }
  
  return "I'm here to help make your stay at Grand Azure Hotel & Spa as comfortable as possible. Can you provide more details about what you're looking for? You can ask about room service, local recommendations, hotel amenities, or any other services.";
};
