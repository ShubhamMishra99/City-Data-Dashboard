import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  unit: string;
  change?: number;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  value, 
  unit, 
  change = 0, 
  icon,
  color
}) => {
  // Format the value with specified precision
  const formatValue = (val: number) => {
    return val.toFixed(val >= 100 ? 0 : 1);
  };
  
  // Color mapping for trend indicators
  const getTrendColor = (val: number) => {
    if (title.includes('Air Quality') || title.includes('Traffic')) {
      // For these metrics, lower is better
      return val < 0 ? 'text-green-500' : 'text-red-500';
    }
    // For other metrics, higher is better
    return val > 0 ? 'text-green-500' : 'text-red-500';
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg p-5 shadow-md hover:shadow-lg transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
          <div className="flex items-baseline mt-1">
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              {formatValue(value)}
            </span>
            <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">{unit}</span>
          </div>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
      
      {change !== null && (
        <div className="flex items-center text-sm">
          {change > 0 ? (
            <ArrowUpRight size={16} className={getTrendColor(change)} />
          ) : (
            <ArrowDownRight size={16} className={getTrendColor(change)} />
          )}
          <span className={`ml-1 ${getTrendColor(change)}`}>
            {Math.abs(change).toFixed(1)}% from last period
          </span>
        </div>
      )}
    </div>
  );
};

export default StatCard;