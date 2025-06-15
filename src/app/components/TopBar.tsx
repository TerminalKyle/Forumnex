import React from "react";
import { Bell } from "lucide-react";

export default function TopBar() {
  const handleBellClick = () => {
    console.log("Bell icon clicked!");
  };

  const handleProfileClick = () => {
    console.log("User profile clicked!");
  };

  return (
    <div className="flex items-center justify-end px-6 py-4 bg-card-background">
      <div className="flex items-center space-x-4">
        <Bell 
          className="w-6 h-6 text-muted-foreground cursor-pointer hover:text-primary transition-colors"
          onClick={handleBellClick}
        />
        <div 
          className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={handleProfileClick}
        >
          <img
            src="https://picsum.photos/seed/kaine/32/32"
            alt="User Avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-foreground font-semibold">Kaine Shutler</span>
        </div>
      </div>
    </div>
  );
}
