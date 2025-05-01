import React, { useState } from 'react';
import { Activity } from 'lucide-react';
import Widget from '../ui/Widget';
import TimeframeSelector from '../ui/TimeframeSelector';
import LineChart from '../charts/LineChart';
import MapChart from '../charts/MapChart';
import StatCard from '../ui/StatCard';
import { TimeFrame, TrafficData } from '../../types';

interface TrafficWidgetProps {
  data: TrafficData;
}

const TrafficWidget: React.FC<TrafficWidgetProps> = ({ data }) => {
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
        title="Traffic Congestion Level"
        value={data.congestionLevel}
        unit="%"
        change={getChangePercentage()}
        icon={<Activity className="h-5 w-5 text-white" />}
        color="bg-amber-500/10 text-amber-500"
      />
      
      <div className="lg:col-span-2">
        <Widget title="Traffic Congestion Trend">
          <div className="mb-4 flex justify-between items-center">
            <TimeframeSelector
              activeTimeframe={timeframe}
              onChange={setTimeframe}
            />
          </div>
          <LineChart
            data={getTimeframeData()}
            timeframe={timeframe}
            color="#f59e0b"
            height={250}
          />
        </Widget>
      </div>
      
      <div className="lg:col-span-3">
        <Widget title="Traffic Congestion by District">
          <MapChart
            data={data.geographicData}
            color="#f59e0b"
            title="Congestion Level (%)"
          />
        </Widget>
      </div>
    </div>
  );
};

export default TrafficWidget;