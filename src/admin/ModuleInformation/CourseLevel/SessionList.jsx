import React, { useEffect, useState } from "react";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import { ClockIcon, CubeTransparentIcon } from "@heroicons/react/24/solid";
import DateDisplay from "../../../components/DateDisplay";

const SessionList = ({ course_level_id }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${SERVER_ENDPOINT}/session/scheduled/level/${course_level_id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const responseData = await response.json();
        setItems(responseData.content);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [course_level_id]);

  const handleCheckboxToggle = (id) => {
    setSelectedSession((prevSelectedSession) =>
      prevSelectedSession === id ? null : id
    );
  };

  return (
    <div className="w-full px-5 py-5">
      <div className=" overflow-x-scroll border border-gray-300 rounded">
        {!isLoading ? (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="border-b border-gray-300 px-6 font-semibold py-1">
                  checkbox
                </th>
                <th className="border-b border-gray-300 px-6 font-semibold py-1">
                  name
                </th>
                <th className="border-b border-gray-300 px-6 font-semibold py-1">
                  scheduledDate
                </th>
                <th className="border-b border-gray-300 px-6 font-semibold py-1">
                  courseName
                </th>
                <th className="border-b border-gray-300 px-6 font-semibold py-1">
                  sessionName
                </th>
                <th className="border-b border-gray-300 px-6 font-semibold py-1">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((session) => (
                <tr key={session.id} className="border-b border-gray-300">
                  <td className="flex justify-center  py-3 ">
                    <label htmlFor={`session_${session.id}`}>
                      <input
                        type="checkbox"
                        name={`session_${session.id}`}
                        id={`session_${session.id}`}
                        onChange={() => handleCheckboxToggle(session.id)}
                        checked={selectedSession === session.id}
                      />
                    </label>
                  </td>
                  <td>
                    <Elementexpandable>{session.name}</Elementexpandable>
                  </td>
                  <td className="text-center">
                    <DateDisplay dateString={session.startTime} />
                  </td>
                  <td>
                    <Elementexpandable>{session.courseName}</Elementexpandable>
                  </td>
                  <td>
                    <Elementexpandable>{session.sessionName}</Elementexpandable>
                  </td>
                  <td className="py-1 ">
                    <div className="flex justify-center">
                      <button className="bg-purple-600 rounded-md text-white px-4 py-1 flex items-center gap-2">
                        <ClockIcon className="h-5 w-5" />
                        Reschedule
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex items-center justify-center">
            <div className="animate-spin">
              <CubeTransparentIcon className="h-5 w-5 text-gray-500" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionList;

const Elementexpandable = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  useEffect(() => {
    if (isExpanded) {
      setTimeout(() => {
        setIsExpanded(false);
      }, 5000);
    }
  }, [isExpanded]);
  return (
    <span
      className={`${isExpanded ? "w-max" : "text-center w-full line-clamp-1"}`}
      onClick={() => setIsExpanded(true)}
    >
      {children}
    </span>
  );
};
