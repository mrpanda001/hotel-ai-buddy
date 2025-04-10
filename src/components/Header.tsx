
import React from "react";
import { ConciergeIcon } from "./icons/ConciergeIcon";

const Header: React.FC = () => {
  return (
    <div className="bg-hotel-primary text-white p-4 flex items-center justify-between rounded-t-xl">
      <div className="flex items-center gap-3">
        <div className="bg-hotel-secondary rounded-full p-2">
          <ConciergeIcon className="h-6 w-6 text-hotel-primary" />
        </div>
        <div>
          <h1 className="font-semibold">Grand Azure Concierge</h1>
          <p className="text-xs text-white/70">Available 24/7 to assist you</p>
        </div>
      </div>
      <div className="flex items-center px-3 py-1 bg-hotel-primary/30 rounded-full text-xs">
        <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-2"></span>
        <span>Online</span>
      </div>
    </div>
  );
};

export default Header;
