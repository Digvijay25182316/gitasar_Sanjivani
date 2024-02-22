import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";

function ProgramCard({ programId }) {
  const [programName, setProgramName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/program/id/${programId}`
        );
        if (response.ok) {
          const responseData = await response.json();
          setProgramName(responseData.name);
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
  }, [programId]);
  return (
    <div>
      {isLoading ? (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin">
            <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
          </div>
        </div>
      ) : (
        <div>{programName}</div>
      )}
    </div>
  );
}

export default ProgramCard;
