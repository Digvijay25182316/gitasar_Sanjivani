import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const UserStatusGraph = () => {
  const data = {
    labels: ["Active", "Inactive"],
    datasets: [
      {
        label: "User Status",
        data: [200, 129],
        backgroundColor: [
          "rgba(54, 162, 235, 0.5)", // Blue for Active
          "rgba(255, 99, 132, 0.5)", // Red for Inactive
        ],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
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
          Active Users Count
        </h2>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default UserStatusGraph;
