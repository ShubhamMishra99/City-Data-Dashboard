import React from 'react';
import { Menu, Bell, Moon, Sun, BarChart2 } from 'lucide-react';

interface HeaderProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  return (
    <header className="h-16 bg-white dark:bg-gray-900 shadow-sm flex items-center justify-between px-4 transition-colors duration-200">
      <div className="flex items-center">
        <button 
          onClick={toggleSidebar} 
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 md:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
        </button>
        
        <div className="flex items-center">
          <BarChart2 className="h-7 w-7 text-blue-700 dark:text-blue-500 mr-2" />
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">CityPulse Dashboard</h1>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <button 
          onClick={toggleDarkMode} 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
          aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {isDarkMode ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
        
        <button 
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 relative"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-gray-700 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-teal-500 flex items-center justify-center text-white font-medium">
          CM
        </div>
      </div>
    </header>
  );
};

export default Header;