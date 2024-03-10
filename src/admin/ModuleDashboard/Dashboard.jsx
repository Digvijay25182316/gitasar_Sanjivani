import React from "react";
import ActivePrograms from "./ActivePrograms";
import ChantingGraph from "./ChantingDevotees";
import ChantingDistribution from "./ChantingDistribution";
import UserStatusGraph from "./UserStatusGraph";
import MonthlyActiveDevoteesGraph from "./MonthlyActiveStats";
import TempleSevaStats from "./TempleSevaStats";
import DonationCollection from "./DonationCollection";

function Dashboard() {
  return (
    <div>
      <p className="md:px-10 px-5 py-5 font-semibold text-xl text-gray-700">
        Sanjivani Programs Satistics
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-10 md:px-5 px-2">
        <ActivePrograms />
        <ChantingGraph />
        <ChantingDistribution />
        <UserStatusGraph />
        <MonthlyActiveDevoteesGraph />
        <TempleSevaStats />
        <DonationCollection />
      </div>
    </div>
  );
}

export default Dashboard;
