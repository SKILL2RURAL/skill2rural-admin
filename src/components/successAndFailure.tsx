'use client'
import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const SuccessFailureDonut: React.FC = () => {
  // Chart data
  const data = {
    labels: ['Successful Quiz Response', 'Failed Quiz Response'],
    datasets: [
      {
        label: 'Quiz Response',
        data: [70, 30], // The percentage values (70% success, 30% failure)
        backgroundColor: ['#32CD32', '#FF4C4C'], // Green for success, red for failure
        hoverBackgroundColor: ['#28a745', '#dc3545'], // Hover colors
        borderWidth: 2,
        cutout: '80%', // Donut hole size
      },
    ],
  };

  // Chart options
  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem: any) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true, // Use a dot instead of the box in the legend
        },
      },
    },
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto', textAlign: 'center' }}>
      <h4>Quiz Questions Success & Failure Rate</h4>
      <Doughnut data={data} options={options} />
      <div style={{ marginTop: '-80px', fontSize: '2em', fontWeight: 'bold' }}>
        1.2k
        <div style={{ fontSize: '0.5em', color: '#808080' }}>Total Quiz Attempt</div>
      </div>
    </div>
  );
};

export default SuccessFailureDonut;
