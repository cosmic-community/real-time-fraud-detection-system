'use client';

import { Bell, Search, Settings, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-dark-200 border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1 space-x-4">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search transactions, users, or alerts..."
              className="w-full pl-10 pr-4 py-2 bg-dark-100 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50"
            />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">
            {format(currentTime, 'PPpp')}
          </div>

          <button className="relative p-2 rounded-lg hover:bg-dark-100 transition-colors">
            <Bell className="w-5 h-5 text-gray-400" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <button className="p-2 rounded-lg hover:bg-dark-100 transition-colors">
            <Settings className="w-5 h-5 text-gray-400" />
          </button>

          <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-100 transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm text-gray-300">Admin</span>
          </button>
        </div>
      </div>
    </header>
  );
}