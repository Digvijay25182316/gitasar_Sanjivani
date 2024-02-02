import React, { useState } from "react";
import { Link } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

function Attendance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessions, setSessions] = useState([
    { id: 1, session: "Spirituality master", response: "Yes" },
    { id: 2, session: "Realising Your Presence", response: "No" },
    { id: 3, session: "Reincarnation Evidences", response: "Yes" },
  ]);
  const [sessionsAttendence, setSessionAttendence] = useState(
    sessions[0]?.id || ""
  );
  const [isyes, setIsYes] = useState([
    { id: 1, session: "Spirituality master", response: "" },
  ]);
  const [sessionsRSVP, setSessionRSVP] = useState(isyes);

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  function handleChangeRSVP(response, id) {
    setSessionRSVP((prevSessionsRSVP) =>
      prevSessionsRSVP.map((item) =>
        item.id === id ? { ...item, response: response } : item
      )
    );
  }
  function handleSubmitRSVP(e) {
    e.preventDefault();
    console.log(sessionsRSVP);
  }

  function handleSubmitAttendance(e) {
    e.preventDefault();
    console.log(sessionsAttendence);
  }

  return (
    <div className="container mx-auto my-4 bg-white rounded-2xl border p-6 lg:w-[600px] md:w-[600px] w-[90vw]">
      <div className="flex flex-col items-center mx-5">
        <div className="flex md:flex-row flex-col items-center">
          <form action="">
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
            course Name:<i className="text-gray-700"> DYS</i>
          </div>
          <div className="font-semibold text-gray-400">
            program Name:<i className="text-gray-700"> Gitasar Batch 1</i>
          </div>
        </div>
        <div className="md:w-full w-[80vw] mt-5">
          <div className="w-full flex items-center justify-evenly gap-5 border-b">
            <button
              onClick={() => prevStep()}
              className={`w-full py-2 text-lg ${
                currentStep === 1
                  ? "border bg-gray-200 text-blue-700 border-t-blue-700"
                  : " bg-none text-gray-700"
              } `}
            >
              Attendance
            </button>
            <button
              onClick={() => nextStep()}
              className={`w-full py-2 text-lg ${
                currentStep !== 1
                  ? "border bg-gray-200 text-blue-700 border-t-blue-700"
                  : " bg-none text-gray-700"
              } `}
            >
              RSVP
            </button>
          </div>
        </div>
        {currentStep === 1 ? (
          <div className="md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b">
            <p className="w-4/5 border-b text-lg font-semibold text-gray-700 py-2 mb-5">
              Select Sessions
            </p>
            <div className="px-5 py-2">
              <form onSubmit={handleSubmitAttendance}>
                <div>
                  <p className="px-5 text-gray-800 font-semibold">
                    * latest session
                  </p>

                  <label className="flex items-start gap-5">
                    <input
                      type="radio"
                      name="sessionAttendence"
                      checked={sessionsAttendence === sessions[0].id}
                      onChange={() => setSessionAttendence(sessions[0].id)}
                    />
                    <p className=" line-clamp-2">{sessions[0].session}</p>
                  </label>
                </div>
                <p className="text-center text-lg">or</p>
                <div className="flex flex-col gap-2 px-5">
                  <label className="font-semibold text-gray-800">
                    * select from previous sessions
                  </label>
                  <select
                    onChange={(e) => setSessionAttendence(e.target.value)}
                    className="border outline-none px-4 py-1.5 rounded"
                  >
                    {sessions?.map((item, index) => (
                      <option value={item.id} key={index}>
                        {item.session}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    className="px-4 py-1.5 bg-blue-700 text-white rounded "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          <div className="md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b">
            <p className="w-4/5 border-b text-lg font-semibold text-gray-700 py-2 mb-5">
              Select Upcomming Session
            </p>
            <div className="px-5 py-2 w-full">
              <form onSubmit={handleSubmitRSVP}>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-gray-800 px-5">
                    * Upcomming sessions
                  </label>
                  <div className="flex flex-col items-start gap-5">
                    {sessionsRSVP?.map((item, index) => (
                      <div
                        className="flex md:flex-row flex-col justify-between gap-2 md:gap-6 text-lg w-full border px-3 py-3 rounded-lg"
                        key={index}
                      >
                        {item.session}
                        <div className="flex items-center gap-5 justify-end">
                          {item.response === "Yes" ? (
                            <p className="text-green-600 px-4 py-1 bg-green-100 rounded-xl">
                              <CheckIcon className="h-6 y-6" />
                            </p>
                          ) : (
                            <button
                              onClick={() => handleChangeRSVP("Yes", item.id)}
                              className="bg-green-600 px-4 py-0.5 text-white rounded-lg"
                              isYes
                            >
                              YES
                            </button>
                          )}
                          {item.response === "No" ? (
                            <p className="text-red-600 px-4 py-1 bg-red-100 rounded-xl">
                              <XMarkIcon className="h-6 y-6" />
                            </p>
                          ) : (
                            <button
                              className="bg-red-600 px-4 py-0.5 text-white rounded-lg"
                              onClick={() => handleChangeRSVP("No", item.id)}
                            >
                              NO
                            </button>
                          )}
                          <button
                            className="bg-gray-600 px-4 py-0.5 text-white rounded-lg"
                            onClick={() => handleChangeRSVP("", item.id)}
                          >
                            clear
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center mt-5">
                  <button
                    className="px-4 py-1.5 bg-blue-700 text-white rounded "
                    type="submit"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attendance;
