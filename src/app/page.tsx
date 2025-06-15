"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import LoadingScreen from "./components/LoadingScreen";
import SetupScreen from "./components/SetupScreen";
import TopBar from "./components/TopBar";
import LeftNav from "./components/LeftNav";
import MainContent from "./components/MainContent";
import RightPanel from "./components/RightPanel";

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
  const router = useRouter();
  const [isSetup, setIsSetup] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function checkSetupStatus() {
      try {
        const res = await fetch("/api/setup/status");
        const data = await res.json();
        if (mounted) {
          setIsSetup(data.setupDone);
          setLoading(false);
          
          // Redirect to setup if not done
          if (!data.setupDone) {
            router.push('/setup');
          }
        }
      } catch (error) {
        console.error("Failed to fetch setup status:", error);
        if (mounted) {
          setIsSetup(false);
          setLoading(false);
          router.push('/setup');
        }
      }
    }

    checkSetupStatus();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) return <LoadingScreen />;
  if (!isSetup) return <SetupScreen />;

  return (
    <div className="min-h-screen flex w-full h-full">
      <LeftNav />
      <div className="flex flex-col flex-1">
        <TopBar />
        <div className="flex flex-1">
          <MainContent className="flex-1" />
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
