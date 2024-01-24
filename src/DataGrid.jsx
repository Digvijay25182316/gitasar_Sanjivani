import React, { useEffect, useState } from "react";
import { activitiesData } from "./data";
import FilterComponent from "./FilterComponent";
import { CSVLink } from "react-csv";

export default function DataGridDemo() {
  const [DataArr, setDataArr] = useState(activitiesData);
  const [queryArr, setQueryArr] = useState([]);

  function AddFilter(data) {
    setQueryArr((prev) => [...prev, data]);
  }
  useEffect(() => {
    const filterData = () => {
      if (queryArr.length > 0) {
        return DataArr.filter((item) => {
          return queryArr.every((query) => {
            return (
              item[Object?.keys(query)[0]] === query[Object?.keys(query)[0]]
            );
          });
        });
      }
    };
    setDataArr(
      filterData()?.length > 0 || filterData() ? filterData() : DataArr
    );
  }, [queryArr]);

  const csvData = [
    [
      "programName",
      "courseCode",
      "sessionName",
      "status",
      "typeofActivity",
      "phone",
      "LastName",
      "date",
      "endTime",
    ],
    ...DataArr.map(
      ({
        programName,
        courseCode,
        sessionName,
        status,
        typeofActivity,
        phone,
        LastName,
        date,
        endTime,
      }) => [
        LastName,
        programName,
        courseCode,
        sessionName,
        status,
        typeofActivity,
        phone,
        date,
        endTime,
      ]
    ),
  ];

  return (
    <div className="flex flex-col items-center py-5 min-w-screen">
      <div className="flex flex-col items-center my-5">
        <button
          className="px-5 py-1 bg-gray-600 text-white text-lg rounded-lg "
          onClick={() => {
            setDataArr(activitiesData);
            setQueryArr([]);
          }}
        >
          clear filter
        </button>
        <CSVLink
          className="my-3 bg-green-600 text-white px-4 py-1.5 rounded"
          filename="my-file.csv"
          data={csvData}
        >
          Export to CSV
        </CSVLink>
      </div>
      <div className="flex items-center overflow-x-scroll w-screen">
        <p className="text-red-500 md:px-5 px-2 w-max font-bold">
          current filters :{" "}
        </p>
        <div className="text-blue-700 flex items-center gap-5">
          {queryArr?.length > 0
            ? queryArr?.map((item, index) => (
                <p className="flex items-center gap-2">
                  {index + 1}.{Object.keys(item)[0]}
                </p>
              ))
            : 0}
        </div>
      </div>
      <div className="overflow-x-scroll w-screen">
        <table>
          <thead>
            <tr>
              <th className="border">
                <div className="flex items-center gap-2">
                  programName{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"programName"}
                  />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  courseCode{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"courseCode"}
                  />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  sessionName{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"sessionName"}
                  />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  status{" "}
                  <FilterComponent filterRef={AddFilter} fieldname={"status"} />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  typeofActivity{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"typeofActivity"}
                  />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  PhoneNumber{" "}
                  <FilterComponent filterRef={AddFilter} fieldname={"phone"} />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  LastName{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"LastName"}
                  />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  date{" "}
                  <FilterComponent filterRef={AddFilter} fieldname={"date"} />
                </div>
              </th>

              <th className="border">
                <div className="flex items-center gap-2">
                  endTime{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"endTime"}
                  />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {DataArr?.map((item, key) => (
              <tr key={key}>
                <td className="border">{item.programName}</td>
                <td className="border">{item.courseCode}</td>
                <td className="border">{item.sessionName}</td>
                <td className="border">{item.status}</td>
                <td className="border">{item.Activity}</td>
                <td className="border">{item.LastName}</td>
                <td className="border">{item.date}</td>
                <td className="border">{item.startTime}</td>
                <td className="border">{item.endTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
