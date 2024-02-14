import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";

function VolunteerDataCard({ volunteer_id }) {
  const [volunteerData, setVolunteerData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/volunteer/id/${volunteer_id}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setVolunteerData(responseData);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message);
        }
      } catch (error) {
        toast.error(error.message || error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [volunteer_id]);
  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="animate-spin">
            <CubeTransparentIcon className="h-5 w-5 text-gray-500" />
          </div>
        </div>
      ) : (
        <div>
          {volunteerData?.initiatedName
            ? volunteerData?.initiatedName
            : `${volunteerData?.firstName} ${volunteerData?.lastName}`}
        </div>
      )}
    </>
  );
}

export default VolunteerDataCard;
