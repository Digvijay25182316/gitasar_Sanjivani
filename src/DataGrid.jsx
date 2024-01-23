import React, { useEffect, useState } from "react";
import { activitiesData } from "./data";
import FilterComponent from "./FilterComponent";

export default function DataGridDemo() {
  const [DataArr, setDataArr] = useState(activitiesData);
  const [queryArr, setQueryArr] = useState([]);
  console.log(queryArr);
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

  return (
    <div className="flex flex-col items-center py-5">
      <button
        className="px-5 py-1 bg-gray-600 text-white text-lg rounded-lg my-10"
        onClick={() => {
          setDataArr(activitiesData);
          setQueryArr([]);
        }}
      >
        clear filter
      </button>
      <div>
        <table>
          <thead>
            <tr>
              <th className="border">
                <div className="flex items-center gap-2">
                  FirstName{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"FirstName"}
                  />
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
                  date{" "}
                  <FilterComponent filterRef={AddFilter} fieldname={"date"} />
                </div>
              </th>
              <th className="border">
                <div className="flex items-center gap-2">
                  startTime{" "}
                  <FilterComponent
                    filterRef={AddFilter}
                    fieldname={"startTime"}
                  />
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
                <td className="border">{item.FirstName}</td>
                <td className="border">{item.LastName}</td>
                <td className="border">{item.programName}</td>
                <td className="border">{item.courseCode}</td>
                <td className="border">{item.sessionName}</td>
                <td className="border">{item.status}</td>
                <td className="border">{item.typeofActivity}</td>
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
