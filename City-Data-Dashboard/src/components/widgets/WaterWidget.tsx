import React, { useState } from 'react';
import { Droplet } from 'lucide-react';
import Widget from '../ui/Widget';
import TimeframeSelector from '../ui/TimeframeSelector';
import LineChart from '../charts/LineChart';
import MapChart from '../charts/MapChart';
import StatCard from '../ui/StatCard';
import { TimeFrame, WaterData } from '../../types';

interface WaterWidgetProps {
  data: WaterData;
}

const WaterWidget: React.FC<WaterWidgetProps> = ({ data }) => {
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
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <StatCard
        title="Current Water Usage"
        value={data.currentUsage}
        unit="ML/day"
        change={getChangePercentage()}
        icon={<Droplet className="h-5 w-5 text-white" />}
        color="bg-blue-500/10 text-blue-500"
      />
      
      <div className="lg:col-span-2">
        <Widget title="Water Usage Trend">
          <div className="mb-4 flex justify-between items-center">
            <TimeframeSelector
              activeTimeframe={timeframe}
              onChange={setTimeframe}
            />
          </div>
          <LineChart
            data={getTimeframeData()}
            timeframe={timeframe}
            color="#3b82f6"
            height={250}
          />
        </Widget>
      </div>
      
      <div className="lg:col-span-3">
        <Widget title="Water Usage by District">
          <MapChart
            data={data.geographicData}
            color="#3b82f6"
            title="Water Usage (ML/day)"
          />
        </Widget>
      </div>
    </div>
  );
};

export default WaterWidget;