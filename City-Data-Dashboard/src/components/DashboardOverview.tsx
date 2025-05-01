import React from 'react';
import { CityData } from '../types';
import { Activity, Droplet, Train, Wind } from 'lucide-react';
import Widget from './ui/Widget';
import StatCard from './ui/StatCard';

interface DashboardOverviewProps {
  data: CityData;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ data }) => {
  const formatLastUpdated = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">City Dashboard Overview</h2>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {formatLastUpdated(data.lastUpdated)}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Water Usage"
          value={data.water.currentUsage}
          unit="ML/day"
          icon={<Droplet className="h-5 w-5 text-white" />}
          color="bg-blue-500/10 text-blue-500"
        />
        
        <StatCard
          title="Traffic Congestion"
          value={data.traffic.congestionLevel}
          unit="%"
          icon={<Activity className="h-5 w-5 text-white" />}
          color="bg-amber-500/10 text-amber-500"
        />
        
        <StatCard
          title="Air Quality Index"
          value={data.airQuality.currentIndex}
          unit="AQI"
          icon={<Wind className="h-5 w-5 text-white" />}
          color="bg-teal-500/10 text-teal-500"
        />
        
        <StatCard
          title="Public Transport On-Time"
          value={data.publicTransport.onTimePercentage}
          unit="%"
          icon={<Train className="h-5 w-5 text-white" />}
          color="bg-purple-500/10 text-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Widget title="Water Usage by District">
          <div className="h-64 bg-blue-50 dark:bg-blue-900/20 rounded-lg grid place-items-center">
            Water Usage Distribution Map
          </div>
        </Widget>
        
        <Widget title="Traffic Congestion Areas">
          <div className="h-64 bg-amber-50 dark:bg-amber-900/20 rounded-lg grid place-items-center">
            Traffic Congestion Distribution Map
          </div>
        </Widget>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <Widget title="City Performance Overview">
          <div className="p-4">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Water Management Efficiency</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">75%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Traffic Management</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">62%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-amber-500 h-2.5 rounded-full" style={{ width: '62%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Air Quality Management</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">83%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-teal-500 h-2.5 rounded-full" style={{ width: '83%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Public Transport Efficiency</span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">79%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div className="bg-purple-500 h-2.5 rounded-full" style={{ width: '79%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </Widget>
      </div>
    </div>
  );
};

export default DashboardOverview;