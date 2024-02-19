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
      {!isLoading ? (
        <table className="w-full">
          <thead>
            <tr>
              <th className="font-normal border-t border-l border-r">
                checkbox
              </th>
              <th className="font-normal border-t border-l border-r">name</th>
              <th className="font-normal border-t border-l border-r">
                scheduledDate
              </th>
              <th className="font-normal border-t border-l border-r">
                courseName
              </th>
              <th className="font-normal border-t border-l border-r">
                sessionName
              </th>
              <th className="font-normal border-t border-l border-r">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((session) => (
              <tr key={session.id}>
                <td className="flex justify-center border-l border-t border-b border-collapse py-3 ">
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
                <td className="border border-gray-300 text-center py-3">
                  {session.name}
                </td>
                <td className="border border-gray-300 text-center py-3">
                  <DateDisplay dateString={session.startTime} />
                </td>
                <td className="border border-gray-300 text-center py-3">
                  {session.courseName}
                </td>
                <td className="border border-gray-300 text-center py-3">
                  {session.sessionName}
                </td>
                <td className="border border-gray-300 py-1 ">
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
  );
};

export default SessionList;
