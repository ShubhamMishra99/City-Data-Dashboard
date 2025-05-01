import React from 'react';
import { Droplet, Activity, Wind, Train, MapPin, Download, Settings, FileBarChart } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  onClose, 
  activeSection, 
  setActiveSection 
}) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: <FileBarChart /> },
    { id: 'water', label: 'Water Usage', icon: <Droplet /> },
    { id: 'traffic', label: 'Traffic', icon: <Activity /> },
    { id: 'airQuality', label: 'Air Quality', icon: <Wind /> },
    { id: 'publicTransport', label: 'Public Transport', icon: <Train /> },
    { id: 'map', label: 'City Map', icon: <MapPin /> },
  ];

  const handleNavigation = (id: string) => {
    setActiveSection(id);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out z-30 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-800">
          <div className="text-xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart2 className="h-6 w-6 text-blue-700 dark:text-blue-500 mr-2" />
            CityPulse
          </div>
        </div>
        
        <nav className="mt-6 px-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`flex items-center w-full p-3 rounded-lg transition-colors duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 font-medium'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <span className={`mr-3 ${
                activeSection === item.id
                  ? 'text-blue-700 dark:text-blue-400'
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>
        
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 p-4">
          <div className="space-y-1">
            <button
              className="flex items-center w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="mr-3 text-gray-500 dark:text-gray-400">
                <Download size={18} />
              </span>
              Export Data
            </button>
            <button
              className="flex items-center w-full p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              <span className="mr-3 text-gray-500 dark:text-gray-400">
                <Settings size={18} />
              </span>
              Settings
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

import { BarChart2 } from 'lucide-react';