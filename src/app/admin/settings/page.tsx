"use client";

import React, { useState } from 'react';
import { Save, Settings, Shield, Palette } from 'lucide-react';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [siteTitle, setSiteTitle] = useState('My Forum');
  const [allowRegistrations, setAllowRegistrations] = useState(true);
  const [themeColor, setThemeColor] = useState('#3B82F6'); // Default to blue-500

  const handleSave = () => {
    // In a real application, you would send this data to an API
    console.log('Saving settings:', {
      siteTitle,
      allowRegistrations,
      themeColor,
    });
    alert('Settings saved!');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="mt-2 text-sm text-gray-600">
          Configure your forum settings.
        </p>

        <div className="mt-8 bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6 pt-4" aria-label="Tabs">
              <button
                onClick={() => setActiveTab('general')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'general'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Settings className="w-5 h-5 inline-block mr-2" />
                General
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'security'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shield className="w-5 h-5 inline-block mr-2" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('appearance')}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'appearance'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Palette className="w-5 h-5 inline-block mr-2" />
                Appearance
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'general' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="site-title" className="block text-sm font-medium text-gray-700">
                      Site Title
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="site-title"
                        id="site-title"
                        className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md"
                        value={siteTitle}
                        onChange={(e) => setSiteTitle(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700">User Registrations</span>
                    <div className="mt-2 flex items-center">
                      <button
                        onClick={() => setAllowRegistrations(!allowRegistrations)}
                        type="button"
                        className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${
                          allowRegistrations ? 'bg-primary' : 'bg-gray-200'
                        }`}
                        role="switch"
                        aria-checked={allowRegistrations}
                      >
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${
                            allowRegistrations ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                      <span className="ml-3 text-sm text-gray-500">
                        {allowRegistrations ? 'Allow new user registrations' : 'Disable new user registrations'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Security Settings</h2>
                <p className="text-gray-700">Security options will be configured here.</p>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Appearance Settings</h2>
                <div className="space-y-6">
                  <div>
                    <label htmlFor="theme-color" className="block text-sm font-medium text-gray-700">
                      Primary Theme Color
                    </label>
                    <div className="mt-1">
                      <input
                        type="color"
                        name="theme-color"
                        id="theme-color"
                        className="p-1 h-10 w-14 block bg-white border border-gray-300 cursor-pointer rounded-md focus:ring-primary focus:border-primary"
                        value={themeColor}
                        onChange={(e) => setThemeColor(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex justify-end">
              <button
                onClick={handleSave}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                <Save className="w-5 h-5 mr-2" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 