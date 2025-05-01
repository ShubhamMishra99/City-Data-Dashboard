import React from 'react';
import { GeographicDataPoint } from '../../types';

interface MapChartProps {
  data: GeographicDataPoint[];
  color: string;
  title: string;
}

const MapChart: React.FC<MapChartProps> = ({ data, color, title }) => {
  // Find min/max values for the heatmap scale
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  
  // Calculate the opacity based on the value
  const getOpacity = (value: number) => {
    return 0.2 + ((value - minValue) / (maxValue - minValue)) * 0.8;
  };
  
  // Calculate size based on the value
  const getSize = (value: number) => {
    const minSize = 20;
    const maxSize = 50;
    return minSize + ((value - minValue) / (maxValue - minValue)) * (maxSize - minSize);
  };
  
  return (
    <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 rounded-lg relative overflow-hidden">
      {/* This would normally be an actual map implementation */}
      <div className="w-full h-full bg-blue-50 dark:bg-blue-900/20 grid place-items-center">
        <div className="relative w-full h-full">
          {/* City map background (placeholder) */}
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-700 text-lg font-medium">
            City Map Background
          </div>
          
          {/* Data points */}
          {data.map((point, index) => {
            // For demo purposes, positioning based on lat/lng mapped to the container
            const left = ((point.lng + 75) / 2) + '%';
            const top = ((90 - point.lat) / 2) + '%';
            const size = getSize(point.value);
            
            return (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 rounded-full cursor-pointer transition-all duration-300 hover:z-10"
                style={{
                  left,
                  top,
                  width: size,
                  height: size,
                  backgroundColor: color,
                  opacity: getOpacity(point.value),
                }}
                title={`${point.name}: ${point.value.toFixed(1)}`}
              >
                <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-white">
                  {point.value.toFixed(0)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Legend */}
      <div className="absolute bottom-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm text-xs">
        <div className="font-semibold mb-1 text-gray-700 dark:text-gray-300">{title}</div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.3 }}></div>
          <span className="text-gray-600 dark:text-gray-400">Low</span>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.6 }}></div>
          <span className="text-gray-600 dark:text-gray-400">Med</span>
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.9 }}></div>
          <span className="text-gray-600 dark:text-gray-400">High</span>
        </div>
      </div>
    </div>
  );
};

export default MapChart;