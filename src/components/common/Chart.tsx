import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ChartConfiguration } from 'chart.js/auto';

interface ChartProps {
  config: ChartConfiguration;
  height?: number;
}

const Chart: React.FC<ChartProps> = ({ config, height = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Destroy existing chart
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create new chart
    chartRef.current = new ChartJS(canvasRef.current, config);

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [config]);

  return (
    <div style={{ height }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Chart;