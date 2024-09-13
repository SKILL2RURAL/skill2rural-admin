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
  const successData = {
    labels: ['Successful Quiz Response'],
    datasets: [
      {
        label: 'Quiz Response',
        data: [70, 30], // The percentage values (70% success, 30% remainder)
        backgroundColor: ['#008000', '#FFFFFF'], // Green for success, white for transparency
        // hoverBackgroundColor: ['#008000', '#ffffff'], // Hover colors
        borderWidth: 2,
        borderRadius: 10,
        cutout: '90%', // Donut hole size
      },
    ],
  };

  const failureData = {
    labels: ['Failure Quiz Response'],
    datasets: [
      {
        label: 'Quiz Response',
        data: [30, 70], // The percentage values (70% failure, 30% remainder)
        backgroundColor: ['#E71D36', '#FFFFFF'], // red for success, white for transparency
        // hoverBackgroundColor: ['#E71D36', '#ffffff'], // Hover colors
        borderWidth: 2,
        borderRadius: 10,
        cutout: '90%', // Donut hole size
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
        display: false, 
      },
    },
  };

  return (
    <div className='border p-5 rounded-[8px] w-fit shadow-md md:w-2/4'>
      <div className=''>
      <h4 className='text-[14px] font-[500px] text-[#A3AED0] leading-6'>Quiz Questions Success & Failure Rate</h4>
      <div className=''>
        <div className='flex gap-2 items-center'>
          <div className='w-3 h-3 rounded-[50%] bg-[#008000]'></div>
          <h3 className='text-sm'>Success Quiz Response</h3>
          <p className='text-sm text-[#008000] font-bold'>70%</p>
        </div>
        <div className='flex gap-2 items-center'>
          <div className='w-3 h-3 rounded-[50%] bg-[#E71D36]'></div>
          <h3 className='text-sm'>Failure Quiz Response</h3>
          <p className='text-sm text-[#E71D36] font-bold'>30%</p>
        </div>
      </div>
      <div className='relative inline-block w-full h-[400px]'>
        <Doughnut data={successData} options={options} />
        <div className='absolute top-[30px] left-[30px] w-[330px] h-[340px]'>
          <Doughnut data={failureData} options={options} />
        </div>
        <div className='text-[#2B3674] font-[500px] text-[32.46px] text-center absolute top-[35%] left-[15%] leading-10'>
          1.2k
          <div className='text[2.27px] font-semibold leading-3 text-[#A3AED0] text-center'>Total Quiz Attempt</div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SuccessFailureDonut;
