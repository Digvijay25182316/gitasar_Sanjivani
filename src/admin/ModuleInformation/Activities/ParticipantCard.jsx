import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { SERVER_ENDPOINT } from "../../config/Server";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";

function ParticipantCard({ participantId, fieldName }) {
  const [participant, setParticipant] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/participant/id/${participantId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setParticipant(responseData);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [participantId]);

  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin">
            <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
          </div>
        </div>
      ) : (
        <div>{participant[fieldName]}</div>
      )}
    </div>
  );
}

export default ParticipantCard;
