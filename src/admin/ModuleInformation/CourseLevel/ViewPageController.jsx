import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { AcademicCapIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";
import CourseModal from "./CourseModal";
import { courseLevelData } from "./data";
import SessionList from "./SessionList";

function ViewPageController({ currentPage, setPage, selected }) {
  const courseData = courseLevelData[0];
  const [ViewOpen, setViewOpen] = useState(false);
  const [UpdateOpen, setUpdateOpen] = useState(false);
  const [AddSession, setAddSession] = useState(false);

  // const [OpenCourseLevel, setOpenCourseLevel] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  // const [selectedSessions, setSelectedSessions] = useState(0);

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
            <PlusIcon className="h-5 w-5" />
            Sessions
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
        {!AddSession ? (
          <div className="w-[85vw] md:w-[80vw] h-[85vh] md:h-[90vh] flex justify-between">
            <div className="flex flex-col overflow-y-scroll gap-10 m-2 p-3">
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
                  <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 ">
                    <div className="md:border-l px-3">
                      <p className="text-gray-500 font-semibold w-full ">
                        Program Name :
                      </p>
                      <p className="text-black font-semibold flex justify-start">
                        {courseData.programName}
                      </p>
                    </div>
                    <div className="md:border-l px-3">
                      <p className="text-gray-500 font-semibold w-full">
                        Course Name :
                      </p>
                      <p className="text-black font-semibold ">
                        {courseData.courseLevel}
                      </p>
                    </div>

                    <div className="md:border-l px-3">
                      <p className="text-gray-500 font-semibold w-full">
                        preacher :
                      </p>
                      <p className="text-black font-semibold">
                        {courseData.preacher}
                      </p>
                    </div>
                    <div className="md:border-l px-3">
                      <p className="text-gray-500 font-semibold w-full">
                        mentor :
                      </p>
                      <p className="text-black font-semibold">
                        {courseData.mentor}
                      </p>
                    </div>
                    <div className="md:border-l px-3">
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
                <div className="md:mx-5 mx-2 bg-white mt-2 md:mt-5 flex flex-col rounded-lg shadow border">
                  <div className="flex">
                    <p className=" px-2 py-1 font-semibold text-gray-600">
                      Sessions
                    </p>
                    <button
                      className="ml-auto px-4 py-1 bg-blue-600 mt-2 mr-2 rounded-md text-white font-semibold"
                      onClick={() => setAddSession(true)}
                    >
                      + Session
                    </button>
                  </div>

                  <SessionList sessions={courseData.sessions} />
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
        ) : (
          <div className="w-[85vw] md:w-[40vw] h-[85vh] md:h-[90vh] flex justify-between">
            <div className="w-full m-2 p-3">
              <div className="border-b">
                <p className="text-lg font-semibold text-gray-600">
                  Schedule Session
                </p>
              </div>
              <div className="mt-5">
                <form action="" className="flex flex-col justify-between">
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <label className="font-semibold text-gray-600">
                        Planned Session Date
                      </label>
                      <input
                        type="date"
                        className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      />
                    </div>

                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-600">
                          Select Course
                          <i className="font-normal text-gray-400"></i>
                        </label>
                        <select
                          type="date"
                          className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                        >
                          <option>select</option>
                          <option>option1</option>
                          <option>option2</option>
                        </select>
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-semibold text-gray-600">
                          Select Session
                          <i className="font-normal text-gray-400"></i>
                        </label>
                        <select
                          type="date"
                          className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                        >
                          <option>select</option>
                          <option>option1</option>
                          <option>option2</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-gray-600 font-semibold">
                        Session Name
                      </label>
                      <input
                        type="text"
                        placeholder="Name this session"
                        className="border bg-white px-4 py-2 rounded-md transition-colors duration-500 focus:outline-gray-400"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-5 px-5 bg-white">
                    <button
                      className="w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 border"
                      type="button"
                      onClick={() => setViewOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-700 w-full max-w-[250px] text-lg px-4 py-1.5 rounded-md mb-2 text-white"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <button
              className="bg-red-100 text-red-700 w-max p-2 rounded-full h-max absolute right-2 top-2 z-[100]"
              onClick={() => {
                setViewOpen(false);
                setAddSession(false);
              }}
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
        )}
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
