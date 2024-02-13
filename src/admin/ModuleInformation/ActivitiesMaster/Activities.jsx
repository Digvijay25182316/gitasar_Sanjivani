import React, { useState } from "react";
import ViewPageController from "../CourseLevel/ViewPageController";
import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  CubeTransparentIcon,
  PresentationChartBarIcon,
  QueueListIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import Slider from "../../../components/MdLeftHeaderSlider";
import { Link, useLocation } from "react-router-dom";
import ActivityModal from "./ActivityModal";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import { SERVER_ENDPOINT } from "../../config/Server";
import toast from "react-hot-toast";
import Sidebar from "../../../components/BottomNav.jsx/Sidebar";

function ActivitiesM() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [activitiesArr, setActivitiesArr] = useState([]);
  const [OpenActivityModal, setOpenActivityModal] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [createCourseLoading, setCreateCourseLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  useState(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${SERVER_ENDPOINT}/activity/`);
        if (response.ok) {
          const responseData = await response.json();
          setActivitiesArr(responseData.content);
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
  }, []);

  function AddFilter(data) {
    setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }
  function onChangeSelect(e) {
    setSelectedItem(Number(e.target.value));
    setSelected(true);
  }
  function ClearSelection() {
    setSelectedItem(0);
    setSelected(false);
  }
  return (
    <div className="flex items-center max-w-screen bg-white">
      <Sidebar />
      <div className="md:w-[80vw] bg-gray-50 min-h-screen w-screen">
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
            <div className="flex items-center bg-white md:mx-5 mx-2 mt-2 md:px-5 px-2 md:py-5 py-2 rounded-2xl justify-between">
              <div className="flex items-center gap-3">
                <button
                  className="px-2 border py-1 rounded-md transition-all duration-300 text-gray-600 font-semibold hover:bg-gray-100 shadow hover:scale-105 text-sm"
                  onClick={ClearSelection}
                >
                  clear selection
                </button>
                <button className="px-2 border py-1 rounded-md transition-all duration-300 bg-red-100 text-red-600 font-semibold hover:bg-red-200 shadow hover:scale-105 text-sm">
                  Delete
                </button>
              </div>
              <button
                className="bg-blue-700 text-white md:text-lg md:px-4 md:py-1.5 px-2 py-1 rounded-xl shadow-lg"
                onClick={() => setOpenActivityModal(true)}
              >
                + New Course
              </button>
            </div>
            <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow">
              <div className="flex items-center justify-between border-b">
                <p className=" px-2 py-1 font-semibold text-gray-600">
                  Activity master
                </p>
              </div>
              <div className="mx-2 my-1 border rounded-lg overflow-x-scroll no-scrollbar lg:w-[75vw] md:w-[73vw] w-[93vw]">
                <div className="w-full">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="font-normal border-r border-b py-1">
                          Select
                        </th>
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-full py-1">
                            Activity Name
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
                        <th className="font-normal border-r border-b">
                          <div className=" flex items-center w-full py-1">
                            Activity Description
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
                      </tr>
                    </thead>
                    <tbody>
                      {activitiesArr?.map((acitivity, index) => (
                        <tr key={index}>
                          <td className="border-b flex justify-center py-5">
                            <input
                              type="checkbox"
                              id=""
                              value={index}
                              className=" checked:text-green-400 text-green-400"
                            />
                          </td>
                          <td className="border-l border-b">
                            {acitivity.name}
                          </td>
                          <td className="border-l border-b">
                            {acitivity.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
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
      <ActivityModal
        isOpen={OpenActivityModal}
        onClose={() => setOpenActivityModal(false)}
      />
    </div>
  );
}

export default ActivitiesM;
