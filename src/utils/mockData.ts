
// Hotel information
export const hotel = {
  name: "Grand Azure Hotel & Spa",
  location: "Marina Bay, Singapore",
  phone: "+65 1234 5678",
  email: "concierge@grandazure.com",
  checkInTime: "3:00 PM",
  checkOutTime: "12:00 PM"
};

// Room service menu
export const roomServiceMenu = [
  {
    category: "Breakfast",
    items: [
      { name: "Continental Breakfast", description: "Assorted pastries, fresh fruit, yogurt", price: 24 },
      { name: "American Breakfast", description: "Eggs, bacon, toast, hash browns", price: 28 },
      { name: "Healthy Start", description: "Egg white omelet, avocado toast, fresh fruit", price: 26 }
    ]
  },
  {
    category: "All-Day Dining",
    items: [
      { name: "Club Sandwich", description: "Turkey, bacon, lettuce, tomato", price: 22 },
      { name: "Wagyu Burger", description: "Premium beef, brioche bun, truffle fries", price: 32 },
      { name: "Caesar Salad", description: "Romaine, parmesan, croutons", price: 18 }
    ]
  },
  {
    category: "Dinner",
    items: [
      { name: "Grilled Salmon", description: "Wild-caught salmon, seasonal vegetables", price: 38 },
      { name: "Filet Mignon", description: "8oz beef tenderloin, truffle mashed potatoes", price: 52 },
      { name: "Mushroom Risotto", description: "Arborio rice, wild mushrooms, parmesan", price: 30 }
    ]
  },
  {
    category: "Beverages",
    items: [
      { name: "Fresh Juice", description: "Orange, apple, or grapefruit", price: 10 },
      { name: "Coffee", description: "Freshly brewed or espresso", price: 8 },
      { name: "Wine by the Glass", description: "Selection of red or white", price: 15 }
    ]
  }
];

// Local attractions
export const localAttractions = [
  {
    name: "Marina Bay Sands",
    description: "Iconic integrated resort with shopping, dining, and observation deck",
    distance: "0.5 km",
    image: "marina-bay-sands.jpg"
  },
  {
    name: "Gardens by the Bay",
    description: "Nature park with Supertree Grove and Cloud Forest",
    distance: "1.2 km",
    image: "gardens-by-the-bay.jpg"
  },
  {
    name: "ArtScience Museum",
    description: "Museum featuring innovative exhibitions at the intersection of art and science",
    distance: "0.8 km",
    image: "artscience-museum.jpg"
  },
  {
    name: "Merlion Park",
    description: "Iconic statue and landmark of Singapore",
    distance: "1.5 km",
    image: "merlion-park.jpg"
  },
  {
    name: "Singapore Flyer",
    description: "Giant observation wheel offering panoramic views of the city",
    distance: "1.8 km",
    image: "singapore-flyer.jpg"
  }
];

// Common hotel services
export const hotelServices = [
  {
    name: "Housekeeping",
    description: "Daily room cleaning service available from 8:00 AM to 8:00 PM"
  },
  {
    name: "Concierge",
    description: "24-hour assistance for reservations, tickets, and recommendations"
  },
  {
    name: "Spa",
    description: "Full-service spa open from 10:00 AM to 9:00 PM"
  },
  {
    name: "Fitness Center",
    description: "State-of-the-art gym open 24 hours"
  },
  {
    name: "Swimming Pool",
    description: "Rooftop infinity pool open from 7:00 AM to 10:00 PM"
  },
  {
    name: "Business Center",
    description: "Available 24 hours with printing and computer services"
  },
  {
    name: "Laundry",
    description: "Same-day service available if requested before 9:00 AM"
  }
];

// Frequently asked questions
export const faq = [
  {
    question: "What time is check-out?",
    answer: "Check-out time is 12:00 PM. Late check-out may be available for an additional fee, subject to availability."
  },
  {
    question: "Where is breakfast served?",
    answer: "Breakfast is served in our main restaurant, Azure Dining, from 6:30 AM to 10:30 AM on weekdays and until 11:00 AM on weekends."
  },
  {
    question: "How do I connect to Wi-Fi?",
    answer: "Complimentary Wi-Fi is available throughout the hotel. Connect to 'Grand Azure Wi-Fi' and enter your room number and last name to access."
  },
  {
    question: "Is there parking available?",
    answer: "Yes, valet parking is available for $45 per day with in-and-out privileges. Self-parking is also available in the adjacent garage for $35 per day."
  },
  {
    question: "Can I request a late check-out?",
    answer: "Late check-out may be arranged based on availability. Please contact the front desk at least 24 hours before your departure to inquire."
  },
  {
    question: "Do you offer airport transportation?",
    answer: "Yes, we offer airport transfers for $60 one-way. Please contact the concierge to arrange at least 24 hours in advance."
  }
];

// Chat response categories
export const responseCategories = [
  "general",
  "room-service",
  "local-recommendations",
  "hotel-services",
  "faq"
];

// Initial welcome message
export const welcomeMessage = {
  id: "welcome-message",
  type: "bot",
  content: "Welcome to Grand Azure Hotel & Spa! I'm Azure, your AI concierge. How may I assist you today? You can ask me about room service, local attractions, hotel amenities, or any other questions you have during your stay.",
  timestamp: new Date().toISOString(),
  category: "general"
};
