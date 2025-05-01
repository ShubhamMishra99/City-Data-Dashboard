import React from 'react';
import { TimeFrame } from '../../types';

interface TimeframeSelectorProps {
  activeTimeframe: TimeFrame;
  onChange: (timeframe: TimeFrame) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ activeTimeframe, onChange }) => {
  const timeframes: { value: TimeFrame; label: string }[] = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'yearly', label: 'Yearly' },
  ];

  return (
    <div className="inline-flex items-center rounded-md overflow-hidden border border-gray-200 dark:border-gray-700">
      {timeframes.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => onChange(value)}
          className={`px-3 py-1.5 text-sm font-medium transition-colors duration-200 ${
            activeTimeframe === value
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default TimeframeSelector;