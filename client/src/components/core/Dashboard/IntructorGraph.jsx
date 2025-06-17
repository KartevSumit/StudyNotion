import React, { useState } from 'react';

import { Chart, registerables } from 'chart.js';
import { Pie } from 'react-chartjs-2';

Chart.register(...registerables);

function IntructorGraph({ data }) {
  const [chartMode, setChartMode] = useState(true);
  const RandomColors = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const chartDataForStudents = {
    labels: data.map((item) => item.courseName),
    datasets: [
      {
        data: data.map((item) => item.totalStudents),
        backgroundColor: data.map(() => RandomColors()),
        borderColor: 'white',
        borderWidth: 2,
      },
    ],
  };

  const chartDataForIncome = {
    labels: data.map((item) => item.courseName),
    datasets: [
      {
        data: data.map((item) => item.totalRevenue),
        backgroundColor: data.map(() => RandomColors()),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: 5,
    },
    plugins: {
      legend: {
        align: 'center',
        labels: {
          boxWidth: 12,
          font: {
            size: 16,
            weight: '500',
          },
          usePointStyle: true,
          pointStyle: 'circle',
          
        },
      },
      datalabels: {
        color: '#fff',
        font: {
          size: 16,
          weight: 'bold',
        },
        formatter: (value) => value,
      },
    },
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <h1 className="text-2xl text-richblack-5">Visualize</h1>
      <div className="w-fit flex gap-3 p-2 rounded-full bg-richblack-700">
        <button
          className={`${
            chartMode ? 'text-yellow-50 font-semibold' : ''
          } p-1 px-2 rounded-full`}
          onClick={() => setChartMode(true)}
        >
          Students
        </button>
        <button
          className={`${
            !chartMode ? 'text-yellow-50 font-semibold' : ''
          } p-1 px-2 rounded-full`}
          onClick={() => setChartMode(false)}
        >
          Income
        </button>
      </div>
      <div className="h-[30%] mx-auto">
        <Pie data={chartMode ? chartDataForStudents : chartDataForIncome} options={options}></Pie>
      </div>
    </div>
  );
}

export default IntructorGraph;
