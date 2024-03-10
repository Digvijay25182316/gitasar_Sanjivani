import React from "react";
import { Line } from "react-chartjs-2";
const monthlyData = {
  January: 100,
  February: 120,
  March: 150,
  April: 180,
  May: 200,
  June: 220,
  July: 240,
  August: 260,
  September: 280,
  October: 300,
  November: 320,
  December: 340,
};

const MonthlyActiveDevoteesGraph = () => {
  // Extracting labels (months) and data (active devotee counts) from monthlyData object
  const labels = Object.keys(monthlyData);
  const data = Object.values(monthlyData);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Active Devotees",
        data: data,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="w-full">
      <div className="bg-white shadow rounded-xl">
        <h2 className="bg-blue-700 text-white px-5 rounded-t-xl">
          Monthly Active Devotees
        </h2>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
};

export default MonthlyActiveDevoteesGraph;
