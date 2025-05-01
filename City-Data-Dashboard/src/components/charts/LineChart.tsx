import React, { useEffect, useRef } from 'react';
import { DataPoint, TimeFrame } from '../../types';

interface LineChartProps {
  data: DataPoint[];
  timeframe: TimeFrame;
  color: string;
  height: number;
}

const LineChart: React.FC<LineChartProps> = ({ data, timeframe, color, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Format date based on timeframe
  const formatDate = (dateString: string, timeframe: TimeFrame) => {
    const date = new Date(dateString);
    switch (timeframe) {
      case 'daily':
        return date.getHours() + ':00';
      case 'weekly':
        return date.toLocaleDateString('en-US', { weekday: 'short' });
      case 'monthly':
        return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
      case 'yearly':
        return date.toLocaleDateString('en-US', { month: 'short' });
      default:
        return dateString;
    }
  };

  useEffect(() => {
    if (!canvasRef.current || data.length === 0) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Find min and max values for scaling
    const values = data.map(d => d.value);
    const minValue = Math.min(...values) * 0.9; // Add some padding
    const maxValue = Math.max(...values) * 1.1;
    
    // Set chart dimensions
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Draw axes
    ctx.beginPath();
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.lineWidth = 1;
    
    // X-axis
    ctx.moveTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    
    // Y-axis
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw line
    if (data.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.lineJoin = 'round';
      
      // Move to first point
      const firstX = padding + (0 * chartWidth) / (data.length - 1);
      const firstY = padding + chartHeight - ((data[0].value - minValue) / (maxValue - minValue)) * chartHeight;
      ctx.moveTo(firstX, firstY);
      
      // Draw line to each subsequent point
      for (let i = 1; i < data.length; i++) {
        const x = padding + (i * chartWidth) / (data.length - 1);
        const y = padding + chartHeight - ((data[i].value - minValue) / (maxValue - minValue)) * chartHeight;
        ctx.lineTo(x, y);
      }
      
      ctx.stroke();
      
      // Draw area under the line
      ctx.lineTo(padding + chartWidth, canvas.height - padding);
      ctx.lineTo(padding, canvas.height - padding);
      ctx.closePath();
      ctx.fillStyle = `${color}20`; // Add transparency
      ctx.fill();
      
      // Draw points
      for (let i = 0; i < data.length; i++) {
        const x = padding + (i * chartWidth) / (data.length - 1);
        const y = padding + chartHeight - ((data[i].value - minValue) / (maxValue - minValue)) * chartHeight;
        
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      // Draw labels
      ctx.fillStyle = '#6b7280'; // gray-500
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      
      // X-axis labels (show a subset to avoid crowding)
      const labelStep = Math.max(1, Math.floor(data.length / 6));
      for (let i = 0; i < data.length; i += labelStep) {
        const x = padding + (i * chartWidth) / (data.length - 1);
        const formattedDate = formatDate(data[i].timestamp, timeframe);
        ctx.fillText(formattedDate, x, canvas.height - padding + 15);
      }
      
      // Y-axis labels
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      
      // Draw 5 evenly spaced y-axis labels
      for (let i = 0; i <= 5; i++) {
        const value = minValue + (i / 5) * (maxValue - minValue);
        const y = padding + chartHeight - (i / 5) * chartHeight;
        ctx.fillText(value.toFixed(0), padding - 10, y);
      }
    }
  }, [data, timeframe, color]);

  return (
    <div className="w-full relative">
      <canvas 
        ref={canvasRef} 
        height={height} 
        className="w-full"
      />
    </div>
  );
};

export default LineChart;