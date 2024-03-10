import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChantingDistribution = ({ data }) => {
  const chantingData = [
    { rounds: 16, count: 18 },
    { rounds: 8, count: 7 },
    { rounds: 5, count: 12 },
    { rounds: 10, count: 20 },
    { rounds: 3, count: 5 },
    { rounds: 15, count: 25 },
    { rounds: 12, count: 14 },
    { rounds: 2, count: 3 },
    { rounds: 7, count: 10 },
    { rounds: 4, count: 8 },
    // Add more data as needed
  ];
  // Extract labels and counts from the data array
  const labels = chantingData.map((entry) => `${entry.rounds} Rounds`);
  const counts = chantingData.map((entry) => entry.count);

  // Data for the chart
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: counts,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66ff66",
          "#66b3ff",
          "#ff66b3",
          "#cc9966",
          "#cccc00",
          "#993333",
          "#663300",
          // Add more colors as needed
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66ff66",
          "#66b3ff",
          "#ff66b3",
          "#cc9966",
          "#cccc00",
          "#993333",
          "#663300",
          // Add more colors as needed
        ],
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    legend: {
      display: true,
      position: "bottom",
    },
    title: {
      display: true,
      text: "Chanting Rounds Distribution",
    },
  };

  return (
    <div className="bg-white shadow rounded-xl">
      <h2 className="bg-blue-700 text-white px-5 rounded-t-xl">
        {" "}
        chanting statistics
      </h2>
      <Pie data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChantingDistribution;
