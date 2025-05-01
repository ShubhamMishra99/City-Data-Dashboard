import React, { useState } from 'react';
import { Train } from 'lucide-react';
import Widget from '../ui/Widget';
import TimeframeSelector from '../ui/TimeframeSelector';
import LineChart from '../charts/LineChart';
import MapChart from '../charts/MapChart';
import StatCard from '../ui/StatCard';
import { TimeFrame, PublicTransportData } from '../../types';

interface PublicTransportWidgetProps {
  data: PublicTransportData;
}

const PublicTransportWidget: React.FC<PublicTransportWidgetProps> = ({ data }) => {
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
        title="Public Transport On-Time"
        value={data.onTimePercentage}
        unit="%"
        change={getChangePercentage()}
        icon={<Train className="h-5 w-5 text-white" />}
        color="bg-purple-500/10 text-purple-500"
      />
      
      <div className="lg:col-span-2">
        <Widget title="Public Transport Performance">
          <div className="mb-4 flex justify-between items-center">
            <TimeframeSelector
              activeTimeframe={timeframe}
              onChange={setTimeframe}
            />
          </div>
          <LineChart
            data={getTimeframeData()}
            timeframe={timeframe}
            color="#8b5cf6"
            height={250}
          />
        </Widget>
      </div>
      
      <div className="lg:col-span-3">
        <Widget title="Public Transport Performance by District">
          <MapChart
            data={data.geographicData}
            color="#8b5cf6"
            title="On-Time Percentage"
          />
        </Widget>
      </div>
    </div>
  );
};

export default PublicTransportWidget;