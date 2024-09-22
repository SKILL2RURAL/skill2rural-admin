'use client'
import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const BarChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: '',
        backgroundColor: '#60269E',
        borderColor: '',
        borderWidth: 1,
        borderRadius: 10,
        data: [180, 490, 70, 165, 1000, 200, 50, 500, 30, 120, 1000, 200],
      },
    ],
  };

  // const options = {
  //   scales: {
  //     y: {
  //       beginAtZero: false,
  //     },
  //   },
  // };

  const options = {
    plugins: {
      legend: {
        display: false
      }
    },
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 5
      },
      margin: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        border: { dash: [6, 6], display: true },
        grid: {
          display: false // Display grid lines for the y-axis
        },
        ticks: {
          padding: 15
        }
      },
      x: {
        beginAtZero: false,
        border: { display: true },
        grid: {
          display: false // Display grid lines for the y-axis
        },
        ticks: {
          padding: 7
        }
      }
    },
    elements: {
      bar: {
        borderRadius: 40,
        borderWidth: 0.7
      }
    }
  };
  return (
    <div className='md:w-[39vw] mt-7'>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;