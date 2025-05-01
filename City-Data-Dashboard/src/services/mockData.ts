import { CityData, DataPoint, GeographicDataPoint } from '../types';

// Helper to generate random data points
const generateDataPoints = (count: number, min: number, max: number): DataPoint[] => {
  const now = new Date();
  const result: DataPoint[] = [];
  
  for (let i = 0; i < count; i++) {
    const date = new Date(now);
    
    // Adjust date based on the index
    if (count <= 24) { // Hourly data for daily view
      date.setHours(date.getHours() - i);
    } else if (count <= 7) { // Daily data for weekly view
      date.setDate(date.getDate() - i);
    } else if (count <= 30) { // Daily data for monthly view
      date.setDate(date.getDate() - i);
    } else { // Monthly data for yearly view
      date.setMonth(date.getMonth() - i);
    }
    
    result.push({
      timestamp: date.toISOString(),
      value: min + Math.random() * (max - min)
    });
  }
  
  return result.reverse(); // Chronological order
};

// Generate geographic data points
const generateGeographicData = (count: number, min: number, max: number): GeographicDataPoint[] => {
  const neighborhoods = [
    { id: '1', name: 'Downtown', lat: 40.7128, lng: -74.006 },
    { id: '2', name: 'Midtown', lat: 40.7549, lng: -73.9840 },
    { id: '3', name: 'Uptown', lat: 40.8032, lng: -73.9472 },
    { id: '4', name: 'Brooklyn Heights', lat: 40.6957, lng: -73.9938 },
    { id: '5', name: 'Williamsburg', lat: 40.7206, lng: -73.9598 },
    { id: '6', name: 'Queens', lat: 40.7282, lng: -73.7949 },
    { id: '7', name: 'Bronx', lat: 40.8448, lng: -73.8648 },
    { id: '8', name: 'Staten Island', lat: 40.5795, lng: -74.1502 }
  ];
  
  return neighborhoods.slice(0, count).map(neighborhood => ({
    ...neighborhood,
    value: min + Math.random() * (max - min)
  }));
};

// Function to generate mock city data
export const generateMockCityData = (): CityData => {
  return {
    water: {
      currentUsage: 65 + Math.random() * 20,
      dailyData: generateDataPoints(24, 50, 90),
      weeklyData: generateDataPoints(7, 55, 85),
      monthlyData: generateDataPoints(30, 50, 90),
      yearlyData: generateDataPoints(12, 45, 95),
      geographicData: generateGeographicData(8, 40, 100)
    },
    traffic: {
      congestionLevel: 40 + Math.random() * 40,
      dailyData: generateDataPoints(24, 20, 90),
      weeklyData: generateDataPoints(7, 30, 80),
      monthlyData: generateDataPoints(30, 25, 85),
      yearlyData: generateDataPoints(12, 20, 90),
      geographicData: generateGeographicData(8, 10, 100)
    },
    airQuality: {
      currentIndex: 30 + Math.random() * 40,
      dailyData: generateDataPoints(24, 20, 80),
      weeklyData: generateDataPoints(7, 25, 75),
      monthlyData: generateDataPoints(30, 20, 80),
      yearlyData: generateDataPoints(12, 15, 85),
      geographicData: generateGeographicData(8, 10, 90)
    },
    publicTransport: {
      onTimePercentage: 60 + Math.random() * 35,
      dailyData: generateDataPoints(24, 50, 100),
      weeklyData: generateDataPoints(7, 55, 95),
      monthlyData: generateDataPoints(30, 50, 100),
      yearlyData: generateDataPoints(12, 45, 100),
      geographicData: generateGeographicData(8, 40, 100)
    },
    lastUpdated: new Date().toISOString()
  };
};

// Function to simulate real-time data updates
let mockData = generateMockCityData();

export const fetchCityData = (): Promise<CityData> => {
  return new Promise(resolve => {
    // Simulate API delay
    setTimeout(() => {
      // Occasionally regenerate all data to simulate refresh
      if (Math.random() > 0.7) {
        mockData = generateMockCityData();
      } else {
        // Otherwise just update current values with small changes
        mockData.water.currentUsage = Math.max(50, Math.min(90, mockData.water.currentUsage + (Math.random() * 10 - 5)));
        mockData.traffic.congestionLevel = Math.max(20, Math.min(90, mockData.traffic.congestionLevel + (Math.random() * 8 - 4)));
        mockData.airQuality.currentIndex = Math.max(20, Math.min(80, mockData.airQuality.currentIndex + (Math.random() * 6 - 3)));
        mockData.publicTransport.onTimePercentage = Math.max(60, Math.min(100, mockData.publicTransport.onTimePercentage + (Math.random() * 5 - 2.5)));
        mockData.lastUpdated = new Date().toISOString();
      }
      
      resolve({...mockData});
    }, 500);
  });
};