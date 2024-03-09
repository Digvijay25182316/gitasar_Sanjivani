import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ChantingGraph = () => {
  // Data for the chart
  const data = {
    labels: [`${`78%`}Chanting`, `${`22%`} Not Chanting`],
    datasets: [
      {
        data: [78, 47], // 78 people chanting out of 125, 47 people not chanting
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="bg-white shadow">
      <h2 className="bg-blue-700 text-white px-5">Chanting Statistics</h2>
      <Doughnut data={data} width={300} height={300} />
    </div>
  );
};

export default ChantingGraph;
