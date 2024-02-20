import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";
import RSVPSection from "./RSVPSection";

function Attendance() {
  const [currentStep, setCurrentStep] = useState(1);
  const [sessions, setSessions] = useState([]);
  const [futureSessions, setFutureSessions] = useState([]);
  const { levelId } = useParams();
  const [levelObject, setLevelObject] = useState({});
  const [Participant, setParticipant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenSelection, setIsOpenSelection] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sessionsAttendence, setSessionAttendence] = useState(0);
  const [SingleSession, setSingleSession] = useState({});
  const [LatestSession, setLatestSession] = useState({});
  const [allSessions, setAllSessions] = useState([]);

  const storeToLocalStorage = (item) => {
    localStorage.setItem("phoneNumber", item);
  };

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    if (phoneNumber) {
      setPhoneNumber(phoneNumber);
    }
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/level/id/${levelId}`);
        if (response.ok) {
          const responseData = await response.json();
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
    const future = [];
    const past = [];
    (async () => {
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/session/scheduled/level/${levelId}?sort=startTime,desc`
        );
        if (response.ok) {
          const responseData = await response.json();

          responseData?.content?.forEach((session, index) => {
            if (new Date(session.startTime) > new Date()) {
              future.push(session);
            } else {
              past.push(session);
            }
          });
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setAllSessions(past);
        setLatestSession(past[0]);
        setSessions(past.splice(1));
        setFutureSessions(future);
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
        console.log(
          "participant with the phone number does not exists  please register"
        );
        navigate("/registeration");
        storeToLocalStorage(phoneNumber);
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

  const handleSessionSelect = (item) => {
    setSingleSession(item);
    setIsOpenSelection(false);
    setSessionAttendence(item.id);
  };

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
            {phoneNumber.length !== 10 ? (
              <p className="text-red-600">Please enter 10 digit number</p>
            ) : null}
          </form>
        </div>
        {Object.keys(Participant).length > 0 && (
          <div className="font-semibold text-gray-400 mt-5">
            <i className="text-red-700">
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
                  ? "border bg-blue-200 text-blue-700 border-blue-700"
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
                  ? "border bg-blue-200 text-blue-700 border-blue-700"
                  : " bg-none text-gray-700"
              } `}
              disabled={isLoading || Object.keys(Participant).length === 0}
            >
              RSVP
            </button>
          </div>
        </div>
        {currentStep === 1 ? (
          allSessions.length > 0 ? (
            <div
              className={`md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b ${
                Object.keys(Participant).length === 0 ? " opacity-0" : null
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
                        checked={sessionsAttendence === LatestSession?.id}
                        onChange={(e) => {
                          setSessionAttendence(LatestSession?.id);
                          setSingleSession({});
                        }}
                        disabled={Object.keys(Participant).length === 0}
                      />
                      <p className="text-lg font-semibold">
                        {LatestSession?.name}
                      </p>
                    </label>
                  </div>
                  {sessions?.length !== 0 && (
                    <div className="relative inline-block text-left w-full mt-10 min-w-[200px]">
                      <button
                        type="button"
                        onClick={() =>
                          !isLoading && setIsOpenSelection(!isOpenSelection)
                        }
                        className={`inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium  bg-white border border-gray-300 rounded-md shadow-sm ${
                          isLoading
                            ? "text-gray-400"
                            : "hover:bg-gray-50 focus:outline-none focus:ring-1 text-gray-700"
                        }`}
                        id="options-menu"
                        aria-haspopup="true"
                        aria-expanded="true"
                        disabled={isLoading}
                      >
                        {Object.keys(SingleSession).length === 0
                          ? "Select Previous Session"
                          : `${SingleSession?.name}`}
                        <ChevronDownIcon className="h-3 w-3" />
                      </button>
                      {!isLoading && isOpenSelection ? (
                        <div
                          className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                          role="menu"
                          aria-orientation="vertical"
                          aria-labelledby="options-menu"
                        >
                          <div className="py-1" role="none">
                            {sessions.length > 0 ? (
                              sessions.map((item) => (
                                <p
                                  value={item.name}
                                  key={item.id}
                                  role="menu"
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                  onClick={() => handleSessionSelect(item)}
                                >
                                  {item.name}
                                </p>
                              ))
                            ) : (
                              <p>NO Sessions to show You can check in rsvp</p>
                            )}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  )}
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
          <>
            {futureSessions[0] ? (
              <RSVPSection
                futureSessions={futureSessions}
                levelData={levelObject}
                participantData={Participant}
              />
            ) : (
              <div className="px-5 py-10 text-gray-500 border w-full text-center">
                No future sessions to show
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Attendance;
