import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import toast from "react-hot-toast";
import RSVPSection from "./RSVPSection";

function RSVP() {
  const [futureSessions, setFutureSessions] = useState([]);
  const { levelId } = useParams();
  const [levelObject, setLevelObject] = useState({});
  const [Participant, setParticipant] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

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
        past.splice(1);
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

  return (
    <div className="container mx-auto my-4 bg-white rounded-2xl border p-6 lg:w-[600px] md:w-[600px] w-[90vw]">
      <div className="flex flex-col items-center mx-5">
        <p className="py-6 text-2xl font-bold text-orange-600">RSVP</p>
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
        {Object.keys(Participant).length > 0 ? (
          futureSessions[0] ? (
            <RSVPSection
              futureSessions={futureSessions}
              levelData={levelObject}
              participantData={Participant}
            />
          ) : (
            <div className="px-5 py-10 text-gray-500 border w-full text-center">
              No future sessions to show
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}

export default RSVP;
