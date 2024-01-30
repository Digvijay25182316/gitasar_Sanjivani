import {
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import { activitiesData } from "../../../data";
import AddActivitiesModal from "./AddActivitiesModal";
import Slider from "../../../components/MdLeftHeaderSlider";

function Activities() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [openActivities, setOpenActivities] = useState(false);

  function AddFilter(data) {
    setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }

  return (
    <div className="flex items-center max-w-screen bg-white">
      <div className="md:w-[20vw] md:flex hidden">
        <div className="fixed left-0 top-10 min-h-screen md:max-w-[19.7vw] w-full bg-white drop-shadow-lg py-10 flex flex-col gap-5 font-nunito-sans text-gray-500 ">
          <Link to={"/admin/information/program"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/program")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <CalendarDaysIcon className="h-6 w-6" />
              </p>
              <p>Programs</p>
            </div>
          </Link>
          <Link to={"/admin/information/mcourse"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/mcourse")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <AcademicCapIcon className="h-6 w-6" />
              </p>
              <p>Course Master</p>
            </div>
          </Link>
          <Link to={"/admin/information/activities"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/activities")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <PresentationChartBarIcon className="h-6 w-6" />
              </p>
              <p>Activities</p>
            </div>
          </Link>
          <Link to={"/admin/information/course-level"}>
            <div
              className={`flex items-center text-lg ${
                pathname.startsWith("/admin/information/course-level")
                  ? "bg-blue-100 text-blue-700 rounded-lg border-r-4 border-r-blue-700 "
                  : "text-gray-500"
              }  px-5 py-1.5 mx-2 lg:mx-5 gap-5`}
            >
              <p>
                <ArrowTrendingUpIcon className="h-6 w-6" />
              </p>
              <p>Course Level</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="md:w-[80vw] bg-gray-50 min-h-screen w-screen">
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
              <button className="px-2 border py-1 rounded-md transition-all duration-300 text-gray-600 font-semibold hover:bg-gray-100 shadow hover:scale-105 text-sm">
                clear selection
              </button>
              <button className="px-2 border py-1 rounded-md transition-all duration-300 bg-red-100 text-red-600 font-semibold hover:bg-red-200 shadow hover:scale-105 text-sm">
                Delete
              </button>
            </div>

            <button
              className="bg-blue-700 text-white md:text-lg md:px-4 md:py-1.5 px-2 py-1 rounded-xl shadow-lg"
              onClick={() => setOpenActivities(true)}
            >
              + New Activity
            </button>
          </div>
          <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow">
            <p className="border-b px-2 py-1 font-semibold text-gray-600">
              Activities
            </p>
            <div className="mx-2 my-1 border rounded-lg overflow-x-scroll no-scrollbar lg:w-[75vw] md:w-[72vw] w-[91vw]">
              <table>
                <thead>
                  <tr>
                    <th className="font-normal border-r border-b py-1">
                      Select
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Program Name
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"programName"}
                          selected={doesFieldExists(queryArr, "programName")}
                          removeFilter={() => removeObjectByKey("programName")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Course Code
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"courseCode"}
                          selected={doesFieldExists(queryArr, "courseCode")}
                          removeFilter={() => removeObjectByKey("courseCode")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Session Name
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"sessionName"}
                          selected={doesFieldExists(queryArr, "sessionName")}
                          removeFilter={() => removeObjectByKey("sessionName")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Activity
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"typeofActivity"}
                          selected={doesFieldExists(queryArr, "typeofActivity")}
                          removeFilter={() =>
                            removeObjectByKey("typeofActivity")
                          }
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Phone
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"Phone"}
                          selected={doesFieldExists(queryArr, "Phone")}
                          removeFilter={() => removeObjectByKey("Phone")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        First Name
                        <Dropdown
                          origin={"origin-top-right"}
                          position={"right-0"}
                          setvalue={AddFilter}
                          fieldname={"FirstName"}
                          selected={doesFieldExists(queryArr, "FirstName")}
                          removeFilter={() => removeObjectByKey("FirstName")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Last Name
                        <Dropdown
                          origin={"origin-top-right"}
                          position={"right-0"}
                          setvalue={AddFilter}
                          fieldname={"LastName"}
                          selected={doesFieldExists(queryArr, "LastName")}
                          removeFilter={() => removeObjectByKey("LastName")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        date
                        <Dropdown
                          origin={"origin-top-right"}
                          position={"right-0"}
                          setvalue={AddFilter}
                          fieldname={"date"}
                          selected={doesFieldExists(queryArr, "date")}
                          removeFilter={() => removeObjectByKey("date")}
                        />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {activitiesData?.map((acitivity, index) => (
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
                        {acitivity.programName}
                      </td>
                      <td className="border-l border-b">
                        {acitivity.courseCode}
                      </td>
                      <td className="border-l border-b">
                        {acitivity.sessionName}
                      </td>
                      <td className="border-l border-b">
                        {acitivity.typeofActivity}
                      </td>
                      <td className="border-l border-b">{acitivity.Phone}</td>
                      <td className="border-l border-b">
                        {acitivity.FirstName}
                      </td>
                      <td className="border-l border-b">
                        {acitivity.LastName}
                      </td>
                      <td className="border-l border-b">{acitivity.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <AddActivitiesModal
        isOpen={openActivities}
        setIsOpen={() => setOpenActivities(false)}
      />
    </div>
  );
}

export default Activities;
