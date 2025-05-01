import React from 'react';
import { WidgetProps } from '../../types';

const Widget: React.FC<WidgetProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden transition-all duration-300 ${className}`}>
      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <h3 className="font-medium text-gray-800 dark:text-gray-200">{title}</h3>
      </div>
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};

export default Widget;