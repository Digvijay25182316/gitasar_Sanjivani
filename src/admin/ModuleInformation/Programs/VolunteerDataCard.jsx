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
          // Check if responseData is empty
          if (
            Object.keys(responseData).length === 0 &&
            responseData.constructor === Object
          ) {
            // Handle empty response
            console.log("Empty response received");
            // Optionally, set default data or handle the empty case
            setVolunteerData({});
          } else {
            setVolunteerData(responseData);
          }
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "An error occurred");
        }
      } catch (error) {
        console.error(error);
        // Remove the error toast when response is empty
        if (error.message !== "Unexpected end of JSON input") {
          toast.error("An error occurred while fetching data");
        }
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
          {Object.keys(volunteerData).length === 0 ? (
            <div>No data available</div>
          ) : (
            <div>
              {volunteerData?.initiatedName
                ? volunteerData?.initiatedName
                : `${volunteerData?.firstName} ${volunteerData?.lastName}`}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default VolunteerDataCard;
