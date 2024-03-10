import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from "chart.js";
ChartJS.register(...registerables);

const donationCollectionData = {
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
      label: "Donation Collection",
      data: [
        5000, 6000, 5500, 7000, 8000, 7500, 9000, 9500, 8500, 10000, 10500,
        11000,
      ],
      backgroundColor: "rgba(75, 192, 192, 0.5)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
  ],
};

function DonationCollection() {
  return (
    <div className="bg-white shadow rounded-xl">
      <h2 className="bg-blue-700 text-white px-5 rounded-t-xl">
        Donation Stats
      </h2>
      <Bar data={donationCollectionData} />
    </div>
  );
}

export default DonationCollection;
