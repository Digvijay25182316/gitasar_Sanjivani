import {
  AcademicCapIcon,
  CalendarDaysIcon,
  ChevronRightIcon,
  LinkIcon,
  PresentationChartBarIcon,
} from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";
import { courseLevelData } from "./data";
import CopyClipBoard from "../../../components/BottomNav.jsx/CopyClipBoard";
import QrCode from "./QrCode";
import ViewPageController from "./ViewPageController";
import CourseModal from "./CourseModal";

function CourseLevel() {
  const { pathname } = useLocation();
  const [queryArr, setQueryArr] = useState([]);
  const [OpenCourseLevel, setOpenCourseLevel] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [selected, setSelected] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);

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
                <AcademicCapIcon className="h-6 w-6" />
              </p>
              <p>Course Level</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="md:w-[80vw] bg-gray-50 min-h-screen w-screen">
        <div className="flex flex-col">
          <div className="flex items-center">
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
                  <p className="text-lg font-semibold text-blue-700">{item}</p>
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
              onClick={() => setOpenCourseLevel(true)}
            >
              + New Course
            </button>
          </div>
          <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow">
            <div className="flex items-center justify-between border-b">
              <p className=" px-2 py-1 font-semibold text-gray-600">
                Course Levels
              </p>
              <ViewPageController
                currentPage={currentPage}
                setPage={setPage}
                selected={selected}
                courseData={selectedItem}
              />
            </div>
            <div className="mx-2 my-1 border rounded-lg overflow-x-scroll no-scrollbar lg:w-[75vw] md:w-[73vw] w-[93vw]">
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
                        Course level
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"courseLevel"}
                          selected={doesFieldExists(queryArr, "courseLevel")}
                          removeFilter={() => removeObjectByKey("courseLevel")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        preacher
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"preacher"}
                          selected={doesFieldExists(queryArr, "preacher")}
                          removeFilter={() => removeObjectByKey("preacher")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        mentor
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"mentor"}
                          selected={doesFieldExists(queryArr, "mentor")}
                          removeFilter={() => removeObjectByKey("mentor")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        coordinator
                        <Dropdown
                          origin={"origin-top-left"}
                          position={"left-0"}
                          setvalue={AddFilter}
                          fieldname={"coordinator"}
                          selected={doesFieldExists(queryArr, "coordinator")}
                          removeFilter={() => removeObjectByKey("coordinator")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1">
                        Status
                        <Dropdown
                          origin={"origin-top-right"}
                          position={"right-0"}
                          setvalue={AddFilter}
                          fieldname={"status"}
                          selected={doesFieldExists(queryArr, "status")}
                          removeFilter={() => removeObjectByKey("status")}
                        />
                      </div>
                    </th>
                    <th className="font-normal border-r border-b">
                      <div className=" flex items-center w-max py-1 px-5">
                        Attendance Links
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {courseLevelData?.map((courseLevel, index) => (
                    <tr key={index + 1} className="border-b">
                      <td className="flex justify-center py-5">
                        <input
                          type="checkbox"
                          value={index + 1}
                          className=" checked:text-green-400 text-green-400 cursor-pointer"
                          onChange={onChangeSelect}
                          disabled={selected}
                          checked={selectedItem === index + 1}
                        />
                      </td>
                      <td className="border-l">{courseLevel.programName}</td>
                      <td className="border-l">{courseLevel.courseLevel}</td>
                      <td className="border-l">{courseLevel.preacher}</td>
                      <td className="border-l">{courseLevel.mentor}</td>
                      <td className="border-l">{courseLevel.coordinator}</td>
                      <td className="border-l border-r">
                        {courseLevel.status}
                      </td>
                      <td className="flex items-center gap-5 justify-center ">
                        <a
                          href={courseLevel.attendanceUrl}
                          className=" hover:underline   text-blue-700 flex items-center gap-2 justify-center"
                        >
                          <LinkIcon className="h-4 w-4" />
                          Link
                        </a>
                        <CopyClipBoard url={courseLevel.attendanceUrl} />
                        <QrCode
                          url={courseLevel.attendanceUrl}
                          courseCode={courseLevel.programName}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CourseModal
        isOpen={OpenCourseLevel}
        setIsOpen={() => setOpenCourseLevel(false)}
      >
        <div>courseModal</div>
      </CourseModal>
    </div>
  );
}

export default CourseLevel;
