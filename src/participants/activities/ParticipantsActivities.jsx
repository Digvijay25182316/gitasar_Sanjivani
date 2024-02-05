import React, { useState } from "react";
import { Link } from "react-router-dom";

function Attendance() {
  const [sessions, setSessions] = useState([
    { id: 1, session: "Spirituality master", response: "Yes" },
    { id: 2, session: "Realising Your Presence", response: "No" },
    { id: 3, session: "Reincarnation Evidences", response: "Yes" },
  ]);
  const [Activities, setSelectedActivities] = useState(sessions[0]?.id || "");

  function handleSubmitActivity(e) {
    e.preventDefault();
    console.log(Activities);
  }

  const ArrActivities = [
    "Round chanting 1",
    "Round chanting 2",
    "Round chanting 3",
    "Round chanting 4",
    "Round chanting 5",
    "Round chanting 6",
    "Round chanting 7",
    "Round chanting 8",
  ];

  return (
    <div className="container mx-auto my-4 bg-white rounded-2xl border p-6 lg:w-[600px] md:w-[600px] w-[90vw]">
      <div className="flex flex-col items-center mx-5">
        <div className="flex md:flex-row flex-col items-center">
          <form action="" onClick={handleSubmitActivity}>
            <div className="flex md:flex-row flex-col gap-2 md:items-end items-center">
              <div className="flex flex-col gap-2 mx-5">
                <label className="font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  type="text"
                  className="px-4 py-1.5 border rounded outline-none "
                  placeholder="8888959287 "
                />
              </div>
              <div className="flex items-end gap-5 ml-2">
                <button
                  className="px-4 py-1.5 text-white text-lg  bg-blue-700 rounded md:w-[150px] w-[100px]"
                  type="submit"
                >
                  Search
                </button>
                <Link to={"/registeration"}>
                  <button
                    className="px-4 py-1.5 text-white text-lg  bg-blue-700 rounded md:w-[150px] w-[100px]"
                    type="button"
                  >
                    Register
                  </button>
                </Link>
              </div>
            </div>
          </form>
        </div>
        <div className="mt-5 flex md:flex-row flex-col items-center gap-5">
          <div className="font-semibold text-gray-400">
            program Name:<i className="text-gray-700"> Gitasar Batch 1</i>
          </div>
        </div>
        <div>
          <div className="my-4 border-t md:w-[550px] w-[80vw] px-5">
            <p className="font-semibold text-gray-700 text-lg">
              Select Service
            </p>
            <p className="text-sm text-gray-500">Select a service from list</p>
          </div>
          <form className="flex flex-col gap-4">
            <div className="px-5 flex flex-col gap-2">
              <label className="font-semibold">select service</label>
              <select
                type="text"
                className="px-4 py-1.5 border rounded outline-none"
              >
                <option>select</option>
                {ArrActivities?.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <div className="px-5 flex flex-col gap-2">
              <label className="font-semibold">service description</label>
              <input
                type="text"
                className="px-4 py-1.5 border rounded outline-none"
                placeholder="Write some description"
              />
            </div>
            <div className="px-5 flex flex-col gap-2">
              <label htmlFor="start_date" className="font-semibold">
                service start date
              </label>
              <input
                type="date"
                id="start_date"
                name="start_date"
                className="px-4 py-1.5 border rounded outline-none"
              />
            </div>
            <div className="flex items-center justify-center gap-5 px-5 bg-white mt-10">
              <button className="bg-blue-700 w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
