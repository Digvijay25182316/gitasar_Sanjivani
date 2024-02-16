import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";

function Attendance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessions, setSessions] = useState([]);
  const { levelId } = useParams();
  const [levelObject, setLevelObject] = useState({});
  const [Participant, setParticipant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sessionsAttendence, setSessionAttendence] = useState(0);
  console.log(sessions);
  const [isyes, setIsYes] = useState([
    { id: 1, session: "Spirituality master", response: "" },
  ]);
  const [sessionsRSVP, setSessionRSVP] = useState(isyes);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/level/id/${levelId}`);
        if (response.ok) {
          const responseData = await response.json();
          console.log(responseData);
          setLevelObject(responseData);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [levelId]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/session/scheduled/level/${levelId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setSessions(responseData.content);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, [levelId]);

  //to get the participant based on the mobile number
  async function handleSubmitUser(e) {
    setIsLoading(true);
    e.preventDefault();
    if (phoneNumber === "") {
      toast.error("Enter your phone Number");
      return;
    }
    try {
      const response = await fetch(
        `${SERVER_ENDPOINT}/participant/phone/${phoneNumber}`
      );

      if (response.ok) {
        const responseData = await response.json();
        setParticipant(responseData);
      } else if (response.status === 404) {
        toast.error(
          "participant with the phone number does not exists  please register"
        );
        navigate("/registeration");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  }

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

  async function handleSubmitAttendance(e) {
    e.preventDefault();

    const formData = {
      scheduledSessionId: sessionsAttendence,
      participantId: Participant.id,
      levelId: Number(levelId),
      programId: levelObject.programId,
    };

    try {
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const response = await fetch(`${SERVER_ENDPOINT}/attendance/mark`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: header,
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="container mx-auto my-4 bg-white rounded-2xl border p-6 lg:w-[600px] md:w-[600px] w-[90vw]">
      <div className="flex flex-col items-center mx-5">
        <div className="flex md:flex-row flex-col items-center">
          <form onSubmit={handleSubmitUser}>
            <div className="flex md:flex-row flex-col gap-2 md:items-end items-center">
              <div className="flex flex-col gap-2 mx-5">
                <label className="font-semibold text-gray-600">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="px-4 py-1.5 border rounded outline-none "
                  placeholder="8888959287"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="flex items-end gap-5 ml-2">
                <button
                  className="px-4 py-1.5 text-white text-lg  bg-blue-700 rounded md:w-[150px] w-[100px]"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Loading..." : "Search"}
                </button>
              </div>
            </div>
          </form>
        </div>
        {Object.keys(Participant).length > 0 && (
          <div className="font-semibold text-gray-400 mt-5">
            <i className="text-gray-700">
              {`${Participant.firstName} ${Participant.lastName}`}
            </i>
          </div>
        )}
        <div className="mt-5 flex flex-col items-center gap-5">
          <div className="font-semibold text-gray-400 w-max">
            <i className="text-gray-700"> {levelObject.programName}</i>
          </div>
          <div className="font-semibold text-gray-400">
            course Name:<i className="text-gray-700"> {levelObject.name}</i>
          </div>
        </div>
        <div
          className={`md:w-full w-[80vw] mt-5 ${
            Object.keys(Participant).length === 0 ? " opacity-50" : null
          }`}
        >
          <div className="w-full flex items-center justify-evenly gap-5 border-b">
            <button
              onClick={() => prevStep()}
              className={`w-full py-2 text-lg ${
                currentStep === 1
                  ? "border bg-gray-200 text-blue-700 border-t-blue-700"
                  : " bg-none text-gray-700"
              } `}
              disabled={isLoading || Object.keys(Participant).length === 0}
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
              disabled={isLoading || Object.keys(Participant).length === 0}
            >
              RSVP
            </button>
          </div>
        </div>
        {currentStep === 1 ? (
          sessions.length > 0 ? (
            <div
              className={`md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b ${
                Object.keys(Participant).length === 0 ? " opacity-50" : null
              }`}
            >
              <p className="w-4/5 border-b text-lg font-semibold text-gray-700 py-2 mb-5">
                Select Sessions
              </p>
              <div className="px-5 py-2">
                <form onSubmit={handleSubmitAttendance}>
                  <div>
                    <p className="px-5 text-gray-800 font-semibold">
                      * latest session
                    </p>

                    <label className="flex items-center gap-5">
                      <input
                        type="radio"
                        name="sessionAttendence"
                        checked={sessionsAttendence === sessions[0].id}
                        onChange={(e) => setSessionAttendence(sessions[0].id)}
                      />
                      <p className="text-lg font-semibold">
                        {sessions[0].name}
                      </p>
                    </label>
                  </div>
                  {sessions.length > 1 ? (
                    <>
                      <p className="text-center text-lg">or</p>
                      <div className="flex flex-col gap-2 px-5">
                        <label className="font-semibold text-gray-800">
                          * select from previous sessions
                        </label>
                        <select
                          onChange={(e) => setSessionAttendence(e.target.value)}
                          className="border outline-none px-4 py-1.5 rounded"
                        >
                          <option value="">select</option>
                          {sessions?.map((item, index) => (
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </>
                  ) : null}
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
            <div className="md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b py-10 text-gray-500">
              No Sessions To Show
            </div>
          )
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
