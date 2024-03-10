import React from "react";

const programs = [
  { name: "Gitasar Batch 6", totalAttendance: 40 },
  { name: "Gitasar Batch 10", totalAttendance: 38 },
  { name: "Gitasar Batch 12", totalAttendance: 36 },
  { name: "Gitasar Batch 14", totalAttendance: 31 },
  { name: "Gitasar Batch 2", totalAttendance: 30 },
  { name: "Gitasar Batch 4", totalAttendance: 35 },
];

function ActivePrograms() {
  return (
    <div className="bg-white shadow rounded-xl">
      <h2 className="bg-blue-700 text-white px-5 rounded-t-xl">
        Top 5 Active Programs With Attendance Count
      </h2>
      <div>
        <table className="border-collapse w-full">
          <thead>
            <tr>
              <th className="border-b border-gray-200 px-4 py-2 font-semibold">
                Program Name
              </th>
              <th className="border-b border-gray-200 px-4 py-2 font-semibold">
                Attendance Count
              </th>
            </tr>
          </thead>
          <tbody>
            {programs?.map((program, index) => (
              <tr key={index} className=" border-gray-200">
                <td className="border-b border-gray-200 px-4 py-2 text-center">
                  {program.name}
                </td>
                <td className="border-b border-gray-200 px-4 py-2 text-center">
                  {program.totalAttendance}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivePrograms;
