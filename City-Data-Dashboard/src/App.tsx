import React, { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import DashboardOverview from './components/DashboardOverview';
import WaterWidget from './components/widgets/WaterWidget';
import TrafficWidget from './components/widgets/TrafficWidget';
import AirQualityWidget from './components/widgets/AirQualityWidget';
import PublicTransportWidget from './components/widgets/PublicTransportWidget';
import { CityData } from './types';
import { fetchCityData } from './services/mockData';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [activeSection, setActiveSection] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  // Fetch mock data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchCityData();
        setCityData(data);
      } catch (error) {
        console.error('Error fetching city data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();

    // Set up polling for real-time updates
    const intervalId = setInterval(loadData, 30000); // Update every 30 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Determine which content to show based on active section
  const renderContent = () => {
    if (!cityData) {
      return <div className="text-center py-12">Loading city data...</div>;
    }

    switch (activeSection) {
      case 'water':
        return <WaterWidget data={cityData.water} />;
      case 'traffic':
        return <TrafficWidget data={cityData.traffic} />;
      case 'airQuality':
        return <AirQualityWidget data={cityData.airQuality} />;
      case 'publicTransport':
        return <PublicTransportWidget data={cityData.publicTransport} />;
      case 'map':
        return (
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">City Map Overview</h2>
            <div className="h-[500px] bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 dark:text-gray-400">
              Interactive City Map would be displayed here
            </div>
          </div>
        );
      case 'overview':
      default:
        return <DashboardOverview data={cityData} />;
    }
  };

  // Loading state
  if (isLoading && !cityData) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        toggleSidebar={toggleSidebar} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      
      <main className={`transition-all duration-300 ease-in-out p-6 ${
        sidebarOpen ? 'md:ml-64' : ''
      } md:ml-64`}>
        <div className="container mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;