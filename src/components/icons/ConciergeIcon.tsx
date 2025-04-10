
import React from "react";

interface ConciergeIconProps {
  className?: string;
}

export const ConciergeIcon: React.FC<ConciergeIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M18 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Z" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 8h.01" />
      <path d="M16 8h.01" />
      <path d="M12 16a4 4 0 0 0 4-4" />
      <path d="M8 12a4 4 0 0 0 4 4" />
    </svg>
  );
};
