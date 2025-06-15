import React, { useState, useEffect } from "react";
import { Home as ExploreIcon, BookOpen as KnowledgeHubIcon, Users as CommunityIcon, GraduationCap as MyCoursesIcon, MessageSquare as MessagesIcon, User as ProfileIcon, Settings as AccountIcon } from "lucide-react";

export default function LeftNav() {
  const [siteName, setSiteName] = useState<string>("Loading...");

  useEffect(() => {
    const fetchSiteName = async () => {
      try {
        const response = await fetch("/api/site-info");
        const data = await response.json();
        setSiteName(data.siteName);
      } catch (error) {
        console.error("Failed to fetch site name:", error);
        setSiteName("Forumnex"); // Fallback in case of error
      }
    };

    fetchSiteName();
  }, []);

  const handleNavItemClick = (itemName: string) => {
    console.log(`Navigating to: ${itemName}`);
    // In a real application, you would use a router here
  };

  const handleInviteFriendClick = () => {
    console.log("Invite friend button clicked!");
    // In a real application, this would trigger an invite flow
  };

  const navItems = [
    {
      section: "LEARN",
      items: [
        { name: "Explore", href: "#", icon: ExploreIcon },
        { name: "Knowledge hub", href: "#", icon: KnowledgeHubIcon },
        { name: "Community", href: "#", icon: CommunityIcon },
      ],
    },
    {
      section: "MY STUFF",
      items: [
        { name: "My courses", href: "#", icon: MyCoursesIcon },
        { name: "Messages", href: "#", icon: MessagesIcon },
        { name: "Profile", href: "#", icon: ProfileIcon },
        { name: "Account", href: "#", icon: AccountIcon },
      ],
    },
  ];

  return (
    <div className="w-64 bg-[#1A1A1A] text-foreground py-4 px-6 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold text-primary mb-8">{siteName}</h1>

        {navItems.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase mb-4">
              {section.section}
            </h2>
            <nav>
              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="mb-3">
                    <a
                      href={item.href}
                      className="flex items-center text-muted-foreground hover:text-primary transition-colors duration-200"
                      onClick={() => handleNavItemClick(item.name)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        ))}
      </div>

      <div className="bg-background p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground mb-3">
          Invite a friend and you'll both get a month for free
        </p>
        <button 
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          onClick={handleInviteFriendClick}
        >
          Invite a friend
        </button>
      </div>
    </div>
  );
}
