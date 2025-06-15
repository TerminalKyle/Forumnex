"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Types
interface User {
  name: string;
  value: string;
  avatar: string;
}

interface NavItem {
  name: string;
  href: string;
  icon: string;
}

interface Topic {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  votes: number;
  comments: number;
  timeAgo: string;
}


export default function Home() {
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkSetupStatus() {
      try {
        const res = await fetch("/api/setup/status");
        const data = await res.json();
        setIsSetup(data.setupDone);
      } catch (error) {
        console.error("Failed to fetch setup status:", error);
        setIsSetup(false);
      } finally {
        setLoading(false);
      }
    }
    checkSetupStatus();
  }, []);

  if (loading) return <LoadingScreen />;
  if (!isSetup) return <SetupScreen />;

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full bg-card-background">
        <TopBar />
        <div className="flex">
          <LeftNav />
          <MainContent />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
