export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface GeographicDataPoint {
  id: string;
  name: string;
  lat: number;
  lng: number;
  value: number;
}

export interface WaterData {
  currentUsage: number;
  dailyData: DataPoint[];
  weeklyData: DataPoint[];
  monthlyData: DataPoint[];
  yearlyData: DataPoint[];
  geographicData: GeographicDataPoint[];
}

export interface TrafficData {
  congestionLevel: number;
  dailyData: DataPoint[];
  weeklyData: DataPoint[];
  monthlyData: DataPoint[];
  yearlyData: DataPoint[];
  geographicData: GeographicDataPoint[];
}

export interface AirQualityData {
  currentIndex: number;
  dailyData: DataPoint[];
  weeklyData: DataPoint[];
  monthlyData: DataPoint[];
  yearlyData: DataPoint[];
  geographicData: GeographicDataPoint[];
}

export interface PublicTransportData {
  onTimePercentage: number;
  dailyData: DataPoint[];
  weeklyData: DataPoint[];
  monthlyData: DataPoint[];
  yearlyData: DataPoint[];
  geographicData: GeographicDataPoint[];
}

export type TimeFrame = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface CityData {
  water: WaterData;
  traffic: TrafficData;
  airQuality: AirQualityData;
  publicTransport: PublicTransportData;
  lastUpdated: string;
}

export interface WidgetProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}