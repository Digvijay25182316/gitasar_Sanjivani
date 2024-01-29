import {
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  LinkIcon,
  PencilSquareIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import CourseModal from "./CourseModal";
import { courseLevelData } from "./data";
import CopyClipBoard from "../../../components/BottomNav.jsx/CopyClipBoard";
import QrCode from "./QrCode";
import Dropdown from "../../../components/BottomNav.jsx/DropDown";

function ViewPageController({ currentPage, setPage, selected }) {
  const courseData = courseLevelData[0];
  const [ViewOpen, setViewOpen] = useState(false);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [queryArr, setQueryArr] = useState([]);
  const [OpenCourseLevel, setOpenCourseLevel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [selectedSessions, setSelectedSessions] = useState(0);

  function AddFilter(data) {
    setQueryArr((prev) => [...prev, data]);
  }
  function doesFieldExists(array, propertyName) {
    return array?.some((obj) => obj.hasOwnProperty(propertyName));
  }

  function removeObjectByKey(data) {
    setQueryArr(queryArr.filter((item) => !Object.keys(item).includes(data)));
  }

  const remainingPages = 10;
  const totalEntries = 500;
  return (
    <div className="px-1">
      {selected ? (
        <div className="flex items-center gap-3 px-1">
          <button
            className="text-blue-700 flex items-center bg-blue-200 px-1 rounded"
            onClick={() => setViewOpen(true)}
          >
            <EyeIcon className="h-5 w-5" />
            View
          </button>
          <button
            className="text-blue-700 flex items-center bg-blue-200 px-1 rounded"
            onClick={() => setUpdateOpen(true)}
          >
            <PencilSquareIcon className="h-5 w-5" />
            update
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-gray-400">
            <p>{currentPage + "-" + remainingPages}</p> of
            <p>{totalEntries}</p>
          </div>
          <div className="flex items-center">
            <button className="flex items-center transition-colors duration-500 hover:bg-gray-100 p-1 rounded-full cursor-pointer">
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button className="flex items-center transition-colors duration-500 hover:bg-gray-100 p-1 rounded-full cursor-pointer">
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <CourseModal isOpen={ViewOpen} setIsOpen={() => setViewOpen(false)}>
        <div className="w-[85vw] md:w-[80vw] h-[85vh] md:h-[90vh] flex justify-between">
          <div className="flex flex-col overflow-y-scroll gap-10">
            <div className="flex md:flex-row flex-col  items-start md:gap-10 gap-6 ">
              <p className="text-blue-600 bg-blue-200 w-max p-2 rounded-xl border border-blue-400 shadow">
                <AcademicCapIcon className="h-20 w-20" />
              </p>
              <div className="flex flex-col md:min-h-[200px] w-full gap-5">
                <div className="flex items-center gap-4">
                  <p className="text-gray-800 text-xl">Course Details :</p>
                  {courseData.status === "Active" ? (
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                      <p>Active</p>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                      </span>
                      <p>InActive</p>
                    </div>
                  )}
                </div>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 ">
                  <div className="flex items-start gap-3 w-full md:border-l px-3">
                    <p className="text-gray-500 font-semibold w-full ">
                      Program Name :
                    </p>
                    <p className="text-black font-semibold">
                      {courseData.programName}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 w-full md:border-l px-3">
                    <p className="text-gray-500 font-semibold w-full">
                      Course Level :
                    </p>
                    <p className="text-black font-semibold">
                      {courseData.courseLevel}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 w-full md:border-l px-3">
                    <p className="text-gray-500 font-semibold w-full">
                      preacher :
                    </p>
                    <p className="text-black font-semibold">
                      {courseData.preacher}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 w-full md:border-l px-3">
                    <p className="text-gray-500 font-semibold w-full">
                      mentor :
                    </p>
                    <p className="text-black font-semibold">
                      {courseData.mentor}
                    </p>
                  </div>
                  <div className="flex items-start gap-3 w-full md:border-l px-3">
                    <p className="text-gray-500 font-semibold w-full">
                      coordinator :
                    </p>
                    <p className="text-black font-semibold">
                      {courseData.coordinator}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow">
                <div className="flex items-center justify-between border-b">
                  <p className=" px-2 py-1 font-semibold text-gray-600">
                    Sessions
                  </p>
                  <ViewPageController
                    currentPage={currentPage}
                    setPage={setPage}
                    selected={selected}
                    courseData={selectedItem}
                  />
                </div>
                <div className="overflow-x-scroll no-scrollbar">
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
                              disabled={selected}
                              checked={selectedItem === index + 1}
                            />
                          </td>
                          <td className="border-l">
                            {courseLevel.programName}
                          </td>
                          <td className="border-l">
                            {courseLevel.courseLevel}
                          </td>
                          <td className="border-l">{courseLevel.preacher}</td>
                          <td className="border-l">{courseLevel.mentor}</td>
                          <td className="border-l">
                            {courseLevel.coordinator}
                          </td>
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

          <button
            className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
            onClick={() => setViewOpen(false)}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </CourseModal>
      <CourseModal isOpen={UpdateOpen} setIsOpen={() => setUpdateOpen(false)}>
        <div className="w-[85vw] md:w-[80vw] h-[85vh] md:h-[90vh]">
          <div>
            <button
              className="bg-red-100 text-red-700 w-max p-2 rounded-full"
              onClick={() => setUpdateOpen(false)}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </CourseModal>
    </div>
  );
}

export default ViewPageController;
