"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Users, 
  FileText, 
  Settings, 
  Layout, 
  Package, 
  BarChart2,
  Plus,
  Edit,
  Trash2,
  ChevronRight
} from 'lucide-react';

interface Stats {
  totalMembers: number;
  totalPosts: number;
  onlineUsers: string;
}

interface RecentActivity {
  id: string;
  type: string;
  description: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/admin/activity')
        ]);
        
        if (statsRes.ok) {
          const statsData = await statsRes.json();
          setStats(statsData);
        }
        
        if (activityRes.ok) {
          const activityData = await activityRes.json();
          setRecentActivity(activityData);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const quickActions = [
    {
      title: 'Create Category',
      description: 'Add a new forum category',
      icon: <Plus className="w-6 h-6" />,
      href: '/admin/categories/new',
      color: 'bg-blue-500'
    },
    {
      title: 'Add Navigation Link',
      description: 'Add a new navigation item',
      icon: <Layout className="w-6 h-6" />,
      href: '/admin/nav-links/new',
      color: 'bg-green-500'
    },
    {
      title: 'Create Page',
      description: 'Add a new custom page',
      icon: <FileText className="w-6 h-6" />,
      href: '/admin/pages/new',
      color: 'bg-purple-500'
    },
    {
      title: 'Install Addon',
      description: 'Install a new addon',
      icon: <Package className="w-6 h-6" />,
      href: '/admin/addons/new',
      color: 'bg-orange-500'
    }
  ];

  const mainSections = [
    {
      title: 'Forum Management',
      items: [
        { name: 'Categories', href: '/admin/categories', icon: <Layout className="w-5 h-5" /> },
        { name: 'Navigation Links', href: '/admin/nav-links', icon: <Layout className="w-5 h-5" /> },
        { name: 'Custom Pages', href: '/admin/pages', icon: <FileText className="w-5 h-5" /> },
      ]
    },
    {
      title: 'User Management',
      items: [
        { name: 'Users', href: '/admin/users', icon: <Users className="w-5 h-5" /> },
        { name: 'Roles & Permissions', href: '/admin/roles', icon: <Settings className="w-5 h-5" /> },
      ]
    },
    {
      title: 'Content & Addons',
      items: [
        { name: 'Addons', href: '/admin/addons', icon: <Package className="w-5 h-5" /> },
        { name: 'Forum Statistics', href: '/admin/stats', icon: <BarChart2 className="w-5 h-5" /> },
      ]
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">Welcome to your forum administration panel</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Total Members</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats?.totalMembers || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-green-100 text-green-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Total Posts</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats?.totalPosts || 0}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                <Users className="w-6 h-6" />
              </div>
              <div className="ml-4">
                <h2 className="text-sm font-medium text-gray-600">Online Users</h2>
                <p className="text-2xl font-semibold text-gray-900">{stats?.onlineUsers || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link
                key={action.title}
                href={action.href}
                className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center">
                  <div className={`p-3 rounded-full ${action.color} text-white`}>
                    {action.icon}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-sm font-medium text-gray-900">{action.title}</h3>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mainSections.map((section) => (
            <div key={section.title} className="bg-white rounded-lg shadow">
              <div className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-4">{section.title}</h2>
                <div className="space-y-4">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center">
                        <div className="text-gray-500">{item.icon}</div>
                        <span className="ml-3 text-sm font-medium text-gray-900">{item.name}</span>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="divide-y divide-gray-200">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{activity.description}</p>
                      <p className="text-sm text-gray-500">{activity.timestamp}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {activity.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 