import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";

ChartJS.register(...registerables);

const templeSevaData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Temple Seva",
      data: [20, 25, 22, 28, 30, 26, 32, 33, 29, 35, 37, 40],
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

function TempleSevaStats() {
  return (
    <div className="bg-white shadow rounded-xl">
      <h2 className="bg-blue-700 text-white px-5 rounded-t-xl">
        Monthly Temple Seva
      </h2>
      <Line data={templeSevaData} />
    </div>
  );
}

export default TempleSevaStats;
