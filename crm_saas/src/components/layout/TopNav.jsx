import React from 'react';
import { Bell } from 'lucide-react';

const TopNav = () => {
  return (
    <header className="bg-white border-b px-6 py-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold flex items-center">
          Personal Dashboard
        </h1>
        <div className="flex items-center space-x-4">
          <Bell className="w-5 h-5 text-gray-500" />
          <div className="w-8 h-8 rounded-full bg-gray-200"></div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;
