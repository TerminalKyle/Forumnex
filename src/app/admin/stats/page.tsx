"use client";

import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';

interface ForumStats {
  totalMembers: number;
  totalPosts: number;
  onlineUsers: string; // Keeping as string for placeholder, will change if real-time implemented
}

export default function ForumStatsPage() {
  const [stats, setStats] = useState<ForumStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/stats');
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: ForumStats = await response.json();
        setStats(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg">Loading forum stats...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-lg text-red-500">Error: {error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Forum Statistics</h1>
      <div className="bg-gray-800 rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center p-4 bg-gray-700 rounded-md">
          <p className="text-4xl font-bold text-primary">{stats?.totalMembers.toLocaleString() || 'N/A'}</p>
          <p className="text-lg text-gray-300">MEMBERS</p>
        </div>
        <div className="text-center p-4 bg-gray-700 rounded-md">
          <p className="text-4xl font-bold text-primary">{stats?.onlineUsers || 'N/A'}</p>
          <p className="text-lg text-gray-300">ONLINE</p>
        </div>
        <div className="text-center p-4 bg-gray-700 rounded-md">
          <p className="text-4xl font-bold text-primary">{stats?.totalPosts.toLocaleString() || 'N/A'}</p>
          <p className="text-lg text-gray-300">POSTS</p>
        </div>
      </div>
    </AdminLayout>
  );
} 