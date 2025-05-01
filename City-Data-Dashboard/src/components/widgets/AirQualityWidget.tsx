import React, { useState } from 'react';
import { Wind } from 'lucide-react';
import Widget from '../ui/Widget';
import TimeframeSelector from '../ui/TimeframeSelector';
import LineChart from '../charts/LineChart';
import MapChart from '../charts/MapChart';
import StatCard from '../ui/StatCard';
import { TimeFrame, AirQualityData } from '../../types';

interface AirQualityWidgetProps {
  data: AirQualityData;
}

const AirQualityWidget: React.FC<AirQualityWidgetProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<TimeFrame>('daily');
  
  // Calculate change percentage compared to previous period
  const getChangePercentage = () => {
    const timeframeData = data[`${timeframe}Data`];
    if (timeframeData.length < 2) return 0;
    
    const current = timeframeData[timeframeData.length - 1].value;
    const previous = timeframeData[0].value;
    
    return ((current - previous) / previous) * 100;
  };
  
  // Get data for the selected timeframe
  const getTimeframeData = () => {
    return data[`${timeframe}Data`];
  };
  
  // Get air quality status
  const getAirQualityStatus = (value: number) => {
    if (value <= 30) return 'Good';
    if (value <= 50) return 'Moderate';
    if (value <= 70) return 'Unhealthy for Sensitive Groups';
    return 'Unhealthy';
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatCard
        title="Air Quality Index"
        value={data.currentIndex}
        unit="AQI"
        change={getChangePercentage()}
        icon={<Wind className="h-5 w-5 text-white" />}
        color="bg-teal-500/10 text-teal-500"
      />
      
      <div className="lg:col-span-2">
        <Widget title="Air Quality Trend">
          <div className="mb-4 flex justify-between items-center">
            <TimeframeSelector
              activeTimeframe={timeframe}
              onChange={setTimeframe}
            />
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Status: <span className="text-teal-500">{getAirQualityStatus(data.currentIndex)}</span>
            </div>
          </div>
          <LineChart
            data={getTimeframeData()}
            timeframe={timeframe}
            color="#0d9488"
            height={250}
          />
        </Widget>
      </div>
      
      <div className="lg:col-span-3">
        <Widget title="Air Quality by District">
          <MapChart
            data={data.geographicData}
            color="#0d9488"
            title="Air Quality Index"
          />
        </Widget>
      </div>
    </div>
  );
};

export default AirQualityWidget;