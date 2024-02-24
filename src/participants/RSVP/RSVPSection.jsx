import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SERVER_ENDPOINT } from "../../admin/config/Server";
import { SparklesIcon } from "@heroicons/react/24/outline";

function RSVPSection({ levelData, participantData, futureSessions }) {
  const [isLoading, setIsLoading] = useState(false);
  const [sessionsRSVP, setSessionRSVP] = useState({});
  const [isYes, setIsYes] = useState(false);

  useEffect(() => {
    if (!participantData)
      (async () => {
        setIsLoading(true);
        try {
          const response = await fetch(
            `${SERVER_ENDPOINT}/rsvp/find/?participantId=${participantData.id}&scheduledSessionId=${futureSessions[0].id}`
          );
          if (response.ok) {
            const responseData = await response.json();
            setSessionRSVP(responseData);
          } else {
            if (response.status === 404) {
              return;
            } else {
              const errorData = await response.json();
              toast.error(errorData.message);
            }
          }
        } catch (error) {
          toast.error(error.message);
        } finally {
          setIsLoading(false);
        }
      })();
  }, [futureSessions, participantData, isYes]);

  async function handleSubmitRSVP(answer) {
    setIsLoading(true);
    const header = new Headers();
    header.append("Content-Type", "application/json");

    const RSVP = {
      scheduledSessionId: futureSessions[0].id,
      participantId: participantData.id,
      levelId: levelData.id,
      programId: levelData.programId,
      scheduledSessionName: futureSessions[0].name,
      rsvp: answer,
    };

    try {
      const response = await fetch(`${SERVER_ENDPOINT}/rsvp/mark`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(RSVP),
      });
      if (response.ok) {
        const responseData = await response.json();
        toast.success(responseData.message);
        setIsYes(!isYes);
      } else {
        const errorData = await response.json();
        toast.error(errorData);
      }
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="md:w-full w-[80vw] flex flex-col items-center border border-t-0 rounded-b">
      <p className="w-4/5 border-b text-lg font-semibold text-gray-700 py-2 mb-5">
        Select Upcoming Session
      </p>
      <div className="px-5 py-2 w-full">
        <div className="flex flex-col gap-2">
          <div>
            <p className="font-semibold text-gray-800 px-5 flex items-center gap-3">
              <SparklesIcon className="h-6 w-6" /> Upcoming sessions
            </p>
            <p className="font-normal text-sm text-gray-500 px-5">
              Confirm your presence for this upcoming session
            </p>
            <p className="font-normal text-sm text-gray-500 px-5">
              By clicking on YES or NO
            </p>
          </div>
          {Object.keys(sessionsRSVP).length > 0 ? (
            <div className="flex items-center border border-gray-300 px-5 py-5 rounded-xl justify-between">
              <div className="font-semibold text-lg">
                {sessionsRSVP.scheduledSessionName}
              </div>
              <div className="flex items-center gap-5">
                <div>
                  {sessionsRSVP.rsvp !== "YES" ? (
                    <button
                      className="text-green-700 bg-green-200 w-[80px] py-2 rounded-xl border border-green-300"
                      onClick={() => {
                        handleSubmitRSVP("YES");
                      }}
                    >
                      YES
                    </button>
                  ) : (
                    <p className="text-green-700 bg-green-200 w-[80px] py-2 rounded-xl border border-green-300 flex justify-center">
                      <CheckIcon className="h-6 w-6" />
                    </p>
                  )}
                </div>
                <div>
                  {sessionsRSVP.rsvp === "YES" ? (
                    <button
                      className="text-red-700 bg-red-200 w-[80px] py-2 rounded-xl border border-red-300 flex justify-center"
                      onClick={() => handleSubmitRSVP("NO")}
                    >
                      NO
                    </button>
                  ) : (
                    <p className="text-red-700 bg-red-200 w-[80px] py-2 rounded-xl border border-red-300 flex justify-center">
                      <XMarkIcon className="h-6 w-6" />
                    </p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex md:flex-row flex-col items-center border border-gray-300 px-5 py-5 rounded-xl justify-between gap-5">
              <div className="font-semibold text-lg">
                {futureSessions[0].name}
              </div>
              <div className="flex items-center gap-5">
                <div>
                  {!isYes ? (
                    <button
                      className="text-green-700 bg-green-200 w-[80px] py-2 rounded-xl border border-green-300"
                      onClick={() => handleSubmitRSVP("YES")}
                    >
                      YES
                    </button>
                  ) : (
                    <p className="text-green-700 bg-green-200 w-[80px] py-2 rounded-xl border border-green-300 flex justify-center">
                      <CheckIcon className="h-6 w-6" />
                    </p>
                  )}
                </div>
                <div>
                  {isYes ? (
                    <button
                      className="text-red-700 bg-red-200 w-[80px] py-2 rounded-xl border border-red-300 flex justify-center"
                      onClick={() => handleSubmitRSVP("NO")}
                    >
                      NO
                    </button>
                  ) : (
                    <p className="text-red-700 bg-red-200 w-[80px] py-2 rounded-xl border border-red-300 flex justify-center">
                      <XMarkIcon className="h-6 w-6" />
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RSVPSection;
