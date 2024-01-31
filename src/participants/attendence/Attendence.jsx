import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";

function Attendance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState("");
  const { levelid } = useParams();
  const [userData, setUserData] = useState({});
  const [sessionData, setSessionData] = useState({});

  const nextStep = (page) => {
    if (page === "register") {
      setCurrentStep(2);
    } else {
      setCurrentStep(3);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className="min-h-screen flex justify-center items-center ">
      <div className="flex flex-col items-center gap-32 mx-5">
        {currentStep === 2 ? (
          <Step2
            sessions={sessionData}
            userData={userData}
            prevStep={prevStep}
          />
        ) : currentStep === 3 ? (
          <Step3
            sessions={sessionData}
            userData={userData}
            prevStep={prevStep}
          />
        ) : (
          <Step1 nextStep={nextStep} setUserData={setUserData} />
        )}
      </div>
    </div>
  );
}

export default Attendance;

function Step1({ nextStep, setUserData }) {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setNotFound] = useState(false);

  const MobileRef = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isNotFound) {
      nextStep("register");
    } else {
      nextStep();
    }
  };
  return (
    <div className="bg-white rounded-2xl border min-h-[90vh] flex flex-col items-center justify-center gap-20">
      <p className="mx-5 text-center text-lg text-red-600">
        After submitting your phone number you will be redirected to another
        page
      </p>
      <form
        className="flex flex-col items-center gap-3"
        ref={MobileRef}
        onSubmit={handleSubmit}
      >
        <div className="flex items-center border my-5 mx-2 gap-3 w-full">
          <p className="bg-gray-100 py-3 px-3 text-gray-400 border-r ">Phone</p>
          <input
            type="tel"
            name="mobile"
            placeholder="enter your mobile number"
            className="focus:outline-none text-lg text-center flex-1"
          />
        </div>
        <button
          className="text-white px-4 py-1.5 rounded bg-blue-700 text-lg mb-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "Searching ..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

function Step2({ sessions, userData, prevStep }) {
  const [selectedSession, setSelectedSession] = useState(null);

  const { levelid } = useParams();

  const handleRadioChange = (session) => {
    setSelectedSession(session);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      sessionId: selectedSession,
      levelId: Number(levelid),
      participantId: userData.id,
    };
  };

  return (
    <div className="container mx-auto my-4 bg-white rounded-2xl border">
      <h2 className="text-lg font-semibold mb-4 border-b px-5 py-2 text-gray-600">
        Register Page
      </h2>
      <div className="mx-5">
        <form action="" className="flex flex-col gap-5">
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center border ">
              <label className="bg-gray-100 px-2 py-2 border-r font-semibold text-gray-500">
                FirstName
              </label>
              <input
                type="text"
                className="px-4 py-1.5 focus:outline-none"
                placeholder="enter your name"
              />
            </div>
            <div className="flex items-center border">
              <label className="bg-gray-100 px-2 py-2 border-r font-semibold text-gray-500">
                LirstName
              </label>
              <input
                type="text"
                className="px-4 py-1.5 focus:outline-none"
                placeholder="enter your name"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex items-center border ">
              <label className="bg-gray-100 px-2 py-2 border-r font-semibold text-gray-500">
                Whatsapp
              </label>
              <input
                type="tel"
                className="px-4 py-1.5 focus:outline-none"
                placeholder="7620898992"
              />
            </div>
            <div className="flex items-center border">
              <label className="bg-gray-100 px-5 py-2 border-r font-semibold text-gray-500">
                Phone
              </label>
              <input
                type="tel"
                className="px-4 py-1.5 focus:outline-none"
                placeholder="7620898992"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-500">Gender</label>
              <select
                type="text"
                className="px-4 py-1.5 border bg-white rounded focus:outline-none text-gray-700"
              >
                <option>select</option>
                <option value={"MALE"}>Male</option>
                <option value={"FEMALE"}>Female</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-500">
                Marital Status
              </label>
              <select
                type="text"
                className="px-4 py-1.5 border bg-white rounded focus:outline-none text-gray-700"
              >
                <option>select</option>
                <option value={"MARRIED"}>Married</option>
                <option value={"NONMARRIED"}>Not Married</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col gap-2">
              <label className="font-semibold text-gray-500">Date</label>
              <input
                type="date"
                className="px-4 py-1.5 border bg-white rounded focus:outline-none text-gray-700"
              />
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="font-semibold text-gray-500">
                No. of Childrens
              </label>
              <input
                type="number"
                className="px-4 py-1.5 border bg-white rounded focus:outline-none text-gray-700"
                placeholder="number of childrens"
              />
            </div>
          </div>
          <div className="flex justify-center my-10">
            <button className="w-[200px] bg-blue-700 text-white font-semibold text-lg py-1.5 rounded ">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
function Step3({ sessions, userData, prevStep }) {
  const [selectedSession, setSelectedSession] = useState(null);
  const [selectedPage, setSelectedPage] = useState("attendence");

  const { levelid } = useParams();

  const handleRadioChange = (session) => {
    setSelectedSession(session);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      sessionId: selectedSession,
      levelId: Number(levelid),
      participantId: userData.id,
    };
  };

  return (
    <div className="h-screen">
      <div className="container mx-auto rounded-2xl border bg-blue-100 flex flex-col items-center">
        {selectedPage === "attendence" ? (
          <button
            className="px-4 text-blue-700 underline text-center py-1.5 rounded-2xl cursor-pointer text-lg"
            onClick={() => setSelectedPage("srvp")}
          >
            Register for the upcomming sessions
          </button>
        ) : (
          <button
            className="px-4 text-blue-700 underline text-center py-1.5 rounded-2xl cursor-pointer text-lg"
            onClick={() => setSelectedPage("attendence")}
          >
            Go To Attendence
          </button>
        )}
      </div>
      {selectedPage === "attendence" ? (
        <div className="container mx-auto my-4 bg-white rounded-2xl border">
          <div className="border-b px-4 py-1.5 text-lg font-semibold text-gray-600 flex items-center justify-between">
            <p>Give Attendence</p>
          </div>
          <div className="p-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-5 pb-5 font-semibold text-lg text-gray-600">
              Your Name
            </div>
            <div className="flex items-center gap-5">
              <div className="font-semibold text-gray-400 md:flex gap-5">
                Course : <p className="text-gray-600">something field</p>
              </div>
            </div>
            <form className="flex flex-col items-center gap-5 py-5 text-gray-600">
              <div className="flex items-center justify-center">
                <label className="flex items-center gap-5">
                  <input type="radio" className="border" />
                  somecourse you decided
                </label>
              </div>
              or
              <div className="flex items-center justify-center border">
                <label className="flex items-center gap-5 bg-gray-100 py-2 px-3 border-r border-r-gray-200">
                  sessions
                </label>
                <select
                  type="text"
                  className="bg-white border-none px-4 md:w-[300px] w-[200px] focus:outline-none"
                >
                  <option>select</option>
                </select>
              </div>
              <button className="text-lg bg-blue-700 text-white w-[200px] rounded-md py-1.5">
                Submit
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="container mx-auto my-4 bg-white rounded-2xl border">
          <div className="border-b px-4 py-1.5 text-lg font-semibold text-gray-600 flex items-center justify-between">
            <p>Future Sessions</p>
          </div>
          <div className="p-6 flex flex-col items-center">
            <div className="flex items-center justify-center gap-5 pb-5 font-semibold text-lg text-gray-600">
              Your Name
            </div>
            <div className="flex items-center gap-5">
              <div className="font-semibold text-gray-400 md:flex gap-5">
                Course : <p className="text-gray-600">something field</p>
              </div>
            </div>
            <form className="flex flex-col items-center gap-5 py-5 text-gray-600">
              <p className="text-center text-lg">
                Below is the list of all upcomming sessions
              </p>
              <div className="flex items-center justify-center border">
                <label className="flex items-center gap-5 bg-gray-100 py-2 px-3 border-r border-r-gray-200">
                  sessions
                </label>
                <select
                  type="text"
                  className="bg-white border-none px-4 md:w-[300px] w-[200px] focus:outline-none"
                >
                  <option>select</option>
                </select>
              </div>
              <button className="text-lg bg-blue-700 text-white w-[200px] rounded-md py-1.5">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
