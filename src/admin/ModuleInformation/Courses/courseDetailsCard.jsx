import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";

function CourseDetailsCard({ courseCode, fieldName }) {
  const [isLoading, setIsLoading] = useState(false);
  const [courseData, setCourseData] = useState({});
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/course/${courseCode}`);
        if (response.ok) {
          const responseData = await response.json();
          setCourseData(responseData);
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
  }, [courseCode]);
  return (
    <div>
      {!isLoading ? (
        <div>{courseData[fieldName]}</div>
      ) : (
        <div className="h-screen flex items-center justify-center">
          <div className="animate-spin">
            <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
          </div>
        </div>
      )}
    </div>
  );
}

export default CourseDetailsCard;
