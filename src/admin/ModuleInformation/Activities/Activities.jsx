import { ChevronRightIcon, PlusIcon } from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";

import AddActivitiesModal from "./AddActivitiesModal";
import Slider from "../../../components/MdLeftHeaderSlider";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import { CubeTransparentIcon } from "@heroicons/react/24/outline";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import DateDisplay from "../../../components/DateDisplay";

function Activities() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [openActivities, setOpenActivities] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [ActivityArr, setActivityArr] = useState([]);

  function AddFilter(data) {
    setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }

  let url = `${SERVER_ENDPOINT}/participant-activity/`;
  if (queryArr.length > 0) {
    url +=
      "?" +
      queryArr
        .map(
          (param) =>
            `${Object.keys(param)}=${encodeURIComponent(
              param[Object.keys(param)]
            )}`
        )
        .join("&");
  }

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (response.ok) {
          const responseData = await response.json();
          setActivityArr(responseData.content);
          console.log(responseData);
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
  }, [url]);

  return (
    <div className="flex items-center max-w-screen bg-gray-50">
      <div className="md:w-[20vw] md:flex hidden">
        <Sidebar />
      </div>
      <div className="md:w-[79.5vw] bg-gray-50 min-h-screen w-screen">
        {!isLoading ? (
          <div className="flex flex-col">
            <div className="flex items-center">
              <Slider />
              {pathname
                ?.split("/")
                .filter((item) => item !== "") // Filter out empty segments
                .map((item, index) => (
                  <div
                    className="flex items-center py-2"
                    key={`${item}-${index}`}
                  >
                    <p>
                      <ChevronRightIcon className="h-6 w-6" />
                    </p>
                    <p className="font-semibold text-blue-700">{item}</p>
                  </div>
                ))}
            </div>
            <div className="flex items-center justify-between md:mx-5 py-2 px-2">
              <div className="flex items-center gap-3 bg-white text-gray-700 px-2 py-1 border rounded">
                <button>clear selection</button>
              </div>

              <button
                onClick={() => setOpenActivities(true)}
                className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
              >
                <PlusIcon className="h-4 w-4" /> New Activity
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
              <div className="flex items-center justify-between border-b">
                <p className="border-b px-2 py-1 font-semibold text-gray-600">
                  Activities
                </p>
              </div>
              <div className="overflow-x-scroll">
                {ActivityArr?.length > 0 ? (
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="border-b px-6 font-semibold py-1">
                          Select
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Program Name
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"programName"}
                              selected={doesFieldExists(
                                queryArr,
                                "programName"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("programName")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Course Code
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"courseCode"}
                              selected={doesFieldExists(queryArr, "courseCode")}
                              removeFilter={() =>
                                removeObjectByKey("courseCode")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Session Name
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"sessionName"}
                              selected={doesFieldExists(
                                queryArr,
                                "sessionName"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("sessionName")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Activity
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"typeofActivity"}
                              selected={doesFieldExists(
                                queryArr,
                                "typeofActivity"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("typeofActivity")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Phone
                            <Dropdown
                              origin={"origin-top-left"}
                              position={"left-0"}
                              setvalue={AddFilter}
                              fieldname={"participantContactNumber"}
                              selected={doesFieldExists(
                                queryArr,
                                "participantContactNumber"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("participantContactNumber")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            First Name
                            <Dropdown
                              origin={"origin-top-right"}
                              position={"right-0"}
                              setvalue={AddFilter}
                              fieldname={"participantFirstName"}
                              selected={doesFieldExists(
                                queryArr,
                                "participantFirstName"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("participantFirstName")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            Last Name
                            <Dropdown
                              origin={"origin-top-right"}
                              position={"right-0"}
                              setvalue={AddFilter}
                              fieldname={"participantLastName"}
                              selected={doesFieldExists(
                                queryArr,
                                "participantLastName"
                              )}
                              removeFilter={() =>
                                removeObjectByKey("participantLastName")
                              }
                            />
                          </div>
                        </th>
                        <th className="border-b px-6 font-semibold py-1">
                          <div className=" flex items-center w-max py-1">
                            date
                            <Dropdown
                              origin={"origin-top-right"}
                              position={"right-0"}
                              setvalue={AddFilter}
                              fieldname={"created"}
                              selected={doesFieldExists(queryArr, "created")}
                              removeFilter={() => removeObjectByKey("created")}
                            />
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {ActivityArr?.map((activity, index) => (
                        <tr key={index} className="border-b">
                          <td className="flex justify-center py-5">
                            <input
                              type="checkbox"
                              id=""
                              value={index}
                              className=" checked:text-green-400 text-green-400"
                            />
                          </td>
                          <td className="text-center">
                            {activity?.programName ? (
                              <div>{activity.programName}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {activity?.courseCode ? (
                              <div>{activity.courseCode}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {activity?.sessionName ? (
                              <div>{activity.sessionName}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {activity?.activityName ? (
                              <div>{activity.activityName}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {activity?.participantContactNumber ? (
                              <div>{activity.participantContactNumber}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {activity?.participantFirstName ? (
                              <div>{activity.participantFirstName}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {activity?.participantLastName ? (
                              <div>{activity.participantLastName}</div>
                            ) : (
                              <i className="text-gray-500">Null</i>
                            )}
                          </td>
                          <td className="text-center">
                            <DateDisplay dateString={activity.activityDate} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center text-gray-400 my-10">
                    {" "}
                    No Activities Found
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="h-screen flex items-center justify-center">
            <div className="animate-spin">
              <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
            </div>
          </div>
        )}
      </div>
      <AddActivitiesModal
        isOpen={openActivities}
        setIsOpen={() => setOpenActivities(false)}
      />
    </div>
  );
}

export default Activities;
