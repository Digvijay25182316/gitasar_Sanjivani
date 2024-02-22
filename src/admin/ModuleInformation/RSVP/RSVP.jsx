import React, { useEffect, useState } from "react";
import ViewPageController from "../CourseLevel/ViewPageController";
import Slider from "../../../components/MdLeftHeaderSlider";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";
import toast from "react-hot-toast";
import { SERVER_ENDPOINT } from "../../config/Server";
import { useLocation } from "react-router-dom";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import ParticipantCard from "./ParticipantCard";
import ScheduleSessionCard from "./ScheduledSessionCard";
import LevelCard from "./LevelCard";
import ProgramCard from "./ProgramCard";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";

function RSVP() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([
    { page: 0 },
    { size: 10 }, // a default page size
    { sort: "id" },
  ]);
  const [OpenCourseLevel, setOpenCourseLevel] = useState(false);

  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [RSVPArr, setRsvpArr] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalElement, setTotalElements] = useState(0);
  const [VisibleElements, setVisibleElements] = useState(10);

  let url = `${SERVER_ENDPOINT}/rsvp/`;
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
      setIsLoading(true);
      try {
        const response = await fetch(url);
        if (response.ok) {
          const responseData = await response.json();
          setRsvpArr(responseData.content);
          setTotalElements(responseData?.totalElements);
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
  }, [OpenCourseLevel, url]);

  function AddFilter(data) {
    // setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    // return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    // setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }
  function onChangeSelect(e) {
    setSelectedItem(Number(e.target.value));
    setSelected(true);
  }
  function ClearSelection() {
    setSelectedItem(0);
    setSelected(false);
  }

  ///////////////////////////////// this section everything is about filtering and pagination etc
  //contents: pagination , search_parameter_management , sorting
  // Function to increase page by one

  const increasePage = () => {
    setQueryArr((prev) => {
      const pageIndex = prev.findIndex((item) => item.hasOwnProperty("page"));
      if (pageIndex !== -1) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[pageIndex] = {
          ...updatedQueryArr[pageIndex],
          page: updatedQueryArr[pageIndex].page + 1,
        };
        return updatedQueryArr;
      }
      return prev;
    });
    setVisibleElements((prev) => prev + 10);
  };

  // Function to decrease page by one
  const decreasePage = () => {
    setQueryArr((prev) => {
      const pageIndex = prev.findIndex((item) => item.hasOwnProperty("page"));
      if (pageIndex !== -1 && prev[pageIndex].page > 0) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[pageIndex] = {
          ...updatedQueryArr[pageIndex],
          page: updatedQueryArr[pageIndex].page - 1,
        };
        return updatedQueryArr;
      }
      return prev;
    });
    setVisibleElements((prev) => prev - 10);
  };
  //Function to sort
  const SortElements = (sortBy) => {
    setQueryArr((prev) => {
      const sortIndex = prev.findIndex((item) => item.hasOwnProperty("sort"));
      if (sortIndex !== -1) {
        const updatedQueryArr = [...prev];
        updatedQueryArr[sortIndex] = {
          ...updatedQueryArr[sortIndex],
          sort: sortBy,
        };
        return updatedQueryArr;
      }
      return prev;
    });
  };

  ///////////////////////search params and filtering end
  return (
    <div className="flex items-center max-w-screen bg-white">
      <Sidebar />
      <div className="md:w-[79.5vw] bg-gray-50 min-h-screen w-screen">
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
              <button onClick={ClearSelection}>clear selection</button>
            </div>
            <button
              onClick={() => setOpenCourseLevel(true)}
              className="flex items-center gap-2 bg-white px-4 py-1.5 border border-gray-300 rounded text-blue-800"
            >
              <PlusIcon className="h-4 w-4" /> New Course
            </button>
          </div>
          <div className="md:mx-5 mx-2 bg-white flex flex-col rounded border">
            <div className="flex items-center justify-between border-b">
              <p className=" px-2 py-1 font-semibold text-gray-600">RSVP</p>
              <p className="px-2 py-1  text-gray-400">{`${
                totalElement < 10
                  ? totalElement
                  : VisibleElements > totalElement
                  ? totalElement
                  : VisibleElements
              } of ${totalElement}`}</p>
            </div>
            <div className="overflow-x-scroll">
              {!isLoading ? (
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
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "programName"
                            )}
                            fieldname={"programName"}
                            selected={doesFieldExists(queryArr, "programName")}
                            removeFilter={() =>
                              removeObjectByKey("programName")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Course Name
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some((obj) => obj.sort === "Rsvp")}
                            fieldname={"Rsvp"}
                            selected={doesFieldExists(queryArr, "Rsvp")}
                            removeFilter={() => removeObjectByKey("Rsvp")}
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
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "preacher"
                            )}
                            fieldname={"preacher"}
                            selected={doesFieldExists(queryArr, "preacher")}
                            removeFilter={() => removeObjectByKey("preacher")}
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Participant FirstName
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "participantId"
                            )}
                            fieldname={"participantId"}
                            selected={doesFieldExists(
                              queryArr,
                              "participantId"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("participantId")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Participant LastName
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "participantId"
                            )}
                            fieldname={"participantId"}
                            selected={doesFieldExists(
                              queryArr,
                              "participantId"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("participantId")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          Participant ContactNumber
                          <Dropdown
                            origin={"origin-top-left"}
                            position={"left-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "participantId"
                            )}
                            fieldname={"participantId"}
                            selected={doesFieldExists(
                              queryArr,
                              "participantId"
                            )}
                            removeFilter={() =>
                              removeObjectByKey("participantId")
                            }
                          />
                        </div>
                      </th>
                      <th className="border-b px-6 font-semibold py-1">
                        <div className=" flex items-center w-max py-1">
                          RSVP Response
                          <Dropdown
                            origin={"origin-top-right"}
                            position={"right-0"}
                            setvalue={AddFilter}
                            setIsSort={SortElements}
                            issort={queryArr.some(
                              (obj) => obj.sort === "startTime"
                            )}
                            fieldname={"startTime"}
                            selected={doesFieldExists(queryArr, "startTime")}
                            removeFilter={() => removeObjectByKey("startTime")}
                          />
                        </div>
                      </th>
                    </tr>
                  </thead>
                  {RSVPArr?.length > 0 ? (
                    <tbody>
                      {RSVPArr?.map((Rsvp, index) => (
                        <tr key={index + 1} className="border-b">
                          <td className="flex justify-center py-5">
                            <input
                              type="checkbox"
                              value={Rsvp.id}
                              className=" checked:text-green-400 text-green-400 cursor-pointer"
                              onChange={onChangeSelect}
                              disabled={selected}
                              checked={selectedItem === Rsvp.id}
                            />
                          </td>
                          <td className="text-center">
                            {Rsvp?.programId ? (
                              <ProgramCard programId={Rsvp.programId} />
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Rsvp?.levelId ? (
                              <LevelCard levelId={Rsvp.levelId} />
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Rsvp?.scheduledSessionId ? (
                              <div>
                                <ScheduleSessionCard
                                  sessionId={Rsvp?.scheduledSessionId}
                                  fieldName={"name"}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Rsvp?.participantId ? (
                              <div>
                                <ParticipantCard
                                  participantId={Rsvp?.participantId}
                                  fieldName={"firstName"}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Rsvp?.participantId ? (
                              <div>
                                <ParticipantCard
                                  participantId={Rsvp?.participantId}
                                  fieldName={"lastName"}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Rsvp?.participantId ? (
                              <div>
                                <ParticipantCard
                                  participantId={Rsvp?.participantId}
                                  fieldName={"contactNumber"}
                                />
                              </div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                          <td className="text-center">
                            {Rsvp?.rsvp ? (
                              <div>{Rsvp.rsvp}</div>
                            ) : (
                              <i className="text-gray-500">null</i>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  ) : (
                    <tbody>
                      <tr>
                        <td
                          colSpan={10}
                          className="text-center text-gray-400 py-10 "
                        >
                          No RSVP To Show
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table>
              ) : (
                <div className="h-screen flex items-center justify-center">
                  <div className="animate-spin">
                    <CubeTransparentIcon className="h-10 w-10 text-gray-500" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="px-5 flex items-center justify-between mt-6">
          <button
            className={`flex items-center gap-3 text-lg bg-white px-4 py-1 rounded border ${
              VisibleElements === 10 ? "text-gray-400" : "text-gray-700"
            }`}
            onClick={decreasePage}
            disabled={VisibleElements === 10}
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Prev
          </button>
          <button
            className={`flex items-center gap-3 text-lg bg-white px-4 py-1 rounded border ${
              VisibleElements > totalElement ? "text-gray-400" : "text-gray-700"
            }`}
            onClick={increasePage}
            disabled={VisibleElements > totalElement}
          >
            Next
            <ChevronRightIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default RSVP;
