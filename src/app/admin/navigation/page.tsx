"use client";

import { useState, useEffect } from 'react';
import {
  Plus, 
  Search,
  Edit,
  Trash2,
  RefreshCw,
  ChevronUp,
  ChevronDown,
  Link as LinkIcon, // Renamed to avoid conflict with Next.js Link
  Layers as SectionIcon,
  ListOrdered,
  Type,
  Anchor
} from 'lucide-react';

interface NavLink {
  id: string;
  name: string;
  path: string;
  icon: string; // Storing icon name as string
  section: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

type SortableField = keyof NavLink;

export default function NavigationPage() {
  const [navLinks, setNavLinks] = useState<NavLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState<SortableField>('order');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNavLink, setCurrentNavLink] = useState<NavLink | null>(null);
  const [formState, setFormState] = useState<Omit<NavLink, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }>({ 
    name: '', 
    path: '', 
    icon: '', 
    section: '', 
    order: 0 
  });

  useEffect(() => {
    fetchNavLinks();
  }, []);

  const fetchNavLinks = async () => {
    try {
      setIsRefreshing(true);
      const response = await fetch('/api/nav-links');
      if (response.ok) {
        const data = await response.json();
        setNavLinks(data);
      }
    } catch (error) {
      console.error('Error fetching navigation links:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleSort = (field: SortableField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleAddNavLink = () => {
    setCurrentNavLink(null);
    setFormState({ name: '', path: '', icon: '', section: '', order: 0 });
    setIsModalOpen(true);
  };

  const handleEditNavLink = (navLink: NavLink) => {
    setCurrentNavLink(navLink);
    setFormState(navLink);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = currentNavLink ? 'PUT' : 'POST';
    const url = currentNavLink ? `/api/nav-links/${currentNavLink.id}` : '/api/nav-links';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        fetchNavLinks(); // Refresh the list
        setIsModalOpen(false);
      } else {
        console.error('Failed to save navigation link');
      }
    } catch (error) {
      console.error('Error saving navigation link:', error);
    }
  };

  const handleDeleteNavLink = async (navLinkId: string) => {
    if (confirm('Are you sure you want to delete this navigation link?')) {
      try {
        const response = await fetch(`/api/nav-links/${navLinkId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchNavLinks(); // Refresh the list
        } else {
          console.error('Failed to delete navigation link');
        }
      } catch (error) {
        console.error('Error deleting navigation link:', error);
      }
    }
  };

  const filteredNavLinks = navLinks
    .filter(navLink => 
      navLink.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      navLink.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
      navLink.section.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
      }
      return 0;
    });

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
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Navigation</h1>
            <p className="mt-2 text-sm text-gray-600">
              Manage your forum's main navigation links
            </p>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={fetchNavLinks}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <RefreshCw className={`w-5 h-5 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              onClick={handleAddNavLink}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Nav Link
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="p-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm"
                placeholder="Search navigation links..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Nav Links Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Name</span>
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('path')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Path</span>
                      {sortField === 'path' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Icon
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('section')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Section</span>
                      {sortField === 'section' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('order')}
                  >
                    <div className="flex items-center space-x-1">
                      <span>Order</span>
                      {sortField === 'order' && (
                        sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                      )}
                    </div>
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredNavLinks.map((navLink) => (
                  <tr key={navLink.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      <div className="flex items-center">
                        <Type className="h-5 w-5 text-gray-400 mr-2" />
                        {navLink.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Anchor className="h-5 w-5 text-gray-400 mr-2" />
                        {navLink.path}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{navLink.icon}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                        {navLink.section}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{navLink.order}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-3">
                        <button
                          onClick={() => handleEditNavLink(navLink)}
                          className="text-primary hover:text-primary/90"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteNavLink(navLink.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Empty State */}
        {filteredNavLinks.length === 0 && (
          <div className="text-center py-12">
            <LinkIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No navigation links found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new navigation link.
            </p>
            <div className="mt-6">
              <button
                onClick={handleAddNavLink}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Nav Link
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit NavLink Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              {currentNavLink ? 'Edit Navigation Link' : 'Add New Navigation Link'}
            </h3>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="path" className="block text-sm font-medium text-gray-700">Path</label>
                  <input
                    type="text"
                    name="path"
                    id="path"
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formState.path}
                    onChange={(e) => setFormState({ ...formState, path: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="icon" className="block text-sm font-medium text-gray-700">Icon Name</label>
                  <input
                    type="text"
                    name="icon"
                    id="icon"
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formState.icon}
                    onChange={(e) => setFormState({ ...formState, icon: e.target.value })}
                    placeholder="e.g., Home, Settings"
                  />
                  <p className="mt-2 text-xs text-gray-500">Refer to Lucide React icons for names.</p>
                </div>
                <div>
                  <label htmlFor="section" className="block text-sm font-medium text-gray-700">Section</label>
                  <input
                    type="text"
                    name="section"
                    id="section"
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formState.section}
                    onChange={(e) => setFormState({ ...formState, section: e.target.value })}
                    placeholder="e.g., Forum Management, User Management"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700">Order</label>
                  <input
                    type="number"
                    name="order"
                    id="order"
                    required
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                    value={formState.order}
                    onChange={(e) => setFormState({ ...formState, order: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-primary border border-transparent rounded-md shadow-sm hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Save Nav Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 