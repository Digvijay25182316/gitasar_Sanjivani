import React, { useState } from "react";
import { Link } from "react-router-dom";

function Attendance() {
  const [currentStep, setCurrentStep] = useState(1);

  const nextStep = () => {
    setCurrentStep(2);
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

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
        <div className="md:w-full w-[80vw] mt-10">
          <div className="w-full flex items-center justify-evenly gap-5 border-b">
            <button
              onClick={() => nextStep()}
              className={`w-full py-2 text-lg ${
                currentStep === 1
                  ? "border bg-gray-200 text-blue-700 border-t-blue-700"
                  : " bg-none text-gray-700"
              } `}
            >
              Attendance
            </button>
            <button
              onClick={() => prevStep()}
              className={`w-full py-2 text-lg ${
                currentStep !== 1
                  ? "border bg-gray-200 text-blue-700 border-t-blue-700"
                  : " bg-none text-gray-700"
              } `}
            >
              SRVP
            </button>
          </div>
        </div>
        {currentStep === 1 ? (
          <div className="md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b">
            <p className="w-4/5 border-b text-lg font-semibold text-gray-700 py-2 mb-5">
              Select Sessions
            </p>
            <div className="px-5 py-2">
              <form>
                <div>
                  <p className="px-5 text-gray-800 font-semibold">
                    * latest session
                  </p>
                  <label className="flex items-start gap-5">
                    <input type="radio" name="this is the session" />
                    <p className=" line-clamp-2">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                      Culpa corrupti assumenda consectetur maxime iste
                      necessitatibus quia amet optio? Quidem corporis quam
                      dicta. Id voluptate assumenda obcaecati, voluptatem natus
                      expedita totam?
                    </p>
                  </label>
                </div>
                <p className="text-center text-lg">or</p>
                <div className="flex flex-col gap-2 px-5">
                  <label className="font-semibold text-gray-800">
                    * select from previous sessions
                  </label>
                  <select
                    name=""
                    className="border outline-none px-4 py-1.5 rounded"
                  >
                    <option value="">session</option>
                    <option value="">option1</option>
                    <option value="">option1</option>
                    <option value="">option1</option>
                  </select>
                </div>
                <button></button>
              </form>
            </div>
          </div>
        ) : (
          <div className="md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b">
            <p className="w-4/5 border-b text-lg font-semibold text-gray-700 py-2 mb-5">
              Select Upcomming Session
            </p>
            <div className="px-5 py-2 w-full">
              <form>
                <div className="flex flex-col gap-2 px-5">
                  <label className="font-semibold text-gray-800">
                    * select from previous sessions
                  </label>
                  <select
                    name=""
                    className="border outline-none px-4 py-1.5 rounded"
                  >
                    <option value="">session</option>
                    <option value="">option1</option>
                    <option value="">option1</option>
                    <option value="">option1</option>
                  </select>
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
